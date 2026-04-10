import { router } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi, type PayloadUser, type PayloadUserSettings } from "../lib/auth-api";
import { API_URL } from "../lib/constants";
import { apolloClient, setUnauthenticatedHandler } from "../services/gql/client";
import { storage } from "../lib/storage";
import { tokenManager } from "../lib/token-manager";

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextType = {
  /** Currently authenticated user, or null. */
  user: PayloadUser | null;
  /** User settings loaded after authentication. */
  settings: PayloadUserSettings | null;
  /** True while the initial session rehydration (+ settings fetch) is in progress. */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  /** Complete sign-in from a raw JWT (used by the /auth deep-link callback route). */
  loginWithToken: (token: string, exp?: number) => Promise<void>;
  logout: () => Promise<void>;
  /** Re-fetch the current user from /api/users/me and update stored state. */
  refreshUser: () => Promise<void>;
};

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PayloadUser | null>(null);
  const [settings, setSettings] = useState<PayloadUserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function extractSettings(user: PayloadUser): PayloadUserSettings | null {
    return user.settings?.docs?.[0] ?? null;
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    authApi.logout(); // fire-and-forget
    await storage.clear();
    apolloClient.clearStore();
    setUser(null);
    setSettings(null);
    router.replace("/sign-in");
  }, []);

  // Register with Apollo error link so 401s trigger a logout
  useEffect(() => {
    setUnauthenticatedHandler(logout);
  }, [logout]);

  // ── Session rehydration on launch ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function rehydrate() {
      try {
        const savedUser = await storage.getUser<PayloadUser>();
        if (!savedUser) return; // No stored session → go to sign-in

        const token = await storage.getToken();
        if (!token) {
          await storage.clear();
          return; // No token at all — must log in
        }

        // Try to refresh if needed. getValidToken falls back to the existing
        // token on network errors so we don't log the user out just because
        // the device hasn't reconnected yet after waking from sleep.
        const validToken = await tokenManager.getValidToken();
        if (!validToken) {
          // Server explicitly rejected the token (revoked / bad signature)
          await storage.clear();
          return;
        }

        // Verify the token is still accepted server-side.
        // A 'network_error' is tolerated so offline users stay logged in.
        const tokenStatus = await authApi.checkToken();
        if (tokenStatus === "invalid") {
          await storage.clear();
          return;
        }

        if (!cancelled) {
          setUser(savedUser);
          setSettings(extractSettings(savedUser));
        }
      } catch {
        // Don't clear storage for unexpected errors (network down on startup, etc.)
        // The user stays logged in; individual screens will surface errors normally.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    rehydrate();
    return () => { cancelled = true; };
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    const data = await authApi.login(email, password);

    await storage.setToken(data.token);
    await storage.setExp(data.exp);
    await storage.setUser(data.user);

    setSettings(extractSettings(data.user));
    setUser(data.user);
    // Navigation is handled by the sign-in screen after this resolves
  }, []);

  // ── Shared OAuth token completion ─────────────────────────────────────────
  const loginWithToken = useCallback(async (token: string, exp?: number) => {
    await storage.setToken(token);
    if (exp) await storage.setExp(exp);

    const fetchedUser = await authApi.me(token); // pass token directly, skip storage round-trip
    if (!fetchedUser) {
      await storage.clear();
      throw new Error("Sign-in failed: could not load profile.");
    }

    await storage.setUser(fetchedUser);
    setSettings(extractSettings(fetchedUser));
    setUser(fetchedUser);
    // Navigation is handled by the caller
  }, []);

  // ── Google OAuth ───────────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    // openAuthSessionAsync handles both platforms:
    //   iOS  — ASWebAuthenticationSession intercepts pika:// and returns { type:'success', url }
    //   Android — uses an internal Linking watcher; if the OS dispatches the
    //             Intent to Expo Router before expo-web-browser sees it, the
    //             result is { type:'cancel' } and auth.tsx handles the code.
    const result = await WebBrowser.openAuthSessionAsync(
      `${API_URL}/api/auth/client-init?callback=pika://auth`,
      "pika://auth",
    );

    if (result.type !== "success") {
      // User cancelled, or Android dispatched pika:// to Expo Router first.
      // auth.tsx will process the code if the deep link was real.
      return false;
    }

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
    setUser(fetchedUser);
    setSettings(extractSettings(fetchedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        settings,
        isLoading,
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
