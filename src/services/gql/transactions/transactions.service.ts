import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetTransactionDocument,
  GetTransactionsDocument,
  CreateTransactionDocument,
  UpdateTransactionDocument,
  DeleteTransactionDocument,
  type TransactionFieldsFragment,
  type GetTransactionsQuery,
  type GetTransactionsQueryVariables,
  type CreateTransactionMutationVariables,
  type UpdateTransactionMutationVariables,
} from '../types/graphql';

export const useGetTransactions = (variables?: GetTransactionsQueryVariables) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    GetTransactionsDocument,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
  );

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
  const { data, loading, error, refetch } = useQuery(GetTransactionDocument, {
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

export const useCreateTransaction = () => {
  const [createTransaction, { data, loading, error }] = useMutation(
    CreateTransactionDocument,
    {
      refetchQueries: ['GetTransactions', 'GetDashboardSummary'],
    },
  );

  return {
    createTransaction: (variables: CreateTransactionMutationVariables) =>
      createTransaction({ variables }),
    data: data?.createTransaction as TransactionFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useUpdateTransaction = () => {
  const [updateTransaction, { data, loading, error }] = useMutation(
    UpdateTransactionDocument,
    {
      refetchQueries: ['GetTransactions', 'GetDashboardSummary'],
    },
  );

  return {
    updateTransaction: (variables: UpdateTransactionMutationVariables) =>
      updateTransaction({ variables }),
    data: data?.updateTransaction as TransactionFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useDeleteTransaction = () => {
  const [deleteTransaction, { data, loading, error }] = useMutation(
    DeleteTransactionDocument,
    {
      refetchQueries: ['GetTransactions', 'GetDashboardSummary'],
    },
  );

  return {
    deleteTransaction: (id: string) => deleteTransaction({ variables: { id } }),
    data: data?.deleteTransaction,
    loading,
    error,
  };
};
