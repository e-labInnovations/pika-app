import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { requireOptionalNativeModule } from "expo";

/** Something shared into Pika from another app. Files are already copied to our cache. */
export type IncomingShare =
  | { id: number; type: "file"; uri: string; mimeType: string; name: string | null }
  | { id: number; type: "text"; text: string }
  | { id: number; type: "error"; message: string; source: string | null };

type Native = {
  getPendingShare(): IncomingShare | null;
  clearPendingShare(id: number): void;
  addListener(event: "onShare", listener: (share: IncomingShare) => void): { remove(): void };
};

/** Android-only native module; null on iOS/web and in Expo Go. */
const native = Platform.OS === "android" ? requireOptionalNativeModule<Native>("PikaShare") : null;

export const PikaShare = {
  isAvailable: native != null,
  getPendingShare: (): IncomingShare | null => native?.getPendingShare() ?? null,
  clearPendingShare: (id: number) => native?.clearPendingShare(id),
};

/**
 * The latest share, from the launch intent or one received while running.
 * Call `clear(id)` once it has been handled so it isn't served again.
 */
export function useIncomingShare(): { share: IncomingShare | null; clear: (id: number) => void } {
  const [share, setShare] = useState<IncomingShare | null>(null);

  useEffect(() => {
    if (!native) return;
    // Subscribe before reading the pending share, so one that finishes copying
    // in between still reaches us as an event.
    const sub = native.addListener("onShare", setShare);
    const pending = native.getPendingShare();
    if (pending) setShare((cur) => (cur && cur.id >= pending.id ? cur : pending));
    return () => sub.remove();
  }, []);

  // Clears only the share that was handled: a newer one that arrived meanwhile stays.
  const clear = useCallback((id: number) => {
    native?.clearPendingShare(id);
    setShare((cur) => (cur?.id === id ? null : cur));
  }, []);

  return { share, clear };
}
