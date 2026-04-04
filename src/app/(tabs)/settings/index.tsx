import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../components/Icon";
import {
  SettingSectionItem,
  type SettingSection,
} from "../../../components/settings/SettingSectionItem";
import { useAuth } from "../../../context/AuthContext";
import { useColors } from "../../../theme/colors";

const SECTIONS: SettingSection[] = [
  {
    id: "categories",
    title: "Categories",
    icon: "folder",
    description: "Manage all your categories",
    color: "#10b981",
    onPress: () => router.push("/settings/categories"),
  },
  {
    id: "tags",
    title: "Tags",
    icon: "tag",
    description: "Manage all your tags",
    color: "#3b82f6",
    onPress: () => router.push("/settings/tags"),
  },
  {
    id: "accounts",
    title: "Accounts",
    icon: "wallet",
    description: "Manage your bank accounts and wallets",
    color: "#f59e0b",
    onPress: () => router.push("/settings/accounts"),
  },
  {
    id: "currency",
    title: "Currency",
    icon: "dollar-sign",
    description: "Set your default currency",
    color: "#22c55e",
    onPress: () => router.push("/settings/currency"),
  },
  {
    id: "general",
    title: "General",
    icon: "settings",
    description: "App preferences and behavior",
    color: "#6b7280",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "bell",
    description: "Manage notification preferences",
    color: "#8b5cf6",
  },
];

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

export default function SettingsScreen() {
  const C = useColors();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const rows = chunk(SECTIONS, 2);

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: logout },
    ]);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0]?.toUpperCase() ?? "")
        .slice(0, 2)
        .join("")
    : "?";

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="auto" />

      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <Text className="text-[22px] font-black tracking-[-0.5px] text-on-surface mb-0.5">
          Settings
        </Text>
        <Text className="text-[12px] text-on-surface-variant">
          Manage your app preferences
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <TouchableOpacity
          activeOpacity={0.75}
          className="flex-row items-center gap-4 p-4 rounded-2xl bg-surface-mid"
        >
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: `${C.primaryBright}22` }}
          >
            <Text className="text-[20px] font-bold text-primary-bright">
              {initials}
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-[16px] font-bold text-on-surface"
              numberOfLines={1}
            >
              {user?.name ?? "—"}
            </Text>
            <Text
              className="text-[12px] text-on-surface-variant mt-0.5"
              numberOfLines={1}
            >
              {user?.email ?? "—"}
            </Text>
          </View>
          <DynamicIcon
            name="chevron-right"
            size={18}
            color={C.outlineVariant}
          />
        </TouchableOpacity>

        {/* Sections grid */}
        <View className="gap-3">
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} className="flex-row gap-3">
              {row.map((section) => (
                <SettingSectionItem key={section.id} section={section} />
              ))}
              {row.length === 1 && <View className="flex-1" />}
            </View>
          ))}
        </View>

        {/* App info */}
        <View className="p-5 rounded-2xl bg-surface-low items-center gap-2">
          <Image
            source={require("../../../../assets/icons/ios-light.png")}
            className="w-16 h-16 rounded-2xl"
          />
          <Text className="text-[16px] font-bold text-on-surface">Pika</Text>
          <Text className="text-[12px] text-on-surface-variant">
            Version 1.0.0
          </Text>
          <Text className="text-[11px] text-on-surface-variant text-center opacity-60 leading-relaxed">
            {"AI-Powered Personal Finance\n& Expense Tracking"}
          </Text>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.75}
          className="flex-row items-center justify-center gap-2 p-4 rounded-2xl bg-surface-mid"
        >
          <DynamicIcon name="log-out" size={17} color={C.tertiary} />
          <Text className="text-[14px] font-semibold text-tertiary">
            Sign out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
