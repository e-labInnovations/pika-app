import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetAccountDocument,
  GetAccountsDocument,
  CreateAccountDocument,
  UpdateAccountDocument,
  DeleteAccountDocument,
  type AccountFieldsFragment,
  type GetAccountsQuery,
  type GetAccountsQueryVariables,
  type CreateAccountMutationVariables,
  type UpdateAccountMutationVariables,
} from '../types/graphql';

export const useGetAccounts = (variables?: GetAccountsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GetAccountsDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Accounts as GetAccountsQuery['Accounts'] | undefined,
    accounts: data?.Accounts?.docs as AccountFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetAccount = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GetAccountDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Account as AccountFieldsFragment | null | undefined,
    loading,
    error,
    refetch,
  };
};

export const useCreateAccount = () => {
  const [createAccount, { data, loading, error }] = useMutation(
    CreateAccountDocument,
  );

  return {
    createAccount: (variables: CreateAccountMutationVariables) =>
      createAccount({ variables }),
    data: data?.createAccount as AccountFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useUpdateAccount = () => {
  const [updateAccount, { data, loading, error }] = useMutation(
    UpdateAccountDocument,
  );

  return {
    updateAccount: (variables: UpdateAccountMutationVariables) =>
      updateAccount({ variables }),
    data: data?.updateAccount as AccountFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useDeleteAccount = () => {
  const [deleteAccount, { data, loading, error }] = useMutation(
    DeleteAccountDocument,
  );

  return {
    deleteAccount: (id: string) => deleteAccount({ variables: { id } }),
    data: data?.deleteAccount,
    loading,
    error,
  };
};
