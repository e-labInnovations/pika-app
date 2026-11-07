/**
 * Splitting one bank SMS into several transactions (rent + electricity paid in one UPI
 * transfer). Parts must add up to the bank amount; the server checks it again.
 *
 * - {@link SmsSplitSheet}: edit the parts by hand or with AI, then confirm them.
 * - {@link SmsSplitSummary}: the parts as short lines, for cards.
 * - {@link SmsSplitActions}: the review screen's split card or Split button.
 */
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { SplitPartsSheet, money, paise } from "../split/SplitPartsSheet";
import { useSmsLookups, type SmsLookups } from "./preview";
import { useAiEnabled } from "./SmsRefineSheet";
import {
  useConfirmSms,
  useSplitSmsWithAI,
  type PendingSms,
  type SmsPart,
} from "../../services/gql/sms/sms.service";
import { useColors } from "../../theme/colors";

/** The split editor for a pending SMS: confirming saves one transaction per part. */
export function SmsSplitSheet({
  sms,
  visible,
  onClose,
  onConfirmed,
}: {
  sms: PendingSms;
  visible: boolean;
  onClose: () => void;
  onConfirmed?: () => void;
}) {
  const aiEnabled = useAiEnabled();
  const { confirmSms } = useConfirmSms();
  const { splitWithAI } = useSplitSmsWithAI();
  const s = sms.suggestion;
  const parts = (s?.parts ?? []) as SmsPart[];
  // Start from the suggested split, else from the single suggestion (second part takes the rest).
  const initial: Partial<SmsPart>[] =
    parts.length >= 2 ? parts : [{ title: s?.title ?? "", category: s?.category ?? null, tags: s?.tags ?? [], person: s?.person ?? null }];
  return (
    <SplitPartsSheet
      visible={visible}
      onClose={onClose}
      totalPaise={paise(sms.parsed?.amount ?? "0")}
      txType={sms.parsed?.type === "income" ? "income" : "expense"}
      initialParts={initial}
      aiEnabled={aiEnabled}
      onAI={(text) => splitWithAI(sms.id, text)}
      onConfirm={async (p) => {
        await confirmSms(sms.id, { parts: p });
        onConfirmed?.();
      }}
    />
  );
}

/** The parts as "Rent ₹7,000.00" lines, for cards. Nothing when not split. */
export function SmsSplitSummary({ sms, find }: { sms: PendingSms; find: SmsLookups }) {
  const C = useColors();
  const parts = (sms.suggestion?.parts ?? []) as SmsPart[];
  if (parts.length < 2) return null;
  return (
    <View className="rounded-xl px-3 py-2" style={{ backgroundColor: `${C.primary}12`, gap: 4 }}>
      <View className="flex-row items-center gap-1.5">
        <DynamicIcon name="split" size={13} color={C.primary} />
        <Text className="text-[12px] font-semibold" style={{ color: C.primary }}>
          Split into {parts.length}
          {sms.suggestion?.partsFrom === "history" ? " · like last time" : ""}
        </Text>
      </View>
      {parts.map((p, i) => {
        const cat = find.category(p.category);
        return (
          <View key={i} className="flex-row items-center gap-2">
            <DynamicIcon name={cat?.icon ?? "shapes"} size={13} color={cat?.color ?? C.onSurfaceVariant} />
            <Text className="flex-1 text-[12px] text-on-surface" numberOfLines={1}>
              {p.title || cat?.name || `Part ${i + 1}`}
            </Text>
            <Text className="text-[12px] font-semibold text-on-surface">{money(paise(p.amount))}</Text>
          </View>
        );
      })}
    </View>
  );
}

/**
 * Review screen: the suggested split with Edit split / Confirm split, or a Split button
 * when it isn't split. The form below always saves one transaction.
 */
export function SmsSplitActions({ sms, onConfirmed }: { sms: PendingSms; onConfirmed?: () => void }) {
  const C = useColors();
  const find = useSmsLookups();
  const [open, setOpen] = useState(false);
  const parts = (sms.suggestion?.parts ?? []) as SmsPart[];
  const btn = "flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5";

  return (
    <>
      {parts.length >= 2 ? (
        <View style={{ gap: 8 }}>
          <SmsSplitSummary sms={sms} find={find} />
          <View className="flex-row gap-2">
            <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.75} className={btn} style={{ backgroundColor: `${C.primary}1f` }}>
              <DynamicIcon name="split" size={15} color={C.primary} />
              <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
                Review split
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[11px] text-on-surface-variant px-1">
            Or edit the form below and Confirm to save it as one transaction.
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.75} className={btn} style={{ backgroundColor: `${C.primary}1f`, flex: 0 }}>
          <DynamicIcon name="split" size={15} color={C.primary} />
          <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
            Split into several transactions
          </Text>
        </TouchableOpacity>
      )}
      <SmsSplitSheet sms={sms} visible={open} onClose={() => setOpen(false)} onConfirmed={onConfirmed} />
    </>
  );
}
