import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

type Props = {
  /** Called before navigating — e.g. to close a modal/sheet the card lives in. */
  onBeforeNavigate?: () => void;
  /** Tighter spacing for use inside sheets and narrow containers. */
  compact?: boolean;
};

export function EmptyAccountsCard({ onBeforeNavigate, compact }: Props) {
  const C = useColors();

  const go = (path: "/settings/add-account" | "/settings/accounts") => {
    onBeforeNavigate?.();
    router.push(path);
  };

  return (
    <View
      className="rounded-2xl bg-surface-mid gap-3"
      style={{
        padding: compact ? 14 : 16,
        borderWidth: 1.5,
        borderColor: `${C.primary}30`,
        borderStyle: "dashed",
      }}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="rounded-xl items-center justify-center"
          style={{
            width: compact ? 40 : 48,
            height: compact ? 40 : 48,
            backgroundColor: `${C.primary}18`,
          }}
        >
          <DynamicIcon name="wallet" size={compact ? 18 : 22} color={C.primary} />
        </View>
        <View className="flex-1">
          <Text
            className="font-extrabold text-on-surface"
            style={{ fontSize: compact ? 14 : 15 }}
          >
            No accounts yet
          </Text>
          <Text
            className="text-on-surface-variant mt-0.5"
            style={{ fontSize: compact ? 11 : 12 }}
          >
            You need at least one account before adding transactions.
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={() => go("/settings/add-account")}
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: compact ? 10 : 11,
            borderRadius: 12,
            backgroundColor: C.primary,
          }}
        >
          <DynamicIcon name="plus" size={14} color="#fff" />
          <Text style={{ fontSize: 13, fontWeight: "700", color: "#fff" }}>
            Add Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => go("/settings/accounts")}
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: compact ? 10 : 11,
            borderRadius: 12,
            backgroundColor: C.surfaceHigh,
          }}
        >
          <DynamicIcon name="list" size={14} color={C.onSurface} />
          <Text style={{ fontSize: 13, fontWeight: "700", color: C.onSurface }}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
