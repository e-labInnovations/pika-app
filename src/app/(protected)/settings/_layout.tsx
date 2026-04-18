import { Stack } from "expo-router";
import { useThemedHeaderOptions } from "@/theme/unwind";

export default function SettingsLayout() {
  const themedOptions = useThemedHeaderOptions();

  return (
    <Stack screenOptions={{ ...themedOptions, headerShown: false }}>
      <Stack.Screen name="general" options={{ title: "General" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="ai" options={{ title: "AI" }} />
      <Stack.Screen name="mcp" options={{ title: "MCP API Keys" }} />

      {/* Accounts */}
      <Stack.Screen name="accounts" options={{ title: "Accounts" }} />
      <Stack.Screen
        name="add-account"
        options={{ title: "Add Account", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit-account/[id]"
        options={{ title: "Edit Account", presentation: "modal" }}
      />

      {/* Categories */}
      <Stack.Screen name="categories" options={{ title: "Categories" }} />
      <Stack.Screen
        name="add-category"
        options={{ title: "Add Category", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit-category/[id]"
        options={{ title: "Edit Category", presentation: "modal" }}
      />

      {/* Tags */}
      <Stack.Screen name="tags" options={{ title: "Tags" }} />
      <Stack.Screen
        name="add-tag"
        options={{ title: "Add Tag", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit-tag/[id]"
        options={{ title: "Edit Tag", presentation: "modal" }}
      />
    </Stack>
  );
}
