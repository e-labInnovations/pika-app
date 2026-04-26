import { Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";

export default function AnalyticsLayout() {
  const themedOptions = useThemedHeaderOptions();
  return (
    <Stack screenOptions={{ ...themedOptions, headerShown: false }}>
      <Stack.Screen name="categories" options={{ title: "Category Spending" }} />
      <Stack.Screen name="tags" options={{ title: "Tag Activity" }} />
      <Stack.Screen name="people" options={{ title: "Splits & Debts" }} />
    </Stack>
  );
}
