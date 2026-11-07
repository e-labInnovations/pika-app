/**
 * What stands out this month (server rules: category above/below usual, spending pace,
 * an unusually large expense, a new payee). Tap one to see its transactions in History;
 * ✕ hides it until next month (the key carries the month). Nothing when there's nothing.
 */
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useInsights, type Insight } from "../../services/gql/search/search.service";
import { useColors } from "../../theme/colors";

const DISMISSED_KEY = "pika_dismissed_insights";

const TONE = {
  warn: { icon: "trending-up", color: "#f59e0b" },
  good: { icon: "trending-down", color: "#10b981" },
  info: { icon: "sparkles", color: "#6366f1" },
} as const;

function open(i: Insight) {
  router.push({
    pathname: "/transactions",
    params: {
      dateFrom: i.filter.dateFrom,
      dateTo: i.filter.dateTo,
      ...(i.filter.categories?.length ? { categoryId: i.filter.categories.join(",") } : {}),
      ...(i.filter.query ? { q: i.filter.query } : {}),
    },
  });
}

export function InsightsCard() {
  const C = useColors();
  const { insights } = useInsights();
  const [dismissed, setDismissed] = useState<string[] | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(DISMISSED_KEY)
      .then((v) => setDismissed(v ? (JSON.parse(v) as string[]) : []))
      .catch(() => setDismissed([]));
  }, []);

  const dismiss = (key: string) => {
    // Keep only this month's keys plus the new one, so the list never grows.
    const month = key.slice(-7);
    const next = [...(dismissed ?? []).filter((k) => k.endsWith(month)), key];
    setDismissed(next);
    SecureStore.setItemAsync(DISMISSED_KEY, JSON.stringify(next)).catch(() => {});
  };

  if (dismissed === null) return null;
  const visible = insights.filter((i) => !dismissed.includes(i.key));
  if (!visible.length) return null;

  return (
    <View className="rounded-2xl bg-surface-low p-5" style={{ gap: 10 }}>
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="lightbulb" size={16} color={C.primary} />
        <Text className="text-[15px] font-bold text-on-surface flex-1">This month</Text>
      </View>
      {visible.map((i) => {
        const tone = TONE[i.tone] ?? TONE.info;
        return (
          <TouchableOpacity
            key={i.key}
            onPress={() => open(i)}
            activeOpacity={0.8}
            className="flex-row items-start gap-3 rounded-2xl p-3"
            style={{ backgroundColor: `${tone.color}14` }}
          >
            <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: `${tone.color}26` }}>
              <DynamicIcon name={tone.icon} size={15} color={tone.color} />
            </View>
            <View className="flex-1" style={{ gap: 2 }}>
              <Text className="text-[13px] font-semibold text-on-surface" numberOfLines={1}>
                {i.title}
              </Text>
              <Text className="text-[12px] text-on-surface-variant leading-4">{i.message}</Text>
            </View>
            <TouchableOpacity onPress={() => dismiss(i.key)} hitSlop={8} accessibilityLabel="Hide until next month">
              <DynamicIcon name="x" size={14} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
