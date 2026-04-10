import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showAlert } from "../../../../components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../../components/Icon";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { UserAvatar } from "../../../../components/UserAvatar";
import { AccountAvatar } from "../../../../components/AccountAvatar";
import { useFormatMoney } from "../../../../lib/format-currency";
import {
  useGetPerson,
  useDeletePerson,
} from "../../../../services/gql/people/people.service";
import { useGetTransactions } from "../../../../services/gql/transactions/transactions.service";
import {
  Transaction_type,
  type TransactionFieldsFragment,
} from "../../../../services/gql/types/graphql";
import { useColors } from "../../../../theme/colors";

function PersonDetailSkeleton({ insets }: { insets: { bottom: number } }) {
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
      <View className="rounded-2xl items-center py-8 gap-3" style={{ backgroundColor: C.surfaceMid }}>
        <Skeleton width={88} height={88} radius={44} />
        <View className="items-center gap-2">
          <Skeleton width={140} height={18} />
          <Skeleton width={80} height={24} />
          <Skeleton width={60} height={12} />
        </View>
      </View>
      {/* Quick actions skeleton */}
      <View className="flex-row gap-3">
        <Skeleton style={{ flex: 1 }} height={48} radius={16} />
        <Skeleton style={{ flex: 1 }} height={48} radius={16} />
      </View>
      {/* Info card skeleton */}
      <View className="rounded-2xl p-4 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        {[1, 2, 3].map((i) => (
          <View key={i} className="flex-row items-center gap-3">
            <Skeleton width={36} height={36} radius={10} />
            <View className="flex-1 gap-1.5">
              <Skeleton width="30%" height={10} />
              <Skeleton width="60%" height={13} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function txTypeConfig(type: Transaction_type) {
  if (type === Transaction_type.income) return { color: "#10b981" };
  if (type === Transaction_type.transfer) return { color: "#6366f1" };
  return { color: "#ef4444" };
}

function txDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "Today";
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
}

function RecentTxRow({ t, onPress }: { t: TransactionFieldsFragment; onPress: () => void }) {
  const C = useColors();
  const fmt = useFormatMoney();
  const { color } = txTypeConfig(t.type);
  const catBg = t.category?.bgColor ?? "#f59e0b22";
  const catColor = t.category?.color ?? "#f59e0b";
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75} className="flex-row items-center gap-3 px-4 py-3">
      <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: catBg, alignItems: "center", justifyContent: "center" }}>
        <DynamicIcon name={t.category?.icon ?? "receipt"} size={16} color={catColor} />
      </View>
      <View className="flex-1 min-w-0 gap-0.5">
        <Text className="text-[13px] font-semibold text-on-surface" numberOfLines={1}>{t.title}</Text>
        <View className="flex-row items-center gap-1.5">
          <AccountAvatar avatarUrl={t.account.avatar?.url} icon={t.account.icon} bgColor={t.account.bgColor} iconColor={t.account.color} name={t.account.name} size={12} />
          <Text className="text-[11px] text-on-surface-variant" numberOfLines={1}>
            {t.account.name}{t.toAccount ? ` → ${t.toAccount.name}` : ""}
          </Text>
        </View>
      </View>
      <View className="items-end gap-0.5 shrink-0">
        <Text style={{ fontSize: 13, fontWeight: "700", color }}>{fmt(parseFloat(t.amount))}</Text>
        <Text className="text-[11px] text-on-surface-variant">{txDate(t.date)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoRow({
  icon,
  label,
  value,
  iconColor,
  iconBg,
}: {
  icon: string;
  label: string;
  value: string | null | undefined;
  iconColor: string;
  iconBg: string;
}) {
  if (!value) return null;
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
        <Text
          className="text-[14px] font-semibold text-on-surface mt-0.5"
          numberOfLines={2}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  const C = useColors();
  return (
    <View
      className="mx-4"
      style={{ height: 1, backgroundColor: C.outlineVariant + "28" }}
    />
  );
}

export default function PersonDetailScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: person, loading, error, refetch } = useGetPerson(id);
  const { deletePerson, loading: deleting } = useDeletePerson();
  const fmt = useFormatMoney();

  const { transactions: recentTx, loading: txLoading } = useGetTransactions({
    limit: 10,
    sort: "-date",
    where: { person: { in: [id] } },
  });

  const balance = person?.balance ?? 0;
  const avatar = person?.avatar ?? null;

  const joinedDate = person?.createdAt
    ? new Date(person.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handleDelete = () => {
    showAlert({
      title: "Delete Person",
      message: `Are you sure you want to delete "${person?.name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePerson(id);
              router.back();
            } catch (err: any) {
              showAlert({ title: "Error", message: err?.message ?? "Could not delete person." });
            }
          },
        },
      ],
    });
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
            {loading ? "Loading…" : (person?.name ?? "Person")}
          </Text>
          {person && (
            <TouchableOpacity
              onPress={() => router.push(`/people/${id}/edit`)}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
            >
              <DynamicIcon name="pencil" size={17} color={C.onSurface} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && !person ? (
        <PersonDetailSkeleton insets={insets} />
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-[15px] text-on-surface-variant text-center">
            Could not load person.
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            activeOpacity={0.75}
            className="px-4 py-2 rounded-xl bg-surface-mid"
          >
            <Text className="text-[14px] font-semibold text-on-surface">
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      ) : person ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 24,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero card */}
          <View
            className="rounded-2xl items-center py-8 gap-3"
            style={{ backgroundColor: C.surfaceMid }}
          >
            <UserAvatar
              id={person.id}
              name={person.name ?? ""}
              avatarUrl={avatar?.url}
              size={88}
            />

            <View className="items-center gap-1">
              <Text className="text-[20px] font-black text-on-surface tracking-[-0.3px]">
                {person.name}
              </Text>
              {person.isActive === false && (
                <View className="px-2.5 py-0.5 rounded-full bg-surface-high">
                  <Text className="text-[10px] font-bold uppercase tracking-[0.8px] text-on-surface-variant">
                    Inactive
                  </Text>
                </View>
              )}
            </View>

            {/* Balance */}
            <View className="items-center">
              {balance === 0 ? (
                <Text className="text-[15px] font-semibold text-on-surface-variant">
                  All settled up
                </Text>
              ) : (
                <>
                  <Text
                    style={{ fontSize: 28, fontWeight: "900", letterSpacing: -0.5, color: balance > 0 ? "#ef4444" : "#10b981" }}
                  >
                    {fmt(Math.abs(balance))}
                  </Text>
                  <Text className="text-[12px] text-on-surface-variant mt-0.5">
                    {balance > 0 ? "You owe" : "Owes you"}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Quick actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/add",
                  params: { personId: id, type: "expense" },
                })
              }
              activeOpacity={0.75}
              className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl"
              style={{ backgroundColor: C.primary }}
            >
              <DynamicIcon name="plus" size={16} color="#fff" />
              <Text className="text-[14px] font-bold text-white">
                Add Transaction
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (balance === 0) return;
                router.push({
                  pathname: "/(tabs)/add",
                  params: {
                    personId: id,
                    type: balance > 0 ? "expense" : "income",
                    amount: String(Math.abs(balance)),
                  },
                });
              }}
              disabled={balance === 0}
              activeOpacity={0.75}
              className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-2xl bg-surface-mid"
              style={{ opacity: balance === 0 ? 0.4 : 1 }}
            >
              <DynamicIcon name="handshake" size={16} color={C.onSurface} />
              <Text className="text-[14px] font-bold text-on-surface">
                Settle Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contact info */}
          {(person.email || person.phone) && (
            <View
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: C.surfaceMid }}
            >
              <InfoRow
                icon="mail"
                label="Email"
                value={person.email}
                iconColor="#6366f1"
                iconBg="#6366f120"
              />
              {person.email && person.phone && <Divider />}
              <InfoRow
                icon="phone"
                label="Phone"
                value={person.phone}
                iconColor="#10b981"
                iconBg="#10b98120"
              />
            </View>
          )}

          {/* About */}
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: C.surfaceMid }}
          >
            {person.description && (
              <>
                <InfoRow
                  icon="file-text"
                  label="Note"
                  value={person.description}
                  iconColor="#f59e0b"
                  iconBg="#f59e0b20"
                />
                <Divider />
              </>
            )}
            <InfoRow
              icon="layers"
              label="Transactions"
              value={String(person.totalTransactions ?? 0)}
              iconColor="#8b5cf6"
              iconBg="#8b5cf620"
            />
            {joinedDate && <Divider />}
            <InfoRow
              icon="calendar"
              label="Added on"
              value={joinedDate}
              iconColor="#f59e0b"
              iconBg="#f59e0b20"
            />
          </View>

          {/* Recent Transactions */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            {/* Header row */}
            <View className="flex-row items-center px-4 pt-3.5 pb-1">
              <Text className="flex-1 text-[11px] font-bold uppercase tracking-[0.7px] text-on-surface-variant">
                Recent Transactions
              </Text>
              <TouchableOpacity
                onPress={() => router.push({ pathname: "/(tabs)/history", params: { personId: id } })}
                activeOpacity={0.7}
                className="flex-row items-center gap-1"
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: C.primary }}>View All</Text>
                <DynamicIcon name="chevron-right" size={13} color={C.primary} />
              </TouchableOpacity>
            </View>

            {txLoading && !recentTx ? (
              /* Skeleton */
              <View className="px-4 py-2 gap-3">
                {[1, 2, 3].map((i) => (
                  <View key={i} className="flex-row items-center gap-3">
                    <Skeleton width={38} height={38} radius={12} />
                    <View className="flex-1 gap-1.5">
                      <Skeleton width="55%" height={12} />
                      <Skeleton width="35%" height={10} />
                    </View>
                    <View className="items-end gap-1.5">
                      <Skeleton width={56} height={12} />
                      <Skeleton width={36} height={10} />
                    </View>
                  </View>
                ))}
              </View>
            ) : !recentTx || recentTx.length === 0 ? (
              <View className="items-center py-6 gap-1">
                <DynamicIcon name="receipt" size={22} color={C.outlineVariant} />
                <Text className="text-[12px] text-on-surface-variant">No transactions yet</Text>
              </View>
            ) : (
              <>
                {recentTx.map((t, idx) => (
                  <React.Fragment key={t.id}>
                    {idx > 0 && <Divider />}
                    <RecentTxRow t={t} onPress={() => router.push(`/history/${t.id}`)} />
                  </React.Fragment>
                ))}
                {(person.totalTransactions ?? 0) > 10 && (
                  <>
                    <Divider />
                    <TouchableOpacity
                      onPress={() => router.push({ pathname: "/(tabs)/history", params: { personId: id } })}
                      activeOpacity={0.75}
                      className="flex-row items-center justify-center gap-1.5 py-3"
                    >
                      <Text style={{ fontSize: 13, fontWeight: "700", color: C.primary }}>
                        View all {person.totalTransactions} transactions
                      </Text>
                      <DynamicIcon name="arrow-right" size={13} color={C.primary} />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>

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
                  Delete Person
                </Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      ) : null}
    </View>
  );
}
