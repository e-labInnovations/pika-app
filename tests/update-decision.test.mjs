import { test } from "node:test";
import assert from "node:assert/strict";
import { decideUpdate } from "../src/lib/updates/decide.ts";

const apk = {
  version: "1.2.0",
  versionCode: 7,
  url: "https://example.com/pika-1.2.0-7.apk",
  notes: "New things",
  minVersionCode: 0,
  publishedAt: "2026-11-07T10:00:00Z",
};
const installed = { versionCode: 5, runtimeVersion: "rt1", bundleCreatedAt: new Date("2026-11-01T00:00:00Z") };

test("newer optional APK → offer it", () => {
  const d = decideUpdate({ apk }, installed, null);
  assert.deepEqual(d, { kind: "apk", mandatory: false, apk });
});

test("already on the latest APK → nothing", () => {
  assert.deepEqual(decideUpdate({ apk }, { ...installed, versionCode: 7 }, null), { kind: "none" });
});

test("optional APK the user skipped → nothing; a newer one is offered again", () => {
  assert.deepEqual(decideUpdate({ apk }, installed, 7), { kind: "none" });
  assert.equal(decideUpdate({ apk: { ...apk, versionCode: 8 } }, installed, 7).kind, "apk");
});

test("below minVersionCode → mandatory, even if skipped", () => {
  const d = decideUpdate({ apk: { ...apk, minVersionCode: 6 } }, installed, 7);
  assert.deepEqual(d, { kind: "apk", mandatory: true, apk: { ...apk, minVersionCode: 6 } });
});

test("mandatory OTA for this runtime, newer than the running bundle → ota", () => {
  const m = { ota: { rt1: { group: "g1", createdAt: "2026-11-05T00:00:00Z", message: "fix" } } };
  assert.deepEqual(decideUpdate(m, installed, null), { kind: "ota", group: "g1", message: "fix" });
});

test("mandatory OTA already running, or for another runtime → nothing", () => {
  const older = { ota: { rt1: { group: "g1", createdAt: "2026-10-01T00:00:00Z" } } };
  const other = { ota: { rt2: { group: "g2", createdAt: "2026-11-05T00:00:00Z" } } };
  assert.equal(decideUpdate(older, installed, null).kind, "none");
  assert.equal(decideUpdate(other, installed, null).kind, "none");
});

test("a mandatory APK wins over a mandatory OTA", () => {
  const m = {
    apk: { ...apk, minVersionCode: 7 },
    ota: { rt1: { group: "g1", createdAt: "2026-11-05T00:00:00Z" } },
  };
  assert.equal(decideUpdate(m, installed, null).kind, "apk");
});

test("garbage manifest → nothing", () => {
  assert.equal(decideUpdate({}, installed, null).kind, "none");
  assert.equal(decideUpdate({ apk: { ...apk, versionCode: Number.NaN } }, installed, null).kind, "none");
});
