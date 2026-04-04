import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

// 8 × 5 rows of preset swatches
const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6",
  "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#fb923c", "#fbbf24", "#a3e635", "#4ade80", "#34d399", "#2dd4bf", "#38bdf8",
  "#60a5fa", "#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6",
  "#7f1d1d", "#7c2d12", "#78350f", "#365314", "#14532d", "#1e3a5f", "#1e1b4b", "#1e293b",
  "#ffffff", "#000000",
];

type Props = {
  value: string;
  onChange: (color: string) => void;
  label?: string;
};

export function ColorPicker({ value, onChange, label }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const [hexError, setHexError] = useState(false);

  const openPicker = () => {
    setHex(value);
    setHexError(false);
    setOpen(true);
  };

  const handleHexChange = (text: string) => {
    const val = text.startsWith("#") ? text : `#${text}`;
    setHex(val);
    const valid = /^#[0-9A-Fa-f]{6}$/.test(val);
    setHexError(val.length > 1 && !valid);
    if (valid) onChange(val);
  };

  const handlePreset = (color: string) => {
    setHex(color);
    setHexError(false);
    onChange(color);
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        onPress={openPicker}
        activeOpacity={0.75}
        className="flex-row items-center gap-2.5"
      >
        <View
          className="w-8 h-8 rounded-xl"
          style={{
            backgroundColor: value,
            borderWidth: 1.5,
            borderColor: C.outlineVariant,
          }}
        />
        {label && (
          <Text className="text-[13px] font-medium text-on-surface flex-1">{label}</Text>
        )}
        <DynamicIcon name="chevron-down" size={14} color={C.onSurfaceVariant} />
      </TouchableOpacity>

      {/* Bottom sheet */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable className="absolute inset-0" onPress={() => setOpen(false)} />
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Pressable>
              <View
                className="rounded-t-3xl bg-surface-low px-5 pt-4"
                style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
              >
                {/* Handle */}
                <View className="w-10 h-1 rounded-full bg-outline-variant self-center mb-5" />

                <Text className="text-[17px] font-bold text-on-surface mb-4">
                  {label ? `Pick ${label}` : "Pick color"}
                </Text>

                {/* Swatches */}
                <View className="flex-row flex-wrap gap-2 mb-5">
                  {PRESET_COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => handlePreset(color)}
                      activeOpacity={0.75}
                    >
                      <View
                        className="w-9 h-9 rounded-xl"
                        style={{
                          backgroundColor: color,
                          borderWidth: value === color ? 3 : 1,
                          borderColor: value === color ? C.primary : C.outlineVariant,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Hex input */}
                <View
                  className="flex-row items-center gap-3 px-3 rounded-xl bg-surface-mid"
                  style={{ height: 48 }}
                >
                  <View
                    className="w-7 h-7 rounded-lg"
                    style={{ backgroundColor: hex }}
                  />
                  <TextInput
                    value={hex}
                    onChangeText={handleHexChange}
                    className="flex-1 text-[14px] text-on-surface"
                    placeholderTextColorClassName="accent-outline"
                    placeholder="#000000"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={7}
                  />
                  {hexError && (
                    <Text className="text-[11px] text-tertiary">Invalid</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  activeOpacity={0.8}
                  className="mt-4 py-3.5 rounded-2xl items-center bg-primary"
                >
                  <Text className="text-[15px] font-bold text-on-surface">Done</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}
