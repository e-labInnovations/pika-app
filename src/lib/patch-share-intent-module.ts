/**
 * Patches ExpoShareIntentModule.getShareIntent to add a .catch() so that
 * unhandled promise rejections from restricted content providers (e.g.
 * WhatsApp's private MediaProvider) don't crash the app.
 *
 * expo-share-intent calls getShareIntent("") on Android without awaiting or
 * catching the result. When the OS-level intent contains a URI from a
 * non-exported content provider the native call rejects with a
 * SecurityException, which becomes an unhandled promise rejection crash.
 *
 * The library already emits an `onError` event for the same failure, so
 * useShareIntent's `error` state will still be set correctly — we just need
 * to prevent the naked rejection from surfacing as a crash.
 *
 * Import this module once at the top of _layout.tsx before anything else.
 */

// Dynamic require so the patch runs synchronously at import time and the
// original binding seen by useShareIntent is already replaced.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mod = require("expo-share-intent/build/ExpoShareIntentModule").default;

if (mod && typeof mod.getShareIntent === "function") {
  try {
    const original: (...args: unknown[]) => Promise<unknown> = mod.getShareIntent.bind(mod);
    mod.getShareIntent = (...args: unknown[]): Promise<unknown> =>
      original(...args).catch(() => {
        // Rejection is already surfaced through the onError event emitted by
        // the native module — no further action needed here.
      });
  } catch {
    // Native proxy doesn't allow reassignment — patch skipped.
  }
}

// Patch ExpoKeepAwake.activate so that unhandled promise rejections from
// Android activity lifecycle transitions (e.g. "current activity no longer
// available" when the app is closed and reopened) don't crash the app.
// This only matters in development because expo's withDevTools HOC calls
// useKeepAwake without a .catch() on the resulting promise.
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { requireNativeModule } = require("expo-modules-core");
  const keepAwakeMod = requireNativeModule("ExpoKeepAwake");
  if (keepAwakeMod && typeof keepAwakeMod.activate === "function") {
    const origActivate: (...args: unknown[]) => Promise<unknown> =
      keepAwakeMod.activate.bind(keepAwakeMod);
    keepAwakeMod.activate = (...args: unknown[]): Promise<unknown> =>
      origActivate(...args).catch(() => {});
  }
} catch {
  // Module unavailable or proxy doesn't allow reassignment — patch skipped.
}
