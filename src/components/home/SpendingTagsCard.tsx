import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Spending Tags</Text>

      <View className="flex-row flex-wrap gap-2">
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
              className="px-3.5 py-2 rounded-full border"
              style={{ backgroundColor: bg, borderColor: border }}
            >
              <Text
                className="text-[10px] font-bold tracking-[0.8px] uppercase"
                style={{ color: fg }}
              >
                {tag.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
