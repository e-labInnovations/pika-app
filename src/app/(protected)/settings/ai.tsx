import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_URL } from "@/lib/constants";
import { showAlert } from "@/components/ui/AlertDialog";
import { DynamicIcon } from "@/components/Icon";
import { GeminiLogo } from "@/components/icons/GeminiLogo";
import { HuggingFaceLogo } from "@/components/icons/HuggingFaceLogo";
import { Skeleton } from "@/components/ui/Skeleton";
import { ModelPickerSheet } from "@/components/settings/ModelPickerSheet";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/theme/colors";
import {
  useGetUserSettings,
  useUpdateUserSettings,
} from "@/services/gql/user-settings/user-settings.service";
import { UserSettingUpdate_categoryAiMethod_MutationInput } from "@/services/gql/types/graphql";

type CategoryAiMethod = "minilm" | "cloud";

const CATEGORY_METHOD_OPTIONS: {
  value: CategoryAiMethod;
  label: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    value: "minilm",
    label: "Local (MiniLM)",
    description:
      "Fast and free. Runs on our server with a small on-device-style model.",
    icon: "cpu",
    color: "#10b981",
  },
  {
    value: "cloud",
    label: "Cloud (AI Model)",
    description:
      "Smarter for edge cases. Counts against your AI request quota.",
    icon: "sparkles",
    color: "#8b5cf6",
  },
];

const PROVIDER_LABELS: Record<string, string> = {
  gemini: "Gemini",
  huggingface: "HuggingFace",
};

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

// ── API Key Row ────────────────────────────────────────────────────────────────

function ApiKeyRow({
  label,
  subtitle,
  logo,
  placeholder,
  value,
  onChange,
  onSave,
  saving,
  dirty,
  docUrl,
  docLabel,
  C,
}: {
  label: string;
  subtitle: string;
  logo: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
  docUrl?: string;
  docLabel?: string;
  C: ReturnType<typeof useColors>;
}) {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: C.surfaceMid,
        padding: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: C.surfaceHigh,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logo}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>
            {label}
          </Text>
          <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
            {subtitle}
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
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          style={{ flex: 1, fontSize: 14, color: C.onSurface }}
          placeholderTextColor={C.onSurfaceVariant + "80"}
        />
        {dirty && (
          <TouchableOpacity
            onPress={onSave}
            disabled={saving}
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
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <DynamicIcon name="check" size={13} color="#fff" />
                <Text
                  style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}
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

      {docUrl && docLabel && (
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync(docUrl)}
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
          <DynamicIcon name="book-open" size={14} color={C.onSurfaceVariant} />
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              fontWeight: "600",
              color: C.onSurface,
            }}
          >
            {docLabel}
          </Text>
          <DynamicIcon
            name="external-link"
            size={12}
            color={C.onSurfaceVariant}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function AiSettingsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user, appSettings } = useAuth();
  const { data: userSettings, loading: settingsLoading } = useGetUserSettings(
    user?.id,
  );
  const { updateUserSettings } = useUpdateUserSettings();

  // API key state
  const [geminiKey, setGeminiKey] = useState("");
  const [savingGemini, setSavingGemini] = useState(false);
  const [hfKey, setHfKey] = useState("");
  const [savingHf, setSavingHf] = useState(false);

  // Model preference state
  const [preferredModel, setPreferredModel] = useState<string>("");
  const [allowFallback, setAllowFallback] = useState(true);
  const [savingModel, setSavingModel] = useState(false);
  const [savingFallback, setSavingFallback] = useState(false);
  const [modelPickerVisible, setModelPickerVisible] = useState(false);

  // Category AI method state
  const savedCategoryMethod: CategoryAiMethod =
    (userSettings?.categoryAiMethod as CategoryAiMethod | null | undefined) ??
    "minilm";
  const [categoryMethod, setCategoryMethod] =
    useState<CategoryAiMethod>("minilm");
  const [savingCategoryMethod, setSavingCategoryMethod] = useState(false);

  useEffect(() => {
    if (userSettings) {
      setGeminiKey(userSettings.geminiApiKey ?? "");
      setHfKey(userSettings.hfApiKey ?? "");
      setPreferredModel(userSettings.preferredModel ?? "");
      setAllowFallback(userSettings.allowFallback !== false);
      setCategoryMethod(
        (userSettings.categoryAiMethod as CategoryAiMethod | null | undefined) ??
          "minilm",
      );
    }
  }, [
    userSettings?.id,
    userSettings?.geminiApiKey,
    userSettings?.hfApiKey,
    userSettings?.preferredModel,
    userSettings?.allowFallback,
    userSettings?.categoryAiMethod,
  ]);

  // Available enabled models from app settings
  const availableModels = (appSettings?.ai?.models ?? []).filter(
    (m) => m.enabled !== false && m.id,
  );

  const defaultModel = appSettings?.ai?.defaultModel ?? "";

  // ── Save handlers ──────────────────────────────────────────────────────────

  const handleSaveKey = async (
    field: "geminiApiKey" | "hfApiKey",
    value: string,
    setSaving: (v: boolean) => void,
  ) => {
    if (!userSettings?.id || value === (field === "geminiApiKey" ? (userSettings.geminiApiKey ?? "") : (userSettings.hfApiKey ?? ""))) return;
    setSaving(true);
    try {
      await updateUserSettings({ id: userSettings.id, data: { [field]: value } });
    } catch (err: any) {
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Failed to save.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePickModel = async (modelId: string) => {
    if (!userSettings?.id || savingModel || modelId === (userSettings.preferredModel ?? "")) {
      setPreferredModel(modelId);
      return;
    }
    setPreferredModel(modelId);
    setSavingModel(true);
    try {
      await updateUserSettings({
        id: userSettings.id,
        data: { preferredModel: modelId || null },
      });
    } catch (err: any) {
      setPreferredModel(userSettings.preferredModel ?? "");
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ??
          err?.message ??
          "Failed to update model.",
      });
    } finally {
      setSavingModel(false);
    }
  };

  const handleToggleFallback = async (next: boolean) => {
    if (!userSettings?.id || savingFallback) return;
    setAllowFallback(next);
    setSavingFallback(true);
    try {
      await updateUserSettings({
        id: userSettings.id,
        data: { allowFallback: next },
      });
    } catch (err: any) {
      setAllowFallback(userSettings.allowFallback !== false);
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Failed to save.",
      });
    } finally {
      setSavingFallback(false);
    }
  };

  const handlePickCategoryMethod = async (next: CategoryAiMethod) => {
    if (
      !userSettings?.id ||
      savingCategoryMethod ||
      next === savedCategoryMethod
    ) {
      setCategoryMethod(next);
      return;
    }
    setCategoryMethod(next);
    setSavingCategoryMethod(true);
    try {
      await updateUserSettings({
        id: userSettings.id,
        data: {
          categoryAiMethod:
            next === "cloud"
              ? UserSettingUpdate_categoryAiMethod_MutationInput.cloud
              : UserSettingUpdate_categoryAiMethod_MutationInput.minilm,
        },
      });
    } catch (err: any) {
      setCategoryMethod(savedCategoryMethod);
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ??
          err?.message ??
          "Failed to update preference.",
      });
    } finally {
      setSavingCategoryMethod(false);
    }
  };

  const loading = settingsLoading && !userSettings;

  const savedGemini = userSettings?.geminiApiKey ?? "";
  const savedHf = userSettings?.hfApiKey ?? "";

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
          {/* ── API Keys ──────────────────────────────────────────────────── */}
          <SectionLabel label="API Keys" />
          <View style={{ gap: 8 }}>
            <ApiKeyRow
              label="Gemini API Key"
              subtitle="Used for Gemini models"
              logo={<GeminiLogo size={20} />}
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={setGeminiKey}
              onSave={() =>
                handleSaveKey("geminiApiKey", geminiKey, setSavingGemini)
              }
              saving={savingGemini}
              dirty={geminiKey !== savedGemini}
              docUrl={`${API_URL}/gemini-api-key`}
              docLabel="How to get your Gemini API key"
              C={C}
            />
            <ApiKeyRow
              label="HuggingFace API Key"
              subtitle="Used for HuggingFace models"
              logo={<HuggingFaceLogo size={20} />}
              placeholder="hf_..."
              value={hfKey}
              onChange={setHfKey}
              onSave={() => handleSaveKey("hfApiKey", hfKey, setSavingHf)}
              saving={savingHf}
              dirty={hfKey !== savedHf}
              docUrl={`${API_URL}/hf-api-key`}
              docLabel="How to get your HuggingFace API key"
              C={C}
            />
          </View>

          {/* ── Model Preference ───────────────────────────────────────────── */}
          <SectionLabel label="Model Preference" topPad />
          <View
            style={{
              borderRadius: 16,
              backgroundColor: C.surfaceMid,
              overflow: "hidden",
            }}
          >
            {/* Model selector trigger */}
            <TouchableOpacity
              onPress={() => setModelPickerVisible(true)}
              disabled={savingModel}
              activeOpacity={0.75}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                padding: 14,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}
                >
                  {(() => {
                    if (!preferredModel) return "App default";
                    const m = availableModels.find((x) => x.id === preferredModel);
                    return m?.name ?? preferredModel;
                  })()}
                </Text>
                <Text style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 1 }}>
                  {(() => {
                    if (!preferredModel)
                      return defaultModel ? `Default: ${defaultModel}` : "No default set";
                    const m = availableModels.find((x) => x.id === preferredModel);
                    const provider = m?.provider ?? "gemini";
                    return PROVIDER_LABELS[provider] ?? provider;
                  })()}
                </Text>
              </View>
              {savingModel ? (
                <ActivityIndicator size="small" color={C.primary} />
              ) : (
                <DynamicIcon name="chevron-right" size={18} color={C.onSurfaceVariant} />
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: C.outlineVariant,
                opacity: 0.3,
                marginHorizontal: 14,
              }}
            />

            {/* Allow fallback toggle */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}
                >
                  Allow fallback
                </Text>
                <Text
                  style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 2 }}
                >
                  If no key for chosen model's provider, fall back to app default.
                </Text>
              </View>
              {savingFallback ? (
                <ActivityIndicator size="small" color={C.primary} />
              ) : (
                <Switch
                  value={allowFallback}
                  onValueChange={handleToggleFallback}
                  trackColor={{ false: C.outlineVariant, true: C.primary }}
                  thumbColor="#fff"
                />
              )}
            </View>
          </View>

          <ModelPickerSheet
            visible={modelPickerVisible}
            onClose={() => setModelPickerVisible(false)}
            models={availableModels}
            selectedId={preferredModel}
            defaultModel={defaultModel}
            onSelect={handlePickModel}
          />

          {/* ── Category Suggestions ───────────────────────────────────────── */}
          <SectionLabel label="Category Suggestions" topPad />
          <View
            style={{
              borderRadius: 16,
              backgroundColor: C.surfaceMid,
              padding: 12,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: C.onSurfaceVariant,
                paddingHorizontal: 4,
                marginBottom: 2,
              }}
            >
              Choose how Pika picks a category when you add a transaction.
            </Text>
            {CATEGORY_METHOD_OPTIONS.map((opt) => {
              const selected = categoryMethod === opt.value;
              const saving = savingCategoryMethod && selected;
              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => handlePickCategoryMethod(opt.value)}
                  disabled={savingCategoryMethod}
                  activeOpacity={0.75}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 14,
                    backgroundColor: selected
                      ? `${opt.color}14`
                      : C.surfaceHigh,
                    borderWidth: 1.5,
                    borderColor: selected ? opt.color : "transparent",
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: `${opt.color}22`,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DynamicIcon
                      name={opt.icon}
                      size={17}
                      color={opt.color}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: selected ? opt.color : C.onSurface,
                      }}
                    >
                      {opt.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: C.onSurfaceVariant,
                        marginTop: 1,
                      }}
                    >
                      {opt.description}
                    </Text>
                  </View>
                  {saving ? (
                    <ActivityIndicator size="small" color={opt.color} />
                  ) : (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: selected
                          ? opt.color
                          : C.outlineVariant,
                        backgroundColor: selected ? opt.color : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selected && (
                        <DynamicIcon name="check" size={11} color="#fff" />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
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
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: C.onSurface,
                }}
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
