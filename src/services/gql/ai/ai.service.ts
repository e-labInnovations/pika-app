import { useMutation } from '@apollo/client/react';
import {
  TextToTransactionDocument,
  ImageToTransactionDocument,
  SuggestCategoryDocument,
  type TextToTransactionMutation,
  type ImageToTransactionMutation,
  type SuggestCategoryMutation,
  type SuggestCategoryMutationVariables,
} from '../types/graphql';
import type { CategoryFieldsFragment } from '../types/graphql';

export const useTextToTransaction = () => {
  const [textToTransaction, { data, loading, error }] = useMutation(
    TextToTransactionDocument,
  );

  return {
    textToTransaction: (text: string, model?: string) =>
      textToTransaction({ variables: { text, model } }),
    data: data?.textToTransaction as TextToTransactionMutation['textToTransaction'],
    loading,
    error,
  };
};

export const useImageToTransaction = () => {
  const [imageToTransaction, { data, loading, error }] = useMutation(
    ImageToTransactionDocument,
  );

  return {
    imageToTransaction: (image: string, mimeType?: string, model?: string) =>
      imageToTransaction({ variables: { image, mimeType, model } }),
    data: data?.imageToTransaction as ImageToTransactionMutation['imageToTransaction'],
    loading,
    error,
  };
};

export type SuggestedCategory = CategoryFieldsFragment;

export type SuggestCategoryResult = NonNullable<
  SuggestCategoryMutation['suggestCategory']
> & {
  category: SuggestedCategory | null;
};

export const useSuggestCategory = () => {
  const [suggestCategory, { data, loading, error, reset }] = useMutation(
    SuggestCategoryDocument,
  );

  const result = data?.suggestCategory
    ? ({
        ...data.suggestCategory,
        category: (data.suggestCategory.category as SuggestedCategory | null) ?? null,
      } as SuggestCategoryResult)
    : undefined;

  return {
    suggestCategory: (vars: SuggestCategoryMutationVariables) =>
      suggestCategory({ variables: vars }),
    data: result,
    loading,
    error,
    reset,
  };
};
