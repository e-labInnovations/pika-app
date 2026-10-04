import { useMemo } from "react";
import type { AITransactionData } from "../transaction/AIAssistantSheet";
import { useGetAccounts } from "../../services/gql/accounts/accounts.service";
import { useGetCategories } from "../../services/gql/categories/categories.service";
import { useGetPeople } from "../../services/gql/people/people.service";
import { useGetTags } from "../../services/gql/tags/tags.service";
import type { PendingSms } from "../../services/gql/sms/sms.service";
import type {
  AccountFieldsFragment,
  CategoryFieldsFragment,
  PersonFieldsFragment,
  TagFieldsFragment,
} from "../../services/gql/types/graphql";

export type SmsLookups = {
  category: (id?: string | null) => CategoryFieldsFragment | null;
  account: (id?: string | null) => AccountFieldsFragment | null;
  person: (id?: string | null) => PersonFieldsFragment | null;
  tags: (ids?: string[] | null) => TagFieldsFragment[];
};

/** Resolves the ids in SMS suggestions to the user's categories, accounts, people and tags. */
export function useSmsLookups(): SmsLookups {
  const { categories } = useGetCategories({ limit: 500, sort: "name" });
  const { tags } = useGetTags({ limit: 500 });
  const { accounts } = useGetAccounts({ limit: 100 });
  const { people } = useGetPeople({ limit: 500 });

  return useMemo<SmsLookups>(() => {
    const index = <T extends { id: string }>(list?: T[]) => new Map((list ?? []).map((x) => [x.id, x]));
    const cats = index(categories);
    const accts = index(accounts);
    const ppl = index(people);
    const tgs = index(tags);
    return {
      category: (id) => (id ? cats.get(id) ?? null : null),
      account: (id) => (id ? accts.get(id) ?? null : null),
      person: (id) => (id ? ppl.get(id) ?? null : null),
      tags: (ids) => (ids ?? []).flatMap((id) => tgs.get(id) ?? []),
    };
  }, [categories, accounts, people, tags]);
}

/** True when the suggestion has everything a transaction needs, so one tap can confirm it. */
export function canQuickConfirm(sms: PendingSms): boolean {
  const s = sms.suggestion;
  if (!s?.category || !sms.account) return false;
  return s.type !== "transfer" || !!s.toAccount;
}

/** The suggestion in the AI card's shape, with ids resolved to the user's records. */
export function toPreview(sms: PendingSms, find: SmsLookups): AITransactionData {
  const s = sms.suggestion;
  const p = sms.parsed;
  return {
    title: s?.title || p?.merchant || "Transaction",
    amount: parseFloat(p?.amount ?? "0"),
    type: s?.type ?? p?.type ?? "expense",
    date: p?.occurredAt ?? sms.receivedAt,
    category: find.category(s?.category),
    account: find.account(sms.account?.id),
    toAccount: find.account(s?.toAccount),
    person: find.person(s?.person),
    tags: find.tags(s?.tags),
  };
}
