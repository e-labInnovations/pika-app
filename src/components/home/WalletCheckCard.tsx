import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { formValuesToMutationInput, type TxFormValues } from "../transaction/TransactionForm";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import { usePendingAIPrefill } from "../../context/AIPrefillBridgeContext";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useGetCategories } from "../../services/gql/categories/categories.service";
import { useCreateTransaction } from "../../services/gql/transactions/transactions.service";
import type { AccountFieldsFragment } from "../../services/gql/types/graphql";

// Accounts holding cash: nothing (no bank SMS) tells Pika when their balance drifts.
const CASH = /wallet|cash|purse/i;
const EVERY_MS = 30 * 86_400_000;
const SNOOZE_MS = 3 * 86_400_000;
const key = (accountId: string) => `cash_check_${accountId}`;

/** Once a month: "how much cash do you have?" for wallet accounts, adding an adjustment for the difference. */
export function WalletCheckCard() {
  const C = useColors();
  const fmt = useFormatMoney();
  const { accounts } = useGetAccounts({ limit: 100 });
  const { categories } = useGetCategories({ limit: 500, sort: "name" });
  const { createTransaction } = useCreateTransaction();
  const { setPending: setPrefill } = usePendingAIPrefill();
  // Account id → time it may be asked about again.
  const [nextAsk, setNextAsk] = useState<Record<string, number> | null>(null);
  const [counted, setCounted] = useState("");
  const [saving, setSaving] = useState(false);

  const wallets = (accounts ?? []).filter((a) => a.isActive !== false && !a.smsIdentifiers && CASH.test(a.name));

  useEffect(() => {
    if (!wallets.length) return;
    Promise.all(wallets.map((w) => SecureStore.getItemAsync(key(w.id)).catch(() => null))).then((vals) =>
      setNextAsk(Object.fromEntries(wallets.map((w, i) => [w.id, vals[i] ? Number(vals[i]) : 0]))),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets.map((w) => w.id).join(",")]);

  const wallet = nextAsk ? wallets.find((w) => (nextAsk[w.id] ?? 0) <= Date.now()) : undefined;
  if (!wallet) return null;
  const pika = wallet.balance ?? 0;

  const later = async (account: AccountFieldsFragment, ms: number) => {
    const at = Date.now() + ms;
    setNextAsk((n) => ({ ...(n ?? {}), [account.id]: at }));
    setCounted("");
    await SecureStore.setItemAsync(key(account.id), String(at)).catch(() => {});
  };

  const save = async () => {
    const actual = parseFloat(counted.replace(/,/g, ""));
    if (!Number.isFinite(actual) || actual < 0) {
      showAlert({ title: "Enter the cash you have", message: "A number, e.g. 1250" });
      return;
    }
    const diff = Math.round((actual - pika) * 100) / 100;
    if (Math.abs(diff) < 0.01) return later(wallet, EVERY_MS);

    const type = diff > 0 ? "income" : "expense";
    const category =
      (categories ?? []).find((c) => c.type === type && c.parent && /^(other|misc)/i.test(c.name)) ?? null;
    const values: TxFormValues = {
      title: "Cash adjustment",
      amount: Math.abs(diff).toFixed(2),
      date: new Date(),
      type,
      category,
      account: wallet,
      toAccount: null,
      person: null,
      shares: [],
      tags: [],
      note: `Counted ${actual.toFixed(2)}, Pika had ${pika.toFixed(2)}`,
      existingAttachments: [],
    };
    if (!category) {
      // No "Other" category to file it under: let the user pick one.
      setPrefill({ values });
      await later(wallet, EVERY_MS);
      router.push("/add");
      return;
    }
    setSaving(true);
    try {
      await createTransaction({ data: formValuesToMutationInput(values, []) });
      await later(wallet, EVERY_MS);
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-3">
      <View className="flex-row items-center gap-2">
        <DynamicIcon name="wallet" size={15} color={C.primaryBright} />
        <Text className="flex-1 text-[14px] font-semibold text-on-surface">Count your cash</Text>
        <TouchableOpacity onPress={() => later(wallet, SNOOZE_MS)} hitSlop={10} accessibilityLabel="Later">
          <DynamicIcon name="x" size={16} color={C.outlineVariant} />
        </TouchableOpacity>
      </View>
      <Text className="text-[13px] text-on-surface-variant">
        Pika says {wallet.name} has <Text className="font-semibold text-on-surface">{fmt(pika)}</Text>. How much do
        you have?
      </Text>
      <View className="flex-row gap-2">
        <TextInput
          value={counted}
          onChangeText={setCounted}
          placeholder={pika.toFixed(0)}
          placeholderTextColor={C.onSurfaceVariant}
          keyboardType="decimal-pad"
          className="flex-1 rounded-xl bg-surface px-3 py-2.5 text-[15px] text-on-surface"
        />
        {counted.trim() ? (
          <TouchableOpacity
            onPress={save}
            disabled={saving}
            activeOpacity={0.8}
            className="px-4 rounded-xl items-center justify-center"
            style={{ backgroundColor: C.primaryBright }}
          >
            {saving ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-[14px] font-semibold text-white">Save</Text>}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => later(wallet, EVERY_MS)}
            activeOpacity={0.8}
            className="px-4 rounded-xl items-center justify-center"
            style={{ backgroundColor: `${C.primary}1f` }}
          >
            <Text className="text-[14px] font-semibold" style={{ color: C.primary }}>
              It matches
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {counted.trim() !== "" && Number.isFinite(parseFloat(counted)) && Math.abs(parseFloat(counted) - pika) >= 0.01 && (
        <Text className="text-[12px] text-on-surface-variant">
          Adds a {fmt(Math.abs(parseFloat(counted) - pika))} cash adjustment ({parseFloat(counted) > pika ? "money in" : "spent"}).
        </Text>
      )}
    </View>
  );
}
