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

const SKELETON_FILLS = [0.4, 0.65, 0.5, 1.0, 0.7, 0.45, 0.3];
const todayIndex = new Date().getDay();

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
    <View className="rounded-2xl p-5 gap-4 bg-surface-low">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-extrabold tracking-tight text-on-surface">
          Weekly Activity
        </Text>
        <View className="px-2.5 py-1 rounded-full bg-surface-highest">
          <Text className="text-[9px] font-extrabold tracking-[1px] uppercase text-primary-bright">
            This Week
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View className="flex-row items-end gap-1.5">
        {DAY_KEYS.map(({ label }, i) => {
          const isToday = i === todayIndex;
          const value = values[i];
          const fillPct = loading ? SKELETON_FILLS[i] : value / max;
          const barFill = fillPct || (hasAnyActivity ? 0 : 0.03);

          return (
            <View key={label} className="flex-1 items-center gap-1">
              {/* Amount label */}
              <View className="h-3">
                {!loading && value > 0 && (
                  <Text
                    className={`text-[8px] ${isToday ? "font-extrabold text-primary-bright" : "font-semibold text-on-surface-variant"}`}
                    numberOfLines={1}
                  >
                    {fmtAmount(value)}
                  </Text>
                )}
              </View>

              {/* Bar */}
              <View
                className="w-full rounded-lg overflow-hidden bg-surface-highest justify-end"
                style={{ height: BAR_HEIGHT }}
              >
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
              <View className="items-center gap-0.5">
                <Text
                  className={`text-[9px] tracking-[0.2px] ${isToday ? "font-extrabold text-primary-bright" : "font-semibold text-on-surface-variant"}`}
                >
                  {label}
                </Text>
                <View
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: isToday ? C.primaryBright : "transparent" }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
