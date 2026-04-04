import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

type Person = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  balance?: number | null;
  totalTransactions?: number | null;
  lastTransactionAt?: string | null;
  isActive?: boolean | null;
};

type Props = {
  person: Person;
  onPress?: () => void;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function fmtBalance(n: number): string {
  const sign = n >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Cycle through a few distinct hues for avatar backgrounds
const AVATAR_COLORS = [
  "#4d8eff", // blue  (primary-bright)
  "#4edea3", // green (secondary dark)
  "#9b7cf8", // purple
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function PersonCard({ person, onPress }: Props) {
  const C = useColors();
  const initials = getInitials(person.name);
  const accentColor = avatarColor(person.name);
  const balancePositive = (person.balance ?? 0) >= 0;
  const contact = person.email ?? person.phone;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-row items-center gap-3 p-4 rounded-2xl bg-surface-mid"
    >
      {/* Avatar */}
      <View
        className="w-11 h-11 rounded-full items-center justify-center shrink-0"
        style={{ backgroundColor: `${accentColor}22` }}
      >
        <Text className="text-[15px] font-bold" style={{ color: accentColor }}>
          {initials}
        </Text>
      </View>

      {/* Name + contact */}
      <View className="flex-1 gap-0.5 min-w-0">
        <View className="flex-row items-center gap-2">
          <Text
            className="text-[14px] font-semibold text-on-surface flex-1"
            numberOfLines={1}
          >
            {person.name}
          </Text>
          {person.isActive === false && (
            <View className="px-1.5 py-0.5 rounded-full bg-surface-highest shrink-0">
              <Text className="text-[9px] font-bold tracking-[0.5px] uppercase text-on-surface-variant">
                Inactive
              </Text>
            </View>
          )}
        </View>

        {contact && (
          <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
            {contact}
          </Text>
        )}

        {person.lastTransactionAt && (
          <Text className="text-[11px] text-on-surface-variant opacity-60 mt-0.5">
            Last txn: {fmtDate(person.lastTransactionAt)}
          </Text>
        )}
      </View>

      {/* Balance + txn count */}
      <View className="items-end gap-1 shrink-0">
        {person.balance != null ? (
          <Text
            className={`text-[14px] font-bold ${balancePositive ? "text-secondary" : "text-tertiary"}`}
          >
            {fmtBalance(person.balance)}
          </Text>
        ) : (
          <Text className="text-[14px] font-bold text-on-surface-variant">—</Text>
        )}
        <Text className="text-[11px] text-on-surface-variant">
          {person.totalTransactions ?? 0} txn{(person.totalTransactions ?? 0) !== 1 ? "s" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
