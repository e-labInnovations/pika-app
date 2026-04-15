import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetCategoryDocument,
  GetCategoriesDocument,
  CreateCategoryDocument,
  UpdateCategoryDocument,
  DeleteCategoryDocument,
  type CategoryFieldsFragment,
  type GetCategoriesQuery,
  type GetCategoriesQueryVariables,
  type CreateCategoryMutationVariables,
  type UpdateCategoryMutationVariables,
} from '../types/graphql';

export const useGetCategories = (variables?: GetCategoriesQueryVariables) => {
  const { data, loading, error, refetch } = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Categories,
    categories: data?.Categories?.docs as CategoryFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetCategory = (id: string) => {
  const { data, loading, error } = useQuery<{ Category: CategoryFieldsFragment }, { id: string }>(
    GetCategoryDocument,
    {
      variables: { id },
      skip: !id,
      fetchPolicy: 'cache-and-network',
    },
  );

  return {
    data: data?.Category,
    loading,
    error,
  };
};

export const useCreateCategory = () => {
  const [createCategory, { data, loading, error }] = useMutation<
    { createCategory: CategoryFieldsFragment },
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, { refetchQueries: ['GetCategories'] });

  return {
    createCategory: (variables: CreateCategoryMutationVariables) =>
      createCategory({ variables }),
    data: data?.createCategory,
    loading,
    error,
  };
};

export const useUpdateCategory = () => {
  const [updateCategory, { data, loading, error }] = useMutation<
    { updateCategory: CategoryFieldsFragment },
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, { refetchQueries: ['GetCategories'] });

  return {
    updateCategory: (variables: UpdateCategoryMutationVariables) =>
      updateCategory({ variables }),
    data: data?.updateCategory,
    loading,
    error,
  };
};

export const useDeleteCategory = () => {
  const [deleteCategory, { data, loading, error }] = useMutation<
    { deleteCategory: CategoryFieldsFragment },
    { id: string }
  >(DeleteCategoryDocument, { refetchQueries: ['GetCategories'] });

  return {
    deleteCategory: (id: string) => deleteCategory({ variables: { id } }),
    data: data?.deleteCategory,
    loading,
    error,
  };
};
