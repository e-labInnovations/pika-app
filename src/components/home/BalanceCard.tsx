import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

type Props = {
  showBalance: boolean;
  onToggle: () => void;
};

export function BalanceCard({ showBalance, onToggle }: Props) {
  const C = useColors();
  return (
    <LinearGradient
      colors={["#1e293b", "#0f172a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 16, padding: 24, overflow: "hidden" }}
    >
      {/* Simulated blur-3xl glow — stacked circles */}
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 280, height: 280, right: -80, bottom: -80, opacity: 0.04 }} />
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 180, height: 180, right: -40, bottom: -40, opacity: 0.06 }} />
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 100, height: 100, right: -10, bottom: -10, opacity: 0.09 }} />

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[13px] font-medium text-on-surface-variant">Total Balance</Text>
          {showBalance ? (
            <Text className="text-[36px] font-black tracking-[-1px] mt-1 text-on-surface">
              $12,450.00
            </Text>
          ) : (
            <Text className="text-[28px] font-black tracking-[4px] mt-1 opacity-50 text-on-surface">
              ••••••••
            </Text>
          )}
        </View>
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          activeOpacity={0.75}
          onPress={onToggle}
        >
          <Ionicons
            name={showBalance ? "eye-outline" : "eye-off-outline"}
            size={18}
            color={C.onSurface}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center gap-1.5 mt-3.5">
        <Ionicons name="trending-up-outline" size={14} color={C.secondary} />
        <Text className="text-[13px] font-semibold text-secondary">+12.5% from last month</Text>
      </View>
    </LinearGradient>
  );
}
