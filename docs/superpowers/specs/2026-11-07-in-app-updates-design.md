# In-app updates for the sideloaded APK

Date: 2026-11-07. Repo: `pika-app`. Android production APK only (no Play Store).
Audience: the owner and a few people they know — a simple prompt, skipping allowed,
but a release can be marked **mandatory**.

## Pieces

1. **APK self-update** — native changes. A GitHub release of `pika-app` carries the APK;
   the app downloads it and opens Android's installer.
2. **OTA updates** — JS-only changes, via `expo-updates` + EAS Update, channel
   `production`. `runtimeVersion` policy `fingerprint`, so an OTA only reaches builds
   with the same native code.
3. **Release manifest** — one JSON file, `latest.json`, attached to a rolling prerelease
   tagged `app-manifest`:
   `https://github.com/e-labInnovations/pika-app/releases/download/app-manifest/latest.json`
   (no API rate limit; fetched with a cache-busting query).

```json
{
  "apk": {
    "version": "1.1.0",
    "versionCode": 7,
    "url": "https://github.com/.../releases/download/v1.1.0-7/pika-1.1.0-7.apk",
    "notes": "…",
    "minVersionCode": 5,
    "publishedAt": "2026-11-07T10:00:00Z"
  },
  "ota": {
    "<runtimeVersion>": { "group": "<update group id>", "createdAt": "…", "message": "…" }
  }
}
```

- `apk.minVersionCode`: installed builds below it must update (blocking). A mandatory
  APK release sets it to its own version code; an optional one keeps the previous value.
- `ota[runtime]`: the latest **mandatory** OTA for that runtime. A build running that
  runtime with an older bundle (`Updates.createdAt` before `createdAt`) must load it.

## App behaviour

Only in the production app (`applicationId == com.elabins.pika`, not `__DEV__`).

- On cold start: fetch the manifest (5 s timeout; failures are silent).
  - `installed versionCode < minVersionCode` → **blocking screen**: notes, Update, download
    progress; no way past it.
  - `installed < apk.versionCode` and not skipped → dialog: notes, **Update** / **Later**.
    Later stores that version code; it is not offered again until a newer one.
  - mandatory OTA for this runtime newer than the running bundle → blocking
    "Updating…" screen: `fetchUpdateAsync()` then `reloadAsync()`; on failure, a Retry.
- Optional OTA: `expo-updates` checks on load and downloads in the background
  (`checkAutomatically: ON_LOAD`, `fallbackToCacheTimeout: 0`). When one is pending, a
  small banner offers **Restart**; otherwise it applies on the next launch.
- Update = download the APK to the cache (`expo-file-system` resumable download, progress),
  get a content URI, `IntentLauncher` `VIEW` with `application/vnd.android.package-archive`
  and read-permission flag. Android asks once to allow installs from Pika
  (`REQUEST_INSTALL_PACKAGES`).
- Settings: the version line shows `version (versionCode)` and the OTA id; a
  **Check for updates** row runs the same check and says "Up to date" when there is
  nothing (ignores "Later").

## Versioning

`eas.json`: `cli.appVersionSource: "remote"`; `production-apk` and `production` get
`channel: "production"` and `autoIncrement: true`. The visible version lives in
`app.config.js` (now `1.1.0`).

## Release workflows (`.github/workflows`, manual `workflow_dispatch`)

Secret: `EXPO_TOKEN`. GitHub token: the built-in `GITHUB_TOKEN` (`contents: write`).

- `release-apk.yml` (inputs: `notes`, `mandatory`): `npm ci` → `eas build -p android
  --profile production-apk --wait --json` → read `appVersion`, `appBuildVersion`, APK URL →
  download → `gh release create v<version>-<code>` with `pika-<version>-<code>.apk` →
  update `latest.json` (`apk`, `minVersionCode`) on `app-manifest`.
- `publish-ota.yml` (inputs: `message`, `mandatory`): `eas update --channel production
  --message … --json`; if mandatory, write the Android update's group, runtime and
  createdAt into `latest.json` `ota`.

Manifest editing lives in `scripts/release-manifest.mjs` (plain Node, no deps), used by
both workflows.

## Rollout

The APK installed today has no updater: install the first release containing it by hand.
Back up the EAS Android keystore (`eas credentials`) — losing it means no further updates.

## Testing

`tsc`; `node --test` for the update decision and the manifest script; device check of
dialog, mandatory screen, download + installer, OTA banner and mandatory OTA.
