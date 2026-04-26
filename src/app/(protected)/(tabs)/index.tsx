import { useApolloClient } from "@apollo/client/react";
import { router } from "expo-router";
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
import { AccountsRow } from "@/components/home/AccountsRow";
import { AIAssistantCard } from "@/components/home/AIAssistantCard";
import { BalanceCard } from "@/components/home/BalanceCard";
import { HomeHeader } from "@/components/home/HomeHeader";
import { MonthlyCalendarCard } from "@/components/home/MonthlyCalendarCard";
import { MonthlyPulseCard } from "@/components/home/MonthlyPulseCard";
import { SplitsDebtsCard } from "@/components/home/SplitsDebtsCard";
import { SpendingTagsCard } from "@/components/home/SpendingTagsCard";
import { TopCategoriesCard } from "@/components/home/TopCategoriesCard";
import { WeeklyActivityCard } from "@/components/home/WeeklyActivityCard";
import { AIAssistantSheet } from "@/components/transaction/AIAssistantSheet";
import { usePendingAIPrefill } from "@/context/AIPrefillBridgeContext";
import {
  useGetDashboardSummary,
  useGetWeeklyExpenses,
} from "@/services/gql/analytics/analytics.service";
import { useGetAccounts } from "@/services/gql/accounts/accounts.service";
import { useColors } from "@/theme/colors";

export default function HomeScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const apolloClient = useApolloClient();
  const { setPending: setAIPrefill } = usePendingAIPrefill();
  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInitialTab, setAiInitialTab] = useState<"text" | "receipt">("text");
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
    await Promise.all([
      refetchDashboard(),
      refetchAccounts(),
      refetchWeekly(),
      apolloClient.refetchQueries({ include: "active" }),
    ]);
    setRefreshing(false);
  }, [refetchDashboard, refetchAccounts, refetchWeekly, apolloClient]);

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
        <AIAssistantCard
          onOpen={(tab) => {
            setAiInitialTab(tab);
            setAiOpen(true);
          }}
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
        <SpendingTagsCard />
        <SplitsDebtsCard />
      </ScrollView>
      <AIAssistantSheet
        visible={aiOpen}
        onClose={() => setAiOpen(false)}
        onUseDetails={(values, image, promptId) => {
          // Park the parsed values in the shared AI-prefill bridge; Add picks
          // them up on mount (see add.tsx useEffect).
          setAIPrefill({ values, image, promptId });
          setAiOpen(false);
          router.push("/add");
        }}
        onCreated={() => {
          setAiOpen(false);
          onRefresh();
        }}
        initialTab={aiInitialTab}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },
});
