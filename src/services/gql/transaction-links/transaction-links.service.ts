import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetTransactionLinksDocument,
  CreateTransactionLinkDocument,
  DeleteTransactionLinkDocument,
  type TransactionLinkFieldsFragment,
  type TransactionLink_where,
  type mutationTransactionLinkInput,
} from '../types/graphql';

const REFETCH_QUERIES = ['GetTransactionLinks'];

export const useGetTransactionLinks = (transactionId: string) => {
  const { data, loading, error, refetch } = useQuery(GetTransactionLinksDocument, {
    variables: {
      where: {
        OR: [
          { from: { equals: transactionId } },
          { to: { equals: transactionId } },
        ],
      } as TransactionLink_where,
      limit: 50,
    },
    skip: !transactionId,
    fetchPolicy: 'cache-and-network',
  });

  return {
    links: data?.TransactionLinks?.docs as TransactionLinkFieldsFragment[] | undefined,
    totalDocs: data?.TransactionLinks?.totalDocs ?? 0,
    loading,
    error,
    refetch,
  };
};

export const useCreateTransactionLink = () => {
  const [create, { loading, error }] = useMutation(CreateTransactionLinkDocument, {
    refetchQueries: REFETCH_QUERIES,
  });

  return {
    createLink: (data: mutationTransactionLinkInput) => create({ variables: { data } }),
    loading,
    error,
  };
};

export const useDeleteTransactionLink = () => {
  const [remove, { loading, error }] = useMutation(DeleteTransactionLinkDocument, {
    refetchQueries: REFETCH_QUERIES,
  });

  return {
    deleteLink: (id: string) => remove({ variables: { id } }),
    loading,
    error,
  };
};
