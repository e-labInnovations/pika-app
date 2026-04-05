import React from "react";
import { Text, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { Skeleton } from "../ui/Skeleton";
import { useFormatMoney } from "../../lib/format-currency";
import { useColors } from "../../theme/colors";

type Props = {
  showBalance: boolean;
  income?: number | null;
  expenses?: number | null;
  surplus?: number | null;
  monthName?: string | null;
  loading?: boolean;
};

const HIDDEN = "••••••";

export function MonthlyPulseCard({ showBalance, income, expenses, surplus, monthName, loading }: Props) {
  const C = useColors();
  const fmt = useFormatMoney();

  return (
    <View style={{ borderRadius: 20, padding: 20, gap: 14, backgroundColor: C.surfaceLow }}>
      {/* Title */}
      {loading ? (
        <Skeleton width={120} height={11} radius={5} />
      ) : (
        <Text style={{ fontSize: 10, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase", color: C.onSurfaceVariant }}>
          {monthName ? `${monthName} Pulse` : "Monthly Pulse"}
        </Text>
      )}

      {/* Income row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>Income</Text>
        {loading ? (
          <Skeleton width={80} height={14} radius={6} />
        ) : showBalance ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <DynamicIcon name="trending-up" size={13} color="#10b981" />
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#10b981" }}>
              {income != null ? fmt(Math.abs(income)) : "—"}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#10b981", letterSpacing: 3, opacity: 0.5 }}>
            {HIDDEN}
          </Text>
        )}
      </View>

      {/* Expenses row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>Expenses</Text>
        {loading ? (
          <Skeleton width={72} height={14} radius={6} />
        ) : showBalance ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <DynamicIcon name="trending-down" size={13} color="#ef4444" />
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#ef4444" }}>
              {expenses != null ? fmt(Math.abs(expenses)) : "—"}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#ef4444", letterSpacing: 3, opacity: 0.5 }}>
            {HIDDEN}
          </Text>
        )}
      </View>

      {/* Divider */}
      <View style={{ height: 1, borderRadius: 1, opacity: 0.1, backgroundColor: C.outlineVariant }} />

      {/* Surplus row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}>Surplus</Text>
        {loading ? (
          <Skeleton width={88} height={14} radius={6} />
        ) : showBalance ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <DynamicIcon
              name={(surplus ?? 0) >= 0 ? "trending-up" : "trending-down"}
              size={13}
              color={(surplus ?? 0) >= 0 ? "#10b981" : "#ef4444"}
            />
            <Text style={{ fontSize: 14, fontWeight: "700", color: (surplus ?? 0) >= 0 ? "#10b981" : "#ef4444" }}>
              {surplus != null ? fmt(Math.abs(surplus)) : "—"}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: "700", color: (surplus ?? 0) >= 0 ? "#10b981" : "#ef4444", letterSpacing: 3, opacity: 0.5 }}>
            {HIDDEN}
          </Text>
        )}
      </View>
    </View>
  );
}
