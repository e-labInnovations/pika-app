/**
 * Updates for the sideloaded production APK: the release manifest on GitHub says which
 * APK is current and which OTA updates are mandatory (see docs/superpowers/specs/
 * 2026-11-07-in-app-updates-design.md). Decisions live in ./decide.
 */
import * as Application from "expo-application";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { Platform } from "react-native";
import { decideUpdate, type Installed, type ReleaseManifest, type UpdateDecision } from "./decide";

export type { ApkRelease, UpdateDecision } from "./decide";

const MANIFEST_URL = "https://github.com/e-labInnovations/pika-app/releases/download/app-manifest/latest.json";
const PRODUCTION_ID = "com.elabins.pika";
const SKIPPED_KEY = "pika_update_skipped_version_code";

/** Only the production Android app updates itself; dev builds and Expo Go never do. */
export const selfUpdateEnabled =
  Platform.OS === "android" && !__DEV__ && Application.applicationId === PRODUCTION_ID;

export function installedInfo(): Installed {
  return {
    versionCode: Number(Application.nativeBuildVersion ?? 0) || 0,
    runtimeVersion: Updates.runtimeVersion ?? null,
    bundleCreatedAt: Updates.createdAt ?? null,
  };
}

/** "1.1.0 (7)" plus the OTA update id when one is running. */
export function versionLabel(): string {
  const base = `${Application.nativeApplicationVersion ?? "?"} (${Application.nativeBuildVersion ?? "?"})`;
  return Updates.isEmbeddedLaunch || !Updates.updateId ? base : `${base} · ${Updates.updateId.slice(0, 8)}`;
}

async function fetchManifest(): Promise<ReleaseManifest> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(`${MANIFEST_URL}?t=${Date.now()}`, { signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`manifest ${res.status}`);
    return (await res.json()) as ReleaseManifest;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * What to do now. `ignoreSkip` is for the manual "Check for updates", which offers a
 * release even if the user chose "Later" for it.
 */
export async function checkForUpdate(ignoreSkip = false): Promise<UpdateDecision> {
  const manifest = await fetchManifest();
  const skipped = ignoreSkip ? null : Number((await SecureStore.getItemAsync(SKIPPED_KEY)) ?? NaN);
  return decideUpdate(manifest, installedInfo(), Number.isFinite(skipped) ? skipped : null);
}

export const skipVersion = (versionCode: number) => SecureStore.setItemAsync(SKIPPED_KEY, String(versionCode));

/** Downloads the APK to the cache (progress 0–1) and opens Android's installer. */
export async function installApk(url: string, versionCode: number, onProgress: (p: number) => void): Promise<void> {
  const dir = `${FileSystem.cacheDirectory}updates/`;
  await FileSystem.deleteAsync(dir, { idempotent: true });
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  const file = `${dir}pika-${versionCode}.apk`;
  const task = FileSystem.createDownloadResumable(url, file, {}, ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
    if (totalBytesExpectedToWrite > 0) onProgress(totalBytesWritten / totalBytesExpectedToWrite);
  });
  const res = await task.downloadAsync();
  if (!res || res.status !== 200) throw new Error(`Download failed (${res?.status ?? "no response"})`);
  onProgress(1);
  const contentUri = await FileSystem.getContentUriAsync(res.uri);
  await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
    data: contentUri,
    type: "application/vnd.android.package-archive",
    flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
  });
}

/**
 * Loads the newest OTA update now (used for a mandatory one). `pending` = an update the
 * background check already downloaded, which a reload applies. With neither a new nor a
 * pending update, reloading would only restart into the same bundle, so it throws.
 */
export async function applyOtaNow(pending: boolean): Promise<void> {
  const res = await Updates.fetchUpdateAsync();
  if (!res.isNew && !pending) throw new Error("The update isn't available yet. Try again in a minute.");
  await Updates.reloadAsync();
}
