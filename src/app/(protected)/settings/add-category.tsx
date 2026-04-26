import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { IconPicker } from "@/components/ui/IconPicker";
import {
  useCreateCategory,
  useGetCategory,
} from "@/services/gql/categories/categories.service";
import { Category_type_MutationInput } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";

type TransactionType = "expense" | "income" | "transfer";

const TYPE_META: Record<
  TransactionType,
  { label: string; color: string; icon: string }
> = {
  expense: { label: "Expense", color: "#ef4444", icon: "arrow-up-right" },
  income: { label: "Income", color: "#10b981", icon: "arrow-down-left" },
  transfer: { label: "Transfer", color: "#3b82f6", icon: "arrow-right-left" },
};

const TYPE_TO_MUTATION: Record<TransactionType, Category_type_MutationInput> = {
  expense: Category_type_MutationInput.expense,
  income: Category_type_MutationInput.income,
  transfer: Category_type_MutationInput.transfer,
};

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function AddCategoryScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { type = "expense", parentId } = useLocalSearchParams<{
    type?: string;
    parentId?: string;
  }>();

  const txType = (type as TransactionType) || "expense";
  const isChild = !!parentId;
  const typeMeta = TYPE_META[txType];

  // Load parent category if adding child
  const { data: parent } = useGetCategory(parentId ?? "");

  const { createCategory, loading: saving } = useCreateCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(
    isChild ? (parent?.icon ?? "folder") : "folder",
  );
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [color, setColor] = useState("#ffffff");

  const canSave = name.trim().length > 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    await createCategory({
      data: {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        bgColor,
        color,
        type: TYPE_TO_MUTATION[txType],
        parent: parentId ?? undefined,
      },
    });
    router.back();
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
          <View className="flex-1">
            <Text className="text-[19px] font-black tracking-[-0.4px] text-on-surface">
              {isChild ? "Add Subcategory" : `Add ${typeMeta.label} Category`}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Type badge */}
        <View
          className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `${typeMeta.color}22` }}
        >
          <DynamicIcon name={typeMeta.icon} size={13} color={typeMeta.color} />
          <Text
            className="text-[12px] font-semibold"
            style={{ color: typeMeta.color }}
          >
            {typeMeta.label}
          </Text>
        </View>

        {/* Parent info */}
        {isChild && parent ? (
          <View className="flex-col gap-3 p-4 rounded-2xl bg-surface-mid">
            <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
              Parent category
            </Text>
            <View className="flex-row items-center gap-3">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: parent.bgColor ?? C.primaryBright }}
              >
                <DynamicIcon
                  name={parent.icon ?? "folder"}
                  size={16}
                  color={parent.color ?? C.primaryBright}
                />
              </View>
              <View className="flex-1">
                <Text className="text-[14px] font-bold text-on-surface">
                  {parent.name}
                </Text>
                {parent.description ? (
                  <Text
                    className="text-[12px] text-on-surface-variant"
                    numberOfLines={1}
                  >
                    {parent.description}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        {/* Name */}
        <View className="rounded-2xl bg-surface-mid overflow-hidden">
          <View className="px-4 pt-3 pb-1">
            <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
              Name *
            </Text>
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            className="px-4 pb-4 text-[16px] text-on-surface"
            placeholderTextColorClassName="accent-outline"
            placeholder="e.g. Groceries"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>

        {/* Description */}
        <View className="rounded-2xl bg-surface-mid overflow-hidden">
          <View className="px-4 pt-3 pb-1">
            <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
              Description
            </Text>
          </View>
          <TextInput
            value={description}
            onChangeText={setDescription}
            className="px-4 pb-4 text-[16px] text-on-surface"
            placeholderTextColorClassName="accent-outline"
            placeholder="Optional description"
            autoCorrect={false}
            returnKeyType="done"
          />
        </View>

        {/* Appearance */}
        <View className="rounded-2xl bg-surface-mid p-4 gap-5">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
            Appearance
          </Text>

          <View className="flex-row items-center gap-5">
            {/* Icon picker */}
            <IconPicker
              value={icon}
              onChange={setIcon}
              bgColor={bgColor || C.primaryBright}
              iconColor={color}
              size={64}
            />

            {/* Color pickers */}
            <View className="flex-1 gap-4">
              <View
                className="flex-row items-center justify-between py-3 px-4 rounded-xl"
                style={{ backgroundColor: `${bgColor}18` }}
              >
                <Text className="text-[13px] font-medium text-on-surface">
                  Background
                </Text>
                <ColorPicker value={bgColor} onChange={setBgColor} />
              </View>
              <View className="flex-row items-center justify-between py-3 px-4 rounded-xl bg-surface-high">
                <Text className="text-[13px] font-medium text-on-surface">
                  Icon Color
                </Text>
                <ColorPicker value={color} onChange={setColor} />
              </View>
            </View>
          </View>
        </View>

        {/* Preview */}
        <View className="rounded-2xl bg-surface-mid p-4 gap-3">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
            Preview
          </Text>
          <View className="flex-row items-center gap-3">
            <View
              className="w-12 h-12 rounded-2xl items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <DynamicIcon name={icon || "folder"} size={22} color={color} />
            </View>
            <View className="flex-1">
              <Text
                className="text-[15px] font-bold text-on-surface"
                numberOfLines={1}
              >
                {name || "Category name"}
              </Text>
              {description ? (
                <Text
                  className="text-[12px] text-on-surface-variant"
                  numberOfLines={1}
                >
                  {description}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save button */}
      <View
        className="px-4 bg-surface"
        style={{
          paddingBottom: Math.max(insets.bottom, 16) + 4,
          paddingTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={!canSave}
          className="flex-row items-center justify-center gap-2 py-4 rounded-2xl"
          style={{
            backgroundColor: canSave ? typeMeta.color : `${C.outlineVariant}55`,
          }}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <DynamicIcon name="check" size={18} color="#fff" />
              <Text className="text-[15px] font-bold text-white">
                Save Category
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
