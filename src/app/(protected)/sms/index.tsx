import { router } from "expo-router";
import React, { useState } from "react";
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
import { TransactionPreviewCard } from "@/components/transaction/TransactionPreviewCard";
import { OriginalSms } from "@/components/sms/OriginalSms";
import { canQuickConfirm, toPreview, useSmsLookups, type SmsLookups as Lookups } from "@/components/sms/preview";
import {
  useConfirmSms,
  useDismissSms,
  usePendingSms,
  type PendingSms,
} from "@/services/gql/sms/sms.service";
import { useColors } from "@/theme/colors";

function SmsCard({
  sms,
  find,
  busy,
  onConfirm,
  onEdit,
  onDismiss,
}: {
  sms: PendingSms;
  find: Lookups;
  busy: boolean;
  onConfirm: () => void;
  onEdit: () => void;
  onDismiss: () => void;
}) {
  const C = useColors();
  const quick = canQuickConfirm(sms);

  return (
    <View className="gap-2">
      <TouchableOpacity activeOpacity={0.85} onPress={onEdit}>
        <TransactionPreviewCard data={toPreview(sms, find)} missing={{ category: true, account: true }}>
          <OriginalSms sms={sms} />
        </TransactionPreviewCard>
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
  const { confirmSms } = useConfirmSms();
  const { dismissSms } = useDismissSms();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const find = useSmsLookups();

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
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 20 }}
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
              find={find}
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
