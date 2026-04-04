import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

export type CurrencyDoc = {
  code: string;
  name: string;
  symbol: string;
  symbol_native: string;
  decimal_digits: number;
};

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      docs {
        code
        name
        symbol
        symbol_native
        decimal_digits
      }
      totalDocs
    }
  }
`;

export const useGetCurrencies = () => {
  const { data, loading, error } = useQuery<{
    currencies: { docs: CurrencyDoc[]; totalDocs: number };
  }>(GET_CURRENCIES, {
    fetchPolicy: 'cache-first',
  });

  return {
    currencies: data?.currencies?.docs ?? [],
    totalDocs: data?.currencies?.totalDocs ?? 0,
    loading,
    error,
  };
};
