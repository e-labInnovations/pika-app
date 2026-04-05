import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Skeleton } from "../ui/Skeleton";
import { useGetTags } from "../../services/gql/tags/tags.service";
import { useColors } from "../../theme/colors";

export function SpendingTagsCard() {
  const C = useColors();
  const { tags: allTags, loading } = useGetTags({ limit: 100, sort: "name" });
  const tags = allTags?.filter((t) => t.isActive !== false);

  const showSkeleton = loading && !tags?.length;
  if (!showSkeleton && !tags?.length) return null;

  return (
    <View className="rounded-2xl p-5 gap-3.5 bg-surface-low">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold tracking-[-0.2px] text-on-surface">Spending Tags</Text>
        <TouchableOpacity onPress={() => router.push("/settings/tags")} activeOpacity={0.75}>
          <Text className="text-[13px] font-semibold text-primary-bright">See All</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {showSkeleton
          ? [80, 100, 70, 90, 60, 85].map((w, i) => (
              <Skeleton key={i} width={w} height={32} radius={99} />
            ))
          : tags!.map((tag) => {
              const fg = tag.color ?? C.primaryBright;
              const bg = tag.bgColor ?? `${fg}1a`;
              const border = `${fg}33`;
              return (
                <TouchableOpacity
                  key={tag.id}
                  activeOpacity={0.75}
                  className="px-3.5 py-2 rounded-full border"
                  style={{ backgroundColor: bg, borderColor: border }}
                  onPress={() => router.push({ pathname: "/(tabs)/history", params: { tagId: tag.id } })}
                >
                  <Text
                    className="text-[10px] font-bold tracking-[0.8px] uppercase"
                    style={{ color: fg }}
                  >
                    #{tag.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </View>
    </View>
  );
}
