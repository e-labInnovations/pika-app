import { useMutation } from '@apollo/client/react';
import {
  TextToTransactionDocument,
  ImageToTransactionDocument,
  SuggestCategoryDocument,
  PredictCategoryDocument,
  type TextToTransactionMutation,
  type ImageToTransactionMutation,
  type SuggestCategoryMutation,
  type SuggestCategoryMutationVariables,
  type PredictCategoryMutation,
  type PredictCategoryMutationVariables,
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

export type PredictedCategory = CategoryFieldsFragment;

export type PredictCategoryResult = {
  category: PredictedCategory | null;
  score: number;
  model: string;
  latencyMs: number;
};

/**
 * Local (no-Gemini) on-server category prediction. Fast enough to call
 * debounced while the user types. Returns `category: null` when the model's
 * best match doesn't clear the server-side score threshold.
 */
export const usePredictCategory = () => {
  const [predictCategory, { data, loading, error, reset }] = useMutation(
    PredictCategoryDocument,
  );

  const result: PredictCategoryResult | undefined = data?.predictCategory
    ? {
        category: (data.predictCategory.category as PredictedCategory | null) ?? null,
        score: data.predictCategory.score,
        model: data.predictCategory.model,
        latencyMs: data.predictCategory.latencyMs,
      }
    : undefined;

  return {
    predictCategory: (vars: PredictCategoryMutationVariables) =>
      predictCategory({ variables: vars }),
    data: result,
    loading,
    error,
    reset,
  };
};
