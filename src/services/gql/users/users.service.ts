import { useMutation } from '@apollo/client/react';
import {
  UpdateUserDocument,
  type UpdateUserMutation,
  type UpdateUserMutationVariables,
} from '../types/graphql';

export const useUpdateUser = () => {
  const [updateUser, { data, loading, error }] = useMutation(UpdateUserDocument);

  return {
    updateUser: (variables: UpdateUserMutationVariables) =>
      updateUser({ variables }),
    data: data?.updateUser as UpdateUserMutation['updateUser'],
    loading,
    error,
  };
};
