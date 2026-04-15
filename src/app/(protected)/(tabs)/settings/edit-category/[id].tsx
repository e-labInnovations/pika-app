import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { showAlert } from "@/components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { IconPicker } from "@/components/ui/IconPicker";
import {
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "@/services/gql/categories/categories.service";
import { CategoryUpdate_type_MutationInput } from "@/services/gql/types/graphql";
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

const TYPE_TO_MUTATION: Record<TransactionType, CategoryUpdate_type_MutationInput> = {
  expense: CategoryUpdate_type_MutationInput.expense,
  income: CategoryUpdate_type_MutationInput.income,
  transfer: CategoryUpdate_type_MutationInput.transfer,
};

// ── Skeleton loader ────────────────────────────────────────────────────────────

function FormSkeleton() {
  return (
    <View style={{ gap: 12, paddingHorizontal: 16, paddingTop: 8 }}>
      <Skeleton height={48} radius={16} />
      <Skeleton height={48} radius={16} />
      <Skeleton height={48} radius={16} />
      <View className="rounded-2xl bg-surface-mid p-4 gap-5">
        <Skeleton width="40%" height={12} />
        <View className="flex-row gap-5">
          <Skeleton width={64} height={64} radius={22} />
          <View className="flex-1 gap-4">
            <Skeleton height={44} radius={12} />
            <Skeleton height={44} radius={12} />
          </View>
        </View>
        <Skeleton height={52} radius={12} />
      </View>
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function EditCategoryScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: category, loading } = useGetCategory(id);
  const { updateCategory, loading: saving } = useUpdateCategory();
  const { deleteCategory, loading: deleting } = useDeleteCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("folder");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [color, setColor] = useState("#ffffff");

  // Populate form once category loads
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description ?? "");
      setIcon(category.icon ?? "folder");
      setBgColor(category.bgColor ?? "#3b82f6");
      setColor(category.color ?? "#ffffff");
    }
  }, [category]);

  const txType = (category?.type as TransactionType) ?? "expense";
  const typeMeta = TYPE_META[txType];
  const isChild = !!category?.parent;
  const canSave = name.trim().length > 0 && !saving && !deleting;

  const handleSave = async () => {
    if (!canSave || !category) return;
    await updateCategory({
      id: category.id,
      data: {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        bgColor,
        color,
        type: TYPE_TO_MUTATION[txType],
        parent: category.parent?.id ?? undefined,
      },
    });
    router.back();
  };

  const handleDelete = () => {
    showAlert({
      title: "Delete Category",
      message: `Are you sure you want to delete "${name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteCategory(id);
            router.back();
          },
        },
      ],
    });
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
          <Text className="flex-1 text-[19px] font-black tracking-[-0.4px] text-on-surface">
            Edit {isChild ? "Subcategory" : "Category"}
          </Text>
          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: `${C.tertiary}18` }}
          >
            {deleting ? (
              <ActivityIndicator size="small" color={C.tertiary} />
            ) : (
              <DynamicIcon name="trash-2" size={17} color={C.tertiary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {loading && !category ? (
        <FormSkeleton />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Type badge / Parent info */}
          {isChild && category?.parent ? (
            <View className="flex-row items-center gap-3 p-4 rounded-2xl bg-surface-mid">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: category.parent.color
                    ? `${category.parent.color}22`
                    : `${C.primaryBright}18`,
                }}
              >
                <DynamicIcon
                  name={category.parent.icon ?? "folder"}
                  size={16}
                  color={category.parent.color ?? C.primaryBright}
                />
              </View>
              <View>
                <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
                  Parent category
                </Text>
                <Text className="text-[14px] font-bold text-on-surface">
                  {category.parent.name}
                </Text>
              </View>
            </View>
          ) : (
            <View
              className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${typeMeta.color}22` }}
            >
              <DynamicIcon
                name={typeMeta.icon}
                size={13}
                color={typeMeta.color}
              />
              <Text
                className="text-[12px] font-semibold"
                style={{ color: typeMeta.color }}
              >
                {typeMeta.label}
              </Text>
            </View>
          )}

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
              placeholder="Category name"
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
              <IconPicker
                value={icon}
                onChange={setIcon}
                bgColor={bgColor ? `${bgColor}33` : undefined}
                iconColor={color}
                size={64}
              />
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

            {/* Preview */}
            <View
              className="flex-row items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: C.surfaceHighest }}
            >
              <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
                Preview
              </Text>
              <View className="flex-row items-center gap-3 flex-1">
                <View
                  className="w-9 h-9 rounded-xl items-center justify-center"
                  style={{ backgroundColor: `${bgColor}33` }}
                >
                  <DynamicIcon
                    name={icon || "folder"}
                    size={17}
                    color={color}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[14px] font-semibold text-on-surface"
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
          </View>
        </ScrollView>
      )}

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
          disabled={!canSave || loading}
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
                Save Changes
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
