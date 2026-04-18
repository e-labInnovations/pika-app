/**
 * Entity ownership helpers.
 *
 * Collections like Categories and Tags are seeded with a pool of shared
 * defaults owned by a "system" user. The frontend doesn't know every
 * system-user ID, but it does know the currently-authenticated user's ID —
 * so anything whose owner differs from the current user is treated as
 * system / shared.
 */
export type EntityWithUser = {
  user?: { id?: string | null } | string | null;
};

export function isOwnedBy(entity: EntityWithUser, userId: string | null | undefined): boolean {
  if (!userId) return false;
  const ownerId =
    typeof entity.user === "string" ? entity.user : entity.user?.id ?? null;
  return ownerId === userId;
}

/** True when the entity is not owned by the given user (i.e. likely system/shared). */
export function isSystem(entity: EntityWithUser, userId: string | null | undefined): boolean {
  if (!userId) return false;
  const ownerId =
    typeof entity.user === "string" ? entity.user : entity.user?.id ?? null;
  return !!ownerId && ownerId !== userId;
}
