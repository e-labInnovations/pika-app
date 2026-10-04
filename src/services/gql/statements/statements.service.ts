import { useMutation } from '@apollo/client/react';
import { ImportStatementRowsDocument, ParseStatementDocument } from '../types/graphql';
import { TRANSACTION_REFETCH_QUERIES } from '../transactions/transactions.service';
import type { SmsSuggestion } from '../sms/sms.service';

/** One statement row as the server read it (see pika-v2 utilities/statements). */
export type StatementRow = {
  index: number;
  date: string;
  particulars: string;
  amount: string;
  type: 'income' | 'expense';
  balance: number;
  ref: string | null;
  payee: string | null;
  match: { id: string; title: string } | null;
  suggestion: SmsSuggestion | null;
};

export type StatementResult = {
  bank: string;
  accountNumber: string | null;
  account: string | null;
  from: string | null;
  to: string | null;
  openingBalance: number | null;
  closingBalance: number | null;
  rows: StatementRow[];
  missing: number;
};

export type StatementImportRow = {
  date: string;
  amount: string;
  type: 'income' | 'expense';
  title: string;
  category: string;
  tags?: string[];
  person?: string | null;
  ref?: string | null;
  particulars?: string | null;
};

export const useParseStatement = () => {
  const [parse, { loading }] = useMutation(ParseStatementDocument);
  return {
    parseStatement: async (file: string, password?: string, account?: string) => {
      const res = await parse({ variables: { file, password: password || null, account: account || null } });
      return res.data?.parseStatement as StatementResult;
    },
    loading,
  };
};

export const useImportStatementRows = () => {
  const [run, { loading }] = useMutation(ImportStatementRowsDocument, {
    refetchQueries: [...TRANSACTION_REFETCH_QUERIES],
  });
  return {
    importRows: async (account: string, rows: StatementImportRow[]) => {
      const res = await run({ variables: { account, rows } });
      return (res.data?.importStatementRows ?? []) as string[];
    },
    loading,
  };
};
