import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Reanimated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { DynamicIcon } from "@/components/Icon";
import { useColors } from "@/theme/colors";

const BUTTON = 64;

type Action = { key: string; icon: string; label: string; color: string; onPress: () => void };

function ActionButton({ progress, offset, action }: { progress: SharedValue<number>; offset: number; action: Action }) {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [offset, 0]) }],
  }));
  return (
    <Reanimated.View style={[style, { flex: 1 }]}>
      <TouchableOpacity
        onPress={action.onPress}
        activeOpacity={0.8}
        style={{ flex: 1, backgroundColor: `${action.color}22`, alignItems: "center", justifyContent: "center", gap: 3 }}
      >
        <DynamicIcon name={action.icon} size={16} color={action.color} />
        <Text style={{ fontSize: 11, color: action.color, fontWeight: "700" }}>{action.label}</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

/**
 * Swipe-left actions for manage-list rows: Edit, Archive/Unarchive (when
 * `onArchive` is given) and Delete. System rows show a lock instead.
 */
export function SwipeRowActions({
  progress,
  isSystem = false,
  archived = false,
  onEdit,
  onArchive,
  onDelete,
}: {
  progress: SharedValue<number>;
  isSystem?: boolean;
  archived?: boolean;
  onEdit: () => void;
  onArchive?: () => void;
  onDelete: () => void;
}) {
  const C = useColors();
  const lockStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [80, 0]) }],
  }));

  if (isSystem) {
    return (
      <Reanimated.View style={[lockStyle, { width: 80, justifyContent: "center", alignItems: "center", gap: 4 }]}>
        <DynamicIcon name="lock" size={15} color={C.onSurfaceVariant} />
        <Text style={{ fontSize: 10, color: C.onSurfaceVariant, fontWeight: "600" }}>System</Text>
      </Reanimated.View>
    );
  }

  const actions: Action[] = [
    { key: "edit", icon: "pencil", label: "Edit", color: C.primary, onPress: onEdit },
    ...(onArchive
      ? [{
          key: "archive",
          icon: archived ? "archive-restore" : "archive",
          label: archived ? "Unarchive" : "Archive",
          color: C.onSurfaceVariant,
          onPress: onArchive,
        }]
      : []),
    { key: "delete", icon: "trash-2", label: "Delete", color: C.tertiary, onPress: onDelete },
  ];
  const width = BUTTON * actions.length;

  return (
    <View style={{ flexDirection: "row", width }}>
      {actions.map((a, i) => (
        <ActionButton key={a.key} progress={progress} offset={width - BUTTON * i} action={a} />
      ))}
    </View>
  );
}
