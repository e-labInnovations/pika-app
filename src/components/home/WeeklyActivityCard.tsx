import React from "react";
import { Text, View } from "react-native";
import { useColors } from "../../theme/colors";

type WeeklyDays = {
  sun?: number | null;
  mon?: number | null;
  tue?: number | null;
  wed?: number | null;
  thu?: number | null;
  fri?: number | null;
  sat?: number | null;
};

type Props = { days?: WeeklyDays | null };

const DAY_KEYS: { key: keyof WeeklyDays; label: string }[] = [
  { key: "sun", label: "SUN" },
  { key: "mon", label: "MON" },
  { key: "tue", label: "TUE" },
  { key: "wed", label: "WED" },
  { key: "thu", label: "THU" },
  { key: "fri", label: "FRI" },
  { key: "sat", label: "SAT" },
];

const todayIndex = new Date().getDay(); // 0=Sun … 6=Sat

function fmtAmount(n: number): string {
  if (n === 0) return "";
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return Math.round(n).toString();
}

export function WeeklyActivityCard({ days }: Props) {
  const C = useColors();

  const values = DAY_KEYS.map(({ key }) => days?.[key] ?? 0);
  const max = Math.max(...values, 1);
  const bars = DAY_KEYS.map(({ label }, i) => ({
    label,
    pct: values[i] / max,
    active: i === todayIndex,
  }));

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

      <View className="flex-row items-end gap-[5px] mt-1" style={{ height: 120 }}>
        {bars.map((bar, i) => (
          <View key={bar.label} className="flex-1 items-center gap-1.5">
            <Text
              className="text-[8px] text-center"
              numberOfLines={1}
              style={{
                color: bar.active ? C.primaryBright : C.onSurfaceVariant,
                fontWeight: bar.active ? "800" : "500",
                opacity: values[i] === 0 ? 0 : 1,
              }}
            >
              {fmtAmount(values[i])}
            </Text>
            <View
              className="flex-1 self-stretch rounded-t-md overflow-hidden"
              style={{ backgroundColor: C.surfaceHighest }}
            >
              <View style={{ flex: 1 - bar.pct }} />
              <View
                style={{
                  flex: bar.pct || 0.02,
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
              {bar.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
