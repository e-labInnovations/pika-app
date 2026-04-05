import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useFormatMoney } from "../../lib/format-currency";

const DARK_GRADIENT = ["#1e293b", "#0f172a"] as const;
const LIGHT_GRADIENT = ["#1a4fd6", "#0f35a8"] as const;

type Props = {
  showBalance: boolean;
  onToggle: () => void;
  totalBalance?: number | null;
  balanceChangePercent?: number | null;
  loading?: boolean;
};

// Dark-background skeleton — pulses white/translucent on dark gradient
function DarkSkeleton({ width, height, radius = 8 }: { width: number | string; height: number; radius?: number }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width: width as any,
        height,
        borderRadius: radius,
        backgroundColor: "rgba(255,255,255,0.15)",
        opacity,
      }}
    />
  );
}

export function BalanceCard({ showBalance, onToggle, totalBalance, balanceChangePercent, loading }: Props) {
  const scheme = useColorScheme();
  const fmt = useFormatMoney();
  const formattedBalance = totalBalance != null ? fmt(totalBalance) : "—";
  const changePositive = (balanceChangePercent ?? 0) >= 0;
  const changeText = balanceChangePercent != null
    ? `${changePositive ? "+" : ""}${balanceChangePercent.toFixed(1)}% from last month`
    : null;

  return (
    <LinearGradient
      colors={scheme === "dark" ? DARK_GRADIENT : LIGHT_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 16, padding: 24, overflow: "hidden" }}
    >
      {/* Glow circles */}
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 280, height: 280, right: -80, bottom: -80, opacity: 0.04 }} />
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 180, height: 180, right: -40, bottom: -40, opacity: 0.06 }} />
      <View className="absolute rounded-full bg-primary-bright"
        style={{ width: 100, height: 100, right: -10, bottom: -10, opacity: 0.09 }} />

      <View className="flex-row items-center justify-between gap-2">
        <View className="gap-2">
          <Text className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Total Balance</Text>
          {loading ? (
            <DarkSkeleton width={180} height={40} radius={10} />
          ) : showBalance ? (
            <Text className="text-[36px] font-black tracking-[-1px] mt-1" style={{ color: "#ffffff" }}>
              {formattedBalance}
            </Text>
          ) : (
            <Text className="text-[28px] font-black tracking-[4px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
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
            color="rgba(255,255,255,0.85)"
          />
        </TouchableOpacity>
      </View>

      <View className="mt-3.5 h-5 justify-center">
        {loading ? (
          <DarkSkeleton width={160} height={14} radius={6} />
        ) : changeText ? (
          <View className="flex-row items-center gap-1.5">
            <Ionicons
              name={changePositive ? "trending-up-outline" : "trending-down-outline"}
              size={14}
              color={changePositive ? "#6ee7b7" : "#fca5a5"}
            />
            <Text className="text-[13px] font-semibold" style={{ color: changePositive ? "#6ee7b7" : "#fca5a5" }}>
              {changeText}
            </Text>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
}
