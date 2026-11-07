/**
 * Text box where "@" tags a person, account, category or tag.
 *
 * Android: the native `pika-composer` field, one real EditText with avatar chips inside
 * the text. Elsewhere: the JS `EntityComposer`. Either way the value is plain text with
 * `@[Name](type:id)` tokens, which the server reads as authoritative entity IDs.
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import {
  PikaComposer,
  isPikaComposerAvailable,
  type ChipVisual,
  type PikaComposerHandle,
} from "../../../modules/pika-composer";
import { colorFromId } from "../UserAvatar";
import {
  EntityComposer,
  MentionSuggestions,
  emptyComposer,
  serializeComposer,
  useEntities,
  type ComposerEntity,
  type ComposerValue,
} from "../transaction/EntityComposer";
import { lucideIcons } from "../../lib/lucide-data";
import { resolveMediaUrl } from "../../lib/media-upload";
import { useColors } from "../../theme/colors";

const TOKEN = /@\[([^\]\n]{1,80})\]\((person|account|category|tag):([A-Za-z0-9_-]{1,64})\)/g;

/** The value with tokens reduced to their names, e.g. to check for emptiness. */
export const mentionsToPlain = (value: string) => value.replace(TOKEN, "$1");

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
  minHeight?: number;
  maxHeight?: number;
  maxLength?: number;
}

export function MentionInput(props: Props) {
  return isPikaComposerAvailable ? <NativeMentionInput {...props} /> : <JsMentionInput {...props} />;
}

// ── Android: native field ─────────────────────────────────────────────────────

const PAD_V = 10;

function iconSvg(name: string | null | undefined, fallback: string, color: string): string | null {
  const content = lucideIcons[name ?? ""] ?? lucideIcons[fallback];
  if (!content) return null;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
}

/** The chip look for an entity, matching UserAvatar / AccountAvatar / EntityIcon. */
function visualOf(e: ComposerEntity): ChipVisual {
  if (e.type === "person") {
    const { bg, fg } = colorFromId(e.id);
    return { imageUrl: resolveMediaUrl(e.avatarUrl), color: fg, bgColor: bg };
  }
  if (e.type === "account") {
    const bg = e.bgColor ?? "#f59e0b";
    const fg = e.color ?? "#ffffff";
    return { imageUrl: resolveMediaUrl(e.avatarUrl), svg: e.icon ? iconSvg(e.icon, "wallet", fg) : null, color: fg, bgColor: bg };
  }
  const fg = e.color ?? "#6366f1";
  return { svg: iconSvg(e.icon, e.type === "tag" ? "tag" : "shapes", fg), color: fg, bgColor: e.bgColor ?? "#6366f122" };
}

function NativeMentionInput({ value, onChange, placeholder, editable = true, minHeight = 120, maxHeight = 260, maxLength }: Props) {
  const C = useColors();
  const ref = useRef<PikaComposerHandle>(null);
  const eventCount = useRef(0);
  const [query, setQuery] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const entities = useEntities();

  // Chip looks for the entities tagged in the text. Keyed on the tagged ids so typing
  // does not resend the map to native on every keystroke.
  const taggedKey = useMemo(
    () => [...new Set([...value.matchAll(TOKEN)].map((m) => `${m[2]}:${m[3]}`))].sort().join(","),
    [value],
  );
  const visuals = useMemo(() => {
    const keys = new Set(taggedKey ? taggedKey.split(",") : []);
    const out: Record<string, ChipVisual> = {};
    for (const e of entities) {
      const k = `${e.type}:${e.id}`;
      if (keys.has(k)) out[k] = visualOf(e);
    }
    return out;
  }, [entities, taggedKey]);

  const fieldMin = Math.max(minHeight - PAD_V * 2, 24);
  const fieldMax = Math.max(maxHeight - PAD_V * 2, fieldMin);
  const fieldHeight = Math.min(Math.max(contentHeight, fieldMin), fieldMax);

  return (
    <View>
      <View
        className="rounded-2xl px-3"
        style={{
          paddingVertical: PAD_V,
          backgroundColor: C.surfaceMid,
          borderWidth: 1,
          borderColor: focused ? C.primary : "transparent",
        }}
      >
        <PikaComposer
          ref={ref}
          style={{ height: fieldHeight }}
          value={value}
          mostRecentEventCount={eventCount.current}
          entities={visuals}
          placeholder={placeholder}
          placeholderColor={C.outlineVariant}
          textColor={C.onSurface}
          primaryColor={C.primary}
          fontSize={15}
          editable={editable}
          maxLength={maxLength}
          onChangeValue={(e) => {
            eventCount.current = e.nativeEvent.eventCount;
            onChange(e.nativeEvent.value);
          }}
          onMentionQuery={(e) => setQuery(e.nativeEvent.query)}
          onContentSizeChange={(e) => setContentHeight(e.nativeEvent.height)}
          onFocusChange={(e) => setFocused(e.nativeEvent.focused)}
        />
      </View>
      {editable && (
        <MentionSuggestions
          query={query}
          entities={entities}
          onPick={(e) => {
            ref.current?.insertMention(e.type, e.id, e.name);
          }}
        />
      )}
    </View>
  );
}

// ── Other platforms: JS composer ──────────────────────────────────────────────

function JsMentionInput({ value, onChange, placeholder, editable, minHeight }: Props) {
  const [composer, setComposer] = useState<ComposerValue>(() => emptyComposer(value));
  const emitted = useRef(value);

  // A value set from outside (cleared after send, prefilled) replaces the composer.
  useEffect(() => {
    if (value !== emitted.current) {
      emitted.current = value;
      setComposer(emptyComposer(value));
    }
  }, [value]);

  return (
    <EntityComposer
      value={composer}
      onChange={(v) => {
        setComposer(v);
        emitted.current = serializeComposer(v);
        onChange(emitted.current);
      }}
      placeholder={placeholder}
      editable={editable}
      minHeight={minHeight}
    />
  );
}
