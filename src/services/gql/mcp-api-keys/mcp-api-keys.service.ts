import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetMcpApiKeysDocument,
  CreateMcpApiKeyDocument,
  UpdateMcpApiKeyDocument,
  DeleteMcpApiKeyDocument,
  type McpApiKeyFieldsFragment,
  type mutationPayloadMcpApiKeyInput,
  type mutationPayloadMcpApiKeyUpdateInput,
} from '../types/graphql';

const REFETCH_QUERIES = ['GetMcpApiKeys'];

export const useGetMcpApiKeys = (userId?: string | null) => {
  const { data, loading, error, refetch } = useQuery(GetMcpApiKeysDocument, {
    variables: userId ? { userId } : undefined,
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  return {
    keys: data?.PayloadMcpApiKeys?.docs as McpApiKeyFieldsFragment[] | undefined,
    totalDocs: data?.PayloadMcpApiKeys?.totalDocs ?? 0,
    loading,
    error,
    refetch,
  };
};

export const useCreateMcpApiKey = () => {
  const [create, { loading, error }] = useMutation(CreateMcpApiKeyDocument, {
    refetchQueries: REFETCH_QUERIES,
  });

  return {
    createKey: (data: mutationPayloadMcpApiKeyInput) => create({ variables: { data } }),
    loading,
    error,
  };
};

export const useUpdateMcpApiKey = () => {
  const [update, { loading, error }] = useMutation(UpdateMcpApiKeyDocument, {
    refetchQueries: REFETCH_QUERIES,
  });

  return {
    updateKey: (id: string, data: mutationPayloadMcpApiKeyUpdateInput) =>
      update({ variables: { id, data } }),
    loading,
    error,
  };
};

export const useDeleteMcpApiKey = () => {
  const [remove, { loading, error }] = useMutation(DeleteMcpApiKeyDocument, {
    refetchQueries: REFETCH_QUERIES,
  });

  return {
    deleteKey: (id: string) => remove({ variables: { id } }),
    loading,
    error,
  };
};
