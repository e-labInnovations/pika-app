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
          title: "Person Details",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Add Person",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]/edit"
        options={{
          title: "Edit Person",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
