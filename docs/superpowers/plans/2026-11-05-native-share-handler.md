# Native Share Handler Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `expo-share-intent` with an Android-only Kotlin Expo module that copies shared files into the app cache the moment they arrive, so shared images/PDFs/text always reach the AI sheet.

**Architecture:** `modules/pika-share` (Expo Modules API, Kotlin) handles `ACTION_SEND`/`SEND_MULTIPLE` in `OnCreate`/`OnNewIntent`, copies the stream to `cacheDir/shares`, and exposes a pending share + `onShare` event. A config plugin adds intent filters to the main activity. JS `useIncomingShare()` replaces `useShareIntent` in `ShareIntentListener`.

**Tech Stack:** Expo SDK (expo-modules-core), Kotlin, `@expo/config-plugins`, React Native, expo-router, expo-file-system (legacy `readAsStringAsync`).

**Spec:** `docs/superpowers/specs/2026-11-05-native-share-handler-design.md`

## Global Constraints

- Android only; module is `null`-safe on iOS/web/Expo Go (same pattern as `modules/pika-sms/index.ts`).
- Accepted mime types: `text/*`, `image/*`, `application/pdf`.
- File size cap: 20 MB (20 * 1024 * 1024 bytes).
- Cache dir: `cacheDir/shares/<uuid>.<ext>`; prune files older than 24 h.
- Native code never throws to JS; failures become `{ type: "error" }` shares.
- Works for both packages `com.elabins.pika` and `com.elabins.pika.dev`.
- No test runner, Android SDK or JDK 17 locally: verification is `npx tsc --noEmit`, `npx expo config --type introspect` (plugin output), and the EAS `development` build (Kotlin compile) plus the device matrix in the spec.

## Review Focus

- Share arrives on cold start before JS subscribes → must be served by `getPendingShare()`, not lost to an early event.
- Same share replayed after rotation / activity recreate → intent marked consumed, no second AI sheet.
- Two shares in a row while open → both handled (distinct `id`).
- Share while logged out → queued until login, file still readable (it's our own cache copy).
- Provider whose `getType` returns null or `*/*` → fall back to `intent.type`, then extension sniff; unsupported → error share, alert shown.

---

### Task 1: Native module `pika-share`

**Files:**
- Create: `modules/pika-share/expo-module.config.json`
- Create: `modules/pika-share/android/build.gradle`
- Create: `modules/pika-share/android/src/main/AndroidManifest.xml` (empty `<manifest/>`)
- Create: `modules/pika-share/android/src/main/java/expo/modules/pikashare/PikaShareModule.kt`
- Create: `modules/pika-share/android/src/main/java/expo/modules/pikashare/ShareReader.kt`

**Interfaces:**
- Produces native module name `"PikaShare"` with:
  - `getPendingShare(): Map<String, Any?>?`
  - `clearPendingShare(id: Int)` — clears only if the pending share has that id
  - event `"onShare"` with the same map
- Map shape (JS type in Task 2): `{ id: Int, type: "file", uri: "file://…", mimeType, name? }` | `{ id, type: "text", text }` | `{ id, type: "error", message, source? }`

- [ ] **Step 1:** `expo-module.config.json` — `{"platforms":["android"],"android":{"modules":["expo.modules.pikashare.PikaShareModule"]}}`. `build.gradle` copied from `modules/pika-sms/android/build.gradle` with namespace `expo.modules.pikashare` and only `androidx.core:core-ktx:1.13.1`.
- [ ] **Step 2:** `ShareReader.read(context: Context, intent: Intent, referrer: String?): ShareResult?` — returns null for non-SEND actions. Collects URIs from `EXTRA_STREAM` (Parcelable or ArrayList, using `IntentCompat.getParcelableExtra`/`getParcelableArrayListExtra`) and `clipData`. Mime per URI: `contentResolver.getType(uri)`, else `intent.type` if specific, else from extension via `MimeTypeMap`. First URI with `image/*` or `application/pdf` → copy with `openInputStream` into `cacheDir/shares/<UUID>.<ext>`, aborting and deleting past 20 MB. Display name from `OpenableColumns.DISPLAY_NAME` (best effort). No supported URI but text in `EXTRA_TEXT`/`EXTRA_SUBJECT` → text result. URIs present but none supported/readable and no text → error result (`SecurityException` → "Pika isn't allowed to read this file from <source>", too big → "File is larger than 20 MB", other → "Couldn't read the shared file"). Also `pruneOld(context)` deleting files older than 24 h.
- [ ] **Step 3:** `PikaShareModule`: `Name("PikaShare")`, `Events("onShare")`, `OnCreate { prune on IO thread; currentActivity?.intent?.let(::handle) }`, `OnNewIntent { handle(it) }`. `handle` runs `ShareReader.read` on a single-thread executor, assigns `++nextId`, stores `pending`, `sendEvent("onShare", map)`, then marks the activity intent consumed (`intent.action = "com.elabins.pika.SHARE_CONSUMED"`; for OnNewIntent also `activity.intent = that intent`). Referrer from `activity.referrer?.host`. `pending` guarded by `@Synchronized`.
- [ ] **Step 4: Commit** `feat: add pika-share native module`

### Task 2: Config plugin + JS wrapper

**Files:**
- Create: `modules/pika-share/app.plugin.js`
- Create: `modules/pika-share/index.ts`
- Modify: `app.config.js` (plugins: remove `expo-share-intent` entry, add `'./modules/pika-share/app.plugin.js'`)

**Interfaces:**
- Consumes: native `"PikaShare"` from Task 1.
- Produces: `export type IncomingShare`, `export const PikaShare = { isAvailable, getPendingShare(), clearPendingShare(id) }`, `export function useIncomingShare(): { share: IncomingShare | null; clear: () => void }`.

- [ ] **Step 1:** `app.plugin.js` with `withAndroidManifest`: find the activity in `manifest.application[0].activity` whose intent-filter has `MAIN`+`LAUNCHER`; set `android:launchMode="singleTask"`; append (idempotently, skip if a `SEND` filter exists) two intent-filters `android.intent.action.SEND` and `SEND_MULTIPLE`, category `DEFAULT`, `<data android:mimeType>` for each of the three types.
- [ ] **Step 2:** `index.ts`: typed wrapper via `requireOptionalNativeModule` (Android only). `useIncomingShare`: on mount `setShare(getPendingShare())`; subscribe `addListener("onShare", setShare)`; `clear` calls `clearPendingShare(share.id)` and `setShare(null)`.
- [ ] **Step 3: Verify** `npx expo config --type introspect | grep -A12 "android.intent.action.SEND"` shows both filters and the three mime types; `APP_ENV=development` run shows the same.
- [ ] **Step 4: Commit** `feat: register pika-share intent filters and JS hook`

### Task 3: Switch the app over, remove expo-share-intent

**Files:**
- Modify: `src/app/_layout.tsx` (`ShareIntentListener`, provider tree, first import)
- Rename: `src/lib/patch-share-intent-module.ts` → `src/lib/patch-native-modules.ts` (keep only the ExpoKeepAwake patch)
- Delete: `src/lib/share-intent.ts`
- Modify: `package.json`, `package-lock.json` (`npm uninstall expo-share-intent`)

**Interfaces:**
- Consumes: `useIncomingShare` from `modules/pika-share` (import path `../../modules/pika-share`).
- Bridge `setPending({type:"image", uri, base64, mimeType})` / `{type:"text", text}` unchanged.

- [ ] **Step 1:** `ShareIntentListener`: queue = latest `share` from the hook; when auth settled and authenticated: `file` → `readAsStringAsync(uri, Base64)` → `setPending` image (PDF goes through the same `image` slot, as today) → `router.push("/add")`; `text` → `setPending` text → push; `error` or read failure → `Alert.alert("Couldn't open shared item", message)`. Always `clear()` after. Effect keyed on `share?.id`, so repeats run.
- [ ] **Step 2:** Remove `ShareIntentProvider` wrapper and `expo-share-intent` import; import `../lib/patch-native-modules`.
- [ ] **Step 3:** `npm uninstall expo-share-intent`; check `grep -rn "expo-share-intent" src app.config.js package.json` is empty, and `grep -c "jfrog\|artifactory" package-lock.json` is 0 (fix to `https://registry.npmjs.org/` if not).
- [ ] **Step 4: Verify** `npx tsc --noEmit` exits 0.
- [ ] **Step 5: Commit** `feat: handle shares through pika-share, drop expo-share-intent`

### Task 4: Builds

- [ ] **Step 1:** `npx eas-cli build -p android --profile development --non-interactive` — success means the Kotlin compiles. Fix and recommit on failure.
- [ ] **Step 2:** User runs the spec's device matrix on the dev APK.
- [ ] **Step 3:** `npx eas-cli build -p android --profile production --non-interactive` (AAB, auto-increment versionCode).
