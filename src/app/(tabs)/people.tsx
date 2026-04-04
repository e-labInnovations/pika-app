import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../components/Icon";
import { PersonCard } from "../../components/people/PersonCard";
import { useGetPeople } from "../../services/gql/people/people.service";
import { useColors } from "../../theme/colors";

export default function PeopleScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { people, loading, refetch } = useGetPeople({ limit: 100, sort: "name" });

  const filtered = useMemo(() => {
    if (!search.trim()) return people ?? [];
    const q = search.toLowerCase();
    return (people ?? []).filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.toLowerCase().includes(q),
    );
  }, [people, search]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="auto" />

      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-[22px] font-black tracking-[-0.5px] text-on-surface">
              People
            </Text>
            {people && people.length > 0 && (
              <Text className="text-[12px] text-on-surface-variant mt-0.5">
                {people.length} {people.length === 1 ? "person" : "people"}
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-high"
          >
            <DynamicIcon name="user-plus" size={17} color={C.primaryBright} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View
          className="flex-row items-center gap-2.5 px-3.5 rounded-xl bg-surface-mid"
          style={{ height: 44 }}
        >
          <DynamicIcon name="search" size={16} color={C.outlineVariant} />
          <TextInput
            className="flex-1 text-[14px] text-on-surface"
            placeholderTextColorClassName="accent-outline"
            placeholder="Search by name, email or phone…"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <DynamicIcon name="x" size={16} color={C.outline} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 8 }}
        renderItem={({ item }) => <PersonCard person={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          search.trim() && filtered.length > 0 ? (
            <Text className="text-[12px] font-semibold text-on-surface-variant mb-1">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20 gap-3">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
            >
              <DynamicIcon name="users" size={30} color={C.outlineVariant} />
            </View>
            <Text className="text-[15px] font-semibold text-on-surface-variant">
              {loading ? "Loading…" : search ? "No matches found" : "No people yet"}
            </Text>
            {!loading && !search && (
              <Text className="text-[13px] text-on-surface-variant text-center opacity-60 leading-relaxed">
                {"Add people to track shared\nexpenses and balances"}
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}
