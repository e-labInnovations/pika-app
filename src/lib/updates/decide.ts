/**
 * What update, if any, this install should take, from the release manifest
 * (`latest.json` on the `app-manifest` GitHub release). Pure: no React Native imports,
 * so it runs under `node --test`.
 */

export type ApkRelease = {
  version: string;
  versionCode: number;
  url: string;
  notes?: string;
  /** Installs below this version code must update. */
  minVersionCode?: number;
  publishedAt?: string;
};

/** The latest mandatory OTA update for one runtime version. */
export type MandatoryOta = { group: string; createdAt: string; message?: string };

export type ReleaseManifest = {
  apk?: ApkRelease;
  ota?: Record<string, MandatoryOta>;
};

export type Installed = {
  versionCode: number;
  runtimeVersion: string | null;
  /** When the running JS bundle was published (or built, for the embedded one). */
  bundleCreatedAt: Date | null;
};

export type UpdateDecision =
  | { kind: "none" }
  | { kind: "apk"; mandatory: boolean; apk: ApkRelease }
  | { kind: "ota"; group: string; message?: string };

const isCode = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);

/**
 * Order: a mandatory APK, then a mandatory OTA, then an optional APK the user has not
 * skipped (`skippedVersionCode` = the version code they chose "Later" for).
 */
export function decideUpdate(
  manifest: ReleaseManifest,
  installed: Installed,
  skippedVersionCode: number | null,
): UpdateDecision {
  const apk = manifest?.apk;
  const validApk = apk && isCode(apk.versionCode) && typeof apk.url === "string" && apk.url.startsWith("https://");
  const newer = validApk && apk.versionCode > installed.versionCode;

  if (newer && isCode(apk.minVersionCode) && installed.versionCode < apk.minVersionCode) {
    return { kind: "apk", mandatory: true, apk };
  }

  const ota = installed.runtimeVersion ? manifest?.ota?.[installed.runtimeVersion] : undefined;
  if (ota && typeof ota.group === "string") {
    const at = new Date(ota.createdAt);
    if (!Number.isNaN(at.getTime()) && (!installed.bundleCreatedAt || installed.bundleCreatedAt < at)) {
      return { kind: "ota", group: ota.group, message: ota.message };
    }
  }

  if (newer && apk.versionCode !== skippedVersionCode) return { kind: "apk", mandatory: false, apk };
  return { kind: "none" };
}
