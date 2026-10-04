import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetPendingSmsDocument,
  GetCapturedSmsDocument,
  ConfirmCapturedSmsDocument,
  DismissCapturedSmsDocument,
  GetBalanceChecksDocument,
  GetAutoConfirmedSmsDocument,
  UndoAutoConfirmedSmsDocument,
  type CapturedSmsFieldsFragment,
} from '../types/graphql';
import { TRANSACTION_REFETCH_QUERIES } from '../transactions/transactions.service';

/** What the server parsed from the SMS (see pika-v2 utilities/sms/parse.ts). */
export type ParsedSms = {
  provider: 'federal' | 'pluxee';
  kind: string;
  type: 'income' | 'expense' | 'transfer';
  amount: string;
  occurredAt: string | null;
  merchant: string | null;
  ref: string | null;
  balance: string | null;
};

/** Prefill from the user's history; ids only. */
export type SmsSuggestion = {
  title: string;
  type: 'income' | 'expense' | 'transfer';
  category: string | null;
  tags: string[];
  person: string | null;
  toAccount: string | null;
  from: 'sms' | 'note' | 'model' | 'default';
};

export type PendingSms = CapturedSmsFieldsFragment & {
  parsed: ParsedSms | null;
  suggestion: SmsSuggestion | null;
};

export const usePendingSms = (limit = 100) => {
  const { data, loading, error, refetch } = useQuery(GetPendingSmsDocument, {
    variables: { limit },
    fetchPolicy: 'cache-and-network',
  });
  return {
    items: (data?.CapturedSmsList?.docs ?? []) as PendingSms[],
    total: data?.CapturedSmsList?.totalDocs ?? 0,
    loading,
    error,
    refetch,
  };
};

export const useCapturedSms = (id: string) => {
  const { data, loading, error } = useQuery(GetCapturedSmsDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });
  return { sms: data?.CapturedSms as PendingSms | null | undefined, loading, error };
};

const SMS_REFETCH = ['GetPendingSms', ...TRANSACTION_REFETCH_QUERIES];

export const useConfirmSms = () => {
  const [confirm, { loading }] = useMutation(ConfirmCapturedSmsDocument, {
    refetchQueries: SMS_REFETCH,
  });
  return {
    confirmSms: (id: string, overrides?: Record<string, unknown>) =>
      confirm({ variables: { id, overrides } }),
    loading,
  };
};

export const useDismissSms = () => {
  const [dismiss, { loading }] = useMutation(DismissCapturedSmsDocument, {
    // A dismissed SMS no longer counts toward the expected balance
    refetchQueries: ['GetPendingSms', 'GetBalanceChecks'],
  });
  return { dismissSms: (id: string) => dismiss({ variables: { id } }), loading };
};

/** Accounts whose latest bank SMS balance disagrees with Pika at that time. */
export const useBalanceMismatches = () => {
  const { data, loading, refetch } = useQuery(GetBalanceChecksDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const mismatches = (data?.balanceChecks ?? []).filter((c) => !c.matched && Math.abs(c.difference) >= 0.01);
  return { mismatches, loading, refetch };
};

/** SMS confirmed automatically (trusted merchants) since `since`. */
export const useAutoConfirmedSms = (since: string) => {
  const { data, refetch } = useQuery(GetAutoConfirmedSmsDocument, {
    variables: { since },
    fetchPolicy: 'cache-and-network',
  });
  return { items: data?.CapturedSmsList?.docs ?? [], refetch };
};

export const useUndoAutoConfirmedSms = () => {
  const [undo, { loading }] = useMutation(UndoAutoConfirmedSmsDocument, {
    // The SMS goes back to pending and its transaction is deleted
    refetchQueries: ['GetAutoConfirmedSms', ...SMS_REFETCH],
  });
  return { undoAutoConfirm: (id: string) => undo({ variables: { id } }), loading };
};
