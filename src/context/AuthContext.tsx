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
import { authApi, type PayloadUser } from "../lib/auth-api";
import { API_URL } from "../lib/constants";
import { apolloClient, setUnauthenticatedHandler } from "../services/gql/client";
import { storage } from "../lib/storage";
import { tokenManager } from "../lib/token-manager";
import {
  GetUserSettingsDocument,
  type UserSettingsFieldsFragment,
} from "../services/gql/types/graphql";

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextType = {
  /** Currently authenticated user, or null. */
  user: PayloadUser | null;
  /** User settings loaded after authentication. */
  settings: UserSettingsFieldsFragment | null;
  /** True while the initial session rehydration (+ settings fetch) is in progress. */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PayloadUser | null>(null);
  const [settings, setSettings] = useState<UserSettingsFieldsFragment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Fetch settings imperatively (no hook needed) ────────────────────────────
  async function fetchSettings(userId: string): Promise<UserSettingsFieldsFragment | null> {
    try {
      const result = await apolloClient.query({
        query: GetUserSettingsDocument,
        variables: { userId },
        fetchPolicy: "network-only",
      });
      return (result.data?.UserSettings?.docs?.[0] as UserSettingsFieldsFragment) ?? null;
    } catch {
      return null;
    }
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

        // Attempt to get/refresh a valid token
        const validToken = await tokenManager.getValidToken();
        if (!validToken) {
          await storage.clear();
          return;
        }

        // Fetch user + settings in parallel; splash stays up until both resolve
        const userSettings = await fetchSettings(savedUser.id);

        if (!cancelled) {
          setUser(savedUser);
          setSettings(userSettings);
        }
      } catch {
        await storage.clear();
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

    const userSettings = await fetchSettings(data.user.id);
    setSettings(userSettings);
    setUser(data.user);
    // Navigation is handled by the sign-in screen after this resolves
  }, []);

  // ── Google OAuth ───────────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `${API_URL}/api/auth/mobile-init`,
      "pika://auth",
    );

    if (result.type !== "success") return; // user cancelled — stay on sign-in

    const parsed = Linking.parse(result.url);
    const token = parsed.queryParams?.token as string | undefined;
    const expStr = parsed.queryParams?.exp as string | undefined;

    if (!token) throw new Error("Google sign-in failed: no token received.");

    await storage.setToken(token);
    if (expStr) await storage.setExp(parseInt(expStr, 10));

    const fetchedUser = await authApi.me();
    const userSettings = fetchedUser ? await fetchSettings(fetchedUser.id) : null;
    if (!fetchedUser) {
      await storage.clear();
      throw new Error("Google sign-in failed: could not load profile.");
    }

    await storage.setUser(fetchedUser);
    setSettings(userSettings);
    setUser(fetchedUser);
    // Navigation is handled by the sign-in screen after this resolves
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
        logout,
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
