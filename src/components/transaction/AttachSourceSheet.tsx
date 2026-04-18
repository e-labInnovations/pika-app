import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  onPickPhotos: () => void;
  onPickDocuments: () => void;
}

/**
 * Small bottom-sheet picker shown when the user taps "Add attachment".
 * Lets them pick Photo Library or Document.
 */
export function AttachSourceSheet({ visible, onClose, onPickPhotos, onPickDocuments }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        className="absolute bottom-0 left-0 right-0 bg-surface-low rounded-t-3xl"
        style={{ paddingBottom: Math.max(insets.bottom, 16) + 4 }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-9 h-1 rounded-full bg-outline-variant" />
        </View>

        <View className="px-5 pt-2 pb-3">
          <Text className="text-[16px] font-extrabold text-on-surface">
            Add attachment
          </Text>
          <Text className="text-[12px] text-on-surface-variant mt-0.5">
            Choose where to pick from
          </Text>
        </View>

        <View className="px-4 gap-2">
          <OptionRow
            icon="image"
            iconColor="#6366f1"
            title="Photo Library"
            subtitle="Pick one or more images from your photos"
            onPress={() => {
              onClose();
              onPickPhotos();
            }}
          />
          <OptionRow
            icon="file-text"
            iconColor="#f59e0b"
            title="Document"
            subtitle="PDF, Word, Excel, or any file"
            onPress={() => {
              onClose();
              onPickDocuments();
            }}
          />
        </View>

        <View className="px-4 mt-2">
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.75}
            className="p-4 rounded-2xl items-center bg-surface-mid"
          >
            <Text className="text-[14px] font-bold text-on-surface">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function OptionRow({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-row items-center gap-3.5 p-4 rounded-2xl bg-surface-mid"
    >
      <View
        className="w-10 h-10 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <DynamicIcon name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-[14px] font-bold text-on-surface">{title}</Text>
        <Text className="text-[12px] text-on-surface-variant">{subtitle}</Text>
      </View>
      <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
    </TouchableOpacity>
  );
}
