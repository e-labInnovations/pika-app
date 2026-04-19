/**
 * Payload CMS auth — GraphQL-backed wrapper that keeps the shape of the
 * existing REST-based `authApi` so callers (AuthContext, token-manager) don't
 * need to change.
 *
 * Most operations (login, me, logout, checkToken) go through the shared
 * Apollo client so they share its auth link, cache invalidation, and error
 * handling.
 *
 * Refresh is intentionally a raw GraphQL fetch: it's triggered BY the auth
 * link (via tokenManager), so routing it back through Apollo would deadlock
 * on itself. Keeping refresh as a plain fetch with an explicit
 * Authorization header sidesteps the cycle.
 */
import { print } from "graphql";
import type { ApolloQueryResult } from "@apollo/client/core";
import { apolloClient } from "../services/gql/client";
import {
  LoginUserDocument,
  LogoutUserDocument,
  MeUserDocument,
  RefreshTokenUserDocument,
  type AuthUserFieldsFragment,
  type LoginUserMutation,
  type LogoutUserMutation,
  type MeUserQuery,
  type RefreshTokenUserMutation,
} from "../services/gql/types/graphql";
import { API_URL, GRAPHQL_URL } from "./constants";
import { storage } from "./storage";

export type PayloadUserSettings = {
  id: string;
  user: string;
  currency?: string | null;
  timezone?: string | null;
  locale?: string | null;
  theme?: string | null;
  defaultAccount?: { id: string; name: string; icon: string } | null;
  geminiApiKey?: string | null;
  categoryAiMethod?: "minilm" | "gemini" | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type PayloadUser = {
  id: string;
  email: string;
  name?: string | null;
  role: "user" | "admin" | "system";
  avatar?: { id: string; url: string; thumbnailURL?: string | null } | null;
  settings?: { docs: PayloadUserSettings[]; hasNextPage: boolean } | null;
  createdAt: string;
  updatedAt: string;
};

type LoginResponse = {
  exp: number;
  token: string;
  user: PayloadUser;
};

type RefreshResponse = {
  exp: number;
  refreshedToken: string;
  message: string;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function fragToUser(frag: AuthUserFieldsFragment): PayloadUser {
  return frag as unknown as PayloadUser;
}

function gqlMessage(e: unknown, fallback: string): string {
  const any = e as { graphQLErrors?: { message?: string }[]; message?: string };
  return any?.graphQLErrors?.[0]?.message ?? any?.message ?? fallback;
}

/**
 * Detect "not authenticated / token rejected" vs other errors. Used by
 * `checkToken` so callers can distinguish a revoked token (hard sign-out)
 * from transient network / 5xx blips (stay signed in).
 */
function isAuthError(e: unknown): boolean {
  const any = e as { graphQLErrors?: { message?: string; extensions?: { code?: string } }[] };
  if (!any?.graphQLErrors?.length) return false;
  return any.graphQLErrors.some(
    (g) =>
      g.extensions?.code === "UNAUTHENTICATED" ||
      (typeof g.message === "string" && g.message.toLowerCase().includes("not authorized")),
  );
}

// ── Public API ──────────────────────────────────────────────────────────────

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await apolloClient.mutate<LoginUserMutation>({
        mutation: LoginUserDocument,
        variables: { email, password },
        fetchPolicy: "no-cache",
      });
      const payload = res.data?.loginUser;
      if (!payload?.token || !payload?.user) {
        throw new Error("Invalid email or password.");
      }
      return {
        token: payload.token,
        exp: payload.exp ?? 0,
        user: fragToUser(payload.user as AuthUserFieldsFragment),
      };
    } catch (e) {
      throw new Error(gqlMessage(e, "Invalid email or password."));
    }
  },

  refreshToken: async (): Promise<RefreshResponse | null> => {
    const token = await storage.getToken();
    if (!token) return null;

    // Raw GraphQL fetch — see file header comment for why this bypasses Apollo.
    try {
      const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ query: print(RefreshTokenUserDocument) }),
      });
      if (!res.ok) return null;
      const body = (await res.json()) as {
        data?: RefreshTokenUserMutation;
        errors?: { message?: string }[];
      };
      const data = body?.data?.refreshTokenUser;
      if (!data?.refreshedToken) return null;
      return {
        refreshedToken: data.refreshedToken,
        exp: data.exp ?? 0,
        message: "ok",
      };
    } catch {
      return null;
    }
  },

  /**
   * 'valid' → server accepts the token
   * 'invalid' → server explicitly rejects (revoked / bad)
   * 'network_error' → unreachable / transient
   */
  checkToken: async (): Promise<"valid" | "invalid" | "network_error"> => {
    const token = await storage.getToken();
    if (!token) return "invalid";
    try {
      const res: ApolloQueryResult<MeUserQuery> = await apolloClient.query({
        query: MeUserDocument,
        fetchPolicy: "network-only",
        errorPolicy: "none",
      });
      return res.data?.meUser?.user ? "valid" : "invalid";
    } catch (e) {
      if (isAuthError(e)) return "invalid";
      return "network_error";
    }
  },

  me: async (_tokenOverride?: string): Promise<PayloadUser | null> => {
    // _tokenOverride is accepted only for signature-compatibility with callers
    // that were designed against the REST version. Apollo always uses the
    // token currently in secure storage via the authLink, which is fine
    // because every caller writes the token to storage first.
    const token = _tokenOverride ?? (await storage.getToken());
    if (!token) return null;
    try {
      const res = await apolloClient.query<MeUserQuery>({
        query: MeUserDocument,
        fetchPolicy: "network-only",
        errorPolicy: "none",
      });
      const user = res.data?.meUser?.user;
      return user ? fragToUser(user as AuthUserFieldsFragment) : null;
    } catch (e) {
      throw new Error(gqlMessage(e, "Failed to fetch user."));
    }
  },

  logout: async (): Promise<void> => {
    const token = await storage.getToken();
    if (!token) return;
    // Fire-and-forget — don't block on network failure
    apolloClient
      .mutate<LogoutUserMutation>({
        mutation: LogoutUserDocument,
        fetchPolicy: "no-cache",
      })
      .catch(() => {});
  },
};

// Re-export so callers that previously imported API_URL via auth-api keep
// working without touching their imports. (No current callers do, but this
// keeps the module boundary stable.)
export { API_URL };
