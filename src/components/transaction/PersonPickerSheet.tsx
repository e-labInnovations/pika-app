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
import { UserAvatar } from "../UserAvatar";
import { DynamicIcon } from "../Icon";
import { useGetPeople } from "../../services/gql/people/people.service";
import { type PersonFieldsFragment } from "../../services/gql/types/graphql";
import { useFormatMoney } from "../../lib/format-currency";
import { useColors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelect: (person: PersonFieldsFragment | null) => void;
}

export function PersonPickerSheet({ visible, onClose, selectedId, onSelect }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const fmt = useFormatMoney();
  const [search, setSearch] = useState("");

  const { people, loading } = useGetPeople({ limit: 200, sort: "name" });

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return people ?? [];
    return (people ?? []).filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.toLowerCase().includes(q),
    );
  }, [people, search]);

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
            <Text style={{ flex: 1, fontSize: 17, fontWeight: "800", color: C.onSurface }}>Person</Text>
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
              placeholder="Search people…"
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
                {/* None option */}
                <TouchableOpacity
                  onPress={() => { onSelect(null); onClose(); }}
                  activeOpacity={0.75}
                  style={{
                    flexDirection: "row", alignItems: "center", gap: 12,
                    paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14,
                    backgroundColor: !selectedId ? `${C.primary}18` : "transparent",
                  }}
                >
                  <View
                    style={{
                      width: 40, height: 40, borderRadius: 20,
                      backgroundColor: C.surfaceHigh,
                      alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <DynamicIcon name="user-x" size={18} color={C.onSurfaceVariant} />
                  </View>
                  <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: C.onSurfaceVariant }}>
                    None
                  </Text>
                  {!selectedId && <DynamicIcon name="check" size={16} color={C.primary} />}
                </TouchableOpacity>

                {filtered.map((person) => {
                  const isSelected = selectedId === person.id;
                  return (
                    <TouchableOpacity
                      key={person.id}
                      onPress={() => { onSelect(person); onClose(); }}
                      activeOpacity={0.75}
                      style={{
                        flexDirection: "row", alignItems: "center", gap: 12,
                        paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14,
                        backgroundColor: isSelected ? `${C.primary}18` : "transparent",
                      }}
                    >
                      <UserAvatar
                        id={person.id}
                        name={person.name}
                        avatarUrl={person.avatar?.url}
                        size={40}
                        radius={20}
                      />
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }} numberOfLines={1}>
                          {person.name}
                        </Text>
                        <Text style={{ fontSize: 12, color: C.onSurfaceVariant }} numberOfLines={1}>
                          {person.email ?? person.phone ?? fmt(person.balance ?? 0)}
                        </Text>
                      </View>
                      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
                    </TouchableOpacity>
                  );
                })}
                {filtered.length === 0 && (
                  <View style={{ padding: 32, alignItems: "center" }}>
                    <Text style={{ color: C.onSurfaceVariant, fontSize: 14 }}>No people found</Text>
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
