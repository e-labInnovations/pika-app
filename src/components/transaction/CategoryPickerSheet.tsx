import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
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

export function CategoryPickerSheet({ visible, onClose, selectedId, onSelect, txType = "expense" }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
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

  // Filter: if search, show flat matches regardless of hierarchy
  const flatFiltered = q
    ? (categories ?? []).filter((c) => c.name.toLowerCase().includes(q))
    : null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" }}>
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "82%",
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.outlineVariant }} />
          </View>

          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12 }}>
            <Text style={{ flex: 1, fontSize: 17, fontWeight: "800", color: C.onSurface }}>Category</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}
              style={{ padding: 6, borderRadius: 20, backgroundColor: C.surfaceHigh }}>
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View
            style={{
              flexDirection: "row", alignItems: "center", gap: 8,
              marginHorizontal: 20, marginBottom: 12,
              backgroundColor: C.surfaceHigh, borderRadius: 12,
              paddingHorizontal: 12, height: 42,
            }}
          >
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: C.onSurface }}
              placeholderTextColor={C.outlineVariant}
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

          {loading ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <ActivityIndicator color={C.primary} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View style={{ paddingHorizontal: 16, paddingBottom: 8, gap: 2 }}>
                {flatFiltered ? (
                  // Flat search results
                  flatFiltered.map((cat) => (
                    <CategoryRow
                      key={cat.id}
                      category={cat}
                      isSelected={selectedId === cat.id}
                      onPress={() => { onSelect(cat); onClose(); }}
                      indented={false}
                    />
                  ))
                ) : (
                  // Grouped (roots + children)
                  grouped.roots.map((root) => {
                    const children = grouped.childrenMap.get(root.id) ?? [];
                    return (
                      <View key={root.id}>
                        <CategoryRow
                          category={root}
                          isSelected={selectedId === root.id}
                          onPress={() => { onSelect(root); onClose(); }}
                          indented={false}
                        />
                        {children.map((child) => (
                          <CategoryRow
                            key={child.id}
                            category={child}
                            isSelected={selectedId === child.id}
                            onPress={() => { onSelect(child); onClose(); }}
                            indented
                          />
                        ))}
                      </View>
                    );
                  })
                )}
                {(flatFiltered ?? grouped.roots).length === 0 && (
                  <View style={{ padding: 32, alignItems: "center" }}>
                    <Text style={{ color: C.onSurfaceVariant, fontSize: 14 }}>No categories found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

function CategoryRow({
  category,
  isSelected,
  onPress,
  indented,
}: {
  category: CategoryFieldsFragment;
  isSelected: boolean;
  onPress: () => void;
  indented: boolean;
}) {
  const C = useColors();
  const bg = category.bgColor ?? `${category.color ?? "#f59e0b"}22`;
  const fg = category.color ?? "#f59e0b";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        flexDirection: "row", alignItems: "center", gap: 12,
        paddingVertical: 10, paddingHorizontal: 12,
        paddingLeft: indented ? 36 : 12,
        borderRadius: 14,
        backgroundColor: isSelected ? `${C.primary}18` : "transparent",
      }}
    >
      <View style={{ width: 36, height: 36, borderRadius: 11, backgroundColor: bg, alignItems: "center", justifyContent: "center" }}>
        <DynamicIcon name={category.icon ?? "folder"} size={17} color={fg} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: C.onSurface }}>{category.name}</Text>
      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
    </TouchableOpacity>
  );
}
