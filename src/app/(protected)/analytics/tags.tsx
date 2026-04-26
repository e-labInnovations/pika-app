import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import {
  TagDetailContent,
  TagRow,
  TagRowSkeleton,
  type TagActivity,
} from "@/components/home/SpendingTagsCard";
import { useGetMonthlyTags } from "@/services/gql/analytics/analytics.service";
import { useFormatMoney } from "@/lib/format-currency";
import { useColors } from "@/theme/colors";

export default function TagsAnalyticsScreen() {
  const C = useColors();
  const fmt = useFormatMoney();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const params = useLocalSearchParams<{ month?: string; year?: string }>();
  const today = new Date();
  const [month, setMonth] = useState(
    params.month ? Number(params.month) : today.getMonth() + 1,
  );
  const [year, setYear] = useState(
    params.year ? Number(params.year) : today.getFullYear(),
  );
  const [selected, setSelected] = useState<TagActivity | null>(null);

  const { data, loading } = useGetMonthlyTags({ month, year });

  const tags: TagActivity[] = (data?.data ?? [])
    .filter((t): t is TagActivity => t != null && t.totalTransactionCount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const meta = data?.meta;
  const monthName =
    meta?.monthName ??
    new Date(year, month - 1).toLocaleString("en-US", { month: "long" });
  const monthLabel = `${monthName} '${String(year).slice(2)}`;

  const showSkeleton = loading && !data;

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <>
      <View className="flex-1 bg-surface">
        {/* Header */}
        <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface gap-3">
          {/* Title row */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
            >
              <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
            </TouchableOpacity>
            <Text className="flex-1 text-[19px] font-black tracking-[-0.4px] text-on-surface">
              Tag Activity
            </Text>
          </View>

          {/* Month switcher row */}
          <View className="flex-row items-center justify-end">
            <View className="flex-row items-center gap-1">
              <TouchableOpacity onPress={prevMonth} activeOpacity={0.7} className="p-1">
                <DynamicIcon name="chevron-left" size={16} color={C.onSurfaceVariant} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push({ pathname: "/transactions", params: {
                  dateFrom: `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`,
                  dateTo: `${year}-${String(month).padStart(2, "0")}-${new Date(year, month, 0).getDate()}T23:59:59.999Z`,
                }})}
                activeOpacity={0.8}
                className="px-3 py-1.5 rounded-full bg-surface-mid"
              >
                <Text className="text-[12px] font-bold text-primary-bright">
                  {monthLabel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextMonth} activeOpacity={0.7} className="p-1">
                <DynamicIcon name="chevron-right" size={16} color={C.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {showSkeleton ? (
            [1, 2, 3, 4, 5].map((i) => <TagRowSkeleton key={i} />)
          ) : tags.length > 0 ? (
            tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                fmt={fmt}
                onPress={() => setSelected(tag)}
              />
            ))
          ) : (
            <View className="py-16 items-center gap-2">
              <DynamicIcon name="tag" size={40} color={C.outlineVariant} />
              <Text className="text-[14px] text-on-surface-variant">
                No tag activity this month
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Detail sheet */}
      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setSelected(null)}
        />
        <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-surface-low">
          {selected && (
            <TagDetailContent
              tag={selected}
              month={month}
              year={year}
              onClose={() => setSelected(null)}
            />
          )}
        </View>
      </Modal>
    </>
  );
}
