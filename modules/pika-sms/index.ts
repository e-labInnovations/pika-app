import { Platform } from "react-native";
import { requireOptionalNativeModule } from "expo";

export type SmsConfig = {
  enabled: boolean;
  apiUrl: string | null;
  token: string | null;
  senders: string[];
};

export type SmsStatus = {
  enabled: boolean;
  hasToken: boolean;
  senders: string[];
  queued: number;
  lastInboxScan: number;
  canReceive: boolean;
  canRead: boolean;
};

type Native = {
  configure(config: SmsConfig): void;
  getStatus(): SmsStatus;
  syncNow(): void;
  scanInbox(sinceMs?: number | null): number;
};

/** Android-only native module; null on iOS/web and in Expo Go. */
const native = Platform.OS === "android" ? requireOptionalNativeModule<Native>("PikaSms") : null;

export const PikaSms = {
  isAvailable: native != null,
  configure: (config: SmsConfig) => native?.configure(config),
  getStatus: (): SmsStatus | null => native?.getStatus() ?? null,
  syncNow: () => native?.syncNow(),
  scanInbox: (sinceMs?: number | null): number => native?.scanInbox(sinceMs ?? null) ?? 0,
};
