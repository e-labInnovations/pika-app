import "../lib/patch-native-modules";
import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { router, Stack } from "expo-router";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useIncomingShare } from "../../modules/pika-share";
import { AuthProvider, useAuth } from "../context/AuthContext";
import {
  ShareIntentBridgeProvider,
  usePendingShare,
} from "../context/ShareIntentBridgeContext";
import { AIPrefillBridgeProvider } from "../context/AIPrefillBridgeContext";
import { apolloClient } from "../services/gql/client";
import { AlertProvider, showAlert } from "../components/ui/AlertDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

/**
 * Hands content shared into Pika (see modules/pika-share) to the /add screen's AI
 * sheet. A share that arrives before auth has settled waits until it has; the file
 * is our own cache copy, so it is still readable by then.
 */
function ShareIntentListener() {
  const { share, clear } = useIncomingShare();
  const { setPending } = usePendingShare();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!share || isLoading || !isAuthenticated) return;
    const current = share;
    clear();

    async function handle() {
      if (current.type === "error") {
        showAlert({ title: "Couldn't open shared item", message: current.message });
        return;
      }
      if (current.type === "text") {
        setPending({ type: "text", text: current.text });
      } else {
        let base64: string;
        try {
          base64 = await readAsStringAsync(current.uri, { encoding: EncodingType.Base64 });
        } catch (e) {
          console.warn("[share] reading cached share failed", e);
          showAlert({ title: "Couldn't open shared item", message: "Couldn't read the shared file." });
          return;
        }
        setPending({ type: "image", uri: current.uri, base64, mimeType: current.mimeType });
      }
      router.push("/add");
    }

    handle();
    // Keyed on the share id so a repeat share of the same content still fires.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [share?.id, isLoading, isAuthenticated]);

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
    </GestureHandlerRootView>
  );
}
