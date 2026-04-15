import { router, Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";
import { TouchableOpacity } from "react-native";
import { DynamicIcon } from "@/components/Icon";
import { useColors } from "@/theme/colors";

export default function ProtectedLayout() {
  const themedOptions = useThemedHeaderOptions();
  const C = useColors();

  return (
    <Stack
      screenOptions={{
        ...themedOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="people" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="transactions" />
    </Stack>
  );
}
