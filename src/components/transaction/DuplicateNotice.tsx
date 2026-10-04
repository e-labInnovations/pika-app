import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import {
  useMarkSmsDuplicate,
  type PendingSms,
  type PossibleDuplicate,
} from "../../services/gql/sms/sms.service";

const AMBER = "#f59e0b";

const when = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** Amber "Already added?" row for something that may record the same payment. Tapping it opens that item. */
export function DuplicateNotice({
  item,
  action,
}: {
  item: PossibleDuplicate;
  action?: { label: string; onPress: () => void; busy?: boolean };
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const open = () => router.push(item.kind === "sms" ? `/sms/${item.id}` : `/transactions/${item.id}`);

  return (
    <View
      className="flex-row items-center gap-2 rounded-xl px-3 py-2"
      style={{ backgroundColor: `${AMBER}1a`, borderWidth: 1, borderColor: `${AMBER}40` }}
    >
      <DynamicIcon name={item.kind === "sms" ? "message-square" : "copy"} size={14} color={AMBER} />
      <TouchableOpacity className="flex-1" activeOpacity={0.7} onPress={open}>
        <Text className="text-[12px] font-semibold" style={{ color: AMBER }}>
          {item.kind === "sms" ? "A bank SMS for this is waiting" : "Already added?"}
        </Text>
        <Text className="text-[12px]" style={{ color: C.onSurface }} numberOfLines={1}>
          {item.title || "Untitled"} · {fmt(parseFloat(item.amount))} · {when(item.date)}
        </Text>
      </TouchableOpacity>
      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          disabled={action.busy}
          activeOpacity={0.75}
          className="rounded-lg px-3 py-1.5"
          style={{ backgroundColor: `${AMBER}33` }}
        >
          {action.busy ? (
            <ActivityIndicator size="small" color={AMBER} />
          ) : (
            <Text className="text-[12px] font-semibold" style={{ color: AMBER }}>
              {action.label}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

/** On a pending bank SMS: the transaction it may duplicate, with "Same" to mark it so. */
export function SmsDuplicateNotice({ sms, onMarked }: { sms: PendingSms; onMarked?: () => void }) {
  const dup = sms.suggestion?.possibleDuplicate;
  const { markDuplicate } = useMarkSmsDuplicate();
  const [busy, setBusy] = useState(false);
  if (!dup) return null;

  const same = async () => {
    setBusy(true);
    try {
      await markDuplicate(sms.id, dup.id);
      onMarked?.();
    } catch (err: any) {
      showAlert({ title: "Could not update", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusy(false);
    }
  };

  return <DuplicateNotice item={{ kind: "transaction", ...dup }} action={{ label: "Same", onPress: same, busy }} />;
}
