import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { smsCaptureAvailable } from "../../lib/sms-capture";
import { usePendingSms } from "../../services/gql/sms/sms.service";

/** "3 bank SMS to review" — only shown while there is something pending. */
export function PendingSmsCard() {
  const C = useColors();
  const { total } = usePendingSms(1);
  if (!smsCaptureAvailable || total === 0) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/sms")}
      className="flex-row items-center gap-3 rounded-2xl bg-surface-mid p-4"
      accessibilityLabel={`${total} bank SMS to review`}
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${C.primaryBright}22` }}
      >
        <DynamicIcon name="message-square-text" size={17} color={C.primaryBright} />
      </View>
      <View className="flex-1">
        <Text className="text-[14px] font-semibold text-on-surface">
          {total} bank SMS to review
        </Text>
        <Text className="text-[12px] text-on-surface-variant">Confirm them into transactions</Text>
      </View>
      <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
    </TouchableOpacity>
  );
}
