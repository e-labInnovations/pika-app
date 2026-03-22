import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetReminderDocument,
  GetRemindersDocument,
  CreateReminderDocument,
  UpdateReminderDocument,
  DeleteReminderDocument,
  type ReminderFieldsFragment,
  type GetRemindersQuery,
  type GetRemindersQueryVariables,
  type CreateReminderMutationVariables,
  type UpdateReminderMutationVariables,
} from '../types/graphql';

export const useGetReminders = (variables?: GetRemindersQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GetRemindersDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Reminders as GetRemindersQuery['Reminders'] | undefined,
    reminders: data?.Reminders?.docs as ReminderFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetReminder = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GetReminderDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Reminder as ReminderFieldsFragment | null | undefined,
    loading,
    error,
    refetch,
  };
};

export const useCreateReminder = () => {
  const [createReminder, { data, loading, error }] = useMutation(
    CreateReminderDocument,
    { refetchQueries: ['GetReminders'] },
  );

  return {
    createReminder: (variables: CreateReminderMutationVariables) =>
      createReminder({ variables }),
    data: data?.createReminder as ReminderFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useUpdateReminder = () => {
  const [updateReminder, { data, loading, error }] = useMutation(
    UpdateReminderDocument,
    { refetchQueries: ['GetReminders'] },
  );

  return {
    updateReminder: (variables: UpdateReminderMutationVariables) =>
      updateReminder({ variables }),
    data: data?.updateReminder as ReminderFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useDeleteReminder = () => {
  const [deleteReminder, { data, loading, error }] = useMutation(
    DeleteReminderDocument,
    { refetchQueries: ['GetReminders'] },
  );

  return {
    deleteReminder: (id: string) => deleteReminder({ variables: { id } }),
    data: data?.deleteReminder,
    loading,
    error,
  };
};
