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
  useGetSession,
  useLoginUser,
  useLogoutUser,
  type AuthUser,
  type AuthSettings,
  type AppSettings,
} from "../services/gql/auth/auth.service";
import {
  apolloClient,
  setUnauthenticatedHandler,
} from "../services/gql/client";
import { API_URL } from "../lib/constants";
import { storage } from "../lib/storage";
import { tokenManager } from "../lib/token-manager";

// Prevent splash from auto-hiding before rehydration completes
SplashScreen.preventAutoHideAsync();

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextType = {
  user: AuthUser | null;
  /** Derived from user — never out of sync */
  settings: AuthSettings | null;
  /** App-level settings (available AI models, feature flags, etc.) */
  appSettings: AppSettings | null;
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function extractSettings(user: AuthUser): AuthSettings | null {
  return user.settings?.docs?.[0] ?? null;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { fetchSession } = useGetSession();
  const { login: loginMutation } = useLoginUser();
  const { logout: logoutMutation } = useLogoutUser();

  // Derived — always in sync with user, no separate setState needed
  const settings = user ? extractSettings(user) : null;

  // ── Helpers ────────────────────────────────────────────────────────────────

  const applySession = useCallback(
    (u: AuthUser, as: AppSettings | null) => {
      setUser(u);
      setAppSettings(as);
    },
    [],
  );

  const clearSession = useCallback(async () => {
    await storage.clear();
    apolloClient.clearStore();
    setUser(null);
    setAppSettings(null);
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      logoutMutation(); // fire-and-forget
      await clearSession();
      router.replace("/sign-in");
    } finally {
      setIsAuthenticating(false);
    }
  }, [clearSession, logoutMutation]);

  // Register with Apollo so 401s trigger logout
  useEffect(() => {
    setUnauthenticatedHandler(logout);
  }, [logout]);

  // ── Session fetch helper ───────────────────────────────────────────────────

  const loadSession = useCallback(async (): Promise<boolean> => {
    try {
      const session = await fetchSession();
      if (!session.user) return false;
      await storage.setUser(session.user);
      applySession(session.user, session.appSettings);
      return true;
    } catch {
      return false;
    }
  }, [fetchSession, applySession]);

  // ── Session rehydration ────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function rehydrate() {
      try {
        const token = await storage.getToken();
        if (!token) return;

        const validToken = await tokenManager.getValidToken();
        if (!validToken) {
          await clearSession();
          return;
        }

        // Use stored user for instant UI, then refresh in background
        const savedUser = await storage.getUser<AuthUser>();
        if (savedUser && !cancelled) setUser(savedUser);

        // Fetch fresh session (user + appSettings) from server
        const ok = await loadSession();
        if (!ok && !cancelled) await clearSession();
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
        const data = await loginMutation({ email, password });
        await storage.setToken(data.token);
        await storage.setExp(data.exp);
        await storage.setUser(data.user);
        // Apply user immediately for fast UX, then fetch appSettings
        applySession(data.user, null);
        loadSession(); // background — appSettings arrive shortly
      } finally {
        setIsAuthenticating(false);
      }
    },
    [loginMutation, applySession, loadSession],
  );

  // ── Shared OAuth token completion ──────────────────────────────────────────

  const loginWithToken = useCallback(
    async (token: string, exp?: number) => {
      setIsAuthenticating(true);
      try {
        await storage.setToken(token);
        if (exp) await storage.setExp(exp);

        const ok = await loadSession();
        if (!ok) {
          await clearSession();
          throw new Error("Sign-in failed: could not load profile.");
        }
      } finally {
        setIsAuthenticating(false);
      }
    },
    [loadSession, clearSession],
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
    await loadSession();
  }, [loadSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        settings,
        appSettings,
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
