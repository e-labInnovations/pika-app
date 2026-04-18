import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicIcon } from '../Icon';
import { AccountAvatar } from '../AccountAvatar';
import { UserAvatar } from '../UserAvatar';
import { useColors } from '../../theme/colors';
import { useGetCategories } from '../../services/gql/categories/categories.service';
import { useGetTags } from '../../services/gql/tags/tags.service';
import { useGetPeople } from '../../services/gql/people/people.service';
import { useGetAccounts } from '../../services/gql/accounts/accounts.service';
import { ChipListSkeleton, PickerListSkeleton } from '../ui/PickerSkeletons';
import { SystemBadge } from '../ui/SystemBadge';
import { EmptyAccountsCard } from '../account/EmptyAccountsCard';
import { useAuth } from '../../context/AuthContext';
import { isSystem } from '../../lib/ownership';
import { Category_type_Input } from '../../services/gql/types/graphql';
import {
  DEFAULT_FILTER,
  DATE_PRESETS,
  countActiveFilters,
  getDatePresetRange,
  formatDateShort,
  type TxFilter,
  type TxFilterType,
  type DatePreset,
} from './types';

// ── Tab definitions ────────────────────────────────────────────────────────────

type FilterTab = 'type' | 'date' | 'categories' | 'tags' | 'people' | 'accounts';

const TABS: { id: FilterTab; label: string; icon: string }[] = [
  { id: 'type',       label: 'Type',       icon: 'layers' },
  { id: 'date',       label: 'Date',       icon: 'calendar' },
  { id: 'categories', label: 'Categories', icon: 'tag' },
  { id: 'tags',       label: 'Tags',       icon: 'hash' },
  { id: 'people',     label: 'People',     icon: 'users' },
  { id: 'accounts',   label: 'Accounts',   icon: 'wallet' },
];

function tabCount(tab: FilterTab, f: TxFilter): number {
  switch (tab) {
    case 'type':       return f.types.length;
    case 'date':       return f.dateFrom || f.dateTo ? 1 : 0;
    case 'categories': return f.categories.length;
    case 'tags':       return f.tags.length;
    case 'people':     return f.people.length;
    case 'accounts':   return f.accounts.length;
  }
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function SelectRow({
  label,
  description,
  selected,
  onPress,
  left,
  trailingBadge,
}: {
  label: string;
  description?: string | null;
  selected: boolean;
  onPress: () => void;
  left?: React.ReactNode;
  trailingBadge?: React.ReactNode;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3 px-3 py-2.5 rounded-xl"
      style={{ backgroundColor: selected ? `${C.primary}15` : C.surfaceHigh }}
    >
      {left}
      <View className="flex-1 min-w-0">
        <View className="flex-row items-center gap-1.5">
          <Text
            className="text-[13px] font-semibold"
            style={{ color: selected ? C.primary : C.onSurface, flexShrink: 1 }}
            numberOfLines={1}
          >
            {label}
          </Text>
          {trailingBadge}
        </View>
        {description ? (
          <Text className="text-[10px] text-on-surface-variant" numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
      <View
        className="w-5 h-5 rounded-full border-2 items-center justify-center"
        style={{
          borderColor: selected ? C.primary : C.outlineVariant,
          backgroundColor: selected ? C.primary : 'transparent',
        }}
      >
        {selected && <DynamicIcon name="check" size={11} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
}

function SearchInput({ value, onChangeText, placeholder }: { value: string; onChangeText: (v: string) => void; placeholder: string }) {
  const C = useColors();
  return (
    <View
      className="flex-row items-center gap-2 px-3 rounded-xl"
      style={{ height: 38, backgroundColor: C.surfaceHigh }}
    >
      <DynamicIcon name="search" size={14} color={C.outlineVariant} />
      <TextInput
        className="flex-1 text-[13px] text-on-surface"
        placeholderTextColor={C.outlineVariant}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} activeOpacity={0.7}>
          <DynamicIcon name="x" size={13} color={C.outlineVariant} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Tab content panels ─────────────────────────────────────────────────────────

function TypePanel({ local, setLocal }: { local: TxFilter; setLocal: React.Dispatch<React.SetStateAction<TxFilter>> }) {
  const C = useColors();
  const TYPES: { value: TxFilterType; label: string; desc: string; color: string }[] = [
    { value: 'income',   label: 'Income',   desc: 'Money you received',    color: '#10b981' },
    { value: 'expense',  label: 'Expense',  desc: 'Money you spent',       color: '#ef4444' },
    { value: 'transfer', label: 'Transfer', desc: 'Moved between accounts', color: '#6366f1' },
  ];

  const toggle = (t: TxFilterType) =>
    setLocal((p) => ({
      ...p,
      types: p.types.includes(t) ? p.types.filter((v) => v !== t) : [...p.types, t],
    }));

  return (
    <View className="gap-2">
      {TYPES.map((t) => {
        const active = local.types.includes(t.value);
        return (
          <TouchableOpacity
            key={t.value}
            onPress={() => toggle(t.value)}
            activeOpacity={0.75}
            className="flex-row items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              backgroundColor: active ? `${t.color}15` : C.surfaceHigh,
              borderWidth: 1.5,
              borderColor: active ? t.color : 'transparent',
            }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: `${t.color}20` }}
            >
              <DynamicIcon
                name={t.value === 'income' ? 'arrow-down-left' : t.value === 'expense' ? 'arrow-up-right' : 'arrow-right-left'}
                size={18}
                color={t.color}
              />
            </View>
            <View className="flex-1">
              <Text style={{ fontSize: 14, fontWeight: '700', color: active ? t.color : C.onSurface }}>
                {t.label}
              </Text>
              <Text style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 1 }}>{t.desc}</Text>
            </View>
            <View
              className="w-5 h-5 rounded-full border-2 items-center justify-center"
              style={{
                borderColor: active ? t.color : C.outlineVariant,
                backgroundColor: active ? t.color : 'transparent',
              }}
            >
              {active && <DynamicIcon name="check" size={11} color="#fff" />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function DatePanel({ local, setLocal }: { local: TxFilter; setLocal: React.Dispatch<React.SetStateAction<TxFilter>> }) {
  const C = useColors();

  const selectPreset = (preset: DatePreset) => {
    if (local.datePreset === preset) {
      setLocal((p) => ({ ...p, datePreset: '', dateFrom: '', dateTo: '' }));
    } else {
      const { dateFrom, dateTo } = getDatePresetRange(preset);
      setLocal((p) => ({ ...p, datePreset: preset, dateFrom, dateTo }));
    }
  };

  return (
    <View className="gap-3">
      {/* Presets */}
      <Text className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant px-1">
        Quick Select
      </Text>
      <View className="gap-2">
        {DATE_PRESETS.map((p) => {
          const active = local.datePreset === p.value;
          return (
            <TouchableOpacity
              key={p.value}
              onPress={() => selectPreset(p.value)}
              activeOpacity={0.75}
              className="flex-row items-center justify-between px-4 py-3 rounded-xl"
              style={{
                backgroundColor: active ? `${C.primary}15` : C.surfaceHigh,
                borderWidth: 1.5,
                borderColor: active ? C.primary : 'transparent',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: active ? C.primary : C.onSurface }}>
                {p.label}
              </Text>
              {active && (
                <Text style={{ fontSize: 11, color: C.primary }}>
                  {local.dateFrom ? formatDateShort(local.dateFrom) : ''} – {local.dateTo ? formatDateShort(local.dateTo) : ''}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Custom range */}
      <Text className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant px-1 mt-2">
        Custom Range
      </Text>
      <View className="flex-row gap-3">
        <View className="flex-1 gap-1.5">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant px-1">From</Text>
          <TextInput
            className="text-[13px] text-on-surface px-3 py-2.5 rounded-xl"
            style={{ backgroundColor: C.surfaceHigh }}
            placeholderTextColor={C.outlineVariant}
            placeholder="YYYY-MM-DD"
            value={local.dateFrom ? local.dateFrom.split('T')[0] : ''}
            onChangeText={(v) =>
              setLocal((p) => ({ ...p, dateFrom: v ? new Date(v).toISOString() : '', datePreset: '' }))
            }
            keyboardType="numbers-and-punctuation"
          />
        </View>
        <View className="flex-1 gap-1.5">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant px-1">To</Text>
          <TextInput
            className="text-[13px] text-on-surface px-3 py-2.5 rounded-xl"
            style={{ backgroundColor: C.surfaceHigh }}
            placeholderTextColor={C.outlineVariant}
            placeholder="YYYY-MM-DD"
            value={local.dateTo ? local.dateTo.split('T')[0] : ''}
            onChangeText={(v) =>
              setLocal((p) => ({ ...p, dateTo: v ? new Date(v + 'T23:59:59').toISOString() : '', datePreset: '' }))
            }
            keyboardType="numbers-and-punctuation"
          />
        </View>
      </View>

      {/* Clear date */}
      {(local.dateFrom || local.dateTo) && (
        <TouchableOpacity
          onPress={() => setLocal((p) => ({ ...p, dateFrom: '', dateTo: '', datePreset: '' }))}
          activeOpacity={0.7}
          className="flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl"
          style={{ backgroundColor: C.surfaceHigh }}
        >
          <DynamicIcon name="x" size={13} color={C.onSurfaceVariant} />
          <Text style={{ fontSize: 13, color: C.onSurfaceVariant, fontWeight: '600' }}>Clear date filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

type CategoryTypeFilter = 'all' | 'expense' | 'income' | 'transfer';

const CATEGORY_TYPE_TABS: {
  id: CategoryTypeFilter;
  label: string;
  icon: string;
  color: string;
}[] = [
  { id: 'all', label: 'All', icon: 'layers', color: '#6366f1' },
  { id: 'expense', label: 'Expense', icon: 'arrow-up-right', color: '#ef4444' },
  { id: 'income', label: 'Income', icon: 'arrow-down-left', color: '#10b981' },
  { id: 'transfer', label: 'Transfer', icon: 'arrow-right-left', color: '#8b5cf6' },
];

function CategoriesPanel({ local, setLocal }: { local: TxFilter; setLocal: React.Dispatch<React.SetStateAction<TxFilter>> }) {
  const C = useColors();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<CategoryTypeFilter>('all');

  const where =
    typeFilter === 'all'
      ? undefined
      : { type: { equals: Category_type_Input[typeFilter] } };
  const { categories, loading } = useGetCategories({ limit: 300, sort: 'name', where });

  // Build parent → children map
  const roots: typeof categories = [];
  const childrenMap = new Map<string, NonNullable<typeof categories>>();

  for (const cat of categories ?? []) {
    if (!cat.parent) {
      roots.push(cat);
    } else {
      const parentId = cat.parent.id;
      if (!childrenMap.has(parentId)) childrenMap.set(parentId, []);
      childrenMap.get(parentId)!.push(cat);
    }
  }

  const lc = search.toLowerCase();
  const matchesRoot = (cat: NonNullable<typeof categories>[number]) =>
    !search ||
    cat.name.toLowerCase().includes(lc) ||
    (cat.description ?? '').toLowerCase().includes(lc) ||
    (childrenMap.get(cat.id) ?? []).some(
      (c) =>
        c.name.toLowerCase().includes(lc) ||
        (c.description ?? '').toLowerCase().includes(lc),
    );

  const toggle = (id: string) =>
    setLocal((p) => ({
      ...p,
      categories: p.categories.includes(id)
        ? p.categories.filter((v) => v !== id)
        : [...p.categories, id],
    }));

  const toggleWithChildren = (rootId: string) => {
    const children = (childrenMap.get(rootId) ?? []).map((c) => c.id);
    const allIds = [rootId, ...children];
    const allSelected = allIds.every((id) => local.categories.includes(id));
    setLocal((p) => ({
      ...p,
      categories: allSelected
        ? p.categories.filter((id) => !allIds.includes(id))
        : [...new Set([...p.categories, ...allIds])],
    }));
  };

  const filteredRoots = roots.filter(matchesRoot);

  return (
    <View className="gap-2.5">
      {/* Type filter chips */}
      <View className="flex-row gap-1.5">
        {CATEGORY_TYPE_TABS.map((t) => {
          const active = typeFilter === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => setTypeFilter(t.id)}
              activeOpacity={0.75}
              className="flex-row items-center gap-1 px-2.5 py-1.5 rounded-full"
              style={{
                backgroundColor: active ? `${t.color}20` : C.surfaceHigh,
                borderWidth: 1,
                borderColor: active ? t.color : 'transparent',
              }}
            >
              <DynamicIcon
                name={t.icon}
                size={11}
                color={active ? t.color : C.onSurfaceVariant}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: active ? t.color : C.onSurfaceVariant,
                }}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <SearchInput value={search} onChangeText={setSearch} placeholder="Search categories…" />

      {loading ? (
        <PickerListSkeleton count={5} />
      ) : filteredRoots.length === 0 ? (
        <View className="py-10 items-center gap-2">
          <DynamicIcon name="folder-search" size={28} color={C.outlineVariant} />
          <Text className="text-on-surface-variant text-sm">No categories found</Text>
        </View>
      ) : (
        <View className="gap-2.5">
          {filteredRoots.map((root) => {
            const children = (childrenMap.get(root.id) ?? []).filter(
              (c) =>
                !search ||
                c.name.toLowerCase().includes(lc) ||
                (c.description ?? '').toLowerCase().includes(lc),
            );
            const catBg = root.bgColor ?? `${root.color ?? C.outlineVariant}22`;
            const catColor = root.color ?? C.outlineVariant;
            const hasChildren = (childrenMap.get(root.id) ?? []).length > 0;
            const allSelected = hasChildren
              ? [root.id, ...(childrenMap.get(root.id) ?? []).map((c) => c.id)].every((id) => local.categories.includes(id))
              : local.categories.includes(root.id);
            const someSelected = hasChildren
              ? (childrenMap.get(root.id) ?? []).some((c) => local.categories.includes(c.id)) || local.categories.includes(root.id)
              : local.categories.includes(root.id);
            const systemFlag = isSystem(root, user?.id ?? null);

            return (
              <View key={root.id} className="gap-1">
                {/* Parent row */}
                <TouchableOpacity
                  onPress={() => hasChildren ? toggleWithChildren(root.id) : toggle(root.id)}
                  activeOpacity={0.7}
                  className="flex-row items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: someSelected ? `${C.primary}12` : C.surfaceHigh,
                  }}
                >
                  <View
                    className="w-8 h-8 rounded-lg items-center justify-center"
                    style={{ backgroundColor: catBg }}
                  >
                    <DynamicIcon name={root.icon} size={16} color={catColor} />
                  </View>
                  <View className="flex-1 min-w-0">
                    <View className="flex-row items-center gap-1.5">
                      <Text
                        className="text-[13px] font-semibold"
                        style={{ color: someSelected ? C.primary : C.onSurface, flexShrink: 1 }}
                        numberOfLines={1}
                      >
                        {root.name}
                      </Text>
                      {systemFlag && <SystemBadge size="xs" />}
                    </View>
                    {root.description ? (
                      <Text className="text-[10px] text-on-surface-variant" numberOfLines={1}>
                        {root.description}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    className="w-5 h-5 rounded-full border-2 items-center justify-center"
                    style={{
                      borderColor: allSelected ? C.primary : someSelected ? C.primary : C.outlineVariant,
                      backgroundColor: allSelected ? C.primary : 'transparent',
                    }}
                  >
                    {allSelected && <DynamicIcon name="check" size={11} color="#fff" />}
                    {!allSelected && someSelected && (
                      <View className="w-2 h-2 rounded-full" style={{ backgroundColor: C.primary }} />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Children */}
                {children.length > 0 && (
                  <View
                    className="ml-4 pl-3 gap-1"
                    style={{ borderLeftWidth: 1.5, borderLeftColor: `${catColor}55` }}
                  >
                    {children.map((child) => {
                      const cBg = child.bgColor ?? `${child.color ?? C.outlineVariant}22`;
                      const cColor = child.color ?? C.outlineVariant;
                      const sel = local.categories.includes(child.id);
                      const childSystem = isSystem(child, user?.id ?? null);
                      return (
                        <SelectRow
                          key={child.id}
                          label={child.name}
                          selected={sel}
                          onPress={() => toggle(child.id)}
                          trailingBadge={childSystem ? <SystemBadge size="xs" /> : null}
                          left={
                            <View
                              className="w-7 h-7 rounded-lg items-center justify-center"
                              style={{ backgroundColor: cBg }}
                            >
                              <DynamicIcon name={child.icon} size={13} color={cColor} />
                            </View>
                          }
                        />
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TagsPanel({ local, setLocal }: { local: TxFilter; setLocal: React.Dispatch<React.SetStateAction<TxFilter>> }) {
  const C = useColors();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const { tags, loading } = useGetTags({ limit: 200, sort: 'name' });

  const filtered = (tags ?? []).filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) =>
    setLocal((p) => ({
      ...p,
      tags: p.tags.includes(id) ? p.tags.filter((v) => v !== id) : [...p.tags, id],
    }));

  return (
    <View className="gap-2">
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search tags…" />
      {loading ? (
        <ChipListSkeleton count={10} />
      ) : filtered.length === 0 ? (
        <View className="py-10 items-center gap-2">
          <DynamicIcon name="hash" size={28} color={C.outlineVariant} />
          <Text className="text-on-surface-variant text-sm">No tags found</Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap gap-2">
          {filtered.map((tag) => {
            const active = local.tags.includes(tag.id);
            const color = tag.color ?? C.outlineVariant;
            const bg = tag.bgColor ?? `${color}22`;
            const systemFlag = isSystem(tag, user?.id ?? null);
            return (
              <TouchableOpacity
                key={tag.id}
                onPress={() => toggle(tag.id)}
                activeOpacity={0.75}
                className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: active ? bg : 'transparent',
                  borderWidth: 1.5,
                  borderColor: active ? color : `${C.outlineVariant}80`,
                }}
              >
                <DynamicIcon name={tag.icon} size={12} color={active ? color : C.onSurfaceVariant} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? color : C.onSurface }}>
                  {tag.name}
                </Text>
                {systemFlag && <SystemBadge size="xs" />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

function PeoplePanel({ local, setLocal }: { local: TxFilter; setLocal: React.Dispatch<React.SetStateAction<TxFilter>> }) {
  const C = useColors();
  const [search, setSearch] = useState('');
  const { people, loading } = useGetPeople({ limit: 200, sort: 'name' });

  const filtered = (people ?? []).filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) =>
    setLocal((p) => ({
      ...p,
      people: p.people.includes(id) ? p.people.filter((v) => v !== id) : [...p.people, id],
    }));

  return (
    <View className="gap-2">
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search people…" />
      {loading ? (
        <PickerListSkeleton count={5} />
      ) : filtered.length === 0 ? (
        <View className="py-10 items-center gap-2">
          <DynamicIcon name="users" size={28} color={C.outlineVariant} />
          <Text className="text-on-surface-variant text-sm">No people found</Text>
        </View>
      ) : (
        <View className="gap-1.5">
          {filtered.map((person) => (
            <SelectRow
              key={person.id}
              label={person.name}
              description={person.email ?? person.phone ?? null}
              selected={local.people.includes(person.id)}
              onPress={() => toggle(person.id)}
              left={
                <UserAvatar
                  id={person.id}
                  name={person.name}
                  avatarUrl={person.avatar?.url}
                  size={28}
                />
              }
            />
          ))}
        </View>
      )}
    </View>
  );
}

function AccountsPanel({
  local,
  setLocal,
  onClose,
}: {
  local: TxFilter;
  setLocal: React.Dispatch<React.SetStateAction<TxFilter>>;
  onClose: () => void;
}) {
  const C = useColors();
  const [search, setSearch] = useState('');
  const { accounts, loading } = useGetAccounts({ limit: 100, sort: 'name' });

  const filtered = (accounts ?? []).filter(
    (a) => !search || a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) =>
    setLocal((p) => ({
      ...p,
      accounts: p.accounts.includes(id) ? p.accounts.filter((v) => v !== id) : [...p.accounts, id],
    }));

  const hasAnyAccounts = (accounts?.length ?? 0) > 0;

  return (
    <View className="gap-2">
      {hasAnyAccounts && (
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search accounts…" />
      )}
      {loading ? (
        <PickerListSkeleton count={5} />
      ) : !hasAnyAccounts ? (
        <EmptyAccountsCard compact onBeforeNavigate={onClose} />
      ) : filtered.length === 0 ? (
        <View className="py-10 items-center gap-2">
          <DynamicIcon name="wallet" size={28} color={C.outlineVariant} />
          <Text className="text-on-surface-variant text-sm">No accounts found</Text>
        </View>
      ) : (
        <View className="gap-1.5">
          {filtered.map((acc) => (
            <SelectRow
              key={acc.id}
              label={acc.name}
              description={acc.description ?? null}
              selected={local.accounts.includes(acc.id)}
              onPress={() => toggle(acc.id)}
              left={
                <AccountAvatar
                  avatarUrl={acc.avatar?.url}
                  icon={acc.icon}
                  bgColor={acc.bgColor}
                  iconColor={acc.color}
                  name={acc.name}
                  size={28}
                />
              }
            />
          ))}
        </View>
      )}
    </View>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

type Props = {
  visible: boolean;
  filter: TxFilter;
  onApply: (filter: TxFilter) => void;
  onClose: () => void;
};

export function FilterSheet({ visible, filter, onApply, onClose }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const [local, setLocal] = useState<TxFilter>(filter);
  const [activeTab, setActiveTab] = useState<FilterTab>('type');

  React.useEffect(() => {
    if (visible) { setLocal(filter); }
  }, [visible, filter]);

  const activeCount = countActiveFilters(local);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={{
          backgroundColor: C.surface,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: '88%',
          flexDirection: 'column',
        }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-10 h-1 rounded-full" style={{ backgroundColor: C.outlineVariant }} />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-3">
          <View className="flex-row items-center gap-2">
            <Text className="text-[18px] font-black text-on-surface tracking-[-0.3px]">
              Filter
            </Text>
            {activeCount > 0 && (
              <View
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: C.primary }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#fff' }}>{activeCount}</Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center gap-2">
            {activeCount > 0 && (
              <TouchableOpacity
                onPress={() => setLocal(DEFAULT_FILTER)}
                activeOpacity={0.7}
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${C.outlineVariant}33` }}
              >
                <Text className="text-[12px] font-semibold text-on-surface-variant">Clear all</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body: vertical tab sidebar + content */}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Sidebar */}
          <View style={{ width: 72, borderRightWidth: 1, borderRightColor: `${C.outlineVariant}28` }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
            >
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                const count = tabCount(tab.id, local);
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.75}
                    style={{
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 4,
                      gap: 4,
                      backgroundColor: active ? `${C.primary}15` : 'transparent',
                      borderRightWidth: active ? 2.5 : 0,
                      borderRightColor: C.primary,
                    }}
                  >
                    <View style={{ position: 'relative' }}>
                      <DynamicIcon
                        name={tab.icon}
                        size={20}
                        color={active ? C.primary : C.onSurfaceVariant}
                      />
                      {count > 0 && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -6,
                            minWidth: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: C.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 2,
                          }}
                        >
                          <Text style={{ fontSize: 8, fontWeight: '800', color: '#fff' }}>{count}</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: active ? '700' : '500',
                        color: active ? C.primary : C.onSurfaceVariant,
                        textAlign: 'center',
                      }}
                      numberOfLines={1}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Tab content */}
          <ScrollView
            key={activeTab}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 14, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {activeTab === 'type'       && <TypePanel       local={local} setLocal={setLocal} />}
            {activeTab === 'date'       && <DatePanel       local={local} setLocal={setLocal} />}
            {activeTab === 'categories' && <CategoriesPanel local={local} setLocal={setLocal} />}
            {activeTab === 'tags'       && <TagsPanel       local={local} setLocal={setLocal} />}
            {activeTab === 'people'     && <PeoplePanel     local={local} setLocal={setLocal} />}
            {activeTab === 'accounts'   && <AccountsPanel   local={local} setLocal={setLocal} onClose={onClose} />}
          </ScrollView>
        </View>

        {/* Apply footer */}
        <View
          className="px-4 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, 16) + 4 }}
        >
          <TouchableOpacity
            onPress={() => { onApply(local); onClose(); }}
            activeOpacity={0.8}
            className="py-3.5 rounded-2xl items-center"
            style={{ backgroundColor: C.primary }}
          >
            <Text className="text-[15px] font-bold text-white">
              Apply{activeCount > 0 ? ` (${activeCount} active)` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
