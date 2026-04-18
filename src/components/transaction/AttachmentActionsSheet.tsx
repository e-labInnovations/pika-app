import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import {
  downloadAttachment,
  shareAttachment,
} from "../../lib/attachment-actions";
import { resolveMediaUrl } from "../../lib/media-upload";
import { useColors } from "../../theme/colors";

export type AttachmentActionsMedia = {
  id: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
};

interface Props {
  attachment: AttachmentActionsMedia | null;
  onClose: () => void;
  onView: (att: AttachmentActionsMedia) => void;
}

function formatBytes(bytes: number | null | undefined): string | null {
  if (bytes == null) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentActionsSheet({ attachment, onClose, onView }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState<"share" | "download" | null>(null);

  const isImage = (attachment?.mimeType ?? "").startsWith("image/");
  const sizeText = formatBytes(attachment?.filesize ?? null);
  const thumbUrl = resolveMediaUrl(attachment?.thumbnailURL ?? attachment?.url ?? null);

  const handleShare = async () => {
    if (!attachment || busy) return;
    setBusy("share");
    try {
      await shareAttachment(attachment);
      onClose();
    } catch (e: any) {
      showAlert({
        title: "Couldn't share",
        message: e?.message ?? "Please try again.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleDownload = async () => {
    if (!attachment || busy) return;
    setBusy("download");
    try {
      const result = await downloadAttachment(attachment);
      if (result) {
        onClose();
        const iosMsg = "File shared to your chosen destination.";
        const androidMsg = `Saved to ${result.savedTo}.`;
        showAlert({
          title: "Downloaded",
          message: Platform.OS === "ios" ? iosMsg : androidMsg,
        });
      }
    } catch (e: any) {
      showAlert({
        title: "Couldn't download",
        message: e?.message ?? "Please try again.",
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <Modal
      visible={!!attachment}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        activeOpacity={1}
        onPress={busy ? undefined : onClose}
      />
      <View
        className="absolute bottom-0 left-0 right-0 bg-surface-low rounded-t-3xl"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4 }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-9 h-1 rounded-full bg-outline-variant" />
        </View>

        {/* Attachment header */}
        {attachment && (
          <View className="flex-row items-center gap-3 px-5 py-3">
            <View
              className="w-11 h-11 rounded-xl overflow-hidden items-center justify-center"
              style={{ backgroundColor: C.surfaceHigh }}
            >
              {isImage && thumbUrl ? (
                <Image source={{ uri: thumbUrl }} style={{ width: 44, height: 44 }} resizeMode="cover" />
              ) : (
                <DynamicIcon
                  name={isImage ? "image" : "file-text"}
                  size={20}
                  color={C.onSurfaceVariant}
                />
              )}
            </View>
            <View className="flex-1 min-w-0">
              <Text
                className="text-[14px] font-extrabold text-on-surface"
                numberOfLines={1}
              >
                {attachment.filename ?? "Attachment"}
              </Text>
              <Text className="text-[11px] text-on-surface-variant">
                {[attachment.mimeType, sizeText].filter(Boolean).join(" · ")}
              </Text>
            </View>
          </View>
        )}

        <View
          className="mx-5 mb-3"
          style={{ height: 1, backgroundColor: `${C.outlineVariant}33` }}
        />

        <View className="px-4 gap-2">
          <ActionRow
            icon="eye"
            iconColor="#6366f1"
            title="View"
            subtitle={isImage ? "Open the image viewer" : "Open in system viewer"}
            disabled={!!busy}
            onPress={() => {
              if (!attachment) return;
              onView(attachment);
            }}
          />
          <ActionRow
            icon="share-2"
            iconColor="#10b981"
            title="Share"
            subtitle="Send to another app"
            loading={busy === "share"}
            disabled={!!busy}
            onPress={handleShare}
          />
          <ActionRow
            icon="download"
            iconColor="#f59e0b"
            title="Download"
            subtitle={
              Platform.OS === "ios"
                ? "Save via Files"
                : "Save to your chosen folder"
            }
            loading={busy === "download"}
            disabled={!!busy}
            onPress={handleDownload}
          />
        </View>

        <View className="px-4 mt-2">
          <TouchableOpacity
            onPress={onClose}
            disabled={!!busy}
            activeOpacity={0.75}
            className="p-4 rounded-2xl items-center bg-surface-mid"
            style={{ opacity: busy ? 0.5 : 1 }}
          >
            <Text className="text-[14px] font-bold text-on-surface">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function ActionRow({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
  loading,
  disabled,
}: {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      className="flex-row items-center gap-3.5 p-4 rounded-2xl bg-surface-mid"
      style={{ opacity: disabled && !loading ? 0.5 : 1 }}
    >
      <View
        className="w-10 h-10 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <DynamicIcon name={icon} size={18} color={iconColor} />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-[14px] font-bold text-on-surface">{title}</Text>
        <Text className="text-[12px] text-on-surface-variant">{subtitle}</Text>
      </View>
      <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
    </TouchableOpacity>
  );
}
