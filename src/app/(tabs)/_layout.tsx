import { router, Tabs } from "expo-router";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";
import { useShareIntent } from "expo-share-intent";
import React, { useEffect } from "react";
import { View } from "react-native";
import { TabBar } from "../../components/TabBar";
import { usePendingShare } from "../../context/ShareIntentBridgeContext";

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
          setPending({
            type: "image",
            uri,
            base64,
            mimeType: file.mimeType ?? "image/jpeg",
          });
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

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <ShareIntentListener />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index"    options={{ title: "Home"     }} />
        <Tabs.Screen name="history"  options={{ title: "History"  }} />
        <Tabs.Screen name="add"      options={{ title: "Add"      }} />
        <Tabs.Screen name="people"   options={{ title: "People"   }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </View>
  );
}
