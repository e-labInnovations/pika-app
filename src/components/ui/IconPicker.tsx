import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { lucideIcons } from "../../lib/lucide-data";
import { useColors } from "../../theme/colors";

const ALL_ICONS = Object.keys(lucideIcons).sort();
const NUM_COLS = 6;

type Props = {
  value: string;
  onChange: (icon: string) => void;
  /** Background color for the trigger circle */
  bgColor?: string;
  /** Icon color for the trigger and selected indicator */
  iconColor?: string;
  size?: number;
};

export function IconPicker({ value, onChange, bgColor, iconColor, size = 56 }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter((name) => name.includes(q));
  }, [search]);

  const handleSelect = useCallback(
    (icon: string) => {
      onChange(icon);
      setOpen(false);
    },
    [onChange],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = item === value;
      return (
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          activeOpacity={0.65}
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSelected ? `${C.primary}22` : undefined,
          }}
        >
          <DynamicIcon
            name={item}
            size={21}
            color={isSelected ? C.primary : C.onSurfaceVariant}
          />
        </TouchableOpacity>
      );
    },
    [value, handleSelect, C],
  );

  const triggerBg = bgColor ?? `${C.primaryBright}22`;
  const triggerColor = iconColor ?? C.primaryBright;

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => {
          setSearch("");
          setOpen(true);
        }}
        activeOpacity={0.75}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.35,
          backgroundColor: triggerBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DynamicIcon
          name={value || "folder"}
          size={size * 0.46}
          color={triggerColor}
        />
      </TouchableOpacity>

      {/* Full-height bottom sheet */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable className="absolute inset-0" onPress={() => setOpen(false)} />

          <View
            className="bg-surface-low rounded-t-3xl"
            style={{ height: "82%" }}
          >
            {/* Header */}
            <View className="px-5 pt-4 pb-3">
              <View className="w-10 h-1 rounded-full bg-outline-variant self-center mb-4" />

              <Text className="text-[17px] font-bold text-on-surface mb-3">
                Pick Icon
              </Text>

              {/* Search */}
              <View
                className="flex-row items-center gap-2.5 px-3 rounded-xl bg-surface-mid"
                style={{ height: 42 }}
              >
                <DynamicIcon name="search" size={15} color={C.outlineVariant} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  className="flex-1 text-[14px] text-on-surface"
                  placeholderTextColorClassName="accent-outline"
                  placeholder="Search icons…"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                    <DynamicIcon name="x" size={14} color={C.outline} />
                  </TouchableOpacity>
                )}
              </View>

              {search.trim().length > 0 && (
                <Text className="text-[11px] text-on-surface-variant mt-1.5">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </Text>
              )}
            </View>

            {/* Grid */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item}
              numColumns={NUM_COLS}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: Math.max(insets.bottom, 20),
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={72}
              maxToRenderPerBatch={72}
              windowSize={7}
              removeClippedSubviews
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
