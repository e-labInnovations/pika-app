import "../lib/patch-share-intent-module";
import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { router, Stack } from "expo-router";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";
import { ShareIntentProvider, useShareIntent } from "expo-share-intent";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import {
  ShareIntentBridgeProvider,
  usePendingShare,
} from "../context/ShareIntentBridgeContext";
import { AIPrefillBridgeProvider } from "../context/AIPrefillBridgeContext";
import { apolloClient } from "../services/gql/client";
import { AlertProvider } from "../components/ui/AlertDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

function ShareIntentListener() {
  const { hasShareIntent, shareIntent, error, resetShareIntent } = useShareIntent();
  const { setPending } = usePendingShare();
  const { isAuthenticated, isLoading } = useAuth();
  const [queuedIntent, setQueuedIntent] = useState<typeof shareIntent | null>(null);

  // Queue the intent when it arrives; on native error (e.g. WhatsApp private
  // content URI causing a SecurityException) just clean up without crashing.
  useEffect(() => {
    if (error) {
      resetShareIntent();
      return;
    }
    if (hasShareIntent && shareIntent) {
      setQueuedIntent(shareIntent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasShareIntent, error]);

  // Process the queued intent only once auth is fully settled and the
  // navigator is mounted. This fixes cold-start crashes where router.push
  // was called before Routes rendered (isLoading was still true).
  useEffect(() => {
    if (isLoading || !isAuthenticated || !queuedIntent) return;

    const intent = queuedIntent;
    setQueuedIntent(null);

    async function handle() {
      try {
        if (intent.files?.length) {
          const file = intent.files[0];
          const uri = file.path;
          let base64: string;
          try {
            base64 = await readAsStringAsync(uri, {
              encoding: EncodingType.Base64,
            });
          } catch {
            // Content URI from a restricted provider (e.g. WhatsApp) cannot
            // be read by our process — skip rather than crash.
            return;
          }
          setPending({
            type: "image",
            uri,
            base64,
            mimeType: file.mimeType ?? "image/jpeg",
          });
        } else if (intent.text) {
          setPending({ type: "text", text: intent.text });
        } else {
          return;
        }
        router.push("/add");
      } finally {
        resetShareIntent();
      }
    }

    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, queuedIntent]);

  return null;
}

function Routes() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync();
  }, [isLoading]);

  if (isLoading) return null; // Splash screen is still visible, safe to return null

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ShareIntentProvider>
        <ShareIntentBridgeProvider>
          <AIPrefillBridgeProvider>
            <ApolloProvider client={apolloClient}>
              <AuthProvider>
                <ShareIntentListener />
                <Routes />
                <AlertProvider />
              </AuthProvider>
            </ApolloProvider>
          </AIPrefillBridgeProvider>
        </ShareIntentBridgeProvider>
      </ShareIntentProvider>
    </GestureHandlerRootView>
  );
}
