import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { GeminiLogo } from "../icons/GeminiLogo";
import { HuggingFaceLogo } from "../icons/HuggingFaceLogo";
import { useColors } from "../../theme/colors";
import type { AppSettings } from "../../services/gql/auth/auth.service";

type Model = NonNullable<
  NonNullable<NonNullable<AppSettings["ai"]>["models"]>[number]
>;

const PROVIDER_COLORS: Record<string, string> = {
  gemini: "#4285f4",
  huggingface: "#ff9d00",
};

const PROVIDER_LABELS: Record<string, string> = {
  gemini: "Gemini",
  huggingface: "HuggingFace",
};

interface Props {
  visible: boolean;
  onClose: () => void;
  models: Model[];
  selectedId: string;
  defaultModel: string;
  onSelect: (modelId: string) => void;
}

export function ModelPickerSheet({
  visible,
  onClose,
  models,
  selectedId,
  defaultModel,
  onSelect,
}: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl max-h-[70%]"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-9 h-1 rounded-sm bg-outline-variant" />
          </View>

          {/* Header */}
          <View className="flex-row items-center px-5 py-3">
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">
              Choose Model
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="p-1.5 rounded-full bg-surface-high"
            >
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="px-4 pb-2 gap-0.5">
              {/* App default option */}
              <TouchableOpacity
                onPress={() => handleSelect("")}
                activeOpacity={0.75}
                className={[
                  "flex-row items-center gap-3 py-3 px-3 rounded-2xl",
                  selectedId === "" ? "bg-primary/10" : "bg-transparent",
                ].join(" ")}
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
                  <DynamicIcon name="settings-2" size={16} color={C.primary} />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="text-sm font-semibold text-on-surface">
                    App default
                  </Text>
                  {defaultModel ? (
                    <Text
                      className="text-xs text-on-surface-variant"
                      numberOfLines={1}
                    >
                      {defaultModel}
                    </Text>
                  ) : null}
                </View>
                {selectedId === "" && (
                  <DynamicIcon name="check" size={16} color={C.primary} />
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: C.outlineVariant,
                  opacity: 0.4,
                  marginVertical: 4,
                  marginHorizontal: 4,
                }}
              />

              {/* Model list */}
              {models.map((m) => {
                const provider = m.provider ?? "gemini";
                const providerColor = PROVIDER_COLORS[provider] ?? C.primary;
                const isSelected = selectedId === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => handleSelect(m.id!)}
                    activeOpacity={0.75}
                    className={[
                      "flex-row items-center gap-3 py-3 px-3 rounded-2xl",
                      isSelected ? "" : "bg-transparent",
                    ].join(" ")}
                    style={
                      isSelected
                        ? { backgroundColor: `${providerColor}14` }
                        : undefined
                    }
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: `${providerColor}20`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {provider === "gemini" ? (
                        <GeminiLogo size={18} />
                      ) : (
                        <HuggingFaceLogo size={18} />
                      )}
                    </View>
                    <View className="flex-1 min-w-0">
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: isSelected ? providerColor : C.onSurface }}
                        numberOfLines={1}
                      >
                        {m.name ?? m.id}
                      </Text>
                      <Text
                        className="text-xs text-on-surface-variant"
                        numberOfLines={1}
                      >
                        {PROVIDER_LABELS[provider] ?? provider}
                        {m.contextWindow
                          ? ` · ${(m.contextWindow / 1000).toFixed(0)}k ctx`
                          : ""}
                      </Text>
                    </View>
                    {isSelected && (
                      <DynamicIcon
                        name="check"
                        size={16}
                        color={providerColor}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}

              {models.length === 0 && (
                <View className="p-10 items-center gap-2">
                  <DynamicIcon
                    name="cpu"
                    size={28}
                    color={C.outlineVariant}
                  />
                  <Text className="text-on-surface-variant text-sm">
                    No models configured
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
