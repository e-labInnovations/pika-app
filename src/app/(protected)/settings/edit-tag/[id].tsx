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
  useDeleteTag,
  useGetTag,
  useUpdateTag,
} from "@/services/gql/tags/tags.service";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/theme/colors";

// ── Skeleton loader ────────────────────────────────────────────────────────────

function FormSkeleton() {
  return (
    <View style={{ gap: 12, paddingHorizontal: 16, paddingTop: 8 }}>
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

export default function EditTagScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const { data: tag, loading } = useGetTag(id);
  const { updateTag, loading: saving } = useUpdateTag();
  const { deleteTag, loading: deleting } = useDeleteTag();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("tag");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setDescription(tag.description ?? "");
      setIcon(tag.icon ?? "tag");
      setBgColor(tag.bgColor ?? "#3b82f6");
      setColor(tag.color ?? "#ffffff");
    }
  }, [tag]);

  const isSystem = tag ? tag.user?.id !== user?.id : false;
  const canSave = name.trim().length > 0 && !saving && !deleting && !isSystem;

  const handleSave = async () => {
    if (!canSave || !tag) return;
    await updateTag({
      id: tag.id,
      data: {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        bgColor,
        color,
      },
    });
    router.back();
  };

  const handleDelete = () => {
    showAlert({
      title: "Delete Tag",
      message: `Are you sure you want to delete "${name}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTag(id);
              router.back();
            } catch (err: any) {
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
            Edit Tag
          </Text>
          {!isSystem && (
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
          )}
        </View>
      </View>

      {loading && !tag ? (
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
          {/* System badge */}
          {isSystem ? (
            <View
              className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${C.onSurfaceVariant}18` }}
            >
              <DynamicIcon name="lock" size={12} color={C.onSurfaceVariant} />
              <Text className="text-[12px] font-semibold text-on-surface-variant">
                System tag — read only
              </Text>
            </View>
          ) : (
            <View
              className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${C.primary}22` }}
            >
              <DynamicIcon name="tag" size={13} color={C.primary} />
              <Text
                className="text-[12px] font-semibold"
                style={{ color: C.primary }}
              >
                Tag
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
              editable={!isSystem}
              className="px-4 pb-4 text-[16px] text-on-surface"
              placeholderTextColorClassName="accent-outline"
              placeholder="Tag name"
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
              editable={!isSystem}
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
                onChange={isSystem ? () => {} : setIcon}
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
                  <ColorPicker
                    value={bgColor}
                    onChange={isSystem ? () => {} : setBgColor}
                  />
                </View>
                <View className="flex-row items-center justify-between py-3 px-4 rounded-xl bg-surface-high">
                  <Text className="text-[13px] font-medium text-on-surface">
                    Icon Color
                  </Text>
                  <ColorPicker
                    value={color}
                    onChange={isSystem ? () => {} : setColor}
                  />
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
                  <DynamicIcon name={icon || "tag"} size={17} color={color} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[14px] font-semibold text-on-surface"
                    numberOfLines={1}
                  >
                    {name || "Tag name"}
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
      {!isSystem && (
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
              backgroundColor: canSave ? C.primary : `${C.outlineVariant}55`,
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
      )}
    </KeyboardAvoidingView>
  );
}
