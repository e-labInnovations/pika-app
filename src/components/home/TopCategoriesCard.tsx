import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
import { useGetMonthlyCategories } from "../../services/gql/analytics/analytics.service";
import { useGetTransactions } from "../../services/gql/transactions/transactions.service";
import type { TransactionFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type CategoryItem = {
  id: string;
  name: string;
  amount: number;
  transactionCount: number;
  icon?: string | null;
  color?: string | null;
  bgColor?: string | null;
  isParent: boolean;
  parentId?: string | null;
};

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonChildRow() {
  const C = useColors();
  return (
    <View className="flex-row items-center gap-2.5 pl-3 py-2">
      <View
        className="w-px self-stretch"
        style={{ backgroundColor: C.outlineVariant }}
      />
      <Skeleton width={26} height={26} radius={8} />
      <Skeleton width="45%" height={11} />
      <View className="flex-1" />
      <Skeleton width={44} height={11} radius={4} />
    </View>
  );
}

function CategoryCardSkeleton() {
  const C = useColors();
  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      <View className="flex-row items-center gap-3 px-3.5 py-3">
        <Skeleton width={36} height={36} radius={10} />
        <View className="flex-1 gap-1.5">
          <Skeleton width="40%" height={12} />
          <Skeleton width="75%" height={5} radius={3} />
        </View>
        <Skeleton width={50} height={12} radius={4} />
      </View>
      <View
        className="mx-3.5"
        style={{ height: 1, backgroundColor: `${C.outlineVariant}44` }}
      />
      <View className="px-3.5 py-1">
        <SkeletonChildRow />
        <SkeletonChildRow />
      </View>
    </View>
  );
}

// ── Child row ─────────────────────────────────────────────────────────────────

function ChildRow({
  child,
  parentColor,
  fmt,
  onPress,
}: {
  child: CategoryItem;
  parentColor: string;
  fmt: (n: number | null | undefined) => string;
  onPress: () => void;
}) {
  const C = useColors();
  const iconColor = child.color ?? parentColor;
  const bgColor = child.bgColor ?? `${iconColor}18`;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-2.5 pl-3 py-1.5"
    >
      <View
        className="w-px self-stretch"
        style={{ backgroundColor: `${C.outlineVariant}80` }}
      />
      <View
        className="w-6.5 h-6.5 rounded-lg items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <DynamicIcon name={child.icon ?? "tag"} size={11} color={iconColor} />
      </View>
      <Text
        className="flex-1 text-[12px] font-medium text-on-surface-variant"
        numberOfLines={1}
      >
        {child.name}
      </Text>
      <Text className="text-[12px] font-semibold text-on-surface-variant">
        {fmt(child.amount)}
      </Text>
    </TouchableOpacity>
  );
}

// ── Tx row (sheet) ────────────────────────────────────────────────────────────

function TxSheetRow({
  tx,
  fmt,
}: {
  tx: TransactionFieldsFragment;
  fmt: (n: number | null | undefined) => string;
}) {
  const color =
    tx.type === "income"
      ? "#10b981"
      : tx.type === "expense"
        ? "#ef4444"
        : "#6366f1";
  const sign = tx.type === "income" ? "+" : tx.type === "expense" ? "-" : "";
  const catColor = (tx.category as any)?.color ?? "#888888";
  const catBgColor = (tx.category as any)?.bgColor ?? `${catColor}20`;
  const catIcon = (tx.category as any)?.icon ?? "tag";
  const time = new Date(tx.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const accountName = (tx.account as any)?.name ?? "";

  return (
    <View className="flex-row items-center gap-3 p-3 rounded-[14px] bg-surface-mid">
      <View
        className="w-9 h-9 rounded-[10px] items-center justify-center"
        style={{ backgroundColor: catBgColor }}
      >
        <DynamicIcon name={catIcon} size={16} color={catColor} />
      </View>
      <View className="flex-1 gap-0.5 min-w-0">
        <Text
          className="text-[13px] font-semibold text-on-surface"
          numberOfLines={1}
        >
          {tx.title}
        </Text>
        {accountName ? (
          <Text
            className="text-[11px] text-on-surface-variant"
            numberOfLines={1}
          >
            {accountName}
          </Text>
        ) : null}
      </View>
      <View className="items-end gap-0.5">
        <Text className="text-[13px] font-bold" style={{ color }}>
          {sign}
          {fmt(Number(tx.amount))}
        </Text>
        <Text className="text-[10px] text-on-surface-variant">{time}</Text>
      </View>
    </View>
  );
}

// ── Category detail sheet ─────────────────────────────────────────────────────

function CategoryDetailContent({
  category,
  categoryIds,
  month,
  year,
  onClose,
}: {
  category: CategoryItem;
  categoryIds: string[];
  month: number;
  year: number;
  onClose: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const insets = useSafeAreaInsets();

  const dateFrom = `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`;
  const lastDay = new Date(year, month, 0).getDate();
  const dateTo = `${year}-${String(month).padStart(2, "0")}-${lastDay}T23:59:59.999Z`;

  const { transactions, loading } = useGetTransactions({
    limit: 20,
    sort: "-date",
    where: {
      AND: [
        { date: { greater_than_equal: dateFrom, less_than_equal: dateTo } },
        { category: { in: categoryIds } },
      ],
    },
  });

  const iconColor = category.color ?? "#6366f1";
  const bgColor = category.bgColor ?? `${iconColor}22`;
  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  const handleViewAll = () => {
    onClose();
    router.push({
      pathname: "/transactions",
      params: { categoryId: categoryIds.join(","), dateFrom, dateTo },
    });
  };

  return (
    <>
      {/* Handle */}
      <View className="items-center pt-3 pb-1.5">
        <View className="w-9 h-1 rounded-full bg-outline-variant" />
      </View>

      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 pb-3.5">
        <View
          className="w-11 h-11 rounded-[13px] items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <DynamicIcon
            name={category.icon ?? "folder"}
            size={20}
            color={iconColor}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-extrabold text-on-surface tracking-tight">
            {category.name}
          </Text>
          <Text className="text-[12px] text-on-surface-variant">
            {monthName} '{String(year).slice(2)}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
          <DynamicIcon name="x" size={18} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Summary pills */}
      <View className="flex-row gap-2 px-5 pb-3.5">
        <View
          className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
          style={{ backgroundColor: "#ef444418" }}
        >
          <DynamicIcon name="trending-down" size={12} color="#ef4444" />
          <Text className="text-[12px] font-bold" style={{ color: "#ef4444" }}>
            {fmt(category.amount)}
          </Text>
        </View>
        <View className="flex-row items-center gap-1 rounded-full px-2.5 py-1 bg-surface-highest">
          <DynamicIcon name="receipt" size={12} color={C.onSurfaceVariant} />
          <Text className="text-[12px] font-semibold text-on-surface-variant">
            {category.transactionCount} txn
            {category.transactionCount !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      {/* Transaction list */}
      <ScrollView
        style={{ maxHeight: 340 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 6,
          paddingBottom: 4,
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          [1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              width="100%"
              height={60}
              radius={14}
              style={{ marginBottom: 6 }}
            />
          ))
        ) : transactions?.length ? (
          transactions.map((tx) => <TxSheetRow key={tx.id} tx={tx} fmt={fmt} />)
        ) : (
          <View className="py-7 items-center">
            <Text className="text-[13px] text-on-surface-variant">
              No transactions found
            </Text>
          </View>
        )}
      </ScrollView>

      {/* View All */}
      <View
        className="px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4 }}
      >
        <TouchableOpacity
          onPress={handleViewAll}
          activeOpacity={0.8}
          className="p-4 rounded-2xl items-center bg-surface-mid"
        >
          <Text className="text-[14px] font-bold text-primary-bright">
            {category.transactionCount > 0
              ? `View All ${category.transactionCount} Transactions`
              : "View in History"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// ── Parent card ───────────────────────────────────────────────────────────────

function ParentCard({
  parent,
  children,
  totalExpenses,
  allExpanded,
  fmt,
  onSelect,
}: {
  parent: CategoryItem;
  children: CategoryItem[];
  totalExpenses: number;
  allExpanded: boolean;
  fmt: (n: number | null | undefined) => string;
  onSelect: (cat: CategoryItem, categoryIds: string[]) => void;
}) {
  const C = useColors();
  const iconColor = parent.color ?? C.primaryBright;
  const bgColor = parent.bgColor ?? `${iconColor}22`;
  const barPct =
    totalExpenses > 0 ? Math.min(parent.amount / totalExpenses, 1) : 0;
  const pct = Math.round(barPct * 100);
  const childIds = children.map((c) => c.id);

  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      {/* Parent row */}
      <TouchableOpacity
        onPress={() =>
          onSelect(parent, childIds.length > 0 ? childIds : [parent.id])
        }
        activeOpacity={0.7}
        className="flex-row items-center gap-3 px-3.5 py-3"
      >
        <View
          className="w-9 h-9 rounded-[10px] items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <DynamicIcon
            name={parent.icon ?? "folder"}
            size={16}
            color={iconColor}
          />
        </View>

        <View className="flex-1 gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[13px] font-bold text-on-surface"
              numberOfLines={1}
            >
              {parent.name}
            </Text>
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[10px] text-on-surface-variant">
                {pct}%
              </Text>
              <Text className="text-[13px] font-bold text-on-surface">
                {fmt(parent.amount)}
              </Text>
            </View>
          </View>
          {/* Progress bar */}
          <View className="h-[3px] rounded-full bg-surface-highest">
            <View
              style={{
                width: `${barPct * 100}%`,
                height: "100%",
                borderRadius: 2,
                backgroundColor: bgColor,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Children — controlled by global allExpanded */}
      {children.length > 0 && allExpanded && (
        <>
          <View
            className="mx-3.5"
            style={{ height: 1, backgroundColor: `${C.outlineVariant}44` }}
          />
          <View className="px-3.5 py-1">
            {children.map((child) => (
              <ChildRow
                key={child.id}
                child={child}
                parentColor={iconColor}
                fmt={fmt}
                onPress={() => onSelect(child, [child.id])}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TopCategoriesCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [allExpanded, setAllExpanded] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
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

  const prevMonth = () => {
    setHasNavigated(true);
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    setHasNavigated(true);
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const showSkeleton = loading && !data;
  if (!showSkeleton && !parents.length && !hasNavigated) return null;

  const dateFrom = `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`;
  const lastDay = new Date(year, month, 0).getDate();
  const dateTo = `${year}-${String(month).padStart(2, "0")}-${lastDay}T23:59:59.999Z`;

  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="gap-0.5">
          <Text className="text-base font-extrabold tracking-tight text-on-surface">
            Category Spending
          </Text>
          {totalExpenses > 0 && (
            <Text className="text-[11px] text-on-surface-variant">
              Total {fmt(totalExpenses)}
            </Text>
          )}
        </View>
        <View className="flex-row items-center gap-1.5">
          {hasAnyChildren && !showSkeleton && (
            <TouchableOpacity
              onPress={() => setAllExpanded((v) => !v)}
              activeOpacity={0.7}
              className="w-7 h-7 rounded-full items-center justify-center bg-surface-highest"
            >
              <DynamicIcon
                name={allExpanded ? "chevron-up" : "chevron-down"}
                size={14}
                color={C.onSurfaceVariant}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={prevMonth}
            activeOpacity={0.7}
            className="p-1"
          >
            <DynamicIcon
              name="chevron-left"
              size={16}
              color={C.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/transactions",
                params: { dateFrom, dateTo },
              })
            }
            activeOpacity={0.8}
            className="px-2.5 py-1 rounded-full bg-surface-highest"
          >
            <Text className="text-[11px] font-bold text-primary-bright">
              {monthLabel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextMonth}
            activeOpacity={0.7}
            className="p-1"
          >
            <DynamicIcon
              name="chevron-right"
              size={16}
              color={C.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="gap-2">
        {showSkeleton ? (
          [0, 1, 2].map((i) => <CategoryCardSkeleton key={i} />)
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
          <View className="py-6 items-center gap-1.5">
            <DynamicIcon name="folder-open" size={28} color={C.outlineVariant} />
            <Text className="text-[13px] text-on-surface-variant">
              No spending this month
            </Text>
          </View>
        )}
      </View>

      {/* Category detail sheet */}
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
    </View>
  );
}
