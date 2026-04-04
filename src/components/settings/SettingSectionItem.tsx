import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

export type SettingSection = {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  onPress?: () => void;
};

type Props = {
  section: SettingSection;
};

export function SettingSectionItem({ section }: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      onPress={section.onPress}
      activeOpacity={0.75}
      className="flex-1 p-4 rounded-2xl bg-surface-mid gap-3"
    >
      <View className="flex-row items-center gap-2.5">
        <View
          className="w-9 h-9 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${section.color}22` }}
        >
          <DynamicIcon name={section.icon} size={17} color={section.color} />
        </View>
        <Text className="text-[13px] font-semibold text-on-surface flex-1" numberOfLines={1}>
          {section.title}
        </Text>
      </View>
      <View className="flex-row items-end justify-between gap-2">
        <Text className="text-[11px] text-on-surface-variant leading-relaxed flex-1" numberOfLines={2}>
          {section.description}
        </Text>
        <DynamicIcon name="chevron-right" size={14} color={C.outlineVariant} />
      </View>
    </TouchableOpacity>
  );
}
