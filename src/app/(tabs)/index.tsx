import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountsRow } from "../../components/home/AccountsRow";
import { BalanceCard } from "../../components/home/BalanceCard";
import { HomeHeader } from "../../components/home/HomeHeader";
import { MonthlyCalendarCard } from "../../components/home/MonthlyCalendarCard";
import { MonthlyPulseCard } from "../../components/home/MonthlyPulseCard";
import { SplitsDebtsCard } from "../../components/home/SplitsDebtsCard";
import { SpendingTagsCard } from "../../components/home/SpendingTagsCard";
import { TopCategoriesCard } from "../../components/home/TopCategoriesCard";
import { WeeklyActivityCard } from "../../components/home/WeeklyActivityCard";
import {
  useGetDashboardSummary,
  useGetWeeklyExpenses,
} from "../../services/gql/analytics/analytics.service";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useColors } from "../../theme/colors";

export default function HomeScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: dashboard,
    loading: dashboardLoading,
    refetch: refetchDashboard,
  } = useGetDashboardSummary();
  const {
    accounts,
    loading: accountsLoading,
    refetch: refetchAccounts,
  } = useGetAccounts({ limit: 20, sort: "-updatedAt" });
  const {
    data: weeklyExpenses,
    loading: weeklyLoading,
    refetch: refetchWeekly,
  } = useGetWeeklyExpenses();
  const pulse = dashboard?.monthlyPulse;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchDashboard(), refetchAccounts(), refetchWeekly()]);
    setRefreshing(false);
  }, [refetchDashboard, refetchAccounts, refetchWeekly]);

  return (
    <View style={[s.root, { backgroundColor: C.surface }]}>
      <StatusBar style="auto" />
      <HomeHeader topPad={topPad} />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BalanceCard
          showBalance={showBalance}
          onToggle={() => setShowBalance((v) => !v)}
          totalBalance={dashboard?.totalBalance}
          balanceChangePercent={dashboard?.balanceChangePercent}
          loading={dashboardLoading}
        />
        <MonthlyPulseCard
          showBalance={showBalance}
          income={pulse?.income}
          expenses={pulse?.expenses}
          surplus={pulse?.surplus}
          monthName={pulse?.monthName}
          loading={dashboardLoading}
        />
        <AccountsRow
          showBalance={showBalance}
          accounts={accounts}
          loading={accountsLoading}
        />
        <WeeklyActivityCard
          days={weeklyExpenses?.days}
          loading={weeklyLoading}
        />
        <MonthlyCalendarCard />
        <TopCategoriesCard />
        <SplitsDebtsCard />
        <SpendingTagsCard />
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },
});
