import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { showAlert } from "../../../../components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { DynamicIcon } from "../../../../components/Icon";
import { TransactionForm, formValuesToUpdateInput, type TxFormValues } from "../../../../components/transaction/TransactionForm";
import {
  useGetTransaction,
  useUpdateTransaction,
} from "../../../../services/gql/transactions/transactions.service";
import {
  Transaction_type,
  type CategoryFieldsFragment,
  type AccountFieldsFragment,
  type PersonFieldsFragment,
  type TagFieldsFragment,
} from "../../../../services/gql/types/graphql";
import { useColors } from "../../../../theme/colors";

// Map stored Transaction_type → TxType
function toTxType(t: Transaction_type): "expense" | "income" | "transfer" {
  if (t === Transaction_type.income) return "income";
  if (t === Transaction_type.transfer) return "transfer";
  return "expense";
}

function EditTransactionSkeleton() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      {/* Header */}
      <View style={{ paddingTop: topPad, paddingHorizontal: 20, paddingBottom: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Skeleton width={36} height={36} radius={18} />
          <Skeleton width={160} height={22} radius={8} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 10 }}
        scrollEnabled={false}
      >
        {/* Type selector */}
        <Skeleton width="100%" height={48} radius={18} />

        {/* Amount + Title block */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Skeleton width={60} height={10} radius={4} />
            <Skeleton width={120} height={32} radius={8} />
          </View>
          <View style={{ height: 1, backgroundColor: `${C.outlineVariant}40` }} />
          <View style={{ gap: 8 }}>
            <Skeleton width={40} height={10} radius={4} />
            <Skeleton width="80%" height={18} radius={6} />
          </View>
        </View>

        {/* Date & Time */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={80} height={10} radius={4} />
          <Skeleton width="100%" height={40} radius={12} />
        </View>

        {/* Category */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={70} height={10} radius={4} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Skeleton width={28} height={28} radius={8} />
            <Skeleton width={100} height={16} radius={6} />
          </View>
        </View>

        {/* Account */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={60} height={10} radius={4} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Skeleton width={28} height={28} radius={14} />
            <Skeleton width={120} height={16} radius={6} />
          </View>
        </View>

        {/* Person */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={50} height={10} radius={4} />
          <Skeleton width={90} height={16} radius={6} />
        </View>

        {/* Tags */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={35} height={10} radius={4} />
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Skeleton width={60} height={24} radius={12} />
            <Skeleton width={72} height={24} radius={12} />
          </View>
        </View>

        {/* Note */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 14, gap: 8 }}>
          <Skeleton width={35} height={10} radius={4} />
          <Skeleton width="100%" height={60} radius={8} />
        </View>
      </ScrollView>

      {/* Save button placeholder */}
      <View style={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 16) + 4, paddingTop: 12 }}>
        <Skeleton width="100%" height={52} radius={16} />
      </View>
    </View>
  );
}

export default function EditTransactionScreen() {
  const C = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: tx, loading } = useGetTransaction(id);
  const { updateTransaction, loading: saving } = useUpdateTransaction();

  const handleSubmit = async (values: TxFormValues, attachmentIds: string[]) => {
    try {
      await updateTransaction({ id, data: formValuesToUpdateInput(values, attachmentIds) });
      router.back();
    } catch (err: any) {
      showAlert({ title: "Error", message: err?.message ?? "Could not update transaction." });
    }
  };

  if (loading && !tx) {
    return <EditTransactionSkeleton />;
  }

  if (!tx) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.surface }}>
        <Text style={{ color: C.onSurfaceVariant, marginBottom: 16 }}>Transaction not found.</Text>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.75}
          style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: C.surfaceMid }}>
          <Text style={{ color: C.onSurface, fontWeight: "600" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Build initial form values from loaded transaction
  const initialValues: TxFormValues = {
    title: tx.title,
    amount: tx.amount,
    date: new Date(tx.date),
    type: toTxType(tx.type),
    category: tx.category as CategoryFieldsFragment | null ?? null,
    account: tx.account as AccountFieldsFragment,
    toAccount: tx.toAccount as AccountFieldsFragment | null ?? null,
    person: tx.person as PersonFieldsFragment | null ?? null,
    tags: (tx.tags ?? []) as TagFieldsFragment[],
    note: tx.note ?? "",
    existingAttachments: (tx.attachments ?? []).map((a) => ({
      id: a.id,
      url: a.url ?? null,
      mimeType: a.mimeType ?? null,
      filename: a.filename ?? null,
    })),
  };

  return (
    <TransactionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      submitLabel="Save Changes"
      title="Edit Transaction"
      saving={saving}
    />
  );
}
