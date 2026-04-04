import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

type Account = {
  id: string;
  name: string;
  icon: string;
  bgColor?: string | null;
  color?: string | null;
  balance?: number | null;
  isActive?: boolean | null;
};

type Props = {
  showBalance: boolean;
  accounts?: Account[] | null;
};

const HIDDEN = "••••••••";
const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function AccountsRow({ showBalance, accounts }: Props) {
  const C = useColors();

  if (!accounts?.length) return null;

  return (
    <>
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Your Accounts</Text>
        <TouchableOpacity activeOpacity={0.75}>
          <Text className="text-[13px] font-semibold text-primary-bright">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        style={{ marginHorizontal: -16 }}
      >
        {accounts.map((acc) => {
          const iconColor = acc.color ?? C.primaryBright;
          const bgColor = acc.bgColor ? `${acc.bgColor}33` : `${iconColor}1a`;
          return (
            <View
              key={acc.id}
              className="rounded-2xl p-[18px] gap-4 bg-surface-mid"
              style={{ width: 240 }}
            >
              <View className="flex-row items-center justify-between">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: bgColor }}
                >
                  <DynamicIcon name={acc.icon ?? "wallet"} size={18} color={iconColor} />
                </View>
              </View>

              <View>
                <Text className="text-[11px] mb-1 text-on-surface-variant">{acc.name}</Text>
                <Text className={`font-extrabold text-on-surface ${showBalance ? "text-xl tracking-[-0.5px]" : "text-base tracking-[4px] opacity-50"}`}>
                  {showBalance ? (acc.balance != null ? fmt(acc.balance) : "—") : HIDDEN}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
