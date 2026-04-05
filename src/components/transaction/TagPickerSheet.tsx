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
import { useGetTags } from "../../services/gql/tags/tags.service";
import { type TagFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedIds: string[];
  onApply: (tags: TagFieldsFragment[]) => void;
}

export function TagPickerSheet({ visible, onClose, selectedIds, onApply }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(selectedIds);

  // Sync local state when sheet opens
  React.useEffect(() => {
    if (visible) setLocalSelected(selectedIds);
  }, [visible, selectedIds]);

  const { tags, loading } = useGetTags({ limit: 500, sort: "name" });

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return tags ?? [];
    return (tags ?? []).filter((t) => t.name.toLowerCase().includes(q));
  }, [tags, search]);

  const toggle = (id: string) => {
    setLocalSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    const selected = (tags ?? []).filter((t) => localSelected.includes(t.id));
    onApply(selected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" }}>
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "75%",
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.outlineVariant }} />
          </View>

          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12 }}>
            <Text style={{ flex: 1, fontSize: 17, fontWeight: "800", color: C.onSurface }}>
              Tags{localSelected.length > 0 ? ` · ${localSelected.length}` : ""}
            </Text>
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
              placeholder="Search tags…"
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
              <View
                style={{
                  flexDirection: "row", flexWrap: "wrap",
                  paddingHorizontal: 16, paddingBottom: 8, gap: 8,
                }}
              >
                {filtered.map((tag) => {
                  const isSelected = localSelected.includes(tag.id);
                  const fg = tag.color ?? C.primary;
                  const selectedBg = tag.bgColor ?? `${fg}33`;
                  return (
                    <TouchableOpacity
                      key={tag.id}
                      onPress={() => toggle(tag.id)}
                      activeOpacity={0.75}
                      style={{
                        flexDirection: "row", alignItems: "center", gap: 6,
                        paddingHorizontal: 12, paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: isSelected ? selectedBg : "transparent",
                        borderWidth: 1.5,
                        borderColor: isSelected ? fg : `${C.outlineVariant}80`,
                      }}
                    >
                      <DynamicIcon name={tag.icon} size={13} color={isSelected ? fg : C.onSurfaceVariant} />
                      <Text style={{ fontSize: 13, fontWeight: "600", color: isSelected ? fg : C.onSurface }}>{tag.name}</Text>
                      {isSelected && <DynamicIcon name="check" size={11} color={fg} />}
                    </TouchableOpacity>
                  );
                })}
                {filtered.length === 0 && (
                  <View style={{ flex: 1, padding: 32, alignItems: "center" }}>
                    <Text style={{ color: C.onSurfaceVariant, fontSize: 14 }}>No tags found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}

          {/* Apply */}
          <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingTop: 12 }}>
            {localSelected.length > 0 && (
              <TouchableOpacity
                onPress={() => setLocalSelected([])}
                activeOpacity={0.8}
                style={{
                  paddingVertical: 14, paddingHorizontal: 20,
                  borderRadius: 14, backgroundColor: C.surfaceHigh,
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurfaceVariant }}>Clear</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.85}
              style={{
                flex: 1, paddingVertical: 14,
                borderRadius: 14, backgroundColor: C.primary,
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}>
                {localSelected.length > 0 ? `Apply ${localSelected.length} tag${localSelected.length !== 1 ? "s" : ""}` : "Apply"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
