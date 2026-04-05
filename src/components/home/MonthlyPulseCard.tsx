import React from "react";
import { Text, View } from "react-native";
import { Skeleton } from "../ui/Skeleton";
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
const fmt = (n: number) =>
  `$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export function MonthlyPulseCard({ showBalance, income, expenses, surplus, monthName, loading }: Props) {
  const C = useColors();

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
        ) : (
          <Text style={{
            fontSize: 14, fontWeight: "700",
            color: "#10b981",
            letterSpacing: showBalance ? 0 : 3,
            opacity: showBalance ? 1 : 0.5,
          }}>
            {showBalance ? (income != null ? `+${fmt(income)}` : "—") : HIDDEN}
          </Text>
        )}
      </View>

      {/* Expenses row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>Expenses</Text>
        {loading ? (
          <Skeleton width={72} height={14} radius={6} />
        ) : (
          <Text style={{
            fontSize: 14, fontWeight: "700",
            color: "#ef4444",
            letterSpacing: showBalance ? 0 : 3,
            opacity: showBalance ? 1 : 0.5,
          }}>
            {showBalance ? (expenses != null ? `-${fmt(expenses)}` : "—") : HIDDEN}
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
        ) : (
          <Text style={{
            fontSize: 14, fontWeight: "700",
            color: (surplus ?? 0) >= 0 ? "#10b981" : "#ef4444",
            letterSpacing: showBalance ? 0 : 3,
            opacity: showBalance ? 1 : 0.5,
          }}>
            {showBalance ? (surplus != null ? `${surplus >= 0 ? "+" : ""}${fmt(surplus)}` : "—") : HIDDEN}
          </Text>
        )}
      </View>
    </View>
  );
}
