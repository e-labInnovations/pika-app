import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../theme/colors";

const WEEKLY_DATA = [
  { day: "SUN", pct: 0.40, active: false },
  { day: "MON", pct: 0.75, active: false },
  { day: "TUE", pct: 0.55, active: false },
  { day: "WED", pct: 0.90, active: true  },
  { day: "THU", pct: 0.45, active: false },
  { day: "FRI", pct: 0.60, active: false },
  { day: "SAT", pct: 0.30, active: false },
];

export function WeeklyActivityCard() {
  const C = useColors();
  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Weekly Activity</Text>
        <View className="px-2.5 py-1 rounded-full bg-surface-highest">
          <Text className="text-[9px] font-bold tracking-[1px] uppercase text-primary-bright">
            THIS WEEK
          </Text>
        </View>
      </View>

      <View className="flex-row items-end gap-[5px] mt-1" style={{ height: 100 }}>
        {WEEKLY_DATA.map((bar) => (
          <View key={bar.day} className="flex-1 items-center gap-1.5">
            <View
              className="flex-1 self-stretch rounded-t-md overflow-hidden"
              style={{ backgroundColor: C.surfaceHighest }}
            >
              <View style={{ flex: 1 - bar.pct }} />
              <View
                style={{
                  flex: bar.pct,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundColor: bar.active ? C.primaryBright : `${C.primaryBright}40`,
                }}
              />
            </View>
            <Text
              className="text-[8px] tracking-[0.3px]"
              style={{
                color: bar.active ? C.primaryBright : C.onSurfaceVariant,
                fontWeight: bar.active ? "800" : "600",
              }}
            >
              {bar.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
