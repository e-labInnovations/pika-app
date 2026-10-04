import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { showAlert } from "@/components/ui/AlertDialog";
import { OriginalSms } from "@/components/sms/OriginalSms";
import { TransactionForm, type TxFormValues } from "@/components/transaction/TransactionForm";
import { useGetAccount } from "@/services/gql/accounts/accounts.service";
import { useGetCategory } from "@/services/gql/categories/categories.service";
import { useGetPerson } from "@/services/gql/people/people.service";
import { useGetTags } from "@/services/gql/tags/tags.service";
import { useCapturedSms, useConfirmSms } from "@/services/gql/sms/sms.service";
import { useColors } from "@/theme/colors";

/**
 * Review a pending SMS in the full transaction form, prefilled from what the server
 * parsed and suggested. Saving confirms the SMS (creating the transaction with the
 * bank reference) instead of creating a plain transaction.
 */
export default function ReviewSmsScreen() {
  const C = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sms, loading } = useCapturedSms(id ?? "");
  const { confirmSms, loading: saving } = useConfirmSms();

  const s = sms?.suggestion ?? null;
  const p = sms?.parsed ?? null;
  const account = useGetAccount(sms?.account?.id ?? "");
  const toAccount = useGetAccount(s?.toAccount ?? "");
  const category = useGetCategory(s?.category ?? "");
  const person = useGetPerson(s?.person ?? "");
  const { tags } = useGetTags({ limit: 500, sort: "name" });

  const resolving =
    (sms?.account?.id && !account.data) ||
    (s?.toAccount && !toAccount.data) ||
    (s?.category && !category.data) ||
    (s?.person && !person.data);

  if (!sms || (loading && !sms) || resolving) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator color={C.primary} />
      </View>
    );
  }

  const initialValues: TxFormValues = {
    title: s?.title ?? p?.merchant ?? "",
    amount: p?.amount ? String(parseFloat(p.amount)) : "",
    date: new Date(p?.occurredAt ?? sms.receivedAt),
    type: s?.type ?? p?.type ?? "expense",
    category: category.data ?? null,
    account: account.data ?? null,
    toAccount: toAccount.data ?? null,
    person: person.data ?? null,
    shares: [],
    tags: (tags ?? []).filter((t) => s?.tags?.includes(t.id)),
    note: "",
    existingAttachments: [],
  };

  const handleSubmit = async (values: TxFormValues, attachmentIds: string[]) => {
    try {
      await confirmSms(sms.id, {
        title: values.title,
        type: values.type,
        amount: values.amount,
        date: values.date.toISOString(),
        category: values.category?.id,
        account: values.account?.id,
        toAccount: values.type === "transfer" ? values.toAccount?.id ?? null : null,
        person: values.type === "transfer" ? null : values.person?.id ?? null,
        tags: values.tags.map((t) => t.id),
        shares: values.type === "expense" ? values.shares.map((sh) => ({ person: sh.person.id, amount: sh.amount })) : [],
        // Empty: the server writes a note with the bank reference.
        note: values.note.trim() || undefined,
        attachments: attachmentIds,
      });
      router.back();
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    }
  };

  return (
    <TransactionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      submitLabel="Confirm"
      title="Review SMS"
      saving={saving}
      header={<OriginalSms sms={sms} collapsedLines={6} style={{ backgroundColor: C.surfaceMid }} />}
    />
  );
}
