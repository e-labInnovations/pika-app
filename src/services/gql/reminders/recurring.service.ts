import { useQuery } from '@apollo/client/react';
import { GetRecurringOverviewDocument } from '../types/graphql';

/** A monthly payment found in history that isn't tracked yet (see pika-v2 utilities/recurring). */
export type RecurringSuggestion = {
  key: string;
  title: string;
  type: 'income' | 'expense';
  amount: string;
  day: number;
  category: string | null;
  account: string | null;
  occurrences: number;
  lastDate: string;
  nextDue: string;
};

/** A tracked monthly reminder that is due within a week, or whose payment hasn't shown up. */
export type RecurringDue = {
  reminder: string;
  title: string;
  type: string;
  amount: string | null;
  nextDue: string;
  status: 'missing' | 'soon';
  category: string | null;
  account: string | null;
};

export const useRecurringOverview = () => {
  const { data, refetch } = useQuery(GetRecurringOverviewDocument, { fetchPolicy: 'cache-and-network' });
  const o = (data?.recurringOverview ?? null) as { suggestions: RecurringSuggestion[]; due: RecurringDue[] } | null;
  return { suggestions: o?.suggestions ?? [], due: o?.due ?? [], refetch };
};
