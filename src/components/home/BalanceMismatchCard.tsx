import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import { usePendingAIPrefill } from "../../context/AIPrefillBridgeContext";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useBalanceMismatches } from "../../services/gql/sms/sms.service";
import type { GetBalanceChecksQuery } from "../../services/gql/types/graphql";

type Mismatch = GetBalanceChecksQuery["balanceChecks"][number];

// SMS ids whose mismatch the user hid; a newer SMS balance brings the row back.
const HIDDEN_KEY = "balance_check_hidden";
const AMBER = "#f59e0b";

const when = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

function MismatchRow({ m, onFind, onAdd }: { m: Mismatch; onFind: () => void; onAdd: () => void }) {
  const C = useColors();
  const fmt = useFormatMoney();
  // Bank has more than Pika → money in is missing; bank has less → a spend is missing.
  const label = m.difference > 0 ? "more in bank" : "less in bank";

  return (
    <View className="gap-2">
      <View className="flex-row items-baseline gap-2">
        <Text className="flex-1 text-[15px] font-bold text-on-surface" numberOfLines={1}>
          {m.accountName ?? "Account"}
        </Text>
        <Text className="text-[15px] font-extrabold" style={{ color: AMBER }}>
          {fmt(Math.abs(m.difference))}
        </Text>
        <Text className="text-[12px] text-on-surface-variant">{label}</Text>
      </View>
      <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
        Bank {fmt(m.bankBalance)} · Pika {fmt(m.pikaBalance)}
      </Text>
      <Text className="text-[12px] text-on-surface-variant">
        {m.lastMatchedAt ? `Matched until ${when(m.lastMatchedAt)}` : `As of ${when(m.asOf)}`}
      </Text>
      <View className="flex-row gap-2 pt-1">
        <TouchableOpacity
          onPress={onFind}
          activeOpacity={0.75}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
          style={{ backgroundColor: `${C.primary}1f` }}
        >
          <DynamicIcon name="search" size={14} color={C.primary} />
          <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
            Find it
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAdd}
          activeOpacity={0.75}
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
          style={{ backgroundColor: C.primaryBright }}
        >
          <DynamicIcon name="plus" size={14} color="#fff" />
          <Text className="text-[13px] font-semibold" style={{ color: "#fff" }}>
            Add difference
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** One card listing accounts whose latest bank SMS balance disagrees with Pika at that time. */
export function BalanceMismatchCard() {
  const C = useColors();
  const { mismatches } = useBalanceMismatches();
  const { accounts } = useGetAccounts({ limit: 100 });
  const { setPending: setPrefill } = usePendingAIPrefill();
  const [hidden, setHidden] = useState<string[] | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(HIDDEN_KEY)
      .then((v) => setHidden(v ? JSON.parse(v) : []))
      .catch(() => setHidden([]));
  }, []);

  if (!hidden) return null;
  const visible = mismatches.filter((m) => !hidden.includes(m.sms));
  if (!visible.length) return null;

  const hideAll = () => {
    // Keep only ids still reported, so the list doesn't grow forever.
    const next = [...hidden.filter((id) => mismatches.some((m) => m.sms === id)), ...visible.map((m) => m.sms)];
    setHidden(next);
    SecureStore.setItemAsync(HIDDEN_KEY, JSON.stringify(next)).catch(() => {});
  };

  const find = (m: Mismatch) =>
    router.push({
      pathname: "/transactions",
      params: {
        accountId: m.account,
        ...(m.lastMatchedAt ? { dateFrom: m.lastMatchedAt, dateTo: new Date().toISOString() } : {}),
      },
    });

  const add = (m: Mismatch) => {
    setPrefill({
      values: {
        title: "Balance adjustment",
        amount: Math.abs(m.difference).toFixed(2),
        type: m.difference > 0 ? "income" : "expense",
        date: new Date(m.asOf),
        account: accounts?.find((a) => a.id === m.account) ?? null,
        note: `Bank balance ${m.bankBalance.toFixed(2)} vs Pika ${m.pikaBalance.toFixed(2)}`,
      },
    });
    router.push("/add");
  };

  return (
    <View className="rounded-2xl bg-surface-mid p-4 gap-4">
      <View className="flex-row items-center gap-2.5">
        <View className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: `${AMBER}22` }}>
          <DynamicIcon name="triangle-alert" size={16} color={AMBER} />
        </View>
        <Text className="flex-1 text-[14px] font-semibold text-on-surface">Balances don&apos;t match</Text>
        <TouchableOpacity onPress={hideAll} hitSlop={10} accessibilityLabel="Hide until the next bank SMS">
          <DynamicIcon name="x" size={16} color={C.outlineVariant} />
        </TouchableOpacity>
      </View>
      {visible.map((m, i) => (
        <View key={m.account} className="gap-4">
          {i > 0 && <View className="h-px" style={{ backgroundColor: `${C.outlineVariant}44` }} />}
          <MismatchRow m={m} onFind={() => find(m)} onAdd={() => add(m)} />
        </View>
      ))}
    </View>
  );
}
