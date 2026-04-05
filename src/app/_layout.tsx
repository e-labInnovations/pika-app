import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { Slot } from "expo-router";
import { ShareIntentProvider } from "expo-share-intent";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ShareIntentBridgeProvider } from "../context/ShareIntentBridgeContext";
import { apolloClient } from "../services/gql/client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

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
              <RootSlot />
            </AuthProvider>
          </ApolloProvider>
        </ShareIntentBridgeProvider>
      </ShareIntentProvider>
    </GestureHandlerRootView>
  );
}
