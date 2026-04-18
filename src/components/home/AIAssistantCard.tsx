import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

const AI_GRADIENT = ["#7c3aed", "#db2777", "#f59e0b"] as const;
const BORDER_WIDTH = 2;
const OUTER_RADIUS = 16;
const INNER_RADIUS = OUTER_RADIUS - BORDER_WIDTH;

type Props = {
  onOpen: (tab: "text" | "receipt") => void;
};

export function AIAssistantCard({ onOpen }: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onOpen("text")}
      accessibilityLabel="Open AI transaction assistant"
    >
      {/* Gradient border (outer layer, padded by BORDER_WIDTH) */}
      <LinearGradient
        colors={AI_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: OUTER_RADIUS,
          padding: BORDER_WIDTH,
        }}
      >
        {/* Inner surface */}
        <View
          style={{
            borderRadius: INNER_RADIUS,
            backgroundColor: C.surfaceMid,
            padding: 16,
            gap: 14,
            overflow: "hidden",
          }}
        >
          {/* Soft gradient-tinted glow (covers the full card so the row gap
              doesn't reveal plain surface between content rows) */}
          <LinearGradient
            colors={["#7c3aed22", "#db277711", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            pointerEvents="none"
          />

          {/* Top row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <GradientIconTile />
            <View style={{ flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "800",
                    color: C.onSurface,
                    letterSpacing: -0.2,
                  }}
                >
                  AI Assistant
                </Text>
                {/* NEW badge with gradient border */}
                <LinearGradient
                  colors={AI_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ padding: 1, borderRadius: 999 }}
                >
                  <View
                    style={{
                      paddingHorizontal: 6,
                      paddingVertical: 1,
                      borderRadius: 999,
                      backgroundColor: C.surfaceMid,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: "800",
                        color: "#db2777",
                        letterSpacing: 0.5,
                      }}
                    >
                      NEW
                    </Text>
                  </View>
                </LinearGradient>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: C.onSurfaceVariant,
                  marginTop: 2,
                }}
                numberOfLines={2}
              >
                Describe or snap a receipt to auto-create
              </Text>
            </View>
            <DynamicIcon name="sparkles" size={18} color="#7c3aed" />
          </View>

          {/* Quick actions */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ActionChip
              icon="message-square-text"
              label="Describe"
              onPress={() => onOpen("text")}
            />
            <ActionChip
              icon="camera"
              label="Scan Receipt"
              onPress={() => onOpen("receipt")}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function GradientIconTile() {
  return (
    <LinearGradient
      colors={AI_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DynamicIcon name="bot" size={22} color="#fff" />
    </LinearGradient>
  );
}

function ActionChip({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: C.surfaceHigh,
        borderWidth: 1,
        borderColor: `${C.outlineVariant}60`,
      }}
    >
      <DynamicIcon name={icon} size={14} color="#7c3aed" />
      <Text style={{ fontSize: 13, fontWeight: "700", color: C.onSurface }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
