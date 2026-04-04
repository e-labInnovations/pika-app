import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { UserAvatar } from "../UserAvatar";
import { useAuth } from "../../context/AuthContext";
import { useColors } from "../../theme/colors";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

type Props = { topPad: number };

export function HomeHeader({ topPad }: Props) {
  const C = useColors();
  const { user } = useAuth();

  return (
    <View
      className="flex-row items-center justify-between px-5 pb-3.5 bg-surface-low"
      style={{ paddingTop: topPad }}
    >
      <View className="flex-row items-center gap-3">
        <UserAvatar
          id={user?.id ?? ""}
          name={user?.name ?? user?.email ?? "?"}
          avatarUrl={user?.avatar?.url}
          size={40}
        />
        <View>
          <Text className="text-[10px] font-semibold tracking-[1.5px] uppercase text-on-surface-variant">
            {getGreeting()}
          </Text>
          <Text className="text-lg font-extrabold tracking-[-0.5px] mt-[1px] text-primary-bright">
            {user?.name || user?.email}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="w-10 h-10 rounded-full items-center justify-center bg-surface-mid"
        activeOpacity={0.75}
        onPress={() => console.log("Notifications button pressed")}
      >
        <Ionicons
          name="notifications-outline"
          size={20}
          color={C.primaryBright}
        />
      </TouchableOpacity>
    </View>
  );
}
