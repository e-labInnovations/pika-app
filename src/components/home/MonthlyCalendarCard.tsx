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

// ── Formatters ────────────────────────────────────────────────────────────────

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
  C,
}: {
  day: number | null;
  dayData?: DayData | null;
  isToday: boolean;
  loading: boolean;
  onPress: () => void;
  C: ReturnType<typeof useColors>;
}) {
  if (!day) return <View style={{ flex: 1 }} />;

  const incStr = dayData && dayData.income > 0 ? fmtCell(dayData.income) : "";
  const expStr =
    dayData && dayData.expenses > 0 ? fmtCell(dayData.expenses) : "";
  const isEmpty = !loading && (!dayData || dayData.transactionCount === 0);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.65}
      style={{ flex: 1, alignItems: "center", gap: 2, paddingVertical: 3 }}
    >
      {/* Day number */}
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isToday ? C.primaryBright : "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: isToday ? "800" : "400",
            color: isToday ? "#fff" : C.onSurface,
          }}
        >
          {day}
        </Text>
      </View>

      {/* Amount line 1 */}
      {loading ? (
        <View style={{ height: 9 }} />
      ) : incStr ? (
        <Text
          style={{
            fontSize: 8,
            fontWeight: "600",
            color: "#10b981",
            lineHeight: 10,
          }}
          numberOfLines={1}
        >
          {incStr}
        </Text>
      ) : expStr ? (
        <Text
          style={{
            fontSize: 8,
            fontWeight: "600",
            color: "#ef4444",
            lineHeight: 10,
          }}
          numberOfLines={1}
        >
          {expStr}
        </Text>
      ) : isEmpty ? (
        <Text
          style={{
            fontSize: 9,
            color: `${C.outlineVariant}60`,
            lineHeight: 10,
          }}
        >
          —
        </Text>
      ) : null}

      {/* Amount line 2 — only when both income and expense exist */}
      {!loading && incStr && expStr ? (
        <Text
          style={{
            fontSize: 8,
            fontWeight: "600",
            color: "#ef4444",
            lineHeight: 10,
          }}
          numberOfLines={1}
        >
          {expStr}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

// ── Compact transaction row (sheet) ──────────────────────────────────────────

function TxSheetRow({
  tx,
  C,
}: {
  tx: TransactionFieldsFragment;
  C: ReturnType<typeof useColors>;
}) {
  const fmt = useFormatMoney();
  const color =
    tx.type === "income"
      ? "#10b981"
      : tx.type === "expense"
        ? "#ef4444"
        : "#6366f1";
  const sign = tx.type === "income" ? "+" : tx.type === "expense" ? "-" : "";
  const catColor = (tx.category as any)?.color ?? "#888888";
  const catIcon = (tx.category as any)?.icon ?? "tag";
  const time = new Date(tx.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const accountName = (tx.account as any)?.name ?? "";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 14,
        backgroundColor: C.surfaceMid,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: `${catColor}20`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DynamicIcon name={catIcon} size={16} color={catColor} />
      </View>
      <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
        <Text
          style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}
          numberOfLines={1}
        >
          {tx.title}
        </Text>
        {accountName ? (
          <Text
            style={{ fontSize: 11, color: C.onSurfaceVariant }}
            numberOfLines={1}
          >
            {accountName}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: "flex-end", gap: 2 }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color }}>
          {sign}{fmt(Number(tx.amount))}
        </Text>
        <Text style={{ fontSize: 10, color: C.onSurfaceVariant }}>{time}</Text>
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

  const dateFrom = `${date}T00:00:00.000Z`;
  const dateTo = `${date}T23:59:59.999Z`;

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
    router.push({ pathname: "/(tabs)/history", params: { dateFrom, dateTo } });
  };

  return (
    <>
      {/* Handle */}
      <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 6 }}>
        <View
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: C.outlineVariant,
          }}
        />
      </View>

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            color: C.onSurface,
            letterSpacing: -0.3,
          }}
        >
          {displayDate}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          style={{ padding: 4 }}
        >
          <DynamicIcon name="x" size={18} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Summary pills */}
      {dayData && (dayData.income > 0 || dayData.expenses > 0) && (
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            paddingHorizontal: 20,
            paddingBottom: 14,
          }}
        >
          {dayData.income > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: "#10b98118",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <DynamicIcon name="trending-up" size={12} color="#10b981" />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#10b981" }}
              >
                +{fmt(dayData.income)}
              </Text>
            </View>
          )}
          {dayData.expenses > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: "#ef444418",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <DynamicIcon name="trending-down" size={12} color="#ef4444" />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#ef4444" }}
              >
                -{fmt(dayData.expenses)}
              </Text>
            </View>
          )}
          {dayData.transfers > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: "#6366f118",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <DynamicIcon name="arrow-left-right" size={12} color="#6366f1" />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#6366f1" }}
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
          transactions.map((tx) => <TxSheetRow key={tx.id} tx={tx} C={C} />)
        ) : (
          <View style={{ paddingVertical: 28, alignItems: "center" }}>
            <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>
              No transactions on this day
            </Text>
          </View>
        )}
      </ScrollView>

      {/* View All */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
        <TouchableOpacity
          onPress={handleViewAll}
          activeOpacity={0.8}
          style={{
            padding: 16,
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: C.surfaceMid,
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: C.primaryBright }}
          >
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
    <View style={{ gap: 0 }}>
      {Array.from({ length: cells.length / 7 }, (_, row) => (
        <View key={row} style={{ flexDirection: "row" }}>
          {cells.slice(row * 7, (row + 1) * 7).map((day, col) => (
            <View
              key={col}
              style={{
                flex: 1,
                alignItems: "center",
                gap: 2,
                paddingVertical: 3,
              }}
            >
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
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const fmt = useFormatMoney();

  const { data, loading } = useGetMonthlyCalendar({ month, year });

  const dayMap = new Map<string, DayData>();
  data?.data?.forEach((d) => {
    if (d) dayMap.set(d.date.slice(0, 10), d);
  });

  const cells = buildCalendarCells(year, month);
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;

  const monthLabel =
    data?.meta?.monthName ??
    new Date(year, month - 1).toLocaleString("en-US", { month: "long" });

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

  return (
    <>
      <View
        style={{
          borderRadius: 20,
          padding: 20,
          gap: 14,
          backgroundColor: C.surfaceLow,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              letterSpacing: -0.2,
              color: C.onSurface,
            }}
          >
            Monthly
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity
              onPress={prevMonth}
              activeOpacity={0.7}
              style={{ padding: 4 }}
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
                  pathname: "/(tabs)/history",
                  params: {
                    dateFrom: `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`,
                    dateTo: `${year}-${String(month).padStart(2, "0")}-${new Date(year, month, 0).getDate()}T23:59:59.999Z`,
                  },
                })
              }
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
                backgroundColor: C.surfaceHighest,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: C.primaryBright,
                }}
              >
                {monthLabel} {year}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={nextMonth}
              activeOpacity={0.7}
              style={{ padding: 4 }}
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
        <View style={{ flexDirection: "row" }}>
          {WEEK_DAYS.map((d) => (
            <View key={d} style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "700",
                  letterSpacing: 0.3,
                  color: C.onSurfaceVariant,
                }}
              >
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
              <View key={row} style={{ flexDirection: "row" }}>
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
                      C={C}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={{ height: 1, backgroundColor: `${C.outlineVariant}33` }} />
        {showSkeleton ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <React.Fragment key={i}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Skeleton width={72} height={13} radius={5} />
                </View>
                {i < 2 && (
                  <View
                    style={{
                      width: 1,
                      height: 16,
                      backgroundColor: `${C.outlineVariant}33`,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        ) : meta ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <DynamicIcon name="trending-up" size={12} color="#10b981" />
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: "#10b981" }}
              >
                {fmt(meta.totalIncome)}
              </Text>
            </View>
            <View
              style={{
                width: 1,
                height: 16,
                backgroundColor: `${C.outlineVariant}33`,
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <DynamicIcon name="trending-down" size={12} color="#ef4444" />
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: "#ef4444" }}
              >
                {fmt(meta.totalExpenses)}
              </Text>
            </View>
            <View
              style={{
                width: 1,
                height: 16,
                backgroundColor: `${C.outlineVariant}33`,
              }}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <DynamicIcon
                name="wallet"
                size={12}
                color={(meta.balance ?? 0) >= 0 ? "#10b981" : "#ef4444"}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: (meta.balance ?? 0) >= 0 ? "#10b981" : "#ef4444",
                }}
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
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setSelectedDate(null)}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: C.surfaceLow,
          }}
        >
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
