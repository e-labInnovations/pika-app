import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
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
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.45)" }}>
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "75%",
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.outlineVariant }} />
          </View>

          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12 }}>
            <Text style={{ flex: 1, fontSize: 17, fontWeight: "800", color: C.onSurface }}>{title}</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}
              style={{ padding: 6, borderRadius: 20, backgroundColor: C.surfaceHigh }}>
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View
            style={{
              flexDirection: "row", alignItems: "center", gap: 8,
              marginHorizontal: 20, marginBottom: 12,
              backgroundColor: C.surfaceHigh, borderRadius: 12,
              paddingHorizontal: 12, height: 42,
            }}
          >
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: C.onSurface }}
              placeholderTextColor={C.outlineVariant}
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

          {loading ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <ActivityIndicator color={C.primary} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View style={{ paddingHorizontal: 16, paddingBottom: 8, gap: 2 }}>
                {filtered.map((account) => {
                  const isSelected = selectedId === account.id;
                  return (
                    <TouchableOpacity
                      key={account.id}
                      onPress={() => { onSelect(account); onClose(); }}
                      activeOpacity={0.75}
                      style={{
                        flexDirection: "row", alignItems: "center", gap: 12,
                        paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14,
                        backgroundColor: isSelected ? `${C.primary}18` : "transparent",
                      }}
                    >
                      <AccountAvatar
                        avatarUrl={account.avatar?.url}
                        icon={account.icon}
                        bgColor={account.bgColor}
                        iconColor={account.color}
                        name={account.name}
                        size={40}
                      />
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }} numberOfLines={1}>
                          {account.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12, fontWeight: "600",
                            color: (account.balance ?? 0) >= 0 ? "#10b981" : "#ef4444",
                          }}
                        >
                          {fmt(account.balance ?? 0)}
                        </Text>
                      </View>
                      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
                    </TouchableOpacity>
                  );
                })}
                {filtered.length === 0 && (
                  <View style={{ padding: 32, alignItems: "center" }}>
                    <Text style={{ color: C.onSurfaceVariant, fontSize: 14 }}>No accounts found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
