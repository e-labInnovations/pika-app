// cspell:ignore Swipeable
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showAlert } from "@/components/ui/AlertDialog";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserAvatar } from "@/components/UserAvatar";
import { useFormatMoney } from "@/lib/format-currency";
import {
  useGetPeople,
  useDeletePerson,
} from "@/services/gql/people/people.service";
import type { PersonFieldsFragment } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type SwipeableRef = { current: SwipeableMethods | null };

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
          style={{
            flex: 1,
            backgroundColor: `${C.primary}22`,
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <DynamicIcon name="pencil" size={16} color={C.primary} />
          <Text style={{ fontSize: 11, color: C.primary, fontWeight: "700" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </Reanimated.View>

      <Reanimated.View style={[deleteStyle, { flex: 1 }]}>
        <TouchableOpacity
          onPress={onDelete}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: `${C.tertiary}22`,
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <DynamicIcon name="trash-2" size={16} color={C.tertiary} />
          <Text style={{ fontSize: 11, color: C.tertiary, fontWeight: "700" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </Reanimated.View>
    </View>
  );
}

// ── PersonRow ──────────────────────────────────────────────────────────────────

function PersonRow({
  person,
  deleting,
  openRef,
  onPress,
  onEdit,
  onDelete,
}: {
  person: PersonFieldsFragment;
  deleting: boolean;
  openRef: SwipeableRef;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const swipeRef = useRef<SwipeableMethods>(null);
  const balance = person.balance ?? 0;
  const contact = person.email ?? person.phone;

  const balanceColor =
    balance > 0 ? "#ef4444" : balance < 0 ? "#10b981" : C.onSurfaceVariant;

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
      <Reanimated.View style={rowStyle}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.75}
          className="flex-row items-center gap-3 px-4 py-3"
        >
          <UserAvatar
            id={person.id}
            name={person.name ?? "?"}
            avatarUrl={person.avatar?.url}
            size={44}
          />

          <View className="flex-1 min-w-0 gap-0.5">
            <View className="flex-row items-center gap-2">
              <Text
                className="text-[14px] font-bold text-on-surface flex-1"
                numberOfLines={1}
              >
                {person.name}
              </Text>
              {person.isActive === false && (
                <View
                  className="px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: `${C.outlineVariant}33` }}
                >
                  <Text className="text-[9px] font-bold tracking-[0.5px] uppercase text-on-surface-variant">
                    Inactive
                  </Text>
                </View>
              )}
            </View>
            {contact ? (
              <Text
                className="text-[12px] text-on-surface-variant"
                numberOfLines={1}
              >
                {contact}
              </Text>
            ) : null}
          </View>

          <View className="items-end gap-1 shrink-0">
            <Text
              className="text-[14px] font-bold"
              style={{ color: balanceColor }}
            >
              {balance === 0 ? "Even" : fmt(Math.abs(balance))}
            </Text>
            <Text className="text-[11px] text-on-surface-variant">
              {person.totalTransactions ?? 0} txn
              {(person.totalTransactions ?? 0) !== 1 ? "s" : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function PersonRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Skeleton width={44} height={44} radius={22} />
      <View className="flex-1 gap-2">
        <Skeleton width="40%" height={13} />
        <Skeleton width="55%" height={11} />
      </View>
      <View className="items-end gap-2">
        <Skeleton width={56} height={13} />
        <Skeleton width={36} height={11} />
      </View>
    </View>
  );
}

function PeopleListSkeleton() {
  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      {[1, 2, 3, 4].map((i, idx) => (
        <React.Fragment key={i}>
          {idx > 0 && <View className="mx-4" style={{ height: 1 }} />}
          <PersonRowSkeleton />
        </React.Fragment>
      ))}
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function PeopleScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const { people, loading, refetch } = useGetPeople({
    limit: 100,
    sort: "name",
  });
  const { deletePerson } = useDeletePerson();

  const filtered = useMemo(() => {
    if (!search.trim()) return people ?? [];
    const q = search.toLowerCase();
    return (people ?? []).filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.toLowerCase().includes(q),
    );
  }, [people, search]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleDelete = (person: PersonFieldsFragment) => {
    showAlert({
      title: "Delete Person",
      message: `Are you sure you want to delete "${person.name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingId(person.id);
            try {
              await deletePerson(person.id);
            } catch (err: any) {
              setDeletingId(null);
              const message =
                err?.graphQLErrors?.[0]?.message ||
                err?.errors?.[0]?.message ||
                err?.message ||
                "Failed to delete person.";
              showAlert({ title: "Cannot Delete", message });
            }
          },
        },
      ],
    });
  };

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="auto" />

      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-[22px] font-black tracking-[-0.5px] text-on-surface">
              People
            </Text>
            {people && people.length > 0 && (
              <Text className="text-[12px] text-on-surface-variant mt-0.5">
                {people.length} {people.length === 1 ? "person" : "people"}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => router.push("/people/add")}
            activeOpacity={0.75}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-high"
          >
            <DynamicIcon name="user-plus" size={17} color={C.primaryBright} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View
          className="flex-row items-center gap-2.5 px-3.5 rounded-xl bg-surface-mid"
          style={{ height: 44 }}
        >
          <DynamicIcon name="search" size={16} color={C.outlineVariant} />
          <TextInput
            className="flex-1 text-[14px] text-on-surface"
            placeholderTextColorClassName="accent-outline"
            placeholder="Search by name, email or phone…"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <DynamicIcon name="x" size={16} color={C.outline} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 24,
          gap: 8,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {search.trim() && filtered.length > 0 && (
          <Text className="text-[12px] font-semibold text-on-surface-variant">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            {search}"
          </Text>
        )}

        {loading && !people ? (
          <PeopleListSkeleton />
        ) : filtered.length === 0 ? (
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="users" size={30} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">
              {loading
                ? "Loading…"
                : search
                  ? "No matches found"
                  : "No people yet"}
            </Text>
            {!loading && !search && (
              <Text className="text-[13px] text-on-surface-variant text-center opacity-60 leading-relaxed">
                {"Add people to track shared\nexpenses and balances"}
              </Text>
            )}
          </View>
        ) : (
          <View className="rounded-2xl overflow-hidden bg-surface-mid">
            {filtered.map((person, idx) => (
              <React.Fragment key={person.id}>
                {idx > 0 && (
                  <View
                    className="mx-4"
                    style={{
                      height: 1,
                      backgroundColor: C.outlineVariant + "33",
                    }}
                  />
                )}
                <PersonRow
                  person={person}
                  deleting={deletingId === person.id}
                  openRef={openSwipeable}
                  onPress={() => router.push(`/people/${person.id}`)}
                  onEdit={() => router.push(`/people/${person.id}/edit`)}
                  onDelete={() => handleDelete(person)}
                />
              </React.Fragment>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
