// cspell:ignore Swipeable
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showAlert } from "@/components/ui/AlertDialog";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "@/components/AccountAvatar";
import { ArchivedSection } from "@/components/ui/ArchivedSection";
import { splitArchived } from "@/lib/archive";
import { SwipeRowActions as RightActions } from "@/components/ui/SwipeRowActions";
import { DynamicIcon } from "@/components/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  useDeleteAccount,
  useUpdateAccount,
  useGetAccounts,
} from "@/services/gql/accounts/accounts.service";
import type { AccountFieldsFragment } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";
import { useFormatMoney } from "@/lib/format-currency";

// ── Types ─────────────────────────────────────────────────────────────────────

type SwipeableRef = { current: SwipeableMethods | null };

// ── Swipe actions ──────────────────────────────────────────────────────────────


// ── AccountRow ─────────────────────────────────────────────────────────────────

function AccountRow({
  account,
  deleting,
  openRef,
  onEdit,
  onDelete,
  onArchive,
}: {
  account: AccountFieldsFragment;
  deleting: boolean;
  openRef: SwipeableRef;
  onEdit: () => void;
  onDelete: () => void;
  onArchive?: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const swipeRef = useRef<SwipeableMethods>(null);
  const balance = account.balance ?? 0;
  const balanceColor = balance >= 0 ? "#10b981" : "#ef4444";

  const pulse = useSharedValue(0);

  useEffect(() => {
    if (deleting) {
      pulse.value = withRepeat(withTiming(1, { duration: 600 }), -1, true);
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 200 });
    }
  }, [deleting]);

  const rowStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pulse.value,
      [0, 1],
      [C.surfaceMid, "#ef444428"],
    ),
  }));

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
          archived={account.isActive === false}
          onArchive={onArchive ? () => {
            swipeRef.current?.close();
            onArchive();
          } : undefined}
          onEdit={() => {
            swipeRef.current?.close();
            onEdit();
          }}
          onDelete={() => {
            swipeRef.current?.close();
            onDelete();
          }}
        />
      )}
    >
      <Reanimated.View
        style={rowStyle}
        className="flex-row items-center gap-3 px-4 py-3"
      >
        {/* Avatar / Icon */}
        <AccountAvatar
          avatarUrl={account.avatar?.url}
          icon={account.icon ?? "wallet"}
          iconColor={account.color ?? "#ffffff"}
          bgColor={account.bgColor}
          name={account.name}
          size={44}
        />

        {/* Info */}
        <View className="flex-1 min-w-0">
          <Text
            className="text-[14px] font-bold text-on-surface"
            numberOfLines={1}
          >
            {account.name}
          </Text>
          {account.description ? (
            <Text
              className="text-[12px] text-on-surface-variant"
              numberOfLines={1}
            >
              {account.description}
            </Text>
          ) : null}
          <Text
            className="text-[11px] font-semibold mt-0.5"
            style={{ color: balanceColor }}
          >
            {fmt(account.balance)}
          </Text>
        </View>

        {/* Transaction count */}
        {(account.totalTransactions ?? 0) > 0 && (
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${C.outlineVariant}33` }}
          >
            <Text className="text-[11px] font-semibold text-on-surface-variant">
              {account.totalTransactions} txn
              {account.totalTransactions === 1 ? "" : "s"}
            </Text>
          </View>
        )}
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function AccountRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Skeleton width={44} height={44} radius={12} />
      <View className="flex-1 gap-2">
        <Skeleton width="45%" height={13} />
        <Skeleton width="30%" height={11} />
      </View>
    </View>
  );
}

function NetWorthSkeleton() {
  return (
    <View className="rounded-2xl p-4" style={{ backgroundColor: `#f59e0b18` }}>
      <Skeleton width="30%" height={11} />
      <View className="mt-2 mb-1">
        <Skeleton width="55%" height={26} />
      </View>
      <Skeleton width="45%" height={11} />
    </View>
  );
}

function AccountListSkeleton() {
  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      {[1, 2, 3].map((i, idx) => (
        <React.Fragment key={i}>
          {idx > 0 && <View className="mx-4" style={{ height: 1 }} />}
          <AccountRowSkeleton />
        </React.Fragment>
      ))}
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function AccountsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const fmt = useFormatMoney();
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const { accounts, loading, refetch } = useGetAccounts({
    limit: 100,
    sort: "name",
  });
  const { deleteAccount } = useDeleteAccount();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const { updateAccount } = useUpdateAccount();
  const toggleArchive = async (x: AccountFieldsFragment) => {
    try {
      await updateAccount({ id: x.id, data: { isActive: x.isActive === false } });
    } catch (err: any) {
      showAlert({ title: x.isActive === false ? "Couldn't unarchive" : "Couldn't archive", message: err?.message ?? "Please try again." });
    }
  };

  const handleDelete = (account: AccountFieldsFragment) => {
    showAlert({
      title: "Delete Account",
      message: `Are you sure you want to delete "${account.name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingId(account.id);
            try {
              await deleteAccount(account.id);
            } catch (err: any) {
              setDeletingId(null);
              const message =
                err?.graphQLErrors?.[0]?.message ||
                err?.errors?.[0]?.message ||
                err?.message ||
                "Failed to delete account.";
              showAlert({ title: "Cannot Delete", message });
            }
          },
        },
      ],
    });
  };

  const sortedAccounts = (accounts ?? [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  // Summary totals
  const totalBalance = sortedAccounts.reduce(
    (sum, a) => sum + (a.balance ?? 0),
    0,
  );

  const { active: activeAccounts, archived: archivedAccounts } = splitArchived(sortedAccounts);
  const renderAccounts = (list: AccountFieldsFragment[]) => (
          <View className="rounded-2xl overflow-hidden bg-surface-mid">
            {list.map((account, idx) => (
              <React.Fragment key={account.id}>
                {idx > 0 && (
                  <View
                    className="mx-4"
                    style={{
                      height: 1,
                      backgroundColor: C.outlineVariant + "33",
                    }}
                  />
                )}
                <AccountRow
                  account={account}
                  deleting={deletingId === account.id}
                  openRef={openSwipeable}
                  onEdit={() =>
                    router.push(`/settings/edit-account/${account.id}`)
                  }
                  onDelete={() => handleDelete(account)}
                  onArchive={() => toggleArchive(account)}
                />
              </React.Fragment>
            ))}
          </View>
  );

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Accounts
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/settings/add-account")}
            activeOpacity={0.75}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: "#f59e0b22" }}
          >
            <DynamicIcon name="plus" size={18} color="#f59e0b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Net worth summary */}
        {loading && !accounts ? (
          <NetWorthSkeleton />
        ) : (
          !loading &&
          sortedAccounts.length > 0 && (
            <View
              className="rounded-2xl p-4"
              style={{ backgroundColor: `#f59e0b18` }}
            >
              <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant mb-1">
                Net worth
              </Text>
              <Text
                className="text-[26px] font-black tracking-tight"
                style={{ color: totalBalance >= 0 ? "#10b981" : "#ef4444" }}
              >
                {fmt(totalBalance)}
              </Text>
              <Text className="text-[12px] text-on-surface-variant mt-0.5">
                Across {sortedAccounts.length} account
                {sortedAccounts.length === 1 ? "" : "s"}
              </Text>
            </View>
          )
        )}

        {/* Account list */}
        {loading && !accounts ? (
          <AccountListSkeleton />
        ) : sortedAccounts.length === 0 ? (
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="wallet" size={30} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">
              No accounts yet
            </Text>
            <Text className="text-[13px] text-on-surface-variant opacity-60 text-center">
              Tap + to add your first account
            </Text>
          </View>
        ) : (
          <>
            {activeAccounts.length > 0 && renderAccounts(activeAccounts)}
            <ArchivedSection count={archivedAccounts.length}>{renderAccounts(archivedAccounts)}</ArchivedSection>
          </>
        )}
      </ScrollView>
    </View>
  );
}
