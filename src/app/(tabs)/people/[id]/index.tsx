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
import { UserAvatar } from "../../../../components/UserAvatar";
import { useFormatMoney } from "../../../../lib/format-currency";
import {
  useGetPerson,
  useDeletePerson,
} from "../../../../services/gql/people/people.service";
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
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete "${person?.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePerson(id);
              router.back();
            } catch (err: any) {
              Alert.alert("Error", err?.message ?? "Could not delete person.");
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
