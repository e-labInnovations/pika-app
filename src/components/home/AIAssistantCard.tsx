import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";

const AI_GRADIENT = ["#7c3aed", "#db2777", "#f59e0b"] as const;

type Props = {
  onOpen: (tab: "text" | "receipt") => void;
};

export function AIAssistantCard({ onOpen }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onOpen("text")}
      accessibilityLabel="Open AI transaction assistant"
    >
      <LinearGradient
        colors={AI_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 16, padding: 16, overflow: "hidden", gap: 14 }}
      >
        {/* Decorative glow circles */}
        <View
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            right: -70,
            top: -70,
            borderRadius: 110,
            backgroundColor: "#ffffff",
            opacity: 0.07,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 130,
            height: 130,
            right: -30,
            top: -30,
            borderRadius: 65,
            backgroundColor: "#ffffff",
            opacity: 0.08,
          }}
        />

        {/* Top row */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.18)",
            }}
          >
            <DynamicIcon name="bot" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "800", color: "#fff", letterSpacing: -0.2 }}
              >
                AI Assistant
              </Text>
              <View
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 1,
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.22)",
                }}
              >
                <Text
                  style={{ fontSize: 9, fontWeight: "800", color: "#fff", letterSpacing: 0.5 }}
                >
                  NEW
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}
              numberOfLines={2}
            >
              Describe or snap a receipt to auto-create
            </Text>
          </View>
          <DynamicIcon name="sparkles" size={18} color="#fff" />
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
      </LinearGradient>
    </TouchableOpacity>
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
        backgroundColor: "rgba(255,255,255,0.18)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
      }}
    >
      <DynamicIcon name={icon} size={14} color="#fff" />
      <Text style={{ fontSize: 13, fontWeight: "700", color: "#fff" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
