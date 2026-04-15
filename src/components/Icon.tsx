import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { lucideIcons, resolveIconName } from "../lib/lucide-data";
export type { IconName } from "../lib/lucide-data";

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Static Lucide icon component — mirrors the pika-v2 DynamicIcon API.
 * Accepts kebab-case icon names (e.g. "wallet-cards", "arrow-down").
 *
 * Backed by the lucide-static sprite (assets/lucide.svg) parsed at build
 * time into src/lib/lucide-data.ts. Rendered via react-native-svg's SvgXml.
 * Run `npm run generate:icons` to update the sprite data.
 *
 * @example
 * <DynamicIcon name="wallet-cards" size={24} color="#4edea3" />
 */
export function DynamicIcon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  style,
}: DynamicIconProps) {
  const resolved = resolveIconName(name.toLowerCase());
  const content = lucideIcons[resolved];

  if (!content) {
    if (__DEV__) {
      console.warn(`[Icon] "${name}" not found in lucide-data`);
    }
    return null;
  }

  const xml = `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;

  return <SvgXml xml={xml} width={size} height={size} style={style} />;
}
