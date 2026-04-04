import { useQuery } from '@apollo/client/react';
import {
  GetCurrenciesDocument,
  type GetCurrenciesQuery,
} from '../types/graphql';

export type CurrencyDoc = NonNullable<
  NonNullable<NonNullable<GetCurrenciesQuery['currencies']>['docs']>[number]
>;

export const useGetCurrencies = () => {
  const { data, loading, error } = useQuery<GetCurrenciesQuery>(
    GetCurrenciesDocument,
    { fetchPolicy: 'cache-first' },
  );

  return {
    currencies: (data?.currencies?.docs?.filter(Boolean) ?? []) as CurrencyDoc[],
    totalDocs: data?.currencies?.totalDocs ?? 0,
    loading,
    error,
  };
};
