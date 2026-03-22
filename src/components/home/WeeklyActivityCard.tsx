import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
      <View style={s.row}>
        <Text style={[s.title, { color: C.onSurface }]}>Weekly Activity</Text>
        <View style={[s.badge, { backgroundColor: C.surfaceHighest }]}>
          <Text style={[s.badgeText, { color: C.primaryBright }]}>THIS WEEK</Text>
        </View>
      </View>
      <View style={s.chart}>
        {WEEKLY_DATA.map((bar) => (
          <View key={bar.day} style={s.col}>
            <View style={[s.track, { backgroundColor: C.surfaceHighest }]}>
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
              style={[
                s.day,
                {
                  color: bar.active ? C.primaryBright : C.onSurfaceVariant,
                  fontWeight: bar.active ? "800" : "600",
                },
              ]}
            >
              {bar.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, gap: 14 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  chart: { flexDirection: "row", alignItems: "flex-end", height: 100, gap: 5, marginTop: 4 },
  col: { flex: 1, alignItems: "center", gap: 6 },
  track: { flex: 1, alignSelf: "stretch", borderTopLeftRadius: 6, borderTopRightRadius: 6, overflow: "hidden" },
  day: { fontSize: 8, letterSpacing: 0.3 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  badgeText: { fontSize: 9, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" },
});
