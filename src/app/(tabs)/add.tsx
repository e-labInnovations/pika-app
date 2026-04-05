import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  TransactionForm,
  formValuesToMutationInput,
  type TxFormValues,
} from "../../components/transaction/TransactionForm";
import { useCreateTransaction } from "../../services/gql/transactions/transactions.service";
import { useGetPerson } from "../../services/gql/people/people.service";
import type { TxType } from "../../components/transaction/CategoryPickerSheet";

export default function AddTransactionScreen() {
  const { createTransaction, loading } = useCreateTransaction();
  const [formKey, setFormKey] = useState(0);

  const { personId, type, amount } = useLocalSearchParams<{
    personId?: string;
    type?: string;
    amount?: string;
  }>();

  // Will use Apollo cache instantly if person page was visited — skip: !personId
  const { data: prefillPerson } = useGetPerson(personId ?? "");

  const initialValues: TxFormValues = {
    title: "",
    amount: amount ?? "",
    date: new Date(),
    type: (type as TxType | undefined) ?? "expense",
    category: null,
    account: null,
    toAccount: null,
    person: prefillPerson ?? null,
    tags: [],
    note: "",
    existingAttachments: [],
  };

  const handleSubmit = async (values: TxFormValues, attachmentIds: string[]) => {
    try {
      await createTransaction({ data: formValuesToMutationInput(values, attachmentIds) });
      setFormKey((k) => k + 1); // force form remount → clears all state
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Could not save transaction.");
    }
  };

  return (
    <TransactionForm
      key={formKey}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      submitLabel="Save Transaction"
      title="Add Transaction"
      saving={loading}
    />
  );
}
