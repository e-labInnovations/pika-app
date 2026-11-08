import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "@/components/Icon";
import { useColors } from "@/theme/colors";

/**
 * Collapsed "Archived (n)" group at the bottom of a manage list. Archived items are
 * hidden when adding transactions; open one to unarchive it.
 */
export function ArchivedSection({
  count,
  children,
  forceOpen = false,
}: {
  count: number;
  children: React.ReactNode;
  /** Show it open regardless (a search is running, or something in it is selected). */
  forceOpen?: boolean;
}) {
  const C = useColors();
  const [toggled, setOpen] = useState(false);
  const open = toggled || forceOpen;
  if (count === 0) return null;
  return (
    <View className="gap-2">
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        activeOpacity={0.7}
        className="flex-row items-center gap-2 px-1 py-2"
      >
        <DynamicIcon name="archive" size={14} color={C.onSurfaceVariant} />
        <Text className="flex-1 text-[12px] font-bold uppercase tracking-[0.6px] text-on-surface-variant">
          Archived ({count})
        </Text>
        <DynamicIcon name={open ? "chevron-up" : "chevron-down"} size={16} color={C.onSurfaceVariant} />
      </TouchableOpacity>
      {open && <View style={{ opacity: 0.7 }}>{children}</View>}
    </View>
  );
}
