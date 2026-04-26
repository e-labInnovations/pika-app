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
  CategoryCardSkeleton,
  CategoryDetailContent,
  ParentCard,
  type CategoryItem,
} from "@/components/home/TopCategoriesCard";
import { useGetMonthlyCategories } from "@/services/gql/analytics/analytics.service";
import { useFormatMoney } from "@/lib/format-currency";
import { useColors } from "@/theme/colors";

export default function CategoriesAnalyticsScreen() {
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
  const [allExpanded, setAllExpanded] = useState(false);
  const [selected, setSelected] = useState<{
    category: CategoryItem;
    categoryIds: string[];
  } | null>(null);

  const { data, loading } = useGetMonthlyCategories({ month, year });

  const categories: CategoryItem[] = (data?.data ?? []).filter(
    (c): c is CategoryItem => c != null,
  );
  const meta = data?.meta;
  const totalExpenses = meta?.totalExpenses ?? 0;

  const childrenMap: Record<string, CategoryItem[]> = {};
  for (const c of categories) {
    if (!c.isParent && c.parentId && c.amount > 0) {
      if (!childrenMap[c.parentId]) childrenMap[c.parentId] = [];
      childrenMap[c.parentId].push(c);
    }
  }

  const parents = categories
    .filter((c) => c.isParent && c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const hasAnyChildren = parents.some(
    (p) => (childrenMap[p.id]?.length ?? 0) > 0,
  );

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
              Category Spending
            </Text>
            {hasAnyChildren && !showSkeleton && (
              <TouchableOpacity
                onPress={() => setAllExpanded((v) => !v)}
                activeOpacity={0.7}
                className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
              >
                <DynamicIcon
                  name={allExpanded ? "chevron-up" : "chevron-down"}
                  size={14}
                  color={C.onSurfaceVariant}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Month switcher row */}
          <View className="flex-row items-center justify-between">
            {totalExpenses > 0 && !showSkeleton ? (
              <Text className="text-[13px] font-semibold text-on-surface-variant">
                Total {fmt(totalExpenses)}
              </Text>
            ) : (
              <View />
            )}
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
          contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {showSkeleton ? (
            [0, 1, 2, 3, 4].map((i) => <CategoryCardSkeleton key={i} />)
          ) : parents.length > 0 ? (
            parents.map((parent) => (
              <ParentCard
                key={parent.id}
                parent={parent}
                children={(childrenMap[parent.id] ?? []).sort(
                  (a, b) => b.amount - a.amount,
                )}
                totalExpenses={totalExpenses}
                allExpanded={allExpanded}
                fmt={fmt}
                onSelect={(cat, ids) =>
                  setSelected({ category: cat, categoryIds: ids })
                }
              />
            ))
          ) : (
            <View className="py-16 items-center gap-2">
              <DynamicIcon name="folder-open" size={40} color={C.outlineVariant} />
              <Text className="text-[14px] text-on-surface-variant">
                No spending this month
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
            <CategoryDetailContent
              category={selected.category}
              categoryIds={selected.categoryIds}
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
