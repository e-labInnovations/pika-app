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
import { useAuth } from "@/context/AuthContext";
import { useDeleteTag, useGetTags } from "@/services/gql/tags/tags.service";
import type { TagFieldsFragment } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type SwipeableRef = { current: SwipeableMethods | null };

// ── Swipe actions ──────────────────────────────────────────────────────────────

function RightActions({
  progress,
  isSystem,
  onEdit,
  onDelete,
}: {
  progress: SharedValue<number>;
  isSystem: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const C = useColors();

  const systemStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [80, 0]) }],
  }));
  const editStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [128, 0]) }],
  }));
  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [64, 0]) }],
  }));

  if (isSystem) {
    return (
      <Reanimated.View
        style={[
          systemStyle,
          { width: 80, justifyContent: "center", alignItems: "center", gap: 4 },
        ]}
      >
        <DynamicIcon name="lock" size={15} color={C.onSurfaceVariant} />
        <Text
          style={{ fontSize: 10, color: C.onSurfaceVariant, fontWeight: "600" }}
        >
          System
        </Text>
      </Reanimated.View>
    );
  }

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

// ── SystemBadge ────────────────────────────────────────────────────────────────

function SystemBadge() {
  const C = useColors();
  return (
    <View
      style={{
        position: "absolute",
        top: -3,
        right: -3,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: C.surfaceHighest,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DynamicIcon name="lock" size={8} color={C.onSurfaceVariant} />
    </View>
  );
}

// ── TagRow ─────────────────────────────────────────────────────────────────────

function TagRow({
  tag,
  isSystem,
  deleting,
  openRef,
  onEdit,
  onDelete,
}: {
  tag: TagFieldsFragment;
  isSystem: boolean;
  deleting: boolean;
  openRef: SwipeableRef;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const C = useColors();
  const swipeRef = useRef<SwipeableMethods>(null);
  const iconColor = tag.color ?? C.primaryBright;
  const bgColor = tag.bgColor ?? `${iconColor}22`;

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
          isSystem={isSystem}
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
        <View style={{ position: "relative" }}>
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <DynamicIcon name={tag.icon ?? "tag"} size={18} color={iconColor} />
          </View>
          {isSystem && <SystemBadge />}
        </View>

        <View className="flex-1 min-w-0">
          <Text
            className="text-[14px] font-bold text-on-surface"
            numberOfLines={1}
          >
            {tag.name}
          </Text>
          {tag.description ? (
            <Text
              className="text-[12px] text-on-surface-variant"
              numberOfLines={1}
            >
              {tag.description}
            </Text>
          ) : null}
        </View>

        <View style={{ transform: [{ scaleX: -1 }] }}>
          <DynamicIcon name="chevron-left" size={14} color={C.outlineVariant} />
        </View>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function TagRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Skeleton width={40} height={40} radius={12} />
      <View className="flex-1 gap-2">
        <Skeleton width="45%" height={13} />
        <Skeleton width="65%" height={11} />
      </View>
    </View>
  );
}

function TagListSkeleton() {
  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      {[1, 2, 3, 4].map((i, idx) => (
        <React.Fragment key={i}>
          {idx > 0 && <View className="mx-4" style={{ height: 1 }} />}
          <TagRowSkeleton />
        </React.Fragment>
      ))}
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function TagsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const { tags, loading, refetch } = useGetTags({ limit: 300, sort: "name" });
  const { deleteTag } = useDeleteTag();

  const isSystem = useCallback(
    (tag: TagFieldsFragment) => tag.user?.id !== user?.id,
    [user?.id],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleDelete = (tag: TagFieldsFragment) => {
    showAlert({
      title: "Delete Tag",
      message: `Are you sure you want to delete "${tag.name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingId(tag.id);
            try {
              await deleteTag(tag.id);
            } catch (err: any) {
              setDeletingId(null);
              const message =
                err?.graphQLErrors?.[0]?.message ||
                err?.errors?.[0]?.message ||
                err?.message ||
                "Failed to delete tag.";
              showAlert({ title: "Cannot Delete", message });
            }
          },
        },
      ],
    });
  };

  const sortedTags = (tags ?? [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

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
            Tags
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/settings/add-tag")}
            activeOpacity={0.75}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: `${C.primary}22` }}
          >
            <DynamicIcon name="plus" size={18} color={C.primary} />
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
        {loading && !tags ? (
          <TagListSkeleton />
        ) : sortedTags.length === 0 ? (
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="tag" size={30} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">
              No tags yet
            </Text>
            <Text className="text-[13px] text-on-surface-variant opacity-60 text-center">
              Tap + to create your first tag
            </Text>
          </View>
        ) : (
          <View className="rounded-2xl overflow-hidden bg-surface-mid">
            {sortedTags.map((tag, idx) => (
              <React.Fragment key={tag.id}>
                {idx > 0 && (
                  <View
                    className="mx-4"
                    style={{
                      height: 1,
                      backgroundColor: C.outlineVariant + "33",
                    }}
                  />
                )}
                <TagRow
                  tag={tag}
                  isSystem={isSystem(tag)}
                  deleting={deletingId === tag.id}
                  openRef={openSwipeable}
                  onEdit={() => router.push(`/settings/edit-tag/${tag.id}`)}
                  onDelete={() => handleDelete(tag)}
                />
              </React.Fragment>
            ))}
          </View>
        )}

        {/* Add tag button */}
        {sortedTags.length > 0 && (
          <TouchableOpacity
            onPress={() => router.push("/settings/add-tag")}
            activeOpacity={0.7}
            className="flex-row items-center justify-center gap-2 py-3 rounded-2xl"
            style={{ backgroundColor: `${C.primary}12` }}
          >
            <DynamicIcon name="plus" size={14} color={C.primary} />
            <Text
              className="text-[13px] font-semibold"
              style={{ color: C.primary }}
            >
              Add tag
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
