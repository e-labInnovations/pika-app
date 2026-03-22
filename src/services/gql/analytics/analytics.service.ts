import { useQuery } from '@apollo/client/react';
import {
  GetDashboardSummaryDocument,
  GetMonthlyCategoriesDocument,
  GetMonthlyTagsDocument,
  GetMonthlyPeopleDocument,
  GetWeeklyExpensesDocument,
  GetMonthlyCalendarDocument,
  type GetDashboardSummaryQuery,
  type GetMonthlyCategoriesQuery,
  type GetMonthlyCategoriesQueryVariables,
  type GetMonthlyTagsQuery,
  type GetMonthlyTagsQueryVariables,
  type GetMonthlyPeopleQuery,
  type GetMonthlyPeopleQueryVariables,
  type GetWeeklyExpensesQuery,
  type GetMonthlyCalendarQuery,
  type GetMonthlyCalendarQueryVariables,
} from '../types/graphql';

export const useGetDashboardSummary = () => {
  const { data, loading, error, refetch } = useQuery(
    GetDashboardSummaryDocument,
    { fetchPolicy: 'cache-and-network' },
  );

  return {
    data: data?.dashboardSummary as GetDashboardSummaryQuery['dashboardSummary'],
    loading,
    error,
    refetch,
  };
};

export const useGetMonthlyCategories = (
  variables?: GetMonthlyCategoriesQueryVariables,
) => {
  const { data, loading, error, refetch } = useQuery(
    GetMonthlyCategoriesDocument,
    { variables, fetchPolicy: 'cache-and-network' },
  );

  return {
    data: data?.monthlyCategories as GetMonthlyCategoriesQuery['monthlyCategories'],
    loading,
    error,
    refetch,
  };
};

export const useGetMonthlyTags = (variables?: GetMonthlyTagsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GetMonthlyTagsDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.monthlyTags as GetMonthlyTagsQuery['monthlyTags'],
    loading,
    error,
    refetch,
  };
};

export const useGetMonthlyPeople = (
  variables?: GetMonthlyPeopleQueryVariables,
) => {
  const { data, loading, error, refetch } = useQuery(GetMonthlyPeopleDocument, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.monthlyPeople as GetMonthlyPeopleQuery['monthlyPeople'],
    loading,
    error,
    refetch,
  };
};

export const useGetWeeklyExpenses = () => {
  const { data, loading, error, refetch } = useQuery(
    GetWeeklyExpensesDocument,
    { fetchPolicy: 'cache-and-network' },
  );

  return {
    data: data?.weeklyExpenses as GetWeeklyExpensesQuery['weeklyExpenses'],
    loading,
    error,
    refetch,
  };
};

export const useGetMonthlyCalendar = (
  variables?: GetMonthlyCalendarQueryVariables,
) => {
  const { data, loading, error, refetch } = useQuery(
    GetMonthlyCalendarDocument,
    { variables, fetchPolicy: 'cache-and-network' },
  );

  return {
    data: data?.monthlyCalendar as GetMonthlyCalendarQuery['monthlyCalendar'],
    loading,
    error,
    refetch,
  };
};
