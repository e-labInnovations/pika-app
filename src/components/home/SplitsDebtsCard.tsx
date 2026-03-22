import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "../../theme/colors";

const PEOPLE = [
  { id: "1", name: "Chloe Miller", role: "OWES YOU", amount: "$42.00"  },
  { id: "2", name: "Liam Smith",   role: "OWES YOU", amount: "$128.50" },
];

export function SplitsDebtsCard() {
  const C = useColors();
  return (
    <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
      <Text style={[s.title, { color: C.onSurface }]}>Splits & Debts</Text>
      <View style={s.list}>
        {PEOPLE.map((person) => (
          <View key={person.id} style={[s.row, { backgroundColor: C.surfaceMid }]}>
            <View style={[s.avatar, { backgroundColor: C.surfaceHighest }]}>
              <Text style={[s.initial, { color: C.primaryBright }]}>{person.name[0]}</Text>
            </View>
            <View style={s.info}>
              <Text style={[s.name, { color: C.onSurface }]}>{person.name}</Text>
              <Text style={[s.role, { color: C.onSurfaceVariant }]}>{person.role}</Text>
            </View>
            <Text style={[s.amount, { color: C.primaryBright }]}>{person.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 14 },
  title: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  list: { gap: 10 },
  row: { flexDirection: "row", alignItems: "center", borderRadius: 12, padding: 12, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  initial: { fontSize: 16, fontWeight: "700" },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 13, fontWeight: "700" },
  role: { fontSize: 9, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" },
  amount: { fontSize: 15, fontWeight: "800", letterSpacing: -0.3 },
});
