import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { resolveMediaUrl } from "../lib/media-upload";

// ── Color generation ──────────────────────────────────────────────────────────

const PALETTE = [
  { bg: "#4d8eff22", fg: "#4d8eff" },
  { bg: "#4edea322", fg: "#00875a" },
  { bg: "#9b7cf822", fg: "#7c3aed" },
  { bg: "#f59e0b22", fg: "#b45309" },
  { bg: "#ef444422", fg: "#dc2626" },
  { bg: "#06b6d422", fg: "#0891b2" },
  { bg: "#ec489922", fg: "#db2777" },
  { bg: "#84cc1622", fg: "#4d7c0f" },
];

function colorFromId(id: string): { bg: string; fg: string } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

// ── Component ─────────────────────────────────────────────────────────────────

type Props = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  size?: number;
  radius?: number;
  /** Show a subtle ring border around the avatar */
  showRing?: boolean;
};

export function UserAvatar({
  id,
  name,
  avatarUrl,
  size = 44,
  radius,
  showRing = false,
}: Props) {
  const r = radius ?? Math.round(size / 2);
  const { bg, fg } = colorFromId(id);
  const initials = getInitials(name);
  const fontSize = Math.round(size * (initials.length === 1 ? 0.44 : 0.38));
  const resolvedUrl = resolveMediaUrl(avatarUrl);

  const [imageError, setImageError] = useState(false);

  const ringStyle = showRing ? { borderWidth: 2, borderColor: fg + "55" } : {};
  const baseStyle = {
    width: size,
    height: size,
    borderRadius: r,
    ...ringStyle,
  };

  return (
    <View style={baseStyle}>
      {/* Initials layer — always rendered */}
      <View
        style={{
          ...baseStyle,
          backgroundColor: bg,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Text
          style={{
            fontSize,
            fontWeight: "800",
            color: fg,
            letterSpacing: 0.5,
            includeFontPadding: false,
          }}
        >
          {initials}
        </Text>
      </View>

      {/* Image layer — sits on top, invisible on error */}
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
