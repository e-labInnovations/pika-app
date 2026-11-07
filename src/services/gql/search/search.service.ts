import { useQuery } from '@apollo/client/react';
import { InsightsDocument, SearchSummaryDocument } from '../types/graphql';

export type SearchSummary = {
  count: number;
  spent: number;
  received: number;
  averageSpend: number;
  /** Expenses per month, 12 months up to now, oldest first ("2026-11"). */
  months: { month: string; spent: number }[];
};

/** Totals for exactly the transactions `where` lists (same where as the list query). */
export const useSearchSummary = (where: Record<string, unknown> | undefined, skip: boolean) => {
  const { data, loading, refetch } = useQuery(SearchSummaryDocument, {
    variables: { where: where ?? null },
    skip,
    fetchPolicy: 'cache-and-network',
  });
  return { summary: (data?.searchSummary ?? null) as SearchSummary | null, loading, refetch };
};

export type Insight = {
  key: string;
  kind: 'category_up' | 'category_down' | 'pace' | 'large' | 'new_payee';
  tone: 'warn' | 'good' | 'info';
  title: string;
  message: string;
  amount: number;
  filter: { categories?: string[]; dateFrom: string; dateTo: string; query?: string };
};

/** What stands out this month (server rules; see pika-v2 utilities/insights.ts). */
export const useInsights = () => {
  const { data, loading, refetch } = useQuery(InsightsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  return { insights: (data?.insights ?? []) as Insight[], loading, refetch };
};
