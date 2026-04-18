import React from "react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

/**
 * Row skeleton for list-style pickers (AccountPicker, PersonPicker,
 * CategoryPicker child rows, FilterSheet list panels).
 */
export function PickerRowSkeleton({ indented = false }: { indented?: boolean }) {
  return (
    <View
      className="flex-row items-center gap-3 py-2.5 rounded-2xl"
      style={{ paddingLeft: indented ? 36 : 12, paddingRight: 12 }}
    >
      <Skeleton width={36} height={36} radius={10} />
      <View className="flex-1 gap-1.5">
        <Skeleton width="60%" height={13} />
        <Skeleton width="40%" height={10} />
      </View>
    </View>
  );
}

/**
 * Pill / chip skeleton — used for tag pickers etc.
 */
export function ChipSkeleton({ width = 86 }: { width?: number }) {
  return <Skeleton width={width} height={32} radius={999} />;
}

/**
 * Full list of row skeletons. `indented` follows a simple pattern suitable
 * for category-like hierarchy.
 */
export function PickerListSkeleton({
  count = 6,
  indented = false,
}: {
  count?: number;
  indented?: boolean;
}) {
  return (
    <View className="gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <PickerRowSkeleton key={i} indented={indented} />
      ))}
    </View>
  );
}

/** Wrap flex-wrap chip skeletons. */
export function ChipListSkeleton({ count = 8 }: { count?: number }) {
  const widths = [68, 88, 56, 102, 74, 94, 60, 80];
  return (
    <View className="flex-row flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <ChipSkeleton key={i} width={widths[i % widths.length]} />
      ))}
    </View>
  );
}
