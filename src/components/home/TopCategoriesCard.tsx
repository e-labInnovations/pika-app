import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "../../theme/colors";

const CATEGORIES = [
  { id: "1", name: "Dining Out", icon: "utensils",     spent: 840, budget: 1000, pct: 0.84, accent: "primary"  },
  { id: "2", name: "Shopping",   icon: "shopping-bag", spent: 520, budget: 600,  pct: 0.86, accent: "primary"  },
  { id: "3", name: "Transport",  icon: "car",          spent: 120, budget: 300,  pct: 0.40, accent: "tertiary" },
];

export function TopCategoriesCard() {
  const C = useColors();
  return (
    <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
      <Text style={[s.title, { color: C.onSurface }]}>Top Categories</Text>
      <View style={s.list}>
        {CATEGORIES.map((cat) => {
          const accent = cat.accent === "primary" ? C.primaryBright : C.tertiary;
          return (
            <View key={cat.id}>
              <View style={[s.row, { marginBottom: 8 }]}>
                <View style={s.left}>
                  <View style={[s.iconWrap, { backgroundColor: `${accent}1a` }]}>
                    {cat.icon === "utensils"     && <Ionicons name="restaurant-outline" size={15} color={accent} />}
                    {cat.icon === "shopping-bag" && <Ionicons name="bag-outline"        size={15} color={accent} />}
                    {cat.icon === "car"          && <Ionicons name="car-outline"         size={15} color={accent} />}
                  </View>
                  <Text style={[s.name, { color: C.onSurface }]}>{cat.name}</Text>
                </View>
                <Text style={[s.budget, { color: C.onSurfaceVariant }]}>
                  ${cat.spent} / ${cat.budget}
                </Text>
              </View>
              <View style={[s.track, { backgroundColor: C.surfaceHighest }]}>
                <View style={{ flex: cat.pct, backgroundColor: accent }} />
                <View style={{ flex: 1 - cat.pct }} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 14 },
  title: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  list: { gap: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconWrap: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 13, fontWeight: "500" },
  budget: { fontSize: 11, fontWeight: "700" },
  track: { height: 6, borderRadius: 100, overflow: "hidden", flexDirection: "row" },
});
