/**
 * "Split with…" sheet: pick the people who share an expense and how much each owes.
 * Even split divides the amount between you and them (you keep any leftover paisa);
 * custom lets you type each share. Your own share is whatever is left.
 */
import React, { useEffect, useMemo, useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserAvatar } from "../UserAvatar";
import { DynamicIcon } from "../Icon";
import { PickerListSkeleton } from "../ui/PickerSkeletons";
import { useGetPeople } from "../../services/gql/people/people.service";
import { type PersonFieldsFragment } from "../../services/gql/types/graphql";
import { useFormatMoney } from "../../lib/format-currency";
import { useColors } from "../../theme/colors";

export type SplitShare = { person: PersonFieldsFragment; amount: string };

interface Props {
  visible: boolean;
  onClose: () => void;
  /** The expense amount being split */
  total: string;
  value: SplitShare[];
  onApply: (shares: SplitShare[]) => void;
}

// Work in paisa so shares add up exactly
const toPaisa = (s: string) => Math.round((parseFloat(s) || 0) * 100);
const fromPaisa = (p: number) => (p / 100).toFixed(2).replace(/\.00$/, "");

/** Each friend gets an equal floor share of the total split between them and you. */
export function evenShares(total: string, count: number): string[] {
  if (count === 0) return [];
  const each = Math.floor(toPaisa(total) / (count + 1));
  return Array.from({ length: count }, () => fromPaisa(each));
}

export function SplitSheet({ visible, onClose, total, value, onApply }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const fmt = useFormatMoney();
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<SplitShare[]>(value);
  const [even, setEven] = useState(true);
  const { people, loading } = useGetPeople({ limit: 200, sort: "name" });

  // Re-seed from the form each time the sheet opens
  useEffect(() => {
    if (!visible) return;
    setPicked(value);
    setSearch("");
    const e = evenShares(total, value.length);
    setEven(value.length === 0 || value.every((s, i) => s.amount === e[i]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const shares = useMemo(() => {
    if (!even) return picked;
    const e = evenShares(total, picked.length);
    return picked.map((s, i) => ({ ...s, amount: e[i] }));
  }, [picked, even, total]);

  const sharesPaisa = shares.reduce((sum, s) => sum + toPaisa(s.amount), 0);
  const myPaisa = toPaisa(total) - sharesPaisa;
  const invalid = myPaisa < 0 || shares.some((s) => toPaisa(s.amount) <= 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return (people ?? []).filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [people, search]);

  const toggle = (person: PersonFieldsFragment) =>
    setPicked((cur) =>
      cur.some((s) => s.person.id === person.id)
        ? cur.filter((s) => s.person.id !== person.id)
        : [...cur, { person, amount: "" }],
    );

  const setAmount = (id: string, amount: string) =>
    setPicked((cur) => cur.map((s) => (s.person.id === id ? { ...s, amount } : s)));

  const switchToCustom = () => {
    setPicked(shares); // start custom editing from the even amounts
    setEven(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl max-h-[85%]"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          <View className="items-center pt-3 pb-1">
            <View className="w-9 h-1 rounded-sm bg-outline-variant" />
          </View>

          <View className="flex-row items-center px-5 py-3">
            <Text className="flex-1 text-[17px] font-extrabold text-on-surface">Split with</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} className="p-1.5 rounded-full bg-surface-high">
              <DynamicIcon name="x" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Even / custom */}
          <View className="flex-row mx-5 mb-3 bg-surface-high rounded-xl p-1">
            {[
              { key: true, label: "Split evenly" },
              { key: false, label: "Custom amounts" },
            ].map((o) => (
              <TouchableOpacity
                key={o.label}
                onPress={() => (o.key ? setEven(true) : switchToCustom())}
                activeOpacity={0.8}
                className={["flex-1 py-2 rounded-lg items-center", even === o.key ? "bg-primary/15" : ""].join(" ")}
              >
                <Text className={["text-[13px] font-bold", even === o.key ? "text-primary" : "text-on-surface-variant"].join(" ")}>
                  {o.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className="px-4 pb-2 gap-0.5">
              {loading ? (
                <PickerListSkeleton count={5} />
              ) : (
                filtered.map((person) => {
                  const share = shares.find((s) => s.person.id === person.id);
                  return (
                    <View
                      key={person.id}
                      className={["flex-row items-center gap-3 py-2 px-3 rounded-2xl", share ? "bg-primary/10" : ""].join(" ")}
                    >
                      <TouchableOpacity
                        onPress={() => toggle(person)}
                        activeOpacity={0.75}
                        className="flex-1 flex-row items-center gap-3"
                      >
                        <DynamicIcon
                          name={share ? "square-check" : "square"}
                          size={18}
                          color={share ? C.primary : C.outlineVariant}
                        />
                        <UserAvatar id={person.id} name={person.name} avatarUrl={person.avatar?.url} size={36} radius={18} />
                        <Text className="flex-1 text-sm font-semibold text-on-surface" numberOfLines={1}>
                          {person.name}
                        </Text>
                      </TouchableOpacity>
                      {share &&
                        (even ? (
                          <Text className="text-sm font-bold text-on-surface">{fmt(parseFloat(share.amount) || 0)}</Text>
                        ) : (
                          <TextInput
                            className="w-24 text-right text-sm font-bold text-on-surface bg-surface-low border border-outline-variant rounded-lg px-2 py-1.5"
                            keyboardType="decimal-pad"
                            placeholder="0"
                            placeholderTextColorClassName="accent-outline-variant"
                            value={share.amount}
                            onChangeText={(t) => setAmount(person.id, t.replace(/[^0-9.]/g, ""))}
                          />
                        ))}
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>

          {/* Summary + apply */}
          <View className="px-5 pt-3 gap-2 border-t border-outline-variant/30">
            <View className="flex-row justify-between">
              <Text className="text-sm text-on-surface-variant">Your share</Text>
              <Text className={["text-sm font-extrabold", myPaisa < 0 ? "text-tertiary" : "text-on-surface"].join(" ")}>
                {fmt(myPaisa / 100)}
              </Text>
            </View>
            {myPaisa < 0 && (
              <Text className="text-xs text-tertiary">Shares add up to more than the amount.</Text>
            )}
            <View className="flex-row gap-2">
              {value.length > 0 && (
                <TouchableOpacity
                  onPress={() => { onApply([]); onClose(); }}
                  activeOpacity={0.8}
                  className="py-3.5 px-4 rounded-2xl bg-surface-high items-center"
                >
                  <Text className="text-sm font-bold text-on-surface-variant">Remove split</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                disabled={invalid}
                onPress={() => { onApply(shares); onClose(); }}
                activeOpacity={0.85}
                className={["flex-1 py-3.5 rounded-2xl items-center", invalid ? "bg-outline-variant/40" : "bg-primary"].join(" ")}
              >
                <Text className="text-sm font-bold text-white">
                  {shares.length ? `Split with ${shares.length}` : "No split"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
