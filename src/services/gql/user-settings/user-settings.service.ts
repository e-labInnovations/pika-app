import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetUserSettingsDocument,
  UpdateUserSettingsDocument,
  type UserSettingsFieldsFragment,
  type UpdateUserSettingsMutationVariables,
} from '../types/graphql';

export const useGetUserSettings = () => {
  const { data, loading, error, refetch } = useQuery(GetUserSettingsDocument, {
    fetchPolicy: 'cache-and-network',
  });

  const settings = data?.UserSettings?.docs?.[0] as
    | UserSettingsFieldsFragment
    | undefined;

  return {
    data: settings,
    loading,
    error,
    refetch,
  };
};

export const useUpdateUserSettings = () => {
  const [updateUserSettings, { data, loading, error }] = useMutation(
    UpdateUserSettingsDocument,
    { refetchQueries: ['GetUserSettings'] },
  );

  return {
    updateUserSettings: (variables: UpdateUserSettingsMutationVariables) =>
      updateUserSettings({ variables }),
    data: data?.updateUserSetting as UserSettingsFieldsFragment | null | undefined,
    loading,
    error,
  };
};
