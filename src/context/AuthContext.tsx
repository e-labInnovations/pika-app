import { router } from "expo-router";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  authApi,
  type PayloadUser,
  type PayloadUserSettings,
} from "../lib/auth-api";
import { API_URL } from "../lib/constants";
import {
  apolloClient,
  setUnauthenticatedHandler,
} from "../services/gql/client";
import { storage } from "../lib/storage";
import { tokenManager } from "../lib/token-manager";

// Prevent splash from auto-hiding before rehydration completes
SplashScreen.preventAutoHideAsync();

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextType = {
  user: PayloadUser | null;
  /** Derived from user — never out of sync */
  settings: PayloadUserSettings | null;
  /** True only during initial session rehydration */
  isLoading: boolean;
  /** True during login / logout / token exchange operations */
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithToken: (token: string, exp?: number) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractSettings(user: PayloadUser): PayloadUserSettings | null {
  return user.settings?.docs?.[0] ?? null;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PayloadUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Derived — always in sync with user, no separate setState needed
  const settings = user ? extractSettings(user) : null;

  // ── Helpers ────────────────────────────────────────────────────────────────

  const applyUser = useCallback((u: PayloadUser) => {
    setUser(u);
  }, []);

  const clearSession = useCallback(async () => {
    await storage.clear();
    apolloClient.clearStore();
    setUser(null);
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      authApi.logout(); // fire-and-forget
      await clearSession();
      router.replace("/sign-in");
    } finally {
      setIsAuthenticating(false);
    }
  }, [clearSession]);

  // Register with Apollo so 401s trigger logout
  useEffect(() => {
    setUnauthenticatedHandler(logout);
  }, [logout]);

  // ── Session rehydration ────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function rehydrate() {
      try {
        const savedUser = await storage.getUser<PayloadUser>();
        if (!savedUser) return;

        const token = await storage.getToken();
        if (!token) {
          await clearSession();
          return;
        }

        const validToken = await tokenManager.getValidToken();
        if (!validToken) {
          await clearSession();
          return;
        }

        const tokenStatus = await authApi.checkToken();
        if (tokenStatus === "invalid") {
          await clearSession();
          return;
        }

        if (!cancelled) applyUser(savedUser);
      } catch {
        // Network down on startup — keep user logged in, screens surface errors
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    rehydrate();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Login ──────────────────────────────────────────────────────────────────

  const login = useCallback(
    async (email: string, password: string) => {
      setIsAuthenticating(true);
      try {
        const data = await authApi.login(email, password);
        await storage.setToken(data.token);
        await storage.setExp(data.exp);
        await storage.setUser(data.user);
        applyUser(data.user);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [applyUser],
  );

  // ── Shared OAuth token completion ──────────────────────────────────────────

  const loginWithToken = useCallback(
    async (token: string, exp?: number) => {
      setIsAuthenticating(true);
      try {
        await storage.setToken(token);
        if (exp) await storage.setExp(exp);

        const fetchedUser = await authApi.me(token);
        if (!fetchedUser) {
          await clearSession();
          throw new Error("Sign-in failed: could not load profile.");
        }

        await storage.setUser(fetchedUser);
        applyUser(fetchedUser);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [applyUser, clearSession],
  );

  // ── Google OAuth ───────────────────────────────────────────────────────────

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    const result = await WebBrowser.openAuthSessionAsync(
      `${API_URL}/api/auth/client-init?callback=pika://auth`,
      "pika://auth",
    );

    if (result.type !== "success") return false;

    const parsed = Linking.parse(result.url);
    const code = parsed.queryParams?.code as string | undefined;
    if (!code) throw new Error("Google sign-in failed: no code received.");

    const res = await fetch(`${API_URL}/api/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) throw new Error("Google sign-in failed: code exchange error.");

    const { token, exp } = await res.json();
    await loginWithToken(token, exp);
    return true;
  }, [loginWithToken]);

  // ── Refresh user ───────────────────────────────────────────────────────────

  const refreshUser = useCallback(async () => {
    const fetchedUser = await authApi.me();
    if (!fetchedUser) return;
    await storage.setUser(fetchedUser);
    applyUser(fetchedUser);
  }, [applyUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        settings,
        isLoading,
        isAuthenticating,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithToken,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
