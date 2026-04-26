import { Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";

export default function ProtectedLayout() {
  const themedOptions = useThemedHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...themedOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="people" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="transactions" />
    </Stack>
  );
}
