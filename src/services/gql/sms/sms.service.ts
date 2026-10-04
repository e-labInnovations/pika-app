import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetPendingSmsDocument,
  GetCapturedSmsDocument,
  ConfirmCapturedSmsDocument,
  DismissCapturedSmsDocument,
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
    refetchQueries: ['GetPendingSms'],
  });
  return { dismissSms: (id: string) => dismiss({ variables: { id } }), loading };
};
