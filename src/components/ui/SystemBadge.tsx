import React from "react";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

/**
 * Minimal lock icon marking an entity as a shared/system default.
 * No pill, no label — just a subtle inline glyph next to the entity name.
 */
export function SystemBadge({ size = "sm" }: { size?: "sm" | "xs" }) {
  const C = useColors();
  const iconSize = size === "xs" ? 10 : 12;
  return <DynamicIcon name="lock" size={iconSize} color={C.onSurfaceVariant} />;
}
