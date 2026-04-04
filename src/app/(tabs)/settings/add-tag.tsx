import { router } from "expo-router";
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
import { DynamicIcon } from "../../../components/Icon";
import { ColorPicker } from "../../../components/ui/ColorPicker";
import { IconPicker } from "../../../components/ui/IconPicker";
import { useCreateTag } from "../../../services/gql/tags/tags.service";
import { useColors } from "../../../theme/colors";

export default function AddTagScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { createTag, loading: saving } = useCreateTag();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("tag");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [color, setColor] = useState("#ffffff");

  const canSave = name.trim().length > 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    await createTag({
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
            Add Tag
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tag badge */}
        <View
          className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `${C.primary}22` }}
        >
          <DynamicIcon name="tag" size={13} color={C.primary} />
          <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
            New Tag
          </Text>
        </View>

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
            placeholder="e.g. Work, Travel, Health"
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
              bgColor={bgColor ? `${bgColor}33` : `${C.primaryBright}22`}
              iconColor={color}
              size={64}
            />
            <View className="flex-1 gap-4">
              <View
                className="flex-row items-center justify-between py-3 px-4 rounded-xl"
                style={{ backgroundColor: `${bgColor}18` }}
              >
                <Text className="text-[13px] font-medium text-on-surface">Background</Text>
                <ColorPicker value={bgColor} onChange={setBgColor} />
              </View>
              <View className="flex-row items-center justify-between py-3 px-4 rounded-xl bg-surface-high">
                <Text className="text-[13px] font-medium text-on-surface">Icon Color</Text>
                <ColorPicker value={color} onChange={setColor} />
              </View>
            </View>
          </View>

          {/* Live preview */}
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
                <Text className="text-[14px] font-semibold text-on-surface" numberOfLines={1}>
                  {name || "Tag name"}
                </Text>
                {description ? (
                  <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                    {description}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save button */}
      <View
        className="px-4 bg-surface"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4, paddingTop: 12 }}
      >
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={!canSave}
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
              <Text className="text-[15px] font-bold text-white">Save Tag</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
