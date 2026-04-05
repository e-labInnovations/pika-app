import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../AccountAvatar";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
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
      style={{ width: CARD_WIDTH, borderRadius: 20, backgroundColor: C.surfaceMid, padding: 16, gap: 12 }}
    >
      {/* Row 1: Avatar (left) | Balance + txn count (right) */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <AccountAvatar
          avatarUrl={account.avatar?.url}
          icon={account.icon}
          bgColor={account.bgColor}
          iconColor={account.color}
          name={account.name}
          size={48}
        />
        <View style={{ flex: 1, gap: 3 }}>
          <Text
            style={{
              fontSize: showBalance ? 18 : 14,
              fontWeight: "800",
              letterSpacing: showBalance ? -0.5 : 4,
              color: showBalance ? balanceColor : C.onSurfaceVariant,
              opacity: showBalance ? 1 : 0.5,
            }}
            numberOfLines={1}
          >
            {showBalance ? fmt(balance) : HIDDEN}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {(account.totalTransactions ?? 0) > 0 && (
              <Text style={{ fontSize: 11, fontWeight: "600", color: C.onSurfaceVariant }}>
                {account.totalTransactions} txn{account.totalTransactions === 1 ? "" : "s"}
              </Text>
            )}
            {account.isActive === false && (
              <View style={{ backgroundColor: `${C.outlineVariant}33`, borderRadius: 20, paddingHorizontal: 6, paddingVertical: 2 }}>
                <Text style={{ fontSize: 9, fontWeight: "700", color: C.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Inactive
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Row 2: Name */}
      <Text style={{ fontSize: 14, fontWeight: "800", color: C.onSurface, letterSpacing: -0.2 }} numberOfLines={1}>
        {account.name}
      </Text>

      {/* Row 3: Description */}
      {account.description ? (
        <Text style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: -8 }} numberOfLines={1}>
          {account.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────

function AccountCardSkeleton() {
  const C = useColors();
  return (
    <View style={{ width: CARD_WIDTH, borderRadius: 20, backgroundColor: C.surfaceMid, padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Skeleton width={48} height={48} radius={13} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton width="70%" height={18} />
          <Skeleton width="40%" height={11} />
        </View>
      </View>
      <Skeleton width="60%" height={14} />
      <Skeleton width="75%" height={11} style={{ marginTop: -4 }} />
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

  return (
    <Modal visible={!!account} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          backgroundColor: C.surfaceLow,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
        {/* Handle */}
        <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
          <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.outlineVariant }} />
        </View>

        {/* Account header */}
        {account && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingVertical: 12 }}>
            <AccountAvatar
              avatarUrl={account.avatar?.url}
              icon={account.icon}
              bgColor={account.bgColor}
              iconColor={account.color}
              name={account.name}
              size={44}
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: C.onSurface }} numberOfLines={1}>
                {account.name}
              </Text>
              {account.description ? (
                <Text style={{ fontSize: 12, color: C.onSurfaceVariant }} numberOfLines={1}>
                  {account.description}
                </Text>
              ) : null}
            </View>
          </View>
        )}

        <View style={{ height: 1, backgroundColor: `${C.outlineVariant}33`, marginHorizontal: 20, marginBottom: 12 }} />

        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <TouchableOpacity
            onPress={onViewHistory}
            activeOpacity={0.75}
            style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 16, borderRadius: 16, backgroundColor: C.surfaceMid }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#6366f120", alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name="clock" size={18} color="#6366f1" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: C.onSurface }}>View Transactions</Text>
              <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>All transactions for this account</Text>
            </View>
            <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onEdit}
            activeOpacity={0.75}
            style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 16, borderRadius: 16, backgroundColor: C.surfaceMid }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: `${C.primary}20`, alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name="pencil" size={18} color={C.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: C.onSurface }}>Edit Account</Text>
              <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>Update account details</Text>
            </View>
            <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.75}
            style={{ padding: 16, borderRadius: 16, alignItems: "center", backgroundColor: C.surfaceMid }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: C.onSurface }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AccountsRow({ showBalance, accounts, loading }: Props) {
  const C = useColors();
  const fmt = useFormatMoney();
  const [selected, setSelected] = useState<AccountFieldsFragment | null>(null);

  // Sort by most recently active (lastTransactionAt → updatedAt → name)
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

  if (!showSkeleton && !sorted.length) return null;

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "800", color: C.onSurface, letterSpacing: -0.2 }}>
          Accounts
        </Text>
        <TouchableOpacity onPress={() => router.push("/settings/accounts")} activeOpacity={0.75}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: C.primaryBright }}>See All</Text>
        </TouchableOpacity>
      </View>

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

      {/* Single action sheet shared across all cards */}
      <AccountActionsSheet
        account={selected}
        onClose={() => setSelected(null)}
        onViewHistory={() => {
          const id = selected!.id;
          setSelected(null);
          router.push({ pathname: "/(tabs)/history", params: { accountId: id } });
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
