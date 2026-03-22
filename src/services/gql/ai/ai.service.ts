import { useMutation } from '@apollo/client/react';
import {
  TextToTransactionDocument,
  ImageToTransactionDocument,
  type TextToTransactionMutation,
  type ImageToTransactionMutation,
} from '../types/graphql';

export const useTextToTransaction = () => {
  const [textToTransaction, { data, loading, error }] = useMutation(
    TextToTransactionDocument,
    { refetchQueries: ['GetTransactions', 'GetDashboardSummary'] },
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
    { refetchQueries: ['GetTransactions', 'GetDashboardSummary'] },
  );

  return {
    imageToTransaction: (image: string, mimeType?: string, model?: string) =>
      imageToTransaction({ variables: { image, mimeType, model } }),
    data: data?.imageToTransaction as ImageToTransactionMutation['imageToTransaction'],
    loading,
    error,
  };
};
