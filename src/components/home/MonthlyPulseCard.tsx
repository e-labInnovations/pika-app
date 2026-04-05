import React from "react";
import { Text, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";

type Props = {
  showBalance: boolean;
  income?: number | null;
  expenses?: number | null;
  surplus?: number | null;
  monthName?: string | null;
  loading?: boolean;
};

const HIDDEN = "••••••";

export function MonthlyPulseCard({ showBalance, income, expenses, surplus, monthName, loading }: Props) {
  const fmt = useFormatMoney();
  const surplusPositive = (surplus ?? 0) >= 0;

  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      {/* Title */}
      {loading ? (
        <Skeleton width={120} height={11} radius={5} />
      ) : (
        <Text className="text-[10px] font-extrabold tracking-[2px] uppercase text-on-surface-variant">
          {monthName ? `${monthName} Pulse` : "Monthly Pulse"}
        </Text>
      )}

      {/* Income row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] text-on-surface-variant">Income</Text>
        {loading ? (
          <Skeleton width={80} height={14} radius={6} />
        ) : showBalance ? (
          <View className="flex-row items-center gap-1">
            <DynamicIcon name="trending-up" size={13} color="#10b981" />
            <Text className="text-[14px] font-bold" style={{ color: "#10b981" }}>
              {income != null ? fmt(Math.abs(income)) : "—"}
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] font-bold opacity-50" style={{ color: "#10b981", letterSpacing: 3 }}>
            {HIDDEN}
          </Text>
        )}
      </View>

      {/* Expenses row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] text-on-surface-variant">Expenses</Text>
        {loading ? (
          <Skeleton width={72} height={14} radius={6} />
        ) : showBalance ? (
          <View className="flex-row items-center gap-1">
            <DynamicIcon name="trending-down" size={13} color="#ef4444" />
            <Text className="text-[14px] font-bold" style={{ color: "#ef4444" }}>
              {expenses != null ? fmt(Math.abs(expenses)) : "—"}
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] font-bold opacity-50" style={{ color: "#ef4444", letterSpacing: 3 }}>
            {HIDDEN}
          </Text>
        )}
      </View>

      {/* Divider */}
      <View className="h-px rounded-full opacity-10 bg-outline-variant" />

      {/* Surplus row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] font-semibold text-on-surface">Surplus</Text>
        {loading ? (
          <Skeleton width={88} height={14} radius={6} />
        ) : showBalance ? (
          <View className="flex-row items-center gap-1">
            <DynamicIcon
              name={surplusPositive ? "trending-up" : "trending-down"}
              size={13}
              color={surplusPositive ? "#10b981" : "#ef4444"}
            />
            <Text className="text-[14px] font-bold" style={{ color: surplusPositive ? "#10b981" : "#ef4444" }}>
              {surplus != null ? fmt(Math.abs(surplus)) : "—"}
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] font-bold opacity-50" style={{ color: surplusPositive ? "#10b981" : "#ef4444", letterSpacing: 3 }}>
            {HIDDEN}
          </Text>
        )}
      </View>
    </View>
  );
}
