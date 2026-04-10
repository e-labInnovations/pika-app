import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { router, Slot } from "expo-router";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";
import { ShareIntentProvider, useShareIntent } from "expo-share-intent";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ShareIntentBridgeProvider, usePendingShare } from "../context/ShareIntentBridgeContext";
import { apolloClient } from "../services/gql/client";
import { AlertProvider } from "../components/ui/AlertDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

function ShareIntentListener() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();
  const { setPending } = usePendingShare();

  useEffect(() => {
    if (!hasShareIntent || !shareIntent) return;

    async function handle() {
      try {
        if (shareIntent.files?.length) {
          const file = shareIntent.files[0];
          const uri = file.path;
          const base64 = await readAsStringAsync(uri, {
            encoding: EncodingType.Base64,
          });
          setPending({ type: "image", uri, base64, mimeType: file.mimeType ?? "image/jpeg" });
        } else if (shareIntent.text) {
          setPending({ type: "text", text: shareIntent.text });
        } else {
          return;
        }
        router.push("/(tabs)/add");
      } finally {
        resetShareIntent();
      }
    }

    handle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasShareIntent]);

  return null;
}

function RootSlot() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return <Slot />;
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ShareIntentProvider>
        <ShareIntentBridgeProvider>
          <ApolloProvider client={apolloClient}>
            <AuthProvider>
              <ShareIntentListener />
              <RootSlot />
              <AlertProvider />
            </AuthProvider>
          </ApolloProvider>
        </ShareIntentBridgeProvider>
      </ShareIntentProvider>
    </GestureHandlerRootView>
  );
}
