import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

const SPENDING_TAGS = [
  { id: "1", label: "#Subscription", style: "primary"  },
  { id: "2", label: "#Vacation",      style: "primary"  },
  { id: "3", label: "#Gifts",         style: "tertiary" },
  { id: "4", label: "#Coffee",        style: "neutral"  },
  { id: "5", label: "#Rent",          style: "neutral"  },
  { id: "6", label: "#Wellness",      style: "neutral"  },
];

export function SpendingTagsCard() {
  const C = useColors();
  return (
    <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
      <Text style={[s.title, { color: C.onSurface }]}>Spending Tags</Text>
      <View style={s.wrap}>
        {SPENDING_TAGS.map((tag) => {
          let bg: string, fg: string, border: string;
          if (tag.style === "primary") {
            bg = `${C.primaryBright}1a`; fg = C.primaryBright; border = `${C.primaryBright}33`;
          } else if (tag.style === "tertiary") {
            bg = `${C.tertiary}1a`; fg = C.tertiary; border = `${C.tertiary}33`;
          } else {
            bg = C.surfaceHighest; fg = C.onSurfaceVariant; border = `${C.outlineVariant}33`;
          }
          return (
            <TouchableOpacity
              key={tag.id}
              activeOpacity={0.75}
              style={[s.tag, { backgroundColor: bg, borderColor: border }]}
            >
              <Text style={[s.tagText, { color: fg }]}>{tag.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 14 },
  title: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  tagText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
});
