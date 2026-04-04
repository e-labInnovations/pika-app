import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../../../../components/AccountAvatar";
import { DynamicIcon } from "../../../../components/Icon";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { ColorPicker } from "../../../../components/ui/ColorPicker";
import { IconPicker } from "../../../../components/ui/IconPicker";
import {
  useDeleteAccount,
  useGetAccount,
  useUpdateAccount,
} from "../../../../services/gql/accounts/accounts.service";
import { uploadMedia } from "../../../../lib/media-upload";
import { useFormatMoney } from "../../../../lib/format-currency";
import { useColors } from "../../../../theme/colors";

const ACCOUNT_COLOR = "#f59e0b";

// ── Skeleton loader ────────────────────────────────────────────────────────────

function FormSkeleton() {
  return (
    <View style={{ gap: 12, paddingHorizontal: 16, paddingTop: 8 }}>
      <Skeleton height={80} radius={16} />
      <Skeleton height={48} radius={16} />
      <Skeleton height={48} radius={16} />
      <View className="rounded-2xl bg-surface-mid p-4 gap-5">
        <Skeleton width="40%" height={12} />
        <View className="flex-row gap-4 items-center">
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

export default function EditAccountScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { id } = useLocalSearchParams<{ id: string }>();
  const fmt = useFormatMoney();

  const { data: account, loading } = useGetAccount(id);
  const { updateAccount, loading: saving } = useUpdateAccount();
  const { deleteAccount, loading: deleting } = useDeleteAccount();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("wallet");
  const [bgColor, setBgColor] = useState("#f59e0b");
  const [color, setColor] = useState("#ffffff");

  // Avatar state
  // null  = no avatar (or was removed)
  // string = local URI of newly picked image (not yet uploaded)
  // undefined = not yet initialized from account data
  const [avatarUri, setAvatarUri] = useState<string | null | undefined>(undefined);
  const [avatarFilename, setAvatarFilename] = useState<string | null>(null);
  const [avatarMime, setAvatarMime] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (account) {
      setName(account.name);
      setDescription(account.description ?? "");
      setIcon(account.icon ?? "wallet");
      setBgColor(account.bgColor ?? "#f59e0b");
      setColor(account.color ?? "#ffffff");
      // Initialize avatarUri from existing remote URL (for display only; upload uses local URI)
      setAvatarUri(account.avatar?.url ?? null);
    }
  }, [account]);

  const canSave = name.trim().length > 0 && !saving && !deleting && !uploading;
  const isBusy = saving || uploading;

  // Whether avatar is a freshly picked local file (not yet an existing remote URL)
  const isLocalAvatar = avatarUri != null && !avatarUri.startsWith("http");

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to your photo library to set an account avatar.");
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
    if (!canSave || !account) return;

    let avatarId: string | null | undefined;

    if (isLocalAvatar && avatarFilename && avatarMime) {
      // New image picked — upload it
      setUploading(true);
      try {
        const media = await uploadMedia(avatarUri!, avatarFilename, avatarMime, name.trim());
        avatarId = media.id;
      } catch {
        setUploading(false);
        Alert.alert("Upload failed", "Could not upload the avatar image. The account will be saved without the new image.");
        return;
      }
      setUploading(false);
    } else if (avatarUri === null) {
      // User explicitly removed the avatar
      avatarId = null;
    }
    // If avatarUri is a remote URL (unchanged), pass undefined to leave it as-is

    await updateAccount({
      id: account.id,
      data: {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        bgColor,
        color,
        ...(avatarId !== undefined ? { avatar: avatarId } : {}),
      },
    });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      `Are you sure you want to delete "${name}"? All associated transactions will lose this account reference.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount(id);
              router.back();
            } catch (err: any) {
              const message =
                err?.graphQLErrors?.[0]?.message ||
                err?.errors?.[0]?.message ||
                err?.message ||
                "Failed to delete account.";
              Alert.alert("Cannot Delete", message);
            }
          },
        },
      ],
    );
  };

  const balance = account?.balance ?? 0;
  const balanceColor = balance >= 0 ? "#10b981" : "#ef4444";

  // The URL to show in the avatar (local URI if freshly picked, else the remote URL)
  const displayAvatarUrl = avatarUri;

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
            Edit Account
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

      {loading && !account ? (
        <FormSkeleton />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 12 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Balance summary */}
          {account && (
            <View
              className="flex-row items-center gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: `${ACCOUNT_COLOR}12` }}
            >
              <AccountAvatar
                avatarUrl={displayAvatarUrl}
                icon={icon}
                iconColor={color}
                bgColor={bgColor}
                name={name}
                size={52}
              />
              <View className="flex-1">
                <Text className="text-[13px] text-on-surface-variant">Current balance</Text>
                <Text className="text-[22px] font-black tracking-tight" style={{ color: balanceColor }}>
                  {fmt(account.balance)}
                </Text>
                {(account.totalTransactions ?? 0) > 0 && (
                  <Text className="text-[11px] text-on-surface-variant">
                    {account.totalTransactions} transaction{account.totalTransactions === 1 ? "" : "s"}
                  </Text>
                )}
              </View>
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
              placeholder="Account name"
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
              <View style={{ position: "relative" }}>
                <AccountAvatar
                  avatarUrl={displayAvatarUrl}
                  icon={icon}
                  iconColor={color}
                  bgColor={bgColor}
                  name={name}
                  size={64}
                />
                {/* Camera button */}
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
                {/* Remove button — shown when avatar is set */}
                {displayAvatarUrl && (
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

              {/* Color pickers or avatar info */}
              {!displayAvatarUrl ? (
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
                    {isLocalAvatar ? "New avatar selected" : "Custom avatar"}
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

            {/* Icon picker — only when no avatar */}
            {!displayAvatarUrl && (
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
                avatarUrl={displayAvatarUrl}
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
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Save button */}
      <View
        className="px-4 bg-surface"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4, paddingTop: 12 }}
      >
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={!canSave || loading}
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
              <Text className="text-[15px] font-bold text-white">Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
