import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Platform, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountsRow } from "../../components/home/AccountsRow";
import { BalanceCard } from "../../components/home/BalanceCard";
import { HomeHeader } from "../../components/home/HomeHeader";
import { MonthlyPulseCard } from "../../components/home/MonthlyPulseCard";
import { SplitsDebtsCard } from "../../components/home/SplitsDebtsCard";
import { SpendingTagsCard } from "../../components/home/SpendingTagsCard";
import { TopCategoriesCard } from "../../components/home/TopCategoriesCard";
import { WeeklyActivityCard } from "../../components/home/WeeklyActivityCard";
import { useGetDashboardSummary, useGetMonthlyCategories, useGetWeeklyExpenses } from "../../services/gql/analytics/analytics.service";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useColors } from "../../theme/colors";

export default function HomeScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data: dashboard, refetch: refetchDashboard } = useGetDashboardSummary();
  const { accounts, refetch: refetchAccounts } = useGetAccounts({ limit: 20, sort: "name" });
  const { data: weeklyExpenses, refetch: refetchWeekly } = useGetWeeklyExpenses();
  const { data: monthlyCategories, refetch: refetchCategories } = useGetMonthlyCategories();
  const pulse = dashboard?.monthlyPulse;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchDashboard(), refetchAccounts(), refetchWeekly(), refetchCategories()]);
    setRefreshing(false);
  }, [refetchDashboard, refetchAccounts, refetchWeekly, refetchCategories]);

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
        />
        <MonthlyPulseCard
          showBalance={showBalance}
          income={pulse?.income}
          expenses={pulse?.expenses}
          surplus={pulse?.surplus}
          monthName={pulse?.monthName}
        />
        <AccountsRow showBalance={showBalance} accounts={accounts} />
        <WeeklyActivityCard days={weeklyExpenses?.days} />
        <TopCategoriesCard categories={monthlyCategories?.data} monthName={monthlyCategories?.meta?.monthName} />
        <SplitsDebtsCard />
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },
});
