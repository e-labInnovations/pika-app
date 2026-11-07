import React from "react";
import { Text, View } from "react-native";
import { DynamicIcon } from "../Icon";
import type { BudgetProgress } from "../../services/gql/budgets/budgets.service";
import { useColors } from "../../theme/colors";

export const STATUS_COLOR = { ok: "#10b981", warn: "#f59e0b", over: "#ef4444" } as const;
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: n >= 1000 ? 0 : 2 })}`;

/** One budget: category, "₹spent of ₹limit", and a bar coloured by status. */
export function BudgetBar({ b }: { b: BudgetProgress }) {
  const C = useColors();
  const color = STATUS_COLOR[b.status];
  return (
    <View style={{ gap: 6 }}>
      <View className="flex-row items-center gap-2.5">
        <View
          className="w-8 h-8 rounded-[10px] items-center justify-center"
          style={{ backgroundColor: b.category.bgColor ?? `${b.category.color ?? C.primary}22` }}
        >
          <DynamicIcon name={b.category.icon ?? "shapes"} size={15} color={b.category.color ?? C.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-[13px] font-semibold text-on-surface" numberOfLines={1}>
            {b.category.name}
          </Text>
          <Text className="text-[11px] text-on-surface-variant">
            {rupees(b.spent)} of {rupees(b.amount)}
          </Text>
        </View>
        <Text className="text-[12px] font-bold" style={{ color }}>
          {b.left >= 0 ? `${rupees(b.left)} left` : `${rupees(-b.left)} over`}
        </Text>
      </View>
      <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${C.outlineVariant}44` }}>
        <View style={{ width: `${Math.min(b.percent, 100)}%`, height: "100%", backgroundColor: color, borderRadius: 999 }} />
      </View>
    </View>
  );
}
