# Native share handler (Android)

Date: 2026-11-05
Status: approved design, pending spec review

## Problem

Sharing into Pika (an image, PDF or text from another app) is unreliable. The
shared image sometimes never shows up in the AI sheet, with no error.

Current flow: `expo-share-intent` 5.1.1 → `ShareIntentListener`
(`src/app/_layout.tsx`) → `ShareIntentBridgeContext` → AI sheet on `/add`.

Causes found in the code:

1. **The file is read too late.** The listener queues the intent and only reads
   the shared `content://` URI (`readAsStringAsync`) after auth has settled,
   sometimes seconds later. Providers like Google Photos and WhatsApp grant a
   short-lived read permission tied to the incoming intent. Once it lapses the
   read throws, the `catch` returns silently, and the image is lost.
2. **Repeat shares while the app is open are missed.** The listener effect only
   re-runs when `hasShareIntent` / `error` change; a second share before
   `resetShareIntent` completes does not fire.
3. **Library crash surface.** `getShareIntent` rejects unhandled on restricted
   providers; we carry a monkey-patch (`src/lib/patch-share-intent-module.ts`)
   to stop it crashing the app.

## Goals

- Sharing from Google Photos, WhatsApp, Files (PDF) and Chrome (text / URL)
  opens the AI sheet with the content, every time.
- Works on cold start, warm start (app already open), and when the user must
  log in first.
- A file that cannot be read produces a visible message, never silence.

## Non-goals

- iOS sharing. The app is Android-first (SMS capture is Android-only). iOS
  loses share-into-Pika; it can come back later as a Swift share extension.
- Multiple items per share. The AI sheet takes one image / PDF / text; extra
  files in a `SEND_MULTIPLE` are ignored (the first supported one is used).

## Design

### Native module `modules/pika-share` (Kotlin, Expo Modules API)

Same layout as `modules/pika-sms`: `expo-module.config.json` (android only),
`android/build.gradle`, `index.ts`, plus `app.plugin.js`.

`PikaShareModule`:

- Lifecycle: `OnCreate` reads `appContext.currentActivity?.intent`;
  `OnNewIntent` receives intents while running. Both call `handleIntent`.
- `handleIntent(intent)`: only `ACTION_SEND` / `ACTION_SEND_MULTIPLE`.
  - Stream: `EXTRA_STREAM` (single or list) or `clipData` items. Take the first
    URI whose resolved mime is `image/*` or `application/pdf`.
  - Copy it immediately, on a background thread, via
    `contentResolver.openInputStream` into `cacheDir/shares/<uuid>.<ext>`
    (ext from mime). Cap 20 MB; larger → error.
  - Text: `EXTRA_TEXT`, falling back to `EXTRA_SUBJECT`.
  - Mark consumed: set the activity's intent action to a no-op value so a
    recreate (rotation, process restore) does not replay the share.
- Result held in memory as the pending share:
  ```ts
  type IncomingShare =
    | { type: "file"; uri: string /* file:// */; mimeType: string; name: string | null }
    | { type: "text"; text: string }
    | { type: "error"; message: string; source: string | null } // source = sending package if known
  ```
  Each share gets an `id` (incrementing) so JS can tell repeats apart.
- JS API: `getPendingShare(): IncomingShare | null`, `clearPendingShare()`,
  event `onShare(share)`.
- Housekeeping: on module create, delete files in `cacheDir/shares` older than
  24 h.
- Errors: `SecurityException` / `IOException` / size cap → `{type:"error"}`
  share; never throws to JS.

### Config plugin `modules/pika-share/app.plugin.js`

`withAndroidManifest` on the main activity (resolved from the manifest, so it
works for both `com.elabins.pika` and `com.elabins.pika.dev`):

- `android:launchMode="singleTask"` (already what `expo-share-intent` set).
- Intent filters: `SEND` and `SEND_MULTIPLE`, category `DEFAULT`, mime types
  `text/*`, `image/*`, `application/pdf`.

Registered in `app.config.js` as `'./modules/pika-share/app.plugin.js'`.

### JS

- `modules/pika-share/index.ts`: typed wrapper, `null`-safe off Android (as
  `pika-sms` does), plus `useIncomingShare()` hook: reads `getPendingShare()` on
  mount, subscribes to `onShare`, returns `{ share, clear }`.
- `ShareIntentListener` (`src/app/_layout.tsx`) keeps its "queue until auth is
  settled" logic, but:
  - reads the `file://` copy (always readable by our process) as base64;
  - handles each share `id`, so repeats fire;
  - `error` shares and read failures show an `Alert`
    ("Couldn't read the shared file"), instead of returning silently;
  - calls `clear()` after handling.
- Bridge (`ShareIntentBridgeContext`) and the `/add` AI-sheet hand-off are
  unchanged.

### Removed

- `expo-share-intent` dependency and its `app.config.js` plugin entry.
- `ShareIntentProvider` wrapper in `_layout.tsx`.
- The `expo-share-intent` half of `src/lib/patch-share-intent-module.ts` (the
  ExpoKeepAwake patch stays; file renamed to `src/lib/patch-native-modules.ts`).
- `src/lib/share-intent.ts` (`parseShareIntent` is unused).

## Testing

- `tsc --noEmit` and a local Android prebuild + compile.
- Manual matrix on a device, each cold / app open / logged out then log in:
  Google Photos image, WhatsApp image, Files PDF, Chrome text / URL, a >20 MB
  file (expect alert), share twice in a row while open (both arrive), rotate
  after sharing (no replay).

## Then

EAS builds: `development` (APK, `com.elabins.pika.dev`) and `production` (AAB,
auto-increment). Before building, rewrite any corp-registry URLs in
`package-lock.json` to `registry.npmjs.org`.
