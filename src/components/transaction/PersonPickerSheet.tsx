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
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">Person</Text>
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
            <View className="p-10 items-center">
              <ActivityIndicator colorClassName="accent-primary" />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View className="px-4 pb-2 gap-0.5">
                {/* None option */}
                <TouchableOpacity
                  onPress={() => { onSelect(null); onClose(); }}
                  activeOpacity={0.75}
                  className={[
                    "flex-row items-center gap-3 py-2.5 px-3 rounded-2xl",
                    !selectedId ? "bg-primary/10" : "bg-transparent",
                  ].join(" ")}
                >
                  <View className="w-10 h-10 rounded-full bg-surface-high items-center justify-center">
                    <DynamicIcon name="user-x" size={18} color={C.onSurfaceVariant} />
                  </View>
                  <Text className="flex-1 text-sm font-semibold text-on-surface-variant">None</Text>
                  {!selectedId && <DynamicIcon name="check" size={16} color={C.primary} />}
                </TouchableOpacity>

                {filtered.map((person) => {
                  const isSelected = selectedId === person.id;
                  return (
                    <TouchableOpacity
                      key={person.id}
                      onPress={() => { onSelect(person); onClose(); }}
                      activeOpacity={0.75}
                      className={[
                        "flex-row items-center gap-3 py-2.5 px-3 rounded-2xl",
                        isSelected ? "bg-primary/10" : "bg-transparent",
                      ].join(" ")}
                    >
                      <UserAvatar
                        id={person.id}
                        name={person.name}
                        avatarUrl={person.avatar?.url}
                        size={40}
                        radius={20}
                      />
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-semibold text-on-surface" numberOfLines={1}>
                          {person.name}
                        </Text>
                        <Text className="text-xs text-on-surface-variant" numberOfLines={1}>
                          {person.email ?? person.phone ?? fmt(person.balance ?? 0)}
                        </Text>
                      </View>
                      {isSelected && <DynamicIcon name="check" size={16} color={C.primary} />}
                    </TouchableOpacity>
                  );
                })}
                {filtered.length === 0 && (
                  <View className="p-8 items-center">
                    <Text className="text-on-surface-variant text-sm">No people found</Text>
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
