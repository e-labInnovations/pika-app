import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useSmsLookups } from "../sms/preview";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import { scheduleReminderNotifications } from "../../lib/reminder-notifications";
import { usePendingAIPrefill } from "../../context/AIPrefillBridgeContext";
import { useCreateReminder, useGetReminders } from "../../services/gql/reminders/reminders.service";
import {
  useRecurringOverview,
  type RecurringDue,
  type RecurringSuggestion,
} from "../../services/gql/reminders/recurring.service";
import {
  Reminder_recurrenceType_MutationInput,
  Reminder_type_MutationInput,
} from "../../services/gql/types/graphql";

const AMBER = "#f59e0b";

const ordinal = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;
const shortDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
const daysUntil = (iso: string) => Math.ceil((new Date(iso).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86_400_000);

/**
 * Monthly payments: tracked ones that are due or look missed (with Add), and patterns
 * found in history to track (Track / No). Also keeps local due-day notifications in sync.
 */
export function RecurringCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const find = useSmsLookups();
  const { suggestions, due, refetch } = useRecurringOverview();
  const { data: tracked } = useGetReminders({
    where: { isRecurring: { equals: true }, archived: { not_equals: true } },
    limit: 100,
  });
  const { createReminder } = useCreateReminder();
  const { setPending: setPrefill } = usePendingAIPrefill();
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (tracked?.docs) scheduleReminderNotifications(tracked.docs.filter(Boolean) as any[]);
  }, [tracked]);

  if (!due.length && !suggestions.length) return null;

  const save = async (s: RecurringSuggestion, archived: boolean) => {
    setBusy(s.key);
    try {
      await createReminder({
        data: {
          title: s.title,
          amount: s.amount,
          type: s.type === "income" ? Reminder_type_MutationInput.income : Reminder_type_MutationInput.expense,
          category: s.category,
          account: s.account,
          date: s.nextDue,
          nextDueDate: s.nextDue,
          isRecurring: true,
          recurrencePeriod: 1,
          recurrenceType: Reminder_recurrenceType_MutationInput.monthly,
          archived,
        },
      });
      await refetch();
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusy(null);
    }
  };

  const add = (d: RecurringDue) => {
    setPrefill({
      values: {
        title: d.title,
        amount: d.amount ? String(parseFloat(d.amount)) : "",
        type: d.type === "income" ? "income" : "expense",
        date: new Date(),
        category: find.category(d.category),
        account: find.account(d.account),
      },
    });
    router.push("/add");
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="repeat" size={15} color={C.primaryBright} />
        <Text className="flex-1 text-[14px] font-semibold text-on-surface">Monthly payments</Text>
      </View>

      {due.map((d) => {
        const n = daysUntil(d.nextDue);
        const income = d.type === "income";
        const when =
          d.status === "missing"
            ? `${income ? "Expected" : "Due"} ${shortDate(d.nextDue)}, not in Pika yet`
            : n <= 0
              ? `${income ? "Expected" : "Due"} today`
              : `${income ? "Expected" : "Due"} in ${n} day${n === 1 ? "" : "s"}`;
        return (
          <View key={d.reminder} className="flex-row items-center gap-3">
            <View className="flex-1">
              <Text className="text-[14px] text-on-surface" numberOfLines={1}>
                {d.title}
                {d.amount ? ` · ${fmt(parseFloat(d.amount))}` : ""}
              </Text>
              <Text className="text-[12px]" style={{ color: d.status === "missing" ? AMBER : C.onSurfaceVariant }}>
                {when}
              </Text>
            </View>
            {d.status === "missing" && (
              <TouchableOpacity
                onPress={() => add(d)}
                activeOpacity={0.75}
                className="px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${C.primary}1f` }}
              >
                <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
                  Add
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {suggestions.map((s) => (
        <View key={s.key} className="gap-2">
          {due.length > 0 && <View className="h-px" style={{ backgroundColor: `${C.outlineVariant}44` }} />}
          <Text className="text-[13px] text-on-surface">
            Looks monthly: <Text className="font-semibold">{s.title}</Text> about {fmt(parseFloat(s.amount))} around the{" "}
            {ordinal(s.day)}
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => save(s, true)}
              disabled={busy === s.key}
              activeOpacity={0.75}
              className="px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <Text className="text-[12px] font-semibold text-on-surface-variant">Not monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => save(s, false)}
              disabled={busy === s.key}
              activeOpacity={0.75}
              className="px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: C.primaryBright }}
            >
              <Text className="text-[12px] font-semibold text-white">Remind me</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
