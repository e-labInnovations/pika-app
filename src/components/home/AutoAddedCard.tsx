import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import { formatRelativeShort } from "../../lib/format-date";
import { useAutoConfirmedSms, useUndoAutoConfirmedSms } from "../../services/gql/sms/sms.service";

// Items received before this time were hidden with ✕.
const SEEN_KEY = "auto_added_seen_until";
const WINDOW_MS = 24 * 60 * 60 * 1000;

/** "Added automatically": SMS from trusted merchants confirmed in the last day, each with Undo. */
export function AutoAddedCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const [since] = useState(() => new Date(Date.now() - WINDOW_MS).toISOString());
  const { items } = useAutoConfirmedSms(since);
  const { undoAutoConfirm } = useUndoAutoConfirmedSms();
  const [seenUntil, setSeenUntil] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(SEEN_KEY)
      .then((v) => setSeenUntil(v ?? ""))
      .catch(() => setSeenUntil(""));
  }, []);

  if (seenUntil === null) return null;
  const visible = items.filter((i) => i.transaction && i.receivedAt > seenUntil);
  if (!visible.length) return null;

  const hide = () => {
    const until = visible[0].receivedAt;
    setSeenUntil(until);
    SecureStore.setItemAsync(SEEN_KEY, until).catch(() => {});
  };

  const undo = async (id: string) => {
    setBusyId(id);
    try {
      await undoAutoConfirm(id);
    } catch (err: any) {
      showAlert({ title: "Could not undo", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="sparkles" size={15} color={C.primaryBright} />
        <Text className="flex-1 text-[14px] font-semibold text-on-surface">Added automatically</Text>
        <TouchableOpacity onPress={hide} hitSlop={10} accessibilityLabel="Hide">
          <DynamicIcon name="x" size={16} color={C.outlineVariant} />
        </TouchableOpacity>
      </View>
      {visible.map((i) => {
        const tx = i.transaction!;
        const income = tx.type === "income";
        return (
          <View key={i.id} className="flex-row items-center gap-3">
            <TouchableOpacity
              className="flex-1"
              activeOpacity={0.7}
              onPress={() => router.push(`/transactions/${tx.id}`)}
            >
              <Text className="text-[14px] text-on-surface" numberOfLines={1}>
                {tx.title}
              </Text>
              <Text className="text-[12px] text-on-surface-variant">
                {formatRelativeShort(new Date(i.receivedAt))}
              </Text>
            </TouchableOpacity>
            <Text className="text-[14px] font-bold" style={{ color: income ? "#10b981" : "#ef4444" }}>
              {income ? "+" : "−"}
              {fmt(parseFloat(tx.amount))}
            </Text>
            <TouchableOpacity
              onPress={() => undo(i.id)}
              disabled={busyId === i.id}
              activeOpacity={0.75}
              className="px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: `${C.primary}1f` }}
            >
              {busyId === i.id ? (
                <ActivityIndicator size="small" color={C.primary} />
              ) : (
                <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
                  Undo
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
