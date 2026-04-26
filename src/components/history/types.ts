import { Transaction_type_Input } from '../../services/gql/types/graphql';

// ── Filter ────────────────────────────────────────────────────────────────────

export type TxFilterType = 'income' | 'expense' | 'transfer';

export type DatePreset = 'today' | 'week' | 'month' | 'last_month' | 'year';

export type TxFilter = {
  types: TxFilterType[];
  categories: string[];   // category ids
  tags: string[];         // tag ids
  people: string[];       // person ids
  accounts: string[];     // account ids
  dateFrom: string;       // ISO string or ''
  dateTo: string;         // ISO string or ''
  datePreset: DatePreset | '';
};

export const DEFAULT_FILTER: TxFilter = {
  types: [],
  categories: [],
  tags: [],
  people: [],
  accounts: [],
  dateFrom: '',
  dateTo: '',
  datePreset: '',
};

// ── Sort ──────────────────────────────────────────────────────────────────────

export type SortField = 'date' | 'amount' | 'title';
export type SortDir = 'asc' | 'desc';
export type TxSort = { field: SortField; dir: SortDir };

export const DEFAULT_SORT: TxSort = { field: 'date', dir: 'desc' };

export const SORT_OPTIONS: { field: SortField; label: string; ascLabel: string; descLabel: string }[] = [
  { field: 'date',   label: 'Date',        ascLabel: 'Oldest first',       descLabel: 'Newest first' },
  { field: 'amount', label: 'Amount',      ascLabel: 'Lowest first',       descLabel: 'Highest first' },
  { field: 'title',  label: 'Description', ascLabel: 'A → Z',              descLabel: 'Z → A' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function toSortString(sort: TxSort): string {
  return sort.dir === 'desc' ? `-${sort.field}` : sort.field;
}

export function countActiveFilters(f: TxFilter): number {
  let count = 0;
  if (f.types.length > 0) count++;
  if (f.categories.length > 0) count++;
  if (f.tags.length > 0) count++;
  if (f.people.length > 0) count++;
  if (f.accounts.length > 0) count++;
  if (f.dateFrom || f.dateTo) count++;
  return count;
}

export function isDefaultSort(s: TxSort): boolean {
  return s.field === DEFAULT_SORT.field && s.dir === DEFAULT_SORT.dir;
}

export function getDatePresetRange(preset: DatePreset): { dateFrom: string; dateTo: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const dow = now.getDay(); // Sunday = 0

  // Always build local midnight / end-of-day via the Date constructor so that
  // toISOString() produces the correct UTC offset for the device's timezone.
  // Using ms arithmetic (getTime() ± N * 86400000) is DST-unsafe.
  const start = (year: number, month: number, day: number) =>
    new Date(year, month, day, 0, 0, 0, 0).toISOString();
  const end = (year: number, month: number, day: number) =>
    new Date(year, month, day, 23, 59, 59, 999).toISOString();

  switch (preset) {
    case 'today':
      return { dateFrom: start(y, m, d), dateTo: end(y, m, d) };
    case 'week':
      // JS Date handles negative/overflow day values correctly (e.g. day -2 = 2 days before month start).
      return { dateFrom: start(y, m, d - dow), dateTo: end(y, m, d - dow + 6) };
    case 'month':
      return { dateFrom: start(y, m, 1), dateTo: end(y, m + 1, 0) }; // day 0 of next month = last day of this month
    case 'last_month':
      return { dateFrom: start(y, m - 1, 1), dateTo: end(y, m, 0) };
    case 'year':
      return { dateFrom: start(y, 0, 1), dateTo: end(y, 11, 31) };
  }
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: 'today',      label: 'Today' },
  { value: 'week',       label: 'This Week' },
  { value: 'month',      label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'year',       label: 'This Year' },
];

// Re-export for use in buildWhere
export { Transaction_type_Input };
