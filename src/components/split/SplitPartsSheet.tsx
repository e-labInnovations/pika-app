/**
 * Edit a payment split into parts that add up to its total: title, amount, category,
 * tags and person per part; one blank amount takes the rest; optional "Split with AI".
 * Used for a pending SMS (SmsSplitSheet) and for a saved transaction (TransactionSplit).
 * The server checks the total again.
 */
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { MentionInput } from "../mentions/MentionInput";
import { CategoryPickerSheet } from "../transaction/CategoryPickerSheet";
import { PersonPickerSheet } from "../transaction/PersonPickerSheet";
import { TagPickerSheet } from "../transaction/TagPickerSheet";
import { showAlert } from "../ui/AlertDialog";
import { ModalKeyboardView } from "../ui/ModalKeyboardView";
import { useSmsLookups } from "../sms/preview";
import type { SmsPart } from "../../services/gql/sms/sms.service";
import { useColors } from "../../theme/colors";

export const paise = (v: string) => Math.round(Number(v || 0) * 100);
export const money = (p: number) =>
  `₹${(p / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Row = {
  key: number;
  title: string;
  /** Blank: takes whatever the other parts leave (only one row may be blank). */
  amount: string;
  category: string | null;
  tags: string[];
  person: string | null;
};

let nextKey = 1;
const row = (p: Partial<SmsPart> = {}): Row => ({
  key: nextKey++,
  title: p.title ?? "",
  amount: p.amount ?? "",
  category: p.category ?? null,
  tags: p.tags ?? [],
  person: p.person ?? null,
});
const rowsOf = (parts: Partial<SmsPart>[]) => {
  const rows = parts.map(row);
  while (rows.length < 2) rows.push(row());
  return rows;
};

function resolve(rows: Row[], total: number): { parts: SmsPart[]; left: number; blanks: number } {
  const blanks = rows.filter((r) => !r.amount.trim()).length;
  const set = rows.reduce((a, r) => a + (r.amount.trim() ? paise(r.amount) : 0), 0);
  const rest = total - set;
  const parts = rows.map((r) => ({
    title: r.title.trim(),
    amount: ((r.amount.trim() ? paise(r.amount) : blanks === 1 ? rest : 0) / 100).toFixed(2),
    category: r.category,
    tags: r.tags,
    person: r.person,
  }));
  return { parts, left: blanks === 1 ? 0 : rest, blanks };
}

export function SplitPartsSheet({
  visible,
  onClose,
  totalPaise,
  txType,
  initialParts,
  aiEnabled,
  onAI,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  totalPaise: number;
  txType: "expense" | "income";
  /** Starting parts; padded to two rows. Read each time the sheet opens. */
  initialParts: Partial<SmsPart>[];
  aiEnabled: boolean;
  onAI?: (text: string) => Promise<SmsPart[]>;
  onConfirm: (parts: SmsPart[]) => Promise<void>;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const find = useSmsLookups();
  const [rows, setRows] = useState<Row[]>(() => rowsOf(initialParts));
  const [aiText, setAiText] = useState("");
  const [busy, setBusy] = useState<"ai" | "save" | null>(null);
  const [picking, setPicking] = useState<{ key: number; what: "category" | "tags" | "person" } | null>(null);

  useEffect(() => {
    if (visible) setRows(rowsOf(initialParts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const { parts, left, blanks } = useMemo(() => resolve(rows, totalPaise), [rows, totalPaise]);
  const badAmount = parts.some((p) => paise(p.amount) <= 0);
  const missingCategory = parts.some((p) => !p.category);
  const canConfirm = rows.length >= 2 && left === 0 && blanks <= 1 && !badAmount && !missingCategory;
  const update = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const pickingRow = picking ? rows.find((r) => r.key === picking.key) : undefined;

  const runAI = async () => {
    if (!onAI) return;
    setBusy("ai");
    try {
      setRows(rowsOf(await onAI(aiText)));
    } catch (err: any) {
      showAlert({ title: "AI couldn't split it", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusy(null);
    }
  };

  const confirm = async () => {
    setBusy("save");
    try {
      await onConfirm(parts.map((p, i) => ({ ...p, title: p.title || `Part ${i + 1}` })));
      onClose();
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusy(null);
    }
  };

  const status =
    left > 0 ? `${money(left)} left to assign` : left < 0 ? `${money(-left)} too much` : blanks > 1 ? "Leave only one amount blank" : null;
  const chip = "flex-row items-center gap-1.5 rounded-xl px-3 bg-surface-high";

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
            <Text className="text-[17px] font-bold text-on-surface flex-1">Split {money(totalPaise)}</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
              <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, gap: 12 }}>
            <Text className="text-[13px] text-on-surface-variant">
              One transaction per part, all with the same date, account and reference. Leave one amount blank to give it the
              rest.
            </Text>

            {aiEnabled && onAI && (
              <View style={{ gap: 8 }}>
                <MentionInput
                  value={aiText}
                  onChange={setAiText}
                  placeholder="e.g. 7000 rent, rest electricity"
                  editable={busy === null}
                  minHeight={56}
                  maxHeight={120}
                  maxLength={1000}
                />
                <TouchableOpacity
                  onPress={runAI}
                  disabled={busy !== null}
                  activeOpacity={0.8}
                  className="flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
                  style={{ backgroundColor: `${C.primary}1f` }}
                >
                  {busy === "ai" ? <ActivityIndicator size="small" color={C.primary} /> : <DynamicIcon name="sparkles" size={15} color={C.primary} />}
                  <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
                    Split with AI
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {rows.map((r, i) => {
              const isRest = !r.amount.trim() && blanks === 1;
              const cat = find.category(r.category);
              const tags = find.tags(r.tags);
              const person = find.person(r.person);
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
                        placeholder={isRest ? (paise(parts[i].amount) / 100).toFixed(2) : "0.00"}
                        placeholderTextColor={C.onSurfaceVariant}
                        keyboardType="decimal-pad"
                        className="flex-1 text-[14px] text-on-surface"
                      />
                    </View>
                    <TouchableOpacity onPress={() => setPicking({ key: r.key, what: "category" })} activeOpacity={0.8} className={`flex-1 ${chip}`} style={{ height: 40 }}>
                      <DynamicIcon name={cat?.icon ?? "shapes"} size={15} color={cat?.color ?? C.onSurfaceVariant} />
                      <Text className="flex-1 text-[13px]" numberOfLines={1} style={{ color: cat ? C.onSurface : C.onSurfaceVariant }}>
                        {cat?.name ?? "Category"}
                      </Text>
                      <DynamicIcon name="chevron-down" size={14} color={C.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={() => setPicking({ key: r.key, what: "tags" })} activeOpacity={0.8} className={`flex-1 ${chip}`} style={{ height: 34 }}>
                      <DynamicIcon name="tag" size={13} color={C.onSurfaceVariant} />
                      <Text className="flex-1 text-[12px]" numberOfLines={1} style={{ color: tags.length ? C.onSurface : C.onSurfaceVariant }}>
                        {tags.length ? tags.map((t) => t.name).join(", ") : "Tags"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPicking({ key: r.key, what: "person" })} activeOpacity={0.8} className={`flex-1 ${chip}`} style={{ height: 34 }}>
                      <DynamicIcon name="user" size={13} color={C.onSurfaceVariant} />
                      <Text className="flex-1 text-[12px]" numberOfLines={1} style={{ color: person ? C.onSurface : C.onSurfaceVariant }}>
                        {person?.name ?? "Person"}
                      </Text>
                      {person && (
                        <TouchableOpacity onPress={() => update(r.key, { person: null })} hitSlop={8} accessibilityLabel="Remove person">
                          <DynamicIcon name="x" size={12} color={C.onSurfaceVariant} />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                  {isRest && <Text className="text-[11px] text-on-surface-variant">Gets the rest: {money(paise(parts[i].amount))}</Text>}
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
              disabled={!canConfirm || busy !== null}
              activeOpacity={0.85}
              className="flex-row items-center justify-center gap-2 rounded-xl py-3"
              style={{ backgroundColor: C.primaryBright, opacity: canConfirm && busy === null ? 1 : 0.5 }}
            >
              {busy === "save" && <ActivityIndicator size="small" color="#fff" />}
              <Text className="text-[15px] font-semibold" style={{ color: "#fff" }}>
                Save {rows.length} transactions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalKeyboardView>

      <CategoryPickerSheet
        visible={picking?.what === "category"}
        onClose={() => setPicking(null)}
        selectedId={pickingRow?.category ?? null}
        onSelect={(c) => picking && update(picking.key, { category: c.id })}
        txType={txType}
      />
      <TagPickerSheet
        visible={picking?.what === "tags"}
        onClose={() => setPicking(null)}
        selectedIds={pickingRow?.tags ?? []}
        onApply={(tags) => picking && update(picking.key, { tags: tags.map((t) => t.id) })}
      />
      <PersonPickerSheet
        visible={picking?.what === "person"}
        onClose={() => setPicking(null)}
        selectedId={pickingRow?.person ?? null}
        onSelect={(p) => picking && update(picking.key, { person: p?.id ?? null })}
      />
    </Modal>
  );
}
