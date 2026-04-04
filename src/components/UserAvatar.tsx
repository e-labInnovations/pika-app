import React from "react";
import { Image, Text, View } from "react-native";
import { resolveMediaUrl } from "../lib/media-upload";

// ── Color generation ──────────────────────────────────────────────────────────

const PALETTE = [
  { bg: "#4d8eff22", fg: "#4d8eff" }, // blue
  { bg: "#4edea322", fg: "#00875a" }, // green
  { bg: "#9b7cf822", fg: "#7c3aed" }, // purple
  { bg: "#f59e0b22", fg: "#b45309" }, // amber
  { bg: "#ef444422", fg: "#dc2626" }, // red
  { bg: "#06b6d422", fg: "#0891b2" }, // cyan
  { bg: "#ec489922", fg: "#db2777" }, // pink
  { bg: "#84cc1622", fg: "#4d7c0f" }, // lime
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
  /** Stable unique ID used to deterministically pick a color (user.id or person.id) */
  id: string;
  name: string;
  /** Optional remote avatar URL (Payload media URL) */
  avatarUrl?: string | null;
  /** Outer size in px */
  size?: number;
  /** Border radius — defaults to circular (size/2) */
  radius?: number;
};

export function UserAvatar({ id, name, avatarUrl, size = 44, radius }: Props) {
  const r = radius ?? Math.round(size / 2);
  const { bg, fg } = colorFromId(id);
  const fontSize = Math.round(size * 0.38);

  const resolvedUrl = resolveMediaUrl(avatarUrl);

  if (resolvedUrl) {
    return (
      <Image
        source={{ uri: resolvedUrl }}
        style={{ width: size, height: size, borderRadius: r }}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: r,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize, fontWeight: "800", color: fg, letterSpacing: 0.5 }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
