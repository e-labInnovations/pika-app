/**
 * OAuth deep-link callback route — matched when the backend redirects to
 * `pika://auth?token=JWT&exp=TIMESTAMP`.
 *
 * On iOS, ASWebAuthenticationSession intercepts the redirect before Expo
 * Router sees it, so loginWithGoogle handles it directly. On Android the
 * deep link is dispatched to the app as a Linking event (also handled in
 * loginWithGoogle) and may also navigate here as a fallback.
 */
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { PikaLogo } from "../components/PikaLogo";
import { useAuth } from "../context/AuthContext";

export default function AuthCallbackScreen() {
  const { token, exp } = useLocalSearchParams<{ token?: string; exp?: string }>();
  const { isAuthenticated, loginWithToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
      return;
    }

    if (!token) {
      setError("No token received from server.");
      return;
    }

    loginWithToken(token, exp ? parseInt(exp, 10) : undefined)
      .then(() => router.replace("/(tabs)"))
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        {/* Ambient orbs */}
        <View className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-tertiary-container opacity-5" />
        <View className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary-bright opacity-5" />

        <View className="w-[85%] bg-surface-low rounded-[32px] p-8 items-center gap-4">
          <View className="w-20 h-20 rounded-3xl bg-surface-mid items-center justify-center mb-1">
            <PikaLogo size={48} />
          </View>

          <View className="w-16 h-16 rounded-2xl bg-tertiary-container/10 items-center justify-center">
            <Text className="text-3xl">⚠️</Text>
          </View>

          <Text className="text-lg font-extrabold tracking-tight text-tertiary-container">
            Sign-in Failed
          </Text>
          <Text className="text-[13px] font-medium text-center leading-5 text-on-surface-variant">
            {error}
          </Text>

          <TouchableOpacity
            className="w-full bg-primary-bright rounded-2xl py-[14px] items-center mt-1"
            activeOpacity={0.85}
            onPress={() => router.replace("/sign-in")}
          >
            <Text className="text-white text-[15px] font-bold tracking-tight">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-surface">
      <View className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-bright opacity-[0.06]" />
      <View className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary opacity-[0.05]" />

      <View className="w-[85%] bg-surface-low rounded-[32px] p-8 items-center gap-4">
        <View className="w-20 h-20 rounded-3xl bg-surface-mid items-center justify-center mb-1">
          <PikaLogo size={48} />
        </View>
        <ActivityIndicator size="large" colorClassName="accent-primary-bright" />
        <Text className="text-[15px] font-medium text-on-surface-variant">
          Completing sign in…
        </Text>
      </View>
    </View>
  );
}
