import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

const ACCOUNTS = [
  { id: "1", type: "DEBIT",  last4: "4291", label: "Primary Savings", kind: "bank" },
  { id: "2", type: "CREDIT", last4: "8802", label: "Platinum Travel",  kind: "card" },
];

export function AccountsRow() {
  const C = useColors();
  return (
    <>
      <View style={s.titleRow}>
        <Text style={[s.title, { color: C.onSurface }]}>Your Accounts</Text>
        <TouchableOpacity activeOpacity={0.75}>
          <Text style={[s.seeAll, { color: C.primaryBright }]}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.list}
        style={s.scroll}
      >
        {ACCOUNTS.map((acc) => {
          const isBank = acc.kind === "bank";
          const iconColor = isBank ? C.primaryBright : C.tertiary;
          return (
            <View key={acc.id} style={[s.card, { backgroundColor: C.surfaceMid }]}>
              <View style={s.row}>
                <View style={[s.iconWrap, { backgroundColor: `${iconColor}1a` }]}>
                  {isBank
                    ? <Ionicons name="business-outline" size={18} color={iconColor} />
                    : <Ionicons name="card-outline"     size={18} color={iconColor} />
                  }
                </View>
                <Text style={[s.type, { color: C.onSurfaceVariant }]}>
                  {acc.type} •• {acc.last4}
                </Text>
              </View>
              <View>
                <Text style={[s.accLabel, { color: C.onSurfaceVariant }]}>{acc.label}</Text>
                <Text style={[s.balance, { color: C.onSurface }]}>$**,***.**</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  seeAll: { fontSize: 13, fontWeight: "600" },
  scroll: { marginHorizontal: -16 },
  list: { paddingHorizontal: 16, gap: 12 },
  card: { width: 240, borderRadius: 16, padding: 18, gap: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  type: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  accLabel: { fontSize: 11, marginBottom: 4 },
  balance: { fontSize: 20, fontWeight: "800", letterSpacing: -0.5 },
});
