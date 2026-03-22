import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetTagDocument,
  GetTagsDocument,
  CreateTagDocument,
  UpdateTagDocument,
  DeleteTagDocument,
  type TagFieldsFragment,
  type GetTagsQuery,
  type GetTagsQueryVariables,
  type CreateTagMutationVariables,
  type UpdateTagMutationVariables,
} from '../types/graphql';

export const useGetTags = (variables?: GetTagsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GetTagsDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Tags as GetTagsQuery['Tags'] | undefined,
    tags: data?.Tags?.docs as TagFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetTag = (id: string) => {
  const { data, loading, error } = useQuery(GetTagDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Tag as TagFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useCreateTag = () => {
  const [createTag, { data, loading, error }] = useMutation(CreateTagDocument, {
    refetchQueries: ['GetTags'],
  });

  return {
    createTag: (variables: CreateTagMutationVariables) =>
      createTag({ variables }),
    data: data?.createTag as TagFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useUpdateTag = () => {
  const [updateTag, { data, loading, error }] = useMutation(UpdateTagDocument, {
    refetchQueries: ['GetTags'],
  });

  return {
    updateTag: (variables: UpdateTagMutationVariables) =>
      updateTag({ variables }),
    data: data?.updateTag as TagFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useDeleteTag = () => {
  const [deleteTag, { data, loading, error }] = useMutation(DeleteTagDocument, {
    refetchQueries: ['GetTags'],
  });

  return {
    deleteTag: (id: string) => deleteTag({ variables: { id } }),
    data: data?.deleteTag,
    loading,
    error,
  };
};
