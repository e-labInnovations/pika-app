#!/usr/bin/env node
/**
 * Edits the release manifest (latest.json on the `app-manifest` GitHub release) that the
 * app reads to find updates. Used by .github/workflows/release-apk.yml and publish-ota.yml.
 *
 *   node scripts/release-manifest.mjs apk <file> <version> <versionCode> <url> <publishedAt> <mandatory> [notesFile]
 *   node scripts/release-manifest.mjs ota <file> <runtimeVersion> <group> <createdAt> [message]
 *
 * The file is read if it exists and written back in place.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** A new APK release. Mandatory → installs below it must update; optional keeps the old floor. */
export function withApk(manifest, release, mandatory) {
  const previousMin = manifest.apk?.minVersionCode ?? 0;
  return {
    ...manifest,
    apk: { ...release, minVersionCode: mandatory ? release.versionCode : previousMin },
  };
}

/** The latest mandatory OTA for a runtime version. */
export function withMandatoryOta(manifest, runtimeVersion, update) {
  return { ...manifest, ota: { ...(manifest.ota ?? {}), [runtimeVersion]: update } };
}

function main([cmd, file, ...args]) {
  const manifest = existsSync(file) ? JSON.parse(readFileSync(file, "utf8") || "{}") : {};
  let next;
  if (cmd === "apk") {
    const [version, code, url, publishedAt, mandatory, notesFile] = args;
    const versionCode = Number(code);
    if (!version || !Number.isInteger(versionCode) || !url?.startsWith("https://")) {
      throw new Error(`bad apk args: ${args.join(" ")}`);
    }
    const notes = notesFile && existsSync(notesFile) ? readFileSync(notesFile, "utf8").trim() : "";
    next = withApk(manifest, { version, versionCode, url, notes, publishedAt }, mandatory === "true");
  } else if (cmd === "ota") {
    const [runtimeVersion, group, createdAt, message] = args;
    if (!runtimeVersion || !group || !createdAt) throw new Error(`bad ota args: ${args.join(" ")}`);
    next = withMandatoryOta(manifest, runtimeVersion, { group, createdAt, ...(message ? { message } : {}) });
  } else {
    throw new Error(`unknown command: ${cmd}`);
  }
  writeFileSync(file, JSON.stringify(next, null, 2) + "\n");
  console.log(JSON.stringify(next, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
