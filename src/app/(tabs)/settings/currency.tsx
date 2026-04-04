import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator, // used in save button
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../components/Icon";
import {
  useGetCurrencies,
  type CurrencyDoc,
} from "../../../services/gql/currencies/currencies.service";
import {
  useGetUserSettings,
  useUpdateUserSettings,
} from "../../../services/gql/user-settings/user-settings.service";
import { useColors } from "../../../theme/colors";

// ── Screen ─────────────────────────────────────────────────────────────────────

export default function CurrencyScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { currencies, loading: currenciesLoading } = useGetCurrencies();
  const { data: userSettings, loading: settingsLoading } = useGetUserSettings();
  const { updateUserSettings, loading: saving } = useUpdateUserSettings();

  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState<string>("");

  // Set initial selection once settings load
  useEffect(() => {
    if (userSettings?.currency && !selectedCode) {
      setSelectedCode(userSettings.currency);
    }
  }, [userSettings?.currency]);

  const savedCode = userSettings?.currency ?? "";
  const hasChanges = selectedCode !== savedCode && selectedCode !== "";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return currencies;
    return currencies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q),
    );
  }, [currencies, search]);

  const selectedCurrency = useMemo(
    () => currencies.find((c) => c.code === selectedCode),
    [currencies, selectedCode],
  );

  const handleSave = useCallback(async () => {
    if (!hasChanges || !userSettings?.id) return;
    await updateUserSettings({
      id: userSettings.id,
      data: { currency: selectedCode },
    });
    router.back();
  }, [hasChanges, selectedCode, userSettings?.id]);

  // ── Row ───────────────────────────────────────────────────────────────────

  const renderItem = useCallback(
    ({ item }: { item: CurrencyDoc }) => {
      const isSelected = item.code === selectedCode;
      return (
        <TouchableOpacity
          onPress={() => setSelectedCode(item.code)}
          activeOpacity={0.7}
          className="flex-row items-center gap-3 px-4 py-3"
        >
          {/* Symbol badge */}
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{
              backgroundColor: isSelected ? `${C.primary}22` : C.surfaceHighest,
            }}
          >
            <Text
              style={{
                fontSize: item.symbol.length > 2 ? 10 : 14,
                fontWeight: "800",
                color: isSelected ? C.primary : C.onSurfaceVariant,
              }}
              numberOfLines={1}
            >
              {item.symbol}
            </Text>
          </View>

          {/* Name + code */}
          <View className="flex-1 min-w-0">
            <Text
              className="text-[14px] font-semibold"
              style={{ color: isSelected ? C.primary : C.onSurface }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text className="text-[12px] text-on-surface-variant">
              {item.code}
              {item.symbol_native !== item.symbol ? ` · ${item.symbol_native}` : ""}
            </Text>
          </View>

          {isSelected && (
            <DynamicIcon name="check" size={16} color={C.primary} />
          )}
        </TouchableOpacity>
      );
    },
    [selectedCode, C],
  );

  const isLoading = currenciesLoading || settingsLoading;

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Currency
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View className="px-4 gap-3">
          {/* Search bar skeleton */}
          <Skeleton height={44} radius={16} />
          {/* Banner skeleton */}
          <Skeleton height={56} radius={16} />
          {/* Row skeletons */}
          <View className="rounded-2xl overflow-hidden bg-surface-mid">
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={i}>
                {i > 0 && (
                  <View className="mx-4" style={{ height: 1 }} />
                )}
                <View className="flex-row items-center gap-3 px-4 py-3">
                  <Skeleton width={40} height={40} radius={12} />
                  <View className="flex-1 gap-2">
                    <Skeleton width="50%" height={13} />
                    <Skeleton width="30%" height={11} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <>
          {/* Search + current banner */}
          <View className="px-4 gap-3 pb-2 bg-surface">
            {/* Search */}
            <View
              className="flex-row items-center gap-2 px-3 rounded-2xl"
              style={{ backgroundColor: C.surfaceMid, height: 44 }}
            >
              <DynamicIcon name="search" size={16} color={C.onSurfaceVariant} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search currencies..."
                className="flex-1 text-[15px] text-on-surface"
                placeholderTextColorClassName="accent-outline"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                  <DynamicIcon name="x" size={15} color={C.onSurfaceVariant} />
                </TouchableOpacity>
              )}
            </View>

            {/* Current selection */}
            {selectedCurrency && (
              <View
                className="flex-row items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  backgroundColor: hasChanges
                    ? `${C.primary}15`
                    : `${C.primaryBright}12`,
                }}
              >
                <DynamicIcon
                  name="globe"
                  size={16}
                  color={hasChanges ? C.primary : C.primaryBright}
                />
                <View className="flex-1">
                  <Text
                    className="text-[13px] font-semibold"
                    style={{ color: hasChanges ? C.primary : C.primaryBright }}
                  >
                    {hasChanges ? "New selection" : "Current default"}
                  </Text>
                  <Text className="text-[12px] text-on-surface-variant">
                    {selectedCurrency.name} · {selectedCurrency.code} · {selectedCurrency.symbol}
                  </Text>
                </View>
                {hasChanges && (
                  <TouchableOpacity
                    onPress={() => setSelectedCode(savedCode)}
                    activeOpacity={0.7}
                    className="px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${C.primary}22` }}
                  >
                    <Text
                      className="text-[11px] font-bold"
                      style={{ color: C.primary }}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {search.length > 0 && (
              <Text className="text-[12px] text-on-surface-variant px-1">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </Text>
            )}
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: hasChanges
                ? Math.max(insets.bottom, 16) + 80
                : 40,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            ItemSeparatorComponent={() => (
              <View
                className="mx-4"
                style={{ height: 1, backgroundColor: C.outlineVariant + "28" }}
              />
            )}
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-16 gap-2">
                <DynamicIcon name="search-x" size={32} color={C.outlineVariant} />
                <Text className="text-[14px] font-semibold text-on-surface-variant">
                  No currencies found
                </Text>
              </View>
            )}
          />
        </>
      )}

      {/* Save button — floats above list when changes pending */}
      {hasChanges && (
        <View
          className="absolute bottom-0 left-0 right-0 px-4 bg-surface"
          style={{
            paddingBottom: Math.max(insets.bottom, 16) + 4,
            paddingTop: 12,
          }}
        >
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving}
            className="flex-row items-center justify-center gap-2 py-4 rounded-2xl"
            style={{ backgroundColor: C.primary }}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <DynamicIcon name="check" size={18} color="#fff" />
                <Text className="text-[15px] font-bold text-white">
                  Save — {selectedCode}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
