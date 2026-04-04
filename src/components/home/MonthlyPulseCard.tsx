import React from "react";
import { Text, View } from "react-native";

type Props = {
  showBalance: boolean;
  income?: number | null;
  expenses?: number | null;
  surplus?: number | null;
  monthName?: string | null;
};

const HIDDEN = "••••••";
const fmt = (n: number) => `$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export function MonthlyPulseCard({ showBalance, income, expenses, surplus, monthName }: Props) {
  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <Text className="text-[10px] font-bold tracking-[2px] uppercase text-on-surface-variant">
        {monthName ? `${monthName} Pulse` : "Monthly Pulse"}
      </Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] text-on-surface-variant">Income</Text>
        <Text className={`text-sm font-bold text-secondary ${!showBalance && "opacity-50 tracking-[3px] text-xs"}`}>
          {showBalance ? (income != null ? `+${fmt(income)}` : "—") : HIDDEN}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] text-on-surface-variant">Expenses</Text>
        <Text className={`text-sm font-bold text-tertiary ${!showBalance && "opacity-50 tracking-[3px] text-xs"}`}>
          {showBalance ? (expenses != null ? `-${fmt(expenses)}` : "—") : HIDDEN}
        </Text>
      </View>

      <View className="h-px rounded-full opacity-10 bg-outline-variant" />

      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] font-semibold text-on-surface">Surplus</Text>
        <Text className={`text-sm font-bold text-secondary ${!showBalance && "opacity-50 tracking-[3px] text-xs"}`}>
          {showBalance ? (surplus != null ? `+${fmt(surplus)}` : "—") : HIDDEN}
        </Text>
      </View>
    </View>
  );
}
