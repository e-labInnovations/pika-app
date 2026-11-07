import { useMutation, useQuery } from '@apollo/client/react';
import {
  BudgetsOverviewDocument,
  CreateBudgetDocument,
  DeleteBudgetDocument,
  UpdateBudgetDocument,
} from '../types/graphql';

export type BudgetProgress = {
  id: string;
  category: { id: string; name: string; icon: string | null; color: string | null; bgColor: string | null };
  amount: number;
  spent: number;
  left: number;
  percent: number;
  status: 'ok' | 'warn' | 'over';
  categories: string[];
};


const REFETCH = ['BudgetsOverview', 'Insights'];

/** This month's progress for each active budget, most used first. */
export const useBudgets = () => {
  const { data, loading, refetch } = useQuery(BudgetsOverviewDocument, {
    fetchPolicy: 'cache-and-network',
  });
  return { budgets: (data?.budgetsOverview ?? []) as BudgetProgress[], loading, refetch };
};

export const useBudgetMutations = () => {
  const [create] = useMutation(CreateBudgetDocument, { refetchQueries: REFETCH, awaitRefetchQueries: true });
  const [update] = useMutation(UpdateBudgetDocument, { refetchQueries: REFETCH, awaitRefetchQueries: true });
  const [remove] = useMutation(DeleteBudgetDocument, { refetchQueries: REFETCH, awaitRefetchQueries: true });
  const run = async (p: Promise<{ error?: unknown }>) => {
    const res = await p;
    if (res.error) throw res.error;
  };
  return {
    createBudget: (category: string, amount: number) => run(create({ variables: { category, amount } })),
    updateBudget: (id: string, amount: number) => run(update({ variables: { id, amount } })),
    deleteBudget: (id: string) => run(remove({ variables: { id } })),
  };
};
