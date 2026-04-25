/**
 * Proactive token refresh manager.
 *
 * Payload tokenExpiration = 30 days (configured in Users collection).
 * We refresh if the token expires within BUFFER_SECONDS.
 * Concurrent callers share a single in-flight refresh promise.
 */
import { print } from "graphql";
import { RefreshTokenUserDocument } from "../services/gql/types/graphql";
import { GRAPHQL_URL } from "./constants";
import { storage } from "./storage";

const BUFFER_SECONDS = 300; // refresh 5 min before expiry

let refreshPromise: Promise<string | null> | null = null;

/**
 * Raw GraphQL fetch — intentionally bypasses Apollo.
 *
 * Every Apollo request goes through the auth link which calls
 * tokenManager.getValidToken(). If we used apolloClient.mutate() here,
 * that request would also hit the auth link → getValidToken() → another
 * refresh attempt → deadlock. Plain fetch sidesteps the cycle entirely.
 */
async function doRefresh(): Promise<string | null> {
  const token = await storage.getToken();
  if (!token) return null;
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
    const body = await res.json();
    const data = body?.data?.refreshTokenUser;
    if (!data?.refreshedToken) return null;
    await storage.setToken(data.refreshedToken);
    await storage.setExp(data.exp ?? 0);
    return data.refreshedToken;
  } catch {
    return null;
  }
}

export const tokenManager = {
  /** Returns a valid token, refreshing proactively when close to expiry. */
  getValidToken: async (): Promise<string | null> => {
    const token = await storage.getToken();
    if (!token) return null;

    const exp = await storage.getExp();
    const nowSec = Math.floor(Date.now() / 1000);

    // Token not expiring soon — return as-is
    if (exp && exp - nowSec > BUFFER_SECONDS) return token;

    // Token is expired or expiring soon — refresh (deduplicated across concurrent callers)
    if (!refreshPromise) {
      refreshPromise = doRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      // null = server explicitly rejected the token (bad/revoked)
      // string = new token
      return await refreshPromise;
    } catch {
      // Network error on wake — return existing token.
      // Apollo will get a 401 if truly invalid → setUnauthenticatedHandler → logout.
      return token;
    }
  },
};
