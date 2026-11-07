import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// Inline documents: added after the last codegen run (see sms.service.ts).

export type SearchSummary = {
  count: number;
  spent: number;
  received: number;
  averageSpend: number;
  /** Expenses per month, 12 months up to now, oldest first ("2026-11"). */
  months: { month: string; spent: number }[];
};

const SEARCH_SUMMARY = gql`
  query SearchSummary($where: SearchJSON) {
    searchSummary(where: $where)
  }
`;

/** Totals for exactly the transactions `where` lists (same where as the list query). */
export const useSearchSummary = (where: Record<string, unknown> | undefined, skip: boolean) => {
  const { data, loading, refetch } = useQuery<{ searchSummary: SearchSummary }>(SEARCH_SUMMARY, {
    variables: { where: where ?? null },
    skip,
    fetchPolicy: 'cache-and-network',
  });
  return { summary: data?.searchSummary ?? null, loading, refetch };
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

const INSIGHTS = gql`
  query Insights {
    insights
  }
`;

/** What stands out this month (server rules; see pika-v2 utilities/insights.ts). */
export const useInsights = () => {
  const { data, loading, refetch } = useQuery<{ insights: Insight[] }>(INSIGHTS, {
    fetchPolicy: 'cache-and-network',
  });
  return { insights: data?.insights ?? [], loading, refetch };
};
