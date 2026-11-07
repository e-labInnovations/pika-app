/**
 * "Split" on a saved transaction: opens the parts editor; the transaction stays as the
 * first part and the rest are new transactions with the same date, account and reference.
 * Hidden for transfers and for transactions with friends' shares (the server refuses them).
 */
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { DynamicIcon } from "../Icon";
import { useAiEnabled } from "../sms/SmsRefineSheet";
import { SplitPartsSheet, paise } from "./SplitPartsSheet";
import { useSplitTransaction } from "../../services/gql/sms/sms.service";
import type { TransactionFieldsFragment } from "../../services/gql/types/graphql";
import { useColors } from "../../theme/colors";

export function TransactionSplitButton({ tx }: { tx: TransactionFieldsFragment }) {
  const C = useColors();
  const [open, setOpen] = useState(false);
  const aiEnabled = useAiEnabled();
  const { splitTransaction, splitTransactionWithAI } = useSplitTransaction();
  if (tx.type === "transfer" || (tx.shares?.length ?? 0) > 0) return null;

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.75}
        className="flex-row items-center justify-center gap-1.5 rounded-xl py-3"
        style={{ backgroundColor: `${C.primary}1f` }}
      >
        <DynamicIcon name="split" size={15} color={C.primary} />
        <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
          Split into several transactions
        </Text>
      </TouchableOpacity>
      <SplitPartsSheet
        visible={open}
        onClose={() => setOpen(false)}
        totalPaise={paise(tx.amount)}
        txType={tx.type === "income" ? "income" : "expense"}
        initialParts={[
          {
            title: tx.title,
            category: tx.category?.id ?? null,
            tags: (tx.tags ?? []).map((t) => t.id),
            person: tx.person?.id ?? null,
          },
        ]}
        aiEnabled={aiEnabled}
        onAI={(text) => splitTransactionWithAI(tx.id, text)}
        onConfirm={async (parts) => {
          await splitTransaction(tx.id, parts);
        }}
      />
    </>
  );
}
