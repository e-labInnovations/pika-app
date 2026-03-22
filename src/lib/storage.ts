import * as SecureStore from "expo-secure-store";

const KEYS = {
  TOKEN: "pika_auth_token",
  EXP: "pika_auth_exp",
  USER: "pika_auth_user",
} as const;

export const storage = {
  getToken: () => SecureStore.getItemAsync(KEYS.TOKEN),

  setToken: (token: string) => SecureStore.setItemAsync(KEYS.TOKEN, token),

  getExp: async (): Promise<number | null> => {
    const val = await SecureStore.getItemAsync(KEYS.EXP);
    return val ? parseInt(val, 10) : null;
  },

  setExp: (exp: number) =>
    SecureStore.setItemAsync(KEYS.EXP, String(exp)),

  getUser: async <T>(): Promise<T | null> => {
    const val = await SecureStore.getItemAsync(KEYS.USER);
    return val ? (JSON.parse(val) as T) : null;
  },

  setUser: (user: object) =>
    SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user)),

  clear: () =>
    Promise.all([
      SecureStore.deleteItemAsync(KEYS.TOKEN),
      SecureStore.deleteItemAsync(KEYS.EXP),
      SecureStore.deleteItemAsync(KEYS.USER),
    ]).then(() => void 0),
};
