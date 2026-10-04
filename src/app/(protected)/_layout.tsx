import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useThemedHeaderOptions } from "@/theme/unwind";
import { refreshSmsCapture } from "@/lib/sms-capture";

export default function ProtectedLayout() {
  const themedOptions = useThemedHeaderOptions();

  // Signed in: keep the native SMS receiver's token current and catch up on
  // anything it missed, now and whenever the app comes back to the foreground.
  useEffect(() => {
    refreshSmsCapture();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") refreshSmsCapture();
    });
    return () => sub.remove();
  }, []);

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
      <Stack.Screen name="sms" />
    </Stack>
  );
}
