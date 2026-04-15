import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
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
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { uploadMedia } from "@/lib/media-upload";
import { useUpdateUser } from "@/services/gql/users/users.service";
import { useColors } from "@/theme/colors";

// ── Info row ──────────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  iconColor,
  iconBg,
}: {
  icon: string;
  label: string;
  value: string | null | undefined;
  iconColor: string;
  iconBg: string;
}) {
  const C = useColors();
  if (!value) return null;
  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <DynamicIcon name={icon} size={17} color={iconColor} />
      </View>
      <View className="flex-1 min-w-0">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
          {label}
        </Text>
        <Text
          className="text-[14px] font-semibold text-on-surface mt-0.5"
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  const C = useColors();
  return (
    <View
      className="mx-4"
      style={{ height: 1, backgroundColor: C.outlineVariant + "28" }}
    />
  );
}

// ── Edit name dialog ──────────────────────────────────────────────────────────

function EditNameDialog({
  visible,
  currentName,
  onClose,
  onSave,
}: {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
}) {
  const C = useColors();
  const [value, setValue] = useState(currentName);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      await onSave(trimmed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        {/* Scrim — absolute so it doesn't compete for space with the sheet */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* KAV owns full height, sheet sits at its bottom */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          {/* Intercept touches so tapping the sheet doesn't close the dialog */}
          <TouchableOpacity activeOpacity={1}>
            {/* Sheet */}
            <View
              className="mx-4 mb-8 rounded-2xl overflow-hidden"
              style={{ backgroundColor: C.surface }}
            >
              {/* Title bar */}
              <View className="flex-row items-center justify-between px-5 pt-5 pb-3">
                <Text className="text-[17px] font-bold text-on-surface">
                  Edit display name
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  disabled={saving}
                >
                  <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              {/* Input */}
              <View className="px-5 pb-5">
                <TextInput
                  value={value}
                  onChangeText={setValue}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                  maxLength={60}
                  editable={!saving}
                  className="text-[15px] text-on-surface px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: C.surfaceMid,
                    borderWidth: 1.5,
                    borderColor: C.primary,
                  }}
                  placeholderTextColor={C.onSurfaceVariant}
                  placeholder="Your name"
                />

                {/* Actions */}
                <View className="flex-row gap-3 mt-4">
                  <TouchableOpacity
                    onPress={onClose}
                    disabled={saving}
                    activeOpacity={0.75}
                    className="flex-1 py-3 rounded-xl items-center justify-center"
                    style={{ backgroundColor: C.surfaceMid }}
                  >
                    <Text className="text-[14px] font-semibold text-on-surface-variant">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSave}
                    disabled={
                      saving || !value.trim() || value.trim() === currentName
                    }
                    activeOpacity={0.75}
                    className="flex-1 py-3 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: C.primary,
                      opacity:
                        saving || !value.trim() || value.trim() === currentName
                          ? 0.5
                          : 1,
                    }}
                  >
                    {saving ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text className="text-[14px] font-semibold text-white">
                        Save
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user, settings, logout, refreshUser } = useAuth();
  const { updateUser } = useUpdateUser();

  // Local avatar URI — null means "show current", string means newly picked
  const [localAvatarUri, setLocalAvatarUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Name editing
  const [nameDialogVisible, setNameDialogVisible] = useState(false);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    setLocalAvatarUri(asset.uri);

    // Upload immediately
    setUploading(true);
    try {
      const uploaded = await uploadMedia(
        asset.uri,
        asset.fileName ?? `avatar-${Date.now()}.jpg`,
        asset.mimeType ?? "image/jpeg",
        user?.name ?? undefined,
      );
      await updateUser({ id: user!.id, data: { avatar: uploaded.id } });
      await refreshUser();
      setLocalAvatarUri(null); // let refreshed user.avatar.url take over
    } catch (err: any) {
      setLocalAvatarUri(null);
      showAlert({
        title: "Upload failed",
        message: err?.message ?? "Could not upload avatar.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    showAlert({
      title: "Remove photo",
      message: "Remove your profile photo?",
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            setUploading(true);
            try {
              await updateUser({ id: user!.id, data: { avatar: null } });
              await refreshUser();
            } catch (err: any) {
              showAlert({
                title: "Error",
                message: err?.message ?? "Could not remove avatar.",
              });
            } finally {
              setUploading(false);
            }
          },
        },
      ],
    });
  };

  const handleSaveName = async (name: string) => {
    try {
      await updateUser({ id: user!.id, data: { name } });
      await refreshUser();
      setNameDialogVisible(false);
    } catch (err: any) {
      showAlert({
        title: "Error",
        message: err?.message ?? "Could not update name.",
      });
      throw err; // re-throw so dialog keeps saving=true off
    }
  };

  const handleLogout = () => {
    showAlert({
      title: "Sign out",
      message: "Are you sure you want to sign out?",
      buttons: [
        { text: "Cancel", style: "cancel" },
        { text: "Sign out", style: "destructive", onPress: logout },
      ],
    });
  };

  if (!user) return null;

  const avatarUrl = localAvatarUri ?? user.avatar?.url ?? null;
  const hasAvatar = !!user.avatar?.url;

  return (
    <View className="flex-1 bg-surface">
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
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Profile
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Avatar hero card ──────────────────────────────────────────── */}
        <View
          className="rounded-2xl items-center py-8 gap-3"
          style={{ backgroundColor: C.surfaceMid }}
        >
          {/* Avatar + camera overlay */}
          <View>
            <UserAvatar
              id={user.id}
              name={user.name ?? user.email}
              avatarUrl={avatarUrl}
              size={88}
            />

            {/* Upload spinner overlay */}
            {uploading && (
              <View
                className="absolute inset-0 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
              >
                <ActivityIndicator color="#fff" size="small" />
              </View>
            )}

            {/* Camera button */}
            {!uploading && (
              <TouchableOpacity
                onPress={handlePickAvatar}
                activeOpacity={0.8}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full items-center justify-center"
                style={{ backgroundColor: C.primary }}
              >
                <DynamicIcon name="camera" size={14} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Remove button — top-right, only when avatar exists */}
            {hasAvatar && !uploading && (
              <TouchableOpacity
                onPress={handleRemoveAvatar}
                activeOpacity={0.8}
                className="absolute top-0 right-0 w-6 h-6 rounded-full items-center justify-center"
                style={{ backgroundColor: C.tertiary }}
              >
                <DynamicIcon name="x" size={12} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Name + email */}
          <View className="items-center gap-0.5">
            <TouchableOpacity
              onPress={() => setNameDialogVisible(true)}
              activeOpacity={0.7}
              className="flex-row items-center gap-1.5"
            >
              <Text className="text-[20px] font-black text-on-surface tracking-[-0.3px]">
                {user.name ?? "—"}
              </Text>
              <DynamicIcon name="pencil" size={14} color={C.onSurfaceVariant} />
            </TouchableOpacity>
            <Text className="text-[13px] text-on-surface-variant">
              {user.email}
            </Text>
          </View>

          {/* Role badge */}
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: `${C.primary}18` }}
          >
            <Text
              className="text-[11px] font-bold uppercase tracking-[0.8px]"
              style={{ color: C.primary }}
            >
              {user.role}
            </Text>
          </View>
        </View>

        {/* ── Account details ───────────────────────────────────────────── */}
        <View
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: C.surfaceMid }}
        >
          <InfoRow
            icon="user"
            label="Display Name"
            value={user.name}
            iconColor="#4d8eff"
            iconBg="#4d8eff20"
          />
          {user.name && <Divider />}
          <InfoRow
            icon="mail"
            label="Email"
            value={user.email}
            iconColor="#6366f1"
            iconBg="#6366f120"
          />
          <Divider />
          <InfoRow
            icon="calendar"
            label="Member since"
            value={joinedDate}
            iconColor="#f59e0b"
            iconBg="#f59e0b20"
          />
        </View>

        {/* ── Preferences summary ───────────────────────────────────────── */}
        {settings && (
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: C.surfaceMid }}
          >
            <InfoRow
              icon="dollar-sign"
              label="Currency"
              value={settings.currency}
              iconColor="#22c55e"
              iconBg="#22c55e20"
            />
            {settings.currency && settings.timezone && <Divider />}
            <InfoRow
              icon="clock"
              label="Timezone"
              value={settings.timezone?.replace(/_/g, " ") ?? null}
              iconColor="#6366f1"
              iconBg="#6366f120"
            />
          </View>
        )}

        {/* ── Sign out ──────────────────────────────────────────────────── */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.75}
          className="flex-row items-center justify-center gap-2 p-4 rounded-2xl bg-surface-mid"
        >
          <DynamicIcon name="log-out" size={17} color={C.tertiary} />
          <Text className="text-[14px] font-semibold text-tertiary">
            Sign out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Edit name dialog ─────────────────────────────────────────────── */}
      <EditNameDialog
        visible={nameDialogVisible}
        currentName={user.name ?? ""}
        onClose={() => setNameDialogVisible(false)}
        onSave={handleSaveName}
      />
    </View>
  );
}
