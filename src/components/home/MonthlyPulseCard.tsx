import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "../../theme/colors";

export function MonthlyPulseCard() {
  const C = useColors();
  return (
    <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
      <Text style={[s.label, { color: C.onSurfaceVariant }]}>Monthly Pulse</Text>
      <View style={s.row}>
        <Text style={[s.key, { color: C.onSurfaceVariant }]}>Income</Text>
        <Text style={[s.val, { color: C.secondary }]}>+$8,420</Text>
      </View>
      <View style={s.row}>
        <Text style={[s.key, { color: C.onSurfaceVariant }]}>Expenses</Text>
        <Text style={[s.val, { color: C.tertiary }]}>-$3,150</Text>
      </View>
      <View style={[s.divider, { backgroundColor: C.outlineVariant }]} />
      <View style={s.row}>
        <Text style={[s.keySemibold, { color: C.onSurface }]}>Surplus</Text>
        <Text style={[s.val, { color: C.secondary }]}>+$5,270</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 14 },
  label: { fontSize: 10, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  key: { fontSize: 13 },
  keySemibold: { fontSize: 13, fontWeight: "600" },
  val: { fontSize: 14, fontWeight: "700" },
  divider: { height: 1, borderRadius: 1, opacity: 0.12 },
});
