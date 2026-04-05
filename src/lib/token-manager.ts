/**
 * Proactive token refresh manager.
 *
 * Payload tokenExpiration = 30 days (configured in Users collection).
 * We refresh if the token expires within BUFFER_SECONDS.
 * Concurrent callers share a single in-flight refresh promise.
 */
import { authApi } from "./auth-api";
import { storage } from "./storage";

const BUFFER_SECONDS = 300; // refresh 5 min before expiry

let refreshPromise: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  const data = await authApi.refreshToken();
  if (!data?.refreshedToken) return null;
  await storage.setToken(data.refreshedToken);
  await storage.setExp(data.exp);
  return data.refreshedToken;
}

export const tokenManager = {
  /** Returns a valid token, refreshing proactively when close to expiry. */
  getValidToken: async (): Promise<string | null> => {
    const token = await storage.getToken();
    if (!token) return null;

    const exp = await storage.getExp();
    const nowSec = Math.floor(Date.now() / 1000);

    // Token is not expiring soon — return as-is
    if (exp && exp - nowSec > BUFFER_SECONDS) return token;

    // Token is expired or expiring soon — refresh (deduplicated)
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
      // Network error on wake (no connection yet, timeout, etc.)
      // Return the existing token — Apollo will get a 401 if truly invalid,
      // which triggers setUnauthenticatedHandler → logout.
      return token;
    }
  },
};
