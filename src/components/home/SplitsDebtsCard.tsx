import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
import { useGetMonthlyPeople } from "../../services/gql/analytics/analytics.service";
import { useGetTransactions } from "../../services/gql/transactions/transactions.service";
import type { TransactionFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PersonActivity = {
  id: string;
  name: string;
  balance: number;
  totalAmount: number;
  totalTransactionCount: number;
  expenseAmount: number;
  incomeAmount: number;
};

const EXPENSE_COLOR = "#ef4444";
const INCOME_COLOR = "#10b981";

// ── Avatar ────────────────────────────────────────────────────────────────────

function PersonAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const C = useColors();
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <View
      className="rounded-full items-center justify-center"
      style={{
        width: size,
        height: size,
        backgroundColor: `${C.primaryBright}22`,
      }}
    >
      <Text
        className="font-extrabold text-primary-bright"
        style={{ fontSize: size * 0.35 }}
      >
        {initials}
      </Text>
    </View>
  );
}

// ── Person row ────────────────────────────────────────────────────────────────

export function PersonRow({
  person,
  fmt,
  onPress,
}: {
  person: PersonActivity;
  fmt: (n: number) => string;
  onPress: () => void;
}) {
  const owesYou = person.balance > 0;
  const youOwe = person.balance < 0;
  const settled = person.balance === 0;
  const balanceColor = owesYou
    ? INCOME_COLOR
    : youOwe
      ? EXPENSE_COLOR
      : "#888888";
  const balanceLabel = owesYou ? "owes you" : youOwe ? "you owe" : "settled";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3 rounded-2xl p-3 bg-surface-mid"
    >
      <PersonAvatar name={person.name} size={40} />

      <View className="flex-1 min-w-0 gap-0.5">
        <Text
          className="text-[13px] font-bold text-on-surface"
          numberOfLines={1}
        >
          {person.name}
        </Text>
        <View className="flex-row items-center gap-1">
          {!settled && (
            <DynamicIcon
              name={owesYou ? "trending-up" : "trending-down"}
              size={10}
              color={balanceColor}
            />
          )}
          <Text
            className="text-[10px] font-semibold uppercase tracking-[0.6px]"
            style={{ color: balanceColor }}
          >
            {balanceLabel}
          </Text>
        </View>
      </View>

      <View className="items-end gap-0.5">
        <Text
          className="text-[14px] font-extrabold tracking-tight"
          style={{ color: balanceColor }}
        >
          {settled ? "—" : fmt(Math.abs(person.balance))}
        </Text>
        <Text className="text-[10px] text-on-surface-variant">
          {person.totalTransactionCount} txn
          {person.totalTransactionCount !== 1 ? "s" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────

export function PersonRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl p-3 bg-surface-mid">
      <Skeleton width={40} height={40} radius={20} />
      <View className="flex-1 gap-1.5">
        <Skeleton width="45%" height={13} />
        <Skeleton width="30%" height={10} />
      </View>
      <View className="items-end gap-1.5">
        <Skeleton width={55} height={14} />
        <Skeleton width={30} height={10} />
      </View>
    </View>
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
          {fmt(Number(tx.amount))}
        </Text>
        <Text className="text-[10px] text-on-surface-variant">{time}</Text>
      </View>
    </View>
  );
}

// ── Person detail sheet ───────────────────────────────────────────────────────

export function PersonDetailContent({
  person,
  month,
  year,
  onClose,
}: {
  person: PersonActivity;
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
        { person: { in: [person.id] } },
      ],
    },
  });

  const owesYou = person.balance > 0;
  const youOwe = person.balance < 0;
  const settled = person.balance === 0;
  const balanceColor = owesYou
    ? INCOME_COLOR
    : youOwe
      ? EXPENSE_COLOR
      : "#888888";
  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  const handleViewAll = () => {
    onClose();
    router.push({
      pathname: "/transactions",
      params: { personId: person.id, dateFrom, dateTo },
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
        <PersonAvatar name={person.name} size={44} />
        <View className="flex-1">
          <Text className="text-base font-extrabold text-on-surface tracking-tight">
            {person.name}
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
        {!settled && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${balanceColor}18` }}
          >
            <DynamicIcon
              name={owesYou ? "trending-up" : "trending-down"}
              size={12}
              color={balanceColor}
            />
            <Text
              className="text-[12px] font-bold"
              style={{ color: balanceColor }}
            >
              {owesYou ? "Owes you " : "You owe "}
              {fmt(Math.abs(person.balance))}
            </Text>
          </View>
        )}
        {person.expenseAmount > 0 && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${EXPENSE_COLOR}18` }}
          >
            <DynamicIcon name="trending-down" size={12} color={EXPENSE_COLOR} />
            <Text
              className="text-[12px] font-bold"
              style={{ color: EXPENSE_COLOR }}
            >
              {fmt(person.expenseAmount)}
            </Text>
          </View>
        )}
        {person.incomeAmount > 0 && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${INCOME_COLOR}18` }}
          >
            <DynamicIcon name="trending-up" size={12} color={INCOME_COLOR} />
            <Text
              className="text-[12px] font-bold"
              style={{ color: INCOME_COLOR }}
            >
              {fmt(person.incomeAmount)}
            </Text>
          </View>
        )}
        <View className="flex-row items-center gap-1 rounded-full px-2.5 py-1 bg-surface-highest">
          <DynamicIcon name="receipt" size={12} color={C.onSurfaceVariant} />
          <Text className="text-[12px] font-semibold text-on-surface-variant">
            {person.totalTransactionCount} txn
            {person.totalTransactionCount !== 1 ? "s" : ""}
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
            {person.totalTransactionCount > 0
              ? `View All ${person.totalTransactionCount} Transactions`
              : "View in History"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SplitsDebtsCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<PersonActivity | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);

  const { data, loading } = useGetMonthlyPeople({ month, year });

  const people: PersonActivity[] = (data?.data ?? [])
    .filter(
      (p): p is PersonActivity => p != null && p.totalTransactionCount > 0,
    )
    .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance));

  const meta = data?.meta;
  const monthName =
    meta?.monthName ??
    new Date(year, month - 1).toLocaleString("en-US", { month: "long" });
  const monthLabel = `${monthName} '${String(year).slice(2)}`;

  const dateFrom = `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`;
  const lastDay = new Date(year, month, 0).getDate();
  const dateTo = `${year}-${String(month).padStart(2, "0")}-${lastDay}T23:59:59.999Z`;

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
  if (!showSkeleton && !people.length && !hasNavigated) return null;

  // Summary: total owed to you vs you owe
  const totalOwedToYou = people
    .filter((p) => p.balance > 0)
    .reduce((s, p) => s + p.balance, 0);
  const totalYouOwe = people
    .filter((p) => p.balance < 0)
    .reduce((s, p) => s + Math.abs(p.balance), 0);

  return (
    <>
      <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-base font-extrabold tracking-tight text-on-surface">
              Splits & Debts
            </Text>
            {!showSkeleton && (totalOwedToYou > 0 || totalYouOwe > 0) && (
              <View className="flex-row gap-2">
                {totalOwedToYou > 0 && (
                  <Text
                    className="text-[11px] font-semibold"
                    style={{ color: INCOME_COLOR }}
                  >
                    {fmt(totalOwedToYou)}
                  </Text>
                )}
                {totalYouOwe > 0 && (
                  <Text
                    className="text-[11px] font-semibold"
                    style={{ color: EXPENSE_COLOR }}
                  >
                    {fmt(totalYouOwe)}
                  </Text>
                )}
              </View>
            )}
          </View>
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

        {/* Rows */}
        <View className="gap-2">
          {showSkeleton ? (
            [1, 2, 3].map((i) => <PersonRowSkeleton key={i} />)
          ) : people.length > 0 ? (
            <>
              {people.slice(0, 5).map((person) => (
                <PersonRow
                  key={person.id}
                  person={person}
                  fmt={fmt}
                  onPress={() => setSelected(person)}
                />
              ))}
              {people.length > 5 && (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/analytics/people",
                      params: { month, year },
                    })
                  }
                  activeOpacity={0.7}
                  className="py-3 rounded-2xl items-center bg-surface-mid"
                >
                  <Text className="text-[13px] font-bold text-primary-bright">
                    View all {people.length} people
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View className="py-6 items-center gap-1.5">
              <DynamicIcon name="users" size={28} color={C.outlineVariant} />
              <Text className="text-[13px] text-on-surface-variant">
                No activity this month
              </Text>
            </View>
          )}
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
            <PersonDetailContent
              person={selected}
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
