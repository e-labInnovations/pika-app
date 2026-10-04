import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useSmsLookups } from "../sms/preview";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import {
  useCategoryReview,
  useUpdateTransaction,
  type CategoryReviewItem,
} from "../../services/gql/transactions/transactions.service";

// Transactions the user chose to keep as they are. Newest only: the review looks back 60 days.
const KEPT_KEY = "category_review_kept";
const KEPT_MAX = 40;

/** "Check categories": recent transactions filed differently from similar ones, with Keep / Move. */
export function CategoryReviewCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const find = useSmsLookups();
  const { items, refetch } = useCategoryReview();
  const { updateTransaction } = useUpdateTransaction();
  const [kept, setKept] = useState<string[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(KEPT_KEY)
      .then((v) => setKept(v ? JSON.parse(v) : []))
      .catch(() => setKept([]));
  }, []);

  if (kept === null) return null;
  const keyOf = (i: CategoryReviewItem) => i.transactions[0].id;
  const visible = items.filter(
    (i) => i.transactions.length && !kept.includes(keyOf(i)) && find.category(i.current) && find.category(i.suggested),
  );
  if (!visible.length) return null;

  const keep = (i: CategoryReviewItem) => {
    const next = [...i.transactions.map((t) => t.id), ...kept].slice(0, KEPT_MAX);
    setKept(next);
    SecureStore.setItemAsync(KEPT_KEY, JSON.stringify(next)).catch(() => {});
  };

  const move = async (i: CategoryReviewItem) => {
    setBusy(keyOf(i));
    try {
      for (const t of i.transactions) await updateTransaction({ id: t.id, data: { category: i.suggested } });
      await refetch();
    } catch (err: any) {
      showAlert({ title: "Could not move", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusy(null);
    }
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="folder" size={15} color={C.primaryBright} />
        <Text className="flex-1 text-[14px] font-semibold text-on-surface">Check categories</Text>
      </View>

      {visible.map((i, n) => {
        const first = i.transactions[0];
        const count = i.transactions.length;
        return (
          <View key={keyOf(i)} className="gap-2">
            {n > 0 && <View className="h-px" style={{ backgroundColor: `${C.outlineVariant}44` }} />}
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/transactions/${first.id}`)}>
              <Text className="text-[14px] text-on-surface" numberOfLines={1}>
                {first.title}
                {count > 1 ? ` ×${count}` : ` · ${fmt(parseFloat(first.amount))}`}
              </Text>
              <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                In {find.category(i.current)!.name}; similar ones are in{" "}
                <Text className="font-semibold text-on-surface">{find.category(i.suggested)!.name}</Text>
              </Text>
            </TouchableOpacity>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => keep(i)}
                disabled={busy === keyOf(i)}
                activeOpacity={0.75}
                className="px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${C.outlineVariant}33` }}
              >
                <Text className="text-[12px] font-semibold text-on-surface-variant">Keep</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => move(i)}
                disabled={busy === keyOf(i)}
                activeOpacity={0.75}
                className="px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: C.primaryBright }}
              >
                {busy === keyOf(i) ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-[12px] font-semibold text-white">
                    Move{count > 1 ? ` all ${count}` : ""}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}
