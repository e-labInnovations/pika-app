import * as DocumentPicker from "expo-document-picker";
import { EncodingType, readAsStringAsync } from "expo-file-system/legacy";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { showAlert } from "@/components/ui/AlertDialog";
import { AccountPickerSheet } from "@/components/transaction/AccountPickerSheet";
import { CategoryPickerSheet } from "@/components/transaction/CategoryPickerSheet";
import { useSmsLookups } from "@/components/sms/preview";
import { useFormatMoney } from "@/lib/format-currency";
import {
  useImportStatementRows,
  useParseStatement,
  type StatementResult,
  type StatementRow,
} from "@/services/gql/statements/statements.service";
import { useColors } from "@/theme/colors";

/** Server error code (APIError data) from an Apollo error, if any. */
function errorCode(err: any): string | null {
  const e = err?.errors?.[0] ?? err?.graphQLErrors?.[0];
  return e?.extensions?.data?.code ?? null;
}

const day = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" });

type Choice = { selected: boolean; category: string | null };

function MissingRow({
  row,
  choice,
  categoryName,
  onToggle,
  onPickCategory,
}: {
  row: StatementRow;
  choice: Choice;
  categoryName: string | null;
  onToggle: () => void;
  onPickCategory: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const income = row.type === "income";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      className="flex-row items-start gap-3 rounded-2xl bg-surface-mid p-3"
    >
      <View
        className="w-5 h-5 mt-0.5 rounded-md items-center justify-center"
        style={{
          backgroundColor: choice.selected ? C.primaryBright : "transparent",
          borderWidth: choice.selected ? 0 : 1.5,
          borderColor: C.outlineVariant,
        }}
      >
        {choice.selected && <DynamicIcon name="check" size={13} color="#fff" />}
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text className="flex-1 text-[14px] font-semibold text-on-surface" numberOfLines={1}>
            {row.suggestion?.title ?? row.particulars}
          </Text>
          <Text className="text-[14px] font-bold" style={{ color: income ? "#10b981" : "#ef4444" }}>
            {income ? "+" : "−"}
            {fmt(parseFloat(row.amount))}
          </Text>
        </View>
        <Text className="text-[11px] text-on-surface-variant" numberOfLines={1}>
          {day(row.date)} · {row.particulars}
        </Text>
        <TouchableOpacity
          onPress={onPickCategory}
          activeOpacity={0.75}
          className="self-start flex-row items-center gap-1 rounded-full px-2.5 py-1"
          style={{ backgroundColor: categoryName ? `${C.primary}1f` : "#f59e0b22" }}
        >
          <DynamicIcon name={categoryName ? "shapes" : "circle-question-mark"} size={12} color={categoryName ? C.primary : "#f59e0b"} />
          <Text className="text-[12px] font-semibold" style={{ color: categoryName ? C.primary : "#f59e0b" }}>
            {categoryName ?? "Pick a category"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Import a bank statement PDF: rows already in Pika are matched (by bank reference, then
 * amount and day); the missing ones can be added in one go. Covers what SMS never shows:
 * salary (NEFT), interest, incoming UPI, UPI Lite.
 */
export default function ImportStatementScreen() {
  const C = useColors();
  const fmt = useFormatMoney();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const find = useSmsLookups();
  const { parseStatement, loading: parsing } = useParseStatement();
  const { importRows, loading: importing } = useImportStatementRows();

  const [file, setFile] = useState<{ name: string; base64: string } | null>(null);
  const [password, setPassword] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);
  const [result, setResult] = useState<StatementResult | null>(null);
  const [choices, setChoices] = useState<Record<number, Choice>>({});
  const [showMatched, setShowMatched] = useState(false);
  const [accountPicker, setAccountPicker] = useState(false);
  const [categoryFor, setCategoryFor] = useState<StatementRow | null>(null);

  const missing = useMemo(() => result?.rows.filter((r) => !r.match) ?? [], [result]);
  const matched = useMemo(() => result?.rows.filter((r) => r.match) ?? [], [result]);
  const ready = missing.filter((r) => choices[r.index]?.selected && choices[r.index]?.category);

  const pick = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
    if (res.canceled) return;
    const asset = res.assets[0];
    try {
      const base64 = await readAsStringAsync(asset.uri, { encoding: EncodingType.Base64 });
      setFile({ name: asset.name, base64 });
      setResult(null);
    } catch {
      showAlert({ title: "Error", message: "Could not read the PDF." });
    }
  };

  const analyze = async (account?: string) => {
    if (!file) return;
    try {
      const r = await parseStatement(file.base64, password, account);
      setResult(r);
      setNeedsPassword(false);
      // Rows with a suggested category start selected.
      setChoices(
        Object.fromEntries(
          r.rows.filter((x) => !x.match).map((x) => [x.index, { selected: !!x.suggestion?.category, category: x.suggestion?.category ?? null }]),
        ),
      );
    } catch (err: any) {
      const code = errorCode(err);
      if (code === "pdf_password_required" || code === "pdf_password_wrong") setNeedsPassword(true);
      showAlert({ title: "Could not read statement", message: err?.message ?? "Something went wrong." });
    }
  };

  const runImport = async () => {
    if (!result?.account || !ready.length) return;
    try {
      const ids = await importRows(
        result.account,
        ready.map((r) => ({
          date: r.date,
          amount: r.amount,
          type: r.type,
          title: r.suggestion?.title ?? r.particulars,
          category: choices[r.index].category!,
          tags: r.suggestion?.tags ?? [],
          person: r.suggestion?.person ?? null,
          ref: r.ref,
          particulars: r.particulars,
        })),
      );
      showAlert({ title: "Imported", message: `${ids.length} transaction${ids.length === 1 ? "" : "s"} added.` });
      await analyze(result.account);
    } catch (err: any) {
      showAlert({ title: "Import failed", message: err?.message ?? "Something went wrong." });
    }
  };

  const accountName = result?.account ? find.account(result.account)?.name ?? "Account" : null;

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
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">Import statement</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120, gap: 12 }} keyboardShouldPersistTaps="handled">
        <View className="rounded-2xl bg-surface-mid p-4 gap-3">
          <Text className="text-[12px] text-on-surface-variant leading-[17px]">
            Federal Bank account statement PDF. Rows already in Pika are matched; you pick which missing ones to add.
            Useful for what SMS never show: salary, interest, money received by UPI.
          </Text>
          <TouchableOpacity
            onPress={pick}
            activeOpacity={0.75}
            className="flex-row items-center gap-3 rounded-xl p-3"
            style={{ backgroundColor: `${C.primary}14` }}
          >
            <DynamicIcon name="file-text" size={18} color={C.primary} />
            <Text className="flex-1 text-[14px] font-semibold" style={{ color: C.primary }} numberOfLines={1}>
              {file ? file.name : "Choose statement PDF"}
            </Text>
          </TouchableOpacity>
          {file && (
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={needsPassword ? "PDF password (required)" : "PDF password, if it has one"}
              placeholderTextColor={needsPassword ? "#f59e0b" : C.onSurfaceVariant}
              secureTextEntry
              autoCapitalize="none"
              className="rounded-xl bg-surface px-3 py-2.5 text-[14px] text-on-surface"
            />
          )}
          {file && (
            <TouchableOpacity
              onPress={() => analyze(result?.account ?? undefined)}
              disabled={parsing}
              activeOpacity={0.8}
              className="flex-row items-center justify-center gap-2 rounded-xl py-3"
              style={{ backgroundColor: C.primaryBright }}
            >
              {parsing && <ActivityIndicator size="small" color="#fff" />}
              <Text className="text-[14px] font-semibold text-white">{parsing ? "Reading…" : "Check against Pika"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {result && (
          <View className="rounded-2xl bg-surface-mid p-4 gap-2">
            <TouchableOpacity onPress={() => setAccountPicker(true)} className="flex-row items-center gap-2">
              <DynamicIcon name="wallet" size={15} color={C.onSurfaceVariant} />
              <Text className="flex-1 text-[14px] font-semibold text-on-surface">
                {accountName ?? "Pick the Pika account"}
              </Text>
              <Text className="text-[12px]" style={{ color: C.primary }}>
                Change
              </Text>
            </TouchableOpacity>
            <Text className="text-[12px] text-on-surface-variant">
              {result.from && result.to ? `${day(result.from)} – ${day(result.to)} · ` : ""}
              {result.rows.length} rows · {matched.length} already in Pika ·{" "}
              <Text style={{ color: missing.length ? "#f59e0b" : "#10b981", fontWeight: "700" }}>
                {missing.length} missing
              </Text>
            </Text>
            {result.closingBalance != null && (
              <Text className="text-[12px] text-on-surface-variant">Closing balance {fmt(result.closingBalance)}</Text>
            )}
          </View>
        )}

        {result && !result.account && (
          <Text className="text-[12px] px-1" style={{ color: "#f59e0b" }}>
            No account has SMS identifier ending {result.accountNumber?.slice(-4)}. Pick the account above to match rows.
          </Text>
        )}

        {result && result.account && missing.length === 0 && (
          <View className="items-center py-8 gap-2">
            <DynamicIcon name="circle-check" size={28} color="#10b981" />
            <Text className="text-[15px] font-semibold text-on-surface">Everything is in Pika</Text>
          </View>
        )}

        {result?.account &&
          missing.map((r) => (
            <MissingRow
              key={r.index}
              row={r}
              choice={choices[r.index] ?? { selected: false, category: null }}
              categoryName={find.category(choices[r.index]?.category)?.name ?? null}
              onToggle={() =>
                setChoices((c) => ({ ...c, [r.index]: { ...c[r.index], selected: !c[r.index]?.selected } }))
              }
              onPickCategory={() => setCategoryFor(r)}
            />
          ))}

        {result?.account && matched.length > 0 && (
          <TouchableOpacity onPress={() => setShowMatched((v) => !v)} className="flex-row items-center gap-2 px-1 py-2">
            <DynamicIcon name={showMatched ? "chevron-down" : "chevron-right"} size={14} color={C.onSurfaceVariant} />
            <Text className="text-[13px] text-on-surface-variant">{matched.length} rows already in Pika</Text>
          </TouchableOpacity>
        )}
        {showMatched &&
          matched.map((r) => (
            <View key={r.index} className="flex-row items-center gap-2 px-1">
              <DynamicIcon name="check" size={12} color="#10b981" />
              <Text className="flex-1 text-[12px] text-on-surface-variant" numberOfLines={1}>
                {day(r.date)} · {r.match!.title}
              </Text>
              <Text className="text-[12px] text-on-surface-variant">
                {r.type === "income" ? "+" : "−"}
                {fmt(parseFloat(r.amount))}
              </Text>
            </View>
          ))}
      </ScrollView>

      {result?.account && missing.length > 0 && (
        <View className="absolute left-0 right-0 bottom-0 px-4 pt-3 bg-surface" style={{ paddingBottom: insets.bottom + 12 }}>
          <TouchableOpacity
            onPress={runImport}
            disabled={!ready.length || importing}
            activeOpacity={0.8}
            className="flex-row items-center justify-center gap-2 rounded-xl py-3.5"
            style={{ backgroundColor: ready.length ? C.primaryBright : `${C.outlineVariant}55` }}
          >
            {importing && <ActivityIndicator size="small" color="#fff" />}
            <Text className="text-[15px] font-semibold text-white">
              {ready.length ? `Add ${ready.length} transaction${ready.length === 1 ? "" : "s"}` : "Select rows with a category"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <AccountPickerSheet
        visible={accountPicker}
        onClose={() => setAccountPicker(false)}
        selectedId={result?.account ?? null}
        onSelect={(a) => {
          setAccountPicker(false);
          analyze(a.id);
        }}
      />
      <CategoryPickerSheet
        visible={!!categoryFor}
        onClose={() => setCategoryFor(null)}
        selectedId={categoryFor ? choices[categoryFor.index]?.category ?? null : null}
        txType={categoryFor?.type}
        onSelect={(cat) => {
          const r = categoryFor!;
          setChoices((c) => ({ ...c, [r.index]: { selected: true, category: cat.id } }));
          setCategoryFor(null);
        }}
      />
    </View>
  );
}
