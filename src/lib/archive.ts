/**
 * Archived = isActive false on a category, tag, person or account. Archived items
 * stay on old transactions and in reports, but aren't offered when choosing.
 */
type Archivable = { id: string; isActive?: boolean | null };
type CategoryLike = Archivable & { parent?: { id: string } | string | null };

export const isArchived = (x?: { isActive?: boolean | null } | null): boolean => x?.isActive === false;

/** Items to offer in a picker: active ones, plus any already selected (so a chip doesn't vanish). */
export function choosable<T extends Archivable>(items: readonly T[], keepIds: readonly string[] = []): T[] {
  return items.filter((x) => !isArchived(x) || keepIds.includes(x.id));
}

const parentId = (c: CategoryLike) => (typeof c.parent === "string" ? c.parent : c.parent?.id ?? null);

/** Like `choosable`, and a category under an archived parent counts as archived. */
export function choosableCategories<T extends CategoryLike>(cats: readonly T[], keepIds: readonly string[] = []): T[] {
  const archivedParents = new Set(cats.filter((c) => !parentId(c) && isArchived(c)).map((c) => c.id));
  const kept = cats.filter((c) => {
    const pid = parentId(c);
    const off = isArchived(c) || (pid != null && archivedParents.has(pid));
    return !off || keepIds.includes(c.id);
  });
  // A kept child needs its parent, even an archived one, to be grouped under.
  const ids = new Set(kept.map((c) => c.id));
  const needed = new Set(kept.map(parentId).filter((p): p is string => p != null && !ids.has(p)));
  return needed.size ? cats.filter((c) => ids.has(c.id) || needed.has(c.id)) : kept;
}

/** For manage lists and filters: active first, archived in their own group. */
export function splitArchived<T extends { isActive?: boolean | null }>(items: readonly T[]): { active: T[]; archived: T[] } {
  const active: T[] = [];
  const archived: T[] = [];
  for (const x of items) (isArchived(x) ? archived : active).push(x);
  return { active, archived };
}
