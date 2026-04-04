import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

type Props = {
  showBalance: boolean;
  onToggle: () => void;
  totalBalance?: number | null;
  balanceChangePercent?: number | null;
};

export function BalanceCard({ showBalance, onToggle, totalBalance, balanceChangePercent }: Props) {
  const C = useColors();
  const formattedBalance = totalBalance != null
    ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '—';
  const changePositive = (balanceChangePercent ?? 0) >= 0;
  const changeText = balanceChangePercent != null
    ? `${changePositive ? '+' : ''}${balanceChangePercent.toFixed(1)}% from last month`
    : null;
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
              {formattedBalance}
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

      {changeText && (
        <View className="flex-row items-center gap-1.5 mt-3.5">
          <Ionicons name={changePositive ? "trending-up-outline" : "trending-down-outline"} size={14} color={changePositive ? C.secondary : C.tertiary} />
          <Text className={`text-[13px] font-semibold ${changePositive ? "text-secondary" : "text-tertiary"}`}>{changeText}</Text>
        </View>
      )}
    </LinearGradient>
  );
}
