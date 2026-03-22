import * as LucideIcons from "lucide-react-native";
import type { LucideProps } from "lucide-react-native";
import React from "react";

export type IconName = string;

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Dynamic Lucide icon component — mirrors the pika-v2 DynamicIcon API.
 * Accepts kebab-case icon names (e.g. "wallet-cards", "arrow-down").
 *
 * Backed by lucide-react-native instead of the SVG sprite (which is
 * web-only). The sprite at assets/lucide.svg is kept as a reference asset.
 *
 * @example
 * <DynamicIcon name="wallet-cards" size={24} color="#4edea3" />
 */
export function DynamicIcon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  ...props
}: DynamicIconProps) {
  const pascalName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof LucideIcons;

  const IconComponent = LucideIcons[pascalName] as
    | React.ComponentType<LucideProps>
    | undefined;

  if (!IconComponent) {
    if (__DEV__) {
      console.warn(`[Icon] "${name}" not found in lucide-react-native`);
    }
    return null;
  }

  return (
    <IconComponent size={size} color={color} strokeWidth={strokeWidth} {...props} />
  );
}
