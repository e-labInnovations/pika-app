import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

type CategoryItem = {
  id: string;
  name: string;
  amount: number;
  transactionCount: number;
  icon?: string | null;
  color?: string | null;
  bgColor?: string | null;
  isParent: boolean;
  parentId?: string | null;
};

type Props = {
  categories?: CategoryItem[] | null;
  monthName?: string | null;
};

const fmt = (n: number) =>
  `$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export function TopCategoriesCard({ categories, monthName }: Props) {
  const C = useColors();
  const [expanded, setExpanded] = useState(false);

  if (!categories?.length) return null;

  const parents = categories.filter((c) => c.isParent);
  const childrenMap: Record<string, CategoryItem[]> = {};
  for (const c of categories) {
    if (!c.isParent && c.parentId) {
      if (!childrenMap[c.parentId]) childrenMap[c.parentId] = [];
      childrenMap[c.parentId].push(c);
    }
  }

  const topParents = [...parents]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
  const maxAmount = topParents[0]?.amount || 1;

  return (
    <View className="rounded-2xl p-5 gap-4 bg-surface-low">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">
          Category Spending
        </Text>
        <View className="flex-row items-center gap-2">
          {monthName && (
            <View className="px-2.5 py-1 rounded-full bg-surface-highest">
              <Text className="text-[9px] font-bold tracking-[1px] uppercase text-primary-bright">
                {monthName}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setExpanded((v) => !v)}
            activeOpacity={0.7}
            className="w-7 h-7 rounded-full items-center justify-center bg-surface-highest"
          >
            <DynamicIcon
              name={expanded ? "chevron-up" : "chevron-down"}
              size={14}
              color={C.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-3">
        {topParents.map((cat) => {
          const iconColor = cat.color ?? C.primaryBright;
          const bgColor = cat.bgColor ? `${cat.bgColor}33` : `${iconColor}1a`;
          const barPct = Math.min(cat.amount / maxAmount, 1);
          const children = (childrenMap[cat.id] ?? []).sort(
            (a, b) => b.amount - a.amount,
          );

          return (
            <View key={cat.id} className="gap-2">
              {/* Parent row */}
              <View className="flex-row items-center gap-3">
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center"
                  style={{ backgroundColor: bgColor }}
                >
                  <DynamicIcon
                    name={cat.icon ?? "folder"}
                    size={15}
                    color={iconColor}
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[13px] font-semibold text-on-surface">
                      {cat.name}
                    </Text>
                    <Text className="text-[13px] font-bold text-on-surface">
                      {fmt(cat.amount)}
                    </Text>
                  </View>
                  <View
                    className="h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: C.surfaceHighest }}
                  >
                    <View
                      style={{
                        width: `${barPct * 100}%`,
                        height: "100%",
                        backgroundColor: iconColor,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Child rows */}
              {expanded && children.length > 0 && (
                <View className="ml-11 gap-1.5">
                  {children.map((child) => (
                    <View
                      key={child.id}
                      className="flex-row items-center justify-between"
                    >
                      <View className="flex-row items-center gap-2">
                        <View
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: `${iconColor}80` }}
                        />
                        <Text className="text-[12px] text-on-surface-variant">
                          {child.name}
                        </Text>
                      </View>
                      <Text className="text-[12px] font-medium text-on-surface-variant">
                        {fmt(child.amount)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
