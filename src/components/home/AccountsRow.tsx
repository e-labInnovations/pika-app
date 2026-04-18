import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../AccountAvatar";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
import { formatRelativeShort } from "../../lib/format-date";
import type { AccountFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  showBalance: boolean;
  accounts?: AccountFieldsFragment[] | null;
  loading?: boolean;
};

const HIDDEN = "••••";
const CARD_WIDTH = 220;

// ── Account Card ──────────────────────────────────────────────────────────────

function AccountCard({
  account,
  showBalance,
  fmt,
  onPress,
}: {
  account: AccountFieldsFragment;
  showBalance: boolean;
  fmt: (n: number | null | undefined) => string;
  onPress: () => void;
}) {
  const C = useColors();
  const balance = account.balance ?? 0;
  const balanceColor = balance >= 0 ? "#10b981" : "#ef4444";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ width: CARD_WIDTH }}
      className="rounded-2xl bg-surface-mid p-4 gap-3"
    >
      {/* Row 1: Avatar | Balance + txn count */}
      <View className="flex-row items-center gap-3">
        <AccountAvatar
          avatarUrl={account.avatar?.url}
          icon={account.icon}
          bgColor={account.bgColor}
          iconColor={account.color}
          name={account.name}
          size={48}
        />
        <View className="flex-1 gap-0.5">
          <Text
            className="font-extrabold"
            style={{
              fontSize: showBalance ? 18 : 14,
              letterSpacing: showBalance ? -0.5 : 4,
              color: showBalance ? balanceColor : C.onSurfaceVariant,
              opacity: showBalance ? 1 : 0.5,
            }}
            numberOfLines={1}
          >
            {showBalance ? fmt(balance) : HIDDEN}
          </Text>
          <View className="flex-row items-center gap-1.5">
            {(account.totalTransactions ?? 0) > 0 && (
              <Text className="text-[11px] font-semibold text-on-surface-variant">
                {account.totalTransactions} txn
                {account.totalTransactions === 1 ? "" : "s"}
              </Text>
            )}
            {account.isActive === false && (
              <View
                className="rounded-full px-1.5 py-0.5"
                style={{ backgroundColor: `${C.outlineVariant}33` }}
              >
                <Text className="text-[9px] font-bold uppercase tracking-[0.5px] text-on-surface-variant">
                  Inactive
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Row 2: Name */}
      <Text
        className="text-[14px] font-extrabold text-on-surface tracking-tight"
        numberOfLines={1}
      >
        {account.name}
      </Text>

      {/* Row 3: Description */}
      {account.description ? (
        <Text
          className="text-[11px] text-on-surface-variant -mt-2"
          numberOfLines={1}
        >
          {account.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

// ── Empty state card ──────────────────────────────────────────────────────────

function EmptyAccountsCard() {
  const C = useColors();
  return (
    <View
      className="rounded-2xl bg-surface-mid p-4 gap-3"
      style={{ borderWidth: 1.5, borderColor: `${C.primary}30`, borderStyle: "dashed" }}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${C.primary}18` }}
        >
          <DynamicIcon name="wallet" size={22} color={C.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-extrabold text-on-surface">
            No accounts yet
          </Text>
          <Text className="text-[12px] text-on-surface-variant mt-0.5">
            You need at least one account before adding transactions.
          </Text>
        </View>
      </View>
      <View className="flex-row gap-8" style={{ gap: 8 }}>
        <TouchableOpacity
          onPress={() => router.push("/settings/add-account")}
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 11,
            borderRadius: 12,
            backgroundColor: C.primary,
          }}
        >
          <DynamicIcon name="plus" size={14} color="#fff" />
          <Text style={{ fontSize: 13, fontWeight: "700", color: "#fff" }}>
            Add Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/settings/accounts")}
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 11,
            borderRadius: 12,
            backgroundColor: C.surfaceHigh,
          }}
        >
          <DynamicIcon name="list" size={14} color={C.onSurface} />
          <Text style={{ fontSize: 13, fontWeight: "700", color: C.onSurface }}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────

function AccountCardSkeleton() {
  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="rounded-2xl bg-surface-mid p-4 gap-3"
    >
      <View className="flex-row items-center gap-3">
        <Skeleton width={48} height={48} radius={13} />
        <View className="flex-1 gap-1.5">
          <Skeleton width="70%" height={18} />
          <Skeleton width="40%" height={11} />
        </View>
      </View>
      <Skeleton width="60%" height={14} />
      <Skeleton width="75%" height={11} style={{ marginTop: -4 }} />
    </View>
  );
}

// ── Stat Tile ─────────────────────────────────────────────────────────────────

function StatTile({
  label,
  value,
  icon,
  iconColor,
  valueColor,
}: {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  valueColor?: string;
}) {
  const C = useColors();
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 12,
        backgroundColor: C.surfaceMid,
        padding: 10,
        gap: 6,
      }}
    >
      <View className="flex-row items-center gap-1.5">
        <DynamicIcon name={icon} size={12} color={iconColor} />
        <Text
          className="text-[10px] font-bold uppercase tracking-[0.5px] text-on-surface-variant"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "800",
          color: valueColor ?? C.onSurface,
          letterSpacing: -0.3,
        }}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

// ── Action Sheet ──────────────────────────────────────────────────────────────

function AccountActionsSheet({
  account,
  onClose,
  onViewHistory,
  onEdit,
}: {
  account: AccountFieldsFragment | null;
  onClose: () => void;
  onViewHistory: () => void;
  onEdit: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const fmt = useFormatMoney();

  const balance = account?.balance ?? 0;
  const balanceColor = balance >= 0 ? "#10b981" : "#ef4444";
  const txnCount = account?.totalTransactions ?? 0;
  const lastActivity = account?.lastTransactionAt
    ? formatRelativeShort(new Date(account.lastTransactionAt))
    : "No activity";

  return (
    <Modal
      visible={!!account}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        className="absolute bottom-0 left-0 right-0 bg-surface-low rounded-t-3xl"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4 }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-9 h-1 rounded-full bg-outline-variant" />
        </View>

        {/* Account header */}
        {account && (
          <View className="flex-row items-center gap-3 px-5 py-3">
            <AccountAvatar
              avatarUrl={account.avatar?.url}
              icon={account.icon}
              bgColor={account.bgColor}
              iconColor={account.color}
              name={account.name}
              size={44}
            />
            <View className="flex-1 min-w-0">
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-base font-extrabold text-on-surface"
                  numberOfLines={1}
                  style={{ flexShrink: 1 }}
                >
                  {account.name}
                </Text>
                {account.isActive === false && (
                  <View
                    className="rounded-full px-1.5 py-0.5"
                    style={{ backgroundColor: `${C.outlineVariant}33` }}
                  >
                    <Text className="text-[9px] font-bold uppercase tracking-[0.5px] text-on-surface-variant">
                      Inactive
                    </Text>
                  </View>
                )}
              </View>
              {account.description ? (
                <Text
                  className="text-[12px] text-on-surface-variant"
                  numberOfLines={1}
                >
                  {account.description}
                </Text>
              ) : null}
            </View>
          </View>
        )}

        {/* Stats row */}
        {account && (
          <View className="flex-row px-5 pb-3" style={{ gap: 8 }}>
            <StatTile
              label="Balance"
              value={fmt(balance)}
              valueColor={balanceColor}
              icon="wallet"
              iconColor={balanceColor}
            />
            <StatTile
              label="Transactions"
              value={String(txnCount)}
              icon="receipt"
              iconColor="#6366f1"
            />
            <StatTile
              label="Last activity"
              value={lastActivity}
              icon="clock"
              iconColor="#f59e0b"
            />
          </View>
        )}

        <View
          className="mx-5 mb-3"
          style={{ height: 1, backgroundColor: `${C.outlineVariant}33` }}
        />

        <View className="px-4 gap-2">
          <TouchableOpacity
            onPress={onViewHistory}
            activeOpacity={0.75}
            className="flex-row items-center gap-3.5 p-4 rounded-2xl bg-surface-mid"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: "#6366f120" }}
            >
              <DynamicIcon name="clock" size={18} color="#6366f1" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-bold text-on-surface">
                View Transactions
              </Text>
              <Text className="text-[12px] text-on-surface-variant">
                All transactions for this account
              </Text>
            </View>
            <DynamicIcon
              name="chevron-right"
              size={16}
              color={C.outlineVariant}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onEdit}
            activeOpacity={0.75}
            className="flex-row items-center gap-3.5 p-4 rounded-2xl bg-surface-mid"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: `${C.primary}20` }}
            >
              <DynamicIcon name="pencil" size={18} color={C.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-bold text-on-surface">
                Edit Account
              </Text>
              <Text className="text-[12px] text-on-surface-variant">
                Update account details
              </Text>
            </View>
            <DynamicIcon
              name="chevron-right"
              size={16}
              color={C.outlineVariant}
            />
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-2">
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.75}
            className="p-4 rounded-2xl items-center bg-surface-mid"
          >
            <Text className="text-[14px] font-bold text-on-surface">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AccountsRow({ showBalance, accounts, loading }: Props) {
  const fmt = useFormatMoney();
  const [selected, setSelected] = useState<AccountFieldsFragment | null>(null);

  const sorted = useMemo(() => {
    if (!accounts) return [];
    return [...accounts].sort((a, b) => {
      const aDate = a.lastTransactionAt ?? a.updatedAt ?? "";
      const bDate = b.lastTransactionAt ?? b.updatedAt ?? "";
      if (bDate > aDate) return 1;
      if (aDate > bDate) return -1;
      return a.name.localeCompare(b.name);
    });
  }, [accounts]);

  const showSkeleton = loading && !accounts?.length;
  const isEmpty = !showSkeleton && !sorted.length;

  return (
    <>
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-extrabold text-on-surface tracking-tight">
          Accounts
        </Text>
        {!isEmpty && (
          <TouchableOpacity
            onPress={() => router.push("/settings/accounts")}
            activeOpacity={0.75}
          >
            <Text className="text-[13px] font-semibold text-primary-bright">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isEmpty ? (
        <EmptyAccountsCard />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
          style={{ marginHorizontal: -16 }}
        >
          {showSkeleton
            ? [1, 2, 3].map((i) => <AccountCardSkeleton key={i} />)
            : sorted.map((acc) => (
                <AccountCard
                  key={acc.id}
                  account={acc}
                  showBalance={showBalance}
                  fmt={fmt}
                  onPress={() => setSelected(acc)}
                />
              ))}
        </ScrollView>
      )}

      <AccountActionsSheet
        account={selected}
        onClose={() => setSelected(null)}
        onViewHistory={() => {
          const id = selected!.id;
          setSelected(null);
          router.push({
            pathname: "/transactions",
            params: { accountId: id },
          });
        }}
        onEdit={() => {
          const id = selected!.id;
          setSelected(null);
          router.push(`/settings/edit-account/${id}`);
        }}
      />
    </>
  );
}
