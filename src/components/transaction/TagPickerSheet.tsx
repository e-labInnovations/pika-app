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
import { ChipListSkeleton } from "../ui/PickerSkeletons";
import { SystemBadge } from "../ui/SystemBadge";
import { useAuth } from "../../context/AuthContext";
import { isSystem } from "../../lib/ownership";
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
  const { user } = useAuth();
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
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl max-h-[75%]"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-9 h-1 rounded-sm bg-outline-variant" />
          </View>

          {/* Header */}
          <View className="flex-row items-center px-5 py-3">
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">
              Tags{localSelected.length > 0 ? ` · ${localSelected.length}` : ""}
            </Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1.5 rounded-full bg-surface-high">
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View className="flex-row items-center gap-2 mx-5 mb-3 bg-surface-high rounded-xl px-3 h-[42px]">
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              className="flex-1 text-sm text-on-surface"
              placeholderTextColorClassName="accent-outline-variant"
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

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className="flex-row flex-wrap px-4 pb-2 gap-2">
              {loading ? (
                <View className="w-full">
                  <ChipListSkeleton count={10} />
                </View>
              ) : (
                <>
                  {filtered.map((tag) => {
                    const isSelected = localSelected.includes(tag.id);
                    const fg = tag.color ?? C.primary;
                    const selectedBg = tag.bgColor ?? `${fg}33`;
                    const systemFlag = isSystem(tag, user?.id ?? null);
                    return (
                      <TouchableOpacity
                        key={tag.id}
                        onPress={() => toggle(tag.id)}
                        activeOpacity={0.75}
                        className="flex-row items-center gap-1.5 px-3 py-2 rounded-full"
                        style={{
                          backgroundColor: isSelected ? selectedBg : "transparent",
                          borderWidth: 1.5,
                          borderColor: isSelected ? fg : `${C.outlineVariant}80`,
                        }}
                      >
                        <DynamicIcon name={tag.icon} size={13} color={isSelected ? fg : C.onSurfaceVariant} />
                        <Text
                          className="text-[13px] font-semibold"
                          style={{ color: isSelected ? fg : C.onSurface }}
                        >
                          {tag.name}
                        </Text>
                        {systemFlag && <SystemBadge size="xs" />}
                        {isSelected && <DynamicIcon name="check" size={11} color={fg} />}
                      </TouchableOpacity>
                    );
                  })}
                  {filtered.length === 0 && (
                    <View className="flex-1 p-10 items-center gap-2">
                      <DynamicIcon name="hash" size={28} color={C.outlineVariant} />
                      <Text className="text-on-surface-variant text-sm">No tags found</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </ScrollView>

          {/* Apply */}
          <View className="flex-row gap-2.5 px-5 pt-3">
            {localSelected.length > 0 && (
              <TouchableOpacity
                onPress={() => setLocalSelected([])}
                activeOpacity={0.8}
                className="py-3.5 px-5 rounded-2xl bg-surface-high items-center justify-center"
              >
                <Text className="text-sm font-semibold text-on-surface-variant">Clear</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.85}
              className="flex-1 py-3.5 rounded-2xl bg-primary items-center justify-center"
            >
              <Text className="text-[15px] font-bold text-white">
                {localSelected.length > 0
                  ? `Apply ${localSelected.length} tag${localSelected.length !== 1 ? "s" : ""}`
                  : "Apply"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
