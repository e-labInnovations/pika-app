import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useGetMonthlyCalendar } from "../../services/gql/analytics/analytics.service";
import { useGetTransactions } from "../../services/gql/transactions/transactions.service";
import type { TransactionFieldsFragment } from "../../services/gql/types/graphql";
import { useFormatMoney } from "../../lib/format-currency";
import { useColors } from "../../theme/colors";

// Subset of DayData matching what the query actually returns
type DayData = {
  date: string;
  income: number;
  expenses: number;
  transfers: number;
  balance: number;
  transactionCount: number;
};

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function fmtCell(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return Math.round(n).toString();
}

function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ── Day cell ─────────────────────────────────────────────────────────────────

function DayCell({
  day,
  dayData,
  isToday,
  loading,
  onPress,
}: {
  day: number | null;
  dayData?: DayData | null;
  isToday: boolean;
  loading: boolean;
  onPress: () => void;
}) {
  const C = useColors();
  if (!day) return <View className="flex-1" />;

  const incStr = dayData && dayData.income > 0 ? fmtCell(dayData.income) : "";
  const expStr =
    dayData && dayData.expenses > 0 ? fmtCell(dayData.expenses) : "";
  const isEmpty = !loading && (!dayData || dayData.transactionCount === 0);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.65}
      className="flex-1 items-center gap-0.5 py-0.5"
    >
      {/* Day number */}
      <View
        className="w-[22px] h-[22px] rounded-full items-center justify-center"
        style={{ backgroundColor: isToday ? C.primaryBright : "transparent" }}
      >
        <Text
          className={
            isToday
              ? "text-[11px] font-extrabold text-white"
              : "text-[11px] font-normal text-on-surface"
          }
        >
          {day}
        </Text>
      </View>

      {/* Amount line 1 */}
      {loading ? (
        <View className="h-[9px]" />
      ) : incStr ? (
        <Text
          className="text-[8px] font-semibold leading-[10px]"
          style={{ color: "#10b981" }}
          numberOfLines={1}
        >
          {incStr}
        </Text>
      ) : expStr ? (
        <Text
          className="text-[8px] font-semibold leading-[10px]"
          style={{ color: "#ef4444" }}
          numberOfLines={1}
        >
          {expStr}
        </Text>
      ) : isEmpty ? (
        <Text
          className="text-[9px] leading-[10px]"
          style={{ color: `${C.outlineVariant}60` }}
        >
          —
        </Text>
      ) : null}

      {/* Amount line 2 — only when both income and expense exist */}
      {!loading && incStr && expStr ? (
        <Text
          className="text-[8px] font-semibold leading-[10px]"
          style={{ color: "#ef4444" }}
          numberOfLines={1}
        >
          {expStr}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

// ── Compact transaction row (sheet) ──────────────────────────────────────────

function TxSheetRow({ tx }: { tx: TransactionFieldsFragment }) {
  const fmt = useFormatMoney();
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

// ── Day detail sheet content ──────────────────────────────────────────────────

function DayDetailContent({
  date,
  dayData,
  onClose,
}: {
  date: string;
  dayData?: DayData | null;
  onClose: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const insets = useSafeAreaInsets();

  // Use local midnight so users in non-UTC timezones get the same calendar
  // day as the backend, which groups by local date, not UTC date.
  const [_y, _m, _d] = date.split("-").map(Number);
  const dateFrom = new Date(_y, _m - 1, _d, 0, 0, 0, 0).toISOString();
  const dateTo = new Date(_y, _m - 1, _d, 23, 59, 59, 999).toISOString();

  const { transactions, loading } = useGetTransactions({
    limit: 20,
    sort: "-date",
    where: { date: { greater_than_equal: dateFrom, less_than_equal: dateTo } },
  });

  const displayDate = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const totalCount = dayData?.transactionCount ?? transactions?.length ?? 0;

  const handleViewAll = () => {
    onClose();
    router.push({ pathname: "/transactions", params: { dateFrom, dateTo } });
  };

  return (
    <>
      {/* Handle */}
      <View className="items-center pt-3 pb-1.5">
        <View className="w-9 h-1 rounded-full bg-outline-variant" />
      </View>

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-3">
        <Text className="text-base font-extrabold text-on-surface tracking-tight">
          {displayDate}
        </Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
          <DynamicIcon name="x" size={18} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Summary pills */}
      {dayData && (dayData.income > 0 || dayData.expenses > 0) && (
        <View className="flex-row gap-2 px-5 pb-3.5">
          {dayData.income > 0 && (
            <View
              className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
              style={{ backgroundColor: "#10b98118" }}
            >
              <DynamicIcon name="trending-up" size={12} color="#10b981" />
              <Text
                className="text-[12px] font-bold"
                style={{ color: "#10b981" }}
              >
                +{fmt(dayData.income)}
              </Text>
            </View>
          )}
          {dayData.expenses > 0 && (
            <View
              className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
              style={{ backgroundColor: "#ef444418" }}
            >
              <DynamicIcon name="trending-down" size={12} color="#ef4444" />
              <Text
                className="text-[12px] font-bold"
                style={{ color: "#ef4444" }}
              >
                -{fmt(dayData.expenses)}
              </Text>
            </View>
          )}
          {dayData.transfers > 0 && (
            <View
              className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
              style={{ backgroundColor: "#6366f118" }}
            >
              <DynamicIcon name="arrow-left-right" size={12} color="#6366f1" />
              <Text
                className="text-[12px] font-bold"
                style={{ color: "#6366f1" }}
              >
                {fmt(dayData.transfers)}
              </Text>
            </View>
          )}
        </View>
      )}

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
          transactions.map((tx) => <TxSheetRow key={tx.id} tx={tx} />)
        ) : (
          <View className="py-7 items-center">
            <Text className="text-[13px] text-on-surface-variant">
              No transactions on this day
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
            {totalCount > 0
              ? `View All ${totalCount} Transactions`
              : "View in History"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// ── Skeleton grid ─────────────────────────────────────────────────────────────

function CalendarSkeleton() {
  const cells = buildCalendarCells(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
  );
  return (
    <View>
      {Array.from({ length: cells.length / 7 }, (_, row) => (
        <View key={row} className="flex-row">
          {cells.slice(row * 7, (row + 1) * 7).map((day, col) => (
            <View key={col} className="flex-1 items-center gap-0.5 py-0.5">
              {day ? (
                <>
                  <Skeleton width={22} height={22} radius={11} />
                  <Skeleton width={20} height={8} radius={3} />
                </>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function MonthlyCalendarCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data, loading } = useGetMonthlyCalendar({ month, year });

  const dayMap = new Map<string, DayData>();
  data?.data?.forEach((d) => {
    if (d) dayMap.set(d.date.slice(0, 10), d);
  });

  const cells = buildCalendarCells(year, month);
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;

  const monthLabel =
    (data?.meta?.monthName ??
      new Date(year, month - 1).toLocaleString("en-US", { month: "long" })) +
    ` '${String(year).slice(2)}`;

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
  const meta = data?.meta;
  const balancePositive = (meta?.balance ?? 0) >= 0;

  return (
    <>
      <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-extrabold tracking-tight text-on-surface">
            Monthly
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
                  params: {
                    dateFrom: new Date(year, month - 1, 1, 0, 0, 0, 0).toISOString(),
                    dateTo: new Date(year, month, 0, 23, 59, 59, 999).toISOString(),
                  },
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

        {/* Weekday headers */}
        <View className="flex-row">
          {WEEK_DAYS.map((d) => (
            <View key={d} className="flex-1 items-center">
              <Text className="text-[9px] font-bold tracking-[0.3px] text-on-surface-variant">
                {d}
              </Text>
            </View>
          ))}
        </View>

        {/* Grid */}
        {showSkeleton ? (
          <CalendarSkeleton />
        ) : (
          <View>
            {Array.from({ length: cells.length / 7 }, (_, row) => (
              <View key={row} className="flex-row">
                {cells.slice(row * 7, (row + 1) * 7).map((day, col) => {
                  const dateStr = day
                    ? `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    : "";
                  const dayData = day ? (dayMap.get(dateStr) ?? null) : null;
                  const isToday = isCurrentMonth && day === today.getDate();
                  return (
                    <DayCell
                      key={col}
                      day={day}
                      dayData={dayData}
                      isToday={isToday}
                      loading={loading}
                      onPress={() => day && setSelectedDate(dateStr)}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        )}

        {/* Footer divider */}
        <View
          className="h-px"
          style={{ backgroundColor: `${C.outlineVariant}33` }}
        />

        {/* Footer summary */}
        {showSkeleton ? (
          <View className="flex-row items-center">
            {[0, 1, 2].map((i) => (
              <React.Fragment key={i}>
                <View className="flex-1 items-center">
                  <Skeleton width={72} height={13} radius={5} />
                </View>
                {i < 2 && (
                  <View
                    className="w-px h-4"
                    style={{ backgroundColor: `${C.outlineVariant}33` }}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        ) : meta ? (
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center justify-center gap-1">
              <DynamicIcon name="trending-up" size={12} color="#10b981" />
              <Text
                className="text-[11px] font-bold"
                style={{ color: "#10b981" }}
              >
                {fmt(meta.totalIncome)}
              </Text>
            </View>
            <View
              className="w-px h-4"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            />
            <View className="flex-1 flex-row items-center justify-center gap-1">
              <DynamicIcon name="trending-down" size={12} color="#ef4444" />
              <Text
                className="text-[11px] font-bold"
                style={{ color: "#ef4444" }}
              >
                {fmt(meta.totalExpenses)}
              </Text>
            </View>
            <View
              className="w-px h-4"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            />
            <View className="flex-1 flex-row items-center justify-center gap-1">
              <DynamicIcon
                name="wallet"
                size={12}
                color={balancePositive ? "#10b981" : "#ef4444"}
              />
              <Text
                className="text-[11px] font-bold"
                style={{ color: balancePositive ? "#10b981" : "#ef4444" }}
              >
                {fmt(meta.balance)}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      {/* Day detail sheet */}
      <Modal
        visible={!!selectedDate}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedDate(null)}
      >
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setSelectedDate(null)}
        />
        <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-surface-low">
          {selectedDate && (
            <DayDetailContent
              date={selectedDate}
              dayData={dayMap.get(selectedDate) ?? null}
              onClose={() => setSelectedDate(null)}
            />
          )}
        </View>
      </Modal>
    </>
  );
}
