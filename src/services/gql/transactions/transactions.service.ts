import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetTransactionDocument,
  GetTransactionsDocument,
  CreateTransactionDocument,
  UpdateTransactionDocument,
  DeleteTransactionDocument,
  SimilarTransactionIdsDocument,
  type TransactionFieldsFragment,
  type GetTransactionsQuery,
  type GetTransactionsQueryVariables,
  type GetTransactionQuery,
  type GetTransactionQueryVariables,
  type CreateTransactionMutationVariables,
  type UpdateTransactionMutationVariables,
} from '../types/graphql';

export const useGetTransactions = (variables?: GetTransactionsQueryVariables) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >(GetTransactionsDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Transactions as GetTransactionsQuery['Transactions'] | undefined,
    transactions: data?.Transactions?.docs as TransactionFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
    fetchMore,
  };
};

export const useGetTransaction = (id: string) => {
  const { data, loading, error, refetch } = useQuery<
    GetTransactionQuery,
    GetTransactionQueryVariables
  >(GetTransactionDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Transaction as TransactionFieldsFragment | null | undefined,
    loading,
    error,
    refetch,
  };
};

export const TRANSACTION_REFETCH_QUERIES = [
  'GetTransactions',
  'GetDashboardSummary',
  'GetAccounts',
  'GetMonthlyPeople',
  'GetMonthlyCategories',
  'GetMonthlyTags',
  'GetWeeklyExpenses',
  'GetMonthlyCalendar',
  // Person balances and open shares change with every transaction
  'GetPeople',
  'GetPerson',
  // Bank-vs-Pika balance comparison on Home
  'GetBalanceChecks',
  // Paid reminders move on to next month
  'GetRecurringOverview',
];

export const useCreateTransaction = () => {
  const [createTransaction, { data, loading, error }] = useMutation<
    { createTransaction: TransactionFieldsFragment },
    CreateTransactionMutationVariables
  >(CreateTransactionDocument, {
    refetchQueries: TRANSACTION_REFETCH_QUERIES,
  });

  return {
    createTransaction: (variables: CreateTransactionMutationVariables, promptId?: string) =>
      createTransaction({
        variables,
        ...(promptId ? { context: { headers: { 'X-Prompt-Id': promptId } } } : {}),
      }),
    data: data?.createTransaction,
    loading,
    error,
  };
};

export const useUpdateTransaction = () => {
  const [updateTransaction, { data, loading, error }] = useMutation<
    { updateTransaction: TransactionFieldsFragment },
    UpdateTransactionMutationVariables
  >(UpdateTransactionDocument, {
    refetchQueries: TRANSACTION_REFETCH_QUERIES,
  });

  return {
    updateTransaction: (variables: UpdateTransactionMutationVariables) =>
      updateTransaction({ variables }),
    data: data?.updateTransaction,
    loading,
    error,
  };
};

export const useDeleteTransaction = () => {
  const [deleteTransaction, { data, loading, error }] = useMutation<
    { deleteTransaction: TransactionFieldsFragment },
    { id: string }
  >(DeleteTransactionDocument, {
    refetchQueries: TRANSACTION_REFETCH_QUERIES,
  });

  return {
    deleteTransaction: (id: string) => deleteTransaction({ variables: { id } }),
    data: data?.deleteTransaction,
    loading,
    error,
  };
};

/** Transactions whose titles mean something close to the search ("coffee" → tea, snacks). */
export const useSimilarTransactionIds = (query: string) => {
  const q = query.trim();
  const { data, loading } = useQuery(SimilarTransactionIdsDocument, {
    variables: { query: q },
    skip: q.length < 3,
    fetchPolicy: 'cache-and-network',
  });
  return { ids: q.length < 3 ? [] : (data?.similarTransactionIds ?? []), loading };
};
