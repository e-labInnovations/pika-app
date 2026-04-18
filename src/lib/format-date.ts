/**
 * Format a Date as a short relative string (e.g. "Just now", "5m ago",
 * "2h ago", "3d ago", "2w ago"). Falls back to a short absolute date
 * (e.g. "Mar 12") for anything older than about a month.
 */
export function formatRelativeShort(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.round(diffDay / 7)}w ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
