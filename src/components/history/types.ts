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
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const end = (d: Date) => new Date(d.getTime() + 86400000 - 1).toISOString();

  switch (preset) {
    case 'today':
      return { dateFrom: today.toISOString(), dateTo: end(today) };
    case 'week': {
      const weekStart = new Date(today.getTime() - today.getDay() * 86400000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 86400000 - 1);
      return { dateFrom: weekStart.toISOString(), dateTo: weekEnd.toISOString() };
    }
    case 'month': {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      return { dateFrom: monthStart.toISOString(), dateTo: monthEnd.toISOString() };
    }
    case 'last_month': {
      const lmStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lmEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      return { dateFrom: lmStart.toISOString(), dateTo: lmEnd.toISOString() };
    }
    case 'year': {
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      return { dateFrom: yearStart.toISOString(), dateTo: yearEnd.toISOString() };
    }
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
