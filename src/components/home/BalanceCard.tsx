import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

export function BalanceCard() {
  const C = useColors();
  return (
    <LinearGradient
      colors={["#1e293b", "#0f172a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.card}
    >
      <View style={[s.glowOrb, { backgroundColor: C.primaryBright }]} />
      <View style={s.row}>
        <View>
          <Text style={[s.label, { color: C.onSurfaceVariant }]}>Total Balance</Text>
          <Text style={[s.amount, { color: C.onSurface }]}>$**,***.**</Text>
        </View>
        <TouchableOpacity style={s.eyeBtn} activeOpacity={0.75}>
          <Ionicons name="eye-off-outline" size={18} color={C.onSurface} />
        </TouchableOpacity>
      </View>
      <View style={s.trendRow}>
        <Ionicons name="trending-up-outline" size={14} color={C.secondary} />
        <Text style={[s.trendText, { color: C.secondary }]}>+12.5% from last month</Text>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 24, overflow: "hidden", position: "relative" },
  glowOrb: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -32,
    bottom: -32,
    opacity: 0.1,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 13, fontWeight: "500" },
  amount: { fontSize: 36, fontWeight: "900", letterSpacing: -1, marginTop: 4 },
  eyeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  trendRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  trendText: { fontSize: 13, fontWeight: "600" },
});
