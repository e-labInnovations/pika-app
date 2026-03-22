import { router } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi, type PayloadUser } from "../lib/auth-api";
import { apolloClient, setUnauthenticatedHandler } from "../services/gql/client";
import { storage } from "../lib/storage";
import { tokenManager } from "../lib/token-manager";

// ── Types ────────────────────────────────────────────────────────────────────

type AuthContextType = {
  /** Currently authenticated user, or null. */
  user: PayloadUser | null;
  /** True while the initial session rehydration is in progress. */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PayloadUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    authApi.logout(); // fire-and-forget
    await storage.clear();
    apolloClient.clearStore();
    setUser(null);
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

        if (!cancelled) setUser(savedUser);
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

    setUser(data.user);
    // Navigation is handled by the sign-in screen after this resolves
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
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
