import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { API_URL } from "./constants";
import { tokenManager } from "./token-manager";

/**
 * Exports the transactions `where` matches (the History list's where) as CSV and opens
 * the share sheet (save to Files/Drive, send, open in Sheets).
 */
export async function exportTransactionsCsv(where: Record<string, unknown> | undefined): Promise<void> {
  const token = await tokenManager.getValidToken();
  const res = await fetch(`${API_URL}/api/export/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `JWT ${token}` } : {}) },
    body: JSON.stringify({ where: where ?? null }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Export failed (${res.status})`);
  }
  const csv = await res.text();
  const file = `${FileSystem.cacheDirectory}pika-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  await FileSystem.writeAsStringAsync(file, csv, { encoding: FileSystem.EncodingType.UTF8 });
  await Sharing.shareAsync(file, { mimeType: "text/csv", dialogTitle: "Export transactions", UTI: "public.comma-separated-values-text" });
}
