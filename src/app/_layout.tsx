import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { apolloClient } from "../services/gql/client";

export default function Layout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ApolloProvider>
  );
}
