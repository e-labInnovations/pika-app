import { test } from "node:test";
import assert from "node:assert/strict";
import { isArchived, choosable, choosableCategories, splitArchived } from "../src/lib/archive.ts";

const tags = [
  { id: "a", name: "Food" },
  { id: "b", name: "MunnarTrip26", isActive: false },
  { id: "c", name: "Office", isActive: true },
];

test("isArchived only when isActive is false", () => {
  assert.equal(isArchived({ isActive: false }), true);
  assert.equal(isArchived({ isActive: null }), false);
  assert.equal(isArchived({}), false);
  assert.equal(isArchived(null), false);
});

test("choosable hides archived, but keeps ones already selected", () => {
  assert.deepEqual(choosable(tags).map((t) => t.id), ["a", "c"]);
  assert.deepEqual(choosable(tags, ["b"]).map((t) => t.id), ["a", "b", "c"]);
});

test("choosableCategories hides children of an archived parent", () => {
  const cats = [
    { id: "p1", name: "Hobby", isActive: false, parent: null },
    { id: "k1", name: "Kites", parent: { id: "p1" } },
    { id: "p2", name: "Food", parent: null },
    { id: "k2", name: "Lunch", parent: { id: "p2" } },
    { id: "k3", name: "Old", isActive: false, parent: { id: "p2" } },
  ];
  assert.deepEqual(choosableCategories(cats).map((c) => c.id), ["p2", "k2"]);
  // A kept child brings its (archived) parent, so it still has a group to sit in.
  assert.deepEqual(choosableCategories(cats, ["k1"]).map((c) => c.id), ["p1", "k1", "p2", "k2"]);
});

test("splitArchived separates active and archived, keeping order", () => {
  const { active, archived } = splitArchived(tags);
  assert.deepEqual(active.map((t) => t.id), ["a", "c"]);
  assert.deepEqual(archived.map((t) => t.id), ["b"]);
});
