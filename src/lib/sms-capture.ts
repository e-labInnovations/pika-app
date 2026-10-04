import { PermissionsAndroid, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { PikaSms, type SmsStatus } from "../../modules/pika-sms";
import { API_URL } from "./constants";
import { storage } from "./storage";

/**
 * Keeps the native SMS receiver (modules/pika-sms) configured: API URL, the current
 * session token and the sender list. The native side does the rest on its own —
 * receives, queues, uploads to /api/sms/ingest and notifies — even with the app closed.
 */

const DEFAULT_SENDERS = ["FEDBNK", "PLUXEE"];

export const smsCaptureAvailable = PikaSms.isAvailable;

async function fetchSenders(token: string | null): Promise<string[] | null> {
  if (!token) return null;
  try {
    const res = await fetch(`${API_URL}/api/sms/senders`, {
      headers: { Authorization: `JWT ${token}` },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { senders?: string[] };
    return Array.isArray(json.senders) && json.senders.length ? json.senders : null;
  } catch {
    return null;
  }
}

export function getSmsStatus(): SmsStatus | null {
  return PikaSms.getStatus();
}

export type EnableResult = { ok: true } | { ok: false; reason: string };

/** Asks for SMS (and notification) permission, switches capture on and catches up on recent SMS. */
export async function enableSmsCapture(): Promise<EnableResult> {
  if (!PikaSms.isAvailable || Platform.OS !== "android") {
    return { ok: false, reason: "SMS capture needs the Android app." };
  }
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
  ]);
  if (result[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] !== PermissionsAndroid.RESULTS.GRANTED) {
    return { ok: false, reason: "Pika needs permission to receive SMS. Allow it in Android settings → Apps → Pika → Permissions." };
  }
  // Notifications are optional: without them pending items still show up in the app.
  try {
    await Notifications.requestPermissionsAsync();
  } catch {}

  const token = await storage.getToken();
  const senders = (await fetchSenders(token)) ?? DEFAULT_SENDERS;
  PikaSms.configure({ enabled: true, apiUrl: API_URL, token, senders });
  PikaSms.scanInbox();
  PikaSms.syncNow();
  return { ok: true };
}

export async function disableSmsCapture(): Promise<void> {
  const status = PikaSms.getStatus();
  if (!status) return;
  PikaSms.configure({ enabled: false, apiUrl: API_URL, token: await storage.getToken(), senders: status.senders });
}

/**
 * On app start, return to the foreground and login: hand over the current token and
 * sender list, pick up SMS the receiver missed, and flush the queue.
 */
export async function refreshSmsCapture(): Promise<void> {
  const status = PikaSms.getStatus();
  if (!status?.enabled) return;
  const token = await storage.getToken();
  if (!token) return;
  const senders = (await fetchSenders(token)) ?? (status.senders.length ? status.senders : DEFAULT_SENDERS);
  PikaSms.configure({ enabled: true, apiUrl: API_URL, token, senders });
  PikaSms.scanInbox();
  PikaSms.syncNow();
}

/** On logout: stop uploading with the old session; capture stays switched on for the next login. */
export function forgetSmsToken(): void {
  const status = PikaSms.getStatus();
  if (!status) return;
  PikaSms.configure({ enabled: status.enabled, apiUrl: API_URL, token: null, senders: status.senders });
}

/** Re-reads SMS from the last `days` days (e.g. after fixing an account's SMS identifiers). */
export function rescanSms(days: number): number {
  const added = PikaSms.scanInbox(Date.now() - days * 24 * 60 * 60 * 1000);
  PikaSms.syncNow();
  return added;
}
