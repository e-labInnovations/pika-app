import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
import { useGetMonthlyTags } from "../../services/gql/analytics/analytics.service";
import { useGetTransactions } from "../../services/gql/transactions/transactions.service";
import type { TransactionFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type TagActivity = {
  id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
  bgColor?: string | null;
  totalAmount: number;
  totalTransactionCount: number;
  expenseAmount: number;
  incomeAmount: number;
};

const EXPENSE_COLOR = "#ef4444";
const INCOME_COLOR = "#10b981";

// ── Type pill ─────────────────────────────────────────────────────────────────

function TypePill({
  amount,
  color,
  icon,
  fmt,
}: {
  amount: number;
  color: string;
  icon: string;
  fmt: (n: number) => string;
}) {
  if (amount <= 0) return null;
  return (
    <View
      className="flex-row items-center gap-0.5 rounded-full px-2 py-0.5"
      style={{ backgroundColor: `${color}18` }}
    >
      <DynamicIcon name={icon} size={9} color={color} />
      <Text className="text-[10px] font-bold" style={{ color }}>
        {fmt(amount)}
      </Text>
    </View>
  );
}

// ── Tag row ───────────────────────────────────────────────────────────────────

function TagRow({
  tag,
  fmt,
  onPress,
}: {
  tag: TagActivity;
  fmt: (n: number) => string;
  onPress: () => void;
}) {
  const C = useColors();
  const iconColor = tag.color ?? C.primaryBright;
  const bgColor = tag.bgColor ?? `${iconColor}22`;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3"
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <DynamicIcon name={tag.icon ?? "tag"} size={16} color={iconColor} />
      </View>

      <View className="flex-1 gap-1 min-w-0">
        <Text
          className="text-[13px] font-bold text-on-surface"
          numberOfLines={1}
        >
          {tag.name}
        </Text>
        <View className="flex-row flex-wrap gap-1">
          <TypePill
            amount={tag.expenseAmount}
            color={EXPENSE_COLOR}
            icon="trending-down"
            fmt={fmt}
          />
          <TypePill
            amount={tag.incomeAmount}
            color={INCOME_COLOR}
            icon="trending-up"
            fmt={fmt}
          />
        </View>
      </View>

      <View className="items-end gap-0.5">
        <Text className="text-[13px] font-bold text-on-surface">
          {fmt(tag.totalAmount)}
        </Text>
        <Text className="text-[10px] text-on-surface-variant">
          {tag.totalTransactionCount} txn
          {tag.totalTransactionCount !== 1 ? "s" : ""}
        </Text>
      </View>
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
      ? INCOME_COLOR
      : tx.type === "expense"
        ? EXPENSE_COLOR
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

// ── Tag detail sheet ──────────────────────────────────────────────────────────

function TagDetailContent({
  tag,
  month,
  year,
  onClose,
}: {
  tag: TagActivity;
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
        { tags: { in: [tag.id] } },
      ],
    },
  });

  const iconColor = tag.color ?? C.primaryBright;
  const bgColor = tag.bgColor ?? `${iconColor}22`;
  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  const handleViewAll = () => {
    onClose();
    router.push({
      pathname: "/transactions",
      params: { tagId: tag.id, dateFrom, dateTo },
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
          <DynamicIcon name={tag.icon ?? "tag"} size={20} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-extrabold text-on-surface tracking-tight">
            {tag.name}
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
      <View className="flex-row gap-2 px-5 pb-3.5 flex-wrap">
        {tag.expenseAmount > 0 && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${EXPENSE_COLOR}18` }}
          >
            <DynamicIcon name="trending-down" size={12} color={EXPENSE_COLOR} />
            <Text
              className="text-[12px] font-bold"
              style={{ color: EXPENSE_COLOR }}
            >
              {fmt(tag.expenseAmount)}
            </Text>
          </View>
        )}
        {tag.incomeAmount > 0 && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${INCOME_COLOR}18` }}
          >
            <DynamicIcon name="trending-up" size={12} color={INCOME_COLOR} />
            <Text
              className="text-[12px] font-bold"
              style={{ color: INCOME_COLOR }}
            >
              {fmt(tag.incomeAmount)}
            </Text>
          </View>
        )}
        <View className="flex-row items-center gap-1 rounded-full px-2.5 py-1 bg-surface-highest">
          <DynamicIcon name="receipt" size={12} color={C.onSurfaceVariant} />
          <Text className="text-[12px] font-semibold text-on-surface-variant">
            {tag.totalTransactionCount} txn
            {tag.totalTransactionCount !== 1 ? "s" : ""}
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
            {tag.totalTransactionCount > 0
              ? `View All ${tag.totalTransactionCount} Transactions`
              : "View in History"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────

function TagRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3">
      <Skeleton width={36} height={36} radius={12} />
      <View className="flex-1 gap-1.5">
        <Skeleton width="40%" height={12} />
        <Skeleton width="60%" height={10} />
      </View>
      <View className="items-end gap-1.5">
        <Skeleton width={50} height={12} />
        <Skeleton width={30} height={10} />
      </View>
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SpendingTagsCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<TagActivity | null>(null);

  const { data, loading } = useGetMonthlyTags({ month, year });

  const tags: TagActivity[] = (data?.data ?? [])
    .filter((t): t is TagActivity => t != null && t.totalAmount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const meta = data?.meta;
  const monthName =
    meta?.monthName ??
    new Date(year, month - 1).toLocaleString("en-US", { month: "long" });
  const monthLabel = `${monthName} '${String(year).slice(2)}`;

  const dateFrom = `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`;
  const lastDay = new Date(year, month, 0).getDate();
  const dateTo = `${year}-${String(month).padStart(2, "0")}-${lastDay}T23:59:59.999Z`;

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const showSkeleton = loading && !data;
  if (!showSkeleton && !tags.length) return null;

  return (
    <>
      <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-extrabold tracking-tight text-on-surface">
            Tag Activity
          </Text>
          <View className="flex-row items-center gap-1.5">
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

        <View className="h-px rounded-full opacity-10 bg-outline-variant" />

        {/* Rows */}
        <View className="gap-3.5">
          {showSkeleton
            ? [1, 2, 3].map((i) => <TagRowSkeleton key={i} />)
            : tags.map((tag) => (
                <TagRow
                  key={tag.id}
                  tag={tag}
                  fmt={fmt}
                  onPress={() => setSelected(tag)}
                />
              ))}
        </View>
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
