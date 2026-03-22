import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../theme/colors";

const CATEGORIES = [
  { id: "1", name: "Dining Out", icon: "utensils",     spent: 840, budget: 1000, pct: 0.84, accent: "primary"  },
  { id: "2", name: "Shopping",   icon: "shopping-bag", spent: 520, budget: 600,  pct: 0.86, accent: "primary"  },
  { id: "3", name: "Transport",  icon: "car",          spent: 120, budget: 300,  pct: 0.40, accent: "tertiary" },
];

export function TopCategoriesCard() {
  const C = useColors();
  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Top Categories</Text>

      <View className="gap-4">
        {CATEGORIES.map((cat) => {
          const accent = cat.accent === "primary" ? C.primaryBright : C.tertiary;
          return (
            <View key={cat.id}>
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-2.5">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${accent}1a` }}
                  >
                    {cat.icon === "utensils"     && <Ionicons name="restaurant-outline" size={15} color={accent} />}
                    {cat.icon === "shopping-bag" && <Ionicons name="bag-outline"        size={15} color={accent} />}
                    {cat.icon === "car"          && <Ionicons name="car-outline"        size={15} color={accent} />}
                  </View>
                  <Text className="text-[13px] font-medium text-on-surface">{cat.name}</Text>
                </View>
                <Text className="text-[11px] font-bold text-on-surface-variant">
                  ${cat.spent} / ${cat.budget}
                </Text>
              </View>

              <View
                className="h-1.5 rounded-full overflow-hidden flex-row"
                style={{ backgroundColor: C.surfaceHighest }}
              >
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
