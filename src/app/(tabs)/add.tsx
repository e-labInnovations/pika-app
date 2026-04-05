import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  TransactionForm,
  formValuesToMutationInput,
  type TxFormValues,
} from "../../components/transaction/TransactionForm";
import { AIAssistantSheet } from "../../components/transaction/AIAssistantSheet";
import { useCreateTransaction } from "../../services/gql/transactions/transactions.service";
import { useGetPerson } from "../../services/gql/people/people.service";
import type { TxType } from "../../components/transaction/CategoryPickerSheet";

const DEFAULT_FORM_VALUES = (
  type: TxType,
  amount: string,
  person: TxFormValues["person"],
): TxFormValues => ({
  title: "",
  amount,
  date: new Date(),
  type,
  category: null,
  account: null,
  toAccount: null,
  person,
  tags: [],
  note: "",
  existingAttachments: [],
});

export default function AddTransactionScreen() {
  const { createTransaction, loading } = useCreateTransaction();
  const [formKey, setFormKey] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrefill, setAiPrefill] = useState<Partial<TxFormValues> | null>(null);
  const [aiSeedImage, setAiSeedImage] = useState<{ uri: string; mimeType: string; filename: string } | null>(null);

  const { personId, type, amount } = useLocalSearchParams<{
    personId?: string;
    type?: string;
    amount?: string;
  }>();

  // Will use Apollo cache instantly if person page was visited — skip: !personId
  const { data: prefillPerson } = useGetPerson(personId ?? "");

  const baseValues = DEFAULT_FORM_VALUES(
    (type as TxType | undefined) ?? "expense",
    amount ?? "",
    prefillPerson ?? null,
  );

  const initialValues: TxFormValues = aiPrefill
    ? { ...baseValues, ...aiPrefill, existingAttachments: [] }
    : baseValues;

  const handleSubmit = async (values: TxFormValues, attachmentIds: string[]) => {
    try {
      await createTransaction({ data: formValuesToMutationInput(values, attachmentIds) });
      setFormKey((k) => k + 1);
      setAiPrefill(null);
      setAiSeedImage(null);
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Could not save transaction.");
    }
  };

  const handleAIUseDetails = (values: Partial<TxFormValues>, image?: { uri: string; base64: string; mimeType: string }) => {
    setAiPrefill(values);
    setAiSeedImage(image ? { uri: image.uri, mimeType: image.mimeType, filename: `receipt-${Date.now()}.jpg` } : null);
    setFormKey((k) => k + 1);
  };

  return (
    <>
      <TransactionForm
        key={formKey}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => { setAiPrefill(null); setAiSeedImage(null); router.back(); }}
        submitLabel="Save Transaction"
        title="Add Transaction"
        saving={loading}
        onAIPress={() => setAiOpen(true)}
        seedAttachments={aiSeedImage ? [aiSeedImage] : undefined}
      />
      <AIAssistantSheet
        visible={aiOpen}
        onClose={() => setAiOpen(false)}
        onUseDetails={handleAIUseDetails}
      />
    </>
  );
}
