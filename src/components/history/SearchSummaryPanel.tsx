/**
 * Totals for the current search/filter in History: spent, received, count, average, and
 * spending per month for the last 12 months. Tapping a month narrows the list to it.
 * Computed on the server over every match, not just the loaded page.
 */
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import type { SearchSummary } from "../../services/gql/search/search.service";
import { useColors } from "../../theme/colors";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const money = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: n >= 1000 ? 0 : 2 })}`;

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View className="flex-1 gap-0.5">
      <Text className="text-[10px] font-bold uppercase tracking-[0.6px] text-on-surface-variant">{label}</Text>
      <Text className="text-[15px] font-extrabold text-on-surface" style={color ? { color } : undefined} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export function SearchSummaryPanel({
  summary,
  loading,
  selectedMonth,
  onPickMonth,
}: {
  summary: SearchSummary | null;
  loading: boolean;
  /** "2026-11" when the list is narrowed to a month. */
  selectedMonth: string | null;
  onPickMonth: (month: string) => void;
}) {
  const C = useColors();
  if (!summary) {
    return loading ? (
      <View className="mx-4 mt-2 mb-1 rounded-2xl bg-surface-low items-center justify-center" style={{ height: 120 }}>
        <ActivityIndicator color={C.primary} />
      </View>
    ) : null;
  }
  const max = Math.max(...summary.months.map((m) => m.spent), 1);

  return (
    <View className="mx-4 mt-2 mb-1 rounded-2xl bg-surface-low px-4 py-3" style={{ gap: 12 }}>
      <View className="flex-row gap-3">
        <Stat label="Spent" value={money(summary.spent)} color="#ef4444" />
        <Stat label="Received" value={money(summary.received)} color="#10b981" />
      </View>
      <View className="flex-row gap-3">
        <Stat label="Transactions" value={String(summary.count)} />
        <Stat label="Avg spend" value={summary.averageSpend ? money(summary.averageSpend) : "—"} />
      </View>

      <View style={{ gap: 4 }}>
        <View className="flex-row items-end" style={{ height: 56, gap: 4 }}>
          {summary.months.map((m) => {
            const active = selectedMonth === m.month;
            const h = m.spent > 0 ? Math.max(4, Math.round((m.spent / max) * 56)) : 2;
            return (
              <TouchableOpacity
                key={m.month}
                onPress={() => onPickMonth(m.month)}
                activeOpacity={0.7}
                className="flex-1 justify-end"
                style={{ height: 56 }}
                accessibilityLabel={`${m.month}: ${money(m.spent)}`}
              >
                <View
                  style={{
                    height: h,
                    borderRadius: 3,
                    backgroundColor: active ? C.primary : m.spent > 0 ? `${C.primary}66` : `${C.outlineVariant}55`,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="flex-row" style={{ gap: 4 }}>
          {summary.months.map((m) => (
            <Text
              key={m.month}
              className="flex-1 text-center text-[9px]"
              style={{ color: selectedMonth === m.month ? C.primary : C.onSurfaceVariant }}
            >
              {MONTHS[Number(m.month.slice(5, 7)) - 1]?.[0]}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
