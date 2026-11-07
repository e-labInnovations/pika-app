/**
 * Splitting one bank SMS into several transactions (rent + electricity paid in one UPI
 * transfer). Parts must add up to the bank amount; the server checks it again.
 *
 * - {@link SmsSplitSheet}: edit the parts by hand or with AI, then confirm them.
 * - {@link SmsSplitSummary}: the parts as short lines, for cards.
 * - {@link SmsSplitActions}: the review screen's split card or Split button.
 */
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { MentionInput } from "../mentions/MentionInput";
import { CategoryPickerSheet } from "../transaction/CategoryPickerSheet";
import { showAlert } from "../ui/AlertDialog";
import { ModalKeyboardView } from "../ui/ModalKeyboardView";
import { useSmsLookups, type SmsLookups } from "./preview";
import { useAiEnabled } from "./SmsRefineSheet";
import {
  useConfirmSms,
  useSplitSmsWithAI,
  type PendingSms,
  type SmsPart,
} from "../../services/gql/sms/sms.service";
import type { CategoryFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

const paise = (v: string) => Math.round(Number(v || 0) * 100);
const money = (p: number) =>
  `₹${(p / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Row = {
  key: number;
  title: string;
  /** Blank: takes whatever the other parts leave (only one row may be blank). */
  amount: string;
  category: CategoryFieldsFragment | null;
  tags: string[];
  person: string | null;
};

let nextKey = 1;
const row = (r: Partial<Row> = {}): Row => ({ key: nextKey++, title: "", amount: "", category: null, tags: [], person: null, ...r });

function rowsFrom(sms: PendingSms, find: SmsLookups): Row[] {
  const s = sms.suggestion;
  const parts = (s?.parts ?? []) as SmsPart[];
  if (parts.length >= 2) {
    return parts.map((p) =>
      row({ title: p.title, amount: p.amount, category: find.category(p.category), tags: p.tags ?? [], person: p.person }),
    );
  }
  // Start from the single suggestion; the second part takes the rest.
  return [row({ title: s?.title ?? "", category: find.category(s?.category), tags: s?.tags ?? [] }), row()];
}

/** Fills the one blank amount with the rest; null when the parts can't add up. */
function resolveParts(rows: Row[], total: number): { parts: SmsPart[]; left: number } {
  const blanks = rows.filter((r) => !r.amount.trim());
  const set = rows.reduce((a, r) => a + (r.amount.trim() ? paise(r.amount) : 0), 0);
  const rest = total - set;
  const parts = rows.map((r) => ({
    title: r.title.trim(),
    amount: ((r.amount.trim() ? paise(r.amount) : blanks.length === 1 ? rest : 0) / 100).toFixed(2),
    category: r.category?.id ?? null,
    tags: r.tags,
    person: r.person,
  }));
  return { parts, left: blanks.length === 1 ? 0 : rest };
}

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
  const C = useColors();
  const insets = useSafeAreaInsets();
  const find = useSmsLookups();
  const aiEnabled = useAiEnabled();
  const { confirmSms, loading: saving } = useConfirmSms();
  const { splitWithAI, loading: splitting } = useSplitSmsWithAI();
  const total = paise(sms.parsed?.amount ?? "0");

  const [rows, setRows] = useState<Row[]>(() => rowsFrom(sms, find));
  const [aiText, setAiText] = useState("");
  const [picking, setPicking] = useState<number | null>(null);

  // Each opening starts from the latest suggestion (AI or history may have changed it).
  useEffect(() => {
    if (visible) setRows(rowsFrom(sms, find));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const { parts, left } = useMemo(() => resolveParts(rows, total), [rows, total]);
  const blanks = rows.filter((r) => !r.amount.trim()).length;
  const badAmount = parts.some((p) => paise(p.amount) <= 0);
  const missingCategory = parts.some((p) => !p.category);
  const canConfirm = rows.length >= 2 && left === 0 && blanks <= 1 && !badAmount && !missingCategory;

  const update = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const runAI = async () => {
    try {
      const result = await splitWithAI(sms.id, aiText);
      setRows(
        result.map((p) =>
          row({ title: p.title, amount: p.amount, category: find.category(p.category), tags: p.tags ?? [], person: p.person }),
        ),
      );
    } catch (err: any) {
      showAlert({ title: "AI couldn't split it", message: err?.message ?? "Something went wrong." });
    }
  };

  const confirm = async () => {
    try {
      await confirmSms(sms.id, { parts: parts.map((p, i) => ({ ...p, title: p.title || `Part ${i + 1}` })) });
      onClose();
      onConfirmed?.();
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    }
  };

  const status =
    left > 0 ? `${money(left)} left to assign` : left < 0 ? `${money(-left)} too much` : blanks > 1 ? "Leave only one amount blank" : null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <ModalKeyboardView fillColor={C.surfaceLow} style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "92%",
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          <View className="flex-row items-center gap-2 px-5 pt-5 pb-2">
            <DynamicIcon name="split" size={18} color={C.primary} />
            <Text className="text-[17px] font-bold text-on-surface flex-1">Split {money(total)}</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
              <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, gap: 12 }}>
            <Text className="text-[13px] text-on-surface-variant">
              One transaction per part, all with the bank's date, account and reference. Leave one amount blank to give it
              the rest.
            </Text>

            {aiEnabled && (
              <View style={{ gap: 8 }}>
                <MentionInput
                  value={aiText}
                  onChange={setAiText}
                  placeholder="e.g. 7000 rent, rest electricity"
                  editable={!splitting}
                  minHeight={56}
                  maxHeight={120}
                  maxLength={1000}
                />
                <TouchableOpacity
                  onPress={runAI}
                  disabled={splitting}
                  activeOpacity={0.8}
                  className="flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
                  style={{ backgroundColor: `${C.primary}1f` }}
                >
                  {splitting ? <ActivityIndicator size="small" color={C.primary} /> : <DynamicIcon name="sparkles" size={15} color={C.primary} />}
                  <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
                    Split with AI
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {rows.map((r, i) => {
              const resolved = parts[i];
              const isRest = !r.amount.trim() && blanks === 1;
              return (
                <View key={r.key} className="rounded-2xl p-3 bg-surface-mid" style={{ gap: 8 }}>
                  <View className="flex-row items-center gap-2">
                    <TextInput
                      value={r.title}
                      onChangeText={(title) => update(r.key, { title })}
                      placeholder={`Part ${i + 1} title`}
                      placeholderTextColor={C.onSurfaceVariant}
                      className="flex-1 text-[15px] font-semibold text-on-surface"
                      style={{ paddingVertical: 4 }}
                    />
                    {rows.length > 2 && (
                      <TouchableOpacity onPress={() => setRows((rs) => rs.filter((x) => x.key !== r.key))} accessibilityLabel="Remove part">
                        <DynamicIcon name="trash-2" size={16} color={C.onSurfaceVariant} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="flex-row items-center rounded-xl px-3 bg-surface-high" style={{ width: 130, height: 40 }}>
                      <Text className="text-[14px] text-on-surface-variant mr-1">₹</Text>
                      <TextInput
                        value={r.amount}
                        onChangeText={(amount) => update(r.key, { amount: amount.replace(/[^0-9.]/g, "") })}
                        placeholder={isRest ? (paise(resolved.amount) / 100).toFixed(2) : "0.00"}
                        placeholderTextColor={C.onSurfaceVariant}
                        keyboardType="decimal-pad"
                        className="flex-1 text-[14px] text-on-surface"
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setPicking(r.key)}
                      activeOpacity={0.8}
                      className="flex-1 flex-row items-center gap-2 rounded-xl px-3 bg-surface-high"
                      style={{ height: 40 }}
                    >
                      <DynamicIcon name={r.category?.icon ?? "shapes"} size={15} color={r.category?.color ?? C.onSurfaceVariant} />
                      <Text className="flex-1 text-[13px]" numberOfLines={1} style={{ color: r.category ? C.onSurface : C.onSurfaceVariant }}>
                        {r.category?.name ?? "Category"}
                      </Text>
                      <DynamicIcon name="chevron-down" size={14} color={C.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>
                  {isRest && <Text className="text-[11px] text-on-surface-variant">Gets the rest: {money(paise(resolved.amount))}</Text>}
                </View>
              );
            })}

            <TouchableOpacity
              onPress={() => setRows((rs) => [...rs, row()])}
              activeOpacity={0.8}
              className="flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
              style={{ borderWidth: 1, borderStyle: "dashed", borderColor: C.outlineVariant }}
            >
              <DynamicIcon name="plus" size={15} color={C.onSurfaceVariant} />
              <Text className="text-[13px] font-semibold text-on-surface-variant">Add part</Text>
            </TouchableOpacity>
          </ScrollView>

          <View className="px-5 pt-2" style={{ gap: 8 }}>
            {(status || (missingCategory && left === 0)) && (
              <Text className="text-[12px] text-center" style={{ color: "#f59e0b" }}>
                {status ?? "Pick a category for every part"}
              </Text>
            )}
            <TouchableOpacity
              onPress={confirm}
              disabled={!canConfirm || saving}
              activeOpacity={0.85}
              className="flex-row items-center justify-center gap-2 rounded-xl py-3"
              style={{ backgroundColor: C.primaryBright, opacity: canConfirm && !saving ? 1 : 0.5 }}
            >
              {saving && <ActivityIndicator size="small" color="#fff" />}
              <Text className="text-[15px] font-semibold" style={{ color: "#fff" }}>
                Confirm {rows.length} transactions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalKeyboardView>

      <CategoryPickerSheet
        visible={picking !== null}
        onClose={() => setPicking(null)}
        selectedId={rows.find((r) => r.key === picking)?.category?.id ?? null}
        onSelect={(category) => picking !== null && update(picking, { category })}
        txType={sms.parsed?.type === "income" ? "income" : "expense"}
      />
    </Modal>
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
