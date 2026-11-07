/**
 * Monthly budgets per category: progress this month, tap one to change or remove it,
 * "Add budget" picks a category and an amount.
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BudgetBar } from "@/components/budgets/BudgetBar";
import { DynamicIcon } from "@/components/Icon";
import { CategoryPickerSheet } from "@/components/transaction/CategoryPickerSheet";
import { showAlert } from "@/components/ui/AlertDialog";
import { ModalKeyboardView } from "@/components/ui/ModalKeyboardView";
import { useBudgetMutations, useBudgets, type BudgetProgress } from "@/services/gql/budgets/budgets.service";
import type { CategoryFieldsFragment } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";

type Editing = { budget?: BudgetProgress; category?: CategoryFieldsFragment } | null;

export default function BudgetsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { budgets, loading } = useBudgets();
  const { createBudget, updateBudget, deleteBudget } = useBudgetMutations();
  const [picking, setPicking] = useState(false);
  const [editing, setEditing] = useState<Editing>(null);
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const openEdit = (e: Editing) => {
    setEditing(e);
    setAmount(e?.budget ? String(e.budget.amount) : "");
  };

  const save = async () => {
    const value = parseFloat(amount);
    if (!Number.isFinite(value) || value <= 0) return;
    setSaving(true);
    try {
      if (editing?.budget) await updateBudget(editing.budget.id, value);
      else if (editing?.category) await createBudget(editing.category.id, value);
      setEditing(null);
    } catch (err: any) {
      showAlert({ title: "Could not save", message: err?.message ?? "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

  const remove = (b: BudgetProgress) =>
    showAlert({
      title: "Remove budget",
      message: `Stop tracking a budget for ${b.category.name}?`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteBudget(b.id);
              setEditing(null);
            } catch (err: any) {
              showAlert({ title: "Could not remove", message: err?.message ?? "Something went wrong." });
            }
          },
        },
      ],
    });

  const name = editing?.budget?.category.name ?? editing?.category?.name ?? "";

  return (
    <View className="flex-1 bg-surface">
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid">
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">Budgets</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: Math.max(insets.bottom, 16) + 24, gap: 12 }}>
        <Text className="text-[13px] text-on-surface-variant px-1">
          A monthly limit per category. Home shows how you're doing, and you'll see an insight at 80% and when you go over.
        </Text>

        {loading && !budgets.length ? (
          <ActivityIndicator color={C.primary} />
        ) : (
          budgets.map((b) => (
            <TouchableOpacity key={b.id} onPress={() => openEdit({ budget: b })} activeOpacity={0.8} className="rounded-2xl bg-surface-low p-4">
              <BudgetBar b={b} />
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          onPress={() => setPicking(true)}
          activeOpacity={0.8}
          className="flex-row items-center justify-center gap-1.5 rounded-xl py-3"
          style={{ backgroundColor: `${C.primary}1f` }}
        >
          <DynamicIcon name="plus" size={16} color={C.primary} />
          <Text className="text-[14px] font-semibold" style={{ color: C.primary }}>
            Add budget
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <CategoryPickerSheet
        visible={picking}
        onClose={() => setPicking(false)}
        selectedId={null}
        txType="expense"
        onSelect={(category) => {
          const existing = budgets.find((b) => b.category.id === category.id);
          setPicking(false);
          openEdit(existing ? { budget: existing } : { category });
        }}
      />

      <Modal visible={!!editing} transparent animationType="slide" onRequestClose={() => setEditing(null)}>
        <ModalKeyboardView fillColor={C.surfaceLow} style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" }}
            activeOpacity={1}
            onPress={() => setEditing(null)}
          />
          <View className="bg-surface-low rounded-t-3xl px-5 pt-5" style={{ gap: 14, paddingBottom: Math.max(insets.bottom, 16) + 8 }}>
            <Text className="text-[17px] font-bold text-on-surface">{name} budget</Text>
            <View className="flex-row items-center rounded-xl px-3 bg-surface-high" style={{ height: 48 }}>
              <Text className="text-[16px] text-on-surface-variant mr-1">₹</Text>
              <TextInput
                value={amount}
                onChangeText={(v) => setAmount(v.replace(/[^0-9.]/g, ""))}
                placeholder="Monthly limit"
                placeholderTextColor={C.onSurfaceVariant}
                keyboardType="decimal-pad"
                autoFocus
                className="flex-1 text-[16px] text-on-surface"
              />
            </View>
            <View className="flex-row gap-2">
              {editing?.budget && (
                <TouchableOpacity onPress={() => remove(editing.budget!)} activeOpacity={0.8} className="items-center justify-center rounded-xl px-4 py-3" style={{ backgroundColor: "#ef444422" }}>
                  <DynamicIcon name="trash-2" size={16} color="#ef4444" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={save}
                disabled={saving || !(parseFloat(amount) > 0)}
                activeOpacity={0.85}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-3"
                style={{ backgroundColor: C.primaryBright, opacity: saving || !(parseFloat(amount) > 0) ? 0.5 : 1 }}
              >
                {saving && <ActivityIndicator size="small" color="#fff" />}
                <Text className="text-[15px] font-semibold" style={{ color: "#fff" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalKeyboardView>
      </Modal>
    </View>
  );
}
