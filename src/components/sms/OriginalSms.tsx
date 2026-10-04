import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { formatRelativeShort } from "../../lib/format-date";

/** The bank SMS as received: sender, when, and the text (tap to expand). */
export function OriginalSms({
  sms,
  collapsedLines = 3,
  style,
}: {
  sms: { sender: string; body: string; receivedAt: string };
  collapsedLines?: number;
  style?: object;
}) {
  const C = useColors();
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded((e) => !e)}
      className="rounded-xl p-3 gap-1"
      style={[{ backgroundColor: `${C.surface}cc` }, style]}
    >
      <View className="flex-row items-center gap-1.5">
        <DynamicIcon name="message-square-text" size={12} color={C.onSurfaceVariant} />
        <Text className="flex-1 text-[11px] font-semibold text-on-surface-variant" numberOfLines={1}>
          {sms.sender}
        </Text>
        <Text className="text-[11px] text-on-surface-variant">
          {formatRelativeShort(new Date(sms.receivedAt))}
        </Text>
      </View>
      <Text className="text-[12px] leading-[17px] text-on-surface" numberOfLines={expanded ? undefined : collapsedLines}>
        {sms.body}
      </Text>
    </TouchableOpacity>
  );
}
