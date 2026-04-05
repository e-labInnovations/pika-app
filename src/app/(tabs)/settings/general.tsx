import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Appearance,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../../../components/AccountAvatar";
import { DynamicIcon } from "../../../components/Icon";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useGetAccounts } from "../../../services/gql/accounts/accounts.service";
import type { AccountFieldsFragment } from "../../../services/gql/types/graphql";
import { UserSettingUpdate_theme_MutationInput } from "../../../services/gql/types/graphql";
import {
  useGetCurrencies,
  type CurrencyDoc,
} from "../../../services/gql/currencies/currencies.service";
import {
  useGetTimezones,
  type TimezoneDoc,
} from "../../../services/gql/timezones/timezones.service";
import {
  useGetUserSettings,
  useUpdateUserSettings,
} from "../../../services/gql/user-settings/user-settings.service";
import { useAuth } from "../../../context/AuthContext";
import { useColors } from "../../../theme/colors";

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ label, topPad }: { label: string; topPad?: boolean }) {
  return (
    <Text
      className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant px-1"
      style={{ marginTop: topPad ? 12 : 4, marginBottom: 4 }}
    >
      {label}
    </Text>
  );
}

// ── Timezone modal ────────────────────────────────────────────────────────────

function TimezoneModal({
  timezones,
  current,
  onSelect,
  onClose,
}: {
  timezones: TimezoneDoc[];
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return timezones;
    return timezones.filter(
      (tz) =>
        tz.label.toLowerCase().includes(q) ||
        tz.city.toLowerCase().includes(q) ||
        tz.region.toLowerCase().includes(q) ||
        tz.offset.toLowerCase().includes(q),
    );
  }, [timezones, search]);

  return (
    <View className="flex-1 bg-surface">
      {/* Handle */}
      <View className="items-center pt-3 pb-1">
        <View
          className="w-10 h-1 rounded-full"
          style={{ backgroundColor: C.outlineVariant }}
        />
      </View>

      {/* Header */}
      <View className="flex-row items-center px-5 py-3 gap-3">
        <Text className="flex-1 text-[18px] font-black text-on-surface">
          Timezone
        </Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
          <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 pb-3">
        <View
          className="flex-row items-center gap-2 px-3 rounded-2xl"
          style={{ backgroundColor: C.surfaceMid, height: 44 }}
        >
          <DynamicIcon name="search" size={16} color={C.onSurfaceVariant} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search timezones..."
            className="flex-1 text-[15px] text-on-surface"
            placeholderTextColorClassName="accent-outline"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <DynamicIcon name="x" size={15} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 20,
        }}
        ItemSeparatorComponent={() => (
          <View
            className="mx-4"
            style={{ height: 1, backgroundColor: C.outlineVariant + "28" }}
          />
        )}
        renderItem={({ item }) => {
          const isSelected = item.id === current;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item.id)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-4 py-3"
            >
              <View className="flex-1 min-w-0">
                <Text
                  className="text-[14px] font-semibold"
                  style={{ color: isSelected ? C.primary : C.onSurface }}
                  numberOfLines={1}
                >
                  {item.city}
                </Text>
                <Text className="text-[12px] text-on-surface-variant">
                  {item.region} · {item.offset}
                </Text>
              </View>
              {isSelected && (
                <DynamicIcon name="check" size={16} color={C.primary} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// ── Currency modal ────────────────────────────────────────────────────────────

function CurrencyModal({
  currencies,
  current,
  onSelect,
  onClose,
}: {
  currencies: CurrencyDoc[];
  current: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

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

  return (
    <View className="flex-1 bg-surface">
      {/* Handle */}
      <View className="items-center pt-3 pb-1">
        <View
          className="w-10 h-1 rounded-full"
          style={{ backgroundColor: C.outlineVariant }}
        />
      </View>

      {/* Header */}
      <View className="flex-row items-center px-5 py-3 gap-3">
        <Text className="flex-1 text-[18px] font-black text-on-surface">
          Currency
        </Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
          <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 pb-3">
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
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <DynamicIcon name="x" size={15} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) + 20 }}
        ItemSeparatorComponent={() => (
          <View
            className="mx-4"
            style={{ height: 1, backgroundColor: C.outlineVariant + "28" }}
          />
        )}
        renderItem={({ item }) => {
          const isSelected = item.code === current;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item.code)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-4 py-3"
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: isSelected
                    ? `${C.primary}22`
                    : C.surfaceHighest,
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
                  {item.symbol_native !== item.symbol
                    ? ` · ${item.symbol_native}`
                    : ""}
                </Text>
              </View>
              {isSelected && (
                <DynamicIcon name="check" size={16} color={C.primary} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// ── Account picker modal ──────────────────────────────────────────────────────

function AccountPickerModal({
  accounts,
  currentId,
  onSelect,
  onClose,
}: {
  accounts: AccountFieldsFragment[];
  currentId: string | null;
  onSelect: (id: string | null) => void;
  onClose: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface">
      {/* Handle */}
      <View className="items-center pt-3 pb-1">
        <View
          className="w-10 h-1 rounded-full"
          style={{ backgroundColor: C.outlineVariant }}
        />
      </View>

      {/* Header */}
      <View className="flex-row items-center px-5 py-3 gap-3">
        <Text className="flex-1 text-[18px] font-black text-on-surface">
          Default Account
        </Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1">
          <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 gap-2">
          {/* None option */}
          <TouchableOpacity
            onPress={() => onSelect(null)}
            activeOpacity={0.7}
            className="flex-row items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              backgroundColor:
                currentId === null ? `${C.primary}15` : C.surfaceMid,
            }}
          >
            <View
              className="w-11 h-11 rounded-xl items-center justify-center"
              style={{
                backgroundColor:
                  currentId === null ? `${C.primary}22` : C.surfaceHigh,
              }}
            >
              <DynamicIcon
                name="ban"
                size={18}
                color={currentId === null ? C.primary : C.onSurfaceVariant}
              />
            </View>
            <Text
              className="flex-1 text-[14px] font-semibold"
              style={{ color: currentId === null ? C.primary : C.onSurface }}
            >
              None
            </Text>
            {currentId === null && (
              <DynamicIcon name="check" size={16} color={C.primary} />
            )}
          </TouchableOpacity>

          {/* Account rows */}
          {accounts.map((account) => {
            const isSelected = account.id === currentId;
            return (
              <TouchableOpacity
                key={account.id}
                onPress={() => onSelect(account.id)}
                activeOpacity={0.7}
                className="flex-row items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  backgroundColor: isSelected ? `${C.primary}15` : C.surfaceMid,
                }}
              >
                <AccountAvatar
                  avatarUrl={account.avatar?.url}
                  icon={account.icon ?? "wallet"}
                  iconColor={account.color ?? "#ffffff"}
                  bgColor={account.bgColor}
                  name={account.name}
                  size={44}
                />
                <View className="flex-1 min-w-0">
                  <Text
                    className="text-[14px] font-semibold"
                    style={{ color: isSelected ? C.primary : C.onSurface }}
                    numberOfLines={1}
                  >
                    {account.name}
                  </Text>
                  {account.description ? (
                    <Text
                      className="text-[12px] text-on-surface-variant"
                      numberOfLines={1}
                    >
                      {account.description}
                    </Text>
                  ) : null}
                </View>
                {isSelected && (
                  <DynamicIcon name="check" size={16} color={C.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function GeneralSettingsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user } = useAuth();
  const { data: userSettings, loading } = useGetUserSettings(user?.id);
  const { updateUserSettings } = useUpdateUserSettings();
  const { accounts } = useGetAccounts({ limit: 100, sort: "name" });
  const { timezones } = useGetTimezones();
  const { currencies } = useGetCurrencies();

  // Local state mirrors
  const [theme, setTheme] = useState<string>("system");
  const [timezone, setTimezone] = useState<string>("UTC");
  const [currency, setCurrency] = useState<string>("USD");
  const [defaultAccountId, setDefaultAccountId] = useState<string | null>(null);
  const [geminiKey, setGeminiKey] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Modal visibility
  const [tzModal, setTzModal] = useState(false);
  const [currModal, setCurrModal] = useState(false);
  const [acctModal, setAcctModal] = useState(false);

  // Sync local state whenever the saved values change (cache→network update)
  useEffect(() => {
    if (!userSettings) return;
    const t = userSettings.theme ?? "system";
    setTheme(t);
    setTimezone(userSettings.timezone ?? "UTC");
    setCurrency(userSettings.currency ?? "USD");
    setDefaultAccountId(userSettings.defaultAccount?.id ?? null);
    setGeminiKey(userSettings.geminiApiKey ?? "");
    // Restore visual theme on app start / re-open
    Appearance.setColorScheme(t === "system" ? "unspecified" : (t as "light" | "dark"));
  }, [
    userSettings?.id,
    userSettings?.theme,
    userSettings?.timezone,
    userSettings?.currency,
    userSettings?.defaultAccount?.id,
    userSettings?.geminiApiKey,
  ]);

  // ── Derived ────────────────────────────────────────────────────────────────────

  const savedTheme = userSettings?.theme ?? "system";
  const savedTimezone = userSettings?.timezone ?? "UTC";
  const savedCurrency = userSettings?.currency ?? "USD";
  const savedAccountId = userSettings?.defaultAccount?.id ?? null;
  const savedGemini = userSettings?.geminiApiKey ?? "";

  const hasChanges =
    theme !== savedTheme ||
    timezone !== savedTimezone ||
    currency !== savedCurrency ||
    defaultAccountId !== savedAccountId ||
    geminiKey !== savedGemini;

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleTheme = (val: string) => {
    setTheme(val);
    // Apply visually immediately so the user can preview
    Appearance.setColorScheme(
      val === "system" ? "unspecified" : (val as "light" | "dark"),
    );
  };

  const handleTimezone = (tz: string) => {
    setTimezone(tz);
    setTzModal(false);
  };

  const handleCurrency = (code: string) => {
    setCurrency(code);
    setCurrModal(false);
  };

  const handleDefaultAccount = (id: string | null) => {
    setDefaultAccountId(id);
    setAcctModal(false);
  };

  const handleDiscard = () => {
    setTheme(savedTheme);
    setTimezone(savedTimezone);
    setCurrency(savedCurrency);
    setDefaultAccountId(savedAccountId);
    setGeminiKey(savedGemini);
    // Revert visual theme
    Appearance.setColorScheme(
      savedTheme === "system" ? "unspecified" : (savedTheme as "light" | "dark"),
    );
  };

  const handleSave = async () => {
    if (!userSettings?.id || saving) return;
    setSaving(true);
    try {
      await updateUserSettings({
        id: userSettings.id,
        data: {
          theme: theme as UserSettingUpdate_theme_MutationInput,
          timezone,
          currency,
          defaultAccount: defaultAccountId,
          geminiApiKey: geminiKey,
        },
      });
    } catch (err: any) {
      // Revert visual theme on failure
      Appearance.setColorScheme(
        savedTheme === "system" ? "unspecified" : (savedTheme as "light" | "dark"),
      );
      const msg =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        "Failed to save settings.";
      Alert.alert("Error", msg);
    } finally {
      setSaving(false);
    }
  };

  const defaultAccount = (accounts ?? []).find(
    (a) => a.id === defaultAccountId,
  );

  // ── Render ────────────────────────────────────────────────────────────────────

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
            General
          </Text>
        </View>
      </View>

      {loading && !userSettings ? (
        /* ── Skeleton ─────────────────────────────────────────────────────── */
        <View className="px-4 gap-2">
          <View style={{ height: 8 }} />
          <Skeleton height={11} width="25%" radius={6} />
          <View style={{ height: 2 }} />
          <View className="rounded-2xl bg-surface-mid px-4 py-4 gap-3">
            <View className="flex-row items-center gap-3">
              <Skeleton width={36} height={36} radius={10} />
              <View className="flex-1 gap-2">
                <Skeleton width="35%" height={13} />
                <Skeleton width="55%" height={11} />
              </View>
            </View>
            <Skeleton height={40} radius={12} />
          </View>
          <View style={{ height: 8 }} />
          <Skeleton height={11} width="20%" radius={6} />
          <View style={{ height: 2 }} />
          <View className="rounded-2xl bg-surface-mid">
            {[0, 1].map((i) => (
              <View key={i}>
                {i > 0 && (
                  <View
                    className="mx-4"
                    style={{
                      height: 1,
                      backgroundColor: C.outlineVariant + "28",
                    }}
                  />
                )}
                <View className="flex-row items-center gap-3 px-4 py-4">
                  <Skeleton width={36} height={36} radius={10} />
                  <View className="flex-1 gap-2">
                    <Skeleton width="40%" height={13} />
                    <Skeleton width="60%" height={11} />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={{ height: 8 }} />
          <Skeleton height={11} width="15%" radius={6} />
          <View style={{ height: 2 }} />
          <View className="rounded-2xl bg-surface-mid px-4 py-4 gap-3">
            <View className="flex-row items-center gap-3">
              <Skeleton width={36} height={36} radius={10} />
              <View className="flex-1 gap-2">
                <Skeleton width="40%" height={13} />
                <Skeleton width="55%" height={11} />
              </View>
            </View>
            <Skeleton height={44} radius={12} />
          </View>
        </View>
      ) : (
        /* ── Content ──────────────────────────────────────────────────────── */
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: hasChanges
              ? Math.max(insets.bottom, 16) + 88
              : Math.max(insets.bottom, 16) + 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Appearance ──────────────────────────────────────────────────── */}
          <SectionLabel label="Appearance" />
          <View
            className="rounded-2xl px-4 py-4"
            style={{ backgroundColor: C.surfaceMid }}
          >
            {/* Row header */}
            <View className="flex-row items-center gap-3 mb-3">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${C.primary}20` }}
              >
                <DynamicIcon name="palette" size={17} color={C.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-on-surface">
                  Theme
                </Text>
                <Text className="text-[12px] text-on-surface-variant">
                  Choose your preferred appearance
                </Text>
              </View>
            </View>

            {/* 3-way segment */}
            <View
              className="flex-row rounded-xl p-1"
              style={{ backgroundColor: C.surfaceHigh }}
            >
              {(
                [
                  { value: "system", icon: "monitor", label: "System" },
                  { value: "light", icon: "sun", label: "Light" },
                  { value: "dark", icon: "moon", label: "Dark" },
                ] as const
              ).map((opt) => {
                const isActive = theme === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => handleTheme(opt.value)}
                    activeOpacity={0.7}
                    className="flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg"
                    style={
                      isActive
                        ? {
                            backgroundColor: C.surfaceMid,
                            shadowColor: "#000",
                            shadowOpacity: 0.06,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 1 },
                          }
                        : undefined
                    }
                  >
                    <DynamicIcon
                      name={opt.icon}
                      size={14}
                      color={isActive ? C.primary : C.onSurfaceVariant}
                    />
                    <Text
                      className="text-[13px] font-semibold"
                      style={{
                        color: isActive ? C.primary : C.onSurfaceVariant,
                      }}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── Regional ────────────────────────────────────────────────────── */}
          <SectionLabel label="Regional" topPad />
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: C.surfaceMid }}
          >
            <TouchableOpacity
              onPress={() => setTzModal(true)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-4 py-3.5"
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: "#6366f120" }}
              >
                <DynamicIcon name="clock" size={17} color="#6366f1" />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="text-[14px] font-semibold text-on-surface">
                  Timezone
                </Text>
                <Text
                  className="text-[12px] text-on-surface-variant"
                  numberOfLines={1}
                >
                  {timezone.replace(/_/g, " ")}
                </Text>
              </View>
              <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: C.outlineVariant + "28", marginHorizontal: 16 }} />

            <TouchableOpacity
              onPress={() => setCurrModal(true)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-4 py-3.5"
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: "#22c55e20" }}
              >
                <DynamicIcon name="dollar-sign" size={17} color="#22c55e" />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="text-[14px] font-semibold text-on-surface">
                  Currency
                </Text>
                <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                  {currency}
                  {currencies.find((c) => c.code === currency)
                    ? ` · ${currencies.find((c) => c.code === currency)!.name}`
                    : ""}
                </Text>
              </View>
              <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
            </TouchableOpacity>
          </View>

          {/* ── Accounts ────────────────────────────────────────────────────── */}
          <SectionLabel label="Accounts" topPad />
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: C.surfaceMid }}
          >
            <TouchableOpacity
              onPress={() => setAcctModal(true)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-4 py-3.5"
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: "#f59e0b20" }}
              >
                <DynamicIcon name="wallet" size={17} color="#f59e0b" />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="text-[14px] font-semibold text-on-surface">
                  Default Account
                </Text>
                <Text
                  className="text-[12px] text-on-surface-variant"
                  numberOfLines={1}
                >
                  {defaultAccount?.name ?? "None selected"}
                </Text>
              </View>
              <DynamicIcon name="chevron-right" size={16} color={C.outlineVariant} />
            </TouchableOpacity>
          </View>

          {/* ── AI Settings ─────────────────────────────────────────────────── */}
          <SectionLabel label="AI" topPad />
          <View
            className="rounded-2xl px-4 py-4 gap-3"
            style={{ backgroundColor: C.surfaceMid }}
          >
            {/* Row header */}
            <View className="flex-row items-center gap-3">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: "#8b5cf620" }}
              >
                <DynamicIcon name="sparkles" size={17} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-on-surface">
                  Gemini API Key
                </Text>
                <Text className="text-[12px] text-on-surface-variant">
                  Powers AI transaction parsing
                </Text>
              </View>
            </View>

            {/* Input */}
            <View
              className="flex-row items-center gap-2 px-3 rounded-xl"
              style={{ backgroundColor: C.surfaceHigh, height: 46 }}
            >
              <TextInput
                value={geminiKey}
                onChangeText={setGeminiKey}
                placeholder="AIzaSy..."
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                className="flex-1 text-[14px] text-on-surface"
                placeholderTextColorClassName="accent-outline"
              />
            </View>

            <Text className="text-[11px] text-on-surface-variant opacity-70 px-0.5">
              Stored securely on your account
            </Text>
          </View>
        </ScrollView>
      )}

      {/* ── Floating save bar ──────────────────────────────────────────────── */}
      {hasChanges && (
        <View
          className="absolute bottom-0 left-0 right-0 px-4 bg-surface"
          style={{
            paddingBottom: Math.max(insets.bottom, 16) + 4,
            paddingTop: 12,
          }}
        >
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleDiscard}
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl flex-1"
              style={{ backgroundColor: C.surfaceMid }}
            >
              <DynamicIcon name="x" size={16} color={C.onSurfaceVariant} />
              <Text className="text-[14px] font-semibold text-on-surface-variant">
                Discard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={saving}
              className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl flex-2"
              style={{ backgroundColor: C.primary }}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <DynamicIcon name="check" size={16} color="#fff" />
                  <Text className="text-[14px] font-bold text-white">
                    Save changes
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Timezone modal ─────────────────────────────────────────────────── */}
      <Modal
        visible={tzModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setTzModal(false)}
      >
        <TimezoneModal
          timezones={timezones}
          current={timezone}
          onSelect={handleTimezone}
          onClose={() => setTzModal(false)}
        />
      </Modal>

      {/* ── Currency modal ─────────────────────────────────────────────────── */}
      <Modal
        visible={currModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setCurrModal(false)}
      >
        <CurrencyModal
          currencies={currencies}
          current={currency}
          onSelect={handleCurrency}
          onClose={() => setCurrModal(false)}
        />
      </Modal>

      {/* ── Account picker modal ───────────────────────────────────────────── */}
      <Modal
        visible={acctModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setAcctModal(false)}
      >
        <AccountPickerModal
          accounts={accounts ?? []}
          currentId={defaultAccountId}
          onSelect={handleDefaultAccount}
          onClose={() => setAcctModal(false)}
        />
      </Modal>
    </View>
  );
}
