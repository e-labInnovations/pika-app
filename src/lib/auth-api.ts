/**
 * Payload CMS auth endpoints — email/password only.
 * All token operations use the Authorization: JWT <token> header (Payload standard).
 */
import { API_URL } from "./constants";
import { storage } from "./storage";

export type PayloadUser = {
  id: string;
  email: string;
  name?: string | null;
  role: "user" | "admin" | "system";
  avatar?: { id: string; url: string; thumbnailURL?: string | null } | null;
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

async function payloadFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  return res;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const res = await payloadFetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg =
        body?.errors?.[0]?.message ??
        body?.message ??
        "Invalid email or password.";
      throw new Error(msg);
    }

    return res.json() as Promise<LoginResponse>;
  },

  refreshToken: async (): Promise<RefreshResponse | null> => {
    const token = await storage.getToken();
    if (!token) return null;

    const res = await payloadFetch("/api/users/refresh-token", {
      method: "POST",
      headers: { Authorization: `JWT ${token}` },
    });

    if (!res.ok) return null;
    return res.json() as Promise<RefreshResponse>;
  },

  /**
   * Returns 'valid' if the server accepts the token, 'invalid' if the server
   * explicitly rejects it (401/403), or 'network_error' if unreachable.
   * Use this during rehydration to catch revoked / otherwise invalid tokens.
   */
  checkToken: async (): Promise<"valid" | "invalid" | "network_error"> => {
    const token = await storage.getToken();
    if (!token) return "invalid";
    try {
      const res = await payloadFetch("/api/users/me", {
        headers: { Authorization: `JWT ${token}` },
      });
      if (res.status === 401 || res.status === 403) return "invalid";
      return res.ok ? "valid" : "network_error"; // 5xx → treat as transient
    } catch {
      return "network_error"; // fetch threw (no network)
    }
  },

  me: async (tokenOverride?: string): Promise<PayloadUser | null> => {
    const token = tokenOverride ?? (await storage.getToken());
    if (!token) return null;

    const res = await payloadFetch("/api/users/me", {
      headers: { Authorization: `JWT ${token}` },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(
        body?.errors?.[0]?.message ?? body?.message ?? `HTTP ${res.status}`,
      );
    }
    const data = await res.json();
    return (data?.user ?? null) as PayloadUser | null;
  },

  logout: async (): Promise<void> => {
    const token = await storage.getToken();
    if (!token) return;
    // Fire-and-forget — don't block on network failure
    payloadFetch("/api/users/logout", {
      method: "POST",
      headers: { Authorization: `JWT ${token}` },
    }).catch(() => {});
  },
};
