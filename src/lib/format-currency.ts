import { useAuth } from "../context/AuthContext";

/**
 * Format a monetary amount using Intl.NumberFormat.
 *
 * @param amount  - The numeric value to format (null/undefined treated as 0).
 * @param currency - ISO 4217 currency code (e.g. "USD", "EUR"). Defaults to "USD".
 */
export function formatMoney(
  amount: number | null | undefined,
  currency?: string | null,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount ?? 0);
}

/**
 * Hook that returns a formatter pre-bound to the authenticated user's
 * currency preference from AuthContext.
 *
 * Usage:
 *   const fmt = useFormatMoney();
 *   fmt(account.balance)          // uses user's currency
 *   fmt(account.balance, "EUR")   // override for a specific call
 */
export function useFormatMoney() {
  const { settings } = useAuth();
  const userCurrency = settings?.currency ?? "USD";

  return (amount: number | null | undefined, currency?: string | null) =>
    formatMoney(amount, currency ?? userCurrency);
}
