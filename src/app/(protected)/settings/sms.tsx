import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Linking, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { showAlert } from "@/components/ui/AlertDialog";
import { formatRelativeShort } from "@/lib/format-date";
import {
  disableSmsCapture,
  enableSmsCapture,
  getSmsStatus,
  rescanSms,
  smsCaptureAvailable,
} from "@/lib/sms-capture";
import { usePendingSms } from "@/services/gql/sms/sms.service";
import { useColors } from "@/theme/colors";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Text className="text-[14px] text-on-surface">{label}</Text>
      <Text className="text-[14px] text-on-surface-variant">{value}</Text>
    </View>
  );
}

export default function SmsSettingsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const [status, setStatus] = useState(getSmsStatus());
  const [busy, setBusy] = useState(false);
  const { total } = usePendingSms(1);

  const reload = useCallback(() => setStatus(getSmsStatus()), []);
  useFocusEffect(reload);

  const toggle = async (on: boolean) => {
    setBusy(true);
    try {
      if (on) {
        const res = await enableSmsCapture();
        if (!res.ok) {
          showAlert({
            title: "SMS capture is off",
            message: res.reason,
            buttons: [
              { text: "Open settings", onPress: () => Linking.openSettings() },
              { text: "OK", style: "cancel" },
            ],
          });
        }
      } else {
        await disableSmsCapture();
      }
    } finally {
      setBusy(false);
      reload();
    }
  };

  const rescan = () => {
    const added = rescanSms(7);
    reload();
    showAlert({
      title: "Checked the last 7 days",
      message: added
        ? `${added} SMS queued. Ones already in Pika are skipped.`
        : "No new bank SMS found.",
    });
  };

  return (
    <View className="flex-1 bg-surface">
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">Bank SMS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 14 }}>
        {!smsCaptureAvailable ? (
          <View className="rounded-2xl bg-surface-mid p-4">
            <Text className="text-[14px] text-on-surface-variant">
              SMS capture works in the Android app only.
            </Text>
          </View>
        ) : (
          <>
            <View className="rounded-2xl bg-surface-mid p-4 gap-2">
              <View className="flex-row items-center gap-3">
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-on-surface">Capture bank SMS</Text>
                  <Text className="text-[12px] text-on-surface-variant leading-[17px]">
                    Debit, credit and card SMS from your bank and Pluxee become transactions to confirm.
                    The SMS text is sent to your Pika server; nothing changes until you confirm.
                  </Text>
                </View>
                <Switch value={!!status?.enabled} disabled={busy} onValueChange={toggle} />
              </View>
            </View>

            {status?.enabled && (
              <View className="rounded-2xl bg-surface-mid overflow-hidden">
                <Row label="Receive SMS permission" value={status.canReceive ? "Allowed" : "Not allowed"} />
                <Row label="Read inbox permission" value={status.canRead ? "Allowed" : "Not allowed"} />
                <Row label="Signed in" value={status.hasToken ? "Yes" : "No"} />
                <Row label="Waiting to upload" value={String(status.queued)} />
                <Row
                  label="Inbox last checked"
                  value={status.lastInboxScan ? formatRelativeShort(new Date(status.lastInboxScan)) : "Never"}
                />
                <Row label="Senders" value={status.senders.join(", ") || "—"} />
              </View>
            )}

            {status?.enabled && (
              <View className="gap-2">
                <TouchableOpacity
                  onPress={() => router.push("/sms")}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-3 rounded-2xl bg-surface-mid p-4"
                >
                  <DynamicIcon name="message-square-text" size={18} color={C.primary} />
                  <Text className="flex-1 text-[14px] font-semibold text-on-surface">Review pending SMS</Text>
                  <Text className="text-[14px] text-on-surface-variant">{total}</Text>
                  <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={rescan}
                  activeOpacity={0.75}
                  className="flex-row items-center gap-3 rounded-2xl bg-surface-mid p-4"
                >
                  <DynamicIcon name="refresh-cw" size={18} color={C.primary} />
                  <Text className="flex-1 text-[14px] font-semibold text-on-surface">Check last 7 days again</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text className="text-[12px] text-on-surface-variant leading-[17px] px-1">
              Each SMS is matched to an account by its SMS identifiers (Settings → Accounts → edit), e.g. X7497 for a
              bank account or xx7618, pluxee-meal for a meal card.
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}
