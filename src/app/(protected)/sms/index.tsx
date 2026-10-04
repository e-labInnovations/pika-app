import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { showAlert } from "@/components/ui/AlertDialog";
import { useFormatMoney } from "@/lib/format-currency";
import { formatRelativeShort } from "@/lib/format-date";
import { useGetCategories } from "@/services/gql/categories/categories.service";
import {
  useConfirmSms,
  useDismissSms,
  usePendingSms,
  type PendingSms,
} from "@/services/gql/sms/sms.service";
import { useColors } from "@/theme/colors";

/** True when the suggestion has everything a transaction needs, so one tap can confirm it. */
export function canQuickConfirm(sms: PendingSms): boolean {
  const s = sms.suggestion;
  if (!s?.category || !sms.account) return false;
  return s.type !== "transfer" || !!s.toAccount;
}

function SmsCard({
  sms,
  categoryName,
  busy,
  onConfirm,
  onEdit,
  onDismiss,
}: {
  sms: PendingSms;
  categoryName: string | null;
  busy: boolean;
  onConfirm: () => void;
  onEdit: () => void;
  onDismiss: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const [expanded, setExpanded] = useState(false);
  const p = sms.parsed;
  const type = sms.suggestion?.type ?? p?.type ?? "expense";
  const amount = parseFloat(p?.amount ?? "0");
  const when = new Date(p?.occurredAt ?? sms.receivedAt);
  const quick = canQuickConfirm(sms);

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-start gap-3">
        <View className="flex-1 gap-0.5">
          <Text className="text-[15px] font-bold text-on-surface" numberOfLines={1}>
            {sms.suggestion?.title || p?.merchant || "Transaction"}
          </Text>
          <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
            {[sms.account?.name ?? "No account matched", categoryName ?? "No category", formatRelativeShort(when)].join(" · ")}
          </Text>
        </View>
        <Text
          className={[
            "text-[16px] font-extrabold",
            type === "income" ? "text-secondary" : type === "expense" ? "text-tertiary" : "text-on-surface",
          ].join(" ")}
        >
          {type === "income" ? "+" : type === "expense" ? "−" : ""}
          {fmt(amount)}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={() => setExpanded((e) => !e)}>
        <Text className="text-[12px] leading-[17px] text-on-surface-variant" numberOfLines={expanded ? undefined : 2}>
          {sms.sender}: {sms.body}
        </Text>
      </TouchableOpacity>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onDismiss}
          disabled={busy}
          activeOpacity={0.75}
          className="px-3 py-2 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${C.outlineVariant}33` }}
        >
          <Text className="text-[13px] font-semibold text-on-surface-variant">Dismiss</Text>
        </TouchableOpacity>
        <View className="flex-1" />
        <TouchableOpacity
          onPress={onEdit}
          disabled={busy}
          activeOpacity={0.75}
          className="px-4 py-2 rounded-xl items-center justify-center"
          style={{ backgroundColor: quick ? `${C.primary}1f` : C.primaryBright }}
        >
          <Text className="text-[13px] font-semibold" style={{ color: quick ? C.primary : "#fff" }}>
            {quick ? "Edit" : "Review"}
          </Text>
        </TouchableOpacity>
        {quick && (
          <TouchableOpacity
            onPress={onConfirm}
            disabled={busy}
            activeOpacity={0.75}
            className="px-4 py-2 rounded-xl flex-row items-center gap-1.5"
            style={{ backgroundColor: C.primaryBright }}
          >
            {busy ? (
              <ActivityIndicator size="small" color={"#fff"} />
            ) : (
              <DynamicIcon name="check" size={15} color={"#fff"} />
            )}
            <Text className="text-[13px] font-semibold" style={{ color: "#fff" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function PendingSmsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { items, total, loading, refetch } = usePendingSms();
  const { categories } = useGetCategories({ limit: 500, sort: "name" });
  const { confirmSms } = useConfirmSms();
  const { dismissSms } = useDismissSms();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const categoryName = useMemo(() => {
    const byId = new Map((categories ?? []).map((c) => [c.id, c.name]));
    return (id: string | null | undefined) => (id ? byId.get(id) ?? null : null);
  }, [categories]);

  const run = async (id: string, action: () => Promise<unknown>, failTitle: string) => {
    setBusyId(id);
    try {
      await action();
    } catch (err: any) {
      showAlert({ title: failTitle, message: err?.message ?? "Something went wrong." });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View className="flex-1 bg-surface">
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-[20px] font-black tracking-[-0.5px] text-on-surface">Bank SMS</Text>
            <Text className="text-[12px] text-on-surface-variant">
              {total ? `${total} to review` : "Nothing to review"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/settings/sms")}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="settings" size={17} color={C.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              try {
                await refetch();
              } finally {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        {loading && items.length === 0 ? (
          <ActivityIndicator style={{ marginTop: 40 }} color={C.primary} />
        ) : items.length === 0 ? (
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="message-square" size={28} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">All caught up</Text>
            <Text className="text-[13px] text-on-surface-variant opacity-60 text-center px-8">
              New bank and wallet SMS show up here to confirm.
            </Text>
          </View>
        ) : (
          items.map((sms) => (
            <SmsCard
              key={sms.id}
              sms={sms}
              categoryName={categoryName(sms.suggestion?.category)}
              busy={busyId === sms.id}
              onConfirm={() => run(sms.id, () => confirmSms(sms.id), "Could not confirm")}
              onEdit={() => router.push(`/sms/${sms.id}`)}
              onDismiss={() => run(sms.id, () => dismissSms(sms.id), "Could not dismiss")}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
