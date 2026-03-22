import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountsRow } from "../../components/home/AccountsRow";
import { BalanceCard } from "../../components/home/BalanceCard";
import { HomeHeader } from "../../components/home/HomeHeader";
import { MonthlyPulseCard } from "../../components/home/MonthlyPulseCard";
import { SplitsDebtsCard } from "../../components/home/SplitsDebtsCard";
import { SpendingTagsCard } from "../../components/home/SpendingTagsCard";
import { TopCategoriesCard } from "../../components/home/TopCategoriesCard";
import { WeeklyActivityCard } from "../../components/home/WeeklyActivityCard";
import { useColors } from "../../theme/colors";

export default function HomeScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  return (
    <View style={[s.root, { backgroundColor: C.surface }]}>
      <StatusBar style="auto" />
      <HomeHeader topPad={topPad} />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard />
        <MonthlyPulseCard />
        <AccountsRow />
        <WeeklyActivityCard />
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
