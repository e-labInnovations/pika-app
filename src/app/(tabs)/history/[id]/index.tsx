import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../../components/Icon";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { AccountAvatar } from "../../../../components/AccountAvatar";
import { UserAvatar } from "../../../../components/UserAvatar";
import { useFormatMoney } from "../../../../lib/format-currency";
import {
  useGetTransaction,
  useDeleteTransaction,
} from "../../../../services/gql/transactions/transactions.service";
import { Transaction_type } from "../../../../services/gql/types/graphql";
import { useColors } from "../../../../theme/colors";

// ── Skeleton ──────────────────────────────────────────────────────────────────

function TransactionDetailSkeleton({ insets }: { insets: { bottom: number } }) {
  const C = useColors();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: Math.max(insets.bottom, 16) + 24,
        gap: 12,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero card skeleton */}
      <View className="rounded-2xl items-center py-8 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        <Skeleton width={64} height={64} radius={20} />
        <View className="items-center gap-2">
          <Skeleton width={160} height={16} />
          <Skeleton width={100} height={32} />
          <Skeleton width={80} height={12} />
        </View>
        <View className="flex-row gap-2 mt-1">
          <Skeleton width={90} height={28} radius={12} />
          <Skeleton width={90} height={28} radius={12} />
        </View>
      </View>
      {/* Info card skeleton */}
      <View className="rounded-2xl p-4 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        {[1, 2, 3].map((i) => (
          <View key={i} className="flex-row items-center gap-3">
            <Skeleton width={36} height={36} radius={10} />
            <View className="flex-1 gap-1.5">
              <Skeleton width="25%" height={10} />
              <Skeleton width="55%" height={13} />
            </View>
          </View>
        ))}
      </View>
      <Skeleton width="100%" height={52} radius={16} />
    </ScrollView>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  iconColor,
  iconBg,
  children,
}: {
  icon: string;
  label: string;
  iconColor: string;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <DynamicIcon name={icon} size={17} color={iconColor} />
      </View>
      <View className="flex-1 min-w-0">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
          {label}
        </Text>
        <View className="mt-0.5">{children}</View>
      </View>
    </View>
  );
}

function Divider() {
  const C = useColors();
  return (
    <View className="mx-4" style={{ height: 1, backgroundColor: C.outlineVariant + "28" }} />
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function TransactionDetailScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: tx, loading, error, refetch } = useGetTransaction(id);
  const { deleteTransaction, loading: deleting } = useDeleteTransaction();
  const fmt = useFormatMoney();

  const amount = tx ? parseFloat(tx.amount) : 0;
  const isIncome = tx?.type === Transaction_type.income;
  const isTransfer = tx?.type === Transaction_type.transfer;
  const isExpense = tx?.type === Transaction_type.expense;

  const amountColor = isIncome ? "#10b981" : isTransfer ? "#6366f1" : "#ef4444";
  const amountSign = isIncome ? "+" : isTransfer ? "" : "−";

  const typeLabel = isIncome ? "Income" : isTransfer ? "Transfer" : "Expense";
  const typeColor = amountColor;
  const typeBg = `${amountColor}20`;

  const catBg = tx?.category?.bgColor ?? `${tx?.category?.color ?? "#f59e0b"}22`;
  const catColor = tx?.category?.color ?? "#f59e0b";

  const formattedDate = tx?.date
    ? new Date(tx.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const formattedTime = tx?.date
    ? new Date(tx.date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const createdAt = tx?.createdAt
    ? new Date(tx.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      `Delete "${tx?.title}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction(id);
              router.back();
            } catch (err: any) {
              Alert.alert("Error", err?.message ?? "Could not delete transaction.");
            }
          },
        },
      ],
    );
  };

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
          <Text
            className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface"
            numberOfLines={1}
          >
            {loading && !tx ? "Loading…" : (tx?.title ?? "Transaction")}
          </Text>
          {tx && (
            <TouchableOpacity
              onPress={() => router.push(`/history/${id}/edit`)}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
            >
              <DynamicIcon name="pencil" size={17} color={C.onSurface} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && !tx ? (
        <TransactionDetailSkeleton insets={insets} />
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-[15px] text-on-surface-variant text-center">
            Could not load transaction.
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            activeOpacity={0.75}
            className="px-4 py-2 rounded-xl bg-surface-mid"
          >
            <Text className="text-[14px] font-semibold text-on-surface">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : tx ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 24,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero card */}
          <View className="rounded-2xl items-center py-8 gap-3" style={{ backgroundColor: C.surfaceMid }}>
            {/* Category icon */}
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  backgroundColor: catBg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DynamicIcon name={tx.category?.icon ?? "receipt"} size={28} color={catColor} />
              </View>
              {/* Type badge */}
              <View
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  paddingHorizontal: 7,
                  paddingVertical: 2,
                  borderRadius: 10,
                  backgroundColor: typeColor,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: "800", color: "#fff" }}>{typeLabel}</Text>
              </View>
            </View>

            {/* Title + amount */}
            <View className="items-center gap-1 px-4">
              <Text
                className="text-[16px] font-bold text-on-surface text-center"
                numberOfLines={2}
              >
                {tx.title}
              </Text>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: "900",
                  color: amountColor,
                  letterSpacing: -0.5,
                }}
              >
                {amountSign}{fmt(amount)}
              </Text>
              {tx.category && (
                <Text className="text-[12px] text-on-surface-variant">
                  {tx.category.name}
                </Text>
              )}
            </View>

            {/* Tags */}
            {(tx.tags?.length ?? 0) > 0 && (
              <View className="flex-row flex-wrap gap-2 justify-center px-4">
                {tx.tags!.map((tag) => (
                  <View
                    key={tag.id}
                    className="flex-row items-center gap-1 px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: tag.bgColor ?? `${tag.color ?? C.outlineVariant}22` }}
                  >
                    <DynamicIcon name={tag.icon} size={11} color={tag.color ?? C.outlineVariant} />
                    <Text style={{ fontSize: 12, color: tag.color ?? C.outlineVariant, fontWeight: "600" }}>
                      {tag.name}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Date & Time */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            <InfoRow icon="calendar" label="Date" iconColor="#6366f1" iconBg="#6366f120">
              <Text className="text-[14px] font-semibold text-on-surface">
                {formattedDate}
              </Text>
            </InfoRow>
            <Divider />
            <InfoRow icon="clock" label="Time" iconColor="#8b5cf6" iconBg="#8b5cf620">
              <Text className="text-[14px] font-semibold text-on-surface">
                {formattedTime}
              </Text>
            </InfoRow>
          </View>

          {/* Accounts */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            <InfoRow icon="wallet" label={isTransfer ? "From Account" : "Account"} iconColor="#10b981" iconBg="#10b98120">
              <View className="flex-row items-center gap-2 mt-0.5">
                <AccountAvatar
                  avatarUrl={tx.account.avatar?.url}
                  icon={tx.account.icon}
                  bgColor={tx.account.bgColor}
                  iconColor={tx.account.color}
                  name={tx.account.name}
                  size={22}
                />
                <Text className="text-[14px] font-semibold text-on-surface">
                  {tx.account.name}
                </Text>
              </View>
            </InfoRow>
            {isTransfer && tx.toAccount && (
              <>
                <Divider />
                <InfoRow icon="wallet" label="To Account" iconColor="#6366f1" iconBg="#6366f120">
                  <View className="flex-row items-center gap-2 mt-0.5">
                    <AccountAvatar
                      avatarUrl={tx.toAccount.avatar?.url}
                      icon={tx.toAccount.icon}
                      bgColor={tx.toAccount.bgColor}
                      iconColor={tx.toAccount.color}
                      name={tx.toAccount.name}
                      size={22}
                    />
                    <Text className="text-[14px] font-semibold text-on-surface">
                      {tx.toAccount.name}
                    </Text>
                  </View>
                </InfoRow>
              </>
            )}
          </View>

          {/* Person */}
          {tx.person && (
            <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
              <InfoRow icon="user" label="Person" iconColor="#f59e0b" iconBg="#f59e0b20">
                <View className="flex-row items-center gap-2 mt-0.5">
                  <UserAvatar
                    id={tx.person.id}
                    name={tx.person.name}
                    avatarUrl={tx.person.avatar?.url}
                    size={22}
                    radius={11}
                  />
                  <Text className="text-[14px] font-semibold text-on-surface">
                    {tx.person.name}
                  </Text>
                </View>
              </InfoRow>
            </View>
          )}

          {/* Note */}
          {tx.note && (
            <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
              <InfoRow icon="file-text" label="Note" iconColor="#f59e0b" iconBg="#f59e0b20">
                <Text className="text-[14px] text-on-surface leading-5">{tx.note}</Text>
              </InfoRow>
            </View>
          )}

          {/* Meta */}
          {createdAt && (
            <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
              <InfoRow icon="calendar-plus" label="Added on" iconColor={C.outlineVariant} iconBg={`${C.outlineVariant}20`}>
                <Text className="text-[14px] font-semibold text-on-surface">{createdAt}</Text>
              </InfoRow>
            </View>
          )}

          {/* Delete */}
          <TouchableOpacity
            onPress={handleDelete}
            disabled={deleting}
            activeOpacity={0.75}
            className="flex-row items-center justify-center gap-2 p-4 rounded-2xl bg-surface-mid"
          >
            {deleting ? (
              <ActivityIndicator size="small" color={C.tertiary} />
            ) : (
              <>
                <DynamicIcon name="trash-2" size={17} color={C.tertiary} />
                <Text className="text-[14px] font-semibold text-tertiary">
                  Delete Transaction
                </Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      ) : null}
    </View>
  );
}
