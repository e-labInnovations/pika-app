import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { PickerListSkeleton } from "../ui/PickerSkeletons";
import { SystemBadge } from "../ui/SystemBadge";
import { useAuth } from "../../context/AuthContext";
import { isSystem } from "../../lib/ownership";
import { useGetCategories } from "../../services/gql/categories/categories.service";
import {
  type CategoryFieldsFragment,
  Category_type_Input,
} from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

export type TxType = "expense" | "income" | "transfer";

const TYPE_TO_GQL: Record<TxType, Category_type_Input> = {
  expense: Category_type_Input.expense,
  income: Category_type_Input.income,
  transfer: Category_type_Input.transfer,
};

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelect: (category: CategoryFieldsFragment) => void;
  txType?: TxType;
}

export function CategoryPickerSheet({
  visible,
  onClose,
  selectedId,
  onSelect,
  txType = "expense",
}: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const { categories, loading } = useGetCategories({
    limit: 500,
    sort: "name",
    where: { type: { equals: TYPE_TO_GQL[txType] } },
  });

  // Group into parent rows with children
  const grouped = useMemo(() => {
    const roots: CategoryFieldsFragment[] = [];
    const childrenMap = new Map<string, CategoryFieldsFragment[]>();

    for (const cat of categories ?? []) {
      if (!cat.parent) {
        roots.push(cat);
      } else {
        const existing = childrenMap.get(cat.parent.id);
        if (existing) existing.push(cat);
        else childrenMap.set(cat.parent.id, [cat]);
      }
    }
    return { roots, childrenMap };
  }, [categories]);

  const q = search.toLowerCase().trim();

  // Hierarchical search results
  const searchGroups = useMemo(() => {
    if (!q) return null;
    const result: {
      root: CategoryFieldsFragment;
      children: CategoryFieldsFragment[];
    }[] = [];
    for (const root of grouped.roots) {
      const children = grouped.childrenMap.get(root.id) ?? [];
      const rootMatches =
        root.name.toLowerCase().includes(q) ||
        (root.description ?? "").toLowerCase().includes(q);
      const matchingChildren = children.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description ?? "").toLowerCase().includes(q),
      );
      if (rootMatches) {
        result.push({ root, children });
      } else if (matchingChildren.length > 0) {
        result.push({ root, children: matchingChildren });
      }
    }
    return result;
  }, [q, grouped]);

  const groupsToRender = searchGroups ?? null;
  const isEmpty =
    !loading &&
    (groupsToRender
      ? groupsToRender.length === 0
      : grouped.roots.length === 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl max-h-[85%]"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-9 h-1 rounded-sm bg-outline-variant" />
          </View>

          {/* Header */}
          <View className="flex-row items-center px-5 py-3">
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">
              Category
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="p-1.5 rounded-full bg-surface-high"
            >
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View className="flex-row items-center gap-2 mx-5 mb-3 bg-surface-high rounded-xl px-3 h-[42px]">
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              className="flex-1 text-sm text-on-surface"
              placeholderTextColorClassName="accent-outline-variant"
              placeholder="Search categories…"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                <DynamicIcon name="x" size={14} color={C.outlineVariant} />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="px-4 pb-2">
              {loading ? (
                <PickerListSkeleton count={8} />
              ) : isEmpty ? (
                <View className="p-10 items-center gap-2">
                  <DynamicIcon
                    name="folder-search"
                    size={32}
                    color={C.outlineVariant}
                  />
                  <Text className="text-on-surface-variant text-sm">
                    No categories found
                  </Text>
                </View>
              ) : (
                (groupsToRender ?? grouped.roots.map((root) => ({
                  root,
                  children: grouped.childrenMap.get(root.id) ?? [],
                }))).map(({ root, children }) => (
                  <CategoryGroup
                    key={root.id}
                    root={root}
                    children={children}
                    selectedId={selectedId}
                    currentUserId={user?.id ?? null}
                    onSelectChild={(child) => {
                      onSelect(child);
                      onClose();
                    }}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ── Group (parent + children) ────────────────────────────────────────────────

function CategoryGroup({
  root,
  children,
  selectedId,
  currentUserId,
  onSelectChild,
}: {
  root: CategoryFieldsFragment;
  children: CategoryFieldsFragment[];
  selectedId: string | null;
  currentUserId: string | null;
  onSelectChild: (child: CategoryFieldsFragment) => void;
}) {
  const C = useColors();
  const bg = root.bgColor ?? `${root.color ?? "#f59e0b"}22`;
  const fg = root.color ?? "#f59e0b";
  const hasSelectedChild = children.some((c) => c.id === selectedId);
  const systemFlag = isSystem(root, currentUserId);

  return (
    <View className="mt-2 first:mt-0">
      {/* Parent header — decorative, not selectable */}
      <View className="flex-row items-center gap-3 px-2 py-2">
        <View
          className="w-9 h-9 rounded-[11px] items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <DynamicIcon name={root.icon ?? "folder"} size={17} color={fg} />
        </View>
        <View className="flex-1 min-w-0">
          <View className="flex-row items-center gap-1.5">
            <Text
              className="text-[13px] font-extrabold text-on-surface"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {root.name}
            </Text>
            {systemFlag && <SystemBadge size="xs" />}
          </View>
          {root.description ? (
            <Text
              className="text-[11px] text-on-surface-variant"
              numberOfLines={1}
            >
              {root.description}
            </Text>
          ) : (
            <Text className="text-[11px] text-on-surface-variant">
              {children.length}{" "}
              {children.length === 1 ? "subcategory" : "subcategories"}
            </Text>
          )}
        </View>
      </View>

      {/* Children with a left tree line */}
      {children.length > 0 ? (
        <View
          className="ml-4 pl-3"
          style={{ borderLeftWidth: 1.5, borderLeftColor: `${fg}66` }}
        >
          {children.map((child) => (
            <CategoryRow
              key={child.id}
              category={child}
              isSelected={selectedId === child.id}
              currentUserId={currentUserId}
              onPress={() => onSelectChild(child)}
            />
          ))}
        </View>
      ) : (
        <View
          className="ml-4 pl-3 py-2"
          style={{ borderLeftWidth: 1.5, borderLeftColor: `${C.outlineVariant}55` }}
        >
          <Text className="text-[11px] text-on-surface-variant italic">
            No subcategories
          </Text>
        </View>
      )}

      {hasSelectedChild && (
        <View className="h-2" />
      )}
    </View>
  );
}

// ── Child Row ────────────────────────────────────────────────────────────────

function CategoryRow({
  category,
  isSelected,
  currentUserId,
  onPress,
}: {
  category: CategoryFieldsFragment;
  isSelected: boolean;
  currentUserId: string | null;
  onPress: () => void;
}) {
  const C = useColors();
  const bg = category.bgColor ?? `${category.color ?? "#f59e0b"}22`;
  const fg = category.color ?? "#f59e0b";
  const systemFlag = isSystem(category, currentUserId);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className={[
        "flex-row items-center gap-3 py-2 px-3 rounded-2xl my-0.5",
        isSelected ? "bg-primary/10" : "bg-transparent",
      ].join(" ")}
    >
      <View
        className="w-8 h-8 rounded-[10px] items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        <DynamicIcon name={category.icon ?? "folder"} size={15} color={fg} />
      </View>
      <View className="flex-1 min-w-0">
        <View className="flex-row items-center gap-1.5">
          <Text
            className="text-[13px] font-semibold text-on-surface"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {category.name}
          </Text>
          {systemFlag && <SystemBadge size="xs" />}
        </View>
        {category.description ? (
          <Text
            className="text-[11px] text-on-surface-variant"
            numberOfLines={1}
          >
            {category.description}
          </Text>
        ) : null}
      </View>
      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
    </TouchableOpacity>
  );
}
