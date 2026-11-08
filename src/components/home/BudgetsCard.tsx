/** Home: this month's budgets, most used first (up to four). Nothing when there are none. */
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BudgetBar } from "../budgets/BudgetBar";
import { DynamicIcon } from "../Icon";
import { useBudgets } from "../../services/gql/budgets/budgets.service";
import { useColors } from "../../theme/colors";

export function BudgetsCard() {
  const C = useColors();
  const { budgets: all } = useBudgets();
  const budgets = all.filter((b) => !b.archived);
  if (!budgets.length) return null;
  return (
    <View className="rounded-2xl bg-surface-low p-5" style={{ gap: 14 }}>
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="target" size={16} color={C.primary} />
        <Text className="text-[15px] font-bold text-on-surface flex-1">Budgets</Text>
        <TouchableOpacity onPress={() => router.push("/settings/budgets")} hitSlop={8}>
          <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>
      {budgets.slice(0, 4).map((b) => (
        <TouchableOpacity
          key={b.id}
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: "/transactions", params: { categoryId: b.categories.join(",") } })}
        >
          <BudgetBar b={b} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
