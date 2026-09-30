/**
 * Prompt composer with inline entity chips.
 *
 * Text and chips (people, accounts, categories, tags) flow in wrapped lines, with one
 * live TextInput at the cursor position. Type "@" to pick an entity from a strip that
 * filters as you type; Backspace at the start of the input removes the chip before it
 * in one press. Tapping earlier text moves the input there.
 *
 * The value is serialised as plain text with `@[Name](type:id)` tokens, which the
 * backend reads as authoritative entity IDs.
 */
import React, { useMemo, useRef, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserAvatar } from "../UserAvatar";
import { AccountAvatar } from "../AccountAvatar";
import { DynamicIcon } from "../Icon";
import { useGetPeople } from "../../services/gql/people/people.service";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useGetCategories } from "../../services/gql/categories/categories.service";
import { useGetTags } from "../../services/gql/tags/tags.service";
import { useColors } from "../../theme/colors";

export type EntityType = "person" | "account" | "category" | "tag";

export type ComposerEntity = {
  type: EntityType;
  id: string;
  name: string;
  avatarUrl?: string | null;
  icon?: string | null;
  color?: string | null;
  bgColor?: string | null;
};

export type Segment = { kind: "text"; text: string } | { kind: "token"; entity: ComposerEntity };

/** Composer state: segments before the cursor, the text being typed, segments after it. */
export type ComposerValue = { before: Segment[]; draft: string; after: Segment[] };

export const emptyComposer = (text = ""): ComposerValue => ({ before: [], draft: text, after: [] });

const tokenText = (e: ComposerEntity) => `@[${e.name.replace(/[\[\]\n]/g, " ")}](${e.type}:${e.id})`;

/** The text sent to the AI: plain text with `@[Name](type:id)` tokens. */
export function serializeComposer(v: ComposerValue): string {
  const all: Segment[] = [...v.before, { kind: "text", text: v.draft }, ...v.after];
  return all
    .map((s) => (s.kind === "text" ? s.text : tokenText(s.entity)))
    .join("")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export const composerIsEmpty = (v: ComposerValue) => serializeComposer(v).length === 0;

/** Merge neighbouring text segments so the model stays small. */
function compact(segs: Segment[]): Segment[] {
  const out: Segment[] = [];
  for (const s of segs) {
    const last = out[out.length - 1];
    if (s.kind === "text" && last?.kind === "text") out[out.length - 1] = { kind: "text", text: last.text + s.text };
    else if (s.kind === "text" && s.text === "") continue;
    else out.push(s);
  }
  return out;
}

const TYPE_LABEL: Record<EntityType, string> = { person: "Person", account: "Account", category: "Category", tag: "Tag" };

function EntityIcon({ e, size }: { e: ComposerEntity; size: number }) {
  if (e.type === "person")
    return <UserAvatar id={e.id} name={e.name} avatarUrl={e.avatarUrl} size={size} radius={size / 2} />;
  if (e.type === "account")
    return (
      <AccountAvatar
        avatarUrl={e.avatarUrl}
        icon={e.icon ?? undefined}
        iconColor={e.color ?? undefined}
        bgColor={e.bgColor ?? undefined}
        name={e.name}
        size={size}
      />
    );
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: e.bgColor ?? "#6366f122",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DynamicIcon name={e.icon ?? (e.type === "tag" ? "tag" : "shapes")} size={size * 0.6} color={e.color ?? "#6366f1"} />
    </View>
  );
}

function Chip({ e, onPress }: { e: ComposerEntity; onPress?: () => void }) {
  const C = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center gap-1.5 rounded-full pl-0.5 pr-2.5 py-0.5 my-0.5"
      style={{ backgroundColor: `${C.primary}22` }}
    >
      <EntityIcon e={e} size={20} />
      <Text className="text-[14px] font-semibold" style={{ color: C.primary }}>
        {e.name}
      </Text>
    </TouchableOpacity>
  );
}

/** All entities the user can tag, from the same (cached) queries the pickers use. */
function useEntities(): ComposerEntity[] {
  const { people } = useGetPeople({ limit: 200, sort: "name" });
  const { accounts } = useGetAccounts({ limit: 200, sort: "name" });
  const { categories } = useGetCategories({ limit: 500, sort: "name" });
  const { tags } = useGetTags({ limit: 500, sort: "name" });
  return useMemo(
    () => [
      ...(people ?? []).map((p) => ({ type: "person" as const, id: p.id, name: p.name, avatarUrl: p.avatar?.url })),
      ...(accounts ?? []).map((a) => ({
        type: "account" as const, id: a.id, name: a.name, avatarUrl: a.avatar?.url, icon: a.icon, color: a.color, bgColor: a.bgColor,
      })),
      // Only child categories can be used on a transaction
      ...(categories ?? [])
        .filter((c) => c.parent)
        .map((c) => ({ type: "category" as const, id: c.id, name: c.name, icon: c.icon, color: c.color, bgColor: c.bgColor })),
      ...(tags ?? []).map((t) => ({ type: "tag" as const, id: t.id, name: t.name, icon: t.icon, color: t.color, bgColor: t.bgColor })),
    ],
    [people, accounts, categories, tags],
  );
}

interface Props {
  value: ComposerValue;
  onChange: (v: ComposerValue) => void;
  placeholder?: string;
  editable?: boolean;
  minHeight?: number;
}

export function EntityComposer({ value, onChange, placeholder, editable = true, minHeight = 120 }: Props) {
  const C = useColors();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const entities = useEntities();

  // "@query" being typed at the end of the draft
  const mention = /(^|\s)@([^\s@]*)$/.exec(value.draft);
  const query = mention ? mention[2].toLowerCase() : null;
  const suggestions = useMemo(() => {
    if (query === null) return [];
    return entities.filter((e) => !query || e.name.toLowerCase().includes(query)).slice(0, 30);
  }, [entities, query]);

  const insert = (e: ComposerEntity) => {
    const cut = value.draft.slice(0, value.draft.length - (mention ? mention[2].length + 1 : 0));
    onChange({
      before: compact([...value.before, { kind: "text", text: cut }, { kind: "token", entity: e }, { kind: "text", text: " " }]),
      draft: "",
      after: value.after,
    });
    inputRef.current?.focus();
  };

  // Backspace with nothing before the cursor in the input: remove the chip before it,
  // or pull the previous text into the input and delete its last character.
  const onKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }) => {
    if (nativeEvent.key !== "Backspace" || value.draft !== "" || value.before.length === 0) return;
    const before = [...value.before];
    const last = before.pop()!;
    onChange(
      last.kind === "token"
        ? { before, draft: "", after: value.after }
        : { before, draft: last.text.slice(0, -1), after: value.after },
    );
  };

  /** Move the input to segment `i` of the full list (before + draft + after). */
  const moveTo = (all: Segment[], i: number) => {
    const target = all[i];
    const rest = all.slice(i + 1);
    if (target?.kind === "text") onChange({ before: compact(all.slice(0, i)), draft: target.text, after: compact(rest) });
    else onChange({ before: compact(all.slice(0, i + 1)), draft: "", after: compact(rest) });
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  // before + draft + after, not merged across the cursor, so indices line up with the
  // rendered segments: before[i] → i, after[i] → before.length + 1 + i
  const beforeC = compact(value.before);
  const afterC = compact(value.after);
  const all: Segment[] = [...beforeC, { kind: "text", text: value.draft }, ...afterC];
  const renderSeg = (s: Segment, key: string, onPress: () => void) =>
    s.kind === "token" ? (
      <Chip key={key} e={s.entity} onPress={editable ? onPress : undefined} />
    ) : (
      <Text key={key} onPress={editable ? onPress : undefined} className="text-[15px] text-on-surface" style={{ lineHeight: 24 }}>
        {s.text}
      </Text>
    );

  const isEmpty = value.before.length === 0 && value.after.length === 0 && value.draft === "";

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        className="rounded-2xl px-3 py-2.5 flex-row flex-wrap items-center"
        style={{
          minHeight,
          alignContent: "flex-start",
          backgroundColor: C.surfaceMid,
          borderWidth: 1,
          borderColor: focused ? C.primary : "transparent",
        }}
      >
        {beforeC.map((s, i) => renderSeg(s, `b${i}`, () => moveTo(all, i)))}
        <TextInput
          ref={inputRef}
          value={value.draft}
          onChangeText={(draft) => onChange({ ...value, draft })}
          onKeyPress={onKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
          multiline
          placeholder={isEmpty ? placeholder : undefined}
          placeholderTextColorClassName="accent-outline-variant"
          className="text-[15px] text-on-surface"
          style={{ minWidth: 40, flexGrow: 1, paddingVertical: 2, lineHeight: 24, textAlignVertical: "top" }}
        />
        {afterC.map((s, i) => renderSeg(s, `a${i}`, () => moveTo(all, beforeC.length + 1 + i)))}
      </TouchableOpacity>

      {/* Suggestions while typing "@…" */}
      {query !== null && editable && (
        <View className="mt-2">
          {suggestions.length === 0 ? (
            <Text className="text-[12px] text-on-surface-variant px-1">No match for "@{mention![2]}"</Text>
          ) : (
            <ScrollView horizontal keyboardShouldPersistTaps="always" showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2 pr-2">
                {suggestions.map((e) => (
                  <TouchableOpacity
                    key={`${e.type}:${e.id}`}
                    onPress={() => insert(e)}
                    activeOpacity={0.8}
                    className="flex-row items-center gap-2 rounded-full pl-1 pr-3 py-1"
                    style={{ backgroundColor: C.surfaceHigh }}
                  >
                    <EntityIcon e={e} size={24} />
                    <View>
                      <Text className="text-[13px] font-semibold text-on-surface">{e.name}</Text>
                      <Text className="text-[10px] text-on-surface-variant">{TYPE_LABEL[e.type]}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}
      {query === null && editable && (
        <Text className="text-[11px] text-on-surface-variant mt-1.5 px-1">
          Tip: type @ to tag a person, account, category or tag.
        </Text>
      )}
    </View>
  );
}
