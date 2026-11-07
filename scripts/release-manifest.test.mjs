import { test } from "node:test";
import assert from "node:assert/strict";
import { withApk, withMandatoryOta } from "./release-manifest.mjs";

const rel = { version: "1.1.0", versionCode: 7, url: "https://x/pika.apk", notes: "n", publishedAt: "t" };

test("optional APK keeps the previous minVersionCode", () => {
  const m = withApk({ apk: { ...rel, versionCode: 6, minVersionCode: 4 } }, rel, false);
  assert.deepEqual(m.apk, { ...rel, minVersionCode: 4 });
});

test("mandatory APK sets minVersionCode to its own code", () => {
  assert.equal(withApk({}, rel, true).apk.minVersionCode, 7);
});

test("first optional release starts at minVersionCode 0", () => {
  assert.equal(withApk({}, rel, false).apk.minVersionCode, 0);
});

test("APK release keeps the OTA section", () => {
  const ota = { rt: { group: "g", createdAt: "c" } };
  assert.deepEqual(withApk({ ota }, rel, false).ota, ota);
});

test("mandatory OTA is recorded per runtime, keeping others", () => {
  const m = withMandatoryOta({ ota: { a: { group: "x", createdAt: "1" } } }, "b", { group: "g", createdAt: "2", message: "m" });
  assert.deepEqual(m.ota, { a: { group: "x", createdAt: "1" }, b: { group: "g", createdAt: "2", message: "m" } });
});
