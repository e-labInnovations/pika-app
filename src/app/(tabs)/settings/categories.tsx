// cspell:ignore Swipeable
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  cancelAnimation,
  interpolate,
  interpolateColor,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../components/Icon";
import { Skeleton } from "../../../components/ui/Skeleton";
import { TxTypeSelector } from "../../../components/transaction/TxTypeSelector";
import { useAuth } from "../../../context/AuthContext";
import { useGetCategories, useDeleteCategory } from "../../../services/gql/categories/categories.service";
import type { CategoryFieldsFragment } from "../../../services/gql/types/graphql";
import { useColors } from "../../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

type TransactionType = "expense" | "income" | "transfer";
type SwipeableRef = { current: SwipeableMethods | null };

const TYPE_COLORS: Record<TransactionType, string> = {
  expense: "#ef4444",
  income: "#10b981",
  transfer: "#3b82f6",
};

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
        <Text style={{ fontSize: 10, color: C.onSurfaceVariant, fontWeight: "600" }}>
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
          <Text style={{ fontSize: 11, color: C.primary, fontWeight: "700" }}>Edit</Text>
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
          <Text style={{ fontSize: 11, color: C.tertiary, fontWeight: "700" }}>Delete</Text>
        </TouchableOpacity>
      </Reanimated.View>
    </View>
  );
}

// ── System badge ───────────────────────────────────────────────────────────────

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

// ── ChildRow ──────────────────────────────────────────────────────────────────

function ChildRow({
  child,
  isSystem,
  deleting,
  openRef,
  onEdit,
  onDelete,
}: {
  child: CategoryFieldsFragment;
  isSystem: boolean;
  deleting: boolean;
  openRef: SwipeableRef;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const C = useColors();
  const swipeRef = useRef<SwipeableMethods>(null);
  const iconColor = child.color ?? C.primaryBright;
  const bgColor = child.bgColor ? `${child.bgColor}22` : `${iconColor}18`;

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
    backgroundColor: interpolateColor(pulse.value, [0, 1], [C.surfaceMid, "#ef444428"]),
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
          onEdit={() => { swipeRef.current?.close(); onEdit(); }}
          onDelete={() => { swipeRef.current?.close(); onDelete(); }}
        />
      )}
    >
      <Reanimated.View
        style={rowStyle}
        className="flex-row items-center gap-3 pl-3 py-2.5"
      >
        <View className="w-px self-stretch" style={{ backgroundColor: C.outlineVariant }} />

        <View style={{ position: "relative" }}>
          <View
            className="w-7 h-7 rounded-lg items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <DynamicIcon name={child.icon ?? "folder"} size={13} color={iconColor} />
          </View>
          {isSystem && <SystemBadge />}
        </View>

        <View className="flex-1 min-w-0">
          <Text className="text-[13px] font-semibold text-on-surface" numberOfLines={1}>
            {child.name}
          </Text>
          {child.description ? (
            <Text className="text-[11px] text-on-surface-variant" numberOfLines={1}>
              {child.description}
            </Text>
          ) : null}
        </View>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}

// ── CategoryCard ───────────────────────────────────────────────────────────────

function CategoryCard({
  parent,
  children,
  isSystemParent,
  isSystemChild,
  deletingId,
  openRef,
  onEditParent,
  onDeleteParent,
  onEditChild,
  onDeleteChild,
  onAddChild,
}: {
  parent: CategoryFieldsFragment;
  children: CategoryFieldsFragment[];
  isSystemParent: boolean;
  isSystemChild: (child: CategoryFieldsFragment) => boolean;
  deletingId: string | null;
  openRef: SwipeableRef;
  onEditParent: () => void;
  onDeleteParent: () => void;
  onEditChild: (child: CategoryFieldsFragment) => void;
  onDeleteChild: (child: CategoryFieldsFragment) => void;
  onAddChild: () => void;
}) {
  const C = useColors();
  const swipeRef = useRef<SwipeableMethods>(null);
  const iconColor = parent.color ?? C.primaryBright;
  const bgColor = parent.bgColor ? `${parent.bgColor}33` : `${iconColor}22`;

  const parentPulse = useSharedValue(0);

  useEffect(() => {
    if (deletingId === parent.id) {
      parentPulse.value = withRepeat(withTiming(1, { duration: 600 }), -1, true);
    } else {
      cancelAnimation(parentPulse);
      parentPulse.value = withTiming(0, { duration: 200 });
    }
  }, [deletingId, parent.id]);

  const parentRowStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(parentPulse.value, [0, 1], [C.surfaceMid, "#ef444428"]),
  }));

  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      {/* Parent row */}
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
            isSystem={isSystemParent}
            onEdit={() => { swipeRef.current?.close(); onEditParent(); }}
            onDelete={() => { swipeRef.current?.close(); onDeleteParent(); }}
          />
        )}
      >
        <Reanimated.View
          style={parentRowStyle}
          className="flex-row items-center gap-3 p-4"
        >
          <View style={{ position: "relative" }}>
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <DynamicIcon name={parent.icon ?? "folder"} size={18} color={iconColor} />
            </View>
            {isSystemParent && <SystemBadge />}
          </View>

          <View className="flex-1 min-w-0">
            <Text className="text-[14px] font-bold text-on-surface" numberOfLines={1}>
              {parent.name}
            </Text>
            {parent.description ? (
              <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                {parent.description}
              </Text>
            ) : null}
          </View>

        </Reanimated.View>
      </ReanimatedSwipeable>

      {/* Divider */}
      {children.length > 0 && (
        <View className="mx-4" style={{ height: 1, backgroundColor: C.outlineVariant + "44" }} />
      )}

      {/* Children */}
      {children.length > 0 && (
        <View className="px-4 py-1">
          {children.map((child) => (
            <ChildRow
              key={child.id}
              child={child}
              isSystem={isSystemChild(child)}
              deleting={deletingId === child.id}
              openRef={openRef}
              onEdit={() => onEditChild(child)}
              onDelete={() => onDeleteChild(child)}
            />
          ))}
        </View>
      )}

      {/* Add subcategory */}
      <TouchableOpacity
        onPress={onAddChild}
        activeOpacity={0.7}
        className="flex-row items-center justify-center gap-2 mx-4 mb-3 mt-1 py-2.5 rounded-xl"
        style={{ backgroundColor: `${iconColor}12` }}
      >
        <DynamicIcon name="plus" size={13} color={iconColor} />
        <Text className="text-[12px] font-semibold" style={{ color: iconColor }}>
          Add subcategory
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonChildRow() {
  const C = useColors();
  return (
    <View className="flex-row items-center gap-3 pl-3 py-2.5">
      <View className="w-px self-stretch" style={{ backgroundColor: C.outlineVariant }} />
      <Skeleton width={28} height={28} radius={8} />
      <View className="flex-1 gap-1.5">
        <Skeleton width="55%" height={12} />
        <Skeleton width="35%" height={10} />
      </View>
    </View>
  );
}

function CategoryCardSkeleton({ childCount = 2 }: { childCount?: number }) {
  const C = useColors();
  return (
    <View className="rounded-2xl overflow-hidden bg-surface-mid">
      <View className="flex-row items-center gap-3 p-4">
        <Skeleton width={40} height={40} radius={12} />
        <View className="flex-1 gap-2">
          <Skeleton width="50%" height={14} />
          <Skeleton width="75%" height={11} />
        </View>
      </View>
      <View className="mx-4" style={{ height: 1, backgroundColor: C.outlineVariant + "44" }} />
      <View className="px-4 py-1">
        {Array.from({ length: childCount }).map((_, i) => (
          <SkeletonChildRow key={i} />
        ))}
      </View>
      <Skeleton style={{ marginHorizontal: 16, marginBottom: 12, marginTop: 4 }} height={36} radius={12} />
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function CategoriesScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user } = useAuth();
  const [activeType, setActiveType] = useState<TransactionType>("expense");
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const { categories, loading, refetch } = useGetCategories({ limit: 300, sort: "name" });
  const { deleteCategory } = useDeleteCategory();

  const isSystem = useCallback(
    (cat: CategoryFieldsFragment) => cat.user?.id !== user?.id,
    [user?.id],
  );

  const { parents, childrenMap } = useMemo(() => {
    const all = categories ?? [];
    const parents = all
      .filter((c) => !c.parent && c.type === activeType)
      .sort((a, b) => a.name.localeCompare(b.name));

    const childrenMap: Record<string, CategoryFieldsFragment[]> = {};
    for (const c of all) {
      if (c.parent?.id && c.type === activeType) {
        if (!childrenMap[c.parent.id]) childrenMap[c.parent.id] = [];
        childrenMap[c.parent.id].push(c);
      }
    }
    return { parents, childrenMap };
  }, [categories, activeType]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const confirmDelete = (name: string, onConfirm: () => void) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onConfirm },
      ],
    );
  };

  const handleDeleteCategory = (category: CategoryFieldsFragment) => {
    confirmDelete(category.name, async () => {
      setDeletingId(category.id);
      try {
        await deleteCategory(category.id);
      } catch (err: any) {
        setDeletingId(null);
        const message =
          err?.graphQLErrors?.[0]?.message ||
          err?.errors?.[0]?.message ||
          err?.message ||
          "Failed to delete category.";
        Alert.alert("Cannot Delete", message);
      }
    });
  };

  const activeColor = TYPE_COLORS[activeType];

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Categories
          </Text>
          <TouchableOpacity
            onPress={() => router.push(`/settings/add-category?type=${activeType}`)}
            activeOpacity={0.75}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: `${activeColor}22` }}
          >
            <DynamicIcon name="plus" size={18} color={activeColor} />
          </TouchableOpacity>
        </View>

        {/* Type tabs */}
        <TxTypeSelector value={activeType} onChange={setActiveType} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && !categories ? (
          [3, 2, 3, 2].map((childCount, i) => (
            <CategoryCardSkeleton key={i} childCount={childCount} />
          ))
        ) : parents.length === 0 ? (
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="folder-open" size={30} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">
              No {activeType} categories yet
            </Text>
            <Text className="text-[13px] text-on-surface-variant opacity-60 text-center">
              Tap + to add your first category
            </Text>
          </View>
        ) : (
          parents.map((parent) => (
            <CategoryCard
              key={parent.id}
              parent={parent}
              children={(childrenMap[parent.id] ?? []).sort((a, b) =>
                a.name.localeCompare(b.name),
              )}
              isSystemParent={isSystem(parent)}
              isSystemChild={isSystem}
              deletingId={deletingId}
              openRef={openSwipeable}
              onEditParent={() => router.push(`/settings/edit-category/${parent.id}`)}
              onDeleteParent={() => handleDeleteCategory(parent)}
              onEditChild={(child) => router.push(`/settings/edit-category/${child.id}`)}
              onDeleteChild={(child) => handleDeleteCategory(child)}
              onAddChild={() =>
                router.push(
                  `/settings/add-category?type=${activeType}&parentId=${parent.id}`,
                )
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
