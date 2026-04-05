import React from "react";
import { Text, View } from "react-native";
import { Skeleton } from "../ui/Skeleton";
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

type Props = { days?: WeeklyDays | null; loading?: boolean };

const DAY_KEYS: { key: keyof WeeklyDays; label: string }[] = [
  { key: "sun", label: "Sun" },
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
];

// Preset heights for skeleton to look like a plausible chart
const SKELETON_FILLS = [0.4, 0.65, 0.5, 1.0, 0.7, 0.45, 0.3];

const todayIndex = new Date().getDay(); // 0=Sun … 6=Sat

function fmtAmount(n: number): string {
  if (n === 0) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return Math.round(n).toString();
}

const BAR_HEIGHT = 96;

export function WeeklyActivityCard({ days, loading }: Props) {
  const C = useColors();

  const values = DAY_KEYS.map(({ key }) => days?.[key] ?? 0);
  const max = Math.max(...values, 1);
  const hasAnyActivity = values.some((v) => v > 0);

  return (
    <View style={{ borderRadius: 20, padding: 20, gap: 16, backgroundColor: C.surfaceLow }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "800", letterSpacing: -0.2, color: C.onSurface }}>
          Weekly Activity
        </Text>
        <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: C.surfaceHighest }}>
          <Text style={{ fontSize: 9, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", color: C.primaryBright }}>
            This Week
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6 }}>
        {DAY_KEYS.map(({ label }, i) => {
          const isToday = i === todayIndex;
          const value = values[i];
          const fillPct = loading ? SKELETON_FILLS[i] : value / max;
          const barFill = fillPct || (hasAnyActivity ? 0 : 0.03);

          return (
            <View key={label} style={{ flex: 1, alignItems: "center", gap: 5 }}>
              {/* Amount label */}
              <View style={{ height: 12 }}>
                {!loading && value > 0 && (
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: isToday ? "800" : "600",
                      color: isToday ? C.primaryBright : C.onSurfaceVariant,
                    }}
                    numberOfLines={1}
                  >
                    {fmtAmount(value)}
                  </Text>
                )}
              </View>

              {/* Bar */}
              <View style={{ height: BAR_HEIGHT, width: "100%", borderRadius: 8, overflow: "hidden", backgroundColor: C.surfaceHighest, justifyContent: "flex-end" }}>
                {loading ? (
                  <Skeleton
                    height={Math.round(SKELETON_FILLS[i] * BAR_HEIGHT)}
                    radius={8}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <View
                    style={{
                      height: `${Math.round(barFill * 100)}%`,
                      borderRadius: 8,
                      backgroundColor: isToday ? C.primaryBright : `${C.primaryBright}40`,
                    }}
                  />
                )}
              </View>

              {/* Day label + today dot */}
              <View style={{ alignItems: "center", gap: 3 }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: isToday ? "800" : "600",
                    letterSpacing: 0.2,
                    color: isToday ? C.primaryBright : C.onSurfaceVariant,
                  }}
                >
                  {label}
                </Text>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: isToday ? C.primaryBright : "transparent",
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
