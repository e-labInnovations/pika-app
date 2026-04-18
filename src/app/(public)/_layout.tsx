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
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
