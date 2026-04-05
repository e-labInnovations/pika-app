/**
 * Reusable transaction-type tab selector.
 * Matches the style used in the Categories screen (segmented pill inside a rounded container).
 */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import type { TxType } from "./CategoryPickerSheet";

const TYPES: { id: TxType; label: string; icon: string }[] = [
  { id: "expense", label: "Expense", icon: "arrow-up-right" },
  { id: "income", label: "Income", icon: "arrow-down-left" },
  { id: "transfer", label: "Transfer", icon: "arrow-right-left" },
];

export const TX_TYPE_COLORS: Record<TxType, string> = {
  expense: "#ef4444",
  income: "#10b981",
  transfer: "#6366f1",
};

interface Props {
  value: TxType;
  onChange: (type: TxType) => void;
}

export function TxTypeSelector({ value, onChange }: Props) {
  const C = useColors();
  return (
    <View
      style={{
        flexDirection: "row", padding: 4,
        borderRadius: 18, backgroundColor: C.surfaceMid, gap: 4,
      }}
    >
      {TYPES.map((t) => {
        const active = t.id === value;
        const color = TX_TYPE_COLORS[t.id];
        return (
          <TouchableOpacity
            key={t.id}
            onPress={() => onChange(t.id)}
            activeOpacity={0.8}
            style={{
              flex: 1, flexDirection: "row", alignItems: "center",
              justifyContent: "center", gap: 5,
              paddingVertical: 10, borderRadius: 14,
              backgroundColor: active ? `${color}22` : "transparent",
            }}
          >
            <DynamicIcon name={t.icon} size={13} color={active ? color : C.onSurfaceVariant} />
            <Text style={{ fontSize: 12, fontWeight: "700", color: active ? color : C.onSurfaceVariant }}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
