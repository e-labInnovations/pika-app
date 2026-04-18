import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountAvatar } from "../AccountAvatar";
import { DynamicIcon } from "../Icon";
import { PickerListSkeleton } from "../ui/PickerSkeletons";
import { EmptyAccountsCard } from "../account/EmptyAccountsCard";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { type AccountFieldsFragment } from "../../services/gql/types/graphql";
import { useFormatMoney } from "../../lib/format-currency";
import { useColors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelect: (account: AccountFieldsFragment) => void;
  /** Exclude this account ID from the list (e.g., the "from" account in a transfer) */
  excludeId?: string | null;
  title?: string;
}

export function AccountPickerSheet({ visible, onClose, selectedId, onSelect, excludeId, title = "Account" }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const fmt = useFormatMoney();
  const [search, setSearch] = useState("");

  const { accounts, loading } = useGetAccounts({ limit: 200, sort: "name" });

  const filtered = useMemo(() => {
    const all = (accounts ?? []).filter((a) => a.id !== excludeId);
    const q = search.toLowerCase().trim();
    if (!q) return all;
    return all.filter((a) => a.name.toLowerCase().includes(q));
  }, [accounts, search, excludeId]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl max-h-[75%]"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-9 h-1 rounded-sm bg-outline-variant" />
          </View>

          {/* Header */}
          <View className="flex-row items-center px-5 py-3">
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">{title}</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1.5 rounded-full bg-surface-high">
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View className="flex-row items-center gap-2 mx-5 mb-3 bg-surface-high rounded-xl px-3 h-[42px]">
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              className="flex-1 text-sm text-on-surface"
              placeholderTextColorClassName="accent-outline-variant"
              placeholder="Search accounts…"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                <DynamicIcon name="x" size={14} color={C.outlineVariant} />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className="px-4 pb-2 gap-0.5">
              {loading ? (
                <PickerListSkeleton count={5} />
              ) : (
                <>
                {filtered.map((account) => {
                  const isSelected = selectedId === account.id;
                  return (
                    <TouchableOpacity
                      key={account.id}
                      onPress={() => { onSelect(account); onClose(); }}
                      activeOpacity={0.75}
                      className={[
                        "flex-row items-center gap-3 py-2.5 px-3 rounded-2xl",
                        isSelected ? "bg-primary/10" : "bg-transparent",
                      ].join(" ")}
                    >
                      <AccountAvatar
                        avatarUrl={account.avatar?.url}
                        icon={account.icon}
                        bgColor={account.bgColor}
                        iconColor={account.color}
                        name={account.name}
                        size={40}
                      />
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-semibold text-on-surface" numberOfLines={1}>
                          {account.name}
                        </Text>
                        <Text
                          className="text-xs font-semibold"
                          style={{ color: (account.balance ?? 0) >= 0 ? "#10b981" : "#ef4444" }}
                        >
                          {fmt(account.balance ?? 0)}
                        </Text>
                      </View>
                      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
                    </TouchableOpacity>
                  );
                })}
                {filtered.length === 0 &&
                  ((accounts?.length ?? 0) === 0 ? (
                    <View className="pt-2 pb-4">
                      <EmptyAccountsCard compact onBeforeNavigate={onClose} />
                    </View>
                  ) : (
                    <View className="p-10 items-center gap-2">
                      <DynamicIcon name="wallet" size={28} color={C.outlineVariant} />
                      <Text className="text-on-surface-variant text-sm">No accounts found</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
