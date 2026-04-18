import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_URL } from "@/lib/constants";
import { showAlert } from "@/components/ui/AlertDialog";
import { DynamicIcon } from "@/components/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/theme/colors";
import {
  useGetUserSettings,
  useUpdateUserSettings,
} from "@/services/gql/user-settings/user-settings.service";

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ label, topPad }: { label: string; topPad?: boolean }) {
  return (
    <Text
      className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant px-1"
      style={{ marginTop: topPad ? 12 : 4, marginBottom: 4 }}
    >
      {label}
    </Text>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function AiSettingsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user } = useAuth();
  const { data: userSettings, loading: settingsLoading } = useGetUserSettings(
    user?.id,
  );
  const { updateUserSettings } = useUpdateUserSettings();

  // Gemini key state
  const [geminiKey, setGeminiKey] = useState("");
  const [savingGemini, setSavingGemini] = useState(false);

  useEffect(() => {
    if (userSettings) {
      setGeminiKey(userSettings.geminiApiKey ?? "");
    }
  }, [userSettings?.id, userSettings?.geminiApiKey]);

  const savedGemini = userSettings?.geminiApiKey ?? "";
  const geminiChanged = geminiKey !== savedGemini;

  const handleSaveGemini = async () => {
    if (!userSettings?.id || savingGemini) return;
    setSavingGemini(true);
    try {
      await updateUserSettings({
        id: userSettings.id,
        data: { geminiApiKey: geminiKey },
      });
    } catch (err: any) {
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Failed to save.",
      });
    } finally {
      setSavingGemini(false);
    }
  };

  const loading = settingsLoading && !userSettings;

  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      {/* Header */}
      <View
        style={{
          paddingTop: topPad,
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: C.surface,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{
              width: 36,
              height: 36,
              borderRadius: 99,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: C.surfaceMid,
            }}
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "900",
              letterSpacing: -0.5,
              color: C.onSurface,
            }}
          >
            AI Settings
          </Text>
        </View>
      </View>

      {loading ? (
        /* Skeleton */
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <View style={{ height: 8 }} />
          <Skeleton height={11} width="25%" radius={6} />
          <View style={{ height: 2 }} />
          <View
            style={{
              borderRadius: 16,
              backgroundColor: C.surfaceMid,
              padding: 16,
              gap: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Skeleton width={36} height={36} radius={10} />
              <View style={{ flex: 1, gap: 6 }}>
                <Skeleton width="40%" height={13} />
                <Skeleton width="60%" height={11} />
              </View>
            </View>
            <Skeleton height={46} radius={12} />
          </View>
          <View style={{ height: 12 }} />
          <Skeleton height={11} width="30%" radius={6} />
          <View style={{ height: 2 }} />
          <Skeleton height={60} radius={16} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 24,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Gemini API Key ──────────────────────────────────────────────── */}
          <SectionLabel label="Gemini API Key" />
          <View
            style={{
              borderRadius: 16,
              backgroundColor: C.surfaceMid,
              padding: 16,
              gap: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: "#8b5cf620",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DynamicIcon name="sparkles" size={17} color="#8b5cf6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: C.onSurface,
                  }}
                >
                  Gemini API Key
                </Text>
                <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
                  Powers AI transaction parsing
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: C.surfaceHigh,
                height: 46,
              }}
            >
              <TextInput
                value={geminiKey}
                onChangeText={setGeminiKey}
                placeholder="AIzaSy..."
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                style={{ flex: 1, fontSize: 14, color: C.onSurface }}
                placeholderTextColor={C.onSurfaceVariant + "80"}
              />
              {geminiChanged && (
                <TouchableOpacity
                  onPress={handleSaveGemini}
                  disabled={savingGemini}
                  activeOpacity={0.75}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: C.primary,
                  }}
                >
                  {savingGemini ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <DynamicIcon name="check" size={13} color="#fff" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        Save
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>

            <Text
              style={{
                fontSize: 11,
                color: C.onSurfaceVariant,
                opacity: 0.7,
                paddingHorizontal: 2,
              }}
            >
              Stored securely on your account
            </Text>

            {/* How to get a personal Gemini key — doc link */}
            <TouchableOpacity
              onPress={() => WebBrowser.openBrowserAsync(`${API_URL}/gemini-api-key`)}
              activeOpacity={0.75}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingVertical: 11,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: C.surfaceHigh,
              }}
            >
              <DynamicIcon
                name="book-open"
                size={14}
                color={C.onSurfaceVariant}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "600",
                  color: C.onSurface,
                }}
              >
                How to get your Gemini API key
              </Text>
              <DynamicIcon
                name="external-link"
                size={12}
                color={C.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>

          {/* ── Advanced ────────────────────────────────────────────────────── */}
          <SectionLabel label="Advanced" topPad />

          <TouchableOpacity
            onPress={() => router.push("/settings/mcp")}
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 16,
              backgroundColor: C.surfaceMid,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: `${C.primary}18`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon name="key" size={17} color={C.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}
              >
                MCP API Keys
              </Text>
              <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
                Connect Claude, Cursor, or other assistants
              </Text>
            </View>
            <DynamicIcon
              name="chevron-right"
              size={18}
              color={C.onSurfaceVariant}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
