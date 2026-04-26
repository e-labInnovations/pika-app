import React, { createContext, useCallback, useContext, useState } from "react";
import type { TxFormValues } from "../components/transaction/TransactionForm";
import type { AIImageAttachment } from "../components/transaction/AIAssistantSheet";

/**
 * Carries AI-parsed transaction data from the Home AI Assistant card to the
 * Add Transaction screen. The home screen can't pre-fill the form directly
 * (different screen, different state), so it parks the parsed values here and
 * the Add screen picks them up on mount.
 */
export type PendingAIPrefill = {
  values: Partial<TxFormValues>;
  image?: AIImageAttachment;
  promptId?: string;
};

interface AIPrefillBridgeContextType {
  pending: PendingAIPrefill | null;
  setPending: (p: PendingAIPrefill) => void;
  clearPending: () => void;
}

const AIPrefillBridgeContext = createContext<AIPrefillBridgeContextType>({
  pending: null,
  setPending: () => {},
  clearPending: () => {},
});

export function AIPrefillBridgeProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPendingState] = useState<PendingAIPrefill | null>(null);
  const setPending = useCallback((p: PendingAIPrefill) => setPendingState(p), []);
  const clearPending = useCallback(() => setPendingState(null), []);
  return (
    <AIPrefillBridgeContext.Provider value={{ pending, setPending, clearPending }}>
      {children}
    </AIPrefillBridgeContext.Provider>
  );
}

export function usePendingAIPrefill() {
  return useContext(AIPrefillBridgeContext);
}
