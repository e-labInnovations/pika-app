import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

// Inline documents: added after the last codegen run.

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

const BUDGETS_OVERVIEW = gql`
  query BudgetsOverview {
    budgetsOverview
  }
`;
const CREATE_BUDGET = gql`
  mutation CreateBudget($category: String!, $amount: Float!) {
    createBudget(data: { category: $category, amount: $amount }) {
      id
    }
  }
`;
const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: String!, $amount: Float!) {
    updateBudget(id: $id, data: { amount: $amount }) {
      id
    }
  }
`;
const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: String!) {
    deleteBudget(id: $id) {
      id
    }
  }
`;

const REFETCH = ['BudgetsOverview', 'Insights'];

/** This month's progress for each active budget, most used first. */
export const useBudgets = () => {
  const { data, loading, refetch } = useQuery<{ budgetsOverview: BudgetProgress[] }>(BUDGETS_OVERVIEW, {
    fetchPolicy: 'cache-and-network',
  });
  return { budgets: data?.budgetsOverview ?? [], loading, refetch };
};

export const useBudgetMutations = () => {
  const [create] = useMutation(CREATE_BUDGET, { refetchQueries: REFETCH, awaitRefetchQueries: true });
  const [update] = useMutation(UPDATE_BUDGET, { refetchQueries: REFETCH, awaitRefetchQueries: true });
  const [remove] = useMutation(DELETE_BUDGET, { refetchQueries: REFETCH, awaitRefetchQueries: true });
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
