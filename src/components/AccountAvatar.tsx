import React from "react";
import { Image, Text, View } from "react-native";
import { resolveMediaUrl } from "../lib/media-upload";
import { DynamicIcon } from "./Icon";

type Props = {
  /** Remote URL or null for icon fallback */
  avatarUrl?: string | null;
  /** Lucide icon name for fallback */
  icon?: string | null;
  /** Icon color for fallback */
  iconColor?: string | null;
  /** Background color — used both as the avatar border accent and icon bg */
  bgColor?: string | null;
  /** Account name used for initial letter fallback when icon name is unknown */
  name?: string;
  /** Outer container size in px */
  size?: number;
};

const DEFAULT_BG = "#f59e0b";
const DEFAULT_ICON_COLOR = "#ffffff";

export function AccountAvatar({
  avatarUrl,
  icon,
  iconColor,
  bgColor,
  name,
  size = 44,
}: Props) {
  const bg = bgColor ?? DEFAULT_BG;
  const ic = iconColor ?? DEFAULT_ICON_COLOR;
  const radius = Math.round(size * 0.27); // ~12px for size=44
  const iconSize = Math.round(size * 0.43); // ~19px for size=44

  const resolvedUrl = resolveMediaUrl(avatarUrl);

  if (resolvedUrl) {
    return (
      <Image
        source={{ uri: resolvedUrl }}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
        }}
        resizeMode="cover"
      />
    );
  }

  if (icon) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DynamicIcon name={icon} size={iconSize} color={ic} />
      </View>
    );
  }

  // Last resort: first letter of name
  const letter = name?.charAt(0)?.toUpperCase() ?? "?";
  const fontSize = Math.round(size * 0.4);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize, fontWeight: "800", color: ic }}>{letter}</Text>
    </View>
  );
}
