import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { showAlert } from "@/components/ui/AlertDialog";
import {
  TransactionForm,
  formValuesToMutationInput,
  type TxFormValues,
} from "@/components/transaction/TransactionForm";
import { AIAssistantSheet } from "@/components/transaction/AIAssistantSheet";
import { useCreateTransaction } from "@/services/gql/transactions/transactions.service";
import { useGetPerson } from "@/services/gql/people/people.service";
import { useCreateTransactionLink } from "@/services/gql/transaction-links/transaction-links.service";
import { TransactionLink_type_MutationInput } from "@/services/gql/types/graphql";
import { usePendingShare } from "@/context/ShareIntentBridgeContext";
import { usePendingAIPrefill } from "@/context/AIPrefillBridgeContext";
import type { TxType } from "@/components/transaction/CategoryPickerSheet";

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
  shares: [],
  tags: [],
  note: "",
  existingAttachments: [],
});

export default function AddTransactionScreen() {
  const { createTransaction, loading } = useCreateTransaction();
  const [formKey, setFormKey] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrefill, setAiPrefill] = useState<Partial<TxFormValues> | null>(
    null,
  );
  const [aiSeedImage, setAiSeedImage] = useState<{
    uri: string;
    mimeType: string;
    filename: string;
  } | null>(null);
  const [aiInitialText, setAiInitialText] = useState<string | undefined>();
  const [aiInitialImage, setAiInitialImage] = useState<
    { uri: string; base64: string; mimeType: string } | undefined
  >();
  const [pendingPromptId, setPendingPromptId] = useState<string | undefined>();

  const { pending, clearPending } = usePendingShare();
  const { pending: pendingAIPrefill, clearPending: clearAIPrefill } =
    usePendingAIPrefill();

  // Auto-open AI sheet when a share intent arrives
  useEffect(() => {
    if (!pending) return;
    if (pending.type === "text") {
      setAiInitialText(pending.text);
      setAiInitialImage(undefined);
    } else {
      setAiInitialImage({
        uri: pending.uri,
        base64: pending.base64,
        mimeType: pending.mimeType,
      });
      setAiInitialText(undefined);
    }
    clearPending();
    setAiOpen(true);
  }, [pending]);

  // Pick up AI-parsed data that the Home screen's AI Assistant parked in the
  // bridge before navigating here (the "Review" flow). Apply as prefill then
  // clear so a subsequent navigation to /add starts fresh.
  useEffect(() => {
    if (!pendingAIPrefill) return;
    setAiPrefill(pendingAIPrefill.values);
    setPendingPromptId(pendingAIPrefill.promptId);
    const img = pendingAIPrefill.image;
    setAiSeedImage(
      img
        ? {
            uri: img.uri,
            mimeType: img.mimeType,
            filename: `receipt-${Date.now()}.jpg`,
          }
        : null,
    );
    setFormKey((k) => k + 1);
    clearAIPrefill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAIPrefill]);

  const { personId, type, amount, linkTo } = useLocalSearchParams<{
    personId?: string;
    type?: string;
    amount?: string;
    /** Comma-separated shared-expense ids this payback settles (from the person page) */
    linkTo?: string;
  }>();
  const { createLink } = useCreateTransactionLink();

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

  const handleSubmit = async (
    values: TxFormValues,
    attachmentIds: string[],
  ) => {
    try {
      const res = await createTransaction(
        { data: formValuesToMutationInput(values, attachmentIds) },
        pendingPromptId,
      );
      // A payback started from "Owes you for": link it to the shares it pays back
      const newId = res.data?.createTransaction?.id;
      const targets = (linkTo ?? "").split(",").filter(Boolean);
      if (newId && values.type === "income" && targets.length) {
        try {
          for (const to of targets) {
            await createLink({ from: newId, to, type: TransactionLink_type_MutationInput.repaid });
          }
        } catch (err: any) {
          showAlert({
            title: "Saved, but not linked",
            message: `The payback was saved, but linking it to the shared payment failed: ${err?.message ?? "unknown error"}. Link it from the transaction screen.`,
          });
        }
      }
      setFormKey((k) => k + 1);
      setAiPrefill(null);
      setAiSeedImage(null);
      setPendingPromptId(undefined);
      router.replace("/transactions");
    } catch (err: any) {
      showAlert({
        title: "Error",
        message: err?.message ?? "Could not save transaction.",
      });
    }
  };

  const handleAIUseDetails = (
    values: Partial<TxFormValues>,
    image?: { uri: string; base64: string; mimeType: string },
    promptId?: string,
  ) => {
    setAiPrefill(values);
    setPendingPromptId(promptId);
    setAiSeedImage(
      image
        ? {
            uri: image.uri,
            mimeType: image.mimeType,
            filename: `receipt-${Date.now()}.jpg`,
          }
        : null,
    );
    setFormKey((k) => k + 1);
  };

  return (
    <>
      <TransactionForm
        key={formKey}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => {
          setAiPrefill(null);
          setAiSeedImage(null);
          router.replace("/transactions");
        }}
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
        onCreated={() => router.replace("/transactions")}
        initialText={aiInitialText}
        initialImage={aiInitialImage}
      />
    </>
  );
}
