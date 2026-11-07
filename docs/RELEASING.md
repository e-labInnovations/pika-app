# Releasing the Android app

The production APK is installed outside the Play Store and updates itself. Design:
`docs/superpowers/specs/2026-11-07-in-app-updates-design.md`.

## One-time setup

1. Create an access token at expo.dev → Account settings → Access tokens, and add it to
   this repo as the Actions secret `EXPO_TOKEN`.
2. Back up the signing key: `npx eas-cli credentials` → Android → production →
   download the keystore, and keep the file and its passwords somewhere safe. An APK
   signed with another key cannot update the installed app.
3. Install the first APK that contains the updater by hand. Every later release then
   updates in the app.

## Native change → new APK

Actions → **Release APK** → Run workflow, with release notes and, if older installs must
not keep running, **Mandatory**.

It builds the `production-apk` profile on EAS (the version code goes up by one each
time), creates the GitHub release `v<version>-<code>` with the APK, and updates
`latest.json` on the `app-manifest` release. Apps see it on their next start; Settings →
Check for updates finds it at once. Bump `version` in `app.config.js` for a user-visible
version change.

## JS-only change → OTA update

Actions → **Publish OTA update** → Run workflow, with a message and optionally
**Mandatory**.

It runs `eas update --channel production`. Apps download it in the background and offer
**Restart**; it applies on the next start anyway. A mandatory one is loaded before the
app can be used. OTA updates only reach APKs with the same native code (runtime
fingerprint); after a native change, release an APK.

## Do not

- Delete the `app-manifest` release or its `latest.json`.
- Build `production-apk` by hand and share it: it takes a version code the GitHub
  release does not know about. Use the workflow.
