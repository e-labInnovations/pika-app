import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "@/components/Icon";
import { showAlert } from "@/components/ui/AlertDialog";
import { useColors } from "@/theme/colors";

interface Props {
  /** "tag", "category", "person", "account": used in the copy. */
  kind: string;
  archived: boolean;
  /** Saves the new state (isActive = !archived). */
  onChange: (archived: boolean) => Promise<unknown>;
}

/**
 * Archive / unarchive a category, tag, person or account. Archived items stay on
 * old transactions and in reports and search, but aren't offered in pickers,
 * @-mentions, AI or suggestions. Saves immediately, like Delete.
 */
export function ArchiveCard({ kind, archived, onChange }: Props) {
  const C = useColors();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    try {
      await onChange(!archived);
    } catch (err: any) {
      showAlert({ title: archived ? "Couldn't unarchive" : "Couldn't archive", message: err?.message ?? "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-center gap-2">
        <DynamicIcon name={archived ? "archive-restore" : "archive"} size={16} color={C.onSurfaceVariant} />
        <Text className="text-[14px] font-bold text-on-surface">{archived ? "Archived" : "Archive"}</Text>
      </View>
      <Text className="text-[12px] leading-[17px] text-on-surface-variant">
        {archived
          ? `This ${kind} is hidden when adding transactions. Past transactions, reports and search still include it.`
          : `Done with this ${kind}? Archiving hides it when adding transactions (pickers, @-mentions, AI). Past transactions, reports and search keep it.`}
      </Text>
      <TouchableOpacity
        onPress={toggle}
        disabled={busy}
        activeOpacity={0.8}
        className="flex-row items-center justify-center gap-2 py-3 rounded-xl"
        style={{ backgroundColor: archived ? C.primary : `${C.onSurfaceVariant}22` }}
      >
        {busy ? (
          <ActivityIndicator size="small" color={archived ? "#fff" : C.onSurface} />
        ) : (
          <Text className="text-[14px] font-bold" style={{ color: archived ? "#fff" : C.onSurface }}>
            {archived ? `Unarchive ${kind}` : `Archive ${kind}`}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
