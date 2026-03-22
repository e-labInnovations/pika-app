import { useMutation, useQuery } from '@apollo/client/react';
import {
  GetPersonDocument,
  GetPeopleDocument,
  CreatePersonDocument,
  UpdatePersonDocument,
  DeletePersonDocument,
  type PersonFieldsFragment,
  type GetPeopleQuery,
  type GetPeopleQueryVariables,
  type CreatePersonMutationVariables,
  type UpdatePersonMutationVariables,
} from '../types/graphql';

export const useGetPeople = (variables?: GetPeopleQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GetPeopleDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.People as GetPeopleQuery['People'] | undefined,
    people: data?.People?.docs as PersonFieldsFragment[] | undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetPerson = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GetPersonDocument, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.Person as PersonFieldsFragment | null | undefined,
    loading,
    error,
    refetch,
  };
};

export const useCreatePerson = () => {
  const [createPerson, { data, loading, error }] = useMutation(
    CreatePersonDocument,
    { refetchQueries: ['GetPeople'] },
  );

  return {
    createPerson: (variables: CreatePersonMutationVariables) =>
      createPerson({ variables }),
    data: data?.createPerson as PersonFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useUpdatePerson = () => {
  const [updatePerson, { data, loading, error }] = useMutation(
    UpdatePersonDocument,
    { refetchQueries: ['GetPeople'] },
  );

  return {
    updatePerson: (variables: UpdatePersonMutationVariables) =>
      updatePerson({ variables }),
    data: data?.updatePerson as PersonFieldsFragment | null | undefined,
    loading,
    error,
  };
};

export const useDeletePerson = () => {
  const [deletePerson, { data, loading, error }] = useMutation(
    DeletePersonDocument,
    { refetchQueries: ['GetPeople'] },
  );

  return {
    deletePerson: (id: string) => deletePerson({ variables: { id } }),
    data: data?.deletePerson,
    loading,
    error,
  };
};
