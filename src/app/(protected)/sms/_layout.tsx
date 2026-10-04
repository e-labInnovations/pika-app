import { Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";

export default function SmsLayout() {
  const themedOptions = useThemedHeaderOptions();
  return (
    <Stack screenOptions={{ ...themedOptions, headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Bank SMS" }} />
      <Stack.Screen name="[id]" options={{ title: "Review SMS", presentation: "modal" }} />
    </Stack>
  );
}
