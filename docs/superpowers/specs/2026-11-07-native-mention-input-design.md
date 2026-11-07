# Native mention input + smooth keyboard in sheets

Date: 2026-11-07. Repo: `pika-app` (one server test in `pika-v2`). Android only; iOS keeps
today's composer.

## Problems

1. `EntityComposer` fakes a rich text box: chips and text pieces in a wrapped row with one
   small `TextInput` moved between them. Cursor moves, selection, deleting across text and
   the keyboard's own suggestions all behave oddly.
2. "Edit with AI" on a pending SMS has a plain text box: no `@` tagging.
3. Sheets inside a `Modal` jump when the keyboard closes. RN's `KeyboardAvoidingView` only
   learns the keyboard is gone after it has animated out (`keyboardDidHide`), so the sheet
   sits above an empty gap for a moment, then snaps down.

## Design

### Native view `modules/pika-composer` (Expo module, Kotlin, Android)

`PikaComposerView` wraps an `AppCompatEditText` (multiline, no own background/padding).

- **Text model.** The value crossing the bridge is a string with `@[Name](type:id)` tokens,
  the format the server already parses (`tagged-entities.ts`). Native converts it to an
  `Editable` where each token is one object-replacement character `￼` carrying a
  `MentionSpan(entity)` (a `ReplacementSpan`), and back on every change.
- **Chip.** `MentionSpan.draw` paints a rounded pill: 20dp round avatar, 6dp gap, name in
  the field's font, semibold, primary color; pill background primary at ~13% alpha. Avatar:
  - `imageUrl` → bitmap downloaded once (`HttpURLConnection` on a background executor),
    circle-cropped, kept in an `LruCache` by URL; initials circle until it arrives, then
    the view invalidates.
  - else `svg` (the Lucide icon XML the app already has) → AndroidSVG
    (`com.caverock:androidsvg-aar:1.4`) rendered at 60% of the circle, tinted `color`, on a
    `bgColor` circle.
  - else initials (first letters of the first two words) on `bgColor`, `color` text.
- **Atomic chips.** The span is a single character, so the cursor cannot land inside it and
  one Backspace removes it. Selection and copy work as plain text; pasted text containing
  `@[..](..)` tokens becomes chips.
- **Mention query.** After every change or selection move, if the text from the last `@`
  (at line start or after whitespace) to the cursor has no whitespace, that is the query.
- **Props:** `value` (applied only when it differs from the native text, so typing never
  round-trips), `entities` (map `type:id` → `{ name, imageUrl?, svg?, color?, bgColor? }`
  used to draw chips), `placeholder`, `placeholderColor`, `textColor`, `primaryColor`,
  `fontSize`, `editable`, `maxLength` (counted on the serialised text).
- **Events:** `onChangeValue { value }`, `onMentionQuery { query: string | null }`,
  `onContentSizeChange { height }` (dp), `onFocusChange { focused }`.
- **Functions:** `insertMention(token: { type, id, name })` replaces the current `@query`
  with a chip and one space; `focus()`; `blur()`.
- **Height.** JS sets the view height from `onContentSizeChange`, clamped to
  `[minHeight, maxHeight]`; beyond that the EditText scrolls.

### JS component `MentionInput` (`src/components/mentions/MentionInput.tsx`)

`<MentionInput value onChange placeholder editable minHeight maxHeight maxLength />` with a
string value. Android: native view + the suggestion strip (moved out of `EntityComposer`
with `useEntities` and `EntityIcon`). Other platforms: today's `EntityComposer`, adapted
to the string value. Exports `mentionsToPlain(value)` for "is it empty" checks.

Used by: `AIAssistantSheet` (both composers) and `SmsRefineSheet` (replaces its
`TextInput`).

### Keyboard in sheets

Decision (2026-11-07, during implementation): **not** `react-native-keyboard-controller`.
Its `KeyboardProvider` installs its own window-insets listener on the app's root view
even while disabled, which changes how every screen reacts to the keyboard. Too broad
for a sheet fix.

Instead `ModalKeyboardView` takes `fillColor` (the sheet's background). While the
keyboard is open it paints the keyboard's area that color, so as the keyboard slides
away the sheet's color shows instead of the screen behind the modal; the sheet settles
once the keyboard has hidden. `AIAssistantSheet`, `TransactionPickerSheet` and
`SmsRefineSheet` switch from their own `KeyboardAvoidingView` to `ModalKeyboardView`, and
every sheet passes its `fillColor`.

### Server

No change: `refineSms` passes the user's text, tokens included, to the AI functions, which
parse and verify tagged entities. Add a test that a token typed in refine reaches
`processTextToTransaction` intact.

## Testing

- Kotlin JVM unit tests: parse/serialise round trip, names with brackets, adjacent tokens,
  mention-query detection.
- Server vitest: refine passes tokens through.
- App: `tsc`; device checklist (type, `@` pick, Backspace on chip, cursor around chips,
  select/copy/paste, long text scroll, AI assistant send, SMS Edit with AI, keyboard close
  with no jump in every sheet).
