import React, { useState } from "react";
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
  const [imageError, setImageError] = useState(false);

  const bg = bgColor ?? DEFAULT_BG;
  const ic = iconColor ?? DEFAULT_ICON_COLOR;
  const radius = Math.round(size * 0.27);
  const iconSize = Math.round(size * 0.43);
  const resolvedUrl = resolveMediaUrl(avatarUrl);

  const baseStyle = { width: size, height: size, borderRadius: radius };

  // Fallback layer: icon → first letter
  const Fallback = icon ? (
    <View
      style={{
        ...baseStyle,
        backgroundColor: bg,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        position: "absolute" as const,
      }}
    >
      <DynamicIcon name={icon} size={iconSize} color={ic} />
    </View>
  ) : (
    <View
      style={{
        ...baseStyle,
        backgroundColor: bg,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        position: "absolute" as const,
      }}
    >
      <Text
        style={{
          fontSize: Math.round(size * 0.4),
          fontWeight: "800",
          color: ic,
        }}
      >
        {name?.charAt(0)?.toUpperCase() ?? "?"}
      </Text>
    </View>
  );

  return (
    <View style={baseStyle}>
      {Fallback}

      {resolvedUrl && !imageError && (
        <Image
          source={{ uri: resolvedUrl }}
          style={baseStyle}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
}
