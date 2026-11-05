/**
 * Runtime patches for native modules that reject promises nobody catches.
 * Import once at the top of _layout.tsx before anything else.
 */

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
