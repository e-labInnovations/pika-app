# Native Mention Input Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Native Android text field with avatar chips for `@` mentions, used by the AI assistant and SMS "Edit with AI"; sheets follow the keyboard without jumping.

**Architecture:** Expo module `pika-composer` (Kotlin `EditText` + `ReplacementSpan` chips) exchanging `@[Name](type:id)` strings with JS; `MentionInput` wraps it with the existing suggestion strip (iOS falls back to `EntityComposer`); `ModalKeyboardView` paints the keyboard area in the sheet color while it hides.

**Tech Stack:** Expo SDK 55 modules (Kotlin), AndroidSVG, RN 0.83.

**Spec:** `docs/superpowers/specs/2026-11-07-native-mention-input-design.md`

## Global Constraints

- Token format exactly `@[Name](type:id)`, type ∈ person|account|category|tag; names have `[`, `]`, newline replaced by space (as `tokenText` today).
- Android only for the native view; iOS/web keep `EntityComposer`.
- No commits or builds until the user approves (user instruction, 2026-11-07).
- `npx -y pnpm@10.32.1` for the server; npm for the app; lockfile URLs on registry.npmjs.org.

## Review Focus

- Typing fast must not lose characters (no JS→native `value` echo while typing).
- Backspace right after a chip removes the chip only, not the char before it.
- Cursor/selection never ends inside a chip; IME composing text next to a chip.
- Pasting text with tokens, and clearing the field from JS (`value=""` after send).
- `maxLength` on SMS refine (1000) counted on serialised text.

---

### Task 1: Kotlin token model + unit tests

**Files:** `modules/pika-composer/android/src/main/java/expo/modules/pikacomposer/Mentions.kt`, test `.../src/test/java/expo/modules/pikacomposer/MentionsTest.kt`, `modules/pika-composer/android/build.gradle`, `expo-module.config.json`.

**Produces:** `data class Mention(type, id, name)`; `parseTokens(s): List<Piece>` (Text | Token); `serialize(pieces)`; `mentionQuery(text: String, cursor: Int): String?`.

- [ ] Tests: round trip `"lunch with @[Rony](person:abc) and @[Food](category:x)"`; adjacent tokens; malformed `@[a](foo:1)` stays text; `mentionQuery("hi @ro", 6) == "ro"`, `("a@b", 3) == null`, `("@", 1) == ""`, `("@ro x", 5) == null`.
- [ ] Implement, run `./gradlew :pika-composer:testDebugUnitTest` (from a prebuilt android dir if needed, otherwise rely on device build) → pass.

### Task 2: `PikaComposerView` + `MentionSpan`

**Files:** `PikaComposerModule.kt`, `PikaComposerView.kt`, `MentionSpan.kt`, `AvatarLoader.kt`, `modules/pika-composer/index.ts`.

- [ ] View with props/events/functions per spec; TextWatcher keeps spans valid (span whose char was deleted is removed); selection watcher emits query; `onContentSizeChange` from layout height.
- [ ] `insertMention` replaces `@query` before cursor.
- [ ] JS `PikaComposer` native view wrapper with ref `{ insertMention, focus, blur }`.

### Task 3: `MentionInput` + adoption

**Files:** `src/components/mentions/MentionInput.tsx` (+ move `useEntities`, `EntityIcon`, suggestion strip), `EntityComposer.tsx` (string adapter), `AIAssistantSheet.tsx`, `SmsRefineSheet.tsx`.

- [ ] `npx tsc --noEmit` → 0.

### Task 4: sheet keyboard flicker

Ruling: keyboard-controller dropped (KeyboardProvider rewires root insets app-wide) — `ModalKeyboardView` `fillColor` instead — cost if wrong: the sheet still settles after the keyboard hides (no flash).

**Files:** `ModalKeyboardView.tsx`, all sheets using it, `AIAssistantSheet.tsx`, `TransactionPickerSheet.tsx`, `SmsRefineSheet.tsx`.

- [ ] `tsc` → 0.

### Task 5: server test (pika-v2)

- [ ] `tests/int/smsRefine.int.spec.ts`: refine text `"split with @[Rony](person:<uuid>)"` → `processTextToTransaction` called with input containing that token verbatim. Run the file → pass.

### Task 6: dev build + device checklist

- [ ] Review pass on the diff; dev APK built only after user OK on code (builds count as "build").
