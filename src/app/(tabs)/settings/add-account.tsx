import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
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
import { showAlert } from "../../../components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../../../components/AccountAvatar";
import { DynamicIcon } from "../../../components/Icon";
import { ColorPicker } from "../../../components/ui/ColorPicker";
import { IconPicker } from "../../../components/ui/IconPicker";
import { useCreateAccount } from "../../../services/gql/accounts/accounts.service";
import { uploadMedia } from "../../../lib/media-upload";
import { useColors } from "../../../theme/colors";

const ACCOUNT_COLOR = "#f59e0b";

export default function AddAccountScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { createAccount, loading: saving } = useCreateAccount();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("wallet");
  const [bgColor, setBgColor] = useState("#f59e0b");
  const [color, setColor] = useState("#ffffff");

  // Avatar state
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [avatarFilename, setAvatarFilename] = useState<string | null>(null);
  const [avatarMime, setAvatarMime] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const canSave = name.trim().length > 0 && !saving && !uploading;

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert({ title: "Permission required", message: "Allow access to your photo library to set an account avatar." });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setAvatarUri(asset.uri);
      setAvatarFilename(asset.fileName ?? `avatar-${Date.now()}.jpg`);
      setAvatarMime(asset.mimeType ?? "image/jpeg");
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUri(null);
    setAvatarFilename(null);
    setAvatarMime(null);
  };

  const handleSave = async () => {
    if (!canSave) return;
    setUploading(true);
    let avatarId: string | undefined;
    try {
      if (avatarUri && avatarFilename && avatarMime) {
        const media = await uploadMedia(avatarUri, avatarFilename, avatarMime, name.trim());
        avatarId = media.id;
      }
    } catch {
      setUploading(false);
      showAlert({ title: "Upload failed", message: "Could not upload the avatar image. The account will be saved without it." });
    } finally {
      setUploading(false);
    }

    await createAccount({
      data: {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        bgColor,
        color,
        avatar: avatarId,
      },
    });
    router.back();
  };

  const isBusy = saving || uploading;

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
            Add Account
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Account badge */}
        <View
          className="flex-row items-center gap-2 self-start px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `${ACCOUNT_COLOR}22` }}
        >
          <DynamicIcon name="wallet" size={13} color={ACCOUNT_COLOR} />
          <Text className="text-[12px] font-semibold" style={{ color: ACCOUNT_COLOR }}>
            New Account
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
            placeholder="e.g. Cash, Chase, Savings"
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

          {/* Avatar row */}
          <View className="flex-row items-center gap-4">
            {/* Avatar/icon preview with camera overlay */}
            <View style={{ position: "relative" }}>
              <AccountAvatar
                avatarUrl={avatarUri}
                icon={icon}
                iconColor={color}
                bgColor={bgColor}
                name={name}
                size={64}
              />
              <TouchableOpacity
                onPress={handlePickAvatar}
                activeOpacity={0.8}
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: C.surfaceHighest,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1.5,
                  borderColor: C.outlineVariant,
                }}
              >
                <DynamicIcon name="camera" size={12} color={C.onSurface} />
              </TouchableOpacity>
              {avatarUri && (
                <TouchableOpacity
                  onPress={handleRemoveAvatar}
                  activeOpacity={0.8}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: C.tertiary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicIcon name="x" size={10} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            {/* Color pickers (shown when no avatar selected) */}
            {!avatarUri ? (
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
            ) : (
              <View className="flex-1">
                <Text className="text-[13px] font-semibold text-on-surface" numberOfLines={1}>
                  {name || "Account name"}
                </Text>
                <Text className="text-[12px] text-on-surface-variant mt-0.5">
                  Avatar selected
                </Text>
                <TouchableOpacity
                  onPress={handlePickAvatar}
                  activeOpacity={0.8}
                  className="flex-row items-center gap-1.5 mt-2 self-start px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: `${C.primary}18` }}
                >
                  <DynamicIcon name="image" size={12} color={C.primary} />
                  <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Icon picker — only shown when no avatar */}
          {!avatarUri && (
            <View className="flex-row items-center gap-3">
              <Text className="text-[13px] font-medium text-on-surface">Icon</Text>
              <IconPicker
                value={icon}
                onChange={setIcon}
                bgColor={bgColor}
                iconColor={color}
                size={44}
              />
              <Text className="text-[12px] text-on-surface-variant">Tap to change icon</Text>
            </View>
          )}

          {/* Preview */}
          <View
            className="flex-row items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: C.surfaceHighest }}
          >
            <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
              Preview
            </Text>
            <AccountAvatar
              avatarUrl={avatarUri}
              icon={icon}
              iconColor={color}
              bgColor={bgColor}
              name={name}
              size={40}
            />
            <View className="flex-1">
              <Text className="text-[14px] font-semibold text-on-surface" numberOfLines={1}>
                {name || "Account name"}
              </Text>
              {description ? (
                <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                  {description}
                </Text>
              ) : (
                <Text className="text-[12px] font-semibold" style={{ color: "#10b981" }}>
                  $0.00
                </Text>
              )}
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
            backgroundColor: canSave ? ACCOUNT_COLOR : `${C.outlineVariant}55`,
          }}
        >
          {isBusy ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text className="text-[15px] font-bold text-white">
                {uploading ? "Uploading..." : "Saving..."}
              </Text>
            </>
          ) : (
            <>
              <DynamicIcon name="check" size={18} color="#fff" />
              <Text className="text-[15px] font-bold text-white">Save Account</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
