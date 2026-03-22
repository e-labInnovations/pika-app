import React from "react";
import { Text, View } from "react-native";

const PEOPLE = [
  { id: "1", name: "Chloe Miller", role: "OWES YOU", amount: "$42.00"  },
  { id: "2", name: "Liam Smith",   role: "OWES YOU", amount: "$128.50" },
];

export function SplitsDebtsCard() {
  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Splits & Debts</Text>

      <View className="gap-2.5">
        {PEOPLE.map((person) => (
          <View key={person.id} className="flex-row items-center rounded-xl p-3 gap-3 bg-surface-mid">
            <View className="w-10 h-10 rounded-full items-center justify-center bg-surface-highest">
              <Text className="text-base font-bold text-primary-bright">{person.name[0]}</Text>
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-[13px] font-bold text-on-surface">{person.name}</Text>
              <Text className="text-[9px] font-semibold tracking-[0.8px] uppercase text-on-surface-variant">
                {person.role}
              </Text>
            </View>
            <Text className="text-[15px] font-extrabold tracking-[-0.3px] text-primary-bright">
              {person.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
