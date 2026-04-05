import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "../theme/colors";

const BOTTOM_INSET_FALLBACK = Platform.OS === "ios" ? 20 : 0;

type TabRouteName = "index" | "history" | "add" | "people" | "settings";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const ACTIVE_ICONS: Record<TabRouteName, IoniconName> = {
  index:    "home",
  history:  "wallet",
  add:      "add-circle",
  people:   "people",
  settings: "settings",
};

const INACTIVE_ICONS: Record<TabRouteName, IoniconName> = {
  index:    "home-outline",
  history:  "wallet-outline",
  add:      "add-circle-outline",
  people:   "people-outline",
  settings: "settings-outline",
};

const TAB_LABELS: Record<TabRouteName, string> = {
  index:    "HOME",
  history:  "HISTORY",
  add:      "ADD",
  people:   "PEOPLE",
  settings: "SETTINGS",
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const bottomPad = (insets.bottom || BOTTOM_INSET_FALLBACK) + 8;

  return (
    <View style={[s.container, { backgroundColor: C.surfaceLow, paddingBottom: bottomPad }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeName = route.name as TabRouteName;
        const isAdd = routeName === "add";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Center ADD button — filled when active, outline when inactive
        if (isAdd) {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.75}
              style={s.tab}
              accessibilityLabel="Add"
            >
              {isFocused ? (
                <View style={[s.addCircle, { backgroundColor: C.primaryBright, borderColor: C.primaryBright }]}>
                  <Ionicons name="add" size={24} color="#ffffff" />
                </View>
              ) : (
                <View style={[s.addCircle, { borderColor: C.outlineVariant }]}>
                  <Ionicons name="add" size={24} color={C.onSurface} />
                </View>
              )}
            </TouchableOpacity>
          );
        }

        // Active tab — blue rounded square, no label
        if (isFocused) {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.9}
              style={s.tab}
              accessibilityLabel={TAB_LABELS[routeName]}
            >
              <View style={[s.activeSquare, { backgroundColor: C.primaryBright }]}>
                <Ionicons name={ACTIVE_ICONS[routeName]} size={22} color="#ffffff" />
              </View>
            </TouchableOpacity>
          );
        }

        // Inactive tab — icon + label
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.75}
            style={s.tab}
            accessibilityLabel={TAB_LABELS[routeName]}
          >
            <Ionicons name={INACTIVE_ICONS[routeName]} size={22} color={C.onSurfaceVariant} />
            <Text style={[s.label, { color: C.onSurfaceVariant }]}>
              {TAB_LABELS[routeName]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 54,
  },
  activeSquare: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
