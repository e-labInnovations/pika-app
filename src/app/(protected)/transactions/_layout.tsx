import { Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";

export default function PeopleLayout() {
  const themedOptions = useThemedHeaderOptions();

  return (
    <Stack
      screenOptions={{
        ...themedOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "Transaction Details",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="[id]/edit"
        options={{
          title: "Edit Transaction",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
