import React, { createContext, useCallback, useContext, useState } from "react";

export type PendingShare =
  | { type: "text"; text: string }
  | { type: "image"; uri: string; base64: string; mimeType: string };

interface ShareIntentBridgeContextType {
  pending: PendingShare | null;
  setPending: (s: PendingShare) => void;
  clearPending: () => void;
}

const ShareIntentBridgeContext = createContext<ShareIntentBridgeContextType>({
  pending: null,
  setPending: () => {},
  clearPending: () => {},
});

export function ShareIntentBridgeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pending, setPendingState] = useState<PendingShare | null>(null);
  const setPending = useCallback((s: PendingShare) => setPendingState(s), []);
  const clearPending = useCallback(() => setPendingState(null), []);
  return (
    <ShareIntentBridgeContext.Provider value={{ pending, setPending, clearPending }}>
      {children}
    </ShareIntentBridgeContext.Provider>
  );
}

export function usePendingShare() {
  return useContext(ShareIntentBridgeContext);
}
