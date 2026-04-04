import { useQuery } from '@apollo/client/react';
import {
  GetTimezonesDocument,
  type GetTimezonesQuery,
} from '../types/graphql';

export type TimezoneDoc = NonNullable<
  NonNullable<NonNullable<GetTimezonesQuery['timezones']>['docs']>[number]
>;

export const useGetTimezones = () => {
  const { data, loading, error } = useQuery<GetTimezonesQuery>(
    GetTimezonesDocument,
    { fetchPolicy: 'cache-first' },
  );

  return {
    timezones: (data?.timezones?.docs?.filter(Boolean) ?? []) as TimezoneDoc[],
    totalDocs: data?.timezones?.totalDocs ?? 0,
    loading,
    error,
  };
};
