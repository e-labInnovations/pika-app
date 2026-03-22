import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { Slot } from "expo-router";
import { ShareIntentProvider } from "expo-share-intent";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { apolloClient } from "../services/gql/client";

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
    <ShareIntentProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <RootSlot />
        </AuthProvider>
      </ApolloProvider>
    </ShareIntentProvider>
  );
}
