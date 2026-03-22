import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

type Props = { showBalance: boolean };

const ACCOUNTS = [
  { id: "1", type: "DEBIT",  last4: "4291", label: "Primary Savings", kind: "bank",  balance: "$5,240.00" },
  { id: "2", type: "CREDIT", last4: "8802", label: "Platinum Travel",  kind: "card", balance: "$7,210.00" },
];

const HIDDEN = "••••••••";

export function AccountsRow({ showBalance }: Props) {
  const C = useColors();
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
        {ACCOUNTS.map((acc) => {
          const isBank = acc.kind === "bank";
          const iconColor = isBank ? C.primaryBright : C.tertiary;
          return (
            <View
              key={acc.id}
              className="rounded-2xl p-[18px] gap-4 bg-surface-mid"
              style={{ width: 240 }}
            >
              <View className="flex-row items-center justify-between">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: `${iconColor}1a` }}
                >
                  <Ionicons
                    name={isBank ? "business-outline" : "card-outline"}
                    size={18}
                    color={iconColor}
                  />
                </View>
                <Text className="text-[10px] font-bold tracking-[0.5px] uppercase text-on-surface-variant">
                  {acc.type} •• {acc.last4}
                </Text>
              </View>

              <View>
                <Text className="text-[11px] mb-1 text-on-surface-variant">{acc.label}</Text>
                <Text className={`font-extrabold text-on-surface ${showBalance ? "text-xl tracking-[-0.5px]" : "text-base tracking-[4px] opacity-50"}`}>
                  {showBalance ? acc.balance : HIDDEN}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
