import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

type Props = { topPad: number };

export function HomeHeader({ topPad }: Props) {
  const C = useColors();
  return (
    <View style={[s.header, { backgroundColor: C.surfaceLow, paddingTop: topPad }]}>
      <View style={s.left}>
        <View style={[s.avatar, { backgroundColor: C.surfaceHighest }]}>
          <Text style={s.avatarLetter}>A</Text>
        </View>
        <View>
          <Text style={[s.greeting, { color: C.onSurfaceVariant }]}>Good Morning</Text>
          <Text style={[s.userName, { color: C.primaryBright }]}>Alex Rivers</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[s.iconBtn, { backgroundColor: C.surfaceMid }]}
        activeOpacity={0.75}
      >
        <Ionicons name="notifications-outline" size={20} color={C.primaryBright} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  avatarLetter: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
  greeting: { fontSize: 10, fontWeight: "600", letterSpacing: 1.5, textTransform: "uppercase" },
  userName: { fontSize: 18, fontWeight: "800", letterSpacing: -0.5, marginTop: 1 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
});
