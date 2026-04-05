// cspell:ignore Swipeable
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../components/Icon";
import { Skeleton } from "../../../components/ui/Skeleton";
import { AccountAvatar } from "../../../components/AccountAvatar";
import { UserAvatar } from "../../../components/UserAvatar";
import { SortSheet } from "../../../components/history/SortSheet";
import { FilterSheet } from "../../../components/history/FilterSheet";
import {
  DEFAULT_FILTER,
  DEFAULT_SORT,
  countActiveFilters,
  formatDateShort,
  isDefaultSort,
  toSortString,
  type TxFilter,
  type TxSort,
} from "../../../components/history/types";
import { useFormatMoney } from "../../../lib/format-currency";
import {
  useGetTransactions,
  useDeleteTransaction,
} from "../../../services/gql/transactions/transactions.service";
import {
  Transaction_type,
  Transaction_type_Input,
  type TransactionFieldsFragment,
  type Transaction_where,
} from "../../../services/gql/types/graphql";
import { useColors } from "../../../theme/colors";

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 25;

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeConfig(type: Transaction_type) {
  switch (type) {
    case Transaction_type.income:
      return { icon: "arrow-down-left", color: "#10b981" };
    case Transaction_type.transfer:
      return { icon: "arrow-right-left", color: "#6366f1" };
    default:
      return { icon: "arrow-up-right", color: "#ef4444" };
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = (x: Date) =>
    x.getDate() === now.getDate() &&
    x.getMonth() === now.getMonth() &&
    x.getFullYear() === now.getFullYear();
  const yesterday = (x: Date) => {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return x.getDate() === y.getDate() && x.getMonth() === y.getMonth() && x.getFullYear() === y.getFullYear();
  };
  if (today(d)) return "Today";
  if (yesterday(d)) return "Yesterday";
  return d.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function buildWhere(filter: TxFilter, search: string): Transaction_where | undefined {
  const ands: Transaction_where[] = [];

  if (search.trim()) {
    ands.push({
      OR: [
        { title: { contains: search.trim() } },
        { note: { contains: search.trim() } },
      ],
    });
  }

  if (filter.types.length > 0) {
    ands.push({ type: { in: filter.types as Transaction_type_Input[] } });
  }
  if (filter.categories.length > 0) {
    ands.push({ category: { in: filter.categories } });
  }
  if (filter.tags.length > 0) {
    ands.push({ tags: { in: filter.tags } });
  }
  if (filter.people.length > 0) {
    ands.push({ person: { in: filter.people } });
  }
  if (filter.accounts.length > 0) {
    ands.push({
      OR: [
        { account: { in: filter.accounts } },
        { toAccount: { in: filter.accounts } },
      ],
    });
  }
  if (filter.dateFrom) {
    ands.push({ date: { greater_than_equal: filter.dateFrom } });
  }
  if (filter.dateTo) {
    ands.push({ date: { less_than_equal: filter.dateTo } });
  }

  if (ands.length === 0) return undefined;
  if (ands.length === 1) return ands[0];
  return { AND: ands };
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SwipeableRef = { current: SwipeableMethods | null };

type ListItem =
  | { kind: "header"; title: string; key: string }
  | { kind: "row"; transaction: TransactionFieldsFragment; key: string; showDate?: boolean };

// ── Swipe actions ──────────────────────────────────────────────────────────────

function RightActions({
  progress,
  onEdit,
  onDelete,
}: {
  progress: SharedValue<number>;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const C = useColors();
  const editStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [128, 0]) }],
  }));
  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [64, 0]) }],
  }));

  return (
    <View style={{ flexDirection: "row", width: 128 }}>
      <Reanimated.View style={[editStyle, { flex: 1 }]}>
        <TouchableOpacity
          onPress={onEdit}
          activeOpacity={0.8}
          style={{ flex: 1, backgroundColor: `${C.primary}22`, alignItems: "center", justifyContent: "center", gap: 3 }}
        >
          <DynamicIcon name="pencil" size={16} color={C.primary} />
          <Text style={{ fontSize: 11, color: C.primary, fontWeight: "700" }}>Edit</Text>
        </TouchableOpacity>
      </Reanimated.View>
      <Reanimated.View style={[deleteStyle, { flex: 1 }]}>
        <TouchableOpacity
          onPress={onDelete}
          activeOpacity={0.8}
          style={{ flex: 1, backgroundColor: `${C.tertiary}22`, alignItems: "center", justifyContent: "center", gap: 3 }}
        >
          <DynamicIcon name="trash-2" size={16} color={C.tertiary} />
          <Text style={{ fontSize: 11, color: C.tertiary, fontWeight: "700" }}>Delete</Text>
        </TouchableOpacity>
      </Reanimated.View>
    </View>
  );
}

// ── TransactionRow ─────────────────────────────────────────────────────────────

function TransactionRow({
  transaction: t,
  openRef,
  onPress,
  onEdit,
  onDelete,
  showDate,
}: {
  transaction: TransactionFieldsFragment;
  openRef: SwipeableRef;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showDate?: boolean;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const swipeRef = useRef<SwipeableMethods>(null);
  const { icon, color } = typeConfig(t.type);
  const amount = parseFloat(t.amount);
  const isIncome = t.type === Transaction_type.income;
  const isTransfer = t.type === Transaction_type.transfer;
  const amountColor = isIncome ? "#10b981" : isTransfer ? "#6366f1" : "#ef4444";
  const catBg = t.category?.bgColor ?? "#f59e0b22";
  const catColor = t.category?.color ?? "#f59e0b";

  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      onSwipeableWillOpen={() => {
        if (openRef.current && openRef.current !== swipeRef.current) {
          openRef.current.close();
        }
        openRef.current = swipeRef.current;
      }}
      renderRightActions={(progress) => (
        <RightActions
          progress={progress}
          onEdit={() => { swipeRef.current?.close(); onEdit(); }}
          onDelete={() => { swipeRef.current?.close(); onDelete(); }}
        />
      )}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        className="flex-row items-center gap-3 px-4 py-3 bg-surface-mid"
      >
        {/* Category icon with type badge */}
        <View style={{ position: "relative" }}>
          <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: catBg, alignItems: "center", justifyContent: "center" }}>
            <DynamicIcon name={t.category?.icon ?? "receipt"} size={20} color={catColor} />
          </View>
          <View style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: 8, backgroundColor: color, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: C.surfaceMid }}>
            <DynamicIcon name={icon} size={8} color="#fff" />
          </View>
        </View>

        {/* Main info */}
        <View className="flex-1 min-w-0 gap-0.5">
          <Text className="text-[14px] font-semibold text-on-surface" numberOfLines={1}>
            {t.title}
          </Text>
          <View className="flex-row items-center gap-1.5 flex-wrap">
            <AccountAvatar avatarUrl={t.account.avatar?.url} icon={t.account.icon} bgColor={t.account.bgColor} iconColor={t.account.color} name={t.account.name} size={14} />
            <Text className="text-[11px] text-on-surface-variant" numberOfLines={1}>{t.account.name}</Text>
            {t.toAccount && (
              <>
                <DynamicIcon name="arrow-right" size={9} color={C.outlineVariant} />
                <AccountAvatar avatarUrl={t.toAccount.avatar?.url} icon={t.toAccount.icon} bgColor={t.toAccount.bgColor} iconColor={t.toAccount.color} name={t.toAccount.name} size={14} />
                <Text className="text-[11px] text-on-surface-variant" numberOfLines={1}>{t.toAccount.name}</Text>
              </>
            )}
          </View>
          {(t.tags?.length ?? 0) > 0 && (
            <View className="flex-row gap-1 flex-wrap mt-0.5">
              {t.tags!.slice(0, 3).map((tag) => (
                <View key={tag.id} className="flex-row items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: tag.bgColor ?? `${tag.color ?? C.outlineVariant}22` }}>
                  <DynamicIcon name={tag.icon} size={9} color={tag.color ?? C.outlineVariant} />
                  <Text style={{ fontSize: 9, color: tag.color ?? C.outlineVariant, fontWeight: "600" }}>{tag.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Amount + time + person */}
        <View className="items-end gap-0.5 shrink-0">
          <Text style={{ fontSize: 14, fontWeight: "700", color: amountColor }}>
            {fmt(amount)}
          </Text>
          {showDate ? (
            <Text className="text-[11px] text-on-surface-variant">{formatDate(t.date)}</Text>
          ) : (
            <Text className="text-[11px] text-on-surface-variant">{formatTime(t.date)}</Text>
          )}
          {t.person && (
            <View className="flex-row items-center gap-1 mt-0.5">
              <UserAvatar id={t.person.id} name={t.person.name} avatarUrl={t.person.avatar?.url} size={16} radius={8} />
              <Text className="text-[10px] text-on-surface-variant" numberOfLines={1}>{t.person.name}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}

// ── Date Group Header ─────────────────────────────────────────────────────────

function DateHeader({ title }: { title: string }) {
  return (
    <View className="px-4 pt-4 pb-1.5">
      <Text className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant">
        {title}
      </Text>
    </View>
  );
}

// ── Active Filters Bar ────────────────────────────────────────────────────────

function ActiveFiltersBar({
  filter,
  sort,
  onOpenFilter,
  onOpenSort,
  onClear,
}: {
  filter: TxFilter;
  sort: TxSort;
  onOpenFilter: () => void;
  onOpenSort: () => void;
  onClear: () => void;
}) {
  const C = useColors();
  const filterCount = countActiveFilters(filter);
  const hasSort = !isDefaultSort(sort);
  if (filterCount === 0 && !hasSort) return null;

  const SORT_LABELS: Record<string, string> = {
    date: "Date", amount: "Amount", title: "Description",
  };

  const chips: { label: string; color: string; onPress: () => void }[] = [];

  if (filter.types.length > 0) {
    chips.push({ label: `${filter.types.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}`, color: "#f59e0b", onPress: onOpenFilter });
  }
  if (filter.dateFrom || filter.dateTo) {
    const from = filter.dateFrom ? formatDateShort(filter.dateFrom) : "…";
    const to = filter.dateTo ? formatDateShort(filter.dateTo) : "…";
    chips.push({ label: `${from} – ${to}`, color: "#06b6d4", onPress: onOpenFilter });
  }
  if (filter.categories.length > 0) {
    chips.push({ label: `${filter.categories.length} categor${filter.categories.length === 1 ? "y" : "ies"}`, color: "#8b5cf6", onPress: onOpenFilter });
  }
  if (filter.tags.length > 0) {
    chips.push({ label: `${filter.tags.length} tag${filter.tags.length === 1 ? "" : "s"}`, color: "#10b981", onPress: onOpenFilter });
  }
  if (filter.people.length > 0) {
    chips.push({ label: `${filter.people.length} ${filter.people.length === 1 ? "person" : "people"}`, color: "#f59e0b", onPress: onOpenFilter });
  }
  if (filter.accounts.length > 0) {
    chips.push({ label: `${filter.accounts.length} account${filter.accounts.length === 1 ? "" : "s"}`, color: "#6366f1", onPress: onOpenFilter });
  }
  if (hasSort) {
    const dirIcon = sort.dir === "asc" ? "↑" : "↓";
    chips.push({ label: `${SORT_LABELS[sort.field] ?? sort.field} ${dirIcon}`, color: C.primary, onPress: onOpenSort });
  }

  return (
    <View
      className="flex-row items-center px-4 pb-2"
      style={{ gap: 6 }}
    >
      <FlatList
        horizontal
        data={chips}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress}
            activeOpacity={0.75}
            className="flex-row items-center px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${item.color}20`, borderWidth: 1, borderColor: `${item.color}40` }}
          >
            <Text style={{ fontSize: 11, fontWeight: "600", color: item.color }}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={onClear}
        activeOpacity={0.7}
        className="flex-row items-center gap-0.5 px-2 py-1 rounded-full shrink-0"
        style={{ backgroundColor: `${C.outlineVariant}22` }}
      >
        <DynamicIcon name="x" size={10} color={C.outlineVariant} />
        <Text style={{ fontSize: 11, color: C.outlineVariant, fontWeight: "600" }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function TransactionRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Skeleton width={44} height={44} radius={14} />
      <View className="flex-1 gap-2">
        <Skeleton width="55%" height={13} />
        <Skeleton width="40%" height={11} />
      </View>
      <View className="items-end gap-2">
        <Skeleton width={64} height={13} />
        <Skeleton width={36} height={11} />
      </View>
    </View>
  );
}

function TransactionListSkeleton() {
  return (
    <View>
      {[3, 2, 2].map((count, group) => (
        <View key={group}>
          <View className="px-4 pt-4 pb-1.5">
            <Skeleton width={70} height={10} />
          </View>
          <View className="bg-surface-mid rounded-2xl overflow-hidden mx-4">
            {Array.from({ length: count }).map((_, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <View className="mx-4" style={{ height: 1 }} />}
                <TransactionRowSkeleton />
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function HistoryScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { personId, accountId, dateFrom, dateTo, categoryId, tagId } = useLocalSearchParams<{
    personId?: string;
    accountId?: string;
    dateFrom?: string;
    dateTo?: string;
    categoryId?: string;
    tagId?: string;
  }>();

  // Pre-apply filters when navigated from person/account/calendar/category/tag pages
  useFocusEffect(
    useCallback(() => {
      if (personId) setFilter((f) => ({ ...f, people: [personId] }));
      if (accountId) setFilter((f) => ({ ...f, accounts: [accountId] }));
      if (dateFrom && dateTo) setFilter((f) => ({ ...f, dateFrom, dateTo, datePreset: "" }));
      if (categoryId) setFilter((f) => ({ ...f, categories: categoryId.split(",") }));
      if (tagId) setFilter((f) => ({ ...f, tags: [tagId] }));
    }, [personId, accountId, dateFrom, dateTo, categoryId, tagId]),
  );

  // ── UI state
  const [showSearch, setShowSearch] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const openSwipeable = useRef<SwipeableMethods | null>(null);

  // ── Query state
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState<TxSort>(DEFAULT_SORT);
  const [filter, setFilter] = useState<TxFilter>(DEFAULT_FILTER);

  // Debounce search → appliedSearch
  useEffect(() => {
    const t = setTimeout(() => setAppliedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const where = buildWhere(filter, appliedSearch);
  // Amount is stored as text in Payload, so backend sort is lexicographic.
  // For amount sorting, fall back to date desc on the backend and sort client-side.
  const backendSortStr = sort.field === "amount" ? toSortString(DEFAULT_SORT) : toSortString(sort);

  const { data, transactions, loading, refetch, fetchMore } = useGetTransactions({
    limit: PAGE_SIZE,
    sort: backendSortStr,
    where,
  });
  const { deleteTransaction } = useDeleteTransaction();

  // Client-side sort for amount (text field — numeric sort required)
  const sortedTransactions = useMemo(() => {
    if (!transactions || sort.field !== "amount") return transactions;
    return [...transactions].sort((a, b) => {
      const diff = parseFloat(a.amount) - parseFloat(b.amount);
      return sort.dir === "asc" ? diff : -diff;
    });
  }, [transactions, sort]);

  const hasNextPage = data?.hasNextPage ?? false;
  const currentPage = data?.page ?? 1;
  const filterCount = countActiveFilters(filter);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const onLoadMore = useCallback(async () => {
    if (!hasNextPage || loadingMore || loading) return;
    setLoadingMore(true);
    try {
      await fetchMore({
        variables: { page: currentPage + 1, limit: PAGE_SIZE, sort: backendSortStr, where },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult?.Transactions) return prev;
          return {
            Transactions: {
              ...fetchMoreResult.Transactions,
              docs: [...(prev.Transactions?.docs ?? []), ...fetchMoreResult.Transactions.docs],
            },
          };
        },
      });
    } catch { /* ignore */ } finally {
      setLoadingMore(false);
    }
  }, [hasNextPage, loadingMore, loading, fetchMore, currentPage, backendSortStr, where]);

  const handleDelete = (t: TransactionFieldsFragment) => {
    Alert.alert(
      "Delete Transaction",
      `Delete "${t.title}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try { await deleteTransaction(t.id); }
            catch (err: any) { Alert.alert("Error", err?.message ?? "Could not delete."); }
          },
        },
      ],
    );
  };

  const clearAll = () => {
    setFilter(DEFAULT_FILTER);
    setSort(DEFAULT_SORT);
    setSearch("");
  };

  // ── Build list — grouped by date only when sorting by date
  const groupByDate = sort.field === "date";
  const listItems: ListItem[] = [];
  const displayTransactions = sortedTransactions ?? transactions;

  if (groupByDate) {
    const groupMap = new Map<string, TransactionFieldsFragment[]>();
    for (const t of displayTransactions ?? []) {
      const key = formatDate(t.date);
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(t);
    }
    for (const [title, group] of groupMap) {
      listItems.push({ kind: "header", title, key: `h-${title}` });
      for (const t of group) listItems.push({ kind: "row", transaction: t, key: t.id });
    }
  } else {
    for (const t of displayTransactions ?? []) {
      listItems.push({ kind: "row", transaction: t, key: t.id, showDate: true });
    }
  }

  const showSkeleton = loading && !transactions;
  const isEmpty = !loading && (!displayTransactions || displayTransactions.length === 0);

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="auto" />

      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-2 bg-surface">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[22px] font-black tracking-[-0.5px] text-on-surface">
              History
            </Text>
            {!loading && (data?.totalDocs ?? 0) > 0 && (
              <Text className="text-[12px] text-on-surface-variant mt-0.5">
                {data!.totalDocs} transaction{data!.totalDocs !== 1 ? "s" : ""}
              </Text>
            )}
          </View>

          {/* Action buttons */}
          <View className="flex-row items-center gap-1">
            {/* Search */}
            <TouchableOpacity
              onPress={() => { setShowSearch((v) => !v); if (showSearch) setSearch(""); }}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: showSearch ? `${C.primary}22` : C.surfaceMid }}
            >
              <DynamicIcon name={showSearch ? "search-x" : "search"} size={17} color={showSearch ? C.primary : C.onSurface} />
            </TouchableOpacity>

            {/* Filter */}
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={() => setShowFilter(true)}
                activeOpacity={0.7}
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: filterCount > 0 ? `${C.primary}22` : C.surfaceMid }}
              >
                <DynamicIcon name="sliders-horizontal" size={17} color={filterCount > 0 ? C.primary : C.onSurface} />
              </TouchableOpacity>
              {filterCount > 0 && (
                <View
                  style={{
                    position: "absolute", top: 0, right: 0,
                    minWidth: 16, height: 16, borderRadius: 8,
                    backgroundColor: C.primary,
                    alignItems: "center", justifyContent: "center",
                    paddingHorizontal: 3,
                  }}
                >
                  <Text style={{ fontSize: 9, fontWeight: "800", color: "#fff" }}>{filterCount}</Text>
                </View>
              )}
            </View>

            {/* Sort */}
            <TouchableOpacity
              onPress={() => setShowSort(true)}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: !isDefaultSort(sort) ? `${C.primary}22` : C.surfaceMid }}
            >
              <DynamicIcon name="arrow-up-down" size={17} color={!isDefaultSort(sort) ? C.primary : C.onSurface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar */}
        {showSearch && (
          <View
            className="flex-row items-center gap-2.5 px-3.5 rounded-xl mt-3"
            style={{ height: 42, backgroundColor: C.surfaceMid }}
          >
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              className="flex-1 text-[14px] text-on-surface"
              placeholderTextColor={C.outlineVariant}
              placeholder="Search by title or note…"
              value={search}
              onChangeText={setSearch}
              autoFocus
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                <DynamicIcon name="x" size={15} color={C.outline} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Active filter chips */}
      <ActiveFiltersBar
        filter={filter}
        sort={sort}
        onOpenFilter={() => setShowFilter(true)}
        onOpenSort={() => setShowSort(true)}
        onClear={clearAll}
      />

      {/* List */}
      {showSkeleton ? (
        <TransactionListSkeleton />
      ) : isEmpty ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <View
            className="w-16 h-16 rounded-full items-center justify-center"
            style={{ backgroundColor: `${C.outlineVariant}33` }}
          >
            <DynamicIcon name="receipt" size={30} color={C.outlineVariant} />
          </View>
          <Text className="text-[15px] font-semibold text-on-surface-variant">
            {filterCount > 0 || appliedSearch ? "No matching transactions" : "No transactions yet"}
          </Text>
          {(filterCount > 0 || appliedSearch) && (
            <TouchableOpacity
              onPress={clearAll}
              activeOpacity={0.75}
              className="px-4 py-2 rounded-xl"
              style={{ backgroundColor: C.surfaceMid }}
            >
              <Text className="text-[13px] font-semibold text-on-surface">Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={listItems}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) + 24 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color={C.primary} />
              </View>
            ) : hasNextPage ? (
              <View className="py-3 items-center gap-1">
                <DynamicIcon name="chevrons-down" size={16} color={C.outlineVariant} />
                <Text style={{ fontSize: 11, color: C.outlineVariant }}>Scroll for more</Text>
              </View>
            ) : null
          }
          renderItem={({ item, index }) => {
            if (item.kind === "header") return <DateHeader title={item.title} />;

            const t = item.transaction;

            if (!groupByDate) {
              // Flat mode — each row is its own standalone card
              return (
                <View className="mx-4 mb-1.5 rounded-2xl bg-surface-mid overflow-hidden">
                  <TransactionRow
                    transaction={t}
                    openRef={openSwipeable}
                    onPress={() => router.push(`/history/${t.id}`)}
                    onEdit={() => router.push(`/history/${t.id}/edit`)}
                    onDelete={() => handleDelete(t)}
                    showDate={item.showDate}
                  />
                </View>
              );
            }

            const prevItem = listItems[index - 1];
            const nextItem = listItems[index + 1];
            const isFirst = !prevItem || prevItem.kind === "header";
            const isLast = !nextItem || nextItem.kind === "header";

            return (
              <View
                className="mx-4 bg-surface-mid overflow-hidden"
                style={{
                  borderTopLeftRadius: isFirst ? 16 : 0,
                  borderTopRightRadius: isFirst ? 16 : 0,
                  borderBottomLeftRadius: isLast ? 16 : 0,
                  borderBottomRightRadius: isLast ? 16 : 0,
                }}
              >
                {!isFirst && (
                  <View className="mx-4" style={{ height: 1, backgroundColor: C.outlineVariant + "33" }} />
                )}
                <TransactionRow
                  transaction={t}
                  openRef={openSwipeable}
                  onPress={() => router.push(`/history/${t.id}`)}
                  onEdit={() => router.push(`/history/${t.id}/edit`)}
                  onDelete={() => handleDelete(t)}
                />
              </View>
            );
          }}
        />
      )}

      {/* Sheets */}
      <SortSheet
        visible={showSort}
        sort={sort}
        onApply={setSort}
        onClose={() => setShowSort(false)}
      />
      <FilterSheet
        visible={showFilter}
        filter={filter}
        onApply={setFilter}
        onClose={() => setShowFilter(false)}
      />
    </View>
  );
}
