/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Arbitrary JSON value */
  AITransactionData: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AITransactionResult = {
  __typename?: 'AITransactionResult';
  /** Predicted transaction fields */
  data?: Maybe<Scalars['AITransactionData']['output']>;
  latencyMs: Scalars['Float']['output'];
  model: Scalars['String']['output'];
  usage: AIUsageMeta;
};

export type AIUsageMeta = {
  __typename?: 'AIUsageMeta';
  candidatesTokenCount: Scalars['Int']['output'];
  promptTokenCount: Scalars['Int']['output'];
  totalTokenCount: Scalars['Int']['output'];
};

export type Access = {
  __typename?: 'Access';
  accounts?: Maybe<accountsAccess>;
  ai_usages?: Maybe<ai_usagesAccess>;
  app_settings?: Maybe<app_settingsAccess>;
  canAccessAdmin: Scalars['Boolean']['output'];
  categories?: Maybe<categoriesAccess>;
  media?: Maybe<mediaAccess>;
  oauth_accounts?: Maybe<oauth_accountsAccess>;
  payload_kv?: Maybe<payload_kvAccess>;
  payload_locked_documents?: Maybe<payload_locked_documentsAccess>;
  payload_mcp_api_keys?: Maybe<payload_mcp_api_keysAccess>;
  payload_preferences?: Maybe<payload_preferencesAccess>;
  people?: Maybe<peopleAccess>;
  reminders?: Maybe<remindersAccess>;
  tags?: Maybe<tagsAccess>;
  transactions?: Maybe<transactionsAccess>;
  user_settings?: Maybe<user_settingsAccess>;
  users?: Maybe<usersAccess>;
};

export type Account = {
  __typename?: 'Account';
  avatar?: Maybe<Media>;
  balance?: Maybe<Scalars['Float']['output']>;
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastTransactionAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  totalTransactions?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type Account_avatar_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Account_balance_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Account_bgColor_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_color_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_description_operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Account_icon_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_isActive_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Account_lastTransactionAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_totalTransactions_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Account_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Account_where = {
  AND?: InputMaybe<Array<InputMaybe<Account_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_where_or>>>;
  avatar?: InputMaybe<Account_avatar_operator>;
  balance?: InputMaybe<Account_balance_operator>;
  bgColor?: InputMaybe<Account_bgColor_operator>;
  color?: InputMaybe<Account_color_operator>;
  createdAt?: InputMaybe<Account_createdAt_operator>;
  description?: InputMaybe<Account_description_operator>;
  icon?: InputMaybe<Account_icon_operator>;
  id?: InputMaybe<Account_id_operator>;
  isActive?: InputMaybe<Account_isActive_operator>;
  lastTransactionAt?: InputMaybe<Account_lastTransactionAt_operator>;
  name?: InputMaybe<Account_name_operator>;
  totalTransactions?: InputMaybe<Account_totalTransactions_operator>;
  updatedAt?: InputMaybe<Account_updatedAt_operator>;
  user?: InputMaybe<Account_user_operator>;
};

export type Account_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Account_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_where_or>>>;
  avatar?: InputMaybe<Account_avatar_operator>;
  balance?: InputMaybe<Account_balance_operator>;
  bgColor?: InputMaybe<Account_bgColor_operator>;
  color?: InputMaybe<Account_color_operator>;
  createdAt?: InputMaybe<Account_createdAt_operator>;
  description?: InputMaybe<Account_description_operator>;
  icon?: InputMaybe<Account_icon_operator>;
  id?: InputMaybe<Account_id_operator>;
  isActive?: InputMaybe<Account_isActive_operator>;
  lastTransactionAt?: InputMaybe<Account_lastTransactionAt_operator>;
  name?: InputMaybe<Account_name_operator>;
  totalTransactions?: InputMaybe<Account_totalTransactions_operator>;
  updatedAt?: InputMaybe<Account_updatedAt_operator>;
  user?: InputMaybe<Account_user_operator>;
};

export type Account_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Account_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_where_or>>>;
  avatar?: InputMaybe<Account_avatar_operator>;
  balance?: InputMaybe<Account_balance_operator>;
  bgColor?: InputMaybe<Account_bgColor_operator>;
  color?: InputMaybe<Account_color_operator>;
  createdAt?: InputMaybe<Account_createdAt_operator>;
  description?: InputMaybe<Account_description_operator>;
  icon?: InputMaybe<Account_icon_operator>;
  id?: InputMaybe<Account_id_operator>;
  isActive?: InputMaybe<Account_isActive_operator>;
  lastTransactionAt?: InputMaybe<Account_lastTransactionAt_operator>;
  name?: InputMaybe<Account_name_operator>;
  totalTransactions?: InputMaybe<Account_totalTransactions_operator>;
  updatedAt?: InputMaybe<Account_updatedAt_operator>;
  user?: InputMaybe<Account_user_operator>;
};

export type Accounts = {
  __typename?: 'Accounts';
  docs: Array<Account>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AccountsCreateAccess = {
  __typename?: 'AccountsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsCreateDocAccess = {
  __typename?: 'AccountsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsDeleteAccess = {
  __typename?: 'AccountsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsDeleteDocAccess = {
  __typename?: 'AccountsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsDocAccessFields = {
  __typename?: 'AccountsDocAccessFields';
  avatar?: Maybe<AccountsDocAccessFields_avatar>;
  balance?: Maybe<AccountsDocAccessFields_balance>;
  bgColor?: Maybe<AccountsDocAccessFields_bgColor>;
  color?: Maybe<AccountsDocAccessFields_color>;
  createdAt?: Maybe<AccountsDocAccessFields_createdAt>;
  description?: Maybe<AccountsDocAccessFields_description>;
  icon?: Maybe<AccountsDocAccessFields_icon>;
  isActive?: Maybe<AccountsDocAccessFields_isActive>;
  lastTransactionAt?: Maybe<AccountsDocAccessFields_lastTransactionAt>;
  name?: Maybe<AccountsDocAccessFields_name>;
  totalTransactions?: Maybe<AccountsDocAccessFields_totalTransactions>;
  updatedAt?: Maybe<AccountsDocAccessFields_updatedAt>;
  user?: Maybe<AccountsDocAccessFields_user>;
};

export type AccountsDocAccessFields_avatar = {
  __typename?: 'AccountsDocAccessFields_avatar';
  create?: Maybe<AccountsDocAccessFields_avatar_Create>;
  delete?: Maybe<AccountsDocAccessFields_avatar_Delete>;
  read?: Maybe<AccountsDocAccessFields_avatar_Read>;
  update?: Maybe<AccountsDocAccessFields_avatar_Update>;
};

export type AccountsDocAccessFields_avatar_Create = {
  __typename?: 'AccountsDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_avatar_Delete = {
  __typename?: 'AccountsDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_avatar_Read = {
  __typename?: 'AccountsDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_avatar_Update = {
  __typename?: 'AccountsDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_balance = {
  __typename?: 'AccountsDocAccessFields_balance';
  create?: Maybe<AccountsDocAccessFields_balance_Create>;
  delete?: Maybe<AccountsDocAccessFields_balance_Delete>;
  read?: Maybe<AccountsDocAccessFields_balance_Read>;
  update?: Maybe<AccountsDocAccessFields_balance_Update>;
};

export type AccountsDocAccessFields_balance_Create = {
  __typename?: 'AccountsDocAccessFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_balance_Delete = {
  __typename?: 'AccountsDocAccessFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_balance_Read = {
  __typename?: 'AccountsDocAccessFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_balance_Update = {
  __typename?: 'AccountsDocAccessFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_bgColor = {
  __typename?: 'AccountsDocAccessFields_bgColor';
  create?: Maybe<AccountsDocAccessFields_bgColor_Create>;
  delete?: Maybe<AccountsDocAccessFields_bgColor_Delete>;
  read?: Maybe<AccountsDocAccessFields_bgColor_Read>;
  update?: Maybe<AccountsDocAccessFields_bgColor_Update>;
};

export type AccountsDocAccessFields_bgColor_Create = {
  __typename?: 'AccountsDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_bgColor_Delete = {
  __typename?: 'AccountsDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_bgColor_Read = {
  __typename?: 'AccountsDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_bgColor_Update = {
  __typename?: 'AccountsDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_color = {
  __typename?: 'AccountsDocAccessFields_color';
  create?: Maybe<AccountsDocAccessFields_color_Create>;
  delete?: Maybe<AccountsDocAccessFields_color_Delete>;
  read?: Maybe<AccountsDocAccessFields_color_Read>;
  update?: Maybe<AccountsDocAccessFields_color_Update>;
};

export type AccountsDocAccessFields_color_Create = {
  __typename?: 'AccountsDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_color_Delete = {
  __typename?: 'AccountsDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_color_Read = {
  __typename?: 'AccountsDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_color_Update = {
  __typename?: 'AccountsDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_createdAt = {
  __typename?: 'AccountsDocAccessFields_createdAt';
  create?: Maybe<AccountsDocAccessFields_createdAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_createdAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_createdAt_Read>;
  update?: Maybe<AccountsDocAccessFields_createdAt_Update>;
};

export type AccountsDocAccessFields_createdAt_Create = {
  __typename?: 'AccountsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_createdAt_Delete = {
  __typename?: 'AccountsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_createdAt_Read = {
  __typename?: 'AccountsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_createdAt_Update = {
  __typename?: 'AccountsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_description = {
  __typename?: 'AccountsDocAccessFields_description';
  create?: Maybe<AccountsDocAccessFields_description_Create>;
  delete?: Maybe<AccountsDocAccessFields_description_Delete>;
  read?: Maybe<AccountsDocAccessFields_description_Read>;
  update?: Maybe<AccountsDocAccessFields_description_Update>;
};

export type AccountsDocAccessFields_description_Create = {
  __typename?: 'AccountsDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_description_Delete = {
  __typename?: 'AccountsDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_description_Read = {
  __typename?: 'AccountsDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_description_Update = {
  __typename?: 'AccountsDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_icon = {
  __typename?: 'AccountsDocAccessFields_icon';
  create?: Maybe<AccountsDocAccessFields_icon_Create>;
  delete?: Maybe<AccountsDocAccessFields_icon_Delete>;
  read?: Maybe<AccountsDocAccessFields_icon_Read>;
  update?: Maybe<AccountsDocAccessFields_icon_Update>;
};

export type AccountsDocAccessFields_icon_Create = {
  __typename?: 'AccountsDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_icon_Delete = {
  __typename?: 'AccountsDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_icon_Read = {
  __typename?: 'AccountsDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_icon_Update = {
  __typename?: 'AccountsDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_isActive = {
  __typename?: 'AccountsDocAccessFields_isActive';
  create?: Maybe<AccountsDocAccessFields_isActive_Create>;
  delete?: Maybe<AccountsDocAccessFields_isActive_Delete>;
  read?: Maybe<AccountsDocAccessFields_isActive_Read>;
  update?: Maybe<AccountsDocAccessFields_isActive_Update>;
};

export type AccountsDocAccessFields_isActive_Create = {
  __typename?: 'AccountsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_isActive_Delete = {
  __typename?: 'AccountsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_isActive_Read = {
  __typename?: 'AccountsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_isActive_Update = {
  __typename?: 'AccountsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_lastTransactionAt = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt';
  create?: Maybe<AccountsDocAccessFields_lastTransactionAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_lastTransactionAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_lastTransactionAt_Read>;
  update?: Maybe<AccountsDocAccessFields_lastTransactionAt_Update>;
};

export type AccountsDocAccessFields_lastTransactionAt_Create = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_lastTransactionAt_Delete = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_lastTransactionAt_Read = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_lastTransactionAt_Update = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_name = {
  __typename?: 'AccountsDocAccessFields_name';
  create?: Maybe<AccountsDocAccessFields_name_Create>;
  delete?: Maybe<AccountsDocAccessFields_name_Delete>;
  read?: Maybe<AccountsDocAccessFields_name_Read>;
  update?: Maybe<AccountsDocAccessFields_name_Update>;
};

export type AccountsDocAccessFields_name_Create = {
  __typename?: 'AccountsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_name_Delete = {
  __typename?: 'AccountsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_name_Read = {
  __typename?: 'AccountsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_name_Update = {
  __typename?: 'AccountsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_totalTransactions = {
  __typename?: 'AccountsDocAccessFields_totalTransactions';
  create?: Maybe<AccountsDocAccessFields_totalTransactions_Create>;
  delete?: Maybe<AccountsDocAccessFields_totalTransactions_Delete>;
  read?: Maybe<AccountsDocAccessFields_totalTransactions_Read>;
  update?: Maybe<AccountsDocAccessFields_totalTransactions_Update>;
};

export type AccountsDocAccessFields_totalTransactions_Create = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_totalTransactions_Delete = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_totalTransactions_Read = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_totalTransactions_Update = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_updatedAt = {
  __typename?: 'AccountsDocAccessFields_updatedAt';
  create?: Maybe<AccountsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_updatedAt_Read>;
  update?: Maybe<AccountsDocAccessFields_updatedAt_Update>;
};

export type AccountsDocAccessFields_updatedAt_Create = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_updatedAt_Delete = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_updatedAt_Read = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_updatedAt_Update = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_user = {
  __typename?: 'AccountsDocAccessFields_user';
  create?: Maybe<AccountsDocAccessFields_user_Create>;
  delete?: Maybe<AccountsDocAccessFields_user_Delete>;
  read?: Maybe<AccountsDocAccessFields_user_Read>;
  update?: Maybe<AccountsDocAccessFields_user_Update>;
};

export type AccountsDocAccessFields_user_Create = {
  __typename?: 'AccountsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_user_Delete = {
  __typename?: 'AccountsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_user_Read = {
  __typename?: 'AccountsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_user_Update = {
  __typename?: 'AccountsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields = {
  __typename?: 'AccountsFields';
  avatar?: Maybe<AccountsFields_avatar>;
  balance?: Maybe<AccountsFields_balance>;
  bgColor?: Maybe<AccountsFields_bgColor>;
  color?: Maybe<AccountsFields_color>;
  createdAt?: Maybe<AccountsFields_createdAt>;
  description?: Maybe<AccountsFields_description>;
  icon?: Maybe<AccountsFields_icon>;
  isActive?: Maybe<AccountsFields_isActive>;
  lastTransactionAt?: Maybe<AccountsFields_lastTransactionAt>;
  name?: Maybe<AccountsFields_name>;
  totalTransactions?: Maybe<AccountsFields_totalTransactions>;
  updatedAt?: Maybe<AccountsFields_updatedAt>;
  user?: Maybe<AccountsFields_user>;
};

export type AccountsFields_avatar = {
  __typename?: 'AccountsFields_avatar';
  create?: Maybe<AccountsFields_avatar_Create>;
  delete?: Maybe<AccountsFields_avatar_Delete>;
  read?: Maybe<AccountsFields_avatar_Read>;
  update?: Maybe<AccountsFields_avatar_Update>;
};

export type AccountsFields_avatar_Create = {
  __typename?: 'AccountsFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_avatar_Delete = {
  __typename?: 'AccountsFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_avatar_Read = {
  __typename?: 'AccountsFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_avatar_Update = {
  __typename?: 'AccountsFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_balance = {
  __typename?: 'AccountsFields_balance';
  create?: Maybe<AccountsFields_balance_Create>;
  delete?: Maybe<AccountsFields_balance_Delete>;
  read?: Maybe<AccountsFields_balance_Read>;
  update?: Maybe<AccountsFields_balance_Update>;
};

export type AccountsFields_balance_Create = {
  __typename?: 'AccountsFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_balance_Delete = {
  __typename?: 'AccountsFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_balance_Read = {
  __typename?: 'AccountsFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_balance_Update = {
  __typename?: 'AccountsFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_bgColor = {
  __typename?: 'AccountsFields_bgColor';
  create?: Maybe<AccountsFields_bgColor_Create>;
  delete?: Maybe<AccountsFields_bgColor_Delete>;
  read?: Maybe<AccountsFields_bgColor_Read>;
  update?: Maybe<AccountsFields_bgColor_Update>;
};

export type AccountsFields_bgColor_Create = {
  __typename?: 'AccountsFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_bgColor_Delete = {
  __typename?: 'AccountsFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_bgColor_Read = {
  __typename?: 'AccountsFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_bgColor_Update = {
  __typename?: 'AccountsFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_color = {
  __typename?: 'AccountsFields_color';
  create?: Maybe<AccountsFields_color_Create>;
  delete?: Maybe<AccountsFields_color_Delete>;
  read?: Maybe<AccountsFields_color_Read>;
  update?: Maybe<AccountsFields_color_Update>;
};

export type AccountsFields_color_Create = {
  __typename?: 'AccountsFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_color_Delete = {
  __typename?: 'AccountsFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_color_Read = {
  __typename?: 'AccountsFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_color_Update = {
  __typename?: 'AccountsFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_createdAt = {
  __typename?: 'AccountsFields_createdAt';
  create?: Maybe<AccountsFields_createdAt_Create>;
  delete?: Maybe<AccountsFields_createdAt_Delete>;
  read?: Maybe<AccountsFields_createdAt_Read>;
  update?: Maybe<AccountsFields_createdAt_Update>;
};

export type AccountsFields_createdAt_Create = {
  __typename?: 'AccountsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_createdAt_Delete = {
  __typename?: 'AccountsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_createdAt_Read = {
  __typename?: 'AccountsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_createdAt_Update = {
  __typename?: 'AccountsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_description = {
  __typename?: 'AccountsFields_description';
  create?: Maybe<AccountsFields_description_Create>;
  delete?: Maybe<AccountsFields_description_Delete>;
  read?: Maybe<AccountsFields_description_Read>;
  update?: Maybe<AccountsFields_description_Update>;
};

export type AccountsFields_description_Create = {
  __typename?: 'AccountsFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_description_Delete = {
  __typename?: 'AccountsFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_description_Read = {
  __typename?: 'AccountsFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_description_Update = {
  __typename?: 'AccountsFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_icon = {
  __typename?: 'AccountsFields_icon';
  create?: Maybe<AccountsFields_icon_Create>;
  delete?: Maybe<AccountsFields_icon_Delete>;
  read?: Maybe<AccountsFields_icon_Read>;
  update?: Maybe<AccountsFields_icon_Update>;
};

export type AccountsFields_icon_Create = {
  __typename?: 'AccountsFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_icon_Delete = {
  __typename?: 'AccountsFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_icon_Read = {
  __typename?: 'AccountsFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_icon_Update = {
  __typename?: 'AccountsFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_isActive = {
  __typename?: 'AccountsFields_isActive';
  create?: Maybe<AccountsFields_isActive_Create>;
  delete?: Maybe<AccountsFields_isActive_Delete>;
  read?: Maybe<AccountsFields_isActive_Read>;
  update?: Maybe<AccountsFields_isActive_Update>;
};

export type AccountsFields_isActive_Create = {
  __typename?: 'AccountsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_isActive_Delete = {
  __typename?: 'AccountsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_isActive_Read = {
  __typename?: 'AccountsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_isActive_Update = {
  __typename?: 'AccountsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_lastTransactionAt = {
  __typename?: 'AccountsFields_lastTransactionAt';
  create?: Maybe<AccountsFields_lastTransactionAt_Create>;
  delete?: Maybe<AccountsFields_lastTransactionAt_Delete>;
  read?: Maybe<AccountsFields_lastTransactionAt_Read>;
  update?: Maybe<AccountsFields_lastTransactionAt_Update>;
};

export type AccountsFields_lastTransactionAt_Create = {
  __typename?: 'AccountsFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_lastTransactionAt_Delete = {
  __typename?: 'AccountsFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_lastTransactionAt_Read = {
  __typename?: 'AccountsFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_lastTransactionAt_Update = {
  __typename?: 'AccountsFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_name = {
  __typename?: 'AccountsFields_name';
  create?: Maybe<AccountsFields_name_Create>;
  delete?: Maybe<AccountsFields_name_Delete>;
  read?: Maybe<AccountsFields_name_Read>;
  update?: Maybe<AccountsFields_name_Update>;
};

export type AccountsFields_name_Create = {
  __typename?: 'AccountsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_name_Delete = {
  __typename?: 'AccountsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_name_Read = {
  __typename?: 'AccountsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_name_Update = {
  __typename?: 'AccountsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_totalTransactions = {
  __typename?: 'AccountsFields_totalTransactions';
  create?: Maybe<AccountsFields_totalTransactions_Create>;
  delete?: Maybe<AccountsFields_totalTransactions_Delete>;
  read?: Maybe<AccountsFields_totalTransactions_Read>;
  update?: Maybe<AccountsFields_totalTransactions_Update>;
};

export type AccountsFields_totalTransactions_Create = {
  __typename?: 'AccountsFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_totalTransactions_Delete = {
  __typename?: 'AccountsFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_totalTransactions_Read = {
  __typename?: 'AccountsFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_totalTransactions_Update = {
  __typename?: 'AccountsFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_updatedAt = {
  __typename?: 'AccountsFields_updatedAt';
  create?: Maybe<AccountsFields_updatedAt_Create>;
  delete?: Maybe<AccountsFields_updatedAt_Delete>;
  read?: Maybe<AccountsFields_updatedAt_Read>;
  update?: Maybe<AccountsFields_updatedAt_Update>;
};

export type AccountsFields_updatedAt_Create = {
  __typename?: 'AccountsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_updatedAt_Delete = {
  __typename?: 'AccountsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_updatedAt_Read = {
  __typename?: 'AccountsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_updatedAt_Update = {
  __typename?: 'AccountsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_user = {
  __typename?: 'AccountsFields_user';
  create?: Maybe<AccountsFields_user_Create>;
  delete?: Maybe<AccountsFields_user_Delete>;
  read?: Maybe<AccountsFields_user_Read>;
  update?: Maybe<AccountsFields_user_Update>;
};

export type AccountsFields_user_Create = {
  __typename?: 'AccountsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_user_Delete = {
  __typename?: 'AccountsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_user_Read = {
  __typename?: 'AccountsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_user_Update = {
  __typename?: 'AccountsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsReadAccess = {
  __typename?: 'AccountsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsReadDocAccess = {
  __typename?: 'AccountsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsUpdateAccess = {
  __typename?: 'AccountsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AccountsUpdateDocAccess = {
  __typename?: 'AccountsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsage = {
  __typename?: 'AiUsage';
  apiKeyType?: Maybe<AiUsage_apiKeyType>;
  candidateTokens?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latencyMs?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  promptTokens?: Maybe<Scalars['Float']['output']>;
  promptType: AiUsage_promptType;
  status: AiUsage_status;
  totalTokens?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum AiUsageUpdate_apiKeyType_MutationInput {
  app = 'app',
  user = 'user'
}

export enum AiUsageUpdate_promptType_MutationInput {
  image = 'image',
  text = 'text'
}

export enum AiUsageUpdate_status_MutationInput {
  error = 'error',
  success = 'success'
}

export enum AiUsage_apiKeyType {
  app = 'app',
  user = 'user'
}

export enum AiUsage_apiKeyType_Input {
  app = 'app',
  user = 'user'
}

export enum AiUsage_apiKeyType_MutationInput {
  app = 'app',
  user = 'user'
}

export type AiUsage_apiKeyType_operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_apiKeyType_Input>>>;
  equals?: InputMaybe<AiUsage_apiKeyType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_apiKeyType_Input>>>;
  not_equals?: InputMaybe<AiUsage_apiKeyType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_apiKeyType_Input>>>;
};

export type AiUsage_candidateTokens_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AiUsage_error_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_latencyMs_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_model_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_promptTokens_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export enum AiUsage_promptType {
  image = 'image',
  text = 'text'
}

export enum AiUsage_promptType_Input {
  image = 'image',
  text = 'text'
}

export enum AiUsage_promptType_MutationInput {
  image = 'image',
  text = 'text'
}

export type AiUsage_promptType_operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_promptType_Input>>>;
  equals?: InputMaybe<AiUsage_promptType_Input>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_promptType_Input>>>;
  not_equals?: InputMaybe<AiUsage_promptType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_promptType_Input>>>;
};

export enum AiUsage_status {
  error = 'error',
  success = 'success'
}

export enum AiUsage_status_Input {
  error = 'error',
  success = 'success'
}

export enum AiUsage_status_MutationInput {
  error = 'error',
  success = 'success'
}

export type AiUsage_status_operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_status_Input>>>;
  equals?: InputMaybe<AiUsage_status_Input>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_status_Input>>>;
  not_equals?: InputMaybe<AiUsage_status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_status_Input>>>;
};

export type AiUsage_totalTokens_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AiUsage_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type AiUsage_where = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_where_or>>>;
  apiKeyType?: InputMaybe<AiUsage_apiKeyType_operator>;
  candidateTokens?: InputMaybe<AiUsage_candidateTokens_operator>;
  createdAt?: InputMaybe<AiUsage_createdAt_operator>;
  error?: InputMaybe<AiUsage_error_operator>;
  id?: InputMaybe<AiUsage_id_operator>;
  latencyMs?: InputMaybe<AiUsage_latencyMs_operator>;
  model?: InputMaybe<AiUsage_model_operator>;
  promptTokens?: InputMaybe<AiUsage_promptTokens_operator>;
  promptType?: InputMaybe<AiUsage_promptType_operator>;
  status?: InputMaybe<AiUsage_status_operator>;
  totalTokens?: InputMaybe<AiUsage_totalTokens_operator>;
  updatedAt?: InputMaybe<AiUsage_updatedAt_operator>;
  user?: InputMaybe<AiUsage_user_operator>;
};

export type AiUsage_where_and = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_where_or>>>;
  apiKeyType?: InputMaybe<AiUsage_apiKeyType_operator>;
  candidateTokens?: InputMaybe<AiUsage_candidateTokens_operator>;
  createdAt?: InputMaybe<AiUsage_createdAt_operator>;
  error?: InputMaybe<AiUsage_error_operator>;
  id?: InputMaybe<AiUsage_id_operator>;
  latencyMs?: InputMaybe<AiUsage_latencyMs_operator>;
  model?: InputMaybe<AiUsage_model_operator>;
  promptTokens?: InputMaybe<AiUsage_promptTokens_operator>;
  promptType?: InputMaybe<AiUsage_promptType_operator>;
  status?: InputMaybe<AiUsage_status_operator>;
  totalTokens?: InputMaybe<AiUsage_totalTokens_operator>;
  updatedAt?: InputMaybe<AiUsage_updatedAt_operator>;
  user?: InputMaybe<AiUsage_user_operator>;
};

export type AiUsage_where_or = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_where_or>>>;
  apiKeyType?: InputMaybe<AiUsage_apiKeyType_operator>;
  candidateTokens?: InputMaybe<AiUsage_candidateTokens_operator>;
  createdAt?: InputMaybe<AiUsage_createdAt_operator>;
  error?: InputMaybe<AiUsage_error_operator>;
  id?: InputMaybe<AiUsage_id_operator>;
  latencyMs?: InputMaybe<AiUsage_latencyMs_operator>;
  model?: InputMaybe<AiUsage_model_operator>;
  promptTokens?: InputMaybe<AiUsage_promptTokens_operator>;
  promptType?: InputMaybe<AiUsage_promptType_operator>;
  status?: InputMaybe<AiUsage_status_operator>;
  totalTokens?: InputMaybe<AiUsage_totalTokens_operator>;
  updatedAt?: InputMaybe<AiUsage_updatedAt_operator>;
  user?: InputMaybe<AiUsage_user_operator>;
};

export type AiUsages = {
  __typename?: 'AiUsages';
  docs: Array<AiUsage>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AiUsagesCreateAccess = {
  __typename?: 'AiUsagesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesCreateDocAccess = {
  __typename?: 'AiUsagesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesDeleteAccess = {
  __typename?: 'AiUsagesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesDeleteDocAccess = {
  __typename?: 'AiUsagesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesDocAccessFields = {
  __typename?: 'AiUsagesDocAccessFields';
  apiKeyType?: Maybe<AiUsagesDocAccessFields_apiKeyType>;
  candidateTokens?: Maybe<AiUsagesDocAccessFields_candidateTokens>;
  createdAt?: Maybe<AiUsagesDocAccessFields_createdAt>;
  error?: Maybe<AiUsagesDocAccessFields_error>;
  latencyMs?: Maybe<AiUsagesDocAccessFields_latencyMs>;
  model?: Maybe<AiUsagesDocAccessFields_model>;
  promptTokens?: Maybe<AiUsagesDocAccessFields_promptTokens>;
  promptType?: Maybe<AiUsagesDocAccessFields_promptType>;
  status?: Maybe<AiUsagesDocAccessFields_status>;
  totalTokens?: Maybe<AiUsagesDocAccessFields_totalTokens>;
  updatedAt?: Maybe<AiUsagesDocAccessFields_updatedAt>;
  user?: Maybe<AiUsagesDocAccessFields_user>;
};

export type AiUsagesDocAccessFields_apiKeyType = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType';
  create?: Maybe<AiUsagesDocAccessFields_apiKeyType_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_apiKeyType_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_apiKeyType_Read>;
  update?: Maybe<AiUsagesDocAccessFields_apiKeyType_Update>;
};

export type AiUsagesDocAccessFields_apiKeyType_Create = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_apiKeyType_Delete = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_apiKeyType_Read = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_apiKeyType_Update = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_candidateTokens = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens';
  create?: Maybe<AiUsagesDocAccessFields_candidateTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_candidateTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_candidateTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_candidateTokens_Update>;
};

export type AiUsagesDocAccessFields_candidateTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_candidateTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_candidateTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_candidateTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_createdAt = {
  __typename?: 'AiUsagesDocAccessFields_createdAt';
  create?: Maybe<AiUsagesDocAccessFields_createdAt_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_createdAt_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_createdAt_Read>;
  update?: Maybe<AiUsagesDocAccessFields_createdAt_Update>;
};

export type AiUsagesDocAccessFields_createdAt_Create = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_createdAt_Delete = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_createdAt_Read = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_createdAt_Update = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_error = {
  __typename?: 'AiUsagesDocAccessFields_error';
  create?: Maybe<AiUsagesDocAccessFields_error_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_error_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_error_Read>;
  update?: Maybe<AiUsagesDocAccessFields_error_Update>;
};

export type AiUsagesDocAccessFields_error_Create = {
  __typename?: 'AiUsagesDocAccessFields_error_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_error_Delete = {
  __typename?: 'AiUsagesDocAccessFields_error_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_error_Read = {
  __typename?: 'AiUsagesDocAccessFields_error_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_error_Update = {
  __typename?: 'AiUsagesDocAccessFields_error_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_latencyMs = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs';
  create?: Maybe<AiUsagesDocAccessFields_latencyMs_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_latencyMs_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_latencyMs_Read>;
  update?: Maybe<AiUsagesDocAccessFields_latencyMs_Update>;
};

export type AiUsagesDocAccessFields_latencyMs_Create = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_latencyMs_Delete = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_latencyMs_Read = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_latencyMs_Update = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_model = {
  __typename?: 'AiUsagesDocAccessFields_model';
  create?: Maybe<AiUsagesDocAccessFields_model_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_model_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_model_Read>;
  update?: Maybe<AiUsagesDocAccessFields_model_Update>;
};

export type AiUsagesDocAccessFields_model_Create = {
  __typename?: 'AiUsagesDocAccessFields_model_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_model_Delete = {
  __typename?: 'AiUsagesDocAccessFields_model_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_model_Read = {
  __typename?: 'AiUsagesDocAccessFields_model_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_model_Update = {
  __typename?: 'AiUsagesDocAccessFields_model_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptTokens = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens';
  create?: Maybe<AiUsagesDocAccessFields_promptTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_promptTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_promptTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_promptTokens_Update>;
};

export type AiUsagesDocAccessFields_promptTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptType = {
  __typename?: 'AiUsagesDocAccessFields_promptType';
  create?: Maybe<AiUsagesDocAccessFields_promptType_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_promptType_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_promptType_Read>;
  update?: Maybe<AiUsagesDocAccessFields_promptType_Update>;
};

export type AiUsagesDocAccessFields_promptType_Create = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptType_Delete = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptType_Read = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_promptType_Update = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_status = {
  __typename?: 'AiUsagesDocAccessFields_status';
  create?: Maybe<AiUsagesDocAccessFields_status_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_status_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_status_Read>;
  update?: Maybe<AiUsagesDocAccessFields_status_Update>;
};

export type AiUsagesDocAccessFields_status_Create = {
  __typename?: 'AiUsagesDocAccessFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_status_Delete = {
  __typename?: 'AiUsagesDocAccessFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_status_Read = {
  __typename?: 'AiUsagesDocAccessFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_status_Update = {
  __typename?: 'AiUsagesDocAccessFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_totalTokens = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens';
  create?: Maybe<AiUsagesDocAccessFields_totalTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_totalTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_totalTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_totalTokens_Update>;
};

export type AiUsagesDocAccessFields_totalTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_totalTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_totalTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_totalTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_updatedAt = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt';
  create?: Maybe<AiUsagesDocAccessFields_updatedAt_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_updatedAt_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_updatedAt_Read>;
  update?: Maybe<AiUsagesDocAccessFields_updatedAt_Update>;
};

export type AiUsagesDocAccessFields_updatedAt_Create = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_updatedAt_Delete = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_updatedAt_Read = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_updatedAt_Update = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_user = {
  __typename?: 'AiUsagesDocAccessFields_user';
  create?: Maybe<AiUsagesDocAccessFields_user_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_user_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_user_Read>;
  update?: Maybe<AiUsagesDocAccessFields_user_Update>;
};

export type AiUsagesDocAccessFields_user_Create = {
  __typename?: 'AiUsagesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_user_Delete = {
  __typename?: 'AiUsagesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_user_Read = {
  __typename?: 'AiUsagesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_user_Update = {
  __typename?: 'AiUsagesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields = {
  __typename?: 'AiUsagesFields';
  apiKeyType?: Maybe<AiUsagesFields_apiKeyType>;
  candidateTokens?: Maybe<AiUsagesFields_candidateTokens>;
  createdAt?: Maybe<AiUsagesFields_createdAt>;
  error?: Maybe<AiUsagesFields_error>;
  latencyMs?: Maybe<AiUsagesFields_latencyMs>;
  model?: Maybe<AiUsagesFields_model>;
  promptTokens?: Maybe<AiUsagesFields_promptTokens>;
  promptType?: Maybe<AiUsagesFields_promptType>;
  status?: Maybe<AiUsagesFields_status>;
  totalTokens?: Maybe<AiUsagesFields_totalTokens>;
  updatedAt?: Maybe<AiUsagesFields_updatedAt>;
  user?: Maybe<AiUsagesFields_user>;
};

export type AiUsagesFields_apiKeyType = {
  __typename?: 'AiUsagesFields_apiKeyType';
  create?: Maybe<AiUsagesFields_apiKeyType_Create>;
  delete?: Maybe<AiUsagesFields_apiKeyType_Delete>;
  read?: Maybe<AiUsagesFields_apiKeyType_Read>;
  update?: Maybe<AiUsagesFields_apiKeyType_Update>;
};

export type AiUsagesFields_apiKeyType_Create = {
  __typename?: 'AiUsagesFields_apiKeyType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_apiKeyType_Delete = {
  __typename?: 'AiUsagesFields_apiKeyType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_apiKeyType_Read = {
  __typename?: 'AiUsagesFields_apiKeyType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_apiKeyType_Update = {
  __typename?: 'AiUsagesFields_apiKeyType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_candidateTokens = {
  __typename?: 'AiUsagesFields_candidateTokens';
  create?: Maybe<AiUsagesFields_candidateTokens_Create>;
  delete?: Maybe<AiUsagesFields_candidateTokens_Delete>;
  read?: Maybe<AiUsagesFields_candidateTokens_Read>;
  update?: Maybe<AiUsagesFields_candidateTokens_Update>;
};

export type AiUsagesFields_candidateTokens_Create = {
  __typename?: 'AiUsagesFields_candidateTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_candidateTokens_Delete = {
  __typename?: 'AiUsagesFields_candidateTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_candidateTokens_Read = {
  __typename?: 'AiUsagesFields_candidateTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_candidateTokens_Update = {
  __typename?: 'AiUsagesFields_candidateTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_createdAt = {
  __typename?: 'AiUsagesFields_createdAt';
  create?: Maybe<AiUsagesFields_createdAt_Create>;
  delete?: Maybe<AiUsagesFields_createdAt_Delete>;
  read?: Maybe<AiUsagesFields_createdAt_Read>;
  update?: Maybe<AiUsagesFields_createdAt_Update>;
};

export type AiUsagesFields_createdAt_Create = {
  __typename?: 'AiUsagesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_createdAt_Delete = {
  __typename?: 'AiUsagesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_createdAt_Read = {
  __typename?: 'AiUsagesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_createdAt_Update = {
  __typename?: 'AiUsagesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_error = {
  __typename?: 'AiUsagesFields_error';
  create?: Maybe<AiUsagesFields_error_Create>;
  delete?: Maybe<AiUsagesFields_error_Delete>;
  read?: Maybe<AiUsagesFields_error_Read>;
  update?: Maybe<AiUsagesFields_error_Update>;
};

export type AiUsagesFields_error_Create = {
  __typename?: 'AiUsagesFields_error_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_error_Delete = {
  __typename?: 'AiUsagesFields_error_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_error_Read = {
  __typename?: 'AiUsagesFields_error_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_error_Update = {
  __typename?: 'AiUsagesFields_error_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_latencyMs = {
  __typename?: 'AiUsagesFields_latencyMs';
  create?: Maybe<AiUsagesFields_latencyMs_Create>;
  delete?: Maybe<AiUsagesFields_latencyMs_Delete>;
  read?: Maybe<AiUsagesFields_latencyMs_Read>;
  update?: Maybe<AiUsagesFields_latencyMs_Update>;
};

export type AiUsagesFields_latencyMs_Create = {
  __typename?: 'AiUsagesFields_latencyMs_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_latencyMs_Delete = {
  __typename?: 'AiUsagesFields_latencyMs_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_latencyMs_Read = {
  __typename?: 'AiUsagesFields_latencyMs_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_latencyMs_Update = {
  __typename?: 'AiUsagesFields_latencyMs_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_model = {
  __typename?: 'AiUsagesFields_model';
  create?: Maybe<AiUsagesFields_model_Create>;
  delete?: Maybe<AiUsagesFields_model_Delete>;
  read?: Maybe<AiUsagesFields_model_Read>;
  update?: Maybe<AiUsagesFields_model_Update>;
};

export type AiUsagesFields_model_Create = {
  __typename?: 'AiUsagesFields_model_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_model_Delete = {
  __typename?: 'AiUsagesFields_model_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_model_Read = {
  __typename?: 'AiUsagesFields_model_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_model_Update = {
  __typename?: 'AiUsagesFields_model_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptTokens = {
  __typename?: 'AiUsagesFields_promptTokens';
  create?: Maybe<AiUsagesFields_promptTokens_Create>;
  delete?: Maybe<AiUsagesFields_promptTokens_Delete>;
  read?: Maybe<AiUsagesFields_promptTokens_Read>;
  update?: Maybe<AiUsagesFields_promptTokens_Update>;
};

export type AiUsagesFields_promptTokens_Create = {
  __typename?: 'AiUsagesFields_promptTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptTokens_Delete = {
  __typename?: 'AiUsagesFields_promptTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptTokens_Read = {
  __typename?: 'AiUsagesFields_promptTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptTokens_Update = {
  __typename?: 'AiUsagesFields_promptTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptType = {
  __typename?: 'AiUsagesFields_promptType';
  create?: Maybe<AiUsagesFields_promptType_Create>;
  delete?: Maybe<AiUsagesFields_promptType_Delete>;
  read?: Maybe<AiUsagesFields_promptType_Read>;
  update?: Maybe<AiUsagesFields_promptType_Update>;
};

export type AiUsagesFields_promptType_Create = {
  __typename?: 'AiUsagesFields_promptType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptType_Delete = {
  __typename?: 'AiUsagesFields_promptType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptType_Read = {
  __typename?: 'AiUsagesFields_promptType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_promptType_Update = {
  __typename?: 'AiUsagesFields_promptType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_status = {
  __typename?: 'AiUsagesFields_status';
  create?: Maybe<AiUsagesFields_status_Create>;
  delete?: Maybe<AiUsagesFields_status_Delete>;
  read?: Maybe<AiUsagesFields_status_Read>;
  update?: Maybe<AiUsagesFields_status_Update>;
};

export type AiUsagesFields_status_Create = {
  __typename?: 'AiUsagesFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_status_Delete = {
  __typename?: 'AiUsagesFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_status_Read = {
  __typename?: 'AiUsagesFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_status_Update = {
  __typename?: 'AiUsagesFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_totalTokens = {
  __typename?: 'AiUsagesFields_totalTokens';
  create?: Maybe<AiUsagesFields_totalTokens_Create>;
  delete?: Maybe<AiUsagesFields_totalTokens_Delete>;
  read?: Maybe<AiUsagesFields_totalTokens_Read>;
  update?: Maybe<AiUsagesFields_totalTokens_Update>;
};

export type AiUsagesFields_totalTokens_Create = {
  __typename?: 'AiUsagesFields_totalTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_totalTokens_Delete = {
  __typename?: 'AiUsagesFields_totalTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_totalTokens_Read = {
  __typename?: 'AiUsagesFields_totalTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_totalTokens_Update = {
  __typename?: 'AiUsagesFields_totalTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_updatedAt = {
  __typename?: 'AiUsagesFields_updatedAt';
  create?: Maybe<AiUsagesFields_updatedAt_Create>;
  delete?: Maybe<AiUsagesFields_updatedAt_Delete>;
  read?: Maybe<AiUsagesFields_updatedAt_Read>;
  update?: Maybe<AiUsagesFields_updatedAt_Update>;
};

export type AiUsagesFields_updatedAt_Create = {
  __typename?: 'AiUsagesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_updatedAt_Delete = {
  __typename?: 'AiUsagesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_updatedAt_Read = {
  __typename?: 'AiUsagesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_updatedAt_Update = {
  __typename?: 'AiUsagesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_user = {
  __typename?: 'AiUsagesFields_user';
  create?: Maybe<AiUsagesFields_user_Create>;
  delete?: Maybe<AiUsagesFields_user_Delete>;
  read?: Maybe<AiUsagesFields_user_Read>;
  update?: Maybe<AiUsagesFields_user_Update>;
};

export type AiUsagesFields_user_Create = {
  __typename?: 'AiUsagesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_user_Delete = {
  __typename?: 'AiUsagesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_user_Read = {
  __typename?: 'AiUsagesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_user_Update = {
  __typename?: 'AiUsagesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesReadAccess = {
  __typename?: 'AiUsagesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesReadDocAccess = {
  __typename?: 'AiUsagesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesUpdateAccess = {
  __typename?: 'AiUsagesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AiUsagesUpdateDocAccess = {
  __typename?: 'AiUsagesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AppSetting = {
  __typename?: 'AppSetting';
  ai?: Maybe<AppSetting_Ai>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AppSetting_Ai = {
  __typename?: 'AppSetting_Ai';
  allowUserApiKey?: Maybe<Scalars['Boolean']['output']>;
  defaultModel?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  geminiApiKey?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<AppSetting_Ai_Models>>;
  perUserDailyLimit?: Maybe<Scalars['Float']['output']>;
  perUserMonthlyLimit?: Maybe<Scalars['Float']['output']>;
};

export type AppSetting_Ai_Models = {
  __typename?: 'AppSetting_Ai_Models';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AppSettingsDocAccessFields = {
  __typename?: 'AppSettingsDocAccessFields';
  ai?: Maybe<AppSettingsDocAccessFields_ai>;
  createdAt?: Maybe<AppSettingsDocAccessFields_createdAt>;
  updatedAt?: Maybe<AppSettingsDocAccessFields_updatedAt>;
};

export type AppSettingsDocAccessFields_ai = {
  __typename?: 'AppSettingsDocAccessFields_ai';
  create?: Maybe<AppSettingsDocAccessFields_ai_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_Delete>;
  fields?: Maybe<AppSettingsDocAccessFields_ai_Fields>;
  read?: Maybe<AppSettingsDocAccessFields_ai_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_Update>;
};

export type AppSettingsDocAccessFields_ai_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_Fields = {
  __typename?: 'AppSettingsDocAccessFields_ai_Fields';
  allowUserApiKey?: Maybe<AppSettingsDocAccessFields_ai_allowUserApiKey>;
  defaultModel?: Maybe<AppSettingsDocAccessFields_ai_defaultModel>;
  enabled?: Maybe<AppSettingsDocAccessFields_ai_enabled>;
  geminiApiKey?: Maybe<AppSettingsDocAccessFields_ai_geminiApiKey>;
  models?: Maybe<AppSettingsDocAccessFields_ai_models>;
  perUserDailyLimit?: Maybe<AppSettingsDocAccessFields_ai_perUserDailyLimit>;
  perUserMonthlyLimit?: Maybe<AppSettingsDocAccessFields_ai_perUserMonthlyLimit>;
};

export type AppSettingsDocAccessFields_ai_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_allowUserApiKey = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey';
  create?: Maybe<AppSettingsDocAccessFields_ai_allowUserApiKey_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_allowUserApiKey_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_allowUserApiKey_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_allowUserApiKey_Update>;
};

export type AppSettingsDocAccessFields_ai_allowUserApiKey_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_allowUserApiKey_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_allowUserApiKey_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_allowUserApiKey_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_defaultModel = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel';
  create?: Maybe<AppSettingsDocAccessFields_ai_defaultModel_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_defaultModel_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_defaultModel_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_defaultModel_Update>;
};

export type AppSettingsDocAccessFields_ai_defaultModel_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_defaultModel_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_defaultModel_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_defaultModel_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_enabled = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled';
  create?: Maybe<AppSettingsDocAccessFields_ai_enabled_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_enabled_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_enabled_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_enabled_Update>;
};

export type AppSettingsDocAccessFields_ai_enabled_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_enabled_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_enabled_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_enabled_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_geminiApiKey = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey';
  create?: Maybe<AppSettingsDocAccessFields_ai_geminiApiKey_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_geminiApiKey_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_geminiApiKey_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_geminiApiKey_Update>;
};

export type AppSettingsDocAccessFields_ai_geminiApiKey_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_geminiApiKey_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_geminiApiKey_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_geminiApiKey_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models = {
  __typename?: 'AppSettingsDocAccessFields_ai_models';
  create?: Maybe<AppSettingsDocAccessFields_ai_models_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_models_Delete>;
  fields?: Maybe<AppSettingsDocAccessFields_ai_models_Fields>;
  read?: Maybe<AppSettingsDocAccessFields_ai_models_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_models_Update>;
};

export type AppSettingsDocAccessFields_ai_models_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_Fields = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Fields';
  id?: Maybe<AppSettingsDocAccessFields_ai_models_id>;
  name?: Maybe<AppSettingsDocAccessFields_ai_models_name>;
};

export type AppSettingsDocAccessFields_ai_models_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_id = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id';
  create?: Maybe<AppSettingsDocAccessFields_ai_models_id_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_models_id_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_models_id_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_models_id_Update>;
};

export type AppSettingsDocAccessFields_ai_models_id_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_id_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_id_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_id_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_name = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name';
  create?: Maybe<AppSettingsDocAccessFields_ai_models_name_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_models_name_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_models_name_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_models_name_Update>;
};

export type AppSettingsDocAccessFields_ai_models_name_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_name_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_name_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_models_name_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserDailyLimit = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit';
  create?: Maybe<AppSettingsDocAccessFields_ai_perUserDailyLimit_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_perUserDailyLimit_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_perUserDailyLimit_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_perUserDailyLimit_Update>;
};

export type AppSettingsDocAccessFields_ai_perUserDailyLimit_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserDailyLimit_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserDailyLimit_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserDailyLimit_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserMonthlyLimit = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit';
  create?: Maybe<AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Read>;
  update?: Maybe<AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Update>;
};

export type AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_createdAt = {
  __typename?: 'AppSettingsDocAccessFields_createdAt';
  create?: Maybe<AppSettingsDocAccessFields_createdAt_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_createdAt_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_createdAt_Read>;
  update?: Maybe<AppSettingsDocAccessFields_createdAt_Update>;
};

export type AppSettingsDocAccessFields_createdAt_Create = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_createdAt_Delete = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_createdAt_Read = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_createdAt_Update = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_updatedAt = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt';
  create?: Maybe<AppSettingsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_updatedAt_Read>;
  update?: Maybe<AppSettingsDocAccessFields_updatedAt_Update>;
};

export type AppSettingsDocAccessFields_updatedAt_Create = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_updatedAt_Delete = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_updatedAt_Read = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_updatedAt_Update = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields = {
  __typename?: 'AppSettingsFields';
  ai?: Maybe<AppSettingsFields_ai>;
  createdAt?: Maybe<AppSettingsFields_createdAt>;
  updatedAt?: Maybe<AppSettingsFields_updatedAt>;
};

export type AppSettingsFields_ai = {
  __typename?: 'AppSettingsFields_ai';
  create?: Maybe<AppSettingsFields_ai_Create>;
  delete?: Maybe<AppSettingsFields_ai_Delete>;
  fields?: Maybe<AppSettingsFields_ai_Fields>;
  read?: Maybe<AppSettingsFields_ai_Read>;
  update?: Maybe<AppSettingsFields_ai_Update>;
};

export type AppSettingsFields_ai_Create = {
  __typename?: 'AppSettingsFields_ai_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_Delete = {
  __typename?: 'AppSettingsFields_ai_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_Fields = {
  __typename?: 'AppSettingsFields_ai_Fields';
  allowUserApiKey?: Maybe<AppSettingsFields_ai_allowUserApiKey>;
  defaultModel?: Maybe<AppSettingsFields_ai_defaultModel>;
  enabled?: Maybe<AppSettingsFields_ai_enabled>;
  geminiApiKey?: Maybe<AppSettingsFields_ai_geminiApiKey>;
  models?: Maybe<AppSettingsFields_ai_models>;
  perUserDailyLimit?: Maybe<AppSettingsFields_ai_perUserDailyLimit>;
  perUserMonthlyLimit?: Maybe<AppSettingsFields_ai_perUserMonthlyLimit>;
};

export type AppSettingsFields_ai_Read = {
  __typename?: 'AppSettingsFields_ai_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_Update = {
  __typename?: 'AppSettingsFields_ai_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_allowUserApiKey = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey';
  create?: Maybe<AppSettingsFields_ai_allowUserApiKey_Create>;
  delete?: Maybe<AppSettingsFields_ai_allowUserApiKey_Delete>;
  read?: Maybe<AppSettingsFields_ai_allowUserApiKey_Read>;
  update?: Maybe<AppSettingsFields_ai_allowUserApiKey_Update>;
};

export type AppSettingsFields_ai_allowUserApiKey_Create = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_allowUserApiKey_Delete = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_allowUserApiKey_Read = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_allowUserApiKey_Update = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_defaultModel = {
  __typename?: 'AppSettingsFields_ai_defaultModel';
  create?: Maybe<AppSettingsFields_ai_defaultModel_Create>;
  delete?: Maybe<AppSettingsFields_ai_defaultModel_Delete>;
  read?: Maybe<AppSettingsFields_ai_defaultModel_Read>;
  update?: Maybe<AppSettingsFields_ai_defaultModel_Update>;
};

export type AppSettingsFields_ai_defaultModel_Create = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_defaultModel_Delete = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_defaultModel_Read = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_defaultModel_Update = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_enabled = {
  __typename?: 'AppSettingsFields_ai_enabled';
  create?: Maybe<AppSettingsFields_ai_enabled_Create>;
  delete?: Maybe<AppSettingsFields_ai_enabled_Delete>;
  read?: Maybe<AppSettingsFields_ai_enabled_Read>;
  update?: Maybe<AppSettingsFields_ai_enabled_Update>;
};

export type AppSettingsFields_ai_enabled_Create = {
  __typename?: 'AppSettingsFields_ai_enabled_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_enabled_Delete = {
  __typename?: 'AppSettingsFields_ai_enabled_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_enabled_Read = {
  __typename?: 'AppSettingsFields_ai_enabled_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_enabled_Update = {
  __typename?: 'AppSettingsFields_ai_enabled_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_geminiApiKey = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey';
  create?: Maybe<AppSettingsFields_ai_geminiApiKey_Create>;
  delete?: Maybe<AppSettingsFields_ai_geminiApiKey_Delete>;
  read?: Maybe<AppSettingsFields_ai_geminiApiKey_Read>;
  update?: Maybe<AppSettingsFields_ai_geminiApiKey_Update>;
};

export type AppSettingsFields_ai_geminiApiKey_Create = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_geminiApiKey_Delete = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_geminiApiKey_Read = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_geminiApiKey_Update = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models = {
  __typename?: 'AppSettingsFields_ai_models';
  create?: Maybe<AppSettingsFields_ai_models_Create>;
  delete?: Maybe<AppSettingsFields_ai_models_Delete>;
  fields?: Maybe<AppSettingsFields_ai_models_Fields>;
  read?: Maybe<AppSettingsFields_ai_models_Read>;
  update?: Maybe<AppSettingsFields_ai_models_Update>;
};

export type AppSettingsFields_ai_models_Create = {
  __typename?: 'AppSettingsFields_ai_models_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_Delete = {
  __typename?: 'AppSettingsFields_ai_models_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_Fields = {
  __typename?: 'AppSettingsFields_ai_models_Fields';
  id?: Maybe<AppSettingsFields_ai_models_id>;
  name?: Maybe<AppSettingsFields_ai_models_name>;
};

export type AppSettingsFields_ai_models_Read = {
  __typename?: 'AppSettingsFields_ai_models_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_Update = {
  __typename?: 'AppSettingsFields_ai_models_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_id = {
  __typename?: 'AppSettingsFields_ai_models_id';
  create?: Maybe<AppSettingsFields_ai_models_id_Create>;
  delete?: Maybe<AppSettingsFields_ai_models_id_Delete>;
  read?: Maybe<AppSettingsFields_ai_models_id_Read>;
  update?: Maybe<AppSettingsFields_ai_models_id_Update>;
};

export type AppSettingsFields_ai_models_id_Create = {
  __typename?: 'AppSettingsFields_ai_models_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_id_Delete = {
  __typename?: 'AppSettingsFields_ai_models_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_id_Read = {
  __typename?: 'AppSettingsFields_ai_models_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_id_Update = {
  __typename?: 'AppSettingsFields_ai_models_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_name = {
  __typename?: 'AppSettingsFields_ai_models_name';
  create?: Maybe<AppSettingsFields_ai_models_name_Create>;
  delete?: Maybe<AppSettingsFields_ai_models_name_Delete>;
  read?: Maybe<AppSettingsFields_ai_models_name_Read>;
  update?: Maybe<AppSettingsFields_ai_models_name_Update>;
};

export type AppSettingsFields_ai_models_name_Create = {
  __typename?: 'AppSettingsFields_ai_models_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_name_Delete = {
  __typename?: 'AppSettingsFields_ai_models_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_name_Read = {
  __typename?: 'AppSettingsFields_ai_models_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_models_name_Update = {
  __typename?: 'AppSettingsFields_ai_models_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserDailyLimit = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit';
  create?: Maybe<AppSettingsFields_ai_perUserDailyLimit_Create>;
  delete?: Maybe<AppSettingsFields_ai_perUserDailyLimit_Delete>;
  read?: Maybe<AppSettingsFields_ai_perUserDailyLimit_Read>;
  update?: Maybe<AppSettingsFields_ai_perUserDailyLimit_Update>;
};

export type AppSettingsFields_ai_perUserDailyLimit_Create = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserDailyLimit_Delete = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserDailyLimit_Read = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserDailyLimit_Update = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserMonthlyLimit = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit';
  create?: Maybe<AppSettingsFields_ai_perUserMonthlyLimit_Create>;
  delete?: Maybe<AppSettingsFields_ai_perUserMonthlyLimit_Delete>;
  read?: Maybe<AppSettingsFields_ai_perUserMonthlyLimit_Read>;
  update?: Maybe<AppSettingsFields_ai_perUserMonthlyLimit_Update>;
};

export type AppSettingsFields_ai_perUserMonthlyLimit_Create = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserMonthlyLimit_Delete = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserMonthlyLimit_Read = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_ai_perUserMonthlyLimit_Update = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_createdAt = {
  __typename?: 'AppSettingsFields_createdAt';
  create?: Maybe<AppSettingsFields_createdAt_Create>;
  delete?: Maybe<AppSettingsFields_createdAt_Delete>;
  read?: Maybe<AppSettingsFields_createdAt_Read>;
  update?: Maybe<AppSettingsFields_createdAt_Update>;
};

export type AppSettingsFields_createdAt_Create = {
  __typename?: 'AppSettingsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_createdAt_Delete = {
  __typename?: 'AppSettingsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_createdAt_Read = {
  __typename?: 'AppSettingsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_createdAt_Update = {
  __typename?: 'AppSettingsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_updatedAt = {
  __typename?: 'AppSettingsFields_updatedAt';
  create?: Maybe<AppSettingsFields_updatedAt_Create>;
  delete?: Maybe<AppSettingsFields_updatedAt_Delete>;
  read?: Maybe<AppSettingsFields_updatedAt_Read>;
  update?: Maybe<AppSettingsFields_updatedAt_Update>;
};

export type AppSettingsFields_updatedAt_Create = {
  __typename?: 'AppSettingsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_updatedAt_Delete = {
  __typename?: 'AppSettingsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_updatedAt_Read = {
  __typename?: 'AppSettingsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_updatedAt_Update = {
  __typename?: 'AppSettingsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsReadAccess = {
  __typename?: 'AppSettingsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AppSettingsReadDocAccess = {
  __typename?: 'AppSettingsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AppSettingsUpdateAccess = {
  __typename?: 'AppSettingsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AppSettingsUpdateDocAccess = {
  __typename?: 'AppSettingsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CalendarDay = {
  __typename?: 'CalendarDay';
  balance: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  expenseTransactionCount: Scalars['Int']['output'];
  expenses: Scalars['Float']['output'];
  income: Scalars['Float']['output'];
  incomeTransactionCount: Scalars['Int']['output'];
  transactionCount: Scalars['Int']['output'];
  transferTransactionCount: Scalars['Int']['output'];
  transfers: Scalars['Float']['output'];
};

export type Categories = {
  __typename?: 'Categories';
  docs: Array<Category>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type CategoriesCreateAccess = {
  __typename?: 'CategoriesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesCreateDocAccess = {
  __typename?: 'CategoriesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesDeleteAccess = {
  __typename?: 'CategoriesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesDeleteDocAccess = {
  __typename?: 'CategoriesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesDocAccessFields = {
  __typename?: 'CategoriesDocAccessFields';
  bgColor?: Maybe<CategoriesDocAccessFields_bgColor>;
  color?: Maybe<CategoriesDocAccessFields_color>;
  createdAt?: Maybe<CategoriesDocAccessFields_createdAt>;
  description?: Maybe<CategoriesDocAccessFields_description>;
  icon?: Maybe<CategoriesDocAccessFields_icon>;
  isActive?: Maybe<CategoriesDocAccessFields_isActive>;
  name?: Maybe<CategoriesDocAccessFields_name>;
  parent?: Maybe<CategoriesDocAccessFields_parent>;
  type?: Maybe<CategoriesDocAccessFields_type>;
  updatedAt?: Maybe<CategoriesDocAccessFields_updatedAt>;
  user?: Maybe<CategoriesDocAccessFields_user>;
};

export type CategoriesDocAccessFields_bgColor = {
  __typename?: 'CategoriesDocAccessFields_bgColor';
  create?: Maybe<CategoriesDocAccessFields_bgColor_Create>;
  delete?: Maybe<CategoriesDocAccessFields_bgColor_Delete>;
  read?: Maybe<CategoriesDocAccessFields_bgColor_Read>;
  update?: Maybe<CategoriesDocAccessFields_bgColor_Update>;
};

export type CategoriesDocAccessFields_bgColor_Create = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_bgColor_Delete = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_bgColor_Read = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_bgColor_Update = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_color = {
  __typename?: 'CategoriesDocAccessFields_color';
  create?: Maybe<CategoriesDocAccessFields_color_Create>;
  delete?: Maybe<CategoriesDocAccessFields_color_Delete>;
  read?: Maybe<CategoriesDocAccessFields_color_Read>;
  update?: Maybe<CategoriesDocAccessFields_color_Update>;
};

export type CategoriesDocAccessFields_color_Create = {
  __typename?: 'CategoriesDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_color_Delete = {
  __typename?: 'CategoriesDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_color_Read = {
  __typename?: 'CategoriesDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_color_Update = {
  __typename?: 'CategoriesDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_createdAt = {
  __typename?: 'CategoriesDocAccessFields_createdAt';
  create?: Maybe<CategoriesDocAccessFields_createdAt_Create>;
  delete?: Maybe<CategoriesDocAccessFields_createdAt_Delete>;
  read?: Maybe<CategoriesDocAccessFields_createdAt_Read>;
  update?: Maybe<CategoriesDocAccessFields_createdAt_Update>;
};

export type CategoriesDocAccessFields_createdAt_Create = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_createdAt_Delete = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_createdAt_Read = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_createdAt_Update = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_description = {
  __typename?: 'CategoriesDocAccessFields_description';
  create?: Maybe<CategoriesDocAccessFields_description_Create>;
  delete?: Maybe<CategoriesDocAccessFields_description_Delete>;
  read?: Maybe<CategoriesDocAccessFields_description_Read>;
  update?: Maybe<CategoriesDocAccessFields_description_Update>;
};

export type CategoriesDocAccessFields_description_Create = {
  __typename?: 'CategoriesDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_description_Delete = {
  __typename?: 'CategoriesDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_description_Read = {
  __typename?: 'CategoriesDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_description_Update = {
  __typename?: 'CategoriesDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_icon = {
  __typename?: 'CategoriesDocAccessFields_icon';
  create?: Maybe<CategoriesDocAccessFields_icon_Create>;
  delete?: Maybe<CategoriesDocAccessFields_icon_Delete>;
  read?: Maybe<CategoriesDocAccessFields_icon_Read>;
  update?: Maybe<CategoriesDocAccessFields_icon_Update>;
};

export type CategoriesDocAccessFields_icon_Create = {
  __typename?: 'CategoriesDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_icon_Delete = {
  __typename?: 'CategoriesDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_icon_Read = {
  __typename?: 'CategoriesDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_icon_Update = {
  __typename?: 'CategoriesDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_isActive = {
  __typename?: 'CategoriesDocAccessFields_isActive';
  create?: Maybe<CategoriesDocAccessFields_isActive_Create>;
  delete?: Maybe<CategoriesDocAccessFields_isActive_Delete>;
  read?: Maybe<CategoriesDocAccessFields_isActive_Read>;
  update?: Maybe<CategoriesDocAccessFields_isActive_Update>;
};

export type CategoriesDocAccessFields_isActive_Create = {
  __typename?: 'CategoriesDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_isActive_Delete = {
  __typename?: 'CategoriesDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_isActive_Read = {
  __typename?: 'CategoriesDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_isActive_Update = {
  __typename?: 'CategoriesDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_name = {
  __typename?: 'CategoriesDocAccessFields_name';
  create?: Maybe<CategoriesDocAccessFields_name_Create>;
  delete?: Maybe<CategoriesDocAccessFields_name_Delete>;
  read?: Maybe<CategoriesDocAccessFields_name_Read>;
  update?: Maybe<CategoriesDocAccessFields_name_Update>;
};

export type CategoriesDocAccessFields_name_Create = {
  __typename?: 'CategoriesDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_name_Delete = {
  __typename?: 'CategoriesDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_name_Read = {
  __typename?: 'CategoriesDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_name_Update = {
  __typename?: 'CategoriesDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_parent = {
  __typename?: 'CategoriesDocAccessFields_parent';
  create?: Maybe<CategoriesDocAccessFields_parent_Create>;
  delete?: Maybe<CategoriesDocAccessFields_parent_Delete>;
  read?: Maybe<CategoriesDocAccessFields_parent_Read>;
  update?: Maybe<CategoriesDocAccessFields_parent_Update>;
};

export type CategoriesDocAccessFields_parent_Create = {
  __typename?: 'CategoriesDocAccessFields_parent_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_parent_Delete = {
  __typename?: 'CategoriesDocAccessFields_parent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_parent_Read = {
  __typename?: 'CategoriesDocAccessFields_parent_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_parent_Update = {
  __typename?: 'CategoriesDocAccessFields_parent_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_type = {
  __typename?: 'CategoriesDocAccessFields_type';
  create?: Maybe<CategoriesDocAccessFields_type_Create>;
  delete?: Maybe<CategoriesDocAccessFields_type_Delete>;
  read?: Maybe<CategoriesDocAccessFields_type_Read>;
  update?: Maybe<CategoriesDocAccessFields_type_Update>;
};

export type CategoriesDocAccessFields_type_Create = {
  __typename?: 'CategoriesDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_type_Delete = {
  __typename?: 'CategoriesDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_type_Read = {
  __typename?: 'CategoriesDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_type_Update = {
  __typename?: 'CategoriesDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_updatedAt = {
  __typename?: 'CategoriesDocAccessFields_updatedAt';
  create?: Maybe<CategoriesDocAccessFields_updatedAt_Create>;
  delete?: Maybe<CategoriesDocAccessFields_updatedAt_Delete>;
  read?: Maybe<CategoriesDocAccessFields_updatedAt_Read>;
  update?: Maybe<CategoriesDocAccessFields_updatedAt_Update>;
};

export type CategoriesDocAccessFields_updatedAt_Create = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_updatedAt_Delete = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_updatedAt_Read = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_updatedAt_Update = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_user = {
  __typename?: 'CategoriesDocAccessFields_user';
  create?: Maybe<CategoriesDocAccessFields_user_Create>;
  delete?: Maybe<CategoriesDocAccessFields_user_Delete>;
  read?: Maybe<CategoriesDocAccessFields_user_Read>;
  update?: Maybe<CategoriesDocAccessFields_user_Update>;
};

export type CategoriesDocAccessFields_user_Create = {
  __typename?: 'CategoriesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_user_Delete = {
  __typename?: 'CategoriesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_user_Read = {
  __typename?: 'CategoriesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_user_Update = {
  __typename?: 'CategoriesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields = {
  __typename?: 'CategoriesFields';
  bgColor?: Maybe<CategoriesFields_bgColor>;
  color?: Maybe<CategoriesFields_color>;
  createdAt?: Maybe<CategoriesFields_createdAt>;
  description?: Maybe<CategoriesFields_description>;
  icon?: Maybe<CategoriesFields_icon>;
  isActive?: Maybe<CategoriesFields_isActive>;
  name?: Maybe<CategoriesFields_name>;
  parent?: Maybe<CategoriesFields_parent>;
  type?: Maybe<CategoriesFields_type>;
  updatedAt?: Maybe<CategoriesFields_updatedAt>;
  user?: Maybe<CategoriesFields_user>;
};

export type CategoriesFields_bgColor = {
  __typename?: 'CategoriesFields_bgColor';
  create?: Maybe<CategoriesFields_bgColor_Create>;
  delete?: Maybe<CategoriesFields_bgColor_Delete>;
  read?: Maybe<CategoriesFields_bgColor_Read>;
  update?: Maybe<CategoriesFields_bgColor_Update>;
};

export type CategoriesFields_bgColor_Create = {
  __typename?: 'CategoriesFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_bgColor_Delete = {
  __typename?: 'CategoriesFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_bgColor_Read = {
  __typename?: 'CategoriesFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_bgColor_Update = {
  __typename?: 'CategoriesFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_color = {
  __typename?: 'CategoriesFields_color';
  create?: Maybe<CategoriesFields_color_Create>;
  delete?: Maybe<CategoriesFields_color_Delete>;
  read?: Maybe<CategoriesFields_color_Read>;
  update?: Maybe<CategoriesFields_color_Update>;
};

export type CategoriesFields_color_Create = {
  __typename?: 'CategoriesFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_color_Delete = {
  __typename?: 'CategoriesFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_color_Read = {
  __typename?: 'CategoriesFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_color_Update = {
  __typename?: 'CategoriesFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_createdAt = {
  __typename?: 'CategoriesFields_createdAt';
  create?: Maybe<CategoriesFields_createdAt_Create>;
  delete?: Maybe<CategoriesFields_createdAt_Delete>;
  read?: Maybe<CategoriesFields_createdAt_Read>;
  update?: Maybe<CategoriesFields_createdAt_Update>;
};

export type CategoriesFields_createdAt_Create = {
  __typename?: 'CategoriesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_createdAt_Delete = {
  __typename?: 'CategoriesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_createdAt_Read = {
  __typename?: 'CategoriesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_createdAt_Update = {
  __typename?: 'CategoriesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_description = {
  __typename?: 'CategoriesFields_description';
  create?: Maybe<CategoriesFields_description_Create>;
  delete?: Maybe<CategoriesFields_description_Delete>;
  read?: Maybe<CategoriesFields_description_Read>;
  update?: Maybe<CategoriesFields_description_Update>;
};

export type CategoriesFields_description_Create = {
  __typename?: 'CategoriesFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_description_Delete = {
  __typename?: 'CategoriesFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_description_Read = {
  __typename?: 'CategoriesFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_description_Update = {
  __typename?: 'CategoriesFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_icon = {
  __typename?: 'CategoriesFields_icon';
  create?: Maybe<CategoriesFields_icon_Create>;
  delete?: Maybe<CategoriesFields_icon_Delete>;
  read?: Maybe<CategoriesFields_icon_Read>;
  update?: Maybe<CategoriesFields_icon_Update>;
};

export type CategoriesFields_icon_Create = {
  __typename?: 'CategoriesFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_icon_Delete = {
  __typename?: 'CategoriesFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_icon_Read = {
  __typename?: 'CategoriesFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_icon_Update = {
  __typename?: 'CategoriesFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_isActive = {
  __typename?: 'CategoriesFields_isActive';
  create?: Maybe<CategoriesFields_isActive_Create>;
  delete?: Maybe<CategoriesFields_isActive_Delete>;
  read?: Maybe<CategoriesFields_isActive_Read>;
  update?: Maybe<CategoriesFields_isActive_Update>;
};

export type CategoriesFields_isActive_Create = {
  __typename?: 'CategoriesFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_isActive_Delete = {
  __typename?: 'CategoriesFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_isActive_Read = {
  __typename?: 'CategoriesFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_isActive_Update = {
  __typename?: 'CategoriesFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_name = {
  __typename?: 'CategoriesFields_name';
  create?: Maybe<CategoriesFields_name_Create>;
  delete?: Maybe<CategoriesFields_name_Delete>;
  read?: Maybe<CategoriesFields_name_Read>;
  update?: Maybe<CategoriesFields_name_Update>;
};

export type CategoriesFields_name_Create = {
  __typename?: 'CategoriesFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_name_Delete = {
  __typename?: 'CategoriesFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_name_Read = {
  __typename?: 'CategoriesFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_name_Update = {
  __typename?: 'CategoriesFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_parent = {
  __typename?: 'CategoriesFields_parent';
  create?: Maybe<CategoriesFields_parent_Create>;
  delete?: Maybe<CategoriesFields_parent_Delete>;
  read?: Maybe<CategoriesFields_parent_Read>;
  update?: Maybe<CategoriesFields_parent_Update>;
};

export type CategoriesFields_parent_Create = {
  __typename?: 'CategoriesFields_parent_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_parent_Delete = {
  __typename?: 'CategoriesFields_parent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_parent_Read = {
  __typename?: 'CategoriesFields_parent_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_parent_Update = {
  __typename?: 'CategoriesFields_parent_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_type = {
  __typename?: 'CategoriesFields_type';
  create?: Maybe<CategoriesFields_type_Create>;
  delete?: Maybe<CategoriesFields_type_Delete>;
  read?: Maybe<CategoriesFields_type_Read>;
  update?: Maybe<CategoriesFields_type_Update>;
};

export type CategoriesFields_type_Create = {
  __typename?: 'CategoriesFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_type_Delete = {
  __typename?: 'CategoriesFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_type_Read = {
  __typename?: 'CategoriesFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_type_Update = {
  __typename?: 'CategoriesFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_updatedAt = {
  __typename?: 'CategoriesFields_updatedAt';
  create?: Maybe<CategoriesFields_updatedAt_Create>;
  delete?: Maybe<CategoriesFields_updatedAt_Delete>;
  read?: Maybe<CategoriesFields_updatedAt_Read>;
  update?: Maybe<CategoriesFields_updatedAt_Update>;
};

export type CategoriesFields_updatedAt_Create = {
  __typename?: 'CategoriesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_updatedAt_Delete = {
  __typename?: 'CategoriesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_updatedAt_Read = {
  __typename?: 'CategoriesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_updatedAt_Update = {
  __typename?: 'CategoriesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_user = {
  __typename?: 'CategoriesFields_user';
  create?: Maybe<CategoriesFields_user_Create>;
  delete?: Maybe<CategoriesFields_user_Delete>;
  read?: Maybe<CategoriesFields_user_Read>;
  update?: Maybe<CategoriesFields_user_Update>;
};

export type CategoriesFields_user_Create = {
  __typename?: 'CategoriesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_user_Delete = {
  __typename?: 'CategoriesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_user_Read = {
  __typename?: 'CategoriesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_user_Update = {
  __typename?: 'CategoriesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesReadAccess = {
  __typename?: 'CategoriesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesReadDocAccess = {
  __typename?: 'CategoriesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesUpdateAccess = {
  __typename?: 'CategoriesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type CategoriesUpdateDocAccess = {
  __typename?: 'CategoriesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Category = {
  __typename?: 'Category';
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  type: Category_type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type CategoryActivity = {
  __typename?: 'CategoryActivity';
  amount: Scalars['Float']['output'];
  averagePerTransaction: Scalars['Float']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  highestTransaction: Scalars['Float']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isParent: Scalars['Boolean']['output'];
  isSystem: Scalars['Boolean']['output'];
  lowestTransaction: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  transactionCount: Scalars['Int']['output'];
};

export enum CategoryUpdate_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Category_bgColor_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_color_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Category_description_operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Category_icon_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_isActive_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Category_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_parent_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export enum Category_type {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Category_type_Input {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Category_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Category_type_operator = {
  all?: InputMaybe<Array<InputMaybe<Category_type_Input>>>;
  equals?: InputMaybe<Category_type_Input>;
  in?: InputMaybe<Array<InputMaybe<Category_type_Input>>>;
  not_equals?: InputMaybe<Category_type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Category_type_Input>>>;
};

export type Category_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Category_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Category_where = {
  AND?: InputMaybe<Array<InputMaybe<Category_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_where_or>>>;
  bgColor?: InputMaybe<Category_bgColor_operator>;
  color?: InputMaybe<Category_color_operator>;
  createdAt?: InputMaybe<Category_createdAt_operator>;
  description?: InputMaybe<Category_description_operator>;
  icon?: InputMaybe<Category_icon_operator>;
  id?: InputMaybe<Category_id_operator>;
  isActive?: InputMaybe<Category_isActive_operator>;
  name?: InputMaybe<Category_name_operator>;
  parent?: InputMaybe<Category_parent_operator>;
  type?: InputMaybe<Category_type_operator>;
  updatedAt?: InputMaybe<Category_updatedAt_operator>;
  user?: InputMaybe<Category_user_operator>;
};

export type Category_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Category_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_where_or>>>;
  bgColor?: InputMaybe<Category_bgColor_operator>;
  color?: InputMaybe<Category_color_operator>;
  createdAt?: InputMaybe<Category_createdAt_operator>;
  description?: InputMaybe<Category_description_operator>;
  icon?: InputMaybe<Category_icon_operator>;
  id?: InputMaybe<Category_id_operator>;
  isActive?: InputMaybe<Category_isActive_operator>;
  name?: InputMaybe<Category_name_operator>;
  parent?: InputMaybe<Category_parent_operator>;
  type?: InputMaybe<Category_type_operator>;
  updatedAt?: InputMaybe<Category_updatedAt_operator>;
  user?: InputMaybe<Category_user_operator>;
};

export type Category_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Category_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_where_or>>>;
  bgColor?: InputMaybe<Category_bgColor_operator>;
  color?: InputMaybe<Category_color_operator>;
  createdAt?: InputMaybe<Category_createdAt_operator>;
  description?: InputMaybe<Category_description_operator>;
  icon?: InputMaybe<Category_icon_operator>;
  id?: InputMaybe<Category_id_operator>;
  isActive?: InputMaybe<Category_isActive_operator>;
  name?: InputMaybe<Category_name_operator>;
  parent?: InputMaybe<Category_parent_operator>;
  type?: InputMaybe<Category_type_operator>;
  updatedAt?: InputMaybe<Category_updatedAt_operator>;
  user?: InputMaybe<Category_user_operator>;
};

export type CurrenciesResult = {
  __typename?: 'CurrenciesResult';
  docs?: Maybe<Array<Maybe<Currency>>>;
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  decimal_digits: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  name_plural: Scalars['String']['output'];
  rounding: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
  symbol_native: Scalars['String']['output'];
};

export type DashboardResult = {
  __typename?: 'DashboardResult';
  balanceChangePercent?: Maybe<Scalars['Float']['output']>;
  monthlyPulse: MonthlyPulse;
  totalBalance: Scalars['Float']['output'];
};

export type Media = {
  __typename?: 'Media';
  alt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entityType?: Maybe<Media_entityType>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['Float']['output']>;
  focalX?: Maybe<Scalars['Float']['output']>;
  focalY?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Media_type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user: User;
  width?: Maybe<Scalars['Float']['output']>;
};

export type MediaCreateAccess = {
  __typename?: 'MediaCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaCreateDocAccess = {
  __typename?: 'MediaCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteAccess = {
  __typename?: 'MediaDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteDocAccess = {
  __typename?: 'MediaDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDocAccessFields = {
  __typename?: 'MediaDocAccessFields';
  alt?: Maybe<MediaDocAccessFields_alt>;
  createdAt?: Maybe<MediaDocAccessFields_createdAt>;
  entityType?: Maybe<MediaDocAccessFields_entityType>;
  filename?: Maybe<MediaDocAccessFields_filename>;
  filesize?: Maybe<MediaDocAccessFields_filesize>;
  focalX?: Maybe<MediaDocAccessFields_focalX>;
  focalY?: Maybe<MediaDocAccessFields_focalY>;
  height?: Maybe<MediaDocAccessFields_height>;
  mimeType?: Maybe<MediaDocAccessFields_mimeType>;
  thumbnailURL?: Maybe<MediaDocAccessFields_thumbnailURL>;
  type?: Maybe<MediaDocAccessFields_type>;
  updatedAt?: Maybe<MediaDocAccessFields_updatedAt>;
  url?: Maybe<MediaDocAccessFields_url>;
  user?: Maybe<MediaDocAccessFields_user>;
  width?: Maybe<MediaDocAccessFields_width>;
};

export type MediaDocAccessFields_alt = {
  __typename?: 'MediaDocAccessFields_alt';
  create?: Maybe<MediaDocAccessFields_alt_Create>;
  delete?: Maybe<MediaDocAccessFields_alt_Delete>;
  read?: Maybe<MediaDocAccessFields_alt_Read>;
  update?: Maybe<MediaDocAccessFields_alt_Update>;
};

export type MediaDocAccessFields_alt_Create = {
  __typename?: 'MediaDocAccessFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_alt_Delete = {
  __typename?: 'MediaDocAccessFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_alt_Read = {
  __typename?: 'MediaDocAccessFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_alt_Update = {
  __typename?: 'MediaDocAccessFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_createdAt = {
  __typename?: 'MediaDocAccessFields_createdAt';
  create?: Maybe<MediaDocAccessFields_createdAt_Create>;
  delete?: Maybe<MediaDocAccessFields_createdAt_Delete>;
  read?: Maybe<MediaDocAccessFields_createdAt_Read>;
  update?: Maybe<MediaDocAccessFields_createdAt_Update>;
};

export type MediaDocAccessFields_createdAt_Create = {
  __typename?: 'MediaDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_createdAt_Delete = {
  __typename?: 'MediaDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_createdAt_Read = {
  __typename?: 'MediaDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_createdAt_Update = {
  __typename?: 'MediaDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_entityType = {
  __typename?: 'MediaDocAccessFields_entityType';
  create?: Maybe<MediaDocAccessFields_entityType_Create>;
  delete?: Maybe<MediaDocAccessFields_entityType_Delete>;
  read?: Maybe<MediaDocAccessFields_entityType_Read>;
  update?: Maybe<MediaDocAccessFields_entityType_Update>;
};

export type MediaDocAccessFields_entityType_Create = {
  __typename?: 'MediaDocAccessFields_entityType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_entityType_Delete = {
  __typename?: 'MediaDocAccessFields_entityType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_entityType_Read = {
  __typename?: 'MediaDocAccessFields_entityType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_entityType_Update = {
  __typename?: 'MediaDocAccessFields_entityType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filename = {
  __typename?: 'MediaDocAccessFields_filename';
  create?: Maybe<MediaDocAccessFields_filename_Create>;
  delete?: Maybe<MediaDocAccessFields_filename_Delete>;
  read?: Maybe<MediaDocAccessFields_filename_Read>;
  update?: Maybe<MediaDocAccessFields_filename_Update>;
};

export type MediaDocAccessFields_filename_Create = {
  __typename?: 'MediaDocAccessFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filename_Delete = {
  __typename?: 'MediaDocAccessFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filename_Read = {
  __typename?: 'MediaDocAccessFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filename_Update = {
  __typename?: 'MediaDocAccessFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filesize = {
  __typename?: 'MediaDocAccessFields_filesize';
  create?: Maybe<MediaDocAccessFields_filesize_Create>;
  delete?: Maybe<MediaDocAccessFields_filesize_Delete>;
  read?: Maybe<MediaDocAccessFields_filesize_Read>;
  update?: Maybe<MediaDocAccessFields_filesize_Update>;
};

export type MediaDocAccessFields_filesize_Create = {
  __typename?: 'MediaDocAccessFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filesize_Delete = {
  __typename?: 'MediaDocAccessFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filesize_Read = {
  __typename?: 'MediaDocAccessFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_filesize_Update = {
  __typename?: 'MediaDocAccessFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalX = {
  __typename?: 'MediaDocAccessFields_focalX';
  create?: Maybe<MediaDocAccessFields_focalX_Create>;
  delete?: Maybe<MediaDocAccessFields_focalX_Delete>;
  read?: Maybe<MediaDocAccessFields_focalX_Read>;
  update?: Maybe<MediaDocAccessFields_focalX_Update>;
};

export type MediaDocAccessFields_focalX_Create = {
  __typename?: 'MediaDocAccessFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalX_Delete = {
  __typename?: 'MediaDocAccessFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalX_Read = {
  __typename?: 'MediaDocAccessFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalX_Update = {
  __typename?: 'MediaDocAccessFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalY = {
  __typename?: 'MediaDocAccessFields_focalY';
  create?: Maybe<MediaDocAccessFields_focalY_Create>;
  delete?: Maybe<MediaDocAccessFields_focalY_Delete>;
  read?: Maybe<MediaDocAccessFields_focalY_Read>;
  update?: Maybe<MediaDocAccessFields_focalY_Update>;
};

export type MediaDocAccessFields_focalY_Create = {
  __typename?: 'MediaDocAccessFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalY_Delete = {
  __typename?: 'MediaDocAccessFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalY_Read = {
  __typename?: 'MediaDocAccessFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_focalY_Update = {
  __typename?: 'MediaDocAccessFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_height = {
  __typename?: 'MediaDocAccessFields_height';
  create?: Maybe<MediaDocAccessFields_height_Create>;
  delete?: Maybe<MediaDocAccessFields_height_Delete>;
  read?: Maybe<MediaDocAccessFields_height_Read>;
  update?: Maybe<MediaDocAccessFields_height_Update>;
};

export type MediaDocAccessFields_height_Create = {
  __typename?: 'MediaDocAccessFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_height_Delete = {
  __typename?: 'MediaDocAccessFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_height_Read = {
  __typename?: 'MediaDocAccessFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_height_Update = {
  __typename?: 'MediaDocAccessFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_mimeType = {
  __typename?: 'MediaDocAccessFields_mimeType';
  create?: Maybe<MediaDocAccessFields_mimeType_Create>;
  delete?: Maybe<MediaDocAccessFields_mimeType_Delete>;
  read?: Maybe<MediaDocAccessFields_mimeType_Read>;
  update?: Maybe<MediaDocAccessFields_mimeType_Update>;
};

export type MediaDocAccessFields_mimeType_Create = {
  __typename?: 'MediaDocAccessFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_mimeType_Delete = {
  __typename?: 'MediaDocAccessFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_mimeType_Read = {
  __typename?: 'MediaDocAccessFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_mimeType_Update = {
  __typename?: 'MediaDocAccessFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_thumbnailURL = {
  __typename?: 'MediaDocAccessFields_thumbnailURL';
  create?: Maybe<MediaDocAccessFields_thumbnailURL_Create>;
  delete?: Maybe<MediaDocAccessFields_thumbnailURL_Delete>;
  read?: Maybe<MediaDocAccessFields_thumbnailURL_Read>;
  update?: Maybe<MediaDocAccessFields_thumbnailURL_Update>;
};

export type MediaDocAccessFields_thumbnailURL_Create = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_thumbnailURL_Delete = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_thumbnailURL_Read = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_thumbnailURL_Update = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_type = {
  __typename?: 'MediaDocAccessFields_type';
  create?: Maybe<MediaDocAccessFields_type_Create>;
  delete?: Maybe<MediaDocAccessFields_type_Delete>;
  read?: Maybe<MediaDocAccessFields_type_Read>;
  update?: Maybe<MediaDocAccessFields_type_Update>;
};

export type MediaDocAccessFields_type_Create = {
  __typename?: 'MediaDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_type_Delete = {
  __typename?: 'MediaDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_type_Read = {
  __typename?: 'MediaDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_type_Update = {
  __typename?: 'MediaDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_updatedAt = {
  __typename?: 'MediaDocAccessFields_updatedAt';
  create?: Maybe<MediaDocAccessFields_updatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_updatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_updatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_updatedAt_Update>;
};

export type MediaDocAccessFields_updatedAt_Create = {
  __typename?: 'MediaDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_updatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_updatedAt_Read = {
  __typename?: 'MediaDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_updatedAt_Update = {
  __typename?: 'MediaDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_url = {
  __typename?: 'MediaDocAccessFields_url';
  create?: Maybe<MediaDocAccessFields_url_Create>;
  delete?: Maybe<MediaDocAccessFields_url_Delete>;
  read?: Maybe<MediaDocAccessFields_url_Read>;
  update?: Maybe<MediaDocAccessFields_url_Update>;
};

export type MediaDocAccessFields_url_Create = {
  __typename?: 'MediaDocAccessFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_url_Delete = {
  __typename?: 'MediaDocAccessFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_url_Read = {
  __typename?: 'MediaDocAccessFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_url_Update = {
  __typename?: 'MediaDocAccessFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_user = {
  __typename?: 'MediaDocAccessFields_user';
  create?: Maybe<MediaDocAccessFields_user_Create>;
  delete?: Maybe<MediaDocAccessFields_user_Delete>;
  read?: Maybe<MediaDocAccessFields_user_Read>;
  update?: Maybe<MediaDocAccessFields_user_Update>;
};

export type MediaDocAccessFields_user_Create = {
  __typename?: 'MediaDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_user_Delete = {
  __typename?: 'MediaDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_user_Read = {
  __typename?: 'MediaDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_user_Update = {
  __typename?: 'MediaDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_width = {
  __typename?: 'MediaDocAccessFields_width';
  create?: Maybe<MediaDocAccessFields_width_Create>;
  delete?: Maybe<MediaDocAccessFields_width_Delete>;
  read?: Maybe<MediaDocAccessFields_width_Read>;
  update?: Maybe<MediaDocAccessFields_width_Update>;
};

export type MediaDocAccessFields_width_Create = {
  __typename?: 'MediaDocAccessFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_width_Delete = {
  __typename?: 'MediaDocAccessFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_width_Read = {
  __typename?: 'MediaDocAccessFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_width_Update = {
  __typename?: 'MediaDocAccessFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields = {
  __typename?: 'MediaFields';
  alt?: Maybe<MediaFields_alt>;
  createdAt?: Maybe<MediaFields_createdAt>;
  entityType?: Maybe<MediaFields_entityType>;
  filename?: Maybe<MediaFields_filename>;
  filesize?: Maybe<MediaFields_filesize>;
  focalX?: Maybe<MediaFields_focalX>;
  focalY?: Maybe<MediaFields_focalY>;
  height?: Maybe<MediaFields_height>;
  mimeType?: Maybe<MediaFields_mimeType>;
  thumbnailURL?: Maybe<MediaFields_thumbnailURL>;
  type?: Maybe<MediaFields_type>;
  updatedAt?: Maybe<MediaFields_updatedAt>;
  url?: Maybe<MediaFields_url>;
  user?: Maybe<MediaFields_user>;
  width?: Maybe<MediaFields_width>;
};

export type MediaFields_alt = {
  __typename?: 'MediaFields_alt';
  create?: Maybe<MediaFields_alt_Create>;
  delete?: Maybe<MediaFields_alt_Delete>;
  read?: Maybe<MediaFields_alt_Read>;
  update?: Maybe<MediaFields_alt_Update>;
};

export type MediaFields_alt_Create = {
  __typename?: 'MediaFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_alt_Delete = {
  __typename?: 'MediaFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_alt_Read = {
  __typename?: 'MediaFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_alt_Update = {
  __typename?: 'MediaFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_createdAt = {
  __typename?: 'MediaFields_createdAt';
  create?: Maybe<MediaFields_createdAt_Create>;
  delete?: Maybe<MediaFields_createdAt_Delete>;
  read?: Maybe<MediaFields_createdAt_Read>;
  update?: Maybe<MediaFields_createdAt_Update>;
};

export type MediaFields_createdAt_Create = {
  __typename?: 'MediaFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_createdAt_Delete = {
  __typename?: 'MediaFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_createdAt_Read = {
  __typename?: 'MediaFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_createdAt_Update = {
  __typename?: 'MediaFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_entityType = {
  __typename?: 'MediaFields_entityType';
  create?: Maybe<MediaFields_entityType_Create>;
  delete?: Maybe<MediaFields_entityType_Delete>;
  read?: Maybe<MediaFields_entityType_Read>;
  update?: Maybe<MediaFields_entityType_Update>;
};

export type MediaFields_entityType_Create = {
  __typename?: 'MediaFields_entityType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_entityType_Delete = {
  __typename?: 'MediaFields_entityType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_entityType_Read = {
  __typename?: 'MediaFields_entityType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_entityType_Update = {
  __typename?: 'MediaFields_entityType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filename = {
  __typename?: 'MediaFields_filename';
  create?: Maybe<MediaFields_filename_Create>;
  delete?: Maybe<MediaFields_filename_Delete>;
  read?: Maybe<MediaFields_filename_Read>;
  update?: Maybe<MediaFields_filename_Update>;
};

export type MediaFields_filename_Create = {
  __typename?: 'MediaFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filename_Delete = {
  __typename?: 'MediaFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filename_Read = {
  __typename?: 'MediaFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filename_Update = {
  __typename?: 'MediaFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filesize = {
  __typename?: 'MediaFields_filesize';
  create?: Maybe<MediaFields_filesize_Create>;
  delete?: Maybe<MediaFields_filesize_Delete>;
  read?: Maybe<MediaFields_filesize_Read>;
  update?: Maybe<MediaFields_filesize_Update>;
};

export type MediaFields_filesize_Create = {
  __typename?: 'MediaFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filesize_Delete = {
  __typename?: 'MediaFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filesize_Read = {
  __typename?: 'MediaFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_filesize_Update = {
  __typename?: 'MediaFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalX = {
  __typename?: 'MediaFields_focalX';
  create?: Maybe<MediaFields_focalX_Create>;
  delete?: Maybe<MediaFields_focalX_Delete>;
  read?: Maybe<MediaFields_focalX_Read>;
  update?: Maybe<MediaFields_focalX_Update>;
};

export type MediaFields_focalX_Create = {
  __typename?: 'MediaFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalX_Delete = {
  __typename?: 'MediaFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalX_Read = {
  __typename?: 'MediaFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalX_Update = {
  __typename?: 'MediaFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalY = {
  __typename?: 'MediaFields_focalY';
  create?: Maybe<MediaFields_focalY_Create>;
  delete?: Maybe<MediaFields_focalY_Delete>;
  read?: Maybe<MediaFields_focalY_Read>;
  update?: Maybe<MediaFields_focalY_Update>;
};

export type MediaFields_focalY_Create = {
  __typename?: 'MediaFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalY_Delete = {
  __typename?: 'MediaFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalY_Read = {
  __typename?: 'MediaFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_focalY_Update = {
  __typename?: 'MediaFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_height = {
  __typename?: 'MediaFields_height';
  create?: Maybe<MediaFields_height_Create>;
  delete?: Maybe<MediaFields_height_Delete>;
  read?: Maybe<MediaFields_height_Read>;
  update?: Maybe<MediaFields_height_Update>;
};

export type MediaFields_height_Create = {
  __typename?: 'MediaFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_height_Delete = {
  __typename?: 'MediaFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_height_Read = {
  __typename?: 'MediaFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_height_Update = {
  __typename?: 'MediaFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_mimeType = {
  __typename?: 'MediaFields_mimeType';
  create?: Maybe<MediaFields_mimeType_Create>;
  delete?: Maybe<MediaFields_mimeType_Delete>;
  read?: Maybe<MediaFields_mimeType_Read>;
  update?: Maybe<MediaFields_mimeType_Update>;
};

export type MediaFields_mimeType_Create = {
  __typename?: 'MediaFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_mimeType_Delete = {
  __typename?: 'MediaFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_mimeType_Read = {
  __typename?: 'MediaFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_mimeType_Update = {
  __typename?: 'MediaFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_thumbnailURL = {
  __typename?: 'MediaFields_thumbnailURL';
  create?: Maybe<MediaFields_thumbnailURL_Create>;
  delete?: Maybe<MediaFields_thumbnailURL_Delete>;
  read?: Maybe<MediaFields_thumbnailURL_Read>;
  update?: Maybe<MediaFields_thumbnailURL_Update>;
};

export type MediaFields_thumbnailURL_Create = {
  __typename?: 'MediaFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_thumbnailURL_Delete = {
  __typename?: 'MediaFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_thumbnailURL_Read = {
  __typename?: 'MediaFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_thumbnailURL_Update = {
  __typename?: 'MediaFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_type = {
  __typename?: 'MediaFields_type';
  create?: Maybe<MediaFields_type_Create>;
  delete?: Maybe<MediaFields_type_Delete>;
  read?: Maybe<MediaFields_type_Read>;
  update?: Maybe<MediaFields_type_Update>;
};

export type MediaFields_type_Create = {
  __typename?: 'MediaFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_type_Delete = {
  __typename?: 'MediaFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_type_Read = {
  __typename?: 'MediaFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_type_Update = {
  __typename?: 'MediaFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_updatedAt = {
  __typename?: 'MediaFields_updatedAt';
  create?: Maybe<MediaFields_updatedAt_Create>;
  delete?: Maybe<MediaFields_updatedAt_Delete>;
  read?: Maybe<MediaFields_updatedAt_Read>;
  update?: Maybe<MediaFields_updatedAt_Update>;
};

export type MediaFields_updatedAt_Create = {
  __typename?: 'MediaFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_updatedAt_Delete = {
  __typename?: 'MediaFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_updatedAt_Read = {
  __typename?: 'MediaFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_updatedAt_Update = {
  __typename?: 'MediaFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_url = {
  __typename?: 'MediaFields_url';
  create?: Maybe<MediaFields_url_Create>;
  delete?: Maybe<MediaFields_url_Delete>;
  read?: Maybe<MediaFields_url_Read>;
  update?: Maybe<MediaFields_url_Update>;
};

export type MediaFields_url_Create = {
  __typename?: 'MediaFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_url_Delete = {
  __typename?: 'MediaFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_url_Read = {
  __typename?: 'MediaFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_url_Update = {
  __typename?: 'MediaFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_user = {
  __typename?: 'MediaFields_user';
  create?: Maybe<MediaFields_user_Create>;
  delete?: Maybe<MediaFields_user_Delete>;
  read?: Maybe<MediaFields_user_Read>;
  update?: Maybe<MediaFields_user_Update>;
};

export type MediaFields_user_Create = {
  __typename?: 'MediaFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_user_Delete = {
  __typename?: 'MediaFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_user_Read = {
  __typename?: 'MediaFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_user_Update = {
  __typename?: 'MediaFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_width = {
  __typename?: 'MediaFields_width';
  create?: Maybe<MediaFields_width_Create>;
  delete?: Maybe<MediaFields_width_Delete>;
  read?: Maybe<MediaFields_width_Read>;
  update?: Maybe<MediaFields_width_Update>;
};

export type MediaFields_width_Create = {
  __typename?: 'MediaFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_width_Delete = {
  __typename?: 'MediaFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_width_Read = {
  __typename?: 'MediaFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_width_Update = {
  __typename?: 'MediaFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaReadAccess = {
  __typename?: 'MediaReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaReadDocAccess = {
  __typename?: 'MediaReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateAccess = {
  __typename?: 'MediaUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateDocAccess = {
  __typename?: 'MediaUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export enum MediaUpdate_entityType_MutationInput {
  account = 'account',
  other = 'other',
  person = 'person',
  transaction = 'transaction'
}

export enum MediaUpdate_type_MutationInput {
  attachment = 'attachment',
  avatar = 'avatar',
  other = 'other'
}

export type Media_alt_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Media_entityType {
  account = 'account',
  other = 'other',
  person = 'person',
  transaction = 'transaction'
}

export enum Media_entityType_Input {
  account = 'account',
  other = 'other',
  person = 'person',
  transaction = 'transaction'
}

export enum Media_entityType_MutationInput {
  account = 'account',
  other = 'other',
  person = 'person',
  transaction = 'transaction'
}

export type Media_entityType_operator = {
  all?: InputMaybe<Array<InputMaybe<Media_entityType_Input>>>;
  equals?: InputMaybe<Media_entityType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Media_entityType_Input>>>;
  not_equals?: InputMaybe<Media_entityType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Media_entityType_Input>>>;
};

export type Media_filename_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_filesize_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_focalX_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_focalY_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_height_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_mimeType_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_thumbnailURL_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Media_type {
  attachment = 'attachment',
  avatar = 'avatar',
  other = 'other'
}

export enum Media_type_Input {
  attachment = 'attachment',
  avatar = 'avatar',
  other = 'other'
}

export enum Media_type_MutationInput {
  attachment = 'attachment',
  avatar = 'avatar',
  other = 'other'
}

export type Media_type_operator = {
  all?: InputMaybe<Array<InputMaybe<Media_type_Input>>>;
  equals?: InputMaybe<Media_type_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Media_type_Input>>>;
  not_equals?: InputMaybe<Media_type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Media_type_Input>>>;
};

export type Media_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_url_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Media_where = {
  AND?: InputMaybe<Array<InputMaybe<Media_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_where_or>>>;
  alt?: InputMaybe<Media_alt_operator>;
  createdAt?: InputMaybe<Media_createdAt_operator>;
  entityType?: InputMaybe<Media_entityType_operator>;
  filename?: InputMaybe<Media_filename_operator>;
  filesize?: InputMaybe<Media_filesize_operator>;
  focalX?: InputMaybe<Media_focalX_operator>;
  focalY?: InputMaybe<Media_focalY_operator>;
  height?: InputMaybe<Media_height_operator>;
  id?: InputMaybe<Media_id_operator>;
  mimeType?: InputMaybe<Media_mimeType_operator>;
  thumbnailURL?: InputMaybe<Media_thumbnailURL_operator>;
  type?: InputMaybe<Media_type_operator>;
  updatedAt?: InputMaybe<Media_updatedAt_operator>;
  url?: InputMaybe<Media_url_operator>;
  user?: InputMaybe<Media_user_operator>;
  width?: InputMaybe<Media_width_operator>;
};

export type Media_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Media_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_where_or>>>;
  alt?: InputMaybe<Media_alt_operator>;
  createdAt?: InputMaybe<Media_createdAt_operator>;
  entityType?: InputMaybe<Media_entityType_operator>;
  filename?: InputMaybe<Media_filename_operator>;
  filesize?: InputMaybe<Media_filesize_operator>;
  focalX?: InputMaybe<Media_focalX_operator>;
  focalY?: InputMaybe<Media_focalY_operator>;
  height?: InputMaybe<Media_height_operator>;
  id?: InputMaybe<Media_id_operator>;
  mimeType?: InputMaybe<Media_mimeType_operator>;
  thumbnailURL?: InputMaybe<Media_thumbnailURL_operator>;
  type?: InputMaybe<Media_type_operator>;
  updatedAt?: InputMaybe<Media_updatedAt_operator>;
  url?: InputMaybe<Media_url_operator>;
  user?: InputMaybe<Media_user_operator>;
  width?: InputMaybe<Media_width_operator>;
};

export type Media_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Media_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_where_or>>>;
  alt?: InputMaybe<Media_alt_operator>;
  createdAt?: InputMaybe<Media_createdAt_operator>;
  entityType?: InputMaybe<Media_entityType_operator>;
  filename?: InputMaybe<Media_filename_operator>;
  filesize?: InputMaybe<Media_filesize_operator>;
  focalX?: InputMaybe<Media_focalX_operator>;
  focalY?: InputMaybe<Media_focalY_operator>;
  height?: InputMaybe<Media_height_operator>;
  id?: InputMaybe<Media_id_operator>;
  mimeType?: InputMaybe<Media_mimeType_operator>;
  thumbnailURL?: InputMaybe<Media_thumbnailURL_operator>;
  type?: InputMaybe<Media_type_operator>;
  updatedAt?: InputMaybe<Media_updatedAt_operator>;
  url?: InputMaybe<Media_url_operator>;
  user?: InputMaybe<Media_user_operator>;
  width?: InputMaybe<Media_width_operator>;
};

export type Media_width_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type MonthlyCalendarMeta = {
  __typename?: 'MonthlyCalendarMeta';
  balance: Scalars['Float']['output'];
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  totalTransfers: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyCalendarResult = {
  __typename?: 'MonthlyCalendarResult';
  data?: Maybe<Array<Maybe<CalendarDay>>>;
  meta: MonthlyCalendarMeta;
};

export type MonthlyCategoriesMeta = {
  __typename?: 'MonthlyCategoriesMeta';
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  totalExpenses: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyCategoriesResult = {
  __typename?: 'MonthlyCategoriesResult';
  data?: Maybe<Array<Maybe<CategoryActivity>>>;
  meta: MonthlyCategoriesMeta;
};

export type MonthlyPeopleMeta = {
  __typename?: 'MonthlyPeopleMeta';
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyPeopleResult = {
  __typename?: 'MonthlyPeopleResult';
  data?: Maybe<Array<Maybe<PersonActivity>>>;
  meta: MonthlyPeopleMeta;
};

export type MonthlyPulse = {
  __typename?: 'MonthlyPulse';
  expenses: Scalars['Float']['output'];
  income: Scalars['Float']['output'];
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  surplus: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyTagsMeta = {
  __typename?: 'MonthlyTagsMeta';
  month: Scalars['Int']['output'];
  monthName: Scalars['String']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  totalTransfers: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyTagsResult = {
  __typename?: 'MonthlyTagsResult';
  data?: Maybe<Array<Maybe<TagActivity>>>;
  meta: MonthlyTagsMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<Account>;
  createAiUsage?: Maybe<AiUsage>;
  createCategory?: Maybe<Category>;
  createMedia?: Maybe<Media>;
  createOauthAccount?: Maybe<OauthAccount>;
  createPayloadKv?: Maybe<PayloadKv>;
  createPayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  createPayloadMcpApiKey?: Maybe<PayloadMcpApiKey>;
  createPayloadPreference?: Maybe<PayloadPreference>;
  createPerson?: Maybe<Person>;
  createReminder?: Maybe<Reminder>;
  createTag?: Maybe<Tag>;
  createTransaction?: Maybe<Transaction>;
  createUser?: Maybe<User>;
  createUserSetting?: Maybe<UserSetting>;
  deleteAccount?: Maybe<Account>;
  deleteAiUsage?: Maybe<AiUsage>;
  deleteCategory?: Maybe<Category>;
  deleteMedia?: Maybe<Media>;
  deleteOauthAccount?: Maybe<OauthAccount>;
  deletePayloadKv?: Maybe<PayloadKv>;
  deletePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  deletePayloadMcpApiKey?: Maybe<PayloadMcpApiKey>;
  deletePayloadPreference?: Maybe<PayloadPreference>;
  deletePerson?: Maybe<Person>;
  deleteReminder?: Maybe<Reminder>;
  deleteTag?: Maybe<Tag>;
  deleteTransaction?: Maybe<Transaction>;
  deleteUser?: Maybe<User>;
  deleteUserSetting?: Maybe<UserSetting>;
  duplicateAccount?: Maybe<Account>;
  duplicateAiUsage?: Maybe<AiUsage>;
  duplicateCategory?: Maybe<Category>;
  duplicateMedia?: Maybe<Media>;
  duplicateOauthAccount?: Maybe<OauthAccount>;
  duplicatePayloadKv?: Maybe<PayloadKv>;
  duplicatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  duplicatePayloadPreference?: Maybe<PayloadPreference>;
  duplicatePerson?: Maybe<Person>;
  duplicateReminder?: Maybe<Reminder>;
  duplicateTag?: Maybe<Tag>;
  duplicateTransaction?: Maybe<Transaction>;
  duplicateUserSetting?: Maybe<UserSetting>;
  forgotPasswordUser: Scalars['Boolean']['output'];
  imageToTransaction?: Maybe<AITransactionResult>;
  loginUser?: Maybe<usersLoginResult>;
  logoutPayloadMcpApiKey?: Maybe<Scalars['String']['output']>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  refreshTokenPayloadMcpApiKey?: Maybe<payload_mcp_api_keysRefreshedPayloadMcpApiKey>;
  refreshTokenUser?: Maybe<usersRefreshedUser>;
  resetPasswordUser?: Maybe<usersResetPassword>;
  textToTransaction?: Maybe<AITransactionResult>;
  unlockUser: Scalars['Boolean']['output'];
  updateAccount?: Maybe<Account>;
  updateAiUsage?: Maybe<AiUsage>;
  updateAppSetting?: Maybe<AppSetting>;
  updateCategory?: Maybe<Category>;
  updateMedia?: Maybe<Media>;
  updateOauthAccount?: Maybe<OauthAccount>;
  updatePayloadKv?: Maybe<PayloadKv>;
  updatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  updatePayloadMcpApiKey?: Maybe<PayloadMcpApiKey>;
  updatePayloadPreference?: Maybe<PayloadPreference>;
  updatePerson?: Maybe<Person>;
  updateReminder?: Maybe<Reminder>;
  updateTag?: Maybe<Tag>;
  updateTransaction?: Maybe<Transaction>;
  updateUser?: Maybe<User>;
  updateUserSetting?: Maybe<UserSetting>;
  verifyEmailUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationcreateAccountArgs = {
  data: mutationAccountInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateAiUsageArgs = {
  data: mutationAiUsageInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateCategoryArgs = {
  data: mutationCategoryInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateMediaArgs = {
  data: mutationMediaInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateOauthAccountArgs = {
  data: mutationOauthAccountInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreatePayloadKvArgs = {
  data: mutationPayloadKvInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreatePayloadLockedDocumentArgs = {
  data: mutationPayloadLockedDocumentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreatePayloadMcpApiKeyArgs = {
  data: mutationPayloadMcpApiKeyInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreatePayloadPreferenceArgs = {
  data: mutationPayloadPreferenceInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreatePersonArgs = {
  data: mutationPersonInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateReminderArgs = {
  data: mutationReminderInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateTagArgs = {
  data: mutationTagInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateTransactionArgs = {
  data: mutationTransactionInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateUserArgs = {
  data: mutationUserInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationcreateUserSettingArgs = {
  data: mutationUserSettingInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteAccountArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteAiUsageArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteCategoryArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteMediaArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteOauthAccountArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeletePayloadKvArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeletePayloadLockedDocumentArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeletePayloadMcpApiKeyArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeletePayloadPreferenceArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeletePersonArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteReminderArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteTagArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteTransactionArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteUserArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationdeleteUserSettingArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationduplicateAccountArgs = {
  data: mutationAccountInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateAiUsageArgs = {
  data: mutationAiUsageInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateCategoryArgs = {
  data: mutationCategoryInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateMediaArgs = {
  data: mutationMediaInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateOauthAccountArgs = {
  data: mutationOauthAccountInput;
  id: Scalars['String']['input'];
};


export type MutationduplicatePayloadKvArgs = {
  data: mutationPayloadKvInput;
  id: Scalars['String']['input'];
};


export type MutationduplicatePayloadLockedDocumentArgs = {
  data: mutationPayloadLockedDocumentInput;
  id: Scalars['String']['input'];
};


export type MutationduplicatePayloadPreferenceArgs = {
  data: mutationPayloadPreferenceInput;
  id: Scalars['String']['input'];
};


export type MutationduplicatePersonArgs = {
  data: mutationPersonInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateReminderArgs = {
  data: mutationReminderInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateTagArgs = {
  data: mutationTagInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateTransactionArgs = {
  data: mutationTransactionInput;
  id: Scalars['String']['input'];
};


export type MutationduplicateUserSettingArgs = {
  data: mutationUserSettingInput;
  id: Scalars['String']['input'];
};


export type MutationforgotPasswordUserArgs = {
  disableEmail?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  expiration?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationimageToTransactionArgs = {
  image: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
};


export type MutationloginUserArgs = {
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationlogoutPayloadMcpApiKeyArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationlogoutUserArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationresetPasswordUserArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationtextToTransactionArgs = {
  model?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};


export type MutationunlockUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationupdateAccountArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationAccountUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateAiUsageArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationAiUsageUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateAppSettingArgs = {
  data: mutationAppSettingInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateCategoryArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationCategoryUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateMediaArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationMediaUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateOauthAccountArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationOauthAccountUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdatePayloadKvArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationPayloadKvUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdatePayloadLockedDocumentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationPayloadLockedDocumentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdatePayloadMcpApiKeyArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationPayloadMcpApiKeyUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdatePayloadPreferenceArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationPayloadPreferenceUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdatePersonArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationPersonUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateReminderArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationReminderUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateTagArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationTagUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateTransactionArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationTransactionUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateUserArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationUserUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationupdateUserSettingArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: mutationUserSettingUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationverifyEmailUserArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type OauthAccount = {
  __typename?: 'OauthAccount';
  access_token?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  issuerName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sub: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type OauthAccount_access_token_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OauthAccount_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_issuerName_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_picture_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_scope_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_sub_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OauthAccount_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type OauthAccount_where = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_where_or>>>;
  access_token?: InputMaybe<OauthAccount_access_token_operator>;
  createdAt?: InputMaybe<OauthAccount_createdAt_operator>;
  id?: InputMaybe<OauthAccount_id_operator>;
  issuerName?: InputMaybe<OauthAccount_issuerName_operator>;
  name?: InputMaybe<OauthAccount_name_operator>;
  picture?: InputMaybe<OauthAccount_picture_operator>;
  scope?: InputMaybe<OauthAccount_scope_operator>;
  sub?: InputMaybe<OauthAccount_sub_operator>;
  updatedAt?: InputMaybe<OauthAccount_updatedAt_operator>;
  user?: InputMaybe<OauthAccount_user_operator>;
};

export type OauthAccount_where_and = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_where_or>>>;
  access_token?: InputMaybe<OauthAccount_access_token_operator>;
  createdAt?: InputMaybe<OauthAccount_createdAt_operator>;
  id?: InputMaybe<OauthAccount_id_operator>;
  issuerName?: InputMaybe<OauthAccount_issuerName_operator>;
  name?: InputMaybe<OauthAccount_name_operator>;
  picture?: InputMaybe<OauthAccount_picture_operator>;
  scope?: InputMaybe<OauthAccount_scope_operator>;
  sub?: InputMaybe<OauthAccount_sub_operator>;
  updatedAt?: InputMaybe<OauthAccount_updatedAt_operator>;
  user?: InputMaybe<OauthAccount_user_operator>;
};

export type OauthAccount_where_or = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_where_or>>>;
  access_token?: InputMaybe<OauthAccount_access_token_operator>;
  createdAt?: InputMaybe<OauthAccount_createdAt_operator>;
  id?: InputMaybe<OauthAccount_id_operator>;
  issuerName?: InputMaybe<OauthAccount_issuerName_operator>;
  name?: InputMaybe<OauthAccount_name_operator>;
  picture?: InputMaybe<OauthAccount_picture_operator>;
  scope?: InputMaybe<OauthAccount_scope_operator>;
  sub?: InputMaybe<OauthAccount_sub_operator>;
  updatedAt?: InputMaybe<OauthAccount_updatedAt_operator>;
  user?: InputMaybe<OauthAccount_user_operator>;
};

export type OauthAccounts = {
  __typename?: 'OauthAccounts';
  docs: Array<OauthAccount>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type OauthAccountsCreateAccess = {
  __typename?: 'OauthAccountsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsCreateDocAccess = {
  __typename?: 'OauthAccountsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsDeleteAccess = {
  __typename?: 'OauthAccountsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsDeleteDocAccess = {
  __typename?: 'OauthAccountsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsDocAccessFields = {
  __typename?: 'OauthAccountsDocAccessFields';
  access_token?: Maybe<OauthAccountsDocAccessFields_access_token>;
  createdAt?: Maybe<OauthAccountsDocAccessFields_createdAt>;
  issuerName?: Maybe<OauthAccountsDocAccessFields_issuerName>;
  name?: Maybe<OauthAccountsDocAccessFields_name>;
  picture?: Maybe<OauthAccountsDocAccessFields_picture>;
  scope?: Maybe<OauthAccountsDocAccessFields_scope>;
  sub?: Maybe<OauthAccountsDocAccessFields_sub>;
  updatedAt?: Maybe<OauthAccountsDocAccessFields_updatedAt>;
  user?: Maybe<OauthAccountsDocAccessFields_user>;
};

export type OauthAccountsDocAccessFields_access_token = {
  __typename?: 'OauthAccountsDocAccessFields_access_token';
  create?: Maybe<OauthAccountsDocAccessFields_access_token_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_access_token_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_access_token_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_access_token_Update>;
};

export type OauthAccountsDocAccessFields_access_token_Create = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_access_token_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_access_token_Read = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_access_token_Update = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_createdAt = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt';
  create?: Maybe<OauthAccountsDocAccessFields_createdAt_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_createdAt_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_createdAt_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_createdAt_Update>;
};

export type OauthAccountsDocAccessFields_createdAt_Create = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_createdAt_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_createdAt_Read = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_createdAt_Update = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_issuerName = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName';
  create?: Maybe<OauthAccountsDocAccessFields_issuerName_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_issuerName_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_issuerName_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_issuerName_Update>;
};

export type OauthAccountsDocAccessFields_issuerName_Create = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_issuerName_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_issuerName_Read = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_issuerName_Update = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_name = {
  __typename?: 'OauthAccountsDocAccessFields_name';
  create?: Maybe<OauthAccountsDocAccessFields_name_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_name_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_name_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_name_Update>;
};

export type OauthAccountsDocAccessFields_name_Create = {
  __typename?: 'OauthAccountsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_name_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_name_Read = {
  __typename?: 'OauthAccountsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_name_Update = {
  __typename?: 'OauthAccountsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_picture = {
  __typename?: 'OauthAccountsDocAccessFields_picture';
  create?: Maybe<OauthAccountsDocAccessFields_picture_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_picture_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_picture_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_picture_Update>;
};

export type OauthAccountsDocAccessFields_picture_Create = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_picture_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_picture_Read = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_picture_Update = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_scope = {
  __typename?: 'OauthAccountsDocAccessFields_scope';
  create?: Maybe<OauthAccountsDocAccessFields_scope_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_scope_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_scope_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_scope_Update>;
};

export type OauthAccountsDocAccessFields_scope_Create = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_scope_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_scope_Read = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_scope_Update = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_sub = {
  __typename?: 'OauthAccountsDocAccessFields_sub';
  create?: Maybe<OauthAccountsDocAccessFields_sub_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_sub_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_sub_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_sub_Update>;
};

export type OauthAccountsDocAccessFields_sub_Create = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_sub_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_sub_Read = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_sub_Update = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_updatedAt = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt';
  create?: Maybe<OauthAccountsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_updatedAt_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_updatedAt_Update>;
};

export type OauthAccountsDocAccessFields_updatedAt_Create = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_updatedAt_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_updatedAt_Read = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_updatedAt_Update = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_user = {
  __typename?: 'OauthAccountsDocAccessFields_user';
  create?: Maybe<OauthAccountsDocAccessFields_user_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_user_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_user_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_user_Update>;
};

export type OauthAccountsDocAccessFields_user_Create = {
  __typename?: 'OauthAccountsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_user_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_user_Read = {
  __typename?: 'OauthAccountsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_user_Update = {
  __typename?: 'OauthAccountsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields = {
  __typename?: 'OauthAccountsFields';
  access_token?: Maybe<OauthAccountsFields_access_token>;
  createdAt?: Maybe<OauthAccountsFields_createdAt>;
  issuerName?: Maybe<OauthAccountsFields_issuerName>;
  name?: Maybe<OauthAccountsFields_name>;
  picture?: Maybe<OauthAccountsFields_picture>;
  scope?: Maybe<OauthAccountsFields_scope>;
  sub?: Maybe<OauthAccountsFields_sub>;
  updatedAt?: Maybe<OauthAccountsFields_updatedAt>;
  user?: Maybe<OauthAccountsFields_user>;
};

export type OauthAccountsFields_access_token = {
  __typename?: 'OauthAccountsFields_access_token';
  create?: Maybe<OauthAccountsFields_access_token_Create>;
  delete?: Maybe<OauthAccountsFields_access_token_Delete>;
  read?: Maybe<OauthAccountsFields_access_token_Read>;
  update?: Maybe<OauthAccountsFields_access_token_Update>;
};

export type OauthAccountsFields_access_token_Create = {
  __typename?: 'OauthAccountsFields_access_token_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_access_token_Delete = {
  __typename?: 'OauthAccountsFields_access_token_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_access_token_Read = {
  __typename?: 'OauthAccountsFields_access_token_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_access_token_Update = {
  __typename?: 'OauthAccountsFields_access_token_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_createdAt = {
  __typename?: 'OauthAccountsFields_createdAt';
  create?: Maybe<OauthAccountsFields_createdAt_Create>;
  delete?: Maybe<OauthAccountsFields_createdAt_Delete>;
  read?: Maybe<OauthAccountsFields_createdAt_Read>;
  update?: Maybe<OauthAccountsFields_createdAt_Update>;
};

export type OauthAccountsFields_createdAt_Create = {
  __typename?: 'OauthAccountsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_createdAt_Delete = {
  __typename?: 'OauthAccountsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_createdAt_Read = {
  __typename?: 'OauthAccountsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_createdAt_Update = {
  __typename?: 'OauthAccountsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_issuerName = {
  __typename?: 'OauthAccountsFields_issuerName';
  create?: Maybe<OauthAccountsFields_issuerName_Create>;
  delete?: Maybe<OauthAccountsFields_issuerName_Delete>;
  read?: Maybe<OauthAccountsFields_issuerName_Read>;
  update?: Maybe<OauthAccountsFields_issuerName_Update>;
};

export type OauthAccountsFields_issuerName_Create = {
  __typename?: 'OauthAccountsFields_issuerName_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_issuerName_Delete = {
  __typename?: 'OauthAccountsFields_issuerName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_issuerName_Read = {
  __typename?: 'OauthAccountsFields_issuerName_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_issuerName_Update = {
  __typename?: 'OauthAccountsFields_issuerName_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_name = {
  __typename?: 'OauthAccountsFields_name';
  create?: Maybe<OauthAccountsFields_name_Create>;
  delete?: Maybe<OauthAccountsFields_name_Delete>;
  read?: Maybe<OauthAccountsFields_name_Read>;
  update?: Maybe<OauthAccountsFields_name_Update>;
};

export type OauthAccountsFields_name_Create = {
  __typename?: 'OauthAccountsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_name_Delete = {
  __typename?: 'OauthAccountsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_name_Read = {
  __typename?: 'OauthAccountsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_name_Update = {
  __typename?: 'OauthAccountsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_picture = {
  __typename?: 'OauthAccountsFields_picture';
  create?: Maybe<OauthAccountsFields_picture_Create>;
  delete?: Maybe<OauthAccountsFields_picture_Delete>;
  read?: Maybe<OauthAccountsFields_picture_Read>;
  update?: Maybe<OauthAccountsFields_picture_Update>;
};

export type OauthAccountsFields_picture_Create = {
  __typename?: 'OauthAccountsFields_picture_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_picture_Delete = {
  __typename?: 'OauthAccountsFields_picture_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_picture_Read = {
  __typename?: 'OauthAccountsFields_picture_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_picture_Update = {
  __typename?: 'OauthAccountsFields_picture_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_scope = {
  __typename?: 'OauthAccountsFields_scope';
  create?: Maybe<OauthAccountsFields_scope_Create>;
  delete?: Maybe<OauthAccountsFields_scope_Delete>;
  read?: Maybe<OauthAccountsFields_scope_Read>;
  update?: Maybe<OauthAccountsFields_scope_Update>;
};

export type OauthAccountsFields_scope_Create = {
  __typename?: 'OauthAccountsFields_scope_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_scope_Delete = {
  __typename?: 'OauthAccountsFields_scope_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_scope_Read = {
  __typename?: 'OauthAccountsFields_scope_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_scope_Update = {
  __typename?: 'OauthAccountsFields_scope_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_sub = {
  __typename?: 'OauthAccountsFields_sub';
  create?: Maybe<OauthAccountsFields_sub_Create>;
  delete?: Maybe<OauthAccountsFields_sub_Delete>;
  read?: Maybe<OauthAccountsFields_sub_Read>;
  update?: Maybe<OauthAccountsFields_sub_Update>;
};

export type OauthAccountsFields_sub_Create = {
  __typename?: 'OauthAccountsFields_sub_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_sub_Delete = {
  __typename?: 'OauthAccountsFields_sub_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_sub_Read = {
  __typename?: 'OauthAccountsFields_sub_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_sub_Update = {
  __typename?: 'OauthAccountsFields_sub_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_updatedAt = {
  __typename?: 'OauthAccountsFields_updatedAt';
  create?: Maybe<OauthAccountsFields_updatedAt_Create>;
  delete?: Maybe<OauthAccountsFields_updatedAt_Delete>;
  read?: Maybe<OauthAccountsFields_updatedAt_Read>;
  update?: Maybe<OauthAccountsFields_updatedAt_Update>;
};

export type OauthAccountsFields_updatedAt_Create = {
  __typename?: 'OauthAccountsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_updatedAt_Delete = {
  __typename?: 'OauthAccountsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_updatedAt_Read = {
  __typename?: 'OauthAccountsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_updatedAt_Update = {
  __typename?: 'OauthAccountsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_user = {
  __typename?: 'OauthAccountsFields_user';
  create?: Maybe<OauthAccountsFields_user_Create>;
  delete?: Maybe<OauthAccountsFields_user_Delete>;
  read?: Maybe<OauthAccountsFields_user_Read>;
  update?: Maybe<OauthAccountsFields_user_Update>;
};

export type OauthAccountsFields_user_Create = {
  __typename?: 'OauthAccountsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_user_Delete = {
  __typename?: 'OauthAccountsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_user_Read = {
  __typename?: 'OauthAccountsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_user_Update = {
  __typename?: 'OauthAccountsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsReadAccess = {
  __typename?: 'OauthAccountsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsReadDocAccess = {
  __typename?: 'OauthAccountsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsUpdateAccess = {
  __typename?: 'OauthAccountsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type OauthAccountsUpdateDocAccess = {
  __typename?: 'OauthAccountsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKv = {
  __typename?: 'PayloadKv';
  data: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type PayloadKvCreateAccess = {
  __typename?: 'PayloadKvCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvCreateDocAccess = {
  __typename?: 'PayloadKvCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteAccess = {
  __typename?: 'PayloadKvDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteDocAccess = {
  __typename?: 'PayloadKvDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDocAccessFields = {
  __typename?: 'PayloadKvDocAccessFields';
  data?: Maybe<PayloadKvDocAccessFields_data>;
  key?: Maybe<PayloadKvDocAccessFields_key>;
};

export type PayloadKvDocAccessFields_data = {
  __typename?: 'PayloadKvDocAccessFields_data';
  create?: Maybe<PayloadKvDocAccessFields_data_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_data_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_data_Read>;
  update?: Maybe<PayloadKvDocAccessFields_data_Update>;
};

export type PayloadKvDocAccessFields_data_Create = {
  __typename?: 'PayloadKvDocAccessFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_data_Delete = {
  __typename?: 'PayloadKvDocAccessFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_data_Read = {
  __typename?: 'PayloadKvDocAccessFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_data_Update = {
  __typename?: 'PayloadKvDocAccessFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_key = {
  __typename?: 'PayloadKvDocAccessFields_key';
  create?: Maybe<PayloadKvDocAccessFields_key_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_key_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_key_Read>;
  update?: Maybe<PayloadKvDocAccessFields_key_Update>;
};

export type PayloadKvDocAccessFields_key_Create = {
  __typename?: 'PayloadKvDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_key_Delete = {
  __typename?: 'PayloadKvDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_key_Read = {
  __typename?: 'PayloadKvDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_key_Update = {
  __typename?: 'PayloadKvDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields = {
  __typename?: 'PayloadKvFields';
  data?: Maybe<PayloadKvFields_data>;
  key?: Maybe<PayloadKvFields_key>;
};

export type PayloadKvFields_data = {
  __typename?: 'PayloadKvFields_data';
  create?: Maybe<PayloadKvFields_data_Create>;
  delete?: Maybe<PayloadKvFields_data_Delete>;
  read?: Maybe<PayloadKvFields_data_Read>;
  update?: Maybe<PayloadKvFields_data_Update>;
};

export type PayloadKvFields_data_Create = {
  __typename?: 'PayloadKvFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_data_Delete = {
  __typename?: 'PayloadKvFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_data_Read = {
  __typename?: 'PayloadKvFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_data_Update = {
  __typename?: 'PayloadKvFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_key = {
  __typename?: 'PayloadKvFields_key';
  create?: Maybe<PayloadKvFields_key_Create>;
  delete?: Maybe<PayloadKvFields_key_Delete>;
  read?: Maybe<PayloadKvFields_key_Read>;
  update?: Maybe<PayloadKvFields_key_Update>;
};

export type PayloadKvFields_key_Create = {
  __typename?: 'PayloadKvFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_key_Delete = {
  __typename?: 'PayloadKvFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_key_Read = {
  __typename?: 'PayloadKvFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_key_Update = {
  __typename?: 'PayloadKvFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvReadAccess = {
  __typename?: 'PayloadKvReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvReadDocAccess = {
  __typename?: 'PayloadKvReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateAccess = {
  __typename?: 'PayloadKvUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateDocAccess = {
  __typename?: 'PayloadKvUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKv_data_operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadKv_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_key_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_where_or>>>;
  data?: InputMaybe<PayloadKv_data_operator>;
  id?: InputMaybe<PayloadKv_id_operator>;
  key?: InputMaybe<PayloadKv_key_operator>;
};

export type PayloadKv_where_and = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_where_or>>>;
  data?: InputMaybe<PayloadKv_data_operator>;
  id?: InputMaybe<PayloadKv_id_operator>;
  key?: InputMaybe<PayloadKv_key_operator>;
};

export type PayloadKv_where_or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_where_or>>>;
  data?: InputMaybe<PayloadKv_data_operator>;
  id?: InputMaybe<PayloadKv_id_operator>;
  key?: InputMaybe<PayloadKv_key_operator>;
};

export type PayloadKvs = {
  __typename?: 'PayloadKvs';
  docs: Array<PayloadKv>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocument = {
  __typename?: 'PayloadLockedDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  document?: Maybe<PayloadLockedDocument_Document_Relationship>;
  globalSlug?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: PayloadLockedDocument_User_Relationship;
};

export type PayloadLockedDocumentUpdate_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo {
  accounts = 'accounts',
  ai_usages = 'ai_usages',
  categories = 'categories',
  media = 'media',
  oauth_accounts = 'oauth_accounts',
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  people = 'people',
  reminders = 'reminders',
  tags = 'tags',
  transactions = 'transactions',
  user_settings = 'user_settings',
  users = 'users'
}

export type PayloadLockedDocumentUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadLockedDocument_Document = Account | AiUsage | Category | Media | OauthAccount | PayloadMcpApiKey | Person | Reminder | Tag | Transaction | User | UserSetting;

export type PayloadLockedDocument_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_DocumentRelationshipInputRelationTo {
  accounts = 'accounts',
  ai_usages = 'ai_usages',
  categories = 'categories',
  media = 'media',
  oauth_accounts = 'oauth_accounts',
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  people = 'people',
  reminders = 'reminders',
  tags = 'tags',
  transactions = 'transactions',
  user_settings = 'user_settings',
  users = 'users'
}

export enum PayloadLockedDocument_Document_RelationTo {
  accounts = 'accounts',
  ai_usages = 'ai_usages',
  categories = 'categories',
  media = 'media',
  oauth_accounts = 'oauth_accounts',
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  people = 'people',
  reminders = 'reminders',
  tags = 'tags',
  transactions = 'transactions',
  user_settings = 'user_settings',
  users = 'users'
}

export type PayloadLockedDocument_Document_Relationship = {
  __typename?: 'PayloadLockedDocument_Document_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_Document_RelationTo>;
  value?: Maybe<PayloadLockedDocument_Document>;
};

export type PayloadLockedDocument_User = PayloadMcpApiKey | User;

export type PayloadLockedDocument_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_UserRelationshipInputRelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export enum PayloadLockedDocument_User_RelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadLockedDocument_User_Relationship = {
  __typename?: 'PayloadLockedDocument_User_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_User_RelationTo>;
  value?: Maybe<PayloadLockedDocument_User>;
};

export type PayloadLockedDocument_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_document_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_document_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_document_Relation_RelationTo {
  accounts = 'accounts',
  ai_usages = 'ai_usages',
  categories = 'categories',
  media = 'media',
  oauth_accounts = 'oauth_accounts',
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  people = 'people',
  reminders = 'reminders',
  tags = 'tags',
  transactions = 'transactions',
  user_settings = 'user_settings',
  users = 'users'
}

export type PayloadLockedDocument_globalSlug_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_user_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_user_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_user_Relation_RelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadLockedDocument_where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_createdAt_operator>;
  document?: InputMaybe<PayloadLockedDocument_document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_globalSlug_operator>;
  id?: InputMaybe<PayloadLockedDocument_id_operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_updatedAt_operator>;
  user?: InputMaybe<PayloadLockedDocument_user_Relation>;
};

export type PayloadLockedDocument_where_and = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_createdAt_operator>;
  document?: InputMaybe<PayloadLockedDocument_document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_globalSlug_operator>;
  id?: InputMaybe<PayloadLockedDocument_id_operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_updatedAt_operator>;
  user?: InputMaybe<PayloadLockedDocument_user_Relation>;
};

export type PayloadLockedDocument_where_or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_where_or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_createdAt_operator>;
  document?: InputMaybe<PayloadLockedDocument_document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_globalSlug_operator>;
  id?: InputMaybe<PayloadLockedDocument_id_operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_updatedAt_operator>;
  user?: InputMaybe<PayloadLockedDocument_user_Relation>;
};

export type PayloadLockedDocuments = {
  __typename?: 'PayloadLockedDocuments';
  docs: Array<PayloadLockedDocument>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocumentsCreateAccess = {
  __typename?: 'PayloadLockedDocumentsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsCreateDocAccess = {
  __typename?: 'PayloadLockedDocumentsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteDocAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDocAccessFields = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields';
  createdAt?: Maybe<PayloadLockedDocumentsDocAccessFields_createdAt>;
  document?: Maybe<PayloadLockedDocumentsDocAccessFields_document>;
  globalSlug?: Maybe<PayloadLockedDocumentsDocAccessFields_globalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsDocAccessFields_updatedAt>;
  user?: Maybe<PayloadLockedDocumentsDocAccessFields_user>;
};

export type PayloadLockedDocumentsDocAccessFields_createdAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_createdAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_createdAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_createdAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_createdAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_createdAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_createdAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_createdAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_createdAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_document = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_document_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_document_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_document_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_document_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_document_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_document_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_document_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_document_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_globalSlug = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_globalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_globalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_globalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_globalSlug_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_globalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_globalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_globalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_globalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_updatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_updatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_updatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_updatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_updatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_updatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_updatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_user = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_user_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_user_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_user_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_user_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_user_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_user_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_user_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_user_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields = {
  __typename?: 'PayloadLockedDocumentsFields';
  createdAt?: Maybe<PayloadLockedDocumentsFields_createdAt>;
  document?: Maybe<PayloadLockedDocumentsFields_document>;
  globalSlug?: Maybe<PayloadLockedDocumentsFields_globalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsFields_updatedAt>;
  user?: Maybe<PayloadLockedDocumentsFields_user>;
};

export type PayloadLockedDocumentsFields_createdAt = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsFields_createdAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_createdAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_createdAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_createdAt_Update>;
};

export type PayloadLockedDocumentsFields_createdAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_createdAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_createdAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_createdAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_document = {
  __typename?: 'PayloadLockedDocumentsFields_document';
  create?: Maybe<PayloadLockedDocumentsFields_document_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_document_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_document_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_document_Update>;
};

export type PayloadLockedDocumentsFields_document_Create = {
  __typename?: 'PayloadLockedDocumentsFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_document_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_document_Read = {
  __typename?: 'PayloadLockedDocumentsFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_document_Update = {
  __typename?: 'PayloadLockedDocumentsFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_globalSlug = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsFields_globalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_globalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_globalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_globalSlug_Update>;
};

export type PayloadLockedDocumentsFields_globalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_globalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_globalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_globalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_updatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsFields_updatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_updatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_updatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_updatedAt_Update>;
};

export type PayloadLockedDocumentsFields_updatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_updatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_updatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_updatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_user = {
  __typename?: 'PayloadLockedDocumentsFields_user';
  create?: Maybe<PayloadLockedDocumentsFields_user_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_user_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_user_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_user_Update>;
};

export type PayloadLockedDocumentsFields_user_Create = {
  __typename?: 'PayloadLockedDocumentsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_user_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_user_Read = {
  __typename?: 'PayloadLockedDocumentsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_user_Update = {
  __typename?: 'PayloadLockedDocumentsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsReadAccess = {
  __typename?: 'PayloadLockedDocumentsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsReadDocAccess = {
  __typename?: 'PayloadLockedDocumentsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateDocAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKey = {
  __typename?: 'PayloadMcpApiKey';
  accounts?: Maybe<PayloadMcpApiKey_Accounts>;
  apiKey?: Maybe<Scalars['String']['output']>;
  apiKeyIndex?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<PayloadMcpApiKey_Categories>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enableAPIKey?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  media?: Maybe<PayloadMcpApiKey_Media>;
  payload_mcp_resource?: Maybe<PayloadMcpApiKey_PayloadMcpResource>;
  payload_mcp_tool?: Maybe<PayloadMcpApiKey_PayloadMcpTool>;
  people?: Maybe<PayloadMcpApiKey_People>;
  reminders?: Maybe<PayloadMcpApiKey_Reminders>;
  tags?: Maybe<PayloadMcpApiKey_Tags>;
  transactions?: Maybe<PayloadMcpApiKey_Transactions>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userSettings?: Maybe<PayloadMcpApiKey_UserSettings>;
  users?: Maybe<PayloadMcpApiKey_Users>;
};

export type PayloadMcpApiKey_Accounts = {
  __typename?: 'PayloadMcpApiKey_Accounts';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Categories = {
  __typename?: 'PayloadMcpApiKey_Categories';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Media = {
  __typename?: 'PayloadMcpApiKey_Media';
  find?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_PayloadMcpResource = {
  __typename?: 'PayloadMcpApiKey_PayloadMcpResource';
  currencies?: Maybe<Scalars['Boolean']['output']>;
  currency?: Maybe<Scalars['Boolean']['output']>;
  timezone?: Maybe<Scalars['Boolean']['output']>;
  timezones?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_PayloadMcpTool = {
  __typename?: 'PayloadMcpApiKey_PayloadMcpTool';
  getDashboardSummary?: Maybe<Scalars['Boolean']['output']>;
  getMonthlyCategories?: Maybe<Scalars['Boolean']['output']>;
  getMonthlyPeople?: Maybe<Scalars['Boolean']['output']>;
  getMonthlyTags?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_People = {
  __typename?: 'PayloadMcpApiKey_People';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Reminders = {
  __typename?: 'PayloadMcpApiKey_Reminders';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Tags = {
  __typename?: 'PayloadMcpApiKey_Tags';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Transactions = {
  __typename?: 'PayloadMcpApiKey_Transactions';
  create?: Maybe<Scalars['Boolean']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_UserSettings = {
  __typename?: 'PayloadMcpApiKey_UserSettings';
  find?: Maybe<Scalars['Boolean']['output']>;
  update?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_Users = {
  __typename?: 'PayloadMcpApiKey_Users';
  find?: Maybe<Scalars['Boolean']['output']>;
};

export type PayloadMcpApiKey_accounts__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_accounts__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_accounts__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_accounts__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_apiKey_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_categories__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_categories__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_categories__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_categories__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadMcpApiKey_description_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_enableAPIKey_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_label_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_media__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_resource__currencies_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_resource__currency_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_resource__timezone_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_resource__timezones_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_tool__getDashboardSummary_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_tool__getMonthlyCategories_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_tool__getMonthlyPeople_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_payload_mcp_tool__getMonthlyTags_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_people__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_people__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_people__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_people__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_reminders__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_reminders__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_reminders__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_reminders__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_tags__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_tags__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_tags__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_tags__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_transactions__create_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_transactions__delete_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_transactions__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_transactions__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadMcpApiKey_userSettings__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_userSettings__update_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type PayloadMcpApiKey_users__find_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_accounts__create_operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_accounts__delete_operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_accounts__find_operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_accounts__update_operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_apiKey_operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_categories__create_operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_categories__delete_operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_categories__find_operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_categories__update_operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_createdAt_operator>;
  description?: InputMaybe<PayloadMcpApiKey_description_operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_enableAPIKey_operator>;
  id?: InputMaybe<PayloadMcpApiKey_id_operator>;
  label?: InputMaybe<PayloadMcpApiKey_label_operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_media__find_operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currencies_operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currency_operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezone_operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezones_operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getDashboardSummary_operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyCategories_operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyPeople_operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyTags_operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_people__create_operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_people__delete_operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_people__find_operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_people__update_operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_reminders__create_operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_reminders__delete_operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_reminders__find_operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_reminders__update_operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_tags__create_operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_tags__delete_operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_tags__find_operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_tags__update_operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_transactions__create_operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_transactions__delete_operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_transactions__find_operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_transactions__update_operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_updatedAt_operator>;
  user?: InputMaybe<PayloadMcpApiKey_user_operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_userSettings__find_operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_userSettings__update_operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_users__find_operator>;
};

export type PayloadMcpApiKey_where_and = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_accounts__create_operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_accounts__delete_operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_accounts__find_operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_accounts__update_operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_apiKey_operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_categories__create_operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_categories__delete_operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_categories__find_operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_categories__update_operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_createdAt_operator>;
  description?: InputMaybe<PayloadMcpApiKey_description_operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_enableAPIKey_operator>;
  id?: InputMaybe<PayloadMcpApiKey_id_operator>;
  label?: InputMaybe<PayloadMcpApiKey_label_operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_media__find_operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currencies_operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currency_operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezone_operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezones_operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getDashboardSummary_operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyCategories_operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyPeople_operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyTags_operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_people__create_operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_people__delete_operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_people__find_operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_people__update_operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_reminders__create_operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_reminders__delete_operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_reminders__find_operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_reminders__update_operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_tags__create_operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_tags__delete_operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_tags__find_operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_tags__update_operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_transactions__create_operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_transactions__delete_operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_transactions__find_operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_transactions__update_operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_updatedAt_operator>;
  user?: InputMaybe<PayloadMcpApiKey_user_operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_userSettings__find_operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_userSettings__update_operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_users__find_operator>;
};

export type PayloadMcpApiKey_where_or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_where_or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_accounts__create_operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_accounts__delete_operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_accounts__find_operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_accounts__update_operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_apiKey_operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_categories__create_operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_categories__delete_operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_categories__find_operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_categories__update_operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_createdAt_operator>;
  description?: InputMaybe<PayloadMcpApiKey_description_operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_enableAPIKey_operator>;
  id?: InputMaybe<PayloadMcpApiKey_id_operator>;
  label?: InputMaybe<PayloadMcpApiKey_label_operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_media__find_operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currencies_operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__currency_operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezone_operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_payload_mcp_resource__timezones_operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getDashboardSummary_operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyCategories_operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyPeople_operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_payload_mcp_tool__getMonthlyTags_operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_people__create_operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_people__delete_operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_people__find_operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_people__update_operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_reminders__create_operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_reminders__delete_operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_reminders__find_operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_reminders__update_operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_tags__create_operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_tags__delete_operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_tags__find_operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_tags__update_operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_transactions__create_operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_transactions__delete_operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_transactions__find_operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_transactions__update_operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_updatedAt_operator>;
  user?: InputMaybe<PayloadMcpApiKey_user_operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_userSettings__find_operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_userSettings__update_operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_users__find_operator>;
};

export type PayloadMcpApiKeys = {
  __typename?: 'PayloadMcpApiKeys';
  docs: Array<PayloadMcpApiKey>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadMcpApiKeysCreateAccess = {
  __typename?: 'PayloadMcpApiKeysCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysCreateDocAccess = {
  __typename?: 'PayloadMcpApiKeysCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysDeleteAccess = {
  __typename?: 'PayloadMcpApiKeysDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysDeleteDocAccess = {
  __typename?: 'PayloadMcpApiKeysDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysDocAccessFields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields';
  accounts?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts>;
  apiKey?: Maybe<PayloadMcpApiKeysDocAccessFields_apiKey>;
  categories?: Maybe<PayloadMcpApiKeysDocAccessFields_categories>;
  createdAt?: Maybe<PayloadMcpApiKeysDocAccessFields_createdAt>;
  description?: Maybe<PayloadMcpApiKeysDocAccessFields_description>;
  enableAPIKey?: Maybe<PayloadMcpApiKeysDocAccessFields_enableAPIKey>;
  label?: Maybe<PayloadMcpApiKeysDocAccessFields_label>;
  media?: Maybe<PayloadMcpApiKeysDocAccessFields_media>;
  payload_mcp_resource?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource>;
  payload_mcp_tool?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool>;
  people?: Maybe<PayloadMcpApiKeysDocAccessFields_people>;
  reminders?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders>;
  tags?: Maybe<PayloadMcpApiKeysDocAccessFields_tags>;
  transactions?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions>;
  updatedAt?: Maybe<PayloadMcpApiKeysDocAccessFields_updatedAt>;
  user?: Maybe<PayloadMcpApiKeysDocAccessFields_user>;
  userSettings?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings>;
  users?: Maybe<PayloadMcpApiKeysDocAccessFields_users>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_accounts_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_accounts_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_accounts_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_apiKey = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_apiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_apiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_apiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_apiKey_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_apiKey_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_apiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_apiKey_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_apiKey_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_categories_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_categories_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_categories_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_createdAt = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_createdAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_createdAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_createdAt_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_createdAt_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_createdAt_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_createdAt_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_createdAt_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_createdAt_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_description = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_description_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_description_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_description_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_description_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_description_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_description_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_description_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_description_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_enableAPIKey = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_enableAPIKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_enableAPIKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_enableAPIKey_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_enableAPIKey_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_enableAPIKey_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_enableAPIKey_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_enableAPIKey_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_enableAPIKey_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_label = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_label_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_label_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_label_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_label_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_label_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_label_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_label_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_label_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_media_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_media_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_media_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_media_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_media_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_media_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_media_find>;
};

export type PayloadMcpApiKeysDocAccessFields_media_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_media_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_media_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_media_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_media_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_media_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_media_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Fields';
  currencies?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies>;
  currency?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency>;
  timezone?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone>;
  timezones?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Fields';
  getDashboardSummary?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary>;
  getMonthlyCategories?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories>;
  getMonthlyPeople?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople>;
  getMonthlyTags?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_people_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_people_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_people_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_people_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_people_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_people_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_people_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_people_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_people_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_people_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_people_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_people_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_reminders_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_reminders_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_reminders_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_tags_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_tags_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_tags_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_transactions_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_transactions_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_transactions_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_updatedAt = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_updatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_updatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_updatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_updatedAt_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_updatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_updatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_updatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_updatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_user = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_user_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_user_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_user_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_user_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_userSettings = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_update>;
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_userSettings_update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_userSettings_update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_user_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_user_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_user_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_user_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_users_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_users_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_users_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_users_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_users_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_users_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_users_find>;
};

export type PayloadMcpApiKeysDocAccessFields_users_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_users_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_users_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_users_find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_users_find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_users_find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_users_find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields = {
  __typename?: 'PayloadMcpApiKeysFields';
  accounts?: Maybe<PayloadMcpApiKeysFields_accounts>;
  apiKey?: Maybe<PayloadMcpApiKeysFields_apiKey>;
  categories?: Maybe<PayloadMcpApiKeysFields_categories>;
  createdAt?: Maybe<PayloadMcpApiKeysFields_createdAt>;
  description?: Maybe<PayloadMcpApiKeysFields_description>;
  enableAPIKey?: Maybe<PayloadMcpApiKeysFields_enableAPIKey>;
  label?: Maybe<PayloadMcpApiKeysFields_label>;
  media?: Maybe<PayloadMcpApiKeysFields_media>;
  payload_mcp_resource?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource>;
  payload_mcp_tool?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool>;
  people?: Maybe<PayloadMcpApiKeysFields_people>;
  reminders?: Maybe<PayloadMcpApiKeysFields_reminders>;
  tags?: Maybe<PayloadMcpApiKeysFields_tags>;
  transactions?: Maybe<PayloadMcpApiKeysFields_transactions>;
  updatedAt?: Maybe<PayloadMcpApiKeysFields_updatedAt>;
  user?: Maybe<PayloadMcpApiKeysFields_user>;
  userSettings?: Maybe<PayloadMcpApiKeysFields_userSettings>;
  users?: Maybe<PayloadMcpApiKeysFields_users>;
};

export type PayloadMcpApiKeysFields_accounts = {
  __typename?: 'PayloadMcpApiKeysFields_accounts';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_accounts_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_accounts_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_Update>;
};

export type PayloadMcpApiKeysFields_accounts_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_accounts_find>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_update>;
};

export type PayloadMcpApiKeysFields_accounts_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_accounts_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_create_Update>;
};

export type PayloadMcpApiKeysFields_accounts_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_accounts_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_delete_Update>;
};

export type PayloadMcpApiKeysFields_accounts_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_find = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_accounts_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_find_Update>;
};

export type PayloadMcpApiKeysFields_accounts_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update';
  create?: Maybe<PayloadMcpApiKeysFields_accounts_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_accounts_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_accounts_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_accounts_update_Update>;
};

export type PayloadMcpApiKeysFields_accounts_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_accounts_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_apiKey = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey';
  create?: Maybe<PayloadMcpApiKeysFields_apiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_apiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_apiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_apiKey_Update>;
};

export type PayloadMcpApiKeysFields_apiKey_Create = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_apiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_apiKey_Read = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_apiKey_Update = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories = {
  __typename?: 'PayloadMcpApiKeysFields_categories';
  create?: Maybe<PayloadMcpApiKeysFields_categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_categories_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_categories_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_Update>;
};

export type PayloadMcpApiKeysFields_categories_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_categories_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_categories_find>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_update>;
};

export type PayloadMcpApiKeysFields_categories_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create';
  create?: Maybe<PayloadMcpApiKeysFields_categories_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_categories_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_create_Update>;
};

export type PayloadMcpApiKeysFields_categories_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete';
  create?: Maybe<PayloadMcpApiKeysFields_categories_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_categories_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_delete_Update>;
};

export type PayloadMcpApiKeysFields_categories_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_find = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find';
  create?: Maybe<PayloadMcpApiKeysFields_categories_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_categories_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_find_Update>;
};

export type PayloadMcpApiKeysFields_categories_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update';
  create?: Maybe<PayloadMcpApiKeysFields_categories_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_categories_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_categories_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_categories_update_Update>;
};

export type PayloadMcpApiKeysFields_categories_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_categories_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_createdAt = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt';
  create?: Maybe<PayloadMcpApiKeysFields_createdAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_createdAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_createdAt_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_createdAt_Update>;
};

export type PayloadMcpApiKeysFields_createdAt_Create = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_createdAt_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_createdAt_Read = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_createdAt_Update = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_description = {
  __typename?: 'PayloadMcpApiKeysFields_description';
  create?: Maybe<PayloadMcpApiKeysFields_description_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_description_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_description_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_description_Update>;
};

export type PayloadMcpApiKeysFields_description_Create = {
  __typename?: 'PayloadMcpApiKeysFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_description_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_description_Read = {
  __typename?: 'PayloadMcpApiKeysFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_description_Update = {
  __typename?: 'PayloadMcpApiKeysFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_enableAPIKey = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey';
  create?: Maybe<PayloadMcpApiKeysFields_enableAPIKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_enableAPIKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_enableAPIKey_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_enableAPIKey_Update>;
};

export type PayloadMcpApiKeysFields_enableAPIKey_Create = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_enableAPIKey_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_enableAPIKey_Read = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_enableAPIKey_Update = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_label = {
  __typename?: 'PayloadMcpApiKeysFields_label';
  create?: Maybe<PayloadMcpApiKeysFields_label_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_label_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_label_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_label_Update>;
};

export type PayloadMcpApiKeysFields_label_Create = {
  __typename?: 'PayloadMcpApiKeysFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_label_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_label_Read = {
  __typename?: 'PayloadMcpApiKeysFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_label_Update = {
  __typename?: 'PayloadMcpApiKeysFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media = {
  __typename?: 'PayloadMcpApiKeysFields_media';
  create?: Maybe<PayloadMcpApiKeysFields_media_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_media_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_media_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_media_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_media_Update>;
};

export type PayloadMcpApiKeysFields_media_Create = {
  __typename?: 'PayloadMcpApiKeysFields_media_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_media_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_media_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_media_find>;
};

export type PayloadMcpApiKeysFields_media_Read = {
  __typename?: 'PayloadMcpApiKeysFields_media_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_Update = {
  __typename?: 'PayloadMcpApiKeysFields_media_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_find = {
  __typename?: 'PayloadMcpApiKeysFields_media_find';
  create?: Maybe<PayloadMcpApiKeysFields_media_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_media_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_media_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_media_find_Update>;
};

export type PayloadMcpApiKeysFields_media_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_media_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Fields';
  currencies?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currencies>;
  currency?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currency>;
  timezone?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezone>;
  timezones?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezones>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currencies = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currency = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currency_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currency_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currency_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_currency_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currency_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currency_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currency_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_currency_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezone = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezones = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Fields';
  getDashboardSummary?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary>;
  getMonthlyCategories?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories>;
  getMonthlyPeople?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople>;
  getMonthlyTags?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags';
  create?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Update>;
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people = {
  __typename?: 'PayloadMcpApiKeysFields_people';
  create?: Maybe<PayloadMcpApiKeysFields_people_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_people_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_people_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_people_Update>;
};

export type PayloadMcpApiKeysFields_people_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_people_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_people_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_people_find>;
  update?: Maybe<PayloadMcpApiKeysFields_people_update>;
};

export type PayloadMcpApiKeysFields_people_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_create = {
  __typename?: 'PayloadMcpApiKeysFields_people_create';
  create?: Maybe<PayloadMcpApiKeysFields_people_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_people_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_people_create_Update>;
};

export type PayloadMcpApiKeysFields_people_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete';
  create?: Maybe<PayloadMcpApiKeysFields_people_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_people_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_people_delete_Update>;
};

export type PayloadMcpApiKeysFields_people_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_find = {
  __typename?: 'PayloadMcpApiKeysFields_people_find';
  create?: Maybe<PayloadMcpApiKeysFields_people_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_people_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_people_find_Update>;
};

export type PayloadMcpApiKeysFields_people_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_update = {
  __typename?: 'PayloadMcpApiKeysFields_people_update';
  create?: Maybe<PayloadMcpApiKeysFields_people_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_people_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_people_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_people_update_Update>;
};

export type PayloadMcpApiKeysFields_people_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_people_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders = {
  __typename?: 'PayloadMcpApiKeysFields_reminders';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_reminders_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_reminders_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_Update>;
};

export type PayloadMcpApiKeysFields_reminders_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_reminders_find>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_update>;
};

export type PayloadMcpApiKeysFields_reminders_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_reminders_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_create_Update>;
};

export type PayloadMcpApiKeysFields_reminders_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_reminders_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_delete_Update>;
};

export type PayloadMcpApiKeysFields_reminders_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_find = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_reminders_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_find_Update>;
};

export type PayloadMcpApiKeysFields_reminders_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update';
  create?: Maybe<PayloadMcpApiKeysFields_reminders_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_reminders_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_reminders_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_reminders_update_Update>;
};

export type PayloadMcpApiKeysFields_reminders_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_reminders_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags = {
  __typename?: 'PayloadMcpApiKeysFields_tags';
  create?: Maybe<PayloadMcpApiKeysFields_tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_tags_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_tags_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_Update>;
};

export type PayloadMcpApiKeysFields_tags_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_tags_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_tags_find>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_update>;
};

export type PayloadMcpApiKeysFields_tags_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create';
  create?: Maybe<PayloadMcpApiKeysFields_tags_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_tags_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_create_Update>;
};

export type PayloadMcpApiKeysFields_tags_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete';
  create?: Maybe<PayloadMcpApiKeysFields_tags_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_tags_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_delete_Update>;
};

export type PayloadMcpApiKeysFields_tags_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_find = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find';
  create?: Maybe<PayloadMcpApiKeysFields_tags_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_tags_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_find_Update>;
};

export type PayloadMcpApiKeysFields_tags_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update';
  create?: Maybe<PayloadMcpApiKeysFields_tags_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_tags_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_tags_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_tags_update_Update>;
};

export type PayloadMcpApiKeysFields_tags_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_tags_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions = {
  __typename?: 'PayloadMcpApiKeysFields_transactions';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_transactions_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_transactions_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_Update>;
};

export type PayloadMcpApiKeysFields_transactions_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_delete>;
  find?: Maybe<PayloadMcpApiKeysFields_transactions_find>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_update>;
};

export type PayloadMcpApiKeysFields_transactions_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_transactions_create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_create_Update>;
};

export type PayloadMcpApiKeysFields_transactions_create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_transactions_delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_delete_Update>;
};

export type PayloadMcpApiKeysFields_transactions_delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_find = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_transactions_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_find_Update>;
};

export type PayloadMcpApiKeysFields_transactions_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update';
  create?: Maybe<PayloadMcpApiKeysFields_transactions_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_transactions_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_transactions_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_transactions_update_Update>;
};

export type PayloadMcpApiKeysFields_transactions_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_transactions_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_updatedAt = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt';
  create?: Maybe<PayloadMcpApiKeysFields_updatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_updatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_updatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_updatedAt_Update>;
};

export type PayloadMcpApiKeysFields_updatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_updatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_updatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_updatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_user = {
  __typename?: 'PayloadMcpApiKeysFields_user';
  create?: Maybe<PayloadMcpApiKeysFields_user_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_user_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_user_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_user_Update>;
};

export type PayloadMcpApiKeysFields_userSettings = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings';
  create?: Maybe<PayloadMcpApiKeysFields_userSettings_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_userSettings_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_userSettings_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_userSettings_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_userSettings_Update>;
};

export type PayloadMcpApiKeysFields_userSettings_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_userSettings_find>;
  update?: Maybe<PayloadMcpApiKeysFields_userSettings_update>;
};

export type PayloadMcpApiKeysFields_userSettings_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_find = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find';
  create?: Maybe<PayloadMcpApiKeysFields_userSettings_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_userSettings_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_userSettings_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_userSettings_find_Update>;
};

export type PayloadMcpApiKeysFields_userSettings_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update';
  create?: Maybe<PayloadMcpApiKeysFields_userSettings_update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_userSettings_update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_userSettings_update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_userSettings_update_Update>;
};

export type PayloadMcpApiKeysFields_userSettings_update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_userSettings_update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_user_Create = {
  __typename?: 'PayloadMcpApiKeysFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_user_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_user_Read = {
  __typename?: 'PayloadMcpApiKeysFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_user_Update = {
  __typename?: 'PayloadMcpApiKeysFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users = {
  __typename?: 'PayloadMcpApiKeysFields_users';
  create?: Maybe<PayloadMcpApiKeysFields_users_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_users_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_users_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_users_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_users_Update>;
};

export type PayloadMcpApiKeysFields_users_Create = {
  __typename?: 'PayloadMcpApiKeysFields_users_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_users_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_users_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_users_find>;
};

export type PayloadMcpApiKeysFields_users_Read = {
  __typename?: 'PayloadMcpApiKeysFields_users_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_Update = {
  __typename?: 'PayloadMcpApiKeysFields_users_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_find = {
  __typename?: 'PayloadMcpApiKeysFields_users_find';
  create?: Maybe<PayloadMcpApiKeysFields_users_find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_users_find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_users_find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_users_find_Update>;
};

export type PayloadMcpApiKeysFields_users_find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_users_find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysReadAccess = {
  __typename?: 'PayloadMcpApiKeysReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysReadDocAccess = {
  __typename?: 'PayloadMcpApiKeysReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysUnlockAccess = {
  __typename?: 'PayloadMcpApiKeysUnlockAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysUnlockDocAccess = {
  __typename?: 'PayloadMcpApiKeysUnlockDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysUpdateAccess = {
  __typename?: 'PayloadMcpApiKeysUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadMcpApiKeysUpdateDocAccess = {
  __typename?: 'PayloadMcpApiKeysUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreference = {
  __typename?: 'PayloadPreference';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  key?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: PayloadPreference_User_Relationship;
  value?: Maybe<Scalars['JSON']['output']>;
};

export type PayloadPreferenceUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreferenceUpdate_UserRelationshipInputRelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadPreference_User = PayloadMcpApiKey | User;

export type PayloadPreference_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreference_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_UserRelationshipInputRelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export enum PayloadPreference_User_RelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadPreference_User_Relationship = {
  __typename?: 'PayloadPreference_User_Relationship';
  relationTo?: Maybe<PayloadPreference_User_RelationTo>;
  value?: Maybe<PayloadPreference_User>;
};

export type PayloadPreference_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_key_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_user_Relation = {
  relationTo?: InputMaybe<PayloadPreference_user_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_user_Relation_RelationTo {
  payload_mcp_api_keys = 'payload_mcp_api_keys',
  users = 'users'
}

export type PayloadPreference_value_operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadPreference_where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_where_or>>>;
  createdAt?: InputMaybe<PayloadPreference_createdAt_operator>;
  id?: InputMaybe<PayloadPreference_id_operator>;
  key?: InputMaybe<PayloadPreference_key_operator>;
  updatedAt?: InputMaybe<PayloadPreference_updatedAt_operator>;
  user?: InputMaybe<PayloadPreference_user_Relation>;
  value?: InputMaybe<PayloadPreference_value_operator>;
};

export type PayloadPreference_where_and = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_where_or>>>;
  createdAt?: InputMaybe<PayloadPreference_createdAt_operator>;
  id?: InputMaybe<PayloadPreference_id_operator>;
  key?: InputMaybe<PayloadPreference_key_operator>;
  updatedAt?: InputMaybe<PayloadPreference_updatedAt_operator>;
  user?: InputMaybe<PayloadPreference_user_Relation>;
  value?: InputMaybe<PayloadPreference_value_operator>;
};

export type PayloadPreference_where_or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_where_or>>>;
  createdAt?: InputMaybe<PayloadPreference_createdAt_operator>;
  id?: InputMaybe<PayloadPreference_id_operator>;
  key?: InputMaybe<PayloadPreference_key_operator>;
  updatedAt?: InputMaybe<PayloadPreference_updatedAt_operator>;
  user?: InputMaybe<PayloadPreference_user_Relation>;
  value?: InputMaybe<PayloadPreference_value_operator>;
};

export type PayloadPreferences = {
  __typename?: 'PayloadPreferences';
  docs: Array<PayloadPreference>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadPreferencesCreateAccess = {
  __typename?: 'PayloadPreferencesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesCreateDocAccess = {
  __typename?: 'PayloadPreferencesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteAccess = {
  __typename?: 'PayloadPreferencesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteDocAccess = {
  __typename?: 'PayloadPreferencesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDocAccessFields = {
  __typename?: 'PayloadPreferencesDocAccessFields';
  createdAt?: Maybe<PayloadPreferencesDocAccessFields_createdAt>;
  key?: Maybe<PayloadPreferencesDocAccessFields_key>;
  updatedAt?: Maybe<PayloadPreferencesDocAccessFields_updatedAt>;
  user?: Maybe<PayloadPreferencesDocAccessFields_user>;
  value?: Maybe<PayloadPreferencesDocAccessFields_value>;
};

export type PayloadPreferencesDocAccessFields_createdAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_createdAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_createdAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_createdAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_createdAt_Update>;
};

export type PayloadPreferencesDocAccessFields_createdAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_createdAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_createdAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_createdAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_key = {
  __typename?: 'PayloadPreferencesDocAccessFields_key';
  create?: Maybe<PayloadPreferencesDocAccessFields_key_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_key_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_key_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_key_Update>;
};

export type PayloadPreferencesDocAccessFields_key_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_key_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_key_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_key_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_updatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_updatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_updatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_updatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_updatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_updatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_updatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_updatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_updatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_user = {
  __typename?: 'PayloadPreferencesDocAccessFields_user';
  create?: Maybe<PayloadPreferencesDocAccessFields_user_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_user_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_user_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_user_Update>;
};

export type PayloadPreferencesDocAccessFields_user_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_user_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_user_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_user_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_value = {
  __typename?: 'PayloadPreferencesDocAccessFields_value';
  create?: Maybe<PayloadPreferencesDocAccessFields_value_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_value_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_value_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_value_Update>;
};

export type PayloadPreferencesDocAccessFields_value_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_value_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_value_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_value_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields = {
  __typename?: 'PayloadPreferencesFields';
  createdAt?: Maybe<PayloadPreferencesFields_createdAt>;
  key?: Maybe<PayloadPreferencesFields_key>;
  updatedAt?: Maybe<PayloadPreferencesFields_updatedAt>;
  user?: Maybe<PayloadPreferencesFields_user>;
  value?: Maybe<PayloadPreferencesFields_value>;
};

export type PayloadPreferencesFields_createdAt = {
  __typename?: 'PayloadPreferencesFields_createdAt';
  create?: Maybe<PayloadPreferencesFields_createdAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_createdAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_createdAt_Read>;
  update?: Maybe<PayloadPreferencesFields_createdAt_Update>;
};

export type PayloadPreferencesFields_createdAt_Create = {
  __typename?: 'PayloadPreferencesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_createdAt_Delete = {
  __typename?: 'PayloadPreferencesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_createdAt_Read = {
  __typename?: 'PayloadPreferencesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_createdAt_Update = {
  __typename?: 'PayloadPreferencesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_key = {
  __typename?: 'PayloadPreferencesFields_key';
  create?: Maybe<PayloadPreferencesFields_key_Create>;
  delete?: Maybe<PayloadPreferencesFields_key_Delete>;
  read?: Maybe<PayloadPreferencesFields_key_Read>;
  update?: Maybe<PayloadPreferencesFields_key_Update>;
};

export type PayloadPreferencesFields_key_Create = {
  __typename?: 'PayloadPreferencesFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_key_Delete = {
  __typename?: 'PayloadPreferencesFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_key_Read = {
  __typename?: 'PayloadPreferencesFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_key_Update = {
  __typename?: 'PayloadPreferencesFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_updatedAt = {
  __typename?: 'PayloadPreferencesFields_updatedAt';
  create?: Maybe<PayloadPreferencesFields_updatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_updatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_updatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_updatedAt_Update>;
};

export type PayloadPreferencesFields_updatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_updatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_updatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_updatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_user = {
  __typename?: 'PayloadPreferencesFields_user';
  create?: Maybe<PayloadPreferencesFields_user_Create>;
  delete?: Maybe<PayloadPreferencesFields_user_Delete>;
  read?: Maybe<PayloadPreferencesFields_user_Read>;
  update?: Maybe<PayloadPreferencesFields_user_Update>;
};

export type PayloadPreferencesFields_user_Create = {
  __typename?: 'PayloadPreferencesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_user_Delete = {
  __typename?: 'PayloadPreferencesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_user_Read = {
  __typename?: 'PayloadPreferencesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_user_Update = {
  __typename?: 'PayloadPreferencesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_value = {
  __typename?: 'PayloadPreferencesFields_value';
  create?: Maybe<PayloadPreferencesFields_value_Create>;
  delete?: Maybe<PayloadPreferencesFields_value_Delete>;
  read?: Maybe<PayloadPreferencesFields_value_Read>;
  update?: Maybe<PayloadPreferencesFields_value_Update>;
};

export type PayloadPreferencesFields_value_Create = {
  __typename?: 'PayloadPreferencesFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_value_Delete = {
  __typename?: 'PayloadPreferencesFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_value_Read = {
  __typename?: 'PayloadPreferencesFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_value_Update = {
  __typename?: 'PayloadPreferencesFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesReadAccess = {
  __typename?: 'PayloadPreferencesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesReadDocAccess = {
  __typename?: 'PayloadPreferencesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateAccess = {
  __typename?: 'PayloadPreferencesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateDocAccess = {
  __typename?: 'PayloadPreferencesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type People = {
  __typename?: 'People';
  docs: Array<Person>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PeopleCreateAccess = {
  __typename?: 'PeopleCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleCreateDocAccess = {
  __typename?: 'PeopleCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleDeleteAccess = {
  __typename?: 'PeopleDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleDeleteDocAccess = {
  __typename?: 'PeopleDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleDocAccessFields = {
  __typename?: 'PeopleDocAccessFields';
  avatar?: Maybe<PeopleDocAccessFields_avatar>;
  balance?: Maybe<PeopleDocAccessFields_balance>;
  createdAt?: Maybe<PeopleDocAccessFields_createdAt>;
  description?: Maybe<PeopleDocAccessFields_description>;
  email?: Maybe<PeopleDocAccessFields_email>;
  isActive?: Maybe<PeopleDocAccessFields_isActive>;
  lastTransactionAt?: Maybe<PeopleDocAccessFields_lastTransactionAt>;
  name?: Maybe<PeopleDocAccessFields_name>;
  phone?: Maybe<PeopleDocAccessFields_phone>;
  totalSummary?: Maybe<PeopleDocAccessFields_totalSummary>;
  totalTransactions?: Maybe<PeopleDocAccessFields_totalTransactions>;
  updatedAt?: Maybe<PeopleDocAccessFields_updatedAt>;
  user?: Maybe<PeopleDocAccessFields_user>;
};

export type PeopleDocAccessFields_avatar = {
  __typename?: 'PeopleDocAccessFields_avatar';
  create?: Maybe<PeopleDocAccessFields_avatar_Create>;
  delete?: Maybe<PeopleDocAccessFields_avatar_Delete>;
  read?: Maybe<PeopleDocAccessFields_avatar_Read>;
  update?: Maybe<PeopleDocAccessFields_avatar_Update>;
};

export type PeopleDocAccessFields_avatar_Create = {
  __typename?: 'PeopleDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_avatar_Delete = {
  __typename?: 'PeopleDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_avatar_Read = {
  __typename?: 'PeopleDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_avatar_Update = {
  __typename?: 'PeopleDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_balance = {
  __typename?: 'PeopleDocAccessFields_balance';
  create?: Maybe<PeopleDocAccessFields_balance_Create>;
  delete?: Maybe<PeopleDocAccessFields_balance_Delete>;
  read?: Maybe<PeopleDocAccessFields_balance_Read>;
  update?: Maybe<PeopleDocAccessFields_balance_Update>;
};

export type PeopleDocAccessFields_balance_Create = {
  __typename?: 'PeopleDocAccessFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_balance_Delete = {
  __typename?: 'PeopleDocAccessFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_balance_Read = {
  __typename?: 'PeopleDocAccessFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_balance_Update = {
  __typename?: 'PeopleDocAccessFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_createdAt = {
  __typename?: 'PeopleDocAccessFields_createdAt';
  create?: Maybe<PeopleDocAccessFields_createdAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_createdAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_createdAt_Read>;
  update?: Maybe<PeopleDocAccessFields_createdAt_Update>;
};

export type PeopleDocAccessFields_createdAt_Create = {
  __typename?: 'PeopleDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_createdAt_Delete = {
  __typename?: 'PeopleDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_createdAt_Read = {
  __typename?: 'PeopleDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_createdAt_Update = {
  __typename?: 'PeopleDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_description = {
  __typename?: 'PeopleDocAccessFields_description';
  create?: Maybe<PeopleDocAccessFields_description_Create>;
  delete?: Maybe<PeopleDocAccessFields_description_Delete>;
  read?: Maybe<PeopleDocAccessFields_description_Read>;
  update?: Maybe<PeopleDocAccessFields_description_Update>;
};

export type PeopleDocAccessFields_description_Create = {
  __typename?: 'PeopleDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_description_Delete = {
  __typename?: 'PeopleDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_description_Read = {
  __typename?: 'PeopleDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_description_Update = {
  __typename?: 'PeopleDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_email = {
  __typename?: 'PeopleDocAccessFields_email';
  create?: Maybe<PeopleDocAccessFields_email_Create>;
  delete?: Maybe<PeopleDocAccessFields_email_Delete>;
  read?: Maybe<PeopleDocAccessFields_email_Read>;
  update?: Maybe<PeopleDocAccessFields_email_Update>;
};

export type PeopleDocAccessFields_email_Create = {
  __typename?: 'PeopleDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_email_Delete = {
  __typename?: 'PeopleDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_email_Read = {
  __typename?: 'PeopleDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_email_Update = {
  __typename?: 'PeopleDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_isActive = {
  __typename?: 'PeopleDocAccessFields_isActive';
  create?: Maybe<PeopleDocAccessFields_isActive_Create>;
  delete?: Maybe<PeopleDocAccessFields_isActive_Delete>;
  read?: Maybe<PeopleDocAccessFields_isActive_Read>;
  update?: Maybe<PeopleDocAccessFields_isActive_Update>;
};

export type PeopleDocAccessFields_isActive_Create = {
  __typename?: 'PeopleDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_isActive_Delete = {
  __typename?: 'PeopleDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_isActive_Read = {
  __typename?: 'PeopleDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_isActive_Update = {
  __typename?: 'PeopleDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_lastTransactionAt = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt';
  create?: Maybe<PeopleDocAccessFields_lastTransactionAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_lastTransactionAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_lastTransactionAt_Read>;
  update?: Maybe<PeopleDocAccessFields_lastTransactionAt_Update>;
};

export type PeopleDocAccessFields_lastTransactionAt_Create = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_lastTransactionAt_Delete = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_lastTransactionAt_Read = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_lastTransactionAt_Update = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_name = {
  __typename?: 'PeopleDocAccessFields_name';
  create?: Maybe<PeopleDocAccessFields_name_Create>;
  delete?: Maybe<PeopleDocAccessFields_name_Delete>;
  read?: Maybe<PeopleDocAccessFields_name_Read>;
  update?: Maybe<PeopleDocAccessFields_name_Update>;
};

export type PeopleDocAccessFields_name_Create = {
  __typename?: 'PeopleDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_name_Delete = {
  __typename?: 'PeopleDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_name_Read = {
  __typename?: 'PeopleDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_name_Update = {
  __typename?: 'PeopleDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_phone = {
  __typename?: 'PeopleDocAccessFields_phone';
  create?: Maybe<PeopleDocAccessFields_phone_Create>;
  delete?: Maybe<PeopleDocAccessFields_phone_Delete>;
  read?: Maybe<PeopleDocAccessFields_phone_Read>;
  update?: Maybe<PeopleDocAccessFields_phone_Update>;
};

export type PeopleDocAccessFields_phone_Create = {
  __typename?: 'PeopleDocAccessFields_phone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_phone_Delete = {
  __typename?: 'PeopleDocAccessFields_phone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_phone_Read = {
  __typename?: 'PeopleDocAccessFields_phone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_phone_Update = {
  __typename?: 'PeopleDocAccessFields_phone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalSummary = {
  __typename?: 'PeopleDocAccessFields_totalSummary';
  create?: Maybe<PeopleDocAccessFields_totalSummary_Create>;
  delete?: Maybe<PeopleDocAccessFields_totalSummary_Delete>;
  read?: Maybe<PeopleDocAccessFields_totalSummary_Read>;
  update?: Maybe<PeopleDocAccessFields_totalSummary_Update>;
};

export type PeopleDocAccessFields_totalSummary_Create = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalSummary_Delete = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalSummary_Read = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalSummary_Update = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalTransactions = {
  __typename?: 'PeopleDocAccessFields_totalTransactions';
  create?: Maybe<PeopleDocAccessFields_totalTransactions_Create>;
  delete?: Maybe<PeopleDocAccessFields_totalTransactions_Delete>;
  read?: Maybe<PeopleDocAccessFields_totalTransactions_Read>;
  update?: Maybe<PeopleDocAccessFields_totalTransactions_Update>;
};

export type PeopleDocAccessFields_totalTransactions_Create = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalTransactions_Delete = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalTransactions_Read = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_totalTransactions_Update = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_updatedAt = {
  __typename?: 'PeopleDocAccessFields_updatedAt';
  create?: Maybe<PeopleDocAccessFields_updatedAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_updatedAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_updatedAt_Read>;
  update?: Maybe<PeopleDocAccessFields_updatedAt_Update>;
};

export type PeopleDocAccessFields_updatedAt_Create = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_updatedAt_Delete = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_updatedAt_Read = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_updatedAt_Update = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_user = {
  __typename?: 'PeopleDocAccessFields_user';
  create?: Maybe<PeopleDocAccessFields_user_Create>;
  delete?: Maybe<PeopleDocAccessFields_user_Delete>;
  read?: Maybe<PeopleDocAccessFields_user_Read>;
  update?: Maybe<PeopleDocAccessFields_user_Update>;
};

export type PeopleDocAccessFields_user_Create = {
  __typename?: 'PeopleDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_user_Delete = {
  __typename?: 'PeopleDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_user_Read = {
  __typename?: 'PeopleDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_user_Update = {
  __typename?: 'PeopleDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields = {
  __typename?: 'PeopleFields';
  avatar?: Maybe<PeopleFields_avatar>;
  balance?: Maybe<PeopleFields_balance>;
  createdAt?: Maybe<PeopleFields_createdAt>;
  description?: Maybe<PeopleFields_description>;
  email?: Maybe<PeopleFields_email>;
  isActive?: Maybe<PeopleFields_isActive>;
  lastTransactionAt?: Maybe<PeopleFields_lastTransactionAt>;
  name?: Maybe<PeopleFields_name>;
  phone?: Maybe<PeopleFields_phone>;
  totalSummary?: Maybe<PeopleFields_totalSummary>;
  totalTransactions?: Maybe<PeopleFields_totalTransactions>;
  updatedAt?: Maybe<PeopleFields_updatedAt>;
  user?: Maybe<PeopleFields_user>;
};

export type PeopleFields_avatar = {
  __typename?: 'PeopleFields_avatar';
  create?: Maybe<PeopleFields_avatar_Create>;
  delete?: Maybe<PeopleFields_avatar_Delete>;
  read?: Maybe<PeopleFields_avatar_Read>;
  update?: Maybe<PeopleFields_avatar_Update>;
};

export type PeopleFields_avatar_Create = {
  __typename?: 'PeopleFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_avatar_Delete = {
  __typename?: 'PeopleFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_avatar_Read = {
  __typename?: 'PeopleFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_avatar_Update = {
  __typename?: 'PeopleFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_balance = {
  __typename?: 'PeopleFields_balance';
  create?: Maybe<PeopleFields_balance_Create>;
  delete?: Maybe<PeopleFields_balance_Delete>;
  read?: Maybe<PeopleFields_balance_Read>;
  update?: Maybe<PeopleFields_balance_Update>;
};

export type PeopleFields_balance_Create = {
  __typename?: 'PeopleFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_balance_Delete = {
  __typename?: 'PeopleFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_balance_Read = {
  __typename?: 'PeopleFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_balance_Update = {
  __typename?: 'PeopleFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_createdAt = {
  __typename?: 'PeopleFields_createdAt';
  create?: Maybe<PeopleFields_createdAt_Create>;
  delete?: Maybe<PeopleFields_createdAt_Delete>;
  read?: Maybe<PeopleFields_createdAt_Read>;
  update?: Maybe<PeopleFields_createdAt_Update>;
};

export type PeopleFields_createdAt_Create = {
  __typename?: 'PeopleFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_createdAt_Delete = {
  __typename?: 'PeopleFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_createdAt_Read = {
  __typename?: 'PeopleFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_createdAt_Update = {
  __typename?: 'PeopleFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_description = {
  __typename?: 'PeopleFields_description';
  create?: Maybe<PeopleFields_description_Create>;
  delete?: Maybe<PeopleFields_description_Delete>;
  read?: Maybe<PeopleFields_description_Read>;
  update?: Maybe<PeopleFields_description_Update>;
};

export type PeopleFields_description_Create = {
  __typename?: 'PeopleFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_description_Delete = {
  __typename?: 'PeopleFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_description_Read = {
  __typename?: 'PeopleFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_description_Update = {
  __typename?: 'PeopleFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_email = {
  __typename?: 'PeopleFields_email';
  create?: Maybe<PeopleFields_email_Create>;
  delete?: Maybe<PeopleFields_email_Delete>;
  read?: Maybe<PeopleFields_email_Read>;
  update?: Maybe<PeopleFields_email_Update>;
};

export type PeopleFields_email_Create = {
  __typename?: 'PeopleFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_email_Delete = {
  __typename?: 'PeopleFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_email_Read = {
  __typename?: 'PeopleFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_email_Update = {
  __typename?: 'PeopleFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_isActive = {
  __typename?: 'PeopleFields_isActive';
  create?: Maybe<PeopleFields_isActive_Create>;
  delete?: Maybe<PeopleFields_isActive_Delete>;
  read?: Maybe<PeopleFields_isActive_Read>;
  update?: Maybe<PeopleFields_isActive_Update>;
};

export type PeopleFields_isActive_Create = {
  __typename?: 'PeopleFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_isActive_Delete = {
  __typename?: 'PeopleFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_isActive_Read = {
  __typename?: 'PeopleFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_isActive_Update = {
  __typename?: 'PeopleFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_lastTransactionAt = {
  __typename?: 'PeopleFields_lastTransactionAt';
  create?: Maybe<PeopleFields_lastTransactionAt_Create>;
  delete?: Maybe<PeopleFields_lastTransactionAt_Delete>;
  read?: Maybe<PeopleFields_lastTransactionAt_Read>;
  update?: Maybe<PeopleFields_lastTransactionAt_Update>;
};

export type PeopleFields_lastTransactionAt_Create = {
  __typename?: 'PeopleFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_lastTransactionAt_Delete = {
  __typename?: 'PeopleFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_lastTransactionAt_Read = {
  __typename?: 'PeopleFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_lastTransactionAt_Update = {
  __typename?: 'PeopleFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_name = {
  __typename?: 'PeopleFields_name';
  create?: Maybe<PeopleFields_name_Create>;
  delete?: Maybe<PeopleFields_name_Delete>;
  read?: Maybe<PeopleFields_name_Read>;
  update?: Maybe<PeopleFields_name_Update>;
};

export type PeopleFields_name_Create = {
  __typename?: 'PeopleFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_name_Delete = {
  __typename?: 'PeopleFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_name_Read = {
  __typename?: 'PeopleFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_name_Update = {
  __typename?: 'PeopleFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_phone = {
  __typename?: 'PeopleFields_phone';
  create?: Maybe<PeopleFields_phone_Create>;
  delete?: Maybe<PeopleFields_phone_Delete>;
  read?: Maybe<PeopleFields_phone_Read>;
  update?: Maybe<PeopleFields_phone_Update>;
};

export type PeopleFields_phone_Create = {
  __typename?: 'PeopleFields_phone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_phone_Delete = {
  __typename?: 'PeopleFields_phone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_phone_Read = {
  __typename?: 'PeopleFields_phone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_phone_Update = {
  __typename?: 'PeopleFields_phone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalSummary = {
  __typename?: 'PeopleFields_totalSummary';
  create?: Maybe<PeopleFields_totalSummary_Create>;
  delete?: Maybe<PeopleFields_totalSummary_Delete>;
  read?: Maybe<PeopleFields_totalSummary_Read>;
  update?: Maybe<PeopleFields_totalSummary_Update>;
};

export type PeopleFields_totalSummary_Create = {
  __typename?: 'PeopleFields_totalSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalSummary_Delete = {
  __typename?: 'PeopleFields_totalSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalSummary_Read = {
  __typename?: 'PeopleFields_totalSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalSummary_Update = {
  __typename?: 'PeopleFields_totalSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalTransactions = {
  __typename?: 'PeopleFields_totalTransactions';
  create?: Maybe<PeopleFields_totalTransactions_Create>;
  delete?: Maybe<PeopleFields_totalTransactions_Delete>;
  read?: Maybe<PeopleFields_totalTransactions_Read>;
  update?: Maybe<PeopleFields_totalTransactions_Update>;
};

export type PeopleFields_totalTransactions_Create = {
  __typename?: 'PeopleFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalTransactions_Delete = {
  __typename?: 'PeopleFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalTransactions_Read = {
  __typename?: 'PeopleFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_totalTransactions_Update = {
  __typename?: 'PeopleFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_updatedAt = {
  __typename?: 'PeopleFields_updatedAt';
  create?: Maybe<PeopleFields_updatedAt_Create>;
  delete?: Maybe<PeopleFields_updatedAt_Delete>;
  read?: Maybe<PeopleFields_updatedAt_Read>;
  update?: Maybe<PeopleFields_updatedAt_Update>;
};

export type PeopleFields_updatedAt_Create = {
  __typename?: 'PeopleFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_updatedAt_Delete = {
  __typename?: 'PeopleFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_updatedAt_Read = {
  __typename?: 'PeopleFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_updatedAt_Update = {
  __typename?: 'PeopleFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_user = {
  __typename?: 'PeopleFields_user';
  create?: Maybe<PeopleFields_user_Create>;
  delete?: Maybe<PeopleFields_user_Delete>;
  read?: Maybe<PeopleFields_user_Read>;
  update?: Maybe<PeopleFields_user_Update>;
};

export type PeopleFields_user_Create = {
  __typename?: 'PeopleFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_user_Delete = {
  __typename?: 'PeopleFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_user_Read = {
  __typename?: 'PeopleFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_user_Update = {
  __typename?: 'PeopleFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleReadAccess = {
  __typename?: 'PeopleReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleReadDocAccess = {
  __typename?: 'PeopleReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleUpdateAccess = {
  __typename?: 'PeopleUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PeopleUpdateDocAccess = {
  __typename?: 'PeopleUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Person = {
  __typename?: 'Person';
  avatar?: Maybe<Media>;
  balance?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastTransactionAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  totalSummary?: Maybe<Scalars['JSON']['output']>;
  totalTransactions?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type PersonActivity = {
  __typename?: 'PersonActivity';
  averagePerTransaction: Scalars['Float']['output'];
  balance: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expenseAmount: Scalars['Float']['output'];
  expenseTransactionCount: Scalars['Int']['output'];
  highestTransaction: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  incomeAmount: Scalars['Float']['output'];
  incomeTransactionCount: Scalars['Int']['output'];
  lastTransactionAt?: Maybe<Scalars['String']['output']>;
  lowestTransaction: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  totalAmount: Scalars['Float']['output'];
  totalTransactionCount: Scalars['Int']['output'];
};

export type Person_avatar_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Person_balance_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Person_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_description_operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Person_email_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type Person_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_isActive_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Person_lastTransactionAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_phone_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_totalSummary_operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type Person_totalTransactions_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Person_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Person_where = {
  AND?: InputMaybe<Array<InputMaybe<Person_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_where_or>>>;
  avatar?: InputMaybe<Person_avatar_operator>;
  balance?: InputMaybe<Person_balance_operator>;
  createdAt?: InputMaybe<Person_createdAt_operator>;
  description?: InputMaybe<Person_description_operator>;
  email?: InputMaybe<Person_email_operator>;
  id?: InputMaybe<Person_id_operator>;
  isActive?: InputMaybe<Person_isActive_operator>;
  lastTransactionAt?: InputMaybe<Person_lastTransactionAt_operator>;
  name?: InputMaybe<Person_name_operator>;
  phone?: InputMaybe<Person_phone_operator>;
  totalSummary?: InputMaybe<Person_totalSummary_operator>;
  totalTransactions?: InputMaybe<Person_totalTransactions_operator>;
  updatedAt?: InputMaybe<Person_updatedAt_operator>;
  user?: InputMaybe<Person_user_operator>;
};

export type Person_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Person_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_where_or>>>;
  avatar?: InputMaybe<Person_avatar_operator>;
  balance?: InputMaybe<Person_balance_operator>;
  createdAt?: InputMaybe<Person_createdAt_operator>;
  description?: InputMaybe<Person_description_operator>;
  email?: InputMaybe<Person_email_operator>;
  id?: InputMaybe<Person_id_operator>;
  isActive?: InputMaybe<Person_isActive_operator>;
  lastTransactionAt?: InputMaybe<Person_lastTransactionAt_operator>;
  name?: InputMaybe<Person_name_operator>;
  phone?: InputMaybe<Person_phone_operator>;
  totalSummary?: InputMaybe<Person_totalSummary_operator>;
  totalTransactions?: InputMaybe<Person_totalTransactions_operator>;
  updatedAt?: InputMaybe<Person_updatedAt_operator>;
  user?: InputMaybe<Person_user_operator>;
};

export type Person_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Person_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_where_or>>>;
  avatar?: InputMaybe<Person_avatar_operator>;
  balance?: InputMaybe<Person_balance_operator>;
  createdAt?: InputMaybe<Person_createdAt_operator>;
  description?: InputMaybe<Person_description_operator>;
  email?: InputMaybe<Person_email_operator>;
  id?: InputMaybe<Person_id_operator>;
  isActive?: InputMaybe<Person_isActive_operator>;
  lastTransactionAt?: InputMaybe<Person_lastTransactionAt_operator>;
  name?: InputMaybe<Person_name_operator>;
  phone?: InputMaybe<Person_phone_operator>;
  totalSummary?: InputMaybe<Person_totalSummary_operator>;
  totalTransactions?: InputMaybe<Person_totalTransactions_operator>;
  updatedAt?: InputMaybe<Person_updatedAt_operator>;
  user?: InputMaybe<Person_user_operator>;
};

export type Query = {
  __typename?: 'Query';
  Access?: Maybe<Access>;
  Account?: Maybe<Account>;
  Accounts?: Maybe<Accounts>;
  AiUsage?: Maybe<AiUsage>;
  AiUsages?: Maybe<AiUsages>;
  AppSetting?: Maybe<AppSetting>;
  Categories?: Maybe<Categories>;
  Category?: Maybe<Category>;
  Media?: Maybe<Media>;
  OauthAccount?: Maybe<OauthAccount>;
  OauthAccounts?: Maybe<OauthAccounts>;
  PayloadKv?: Maybe<PayloadKv>;
  PayloadKvs?: Maybe<PayloadKvs>;
  PayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  PayloadLockedDocuments?: Maybe<PayloadLockedDocuments>;
  PayloadMcpApiKey?: Maybe<PayloadMcpApiKey>;
  PayloadMcpApiKeys?: Maybe<PayloadMcpApiKeys>;
  PayloadPreference?: Maybe<PayloadPreference>;
  PayloadPreferences?: Maybe<PayloadPreferences>;
  People?: Maybe<People>;
  Person?: Maybe<Person>;
  Reminder?: Maybe<Reminder>;
  Reminders?: Maybe<Reminders>;
  Tag?: Maybe<Tag>;
  Tags?: Maybe<Tags>;
  Transaction?: Maybe<Transaction>;
  Transactions?: Maybe<Transactions>;
  User?: Maybe<User>;
  UserSetting?: Maybe<UserSetting>;
  UserSettings?: Maybe<UserSettings>;
  Users?: Maybe<Users>;
  allMedia?: Maybe<allMedia>;
  countAccounts?: Maybe<countAccounts>;
  countAiUsages?: Maybe<countAiUsages>;
  countCategories?: Maybe<countCategories>;
  countOauthAccounts?: Maybe<countOauthAccounts>;
  countPayloadKvs?: Maybe<countPayloadKvs>;
  countPayloadLockedDocuments?: Maybe<countPayloadLockedDocuments>;
  countPayloadMcpApiKeys?: Maybe<countPayloadMcpApiKeys>;
  countPayloadPreferences?: Maybe<countPayloadPreferences>;
  countPeople?: Maybe<countPeople>;
  countReminders?: Maybe<countReminders>;
  countTags?: Maybe<countTags>;
  countTransactions?: Maybe<countTransactions>;
  countUserSettings?: Maybe<countUserSettings>;
  countUsers?: Maybe<countUsers>;
  countallMedia?: Maybe<countallMedia>;
  currencies?: Maybe<CurrenciesResult>;
  currency?: Maybe<Currency>;
  dashboardSummary?: Maybe<DashboardResult>;
  docAccessAccount?: Maybe<accountsDocAccess>;
  docAccessAiUsage?: Maybe<ai_usagesDocAccess>;
  docAccessAppSetting?: Maybe<app_settingsDocAccess>;
  docAccessCategory?: Maybe<categoriesDocAccess>;
  docAccessMedia?: Maybe<mediaDocAccess>;
  docAccessOauthAccount?: Maybe<oauth_accountsDocAccess>;
  docAccessPayloadKv?: Maybe<payload_kvDocAccess>;
  docAccessPayloadLockedDocument?: Maybe<payload_locked_documentsDocAccess>;
  docAccessPayloadMcpApiKey?: Maybe<payload_mcp_api_keysDocAccess>;
  docAccessPayloadPreference?: Maybe<payload_preferencesDocAccess>;
  docAccessPerson?: Maybe<peopleDocAccess>;
  docAccessReminder?: Maybe<remindersDocAccess>;
  docAccessTag?: Maybe<tagsDocAccess>;
  docAccessTransaction?: Maybe<transactionsDocAccess>;
  docAccessUser?: Maybe<usersDocAccess>;
  docAccessUserSetting?: Maybe<user_settingsDocAccess>;
  initializedPayloadMcpApiKey?: Maybe<Scalars['Boolean']['output']>;
  initializedUser?: Maybe<Scalars['Boolean']['output']>;
  mePayloadMcpApiKey?: Maybe<payload_mcp_api_keysMe>;
  meUser?: Maybe<usersMe>;
  monthlyCalendar?: Maybe<MonthlyCalendarResult>;
  monthlyCategories?: Maybe<MonthlyCategoriesResult>;
  monthlyPeople?: Maybe<MonthlyPeopleResult>;
  monthlyTags?: Maybe<MonthlyTagsResult>;
  timezone?: Maybe<Timezone>;
  timezones?: Maybe<TimezonesResult>;
  weeklyExpenses?: Maybe<WeeklyExpensesResult>;
};


export type QueryAccountArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Account_where>;
};


export type QueryAiUsageArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAiUsagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AiUsage_where>;
};


export type QueryAppSettingArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCategoriesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Category_where>;
};


export type QueryCategoryArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOauthAccountArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOauthAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OauthAccount_where>;
};


export type QueryPayloadKvArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_where>;
};


export type QueryPayloadLockedDocumentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_where>;
};


export type QueryPayloadMcpApiKeyArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadMcpApiKeysArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadMcpApiKey_where>;
};


export type QueryPayloadPreferenceArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_where>;
};


export type QueryPeopleArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Person_where>;
};


export type QueryPersonArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryReminderArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryRemindersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Reminder_where>;
};


export type QueryTagArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTagsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Tag_where>;
};


export type QueryTransactionArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTransactionsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Transaction_where>;
};


export type QueryUserArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserSettingArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserSettingsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserSetting_where>;
};


export type QueryUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_where>;
};


export type QueryallMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_where>;
};


export type QuerycountAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Account_where>;
};


export type QuerycountAiUsagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AiUsage_where>;
};


export type QuerycountCategoriesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Category_where>;
};


export type QuerycountOauthAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OauthAccount_where>;
};


export type QuerycountPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_where>;
};


export type QuerycountPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_where>;
};


export type QuerycountPayloadMcpApiKeysArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadMcpApiKey_where>;
};


export type QuerycountPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_where>;
};


export type QuerycountPeopleArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Person_where>;
};


export type QuerycountRemindersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Reminder_where>;
};


export type QuerycountTagsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Tag_where>;
};


export type QuerycountTransactionsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Transaction_where>;
};


export type QuerycountUserSettingsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserSetting_where>;
};


export type QuerycountUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_where>;
};


export type QuerycountallMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_where>;
};


export type QuerycurrencyArgs = {
  code: Scalars['String']['input'];
};


export type QuerydocAccessAccountArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessAiUsageArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessMediaArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessOauthAccountArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessPayloadKvArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessPayloadLockedDocumentArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessPayloadMcpApiKeyArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessPayloadPreferenceArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessPersonArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessReminderArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessTagArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessTransactionArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessUserArgs = {
  id: Scalars['String']['input'];
};


export type QuerydocAccessUserSettingArgs = {
  id: Scalars['String']['input'];
};


export type QuerymonthlyCalendarArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerymonthlyCategoriesArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerymonthlyPeopleArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerymonthlyTagsArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerytimezoneArgs = {
  id: Scalars['String']['input'];
};

export type Reminder = {
  __typename?: 'Reminder';
  account?: Maybe<Account>;
  amount?: Maybe<Scalars['String']['output']>;
  archived?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<Category>;
  completedDates?: Maybe<Array<Reminder_CompletedDates>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  isRecurring?: Maybe<Scalars['Boolean']['output']>;
  lastTriggeredAt?: Maybe<Scalars['DateTime']['output']>;
  member?: Maybe<Person>;
  nextDueDate?: Maybe<Scalars['DateTime']['output']>;
  recurrencePeriod?: Maybe<Scalars['Float']['output']>;
  recurrenceType?: Maybe<Reminder_recurrenceType>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  type?: Maybe<Reminder_type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum ReminderUpdate_recurrenceType_MutationInput {
  daily = 'daily',
  monthly = 'monthly',
  weekly = 'weekly',
  yearly = 'yearly'
}

export enum ReminderUpdate_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Reminder_CompletedDates = {
  __typename?: 'Reminder_CompletedDates';
  date?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type Reminder_account_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_amount_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_archived_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Reminder_category_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_completedDates__date_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_completedDates__id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_date_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_isRecurring_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Reminder_lastTriggeredAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_member_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_nextDueDate_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_recurrencePeriod_operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export enum Reminder_recurrenceType {
  daily = 'daily',
  monthly = 'monthly',
  weekly = 'weekly',
  yearly = 'yearly'
}

export enum Reminder_recurrenceType_Input {
  daily = 'daily',
  monthly = 'monthly',
  weekly = 'weekly',
  yearly = 'yearly'
}

export enum Reminder_recurrenceType_MutationInput {
  daily = 'daily',
  monthly = 'monthly',
  weekly = 'weekly',
  yearly = 'yearly'
}

export type Reminder_recurrenceType_operator = {
  all?: InputMaybe<Array<InputMaybe<Reminder_recurrenceType_Input>>>;
  equals?: InputMaybe<Reminder_recurrenceType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Reminder_recurrenceType_Input>>>;
  not_equals?: InputMaybe<Reminder_recurrenceType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Reminder_recurrenceType_Input>>>;
};

export type Reminder_tags_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_title_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Reminder_type {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Reminder_type_Input {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Reminder_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Reminder_type_operator = {
  all?: InputMaybe<Array<InputMaybe<Reminder_type_Input>>>;
  equals?: InputMaybe<Reminder_type_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Reminder_type_Input>>>;
  not_equals?: InputMaybe<Reminder_type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Reminder_type_Input>>>;
};

export type Reminder_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_where = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_where_or>>>;
  account?: InputMaybe<Reminder_account_operator>;
  amount?: InputMaybe<Reminder_amount_operator>;
  archived?: InputMaybe<Reminder_archived_operator>;
  category?: InputMaybe<Reminder_category_operator>;
  completedDates__date?: InputMaybe<Reminder_completedDates__date_operator>;
  completedDates__id?: InputMaybe<Reminder_completedDates__id_operator>;
  createdAt?: InputMaybe<Reminder_createdAt_operator>;
  date?: InputMaybe<Reminder_date_operator>;
  id?: InputMaybe<Reminder_id_operator>;
  isRecurring?: InputMaybe<Reminder_isRecurring_operator>;
  lastTriggeredAt?: InputMaybe<Reminder_lastTriggeredAt_operator>;
  member?: InputMaybe<Reminder_member_operator>;
  nextDueDate?: InputMaybe<Reminder_nextDueDate_operator>;
  recurrencePeriod?: InputMaybe<Reminder_recurrencePeriod_operator>;
  recurrenceType?: InputMaybe<Reminder_recurrenceType_operator>;
  tags?: InputMaybe<Reminder_tags_operator>;
  title?: InputMaybe<Reminder_title_operator>;
  type?: InputMaybe<Reminder_type_operator>;
  updatedAt?: InputMaybe<Reminder_updatedAt_operator>;
  user?: InputMaybe<Reminder_user_operator>;
};

export type Reminder_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_where_or>>>;
  account?: InputMaybe<Reminder_account_operator>;
  amount?: InputMaybe<Reminder_amount_operator>;
  archived?: InputMaybe<Reminder_archived_operator>;
  category?: InputMaybe<Reminder_category_operator>;
  completedDates__date?: InputMaybe<Reminder_completedDates__date_operator>;
  completedDates__id?: InputMaybe<Reminder_completedDates__id_operator>;
  createdAt?: InputMaybe<Reminder_createdAt_operator>;
  date?: InputMaybe<Reminder_date_operator>;
  id?: InputMaybe<Reminder_id_operator>;
  isRecurring?: InputMaybe<Reminder_isRecurring_operator>;
  lastTriggeredAt?: InputMaybe<Reminder_lastTriggeredAt_operator>;
  member?: InputMaybe<Reminder_member_operator>;
  nextDueDate?: InputMaybe<Reminder_nextDueDate_operator>;
  recurrencePeriod?: InputMaybe<Reminder_recurrencePeriod_operator>;
  recurrenceType?: InputMaybe<Reminder_recurrenceType_operator>;
  tags?: InputMaybe<Reminder_tags_operator>;
  title?: InputMaybe<Reminder_title_operator>;
  type?: InputMaybe<Reminder_type_operator>;
  updatedAt?: InputMaybe<Reminder_updatedAt_operator>;
  user?: InputMaybe<Reminder_user_operator>;
};

export type Reminder_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_where_or>>>;
  account?: InputMaybe<Reminder_account_operator>;
  amount?: InputMaybe<Reminder_amount_operator>;
  archived?: InputMaybe<Reminder_archived_operator>;
  category?: InputMaybe<Reminder_category_operator>;
  completedDates__date?: InputMaybe<Reminder_completedDates__date_operator>;
  completedDates__id?: InputMaybe<Reminder_completedDates__id_operator>;
  createdAt?: InputMaybe<Reminder_createdAt_operator>;
  date?: InputMaybe<Reminder_date_operator>;
  id?: InputMaybe<Reminder_id_operator>;
  isRecurring?: InputMaybe<Reminder_isRecurring_operator>;
  lastTriggeredAt?: InputMaybe<Reminder_lastTriggeredAt_operator>;
  member?: InputMaybe<Reminder_member_operator>;
  nextDueDate?: InputMaybe<Reminder_nextDueDate_operator>;
  recurrencePeriod?: InputMaybe<Reminder_recurrencePeriod_operator>;
  recurrenceType?: InputMaybe<Reminder_recurrenceType_operator>;
  tags?: InputMaybe<Reminder_tags_operator>;
  title?: InputMaybe<Reminder_title_operator>;
  type?: InputMaybe<Reminder_type_operator>;
  updatedAt?: InputMaybe<Reminder_updatedAt_operator>;
  user?: InputMaybe<Reminder_user_operator>;
};

export type Reminders = {
  __typename?: 'Reminders';
  docs: Array<Reminder>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type RemindersCreateAccess = {
  __typename?: 'RemindersCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersCreateDocAccess = {
  __typename?: 'RemindersCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersDeleteAccess = {
  __typename?: 'RemindersDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersDeleteDocAccess = {
  __typename?: 'RemindersDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersDocAccessFields = {
  __typename?: 'RemindersDocAccessFields';
  account?: Maybe<RemindersDocAccessFields_account>;
  amount?: Maybe<RemindersDocAccessFields_amount>;
  archived?: Maybe<RemindersDocAccessFields_archived>;
  category?: Maybe<RemindersDocAccessFields_category>;
  completedDates?: Maybe<RemindersDocAccessFields_completedDates>;
  createdAt?: Maybe<RemindersDocAccessFields_createdAt>;
  date?: Maybe<RemindersDocAccessFields_date>;
  isRecurring?: Maybe<RemindersDocAccessFields_isRecurring>;
  lastTriggeredAt?: Maybe<RemindersDocAccessFields_lastTriggeredAt>;
  member?: Maybe<RemindersDocAccessFields_member>;
  nextDueDate?: Maybe<RemindersDocAccessFields_nextDueDate>;
  recurrencePeriod?: Maybe<RemindersDocAccessFields_recurrencePeriod>;
  recurrenceType?: Maybe<RemindersDocAccessFields_recurrenceType>;
  tags?: Maybe<RemindersDocAccessFields_tags>;
  title?: Maybe<RemindersDocAccessFields_title>;
  type?: Maybe<RemindersDocAccessFields_type>;
  updatedAt?: Maybe<RemindersDocAccessFields_updatedAt>;
  user?: Maybe<RemindersDocAccessFields_user>;
};

export type RemindersDocAccessFields_account = {
  __typename?: 'RemindersDocAccessFields_account';
  create?: Maybe<RemindersDocAccessFields_account_Create>;
  delete?: Maybe<RemindersDocAccessFields_account_Delete>;
  read?: Maybe<RemindersDocAccessFields_account_Read>;
  update?: Maybe<RemindersDocAccessFields_account_Update>;
};

export type RemindersDocAccessFields_account_Create = {
  __typename?: 'RemindersDocAccessFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_account_Delete = {
  __typename?: 'RemindersDocAccessFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_account_Read = {
  __typename?: 'RemindersDocAccessFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_account_Update = {
  __typename?: 'RemindersDocAccessFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_amount = {
  __typename?: 'RemindersDocAccessFields_amount';
  create?: Maybe<RemindersDocAccessFields_amount_Create>;
  delete?: Maybe<RemindersDocAccessFields_amount_Delete>;
  read?: Maybe<RemindersDocAccessFields_amount_Read>;
  update?: Maybe<RemindersDocAccessFields_amount_Update>;
};

export type RemindersDocAccessFields_amount_Create = {
  __typename?: 'RemindersDocAccessFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_amount_Delete = {
  __typename?: 'RemindersDocAccessFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_amount_Read = {
  __typename?: 'RemindersDocAccessFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_amount_Update = {
  __typename?: 'RemindersDocAccessFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_archived = {
  __typename?: 'RemindersDocAccessFields_archived';
  create?: Maybe<RemindersDocAccessFields_archived_Create>;
  delete?: Maybe<RemindersDocAccessFields_archived_Delete>;
  read?: Maybe<RemindersDocAccessFields_archived_Read>;
  update?: Maybe<RemindersDocAccessFields_archived_Update>;
};

export type RemindersDocAccessFields_archived_Create = {
  __typename?: 'RemindersDocAccessFields_archived_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_archived_Delete = {
  __typename?: 'RemindersDocAccessFields_archived_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_archived_Read = {
  __typename?: 'RemindersDocAccessFields_archived_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_archived_Update = {
  __typename?: 'RemindersDocAccessFields_archived_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_category = {
  __typename?: 'RemindersDocAccessFields_category';
  create?: Maybe<RemindersDocAccessFields_category_Create>;
  delete?: Maybe<RemindersDocAccessFields_category_Delete>;
  read?: Maybe<RemindersDocAccessFields_category_Read>;
  update?: Maybe<RemindersDocAccessFields_category_Update>;
};

export type RemindersDocAccessFields_category_Create = {
  __typename?: 'RemindersDocAccessFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_category_Delete = {
  __typename?: 'RemindersDocAccessFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_category_Read = {
  __typename?: 'RemindersDocAccessFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_category_Update = {
  __typename?: 'RemindersDocAccessFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates = {
  __typename?: 'RemindersDocAccessFields_completedDates';
  create?: Maybe<RemindersDocAccessFields_completedDates_Create>;
  delete?: Maybe<RemindersDocAccessFields_completedDates_Delete>;
  fields?: Maybe<RemindersDocAccessFields_completedDates_Fields>;
  read?: Maybe<RemindersDocAccessFields_completedDates_Read>;
  update?: Maybe<RemindersDocAccessFields_completedDates_Update>;
};

export type RemindersDocAccessFields_completedDates_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_Fields = {
  __typename?: 'RemindersDocAccessFields_completedDates_Fields';
  date?: Maybe<RemindersDocAccessFields_completedDates_date>;
  id?: Maybe<RemindersDocAccessFields_completedDates_id>;
};

export type RemindersDocAccessFields_completedDates_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_date = {
  __typename?: 'RemindersDocAccessFields_completedDates_date';
  create?: Maybe<RemindersDocAccessFields_completedDates_date_Create>;
  delete?: Maybe<RemindersDocAccessFields_completedDates_date_Delete>;
  read?: Maybe<RemindersDocAccessFields_completedDates_date_Read>;
  update?: Maybe<RemindersDocAccessFields_completedDates_date_Update>;
};

export type RemindersDocAccessFields_completedDates_date_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_date_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_date_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_date_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_id = {
  __typename?: 'RemindersDocAccessFields_completedDates_id';
  create?: Maybe<RemindersDocAccessFields_completedDates_id_Create>;
  delete?: Maybe<RemindersDocAccessFields_completedDates_id_Delete>;
  read?: Maybe<RemindersDocAccessFields_completedDates_id_Read>;
  update?: Maybe<RemindersDocAccessFields_completedDates_id_Update>;
};

export type RemindersDocAccessFields_completedDates_id_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_id_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_id_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_completedDates_id_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_createdAt = {
  __typename?: 'RemindersDocAccessFields_createdAt';
  create?: Maybe<RemindersDocAccessFields_createdAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_createdAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_createdAt_Read>;
  update?: Maybe<RemindersDocAccessFields_createdAt_Update>;
};

export type RemindersDocAccessFields_createdAt_Create = {
  __typename?: 'RemindersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_createdAt_Delete = {
  __typename?: 'RemindersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_createdAt_Read = {
  __typename?: 'RemindersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_createdAt_Update = {
  __typename?: 'RemindersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_date = {
  __typename?: 'RemindersDocAccessFields_date';
  create?: Maybe<RemindersDocAccessFields_date_Create>;
  delete?: Maybe<RemindersDocAccessFields_date_Delete>;
  read?: Maybe<RemindersDocAccessFields_date_Read>;
  update?: Maybe<RemindersDocAccessFields_date_Update>;
};

export type RemindersDocAccessFields_date_Create = {
  __typename?: 'RemindersDocAccessFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_date_Delete = {
  __typename?: 'RemindersDocAccessFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_date_Read = {
  __typename?: 'RemindersDocAccessFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_date_Update = {
  __typename?: 'RemindersDocAccessFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_isRecurring = {
  __typename?: 'RemindersDocAccessFields_isRecurring';
  create?: Maybe<RemindersDocAccessFields_isRecurring_Create>;
  delete?: Maybe<RemindersDocAccessFields_isRecurring_Delete>;
  read?: Maybe<RemindersDocAccessFields_isRecurring_Read>;
  update?: Maybe<RemindersDocAccessFields_isRecurring_Update>;
};

export type RemindersDocAccessFields_isRecurring_Create = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_isRecurring_Delete = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_isRecurring_Read = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_isRecurring_Update = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_lastTriggeredAt = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt';
  create?: Maybe<RemindersDocAccessFields_lastTriggeredAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_lastTriggeredAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_lastTriggeredAt_Read>;
  update?: Maybe<RemindersDocAccessFields_lastTriggeredAt_Update>;
};

export type RemindersDocAccessFields_lastTriggeredAt_Create = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_lastTriggeredAt_Delete = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_lastTriggeredAt_Read = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_lastTriggeredAt_Update = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_member = {
  __typename?: 'RemindersDocAccessFields_member';
  create?: Maybe<RemindersDocAccessFields_member_Create>;
  delete?: Maybe<RemindersDocAccessFields_member_Delete>;
  read?: Maybe<RemindersDocAccessFields_member_Read>;
  update?: Maybe<RemindersDocAccessFields_member_Update>;
};

export type RemindersDocAccessFields_member_Create = {
  __typename?: 'RemindersDocAccessFields_member_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_member_Delete = {
  __typename?: 'RemindersDocAccessFields_member_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_member_Read = {
  __typename?: 'RemindersDocAccessFields_member_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_member_Update = {
  __typename?: 'RemindersDocAccessFields_member_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_nextDueDate = {
  __typename?: 'RemindersDocAccessFields_nextDueDate';
  create?: Maybe<RemindersDocAccessFields_nextDueDate_Create>;
  delete?: Maybe<RemindersDocAccessFields_nextDueDate_Delete>;
  read?: Maybe<RemindersDocAccessFields_nextDueDate_Read>;
  update?: Maybe<RemindersDocAccessFields_nextDueDate_Update>;
};

export type RemindersDocAccessFields_nextDueDate_Create = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_nextDueDate_Delete = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_nextDueDate_Read = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_nextDueDate_Update = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrencePeriod = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod';
  create?: Maybe<RemindersDocAccessFields_recurrencePeriod_Create>;
  delete?: Maybe<RemindersDocAccessFields_recurrencePeriod_Delete>;
  read?: Maybe<RemindersDocAccessFields_recurrencePeriod_Read>;
  update?: Maybe<RemindersDocAccessFields_recurrencePeriod_Update>;
};

export type RemindersDocAccessFields_recurrencePeriod_Create = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrencePeriod_Delete = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrencePeriod_Read = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrencePeriod_Update = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrenceType = {
  __typename?: 'RemindersDocAccessFields_recurrenceType';
  create?: Maybe<RemindersDocAccessFields_recurrenceType_Create>;
  delete?: Maybe<RemindersDocAccessFields_recurrenceType_Delete>;
  read?: Maybe<RemindersDocAccessFields_recurrenceType_Read>;
  update?: Maybe<RemindersDocAccessFields_recurrenceType_Update>;
};

export type RemindersDocAccessFields_recurrenceType_Create = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrenceType_Delete = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrenceType_Read = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_recurrenceType_Update = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_tags = {
  __typename?: 'RemindersDocAccessFields_tags';
  create?: Maybe<RemindersDocAccessFields_tags_Create>;
  delete?: Maybe<RemindersDocAccessFields_tags_Delete>;
  read?: Maybe<RemindersDocAccessFields_tags_Read>;
  update?: Maybe<RemindersDocAccessFields_tags_Update>;
};

export type RemindersDocAccessFields_tags_Create = {
  __typename?: 'RemindersDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_tags_Delete = {
  __typename?: 'RemindersDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_tags_Read = {
  __typename?: 'RemindersDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_tags_Update = {
  __typename?: 'RemindersDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_title = {
  __typename?: 'RemindersDocAccessFields_title';
  create?: Maybe<RemindersDocAccessFields_title_Create>;
  delete?: Maybe<RemindersDocAccessFields_title_Delete>;
  read?: Maybe<RemindersDocAccessFields_title_Read>;
  update?: Maybe<RemindersDocAccessFields_title_Update>;
};

export type RemindersDocAccessFields_title_Create = {
  __typename?: 'RemindersDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_title_Delete = {
  __typename?: 'RemindersDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_title_Read = {
  __typename?: 'RemindersDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_title_Update = {
  __typename?: 'RemindersDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_type = {
  __typename?: 'RemindersDocAccessFields_type';
  create?: Maybe<RemindersDocAccessFields_type_Create>;
  delete?: Maybe<RemindersDocAccessFields_type_Delete>;
  read?: Maybe<RemindersDocAccessFields_type_Read>;
  update?: Maybe<RemindersDocAccessFields_type_Update>;
};

export type RemindersDocAccessFields_type_Create = {
  __typename?: 'RemindersDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_type_Delete = {
  __typename?: 'RemindersDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_type_Read = {
  __typename?: 'RemindersDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_type_Update = {
  __typename?: 'RemindersDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_updatedAt = {
  __typename?: 'RemindersDocAccessFields_updatedAt';
  create?: Maybe<RemindersDocAccessFields_updatedAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_updatedAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_updatedAt_Read>;
  update?: Maybe<RemindersDocAccessFields_updatedAt_Update>;
};

export type RemindersDocAccessFields_updatedAt_Create = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_updatedAt_Delete = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_updatedAt_Read = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_updatedAt_Update = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_user = {
  __typename?: 'RemindersDocAccessFields_user';
  create?: Maybe<RemindersDocAccessFields_user_Create>;
  delete?: Maybe<RemindersDocAccessFields_user_Delete>;
  read?: Maybe<RemindersDocAccessFields_user_Read>;
  update?: Maybe<RemindersDocAccessFields_user_Update>;
};

export type RemindersDocAccessFields_user_Create = {
  __typename?: 'RemindersDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_user_Delete = {
  __typename?: 'RemindersDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_user_Read = {
  __typename?: 'RemindersDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_user_Update = {
  __typename?: 'RemindersDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields = {
  __typename?: 'RemindersFields';
  account?: Maybe<RemindersFields_account>;
  amount?: Maybe<RemindersFields_amount>;
  archived?: Maybe<RemindersFields_archived>;
  category?: Maybe<RemindersFields_category>;
  completedDates?: Maybe<RemindersFields_completedDates>;
  createdAt?: Maybe<RemindersFields_createdAt>;
  date?: Maybe<RemindersFields_date>;
  isRecurring?: Maybe<RemindersFields_isRecurring>;
  lastTriggeredAt?: Maybe<RemindersFields_lastTriggeredAt>;
  member?: Maybe<RemindersFields_member>;
  nextDueDate?: Maybe<RemindersFields_nextDueDate>;
  recurrencePeriod?: Maybe<RemindersFields_recurrencePeriod>;
  recurrenceType?: Maybe<RemindersFields_recurrenceType>;
  tags?: Maybe<RemindersFields_tags>;
  title?: Maybe<RemindersFields_title>;
  type?: Maybe<RemindersFields_type>;
  updatedAt?: Maybe<RemindersFields_updatedAt>;
  user?: Maybe<RemindersFields_user>;
};

export type RemindersFields_account = {
  __typename?: 'RemindersFields_account';
  create?: Maybe<RemindersFields_account_Create>;
  delete?: Maybe<RemindersFields_account_Delete>;
  read?: Maybe<RemindersFields_account_Read>;
  update?: Maybe<RemindersFields_account_Update>;
};

export type RemindersFields_account_Create = {
  __typename?: 'RemindersFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_account_Delete = {
  __typename?: 'RemindersFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_account_Read = {
  __typename?: 'RemindersFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_account_Update = {
  __typename?: 'RemindersFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_amount = {
  __typename?: 'RemindersFields_amount';
  create?: Maybe<RemindersFields_amount_Create>;
  delete?: Maybe<RemindersFields_amount_Delete>;
  read?: Maybe<RemindersFields_amount_Read>;
  update?: Maybe<RemindersFields_amount_Update>;
};

export type RemindersFields_amount_Create = {
  __typename?: 'RemindersFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_amount_Delete = {
  __typename?: 'RemindersFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_amount_Read = {
  __typename?: 'RemindersFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_amount_Update = {
  __typename?: 'RemindersFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_archived = {
  __typename?: 'RemindersFields_archived';
  create?: Maybe<RemindersFields_archived_Create>;
  delete?: Maybe<RemindersFields_archived_Delete>;
  read?: Maybe<RemindersFields_archived_Read>;
  update?: Maybe<RemindersFields_archived_Update>;
};

export type RemindersFields_archived_Create = {
  __typename?: 'RemindersFields_archived_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_archived_Delete = {
  __typename?: 'RemindersFields_archived_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_archived_Read = {
  __typename?: 'RemindersFields_archived_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_archived_Update = {
  __typename?: 'RemindersFields_archived_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_category = {
  __typename?: 'RemindersFields_category';
  create?: Maybe<RemindersFields_category_Create>;
  delete?: Maybe<RemindersFields_category_Delete>;
  read?: Maybe<RemindersFields_category_Read>;
  update?: Maybe<RemindersFields_category_Update>;
};

export type RemindersFields_category_Create = {
  __typename?: 'RemindersFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_category_Delete = {
  __typename?: 'RemindersFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_category_Read = {
  __typename?: 'RemindersFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_category_Update = {
  __typename?: 'RemindersFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates = {
  __typename?: 'RemindersFields_completedDates';
  create?: Maybe<RemindersFields_completedDates_Create>;
  delete?: Maybe<RemindersFields_completedDates_Delete>;
  fields?: Maybe<RemindersFields_completedDates_Fields>;
  read?: Maybe<RemindersFields_completedDates_Read>;
  update?: Maybe<RemindersFields_completedDates_Update>;
};

export type RemindersFields_completedDates_Create = {
  __typename?: 'RemindersFields_completedDates_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_Delete = {
  __typename?: 'RemindersFields_completedDates_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_Fields = {
  __typename?: 'RemindersFields_completedDates_Fields';
  date?: Maybe<RemindersFields_completedDates_date>;
  id?: Maybe<RemindersFields_completedDates_id>;
};

export type RemindersFields_completedDates_Read = {
  __typename?: 'RemindersFields_completedDates_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_Update = {
  __typename?: 'RemindersFields_completedDates_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_date = {
  __typename?: 'RemindersFields_completedDates_date';
  create?: Maybe<RemindersFields_completedDates_date_Create>;
  delete?: Maybe<RemindersFields_completedDates_date_Delete>;
  read?: Maybe<RemindersFields_completedDates_date_Read>;
  update?: Maybe<RemindersFields_completedDates_date_Update>;
};

export type RemindersFields_completedDates_date_Create = {
  __typename?: 'RemindersFields_completedDates_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_date_Delete = {
  __typename?: 'RemindersFields_completedDates_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_date_Read = {
  __typename?: 'RemindersFields_completedDates_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_date_Update = {
  __typename?: 'RemindersFields_completedDates_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_id = {
  __typename?: 'RemindersFields_completedDates_id';
  create?: Maybe<RemindersFields_completedDates_id_Create>;
  delete?: Maybe<RemindersFields_completedDates_id_Delete>;
  read?: Maybe<RemindersFields_completedDates_id_Read>;
  update?: Maybe<RemindersFields_completedDates_id_Update>;
};

export type RemindersFields_completedDates_id_Create = {
  __typename?: 'RemindersFields_completedDates_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_id_Delete = {
  __typename?: 'RemindersFields_completedDates_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_id_Read = {
  __typename?: 'RemindersFields_completedDates_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_completedDates_id_Update = {
  __typename?: 'RemindersFields_completedDates_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_createdAt = {
  __typename?: 'RemindersFields_createdAt';
  create?: Maybe<RemindersFields_createdAt_Create>;
  delete?: Maybe<RemindersFields_createdAt_Delete>;
  read?: Maybe<RemindersFields_createdAt_Read>;
  update?: Maybe<RemindersFields_createdAt_Update>;
};

export type RemindersFields_createdAt_Create = {
  __typename?: 'RemindersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_createdAt_Delete = {
  __typename?: 'RemindersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_createdAt_Read = {
  __typename?: 'RemindersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_createdAt_Update = {
  __typename?: 'RemindersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_date = {
  __typename?: 'RemindersFields_date';
  create?: Maybe<RemindersFields_date_Create>;
  delete?: Maybe<RemindersFields_date_Delete>;
  read?: Maybe<RemindersFields_date_Read>;
  update?: Maybe<RemindersFields_date_Update>;
};

export type RemindersFields_date_Create = {
  __typename?: 'RemindersFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_date_Delete = {
  __typename?: 'RemindersFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_date_Read = {
  __typename?: 'RemindersFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_date_Update = {
  __typename?: 'RemindersFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_isRecurring = {
  __typename?: 'RemindersFields_isRecurring';
  create?: Maybe<RemindersFields_isRecurring_Create>;
  delete?: Maybe<RemindersFields_isRecurring_Delete>;
  read?: Maybe<RemindersFields_isRecurring_Read>;
  update?: Maybe<RemindersFields_isRecurring_Update>;
};

export type RemindersFields_isRecurring_Create = {
  __typename?: 'RemindersFields_isRecurring_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_isRecurring_Delete = {
  __typename?: 'RemindersFields_isRecurring_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_isRecurring_Read = {
  __typename?: 'RemindersFields_isRecurring_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_isRecurring_Update = {
  __typename?: 'RemindersFields_isRecurring_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_lastTriggeredAt = {
  __typename?: 'RemindersFields_lastTriggeredAt';
  create?: Maybe<RemindersFields_lastTriggeredAt_Create>;
  delete?: Maybe<RemindersFields_lastTriggeredAt_Delete>;
  read?: Maybe<RemindersFields_lastTriggeredAt_Read>;
  update?: Maybe<RemindersFields_lastTriggeredAt_Update>;
};

export type RemindersFields_lastTriggeredAt_Create = {
  __typename?: 'RemindersFields_lastTriggeredAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_lastTriggeredAt_Delete = {
  __typename?: 'RemindersFields_lastTriggeredAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_lastTriggeredAt_Read = {
  __typename?: 'RemindersFields_lastTriggeredAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_lastTriggeredAt_Update = {
  __typename?: 'RemindersFields_lastTriggeredAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_member = {
  __typename?: 'RemindersFields_member';
  create?: Maybe<RemindersFields_member_Create>;
  delete?: Maybe<RemindersFields_member_Delete>;
  read?: Maybe<RemindersFields_member_Read>;
  update?: Maybe<RemindersFields_member_Update>;
};

export type RemindersFields_member_Create = {
  __typename?: 'RemindersFields_member_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_member_Delete = {
  __typename?: 'RemindersFields_member_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_member_Read = {
  __typename?: 'RemindersFields_member_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_member_Update = {
  __typename?: 'RemindersFields_member_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_nextDueDate = {
  __typename?: 'RemindersFields_nextDueDate';
  create?: Maybe<RemindersFields_nextDueDate_Create>;
  delete?: Maybe<RemindersFields_nextDueDate_Delete>;
  read?: Maybe<RemindersFields_nextDueDate_Read>;
  update?: Maybe<RemindersFields_nextDueDate_Update>;
};

export type RemindersFields_nextDueDate_Create = {
  __typename?: 'RemindersFields_nextDueDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_nextDueDate_Delete = {
  __typename?: 'RemindersFields_nextDueDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_nextDueDate_Read = {
  __typename?: 'RemindersFields_nextDueDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_nextDueDate_Update = {
  __typename?: 'RemindersFields_nextDueDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrencePeriod = {
  __typename?: 'RemindersFields_recurrencePeriod';
  create?: Maybe<RemindersFields_recurrencePeriod_Create>;
  delete?: Maybe<RemindersFields_recurrencePeriod_Delete>;
  read?: Maybe<RemindersFields_recurrencePeriod_Read>;
  update?: Maybe<RemindersFields_recurrencePeriod_Update>;
};

export type RemindersFields_recurrencePeriod_Create = {
  __typename?: 'RemindersFields_recurrencePeriod_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrencePeriod_Delete = {
  __typename?: 'RemindersFields_recurrencePeriod_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrencePeriod_Read = {
  __typename?: 'RemindersFields_recurrencePeriod_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrencePeriod_Update = {
  __typename?: 'RemindersFields_recurrencePeriod_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrenceType = {
  __typename?: 'RemindersFields_recurrenceType';
  create?: Maybe<RemindersFields_recurrenceType_Create>;
  delete?: Maybe<RemindersFields_recurrenceType_Delete>;
  read?: Maybe<RemindersFields_recurrenceType_Read>;
  update?: Maybe<RemindersFields_recurrenceType_Update>;
};

export type RemindersFields_recurrenceType_Create = {
  __typename?: 'RemindersFields_recurrenceType_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrenceType_Delete = {
  __typename?: 'RemindersFields_recurrenceType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrenceType_Read = {
  __typename?: 'RemindersFields_recurrenceType_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_recurrenceType_Update = {
  __typename?: 'RemindersFields_recurrenceType_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_tags = {
  __typename?: 'RemindersFields_tags';
  create?: Maybe<RemindersFields_tags_Create>;
  delete?: Maybe<RemindersFields_tags_Delete>;
  read?: Maybe<RemindersFields_tags_Read>;
  update?: Maybe<RemindersFields_tags_Update>;
};

export type RemindersFields_tags_Create = {
  __typename?: 'RemindersFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_tags_Delete = {
  __typename?: 'RemindersFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_tags_Read = {
  __typename?: 'RemindersFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_tags_Update = {
  __typename?: 'RemindersFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_title = {
  __typename?: 'RemindersFields_title';
  create?: Maybe<RemindersFields_title_Create>;
  delete?: Maybe<RemindersFields_title_Delete>;
  read?: Maybe<RemindersFields_title_Read>;
  update?: Maybe<RemindersFields_title_Update>;
};

export type RemindersFields_title_Create = {
  __typename?: 'RemindersFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_title_Delete = {
  __typename?: 'RemindersFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_title_Read = {
  __typename?: 'RemindersFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_title_Update = {
  __typename?: 'RemindersFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_type = {
  __typename?: 'RemindersFields_type';
  create?: Maybe<RemindersFields_type_Create>;
  delete?: Maybe<RemindersFields_type_Delete>;
  read?: Maybe<RemindersFields_type_Read>;
  update?: Maybe<RemindersFields_type_Update>;
};

export type RemindersFields_type_Create = {
  __typename?: 'RemindersFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_type_Delete = {
  __typename?: 'RemindersFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_type_Read = {
  __typename?: 'RemindersFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_type_Update = {
  __typename?: 'RemindersFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_updatedAt = {
  __typename?: 'RemindersFields_updatedAt';
  create?: Maybe<RemindersFields_updatedAt_Create>;
  delete?: Maybe<RemindersFields_updatedAt_Delete>;
  read?: Maybe<RemindersFields_updatedAt_Read>;
  update?: Maybe<RemindersFields_updatedAt_Update>;
};

export type RemindersFields_updatedAt_Create = {
  __typename?: 'RemindersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_updatedAt_Delete = {
  __typename?: 'RemindersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_updatedAt_Read = {
  __typename?: 'RemindersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_updatedAt_Update = {
  __typename?: 'RemindersFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_user = {
  __typename?: 'RemindersFields_user';
  create?: Maybe<RemindersFields_user_Create>;
  delete?: Maybe<RemindersFields_user_Delete>;
  read?: Maybe<RemindersFields_user_Read>;
  update?: Maybe<RemindersFields_user_Update>;
};

export type RemindersFields_user_Create = {
  __typename?: 'RemindersFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_user_Delete = {
  __typename?: 'RemindersFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_user_Read = {
  __typename?: 'RemindersFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_user_Update = {
  __typename?: 'RemindersFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersReadAccess = {
  __typename?: 'RemindersReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersReadDocAccess = {
  __typename?: 'RemindersReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersUpdateAccess = {
  __typename?: 'RemindersUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type RemindersUpdateDocAccess = {
  __typename?: 'RemindersUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type TagActivity = {
  __typename?: 'TagActivity';
  averagePerTransaction: Scalars['Float']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expenseAmount: Scalars['Float']['output'];
  expenseTransactionCount: Scalars['Int']['output'];
  highestTransaction: Scalars['Float']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  incomeAmount: Scalars['Float']['output'];
  incomeTransactionCount: Scalars['Int']['output'];
  isSystem: Scalars['Boolean']['output'];
  lowestTransaction: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  totalTransactionCount: Scalars['Int']['output'];
  transferAmount: Scalars['Float']['output'];
  transferTransactionCount: Scalars['Int']['output'];
};

export type Tag_bgColor_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_color_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Tag_description_operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Tag_icon_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_isActive_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Tag_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Tag_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Tag_where = {
  AND?: InputMaybe<Array<InputMaybe<Tag_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_where_or>>>;
  bgColor?: InputMaybe<Tag_bgColor_operator>;
  color?: InputMaybe<Tag_color_operator>;
  createdAt?: InputMaybe<Tag_createdAt_operator>;
  description?: InputMaybe<Tag_description_operator>;
  icon?: InputMaybe<Tag_icon_operator>;
  id?: InputMaybe<Tag_id_operator>;
  isActive?: InputMaybe<Tag_isActive_operator>;
  name?: InputMaybe<Tag_name_operator>;
  updatedAt?: InputMaybe<Tag_updatedAt_operator>;
  user?: InputMaybe<Tag_user_operator>;
};

export type Tag_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Tag_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_where_or>>>;
  bgColor?: InputMaybe<Tag_bgColor_operator>;
  color?: InputMaybe<Tag_color_operator>;
  createdAt?: InputMaybe<Tag_createdAt_operator>;
  description?: InputMaybe<Tag_description_operator>;
  icon?: InputMaybe<Tag_icon_operator>;
  id?: InputMaybe<Tag_id_operator>;
  isActive?: InputMaybe<Tag_isActive_operator>;
  name?: InputMaybe<Tag_name_operator>;
  updatedAt?: InputMaybe<Tag_updatedAt_operator>;
  user?: InputMaybe<Tag_user_operator>;
};

export type Tag_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Tag_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_where_or>>>;
  bgColor?: InputMaybe<Tag_bgColor_operator>;
  color?: InputMaybe<Tag_color_operator>;
  createdAt?: InputMaybe<Tag_createdAt_operator>;
  description?: InputMaybe<Tag_description_operator>;
  icon?: InputMaybe<Tag_icon_operator>;
  id?: InputMaybe<Tag_id_operator>;
  isActive?: InputMaybe<Tag_isActive_operator>;
  name?: InputMaybe<Tag_name_operator>;
  updatedAt?: InputMaybe<Tag_updatedAt_operator>;
  user?: InputMaybe<Tag_user_operator>;
};

export type Tags = {
  __typename?: 'Tags';
  docs: Array<Tag>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type TagsCreateAccess = {
  __typename?: 'TagsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsCreateDocAccess = {
  __typename?: 'TagsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsDeleteAccess = {
  __typename?: 'TagsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsDeleteDocAccess = {
  __typename?: 'TagsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsDocAccessFields = {
  __typename?: 'TagsDocAccessFields';
  bgColor?: Maybe<TagsDocAccessFields_bgColor>;
  color?: Maybe<TagsDocAccessFields_color>;
  createdAt?: Maybe<TagsDocAccessFields_createdAt>;
  description?: Maybe<TagsDocAccessFields_description>;
  icon?: Maybe<TagsDocAccessFields_icon>;
  isActive?: Maybe<TagsDocAccessFields_isActive>;
  name?: Maybe<TagsDocAccessFields_name>;
  updatedAt?: Maybe<TagsDocAccessFields_updatedAt>;
  user?: Maybe<TagsDocAccessFields_user>;
};

export type TagsDocAccessFields_bgColor = {
  __typename?: 'TagsDocAccessFields_bgColor';
  create?: Maybe<TagsDocAccessFields_bgColor_Create>;
  delete?: Maybe<TagsDocAccessFields_bgColor_Delete>;
  read?: Maybe<TagsDocAccessFields_bgColor_Read>;
  update?: Maybe<TagsDocAccessFields_bgColor_Update>;
};

export type TagsDocAccessFields_bgColor_Create = {
  __typename?: 'TagsDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_bgColor_Delete = {
  __typename?: 'TagsDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_bgColor_Read = {
  __typename?: 'TagsDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_bgColor_Update = {
  __typename?: 'TagsDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_color = {
  __typename?: 'TagsDocAccessFields_color';
  create?: Maybe<TagsDocAccessFields_color_Create>;
  delete?: Maybe<TagsDocAccessFields_color_Delete>;
  read?: Maybe<TagsDocAccessFields_color_Read>;
  update?: Maybe<TagsDocAccessFields_color_Update>;
};

export type TagsDocAccessFields_color_Create = {
  __typename?: 'TagsDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_color_Delete = {
  __typename?: 'TagsDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_color_Read = {
  __typename?: 'TagsDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_color_Update = {
  __typename?: 'TagsDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_createdAt = {
  __typename?: 'TagsDocAccessFields_createdAt';
  create?: Maybe<TagsDocAccessFields_createdAt_Create>;
  delete?: Maybe<TagsDocAccessFields_createdAt_Delete>;
  read?: Maybe<TagsDocAccessFields_createdAt_Read>;
  update?: Maybe<TagsDocAccessFields_createdAt_Update>;
};

export type TagsDocAccessFields_createdAt_Create = {
  __typename?: 'TagsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_createdAt_Delete = {
  __typename?: 'TagsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_createdAt_Read = {
  __typename?: 'TagsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_createdAt_Update = {
  __typename?: 'TagsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_description = {
  __typename?: 'TagsDocAccessFields_description';
  create?: Maybe<TagsDocAccessFields_description_Create>;
  delete?: Maybe<TagsDocAccessFields_description_Delete>;
  read?: Maybe<TagsDocAccessFields_description_Read>;
  update?: Maybe<TagsDocAccessFields_description_Update>;
};

export type TagsDocAccessFields_description_Create = {
  __typename?: 'TagsDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_description_Delete = {
  __typename?: 'TagsDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_description_Read = {
  __typename?: 'TagsDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_description_Update = {
  __typename?: 'TagsDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_icon = {
  __typename?: 'TagsDocAccessFields_icon';
  create?: Maybe<TagsDocAccessFields_icon_Create>;
  delete?: Maybe<TagsDocAccessFields_icon_Delete>;
  read?: Maybe<TagsDocAccessFields_icon_Read>;
  update?: Maybe<TagsDocAccessFields_icon_Update>;
};

export type TagsDocAccessFields_icon_Create = {
  __typename?: 'TagsDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_icon_Delete = {
  __typename?: 'TagsDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_icon_Read = {
  __typename?: 'TagsDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_icon_Update = {
  __typename?: 'TagsDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_isActive = {
  __typename?: 'TagsDocAccessFields_isActive';
  create?: Maybe<TagsDocAccessFields_isActive_Create>;
  delete?: Maybe<TagsDocAccessFields_isActive_Delete>;
  read?: Maybe<TagsDocAccessFields_isActive_Read>;
  update?: Maybe<TagsDocAccessFields_isActive_Update>;
};

export type TagsDocAccessFields_isActive_Create = {
  __typename?: 'TagsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_isActive_Delete = {
  __typename?: 'TagsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_isActive_Read = {
  __typename?: 'TagsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_isActive_Update = {
  __typename?: 'TagsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_name = {
  __typename?: 'TagsDocAccessFields_name';
  create?: Maybe<TagsDocAccessFields_name_Create>;
  delete?: Maybe<TagsDocAccessFields_name_Delete>;
  read?: Maybe<TagsDocAccessFields_name_Read>;
  update?: Maybe<TagsDocAccessFields_name_Update>;
};

export type TagsDocAccessFields_name_Create = {
  __typename?: 'TagsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_name_Delete = {
  __typename?: 'TagsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_name_Read = {
  __typename?: 'TagsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_name_Update = {
  __typename?: 'TagsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_updatedAt = {
  __typename?: 'TagsDocAccessFields_updatedAt';
  create?: Maybe<TagsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<TagsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<TagsDocAccessFields_updatedAt_Read>;
  update?: Maybe<TagsDocAccessFields_updatedAt_Update>;
};

export type TagsDocAccessFields_updatedAt_Create = {
  __typename?: 'TagsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_updatedAt_Delete = {
  __typename?: 'TagsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_updatedAt_Read = {
  __typename?: 'TagsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_updatedAt_Update = {
  __typename?: 'TagsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_user = {
  __typename?: 'TagsDocAccessFields_user';
  create?: Maybe<TagsDocAccessFields_user_Create>;
  delete?: Maybe<TagsDocAccessFields_user_Delete>;
  read?: Maybe<TagsDocAccessFields_user_Read>;
  update?: Maybe<TagsDocAccessFields_user_Update>;
};

export type TagsDocAccessFields_user_Create = {
  __typename?: 'TagsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_user_Delete = {
  __typename?: 'TagsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_user_Read = {
  __typename?: 'TagsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_user_Update = {
  __typename?: 'TagsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields = {
  __typename?: 'TagsFields';
  bgColor?: Maybe<TagsFields_bgColor>;
  color?: Maybe<TagsFields_color>;
  createdAt?: Maybe<TagsFields_createdAt>;
  description?: Maybe<TagsFields_description>;
  icon?: Maybe<TagsFields_icon>;
  isActive?: Maybe<TagsFields_isActive>;
  name?: Maybe<TagsFields_name>;
  updatedAt?: Maybe<TagsFields_updatedAt>;
  user?: Maybe<TagsFields_user>;
};

export type TagsFields_bgColor = {
  __typename?: 'TagsFields_bgColor';
  create?: Maybe<TagsFields_bgColor_Create>;
  delete?: Maybe<TagsFields_bgColor_Delete>;
  read?: Maybe<TagsFields_bgColor_Read>;
  update?: Maybe<TagsFields_bgColor_Update>;
};

export type TagsFields_bgColor_Create = {
  __typename?: 'TagsFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_bgColor_Delete = {
  __typename?: 'TagsFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_bgColor_Read = {
  __typename?: 'TagsFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_bgColor_Update = {
  __typename?: 'TagsFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_color = {
  __typename?: 'TagsFields_color';
  create?: Maybe<TagsFields_color_Create>;
  delete?: Maybe<TagsFields_color_Delete>;
  read?: Maybe<TagsFields_color_Read>;
  update?: Maybe<TagsFields_color_Update>;
};

export type TagsFields_color_Create = {
  __typename?: 'TagsFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_color_Delete = {
  __typename?: 'TagsFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_color_Read = {
  __typename?: 'TagsFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_color_Update = {
  __typename?: 'TagsFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_createdAt = {
  __typename?: 'TagsFields_createdAt';
  create?: Maybe<TagsFields_createdAt_Create>;
  delete?: Maybe<TagsFields_createdAt_Delete>;
  read?: Maybe<TagsFields_createdAt_Read>;
  update?: Maybe<TagsFields_createdAt_Update>;
};

export type TagsFields_createdAt_Create = {
  __typename?: 'TagsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_createdAt_Delete = {
  __typename?: 'TagsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_createdAt_Read = {
  __typename?: 'TagsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_createdAt_Update = {
  __typename?: 'TagsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_description = {
  __typename?: 'TagsFields_description';
  create?: Maybe<TagsFields_description_Create>;
  delete?: Maybe<TagsFields_description_Delete>;
  read?: Maybe<TagsFields_description_Read>;
  update?: Maybe<TagsFields_description_Update>;
};

export type TagsFields_description_Create = {
  __typename?: 'TagsFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_description_Delete = {
  __typename?: 'TagsFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_description_Read = {
  __typename?: 'TagsFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_description_Update = {
  __typename?: 'TagsFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_icon = {
  __typename?: 'TagsFields_icon';
  create?: Maybe<TagsFields_icon_Create>;
  delete?: Maybe<TagsFields_icon_Delete>;
  read?: Maybe<TagsFields_icon_Read>;
  update?: Maybe<TagsFields_icon_Update>;
};

export type TagsFields_icon_Create = {
  __typename?: 'TagsFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_icon_Delete = {
  __typename?: 'TagsFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_icon_Read = {
  __typename?: 'TagsFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_icon_Update = {
  __typename?: 'TagsFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_isActive = {
  __typename?: 'TagsFields_isActive';
  create?: Maybe<TagsFields_isActive_Create>;
  delete?: Maybe<TagsFields_isActive_Delete>;
  read?: Maybe<TagsFields_isActive_Read>;
  update?: Maybe<TagsFields_isActive_Update>;
};

export type TagsFields_isActive_Create = {
  __typename?: 'TagsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_isActive_Delete = {
  __typename?: 'TagsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_isActive_Read = {
  __typename?: 'TagsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_isActive_Update = {
  __typename?: 'TagsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_name = {
  __typename?: 'TagsFields_name';
  create?: Maybe<TagsFields_name_Create>;
  delete?: Maybe<TagsFields_name_Delete>;
  read?: Maybe<TagsFields_name_Read>;
  update?: Maybe<TagsFields_name_Update>;
};

export type TagsFields_name_Create = {
  __typename?: 'TagsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_name_Delete = {
  __typename?: 'TagsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_name_Read = {
  __typename?: 'TagsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_name_Update = {
  __typename?: 'TagsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_updatedAt = {
  __typename?: 'TagsFields_updatedAt';
  create?: Maybe<TagsFields_updatedAt_Create>;
  delete?: Maybe<TagsFields_updatedAt_Delete>;
  read?: Maybe<TagsFields_updatedAt_Read>;
  update?: Maybe<TagsFields_updatedAt_Update>;
};

export type TagsFields_updatedAt_Create = {
  __typename?: 'TagsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_updatedAt_Delete = {
  __typename?: 'TagsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_updatedAt_Read = {
  __typename?: 'TagsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_updatedAt_Update = {
  __typename?: 'TagsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_user = {
  __typename?: 'TagsFields_user';
  create?: Maybe<TagsFields_user_Create>;
  delete?: Maybe<TagsFields_user_Delete>;
  read?: Maybe<TagsFields_user_Read>;
  update?: Maybe<TagsFields_user_Update>;
};

export type TagsFields_user_Create = {
  __typename?: 'TagsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_user_Delete = {
  __typename?: 'TagsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_user_Read = {
  __typename?: 'TagsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_user_Update = {
  __typename?: 'TagsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsReadAccess = {
  __typename?: 'TagsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsReadDocAccess = {
  __typename?: 'TagsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsUpdateAccess = {
  __typename?: 'TagsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TagsUpdateDocAccess = {
  __typename?: 'TagsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Timezone = {
  __typename?: 'Timezone';
  city: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  offset: Scalars['String']['output'];
  region: Scalars['String']['output'];
};

export type TimezonesResult = {
  __typename?: 'TimezonesResult';
  docs?: Maybe<Array<Maybe<Timezone>>>;
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  account: Account;
  amount: Scalars['String']['output'];
  attachments?: Maybe<Array<Media>>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  toAccount?: Maybe<Account>;
  type: Transaction_type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum TransactionUpdate_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Transaction_account_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_amount_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_attachments_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_category_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_date_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_deletedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_isActive_operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Transaction_note_operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction_person_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_tags_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_title_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_toAccount_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export enum Transaction_type {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Transaction_type_Input {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export enum Transaction_type_MutationInput {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer'
}

export type Transaction_type_operator = {
  all?: InputMaybe<Array<InputMaybe<Transaction_type_Input>>>;
  equals?: InputMaybe<Transaction_type_Input>;
  in?: InputMaybe<Array<InputMaybe<Transaction_type_Input>>>;
  not_equals?: InputMaybe<Transaction_type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Transaction_type_Input>>>;
};

export type Transaction_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_where = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_where_or>>>;
  account?: InputMaybe<Transaction_account_operator>;
  amount?: InputMaybe<Transaction_amount_operator>;
  attachments?: InputMaybe<Transaction_attachments_operator>;
  category?: InputMaybe<Transaction_category_operator>;
  createdAt?: InputMaybe<Transaction_createdAt_operator>;
  date?: InputMaybe<Transaction_date_operator>;
  deletedAt?: InputMaybe<Transaction_deletedAt_operator>;
  id?: InputMaybe<Transaction_id_operator>;
  isActive?: InputMaybe<Transaction_isActive_operator>;
  note?: InputMaybe<Transaction_note_operator>;
  person?: InputMaybe<Transaction_person_operator>;
  tags?: InputMaybe<Transaction_tags_operator>;
  title?: InputMaybe<Transaction_title_operator>;
  toAccount?: InputMaybe<Transaction_toAccount_operator>;
  type?: InputMaybe<Transaction_type_operator>;
  updatedAt?: InputMaybe<Transaction_updatedAt_operator>;
  user?: InputMaybe<Transaction_user_operator>;
};

export type Transaction_where_and = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_where_or>>>;
  account?: InputMaybe<Transaction_account_operator>;
  amount?: InputMaybe<Transaction_amount_operator>;
  attachments?: InputMaybe<Transaction_attachments_operator>;
  category?: InputMaybe<Transaction_category_operator>;
  createdAt?: InputMaybe<Transaction_createdAt_operator>;
  date?: InputMaybe<Transaction_date_operator>;
  deletedAt?: InputMaybe<Transaction_deletedAt_operator>;
  id?: InputMaybe<Transaction_id_operator>;
  isActive?: InputMaybe<Transaction_isActive_operator>;
  note?: InputMaybe<Transaction_note_operator>;
  person?: InputMaybe<Transaction_person_operator>;
  tags?: InputMaybe<Transaction_tags_operator>;
  title?: InputMaybe<Transaction_title_operator>;
  toAccount?: InputMaybe<Transaction_toAccount_operator>;
  type?: InputMaybe<Transaction_type_operator>;
  updatedAt?: InputMaybe<Transaction_updatedAt_operator>;
  user?: InputMaybe<Transaction_user_operator>;
};

export type Transaction_where_or = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_where_or>>>;
  account?: InputMaybe<Transaction_account_operator>;
  amount?: InputMaybe<Transaction_amount_operator>;
  attachments?: InputMaybe<Transaction_attachments_operator>;
  category?: InputMaybe<Transaction_category_operator>;
  createdAt?: InputMaybe<Transaction_createdAt_operator>;
  date?: InputMaybe<Transaction_date_operator>;
  deletedAt?: InputMaybe<Transaction_deletedAt_operator>;
  id?: InputMaybe<Transaction_id_operator>;
  isActive?: InputMaybe<Transaction_isActive_operator>;
  note?: InputMaybe<Transaction_note_operator>;
  person?: InputMaybe<Transaction_person_operator>;
  tags?: InputMaybe<Transaction_tags_operator>;
  title?: InputMaybe<Transaction_title_operator>;
  toAccount?: InputMaybe<Transaction_toAccount_operator>;
  type?: InputMaybe<Transaction_type_operator>;
  updatedAt?: InputMaybe<Transaction_updatedAt_operator>;
  user?: InputMaybe<Transaction_user_operator>;
};

export type Transactions = {
  __typename?: 'Transactions';
  docs: Array<Transaction>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type TransactionsCreateAccess = {
  __typename?: 'TransactionsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsCreateDocAccess = {
  __typename?: 'TransactionsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsDeleteAccess = {
  __typename?: 'TransactionsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsDeleteDocAccess = {
  __typename?: 'TransactionsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsDocAccessFields = {
  __typename?: 'TransactionsDocAccessFields';
  account?: Maybe<TransactionsDocAccessFields_account>;
  amount?: Maybe<TransactionsDocAccessFields_amount>;
  attachments?: Maybe<TransactionsDocAccessFields_attachments>;
  category?: Maybe<TransactionsDocAccessFields_category>;
  createdAt?: Maybe<TransactionsDocAccessFields_createdAt>;
  date?: Maybe<TransactionsDocAccessFields_date>;
  deletedAt?: Maybe<TransactionsDocAccessFields_deletedAt>;
  isActive?: Maybe<TransactionsDocAccessFields_isActive>;
  note?: Maybe<TransactionsDocAccessFields_note>;
  person?: Maybe<TransactionsDocAccessFields_person>;
  tags?: Maybe<TransactionsDocAccessFields_tags>;
  title?: Maybe<TransactionsDocAccessFields_title>;
  toAccount?: Maybe<TransactionsDocAccessFields_toAccount>;
  type?: Maybe<TransactionsDocAccessFields_type>;
  updatedAt?: Maybe<TransactionsDocAccessFields_updatedAt>;
  user?: Maybe<TransactionsDocAccessFields_user>;
};

export type TransactionsDocAccessFields_account = {
  __typename?: 'TransactionsDocAccessFields_account';
  create?: Maybe<TransactionsDocAccessFields_account_Create>;
  delete?: Maybe<TransactionsDocAccessFields_account_Delete>;
  read?: Maybe<TransactionsDocAccessFields_account_Read>;
  update?: Maybe<TransactionsDocAccessFields_account_Update>;
};

export type TransactionsDocAccessFields_account_Create = {
  __typename?: 'TransactionsDocAccessFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_account_Delete = {
  __typename?: 'TransactionsDocAccessFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_account_Read = {
  __typename?: 'TransactionsDocAccessFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_account_Update = {
  __typename?: 'TransactionsDocAccessFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_amount = {
  __typename?: 'TransactionsDocAccessFields_amount';
  create?: Maybe<TransactionsDocAccessFields_amount_Create>;
  delete?: Maybe<TransactionsDocAccessFields_amount_Delete>;
  read?: Maybe<TransactionsDocAccessFields_amount_Read>;
  update?: Maybe<TransactionsDocAccessFields_amount_Update>;
};

export type TransactionsDocAccessFields_amount_Create = {
  __typename?: 'TransactionsDocAccessFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_amount_Delete = {
  __typename?: 'TransactionsDocAccessFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_amount_Read = {
  __typename?: 'TransactionsDocAccessFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_amount_Update = {
  __typename?: 'TransactionsDocAccessFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_attachments = {
  __typename?: 'TransactionsDocAccessFields_attachments';
  create?: Maybe<TransactionsDocAccessFields_attachments_Create>;
  delete?: Maybe<TransactionsDocAccessFields_attachments_Delete>;
  read?: Maybe<TransactionsDocAccessFields_attachments_Read>;
  update?: Maybe<TransactionsDocAccessFields_attachments_Update>;
};

export type TransactionsDocAccessFields_attachments_Create = {
  __typename?: 'TransactionsDocAccessFields_attachments_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_attachments_Delete = {
  __typename?: 'TransactionsDocAccessFields_attachments_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_attachments_Read = {
  __typename?: 'TransactionsDocAccessFields_attachments_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_attachments_Update = {
  __typename?: 'TransactionsDocAccessFields_attachments_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_category = {
  __typename?: 'TransactionsDocAccessFields_category';
  create?: Maybe<TransactionsDocAccessFields_category_Create>;
  delete?: Maybe<TransactionsDocAccessFields_category_Delete>;
  read?: Maybe<TransactionsDocAccessFields_category_Read>;
  update?: Maybe<TransactionsDocAccessFields_category_Update>;
};

export type TransactionsDocAccessFields_category_Create = {
  __typename?: 'TransactionsDocAccessFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_category_Delete = {
  __typename?: 'TransactionsDocAccessFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_category_Read = {
  __typename?: 'TransactionsDocAccessFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_category_Update = {
  __typename?: 'TransactionsDocAccessFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_createdAt = {
  __typename?: 'TransactionsDocAccessFields_createdAt';
  create?: Maybe<TransactionsDocAccessFields_createdAt_Create>;
  delete?: Maybe<TransactionsDocAccessFields_createdAt_Delete>;
  read?: Maybe<TransactionsDocAccessFields_createdAt_Read>;
  update?: Maybe<TransactionsDocAccessFields_createdAt_Update>;
};

export type TransactionsDocAccessFields_createdAt_Create = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_createdAt_Delete = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_createdAt_Read = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_createdAt_Update = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_date = {
  __typename?: 'TransactionsDocAccessFields_date';
  create?: Maybe<TransactionsDocAccessFields_date_Create>;
  delete?: Maybe<TransactionsDocAccessFields_date_Delete>;
  read?: Maybe<TransactionsDocAccessFields_date_Read>;
  update?: Maybe<TransactionsDocAccessFields_date_Update>;
};

export type TransactionsDocAccessFields_date_Create = {
  __typename?: 'TransactionsDocAccessFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_date_Delete = {
  __typename?: 'TransactionsDocAccessFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_date_Read = {
  __typename?: 'TransactionsDocAccessFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_date_Update = {
  __typename?: 'TransactionsDocAccessFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_deletedAt = {
  __typename?: 'TransactionsDocAccessFields_deletedAt';
  create?: Maybe<TransactionsDocAccessFields_deletedAt_Create>;
  delete?: Maybe<TransactionsDocAccessFields_deletedAt_Delete>;
  read?: Maybe<TransactionsDocAccessFields_deletedAt_Read>;
  update?: Maybe<TransactionsDocAccessFields_deletedAt_Update>;
};

export type TransactionsDocAccessFields_deletedAt_Create = {
  __typename?: 'TransactionsDocAccessFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_deletedAt_Delete = {
  __typename?: 'TransactionsDocAccessFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_deletedAt_Read = {
  __typename?: 'TransactionsDocAccessFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_deletedAt_Update = {
  __typename?: 'TransactionsDocAccessFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_isActive = {
  __typename?: 'TransactionsDocAccessFields_isActive';
  create?: Maybe<TransactionsDocAccessFields_isActive_Create>;
  delete?: Maybe<TransactionsDocAccessFields_isActive_Delete>;
  read?: Maybe<TransactionsDocAccessFields_isActive_Read>;
  update?: Maybe<TransactionsDocAccessFields_isActive_Update>;
};

export type TransactionsDocAccessFields_isActive_Create = {
  __typename?: 'TransactionsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_isActive_Delete = {
  __typename?: 'TransactionsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_isActive_Read = {
  __typename?: 'TransactionsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_isActive_Update = {
  __typename?: 'TransactionsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_note = {
  __typename?: 'TransactionsDocAccessFields_note';
  create?: Maybe<TransactionsDocAccessFields_note_Create>;
  delete?: Maybe<TransactionsDocAccessFields_note_Delete>;
  read?: Maybe<TransactionsDocAccessFields_note_Read>;
  update?: Maybe<TransactionsDocAccessFields_note_Update>;
};

export type TransactionsDocAccessFields_note_Create = {
  __typename?: 'TransactionsDocAccessFields_note_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_note_Delete = {
  __typename?: 'TransactionsDocAccessFields_note_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_note_Read = {
  __typename?: 'TransactionsDocAccessFields_note_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_note_Update = {
  __typename?: 'TransactionsDocAccessFields_note_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_person = {
  __typename?: 'TransactionsDocAccessFields_person';
  create?: Maybe<TransactionsDocAccessFields_person_Create>;
  delete?: Maybe<TransactionsDocAccessFields_person_Delete>;
  read?: Maybe<TransactionsDocAccessFields_person_Read>;
  update?: Maybe<TransactionsDocAccessFields_person_Update>;
};

export type TransactionsDocAccessFields_person_Create = {
  __typename?: 'TransactionsDocAccessFields_person_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_person_Delete = {
  __typename?: 'TransactionsDocAccessFields_person_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_person_Read = {
  __typename?: 'TransactionsDocAccessFields_person_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_person_Update = {
  __typename?: 'TransactionsDocAccessFields_person_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_tags = {
  __typename?: 'TransactionsDocAccessFields_tags';
  create?: Maybe<TransactionsDocAccessFields_tags_Create>;
  delete?: Maybe<TransactionsDocAccessFields_tags_Delete>;
  read?: Maybe<TransactionsDocAccessFields_tags_Read>;
  update?: Maybe<TransactionsDocAccessFields_tags_Update>;
};

export type TransactionsDocAccessFields_tags_Create = {
  __typename?: 'TransactionsDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_tags_Delete = {
  __typename?: 'TransactionsDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_tags_Read = {
  __typename?: 'TransactionsDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_tags_Update = {
  __typename?: 'TransactionsDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_title = {
  __typename?: 'TransactionsDocAccessFields_title';
  create?: Maybe<TransactionsDocAccessFields_title_Create>;
  delete?: Maybe<TransactionsDocAccessFields_title_Delete>;
  read?: Maybe<TransactionsDocAccessFields_title_Read>;
  update?: Maybe<TransactionsDocAccessFields_title_Update>;
};

export type TransactionsDocAccessFields_title_Create = {
  __typename?: 'TransactionsDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_title_Delete = {
  __typename?: 'TransactionsDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_title_Read = {
  __typename?: 'TransactionsDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_title_Update = {
  __typename?: 'TransactionsDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_toAccount = {
  __typename?: 'TransactionsDocAccessFields_toAccount';
  create?: Maybe<TransactionsDocAccessFields_toAccount_Create>;
  delete?: Maybe<TransactionsDocAccessFields_toAccount_Delete>;
  read?: Maybe<TransactionsDocAccessFields_toAccount_Read>;
  update?: Maybe<TransactionsDocAccessFields_toAccount_Update>;
};

export type TransactionsDocAccessFields_toAccount_Create = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_toAccount_Delete = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_toAccount_Read = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_toAccount_Update = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_type = {
  __typename?: 'TransactionsDocAccessFields_type';
  create?: Maybe<TransactionsDocAccessFields_type_Create>;
  delete?: Maybe<TransactionsDocAccessFields_type_Delete>;
  read?: Maybe<TransactionsDocAccessFields_type_Read>;
  update?: Maybe<TransactionsDocAccessFields_type_Update>;
};

export type TransactionsDocAccessFields_type_Create = {
  __typename?: 'TransactionsDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_type_Delete = {
  __typename?: 'TransactionsDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_type_Read = {
  __typename?: 'TransactionsDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_type_Update = {
  __typename?: 'TransactionsDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_updatedAt = {
  __typename?: 'TransactionsDocAccessFields_updatedAt';
  create?: Maybe<TransactionsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<TransactionsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<TransactionsDocAccessFields_updatedAt_Read>;
  update?: Maybe<TransactionsDocAccessFields_updatedAt_Update>;
};

export type TransactionsDocAccessFields_updatedAt_Create = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_updatedAt_Delete = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_updatedAt_Read = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_updatedAt_Update = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_user = {
  __typename?: 'TransactionsDocAccessFields_user';
  create?: Maybe<TransactionsDocAccessFields_user_Create>;
  delete?: Maybe<TransactionsDocAccessFields_user_Delete>;
  read?: Maybe<TransactionsDocAccessFields_user_Read>;
  update?: Maybe<TransactionsDocAccessFields_user_Update>;
};

export type TransactionsDocAccessFields_user_Create = {
  __typename?: 'TransactionsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_user_Delete = {
  __typename?: 'TransactionsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_user_Read = {
  __typename?: 'TransactionsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_user_Update = {
  __typename?: 'TransactionsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields = {
  __typename?: 'TransactionsFields';
  account?: Maybe<TransactionsFields_account>;
  amount?: Maybe<TransactionsFields_amount>;
  attachments?: Maybe<TransactionsFields_attachments>;
  category?: Maybe<TransactionsFields_category>;
  createdAt?: Maybe<TransactionsFields_createdAt>;
  date?: Maybe<TransactionsFields_date>;
  deletedAt?: Maybe<TransactionsFields_deletedAt>;
  isActive?: Maybe<TransactionsFields_isActive>;
  note?: Maybe<TransactionsFields_note>;
  person?: Maybe<TransactionsFields_person>;
  tags?: Maybe<TransactionsFields_tags>;
  title?: Maybe<TransactionsFields_title>;
  toAccount?: Maybe<TransactionsFields_toAccount>;
  type?: Maybe<TransactionsFields_type>;
  updatedAt?: Maybe<TransactionsFields_updatedAt>;
  user?: Maybe<TransactionsFields_user>;
};

export type TransactionsFields_account = {
  __typename?: 'TransactionsFields_account';
  create?: Maybe<TransactionsFields_account_Create>;
  delete?: Maybe<TransactionsFields_account_Delete>;
  read?: Maybe<TransactionsFields_account_Read>;
  update?: Maybe<TransactionsFields_account_Update>;
};

export type TransactionsFields_account_Create = {
  __typename?: 'TransactionsFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_account_Delete = {
  __typename?: 'TransactionsFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_account_Read = {
  __typename?: 'TransactionsFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_account_Update = {
  __typename?: 'TransactionsFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_amount = {
  __typename?: 'TransactionsFields_amount';
  create?: Maybe<TransactionsFields_amount_Create>;
  delete?: Maybe<TransactionsFields_amount_Delete>;
  read?: Maybe<TransactionsFields_amount_Read>;
  update?: Maybe<TransactionsFields_amount_Update>;
};

export type TransactionsFields_amount_Create = {
  __typename?: 'TransactionsFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_amount_Delete = {
  __typename?: 'TransactionsFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_amount_Read = {
  __typename?: 'TransactionsFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_amount_Update = {
  __typename?: 'TransactionsFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_attachments = {
  __typename?: 'TransactionsFields_attachments';
  create?: Maybe<TransactionsFields_attachments_Create>;
  delete?: Maybe<TransactionsFields_attachments_Delete>;
  read?: Maybe<TransactionsFields_attachments_Read>;
  update?: Maybe<TransactionsFields_attachments_Update>;
};

export type TransactionsFields_attachments_Create = {
  __typename?: 'TransactionsFields_attachments_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_attachments_Delete = {
  __typename?: 'TransactionsFields_attachments_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_attachments_Read = {
  __typename?: 'TransactionsFields_attachments_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_attachments_Update = {
  __typename?: 'TransactionsFields_attachments_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_category = {
  __typename?: 'TransactionsFields_category';
  create?: Maybe<TransactionsFields_category_Create>;
  delete?: Maybe<TransactionsFields_category_Delete>;
  read?: Maybe<TransactionsFields_category_Read>;
  update?: Maybe<TransactionsFields_category_Update>;
};

export type TransactionsFields_category_Create = {
  __typename?: 'TransactionsFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_category_Delete = {
  __typename?: 'TransactionsFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_category_Read = {
  __typename?: 'TransactionsFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_category_Update = {
  __typename?: 'TransactionsFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_createdAt = {
  __typename?: 'TransactionsFields_createdAt';
  create?: Maybe<TransactionsFields_createdAt_Create>;
  delete?: Maybe<TransactionsFields_createdAt_Delete>;
  read?: Maybe<TransactionsFields_createdAt_Read>;
  update?: Maybe<TransactionsFields_createdAt_Update>;
};

export type TransactionsFields_createdAt_Create = {
  __typename?: 'TransactionsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_createdAt_Delete = {
  __typename?: 'TransactionsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_createdAt_Read = {
  __typename?: 'TransactionsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_createdAt_Update = {
  __typename?: 'TransactionsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_date = {
  __typename?: 'TransactionsFields_date';
  create?: Maybe<TransactionsFields_date_Create>;
  delete?: Maybe<TransactionsFields_date_Delete>;
  read?: Maybe<TransactionsFields_date_Read>;
  update?: Maybe<TransactionsFields_date_Update>;
};

export type TransactionsFields_date_Create = {
  __typename?: 'TransactionsFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_date_Delete = {
  __typename?: 'TransactionsFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_date_Read = {
  __typename?: 'TransactionsFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_date_Update = {
  __typename?: 'TransactionsFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_deletedAt = {
  __typename?: 'TransactionsFields_deletedAt';
  create?: Maybe<TransactionsFields_deletedAt_Create>;
  delete?: Maybe<TransactionsFields_deletedAt_Delete>;
  read?: Maybe<TransactionsFields_deletedAt_Read>;
  update?: Maybe<TransactionsFields_deletedAt_Update>;
};

export type TransactionsFields_deletedAt_Create = {
  __typename?: 'TransactionsFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_deletedAt_Delete = {
  __typename?: 'TransactionsFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_deletedAt_Read = {
  __typename?: 'TransactionsFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_deletedAt_Update = {
  __typename?: 'TransactionsFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_isActive = {
  __typename?: 'TransactionsFields_isActive';
  create?: Maybe<TransactionsFields_isActive_Create>;
  delete?: Maybe<TransactionsFields_isActive_Delete>;
  read?: Maybe<TransactionsFields_isActive_Read>;
  update?: Maybe<TransactionsFields_isActive_Update>;
};

export type TransactionsFields_isActive_Create = {
  __typename?: 'TransactionsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_isActive_Delete = {
  __typename?: 'TransactionsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_isActive_Read = {
  __typename?: 'TransactionsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_isActive_Update = {
  __typename?: 'TransactionsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_note = {
  __typename?: 'TransactionsFields_note';
  create?: Maybe<TransactionsFields_note_Create>;
  delete?: Maybe<TransactionsFields_note_Delete>;
  read?: Maybe<TransactionsFields_note_Read>;
  update?: Maybe<TransactionsFields_note_Update>;
};

export type TransactionsFields_note_Create = {
  __typename?: 'TransactionsFields_note_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_note_Delete = {
  __typename?: 'TransactionsFields_note_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_note_Read = {
  __typename?: 'TransactionsFields_note_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_note_Update = {
  __typename?: 'TransactionsFields_note_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_person = {
  __typename?: 'TransactionsFields_person';
  create?: Maybe<TransactionsFields_person_Create>;
  delete?: Maybe<TransactionsFields_person_Delete>;
  read?: Maybe<TransactionsFields_person_Read>;
  update?: Maybe<TransactionsFields_person_Update>;
};

export type TransactionsFields_person_Create = {
  __typename?: 'TransactionsFields_person_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_person_Delete = {
  __typename?: 'TransactionsFields_person_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_person_Read = {
  __typename?: 'TransactionsFields_person_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_person_Update = {
  __typename?: 'TransactionsFields_person_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_tags = {
  __typename?: 'TransactionsFields_tags';
  create?: Maybe<TransactionsFields_tags_Create>;
  delete?: Maybe<TransactionsFields_tags_Delete>;
  read?: Maybe<TransactionsFields_tags_Read>;
  update?: Maybe<TransactionsFields_tags_Update>;
};

export type TransactionsFields_tags_Create = {
  __typename?: 'TransactionsFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_tags_Delete = {
  __typename?: 'TransactionsFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_tags_Read = {
  __typename?: 'TransactionsFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_tags_Update = {
  __typename?: 'TransactionsFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_title = {
  __typename?: 'TransactionsFields_title';
  create?: Maybe<TransactionsFields_title_Create>;
  delete?: Maybe<TransactionsFields_title_Delete>;
  read?: Maybe<TransactionsFields_title_Read>;
  update?: Maybe<TransactionsFields_title_Update>;
};

export type TransactionsFields_title_Create = {
  __typename?: 'TransactionsFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_title_Delete = {
  __typename?: 'TransactionsFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_title_Read = {
  __typename?: 'TransactionsFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_title_Update = {
  __typename?: 'TransactionsFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_toAccount = {
  __typename?: 'TransactionsFields_toAccount';
  create?: Maybe<TransactionsFields_toAccount_Create>;
  delete?: Maybe<TransactionsFields_toAccount_Delete>;
  read?: Maybe<TransactionsFields_toAccount_Read>;
  update?: Maybe<TransactionsFields_toAccount_Update>;
};

export type TransactionsFields_toAccount_Create = {
  __typename?: 'TransactionsFields_toAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_toAccount_Delete = {
  __typename?: 'TransactionsFields_toAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_toAccount_Read = {
  __typename?: 'TransactionsFields_toAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_toAccount_Update = {
  __typename?: 'TransactionsFields_toAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_type = {
  __typename?: 'TransactionsFields_type';
  create?: Maybe<TransactionsFields_type_Create>;
  delete?: Maybe<TransactionsFields_type_Delete>;
  read?: Maybe<TransactionsFields_type_Read>;
  update?: Maybe<TransactionsFields_type_Update>;
};

export type TransactionsFields_type_Create = {
  __typename?: 'TransactionsFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_type_Delete = {
  __typename?: 'TransactionsFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_type_Read = {
  __typename?: 'TransactionsFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_type_Update = {
  __typename?: 'TransactionsFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_updatedAt = {
  __typename?: 'TransactionsFields_updatedAt';
  create?: Maybe<TransactionsFields_updatedAt_Create>;
  delete?: Maybe<TransactionsFields_updatedAt_Delete>;
  read?: Maybe<TransactionsFields_updatedAt_Read>;
  update?: Maybe<TransactionsFields_updatedAt_Update>;
};

export type TransactionsFields_updatedAt_Create = {
  __typename?: 'TransactionsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_updatedAt_Delete = {
  __typename?: 'TransactionsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_updatedAt_Read = {
  __typename?: 'TransactionsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_updatedAt_Update = {
  __typename?: 'TransactionsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_user = {
  __typename?: 'TransactionsFields_user';
  create?: Maybe<TransactionsFields_user_Create>;
  delete?: Maybe<TransactionsFields_user_Delete>;
  read?: Maybe<TransactionsFields_user_Read>;
  update?: Maybe<TransactionsFields_user_Update>;
};

export type TransactionsFields_user_Create = {
  __typename?: 'TransactionsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_user_Delete = {
  __typename?: 'TransactionsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_user_Read = {
  __typename?: 'TransactionsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_user_Update = {
  __typename?: 'TransactionsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsReadAccess = {
  __typename?: 'TransactionsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsReadDocAccess = {
  __typename?: 'TransactionsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsUpdateAccess = {
  __typename?: 'TransactionsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type TransactionsUpdateDocAccess = {
  __typename?: 'TransactionsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Media>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['EmailAddress']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lockUntil?: Maybe<Scalars['DateTime']['output']>;
  loginAttempts?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  resetPasswordExpiration?: Maybe<Scalars['DateTime']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<User_role>;
  salt?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<User_Sessions>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserSetting = {
  __typename?: 'UserSetting';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  defaultAccount?: Maybe<Account>;
  geminiApiKey?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<Scalars['JSON']['output']>;
  theme?: Maybe<UserSetting_theme>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum UserSettingUpdate_theme_MutationInput {
  dark = 'dark',
  light = 'light',
  system = 'system'
}

export type UserSetting_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserSetting_currency_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_defaultAccount_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserSetting_geminiApiKey_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_locale_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_settings_operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export enum UserSetting_theme {
  dark = 'dark',
  light = 'light',
  system = 'system'
}

export enum UserSetting_theme_Input {
  dark = 'dark',
  light = 'light',
  system = 'system'
}

export enum UserSetting_theme_MutationInput {
  dark = 'dark',
  light = 'light',
  system = 'system'
}

export type UserSetting_theme_operator = {
  all?: InputMaybe<Array<InputMaybe<UserSetting_theme_Input>>>;
  equals?: InputMaybe<UserSetting_theme_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<UserSetting_theme_Input>>>;
  not_equals?: InputMaybe<UserSetting_theme_Input>;
  not_in?: InputMaybe<Array<InputMaybe<UserSetting_theme_Input>>>;
};

export type UserSetting_timezone_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserSetting_user_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserSetting_where = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_where_or>>>;
  createdAt?: InputMaybe<UserSetting_createdAt_operator>;
  currency?: InputMaybe<UserSetting_currency_operator>;
  defaultAccount?: InputMaybe<UserSetting_defaultAccount_operator>;
  geminiApiKey?: InputMaybe<UserSetting_geminiApiKey_operator>;
  id?: InputMaybe<UserSetting_id_operator>;
  locale?: InputMaybe<UserSetting_locale_operator>;
  settings?: InputMaybe<UserSetting_settings_operator>;
  theme?: InputMaybe<UserSetting_theme_operator>;
  timezone?: InputMaybe<UserSetting_timezone_operator>;
  updatedAt?: InputMaybe<UserSetting_updatedAt_operator>;
  user?: InputMaybe<UserSetting_user_operator>;
};

export type UserSetting_where_and = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_where_or>>>;
  createdAt?: InputMaybe<UserSetting_createdAt_operator>;
  currency?: InputMaybe<UserSetting_currency_operator>;
  defaultAccount?: InputMaybe<UserSetting_defaultAccount_operator>;
  geminiApiKey?: InputMaybe<UserSetting_geminiApiKey_operator>;
  id?: InputMaybe<UserSetting_id_operator>;
  locale?: InputMaybe<UserSetting_locale_operator>;
  settings?: InputMaybe<UserSetting_settings_operator>;
  theme?: InputMaybe<UserSetting_theme_operator>;
  timezone?: InputMaybe<UserSetting_timezone_operator>;
  updatedAt?: InputMaybe<UserSetting_updatedAt_operator>;
  user?: InputMaybe<UserSetting_user_operator>;
};

export type UserSetting_where_or = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_where_or>>>;
  createdAt?: InputMaybe<UserSetting_createdAt_operator>;
  currency?: InputMaybe<UserSetting_currency_operator>;
  defaultAccount?: InputMaybe<UserSetting_defaultAccount_operator>;
  geminiApiKey?: InputMaybe<UserSetting_geminiApiKey_operator>;
  id?: InputMaybe<UserSetting_id_operator>;
  locale?: InputMaybe<UserSetting_locale_operator>;
  settings?: InputMaybe<UserSetting_settings_operator>;
  theme?: InputMaybe<UserSetting_theme_operator>;
  timezone?: InputMaybe<UserSetting_timezone_operator>;
  updatedAt?: InputMaybe<UserSetting_updatedAt_operator>;
  user?: InputMaybe<UserSetting_user_operator>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  docs: Array<UserSetting>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UserSettingsCreateAccess = {
  __typename?: 'UserSettingsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsCreateDocAccess = {
  __typename?: 'UserSettingsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsDeleteAccess = {
  __typename?: 'UserSettingsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsDeleteDocAccess = {
  __typename?: 'UserSettingsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsDocAccessFields = {
  __typename?: 'UserSettingsDocAccessFields';
  createdAt?: Maybe<UserSettingsDocAccessFields_createdAt>;
  currency?: Maybe<UserSettingsDocAccessFields_currency>;
  defaultAccount?: Maybe<UserSettingsDocAccessFields_defaultAccount>;
  geminiApiKey?: Maybe<UserSettingsDocAccessFields_geminiApiKey>;
  locale?: Maybe<UserSettingsDocAccessFields_locale>;
  settings?: Maybe<UserSettingsDocAccessFields_settings>;
  theme?: Maybe<UserSettingsDocAccessFields_theme>;
  timezone?: Maybe<UserSettingsDocAccessFields_timezone>;
  updatedAt?: Maybe<UserSettingsDocAccessFields_updatedAt>;
  user?: Maybe<UserSettingsDocAccessFields_user>;
};

export type UserSettingsDocAccessFields_createdAt = {
  __typename?: 'UserSettingsDocAccessFields_createdAt';
  create?: Maybe<UserSettingsDocAccessFields_createdAt_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_createdAt_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_createdAt_Read>;
  update?: Maybe<UserSettingsDocAccessFields_createdAt_Update>;
};

export type UserSettingsDocAccessFields_createdAt_Create = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_createdAt_Delete = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_createdAt_Read = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_createdAt_Update = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_currency = {
  __typename?: 'UserSettingsDocAccessFields_currency';
  create?: Maybe<UserSettingsDocAccessFields_currency_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_currency_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_currency_Read>;
  update?: Maybe<UserSettingsDocAccessFields_currency_Update>;
};

export type UserSettingsDocAccessFields_currency_Create = {
  __typename?: 'UserSettingsDocAccessFields_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_currency_Delete = {
  __typename?: 'UserSettingsDocAccessFields_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_currency_Read = {
  __typename?: 'UserSettingsDocAccessFields_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_currency_Update = {
  __typename?: 'UserSettingsDocAccessFields_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_defaultAccount = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount';
  create?: Maybe<UserSettingsDocAccessFields_defaultAccount_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_defaultAccount_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_defaultAccount_Read>;
  update?: Maybe<UserSettingsDocAccessFields_defaultAccount_Update>;
};

export type UserSettingsDocAccessFields_defaultAccount_Create = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_defaultAccount_Delete = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_defaultAccount_Read = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_defaultAccount_Update = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_geminiApiKey = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey';
  create?: Maybe<UserSettingsDocAccessFields_geminiApiKey_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_geminiApiKey_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_geminiApiKey_Read>;
  update?: Maybe<UserSettingsDocAccessFields_geminiApiKey_Update>;
};

export type UserSettingsDocAccessFields_geminiApiKey_Create = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_geminiApiKey_Delete = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_geminiApiKey_Read = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_geminiApiKey_Update = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_locale = {
  __typename?: 'UserSettingsDocAccessFields_locale';
  create?: Maybe<UserSettingsDocAccessFields_locale_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_locale_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_locale_Read>;
  update?: Maybe<UserSettingsDocAccessFields_locale_Update>;
};

export type UserSettingsDocAccessFields_locale_Create = {
  __typename?: 'UserSettingsDocAccessFields_locale_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_locale_Delete = {
  __typename?: 'UserSettingsDocAccessFields_locale_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_locale_Read = {
  __typename?: 'UserSettingsDocAccessFields_locale_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_locale_Update = {
  __typename?: 'UserSettingsDocAccessFields_locale_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_settings = {
  __typename?: 'UserSettingsDocAccessFields_settings';
  create?: Maybe<UserSettingsDocAccessFields_settings_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_settings_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_settings_Read>;
  update?: Maybe<UserSettingsDocAccessFields_settings_Update>;
};

export type UserSettingsDocAccessFields_settings_Create = {
  __typename?: 'UserSettingsDocAccessFields_settings_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_settings_Delete = {
  __typename?: 'UserSettingsDocAccessFields_settings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_settings_Read = {
  __typename?: 'UserSettingsDocAccessFields_settings_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_settings_Update = {
  __typename?: 'UserSettingsDocAccessFields_settings_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_theme = {
  __typename?: 'UserSettingsDocAccessFields_theme';
  create?: Maybe<UserSettingsDocAccessFields_theme_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_theme_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_theme_Read>;
  update?: Maybe<UserSettingsDocAccessFields_theme_Update>;
};

export type UserSettingsDocAccessFields_theme_Create = {
  __typename?: 'UserSettingsDocAccessFields_theme_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_theme_Delete = {
  __typename?: 'UserSettingsDocAccessFields_theme_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_theme_Read = {
  __typename?: 'UserSettingsDocAccessFields_theme_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_theme_Update = {
  __typename?: 'UserSettingsDocAccessFields_theme_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_timezone = {
  __typename?: 'UserSettingsDocAccessFields_timezone';
  create?: Maybe<UserSettingsDocAccessFields_timezone_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_timezone_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_timezone_Read>;
  update?: Maybe<UserSettingsDocAccessFields_timezone_Update>;
};

export type UserSettingsDocAccessFields_timezone_Create = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_timezone_Delete = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_timezone_Read = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_timezone_Update = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_updatedAt = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt';
  create?: Maybe<UserSettingsDocAccessFields_updatedAt_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_updatedAt_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_updatedAt_Read>;
  update?: Maybe<UserSettingsDocAccessFields_updatedAt_Update>;
};

export type UserSettingsDocAccessFields_updatedAt_Create = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_updatedAt_Delete = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_updatedAt_Read = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_updatedAt_Update = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_user = {
  __typename?: 'UserSettingsDocAccessFields_user';
  create?: Maybe<UserSettingsDocAccessFields_user_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_user_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_user_Read>;
  update?: Maybe<UserSettingsDocAccessFields_user_Update>;
};

export type UserSettingsDocAccessFields_user_Create = {
  __typename?: 'UserSettingsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_user_Delete = {
  __typename?: 'UserSettingsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_user_Read = {
  __typename?: 'UserSettingsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_user_Update = {
  __typename?: 'UserSettingsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields = {
  __typename?: 'UserSettingsFields';
  createdAt?: Maybe<UserSettingsFields_createdAt>;
  currency?: Maybe<UserSettingsFields_currency>;
  defaultAccount?: Maybe<UserSettingsFields_defaultAccount>;
  geminiApiKey?: Maybe<UserSettingsFields_geminiApiKey>;
  locale?: Maybe<UserSettingsFields_locale>;
  settings?: Maybe<UserSettingsFields_settings>;
  theme?: Maybe<UserSettingsFields_theme>;
  timezone?: Maybe<UserSettingsFields_timezone>;
  updatedAt?: Maybe<UserSettingsFields_updatedAt>;
  user?: Maybe<UserSettingsFields_user>;
};

export type UserSettingsFields_createdAt = {
  __typename?: 'UserSettingsFields_createdAt';
  create?: Maybe<UserSettingsFields_createdAt_Create>;
  delete?: Maybe<UserSettingsFields_createdAt_Delete>;
  read?: Maybe<UserSettingsFields_createdAt_Read>;
  update?: Maybe<UserSettingsFields_createdAt_Update>;
};

export type UserSettingsFields_createdAt_Create = {
  __typename?: 'UserSettingsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_createdAt_Delete = {
  __typename?: 'UserSettingsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_createdAt_Read = {
  __typename?: 'UserSettingsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_createdAt_Update = {
  __typename?: 'UserSettingsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_currency = {
  __typename?: 'UserSettingsFields_currency';
  create?: Maybe<UserSettingsFields_currency_Create>;
  delete?: Maybe<UserSettingsFields_currency_Delete>;
  read?: Maybe<UserSettingsFields_currency_Read>;
  update?: Maybe<UserSettingsFields_currency_Update>;
};

export type UserSettingsFields_currency_Create = {
  __typename?: 'UserSettingsFields_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_currency_Delete = {
  __typename?: 'UserSettingsFields_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_currency_Read = {
  __typename?: 'UserSettingsFields_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_currency_Update = {
  __typename?: 'UserSettingsFields_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_defaultAccount = {
  __typename?: 'UserSettingsFields_defaultAccount';
  create?: Maybe<UserSettingsFields_defaultAccount_Create>;
  delete?: Maybe<UserSettingsFields_defaultAccount_Delete>;
  read?: Maybe<UserSettingsFields_defaultAccount_Read>;
  update?: Maybe<UserSettingsFields_defaultAccount_Update>;
};

export type UserSettingsFields_defaultAccount_Create = {
  __typename?: 'UserSettingsFields_defaultAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_defaultAccount_Delete = {
  __typename?: 'UserSettingsFields_defaultAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_defaultAccount_Read = {
  __typename?: 'UserSettingsFields_defaultAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_defaultAccount_Update = {
  __typename?: 'UserSettingsFields_defaultAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_geminiApiKey = {
  __typename?: 'UserSettingsFields_geminiApiKey';
  create?: Maybe<UserSettingsFields_geminiApiKey_Create>;
  delete?: Maybe<UserSettingsFields_geminiApiKey_Delete>;
  read?: Maybe<UserSettingsFields_geminiApiKey_Read>;
  update?: Maybe<UserSettingsFields_geminiApiKey_Update>;
};

export type UserSettingsFields_geminiApiKey_Create = {
  __typename?: 'UserSettingsFields_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_geminiApiKey_Delete = {
  __typename?: 'UserSettingsFields_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_geminiApiKey_Read = {
  __typename?: 'UserSettingsFields_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_geminiApiKey_Update = {
  __typename?: 'UserSettingsFields_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_locale = {
  __typename?: 'UserSettingsFields_locale';
  create?: Maybe<UserSettingsFields_locale_Create>;
  delete?: Maybe<UserSettingsFields_locale_Delete>;
  read?: Maybe<UserSettingsFields_locale_Read>;
  update?: Maybe<UserSettingsFields_locale_Update>;
};

export type UserSettingsFields_locale_Create = {
  __typename?: 'UserSettingsFields_locale_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_locale_Delete = {
  __typename?: 'UserSettingsFields_locale_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_locale_Read = {
  __typename?: 'UserSettingsFields_locale_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_locale_Update = {
  __typename?: 'UserSettingsFields_locale_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_settings = {
  __typename?: 'UserSettingsFields_settings';
  create?: Maybe<UserSettingsFields_settings_Create>;
  delete?: Maybe<UserSettingsFields_settings_Delete>;
  read?: Maybe<UserSettingsFields_settings_Read>;
  update?: Maybe<UserSettingsFields_settings_Update>;
};

export type UserSettingsFields_settings_Create = {
  __typename?: 'UserSettingsFields_settings_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_settings_Delete = {
  __typename?: 'UserSettingsFields_settings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_settings_Read = {
  __typename?: 'UserSettingsFields_settings_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_settings_Update = {
  __typename?: 'UserSettingsFields_settings_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_theme = {
  __typename?: 'UserSettingsFields_theme';
  create?: Maybe<UserSettingsFields_theme_Create>;
  delete?: Maybe<UserSettingsFields_theme_Delete>;
  read?: Maybe<UserSettingsFields_theme_Read>;
  update?: Maybe<UserSettingsFields_theme_Update>;
};

export type UserSettingsFields_theme_Create = {
  __typename?: 'UserSettingsFields_theme_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_theme_Delete = {
  __typename?: 'UserSettingsFields_theme_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_theme_Read = {
  __typename?: 'UserSettingsFields_theme_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_theme_Update = {
  __typename?: 'UserSettingsFields_theme_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_timezone = {
  __typename?: 'UserSettingsFields_timezone';
  create?: Maybe<UserSettingsFields_timezone_Create>;
  delete?: Maybe<UserSettingsFields_timezone_Delete>;
  read?: Maybe<UserSettingsFields_timezone_Read>;
  update?: Maybe<UserSettingsFields_timezone_Update>;
};

export type UserSettingsFields_timezone_Create = {
  __typename?: 'UserSettingsFields_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_timezone_Delete = {
  __typename?: 'UserSettingsFields_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_timezone_Read = {
  __typename?: 'UserSettingsFields_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_timezone_Update = {
  __typename?: 'UserSettingsFields_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_updatedAt = {
  __typename?: 'UserSettingsFields_updatedAt';
  create?: Maybe<UserSettingsFields_updatedAt_Create>;
  delete?: Maybe<UserSettingsFields_updatedAt_Delete>;
  read?: Maybe<UserSettingsFields_updatedAt_Read>;
  update?: Maybe<UserSettingsFields_updatedAt_Update>;
};

export type UserSettingsFields_updatedAt_Create = {
  __typename?: 'UserSettingsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_updatedAt_Delete = {
  __typename?: 'UserSettingsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_updatedAt_Read = {
  __typename?: 'UserSettingsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_updatedAt_Update = {
  __typename?: 'UserSettingsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_user = {
  __typename?: 'UserSettingsFields_user';
  create?: Maybe<UserSettingsFields_user_Create>;
  delete?: Maybe<UserSettingsFields_user_Delete>;
  read?: Maybe<UserSettingsFields_user_Read>;
  update?: Maybe<UserSettingsFields_user_Update>;
};

export type UserSettingsFields_user_Create = {
  __typename?: 'UserSettingsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_user_Delete = {
  __typename?: 'UserSettingsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_user_Read = {
  __typename?: 'UserSettingsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_user_Update = {
  __typename?: 'UserSettingsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsReadAccess = {
  __typename?: 'UserSettingsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsReadDocAccess = {
  __typename?: 'UserSettingsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsUpdateAccess = {
  __typename?: 'UserSettingsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserSettingsUpdateDocAccess = {
  __typename?: 'UserSettingsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export enum UserUpdate_role_MutationInput {
  admin = 'admin',
  system = 'system',
  user = 'user'
}

export type User_Sessions = {
  __typename?: 'User_Sessions';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type User_avatar_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type User_createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_email_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type User_id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_name_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum User_role {
  admin = 'admin',
  system = 'system',
  user = 'user'
}

export enum User_role_Input {
  admin = 'admin',
  system = 'system',
  user = 'user'
}

export enum User_role_MutationInput {
  admin = 'admin',
  system = 'system',
  user = 'user'
}

export type User_role_operator = {
  all?: InputMaybe<Array<InputMaybe<User_role_Input>>>;
  equals?: InputMaybe<User_role_Input>;
  in?: InputMaybe<Array<InputMaybe<User_role_Input>>>;
  not_equals?: InputMaybe<User_role_Input>;
  not_in?: InputMaybe<Array<InputMaybe<User_role_Input>>>;
};

export type User_sessions__createdAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_sessions__expiresAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_sessions__id_operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_updatedAt_operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_where = {
  AND?: InputMaybe<Array<InputMaybe<User_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<User_where_or>>>;
  avatar?: InputMaybe<User_avatar_operator>;
  createdAt?: InputMaybe<User_createdAt_operator>;
  email?: InputMaybe<User_email_operator>;
  id?: InputMaybe<User_id_operator>;
  name?: InputMaybe<User_name_operator>;
  role?: InputMaybe<User_role_operator>;
  sessions__createdAt?: InputMaybe<User_sessions__createdAt_operator>;
  sessions__expiresAt?: InputMaybe<User_sessions__expiresAt_operator>;
  sessions__id?: InputMaybe<User_sessions__id_operator>;
  updatedAt?: InputMaybe<User_updatedAt_operator>;
};

export type User_where_and = {
  AND?: InputMaybe<Array<InputMaybe<User_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<User_where_or>>>;
  avatar?: InputMaybe<User_avatar_operator>;
  createdAt?: InputMaybe<User_createdAt_operator>;
  email?: InputMaybe<User_email_operator>;
  id?: InputMaybe<User_id_operator>;
  name?: InputMaybe<User_name_operator>;
  role?: InputMaybe<User_role_operator>;
  sessions__createdAt?: InputMaybe<User_sessions__createdAt_operator>;
  sessions__expiresAt?: InputMaybe<User_sessions__expiresAt_operator>;
  sessions__id?: InputMaybe<User_sessions__id_operator>;
  updatedAt?: InputMaybe<User_updatedAt_operator>;
};

export type User_where_or = {
  AND?: InputMaybe<Array<InputMaybe<User_where_and>>>;
  OR?: InputMaybe<Array<InputMaybe<User_where_or>>>;
  avatar?: InputMaybe<User_avatar_operator>;
  createdAt?: InputMaybe<User_createdAt_operator>;
  email?: InputMaybe<User_email_operator>;
  id?: InputMaybe<User_id_operator>;
  name?: InputMaybe<User_name_operator>;
  role?: InputMaybe<User_role_operator>;
  sessions__createdAt?: InputMaybe<User_sessions__createdAt_operator>;
  sessions__expiresAt?: InputMaybe<User_sessions__expiresAt_operator>;
  sessions__id?: InputMaybe<User_sessions__id_operator>;
  updatedAt?: InputMaybe<User_updatedAt_operator>;
};

export type Users = {
  __typename?: 'Users';
  docs: Array<User>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UsersCreateAccess = {
  __typename?: 'UsersCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersCreateDocAccess = {
  __typename?: 'UsersCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteAccess = {
  __typename?: 'UsersDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteDocAccess = {
  __typename?: 'UsersDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDocAccessFields = {
  __typename?: 'UsersDocAccessFields';
  avatar?: Maybe<UsersDocAccessFields_avatar>;
  createdAt?: Maybe<UsersDocAccessFields_createdAt>;
  email?: Maybe<UsersDocAccessFields_email>;
  name?: Maybe<UsersDocAccessFields_name>;
  role?: Maybe<UsersDocAccessFields_role>;
  sessions?: Maybe<UsersDocAccessFields_sessions>;
  updatedAt?: Maybe<UsersDocAccessFields_updatedAt>;
};

export type UsersDocAccessFields_avatar = {
  __typename?: 'UsersDocAccessFields_avatar';
  create?: Maybe<UsersDocAccessFields_avatar_Create>;
  delete?: Maybe<UsersDocAccessFields_avatar_Delete>;
  read?: Maybe<UsersDocAccessFields_avatar_Read>;
  update?: Maybe<UsersDocAccessFields_avatar_Update>;
};

export type UsersDocAccessFields_avatar_Create = {
  __typename?: 'UsersDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_avatar_Delete = {
  __typename?: 'UsersDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_avatar_Read = {
  __typename?: 'UsersDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_avatar_Update = {
  __typename?: 'UsersDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_createdAt = {
  __typename?: 'UsersDocAccessFields_createdAt';
  create?: Maybe<UsersDocAccessFields_createdAt_Create>;
  delete?: Maybe<UsersDocAccessFields_createdAt_Delete>;
  read?: Maybe<UsersDocAccessFields_createdAt_Read>;
  update?: Maybe<UsersDocAccessFields_createdAt_Update>;
};

export type UsersDocAccessFields_createdAt_Create = {
  __typename?: 'UsersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_createdAt_Delete = {
  __typename?: 'UsersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_createdAt_Read = {
  __typename?: 'UsersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_createdAt_Update = {
  __typename?: 'UsersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_email = {
  __typename?: 'UsersDocAccessFields_email';
  create?: Maybe<UsersDocAccessFields_email_Create>;
  delete?: Maybe<UsersDocAccessFields_email_Delete>;
  read?: Maybe<UsersDocAccessFields_email_Read>;
  update?: Maybe<UsersDocAccessFields_email_Update>;
};

export type UsersDocAccessFields_email_Create = {
  __typename?: 'UsersDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_email_Delete = {
  __typename?: 'UsersDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_email_Read = {
  __typename?: 'UsersDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_email_Update = {
  __typename?: 'UsersDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_name = {
  __typename?: 'UsersDocAccessFields_name';
  create?: Maybe<UsersDocAccessFields_name_Create>;
  delete?: Maybe<UsersDocAccessFields_name_Delete>;
  read?: Maybe<UsersDocAccessFields_name_Read>;
  update?: Maybe<UsersDocAccessFields_name_Update>;
};

export type UsersDocAccessFields_name_Create = {
  __typename?: 'UsersDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_name_Delete = {
  __typename?: 'UsersDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_name_Read = {
  __typename?: 'UsersDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_name_Update = {
  __typename?: 'UsersDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_role = {
  __typename?: 'UsersDocAccessFields_role';
  create?: Maybe<UsersDocAccessFields_role_Create>;
  delete?: Maybe<UsersDocAccessFields_role_Delete>;
  read?: Maybe<UsersDocAccessFields_role_Read>;
  update?: Maybe<UsersDocAccessFields_role_Update>;
};

export type UsersDocAccessFields_role_Create = {
  __typename?: 'UsersDocAccessFields_role_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_role_Delete = {
  __typename?: 'UsersDocAccessFields_role_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_role_Read = {
  __typename?: 'UsersDocAccessFields_role_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_role_Update = {
  __typename?: 'UsersDocAccessFields_role_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions = {
  __typename?: 'UsersDocAccessFields_sessions';
  create?: Maybe<UsersDocAccessFields_sessions_Create>;
  delete?: Maybe<UsersDocAccessFields_sessions_Delete>;
  fields?: Maybe<UsersDocAccessFields_sessions_Fields>;
  read?: Maybe<UsersDocAccessFields_sessions_Read>;
  update?: Maybe<UsersDocAccessFields_sessions_Update>;
};

export type UsersDocAccessFields_sessions_Create = {
  __typename?: 'UsersDocAccessFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_Fields = {
  __typename?: 'UsersDocAccessFields_sessions_Fields';
  createdAt?: Maybe<UsersDocAccessFields_sessions_createdAt>;
  expiresAt?: Maybe<UsersDocAccessFields_sessions_expiresAt>;
  id?: Maybe<UsersDocAccessFields_sessions_id>;
};

export type UsersDocAccessFields_sessions_Read = {
  __typename?: 'UsersDocAccessFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_Update = {
  __typename?: 'UsersDocAccessFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_createdAt = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt';
  create?: Maybe<UsersDocAccessFields_sessions_createdAt_Create>;
  delete?: Maybe<UsersDocAccessFields_sessions_createdAt_Delete>;
  read?: Maybe<UsersDocAccessFields_sessions_createdAt_Read>;
  update?: Maybe<UsersDocAccessFields_sessions_createdAt_Update>;
};

export type UsersDocAccessFields_sessions_createdAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_createdAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_createdAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_createdAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_expiresAt = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt';
  create?: Maybe<UsersDocAccessFields_sessions_expiresAt_Create>;
  delete?: Maybe<UsersDocAccessFields_sessions_expiresAt_Delete>;
  read?: Maybe<UsersDocAccessFields_sessions_expiresAt_Read>;
  update?: Maybe<UsersDocAccessFields_sessions_expiresAt_Update>;
};

export type UsersDocAccessFields_sessions_expiresAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_expiresAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_expiresAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_expiresAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_id = {
  __typename?: 'UsersDocAccessFields_sessions_id';
  create?: Maybe<UsersDocAccessFields_sessions_id_Create>;
  delete?: Maybe<UsersDocAccessFields_sessions_id_Delete>;
  read?: Maybe<UsersDocAccessFields_sessions_id_Read>;
  update?: Maybe<UsersDocAccessFields_sessions_id_Update>;
};

export type UsersDocAccessFields_sessions_id_Create = {
  __typename?: 'UsersDocAccessFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_id_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_id_Read = {
  __typename?: 'UsersDocAccessFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_sessions_id_Update = {
  __typename?: 'UsersDocAccessFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_updatedAt = {
  __typename?: 'UsersDocAccessFields_updatedAt';
  create?: Maybe<UsersDocAccessFields_updatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_updatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_updatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_updatedAt_Update>;
};

export type UsersDocAccessFields_updatedAt_Create = {
  __typename?: 'UsersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_updatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_updatedAt_Read = {
  __typename?: 'UsersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_updatedAt_Update = {
  __typename?: 'UsersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields = {
  __typename?: 'UsersFields';
  avatar?: Maybe<UsersFields_avatar>;
  createdAt?: Maybe<UsersFields_createdAt>;
  email?: Maybe<UsersFields_email>;
  name?: Maybe<UsersFields_name>;
  role?: Maybe<UsersFields_role>;
  sessions?: Maybe<UsersFields_sessions>;
  updatedAt?: Maybe<UsersFields_updatedAt>;
};

export type UsersFields_avatar = {
  __typename?: 'UsersFields_avatar';
  create?: Maybe<UsersFields_avatar_Create>;
  delete?: Maybe<UsersFields_avatar_Delete>;
  read?: Maybe<UsersFields_avatar_Read>;
  update?: Maybe<UsersFields_avatar_Update>;
};

export type UsersFields_avatar_Create = {
  __typename?: 'UsersFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_avatar_Delete = {
  __typename?: 'UsersFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_avatar_Read = {
  __typename?: 'UsersFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_avatar_Update = {
  __typename?: 'UsersFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_createdAt = {
  __typename?: 'UsersFields_createdAt';
  create?: Maybe<UsersFields_createdAt_Create>;
  delete?: Maybe<UsersFields_createdAt_Delete>;
  read?: Maybe<UsersFields_createdAt_Read>;
  update?: Maybe<UsersFields_createdAt_Update>;
};

export type UsersFields_createdAt_Create = {
  __typename?: 'UsersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_createdAt_Delete = {
  __typename?: 'UsersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_createdAt_Read = {
  __typename?: 'UsersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_createdAt_Update = {
  __typename?: 'UsersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_email = {
  __typename?: 'UsersFields_email';
  create?: Maybe<UsersFields_email_Create>;
  delete?: Maybe<UsersFields_email_Delete>;
  read?: Maybe<UsersFields_email_Read>;
  update?: Maybe<UsersFields_email_Update>;
};

export type UsersFields_email_Create = {
  __typename?: 'UsersFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_email_Delete = {
  __typename?: 'UsersFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_email_Read = {
  __typename?: 'UsersFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_email_Update = {
  __typename?: 'UsersFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_name = {
  __typename?: 'UsersFields_name';
  create?: Maybe<UsersFields_name_Create>;
  delete?: Maybe<UsersFields_name_Delete>;
  read?: Maybe<UsersFields_name_Read>;
  update?: Maybe<UsersFields_name_Update>;
};

export type UsersFields_name_Create = {
  __typename?: 'UsersFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_name_Delete = {
  __typename?: 'UsersFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_name_Read = {
  __typename?: 'UsersFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_name_Update = {
  __typename?: 'UsersFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_role = {
  __typename?: 'UsersFields_role';
  create?: Maybe<UsersFields_role_Create>;
  delete?: Maybe<UsersFields_role_Delete>;
  read?: Maybe<UsersFields_role_Read>;
  update?: Maybe<UsersFields_role_Update>;
};

export type UsersFields_role_Create = {
  __typename?: 'UsersFields_role_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_role_Delete = {
  __typename?: 'UsersFields_role_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_role_Read = {
  __typename?: 'UsersFields_role_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_role_Update = {
  __typename?: 'UsersFields_role_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions = {
  __typename?: 'UsersFields_sessions';
  create?: Maybe<UsersFields_sessions_Create>;
  delete?: Maybe<UsersFields_sessions_Delete>;
  fields?: Maybe<UsersFields_sessions_Fields>;
  read?: Maybe<UsersFields_sessions_Read>;
  update?: Maybe<UsersFields_sessions_Update>;
};

export type UsersFields_sessions_Create = {
  __typename?: 'UsersFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_Delete = {
  __typename?: 'UsersFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_Fields = {
  __typename?: 'UsersFields_sessions_Fields';
  createdAt?: Maybe<UsersFields_sessions_createdAt>;
  expiresAt?: Maybe<UsersFields_sessions_expiresAt>;
  id?: Maybe<UsersFields_sessions_id>;
};

export type UsersFields_sessions_Read = {
  __typename?: 'UsersFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_Update = {
  __typename?: 'UsersFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_createdAt = {
  __typename?: 'UsersFields_sessions_createdAt';
  create?: Maybe<UsersFields_sessions_createdAt_Create>;
  delete?: Maybe<UsersFields_sessions_createdAt_Delete>;
  read?: Maybe<UsersFields_sessions_createdAt_Read>;
  update?: Maybe<UsersFields_sessions_createdAt_Update>;
};

export type UsersFields_sessions_createdAt_Create = {
  __typename?: 'UsersFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_createdAt_Delete = {
  __typename?: 'UsersFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_createdAt_Read = {
  __typename?: 'UsersFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_createdAt_Update = {
  __typename?: 'UsersFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_expiresAt = {
  __typename?: 'UsersFields_sessions_expiresAt';
  create?: Maybe<UsersFields_sessions_expiresAt_Create>;
  delete?: Maybe<UsersFields_sessions_expiresAt_Delete>;
  read?: Maybe<UsersFields_sessions_expiresAt_Read>;
  update?: Maybe<UsersFields_sessions_expiresAt_Update>;
};

export type UsersFields_sessions_expiresAt_Create = {
  __typename?: 'UsersFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_expiresAt_Delete = {
  __typename?: 'UsersFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_expiresAt_Read = {
  __typename?: 'UsersFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_expiresAt_Update = {
  __typename?: 'UsersFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_id = {
  __typename?: 'UsersFields_sessions_id';
  create?: Maybe<UsersFields_sessions_id_Create>;
  delete?: Maybe<UsersFields_sessions_id_Delete>;
  read?: Maybe<UsersFields_sessions_id_Read>;
  update?: Maybe<UsersFields_sessions_id_Update>;
};

export type UsersFields_sessions_id_Create = {
  __typename?: 'UsersFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_id_Delete = {
  __typename?: 'UsersFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_id_Read = {
  __typename?: 'UsersFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_sessions_id_Update = {
  __typename?: 'UsersFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_updatedAt = {
  __typename?: 'UsersFields_updatedAt';
  create?: Maybe<UsersFields_updatedAt_Create>;
  delete?: Maybe<UsersFields_updatedAt_Delete>;
  read?: Maybe<UsersFields_updatedAt_Read>;
  update?: Maybe<UsersFields_updatedAt_Update>;
};

export type UsersFields_updatedAt_Create = {
  __typename?: 'UsersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_updatedAt_Delete = {
  __typename?: 'UsersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_updatedAt_Read = {
  __typename?: 'UsersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_updatedAt_Update = {
  __typename?: 'UsersFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersReadAccess = {
  __typename?: 'UsersReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersReadDocAccess = {
  __typename?: 'UsersReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockAccess = {
  __typename?: 'UsersUnlockAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockDocAccess = {
  __typename?: 'UsersUnlockDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateAccess = {
  __typename?: 'UsersUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateDocAccess = {
  __typename?: 'UsersUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type WeeklyExpenses = {
  __typename?: 'WeeklyExpenses';
  fri: Scalars['Float']['output'];
  mon: Scalars['Float']['output'];
  sat: Scalars['Float']['output'];
  sun: Scalars['Float']['output'];
  thu: Scalars['Float']['output'];
  tue: Scalars['Float']['output'];
  wed: Scalars['Float']['output'];
};

export type WeeklyExpensesDay = {
  __typename?: 'WeeklyExpensesDay';
  date: Scalars['String']['output'];
  day: Scalars['String']['output'];
  total: Scalars['Float']['output'];
};

export type WeeklyExpensesResult = {
  __typename?: 'WeeklyExpensesResult';
  dailyData?: Maybe<Array<Maybe<WeeklyExpensesDay>>>;
  days: WeeklyExpenses;
  timezone: Scalars['String']['output'];
};

export type accountsAccess = {
  __typename?: 'accountsAccess';
  create?: Maybe<AccountsCreateAccess>;
  delete?: Maybe<AccountsDeleteAccess>;
  fields?: Maybe<AccountsFields>;
  read?: Maybe<AccountsReadAccess>;
  update?: Maybe<AccountsUpdateAccess>;
};

export type accountsDocAccess = {
  __typename?: 'accountsDocAccess';
  create?: Maybe<AccountsCreateDocAccess>;
  delete?: Maybe<AccountsDeleteDocAccess>;
  fields?: Maybe<AccountsDocAccessFields>;
  read?: Maybe<AccountsReadDocAccess>;
  update?: Maybe<AccountsUpdateDocAccess>;
};

export type ai_usagesAccess = {
  __typename?: 'ai_usagesAccess';
  create?: Maybe<AiUsagesCreateAccess>;
  delete?: Maybe<AiUsagesDeleteAccess>;
  fields?: Maybe<AiUsagesFields>;
  read?: Maybe<AiUsagesReadAccess>;
  update?: Maybe<AiUsagesUpdateAccess>;
};

export type ai_usagesDocAccess = {
  __typename?: 'ai_usagesDocAccess';
  create?: Maybe<AiUsagesCreateDocAccess>;
  delete?: Maybe<AiUsagesDeleteDocAccess>;
  fields?: Maybe<AiUsagesDocAccessFields>;
  read?: Maybe<AiUsagesReadDocAccess>;
  update?: Maybe<AiUsagesUpdateDocAccess>;
};

export type allMedia = {
  __typename?: 'allMedia';
  docs: Array<Media>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type app_settingsAccess = {
  __typename?: 'app_settingsAccess';
  fields?: Maybe<AppSettingsFields>;
  read?: Maybe<AppSettingsReadAccess>;
  update?: Maybe<AppSettingsUpdateAccess>;
};

export type app_settingsDocAccess = {
  __typename?: 'app_settingsDocAccess';
  fields?: Maybe<AppSettingsDocAccessFields>;
  read?: Maybe<AppSettingsReadDocAccess>;
  update?: Maybe<AppSettingsUpdateDocAccess>;
};

export type categoriesAccess = {
  __typename?: 'categoriesAccess';
  create?: Maybe<CategoriesCreateAccess>;
  delete?: Maybe<CategoriesDeleteAccess>;
  fields?: Maybe<CategoriesFields>;
  read?: Maybe<CategoriesReadAccess>;
  update?: Maybe<CategoriesUpdateAccess>;
};

export type categoriesDocAccess = {
  __typename?: 'categoriesDocAccess';
  create?: Maybe<CategoriesCreateDocAccess>;
  delete?: Maybe<CategoriesDeleteDocAccess>;
  fields?: Maybe<CategoriesDocAccessFields>;
  read?: Maybe<CategoriesReadDocAccess>;
  update?: Maybe<CategoriesUpdateDocAccess>;
};

export type countAccounts = {
  __typename?: 'countAccounts';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countAiUsages = {
  __typename?: 'countAiUsages';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countCategories = {
  __typename?: 'countCategories';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countOauthAccounts = {
  __typename?: 'countOauthAccounts';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countPayloadKvs = {
  __typename?: 'countPayloadKvs';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countPayloadLockedDocuments = {
  __typename?: 'countPayloadLockedDocuments';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countPayloadMcpApiKeys = {
  __typename?: 'countPayloadMcpApiKeys';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countPayloadPreferences = {
  __typename?: 'countPayloadPreferences';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countPeople = {
  __typename?: 'countPeople';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countReminders = {
  __typename?: 'countReminders';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countTags = {
  __typename?: 'countTags';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countTransactions = {
  __typename?: 'countTransactions';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countUserSettings = {
  __typename?: 'countUserSettings';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countUsers = {
  __typename?: 'countUsers';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type countallMedia = {
  __typename?: 'countallMedia';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type mediaAccess = {
  __typename?: 'mediaAccess';
  create?: Maybe<MediaCreateAccess>;
  delete?: Maybe<MediaDeleteAccess>;
  fields?: Maybe<MediaFields>;
  read?: Maybe<MediaReadAccess>;
  update?: Maybe<MediaUpdateAccess>;
};

export type mediaDocAccess = {
  __typename?: 'mediaDocAccess';
  create?: Maybe<MediaCreateDocAccess>;
  delete?: Maybe<MediaDeleteDocAccess>;
  fields?: Maybe<MediaDocAccessFields>;
  read?: Maybe<MediaReadDocAccess>;
  update?: Maybe<MediaUpdateDocAccess>;
};

export type mutationAccountInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastTransactionAt?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  totalTransactions?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationAccountUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastTransactionAt?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  totalTransactions?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationAiUsageInput = {
  apiKeyType?: InputMaybe<AiUsage_apiKeyType_MutationInput>;
  candidateTokens?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  latencyMs?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  promptTokens?: InputMaybe<Scalars['Float']['input']>;
  promptType: AiUsage_promptType_MutationInput;
  status: AiUsage_status_MutationInput;
  totalTokens?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationAiUsageUpdateInput = {
  apiKeyType?: InputMaybe<AiUsageUpdate_apiKeyType_MutationInput>;
  candidateTokens?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  latencyMs?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  promptTokens?: InputMaybe<Scalars['Float']['input']>;
  promptType?: InputMaybe<AiUsageUpdate_promptType_MutationInput>;
  status?: InputMaybe<AiUsageUpdate_status_MutationInput>;
  totalTokens?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationAppSettingInput = {
  ai?: InputMaybe<mutationAppSetting_AiInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type mutationAppSetting_AiInput = {
  allowUserApiKey?: InputMaybe<Scalars['Boolean']['input']>;
  defaultModel?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  models?: InputMaybe<Array<InputMaybe<mutationAppSetting_Ai_ModelsInput>>>;
  perUserDailyLimit?: InputMaybe<Scalars['Float']['input']>;
  perUserMonthlyLimit?: InputMaybe<Scalars['Float']['input']>;
};

export type mutationAppSetting_Ai_ModelsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type mutationCategoryInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  type: Category_type_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationCategoryUpdateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryUpdate_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationMediaInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<Media_entityType_MutationInput>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Media_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type mutationMediaUpdateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<MediaUpdate_entityType_MutationInput>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaUpdate_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type mutationOauthAccountInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  issuerName: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sub: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationOauthAccountUpdateInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  issuerName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sub?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationPayloadKvInput = {
  data: Scalars['JSON']['input'];
  key: Scalars['String']['input'];
};

export type mutationPayloadKvUpdateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type mutationPayloadLockedDocumentInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocument_UserRelationshipInput>;
};

export type mutationPayloadLockedDocumentUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInput>;
};

export type mutationPayloadMcpApiKeyInput = {
  accounts?: InputMaybe<mutationPayloadMcpApiKey_AccountsInput>;
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiKeyIndex?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<mutationPayloadMcpApiKey_CategoriesInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enableAPIKey?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<mutationPayloadMcpApiKey_MediaInput>;
  payload_mcp_resource?: InputMaybe<mutationPayloadMcpApiKey_PayloadMcpResourceInput>;
  payload_mcp_tool?: InputMaybe<mutationPayloadMcpApiKey_PayloadMcpToolInput>;
  people?: InputMaybe<mutationPayloadMcpApiKey_PeopleInput>;
  reminders?: InputMaybe<mutationPayloadMcpApiKey_RemindersInput>;
  tags?: InputMaybe<mutationPayloadMcpApiKey_TagsInput>;
  transactions?: InputMaybe<mutationPayloadMcpApiKey_TransactionsInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  userSettings?: InputMaybe<mutationPayloadMcpApiKey_UserSettingsInput>;
  users?: InputMaybe<mutationPayloadMcpApiKey_UsersInput>;
};

export type mutationPayloadMcpApiKeyUpdateInput = {
  accounts?: InputMaybe<mutationPayloadMcpApiKeyUpdate_AccountsInput>;
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiKeyIndex?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<mutationPayloadMcpApiKeyUpdate_CategoriesInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enableAPIKey?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<mutationPayloadMcpApiKeyUpdate_MediaInput>;
  payload_mcp_resource?: InputMaybe<mutationPayloadMcpApiKeyUpdate_PayloadMcpResourceInput>;
  payload_mcp_tool?: InputMaybe<mutationPayloadMcpApiKeyUpdate_PayloadMcpToolInput>;
  people?: InputMaybe<mutationPayloadMcpApiKeyUpdate_PeopleInput>;
  reminders?: InputMaybe<mutationPayloadMcpApiKeyUpdate_RemindersInput>;
  tags?: InputMaybe<mutationPayloadMcpApiKeyUpdate_TagsInput>;
  transactions?: InputMaybe<mutationPayloadMcpApiKeyUpdate_TransactionsInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  userSettings?: InputMaybe<mutationPayloadMcpApiKeyUpdate_UserSettingsInput>;
  users?: InputMaybe<mutationPayloadMcpApiKeyUpdate_UsersInput>;
};

export type mutationPayloadMcpApiKeyUpdate_AccountsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_CategoriesInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_MediaInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_PayloadMcpResourceInput = {
  currencies?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['Boolean']['input']>;
  timezone?: InputMaybe<Scalars['Boolean']['input']>;
  timezones?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_PayloadMcpToolInput = {
  getDashboardSummary?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyPeople?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyTags?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_PeopleInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_RemindersInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_TagsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_TransactionsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_UserSettingsInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKeyUpdate_UsersInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_AccountsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_CategoriesInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_MediaInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_PayloadMcpResourceInput = {
  currencies?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['Boolean']['input']>;
  timezone?: InputMaybe<Scalars['Boolean']['input']>;
  timezones?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_PayloadMcpToolInput = {
  getDashboardSummary?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyPeople?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyTags?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_PeopleInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_RemindersInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_TagsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_TransactionsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_UserSettingsInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadMcpApiKey_UsersInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type mutationPayloadPreferenceInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreference_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type mutationPayloadPreferenceUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type mutationPersonInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastTransactionAt?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  totalSummary?: InputMaybe<Scalars['JSON']['input']>;
  totalTransactions?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationPersonUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastTransactionAt?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  totalSummary?: InputMaybe<Scalars['JSON']['input']>;
  totalTransactions?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationReminderInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  completedDates?: InputMaybe<Array<InputMaybe<mutationReminder_CompletedDatesInput>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  lastTriggeredAt?: InputMaybe<Scalars['String']['input']>;
  member?: InputMaybe<Scalars['String']['input']>;
  nextDueDate?: InputMaybe<Scalars['String']['input']>;
  recurrencePeriod?: InputMaybe<Scalars['Float']['input']>;
  recurrenceType?: InputMaybe<Reminder_recurrenceType_MutationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  type?: InputMaybe<Reminder_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationReminderUpdateInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  completedDates?: InputMaybe<Array<InputMaybe<mutationReminderUpdate_CompletedDatesInput>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  lastTriggeredAt?: InputMaybe<Scalars['String']['input']>;
  member?: InputMaybe<Scalars['String']['input']>;
  nextDueDate?: InputMaybe<Scalars['String']['input']>;
  recurrencePeriod?: InputMaybe<Scalars['Float']['input']>;
  recurrenceType?: InputMaybe<ReminderUpdate_recurrenceType_MutationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ReminderUpdate_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationReminderUpdate_CompletedDatesInput = {
  date: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
};

export type mutationReminder_CompletedDatesInput = {
  date: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
};

export type mutationTagInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationTagUpdateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationTransactionInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['String']['input'];
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['String']['input'];
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  toAccount?: InputMaybe<Scalars['String']['input']>;
  type: Transaction_type_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationTransactionUpdateInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  toAccount?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionUpdate_type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  hash?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<User_role_MutationInput>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<mutationUser_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type mutationUserSettingInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultAccount?: InputMaybe<Scalars['String']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  theme?: InputMaybe<UserSetting_theme_MutationInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationUserSettingUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultAccount?: InputMaybe<Scalars['String']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  theme?: InputMaybe<UserSettingUpdate_theme_MutationInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type mutationUserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserUpdate_role_MutationInput>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<mutationUserUpdate_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type mutationUserUpdate_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type mutationUser_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type oauth_accountsAccess = {
  __typename?: 'oauth_accountsAccess';
  create?: Maybe<OauthAccountsCreateAccess>;
  delete?: Maybe<OauthAccountsDeleteAccess>;
  fields?: Maybe<OauthAccountsFields>;
  read?: Maybe<OauthAccountsReadAccess>;
  update?: Maybe<OauthAccountsUpdateAccess>;
};

export type oauth_accountsDocAccess = {
  __typename?: 'oauth_accountsDocAccess';
  create?: Maybe<OauthAccountsCreateDocAccess>;
  delete?: Maybe<OauthAccountsDeleteDocAccess>;
  fields?: Maybe<OauthAccountsDocAccessFields>;
  read?: Maybe<OauthAccountsReadDocAccess>;
  update?: Maybe<OauthAccountsUpdateDocAccess>;
};

export type payload_kvAccess = {
  __typename?: 'payload_kvAccess';
  create?: Maybe<PayloadKvCreateAccess>;
  delete?: Maybe<PayloadKvDeleteAccess>;
  fields?: Maybe<PayloadKvFields>;
  read?: Maybe<PayloadKvReadAccess>;
  update?: Maybe<PayloadKvUpdateAccess>;
};

export type payload_kvDocAccess = {
  __typename?: 'payload_kvDocAccess';
  create?: Maybe<PayloadKvCreateDocAccess>;
  delete?: Maybe<PayloadKvDeleteDocAccess>;
  fields?: Maybe<PayloadKvDocAccessFields>;
  read?: Maybe<PayloadKvReadDocAccess>;
  update?: Maybe<PayloadKvUpdateDocAccess>;
};

export type payload_locked_documentsAccess = {
  __typename?: 'payload_locked_documentsAccess';
  create?: Maybe<PayloadLockedDocumentsCreateAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteAccess>;
  fields?: Maybe<PayloadLockedDocumentsFields>;
  read?: Maybe<PayloadLockedDocumentsReadAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateAccess>;
};

export type payload_locked_documentsDocAccess = {
  __typename?: 'payload_locked_documentsDocAccess';
  create?: Maybe<PayloadLockedDocumentsCreateDocAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteDocAccess>;
  fields?: Maybe<PayloadLockedDocumentsDocAccessFields>;
  read?: Maybe<PayloadLockedDocumentsReadDocAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateDocAccess>;
};

export type payload_mcp_api_keysAccess = {
  __typename?: 'payload_mcp_api_keysAccess';
  create?: Maybe<PayloadMcpApiKeysCreateAccess>;
  delete?: Maybe<PayloadMcpApiKeysDeleteAccess>;
  fields?: Maybe<PayloadMcpApiKeysFields>;
  read?: Maybe<PayloadMcpApiKeysReadAccess>;
  unlock?: Maybe<PayloadMcpApiKeysUnlockAccess>;
  update?: Maybe<PayloadMcpApiKeysUpdateAccess>;
};

export type payload_mcp_api_keysDocAccess = {
  __typename?: 'payload_mcp_api_keysDocAccess';
  create?: Maybe<PayloadMcpApiKeysCreateDocAccess>;
  delete?: Maybe<PayloadMcpApiKeysDeleteDocAccess>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields>;
  read?: Maybe<PayloadMcpApiKeysReadDocAccess>;
  unlock?: Maybe<PayloadMcpApiKeysUnlockDocAccess>;
  update?: Maybe<PayloadMcpApiKeysUpdateDocAccess>;
};

export type payload_mcp_api_keysJWT = {
  __typename?: 'payload_mcp_api_keysJWT';
  collection: Scalars['String']['output'];
};

export type payload_mcp_api_keysMe = {
  __typename?: 'payload_mcp_api_keysMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<PayloadMcpApiKey>;
};

export type payload_mcp_api_keysRefreshedPayloadMcpApiKey = {
  __typename?: 'payload_mcp_api_keysRefreshedPayloadMcpApiKey';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<payload_mcp_api_keysJWT>;
};

export type payload_preferencesAccess = {
  __typename?: 'payload_preferencesAccess';
  create?: Maybe<PayloadPreferencesCreateAccess>;
  delete?: Maybe<PayloadPreferencesDeleteAccess>;
  fields?: Maybe<PayloadPreferencesFields>;
  read?: Maybe<PayloadPreferencesReadAccess>;
  update?: Maybe<PayloadPreferencesUpdateAccess>;
};

export type payload_preferencesDocAccess = {
  __typename?: 'payload_preferencesDocAccess';
  create?: Maybe<PayloadPreferencesCreateDocAccess>;
  delete?: Maybe<PayloadPreferencesDeleteDocAccess>;
  fields?: Maybe<PayloadPreferencesDocAccessFields>;
  read?: Maybe<PayloadPreferencesReadDocAccess>;
  update?: Maybe<PayloadPreferencesUpdateDocAccess>;
};

export type peopleAccess = {
  __typename?: 'peopleAccess';
  create?: Maybe<PeopleCreateAccess>;
  delete?: Maybe<PeopleDeleteAccess>;
  fields?: Maybe<PeopleFields>;
  read?: Maybe<PeopleReadAccess>;
  update?: Maybe<PeopleUpdateAccess>;
};

export type peopleDocAccess = {
  __typename?: 'peopleDocAccess';
  create?: Maybe<PeopleCreateDocAccess>;
  delete?: Maybe<PeopleDeleteDocAccess>;
  fields?: Maybe<PeopleDocAccessFields>;
  read?: Maybe<PeopleReadDocAccess>;
  update?: Maybe<PeopleUpdateDocAccess>;
};

export type remindersAccess = {
  __typename?: 'remindersAccess';
  create?: Maybe<RemindersCreateAccess>;
  delete?: Maybe<RemindersDeleteAccess>;
  fields?: Maybe<RemindersFields>;
  read?: Maybe<RemindersReadAccess>;
  update?: Maybe<RemindersUpdateAccess>;
};

export type remindersDocAccess = {
  __typename?: 'remindersDocAccess';
  create?: Maybe<RemindersCreateDocAccess>;
  delete?: Maybe<RemindersDeleteDocAccess>;
  fields?: Maybe<RemindersDocAccessFields>;
  read?: Maybe<RemindersReadDocAccess>;
  update?: Maybe<RemindersUpdateDocAccess>;
};

export type tagsAccess = {
  __typename?: 'tagsAccess';
  create?: Maybe<TagsCreateAccess>;
  delete?: Maybe<TagsDeleteAccess>;
  fields?: Maybe<TagsFields>;
  read?: Maybe<TagsReadAccess>;
  update?: Maybe<TagsUpdateAccess>;
};

export type tagsDocAccess = {
  __typename?: 'tagsDocAccess';
  create?: Maybe<TagsCreateDocAccess>;
  delete?: Maybe<TagsDeleteDocAccess>;
  fields?: Maybe<TagsDocAccessFields>;
  read?: Maybe<TagsReadDocAccess>;
  update?: Maybe<TagsUpdateDocAccess>;
};

export type transactionsAccess = {
  __typename?: 'transactionsAccess';
  create?: Maybe<TransactionsCreateAccess>;
  delete?: Maybe<TransactionsDeleteAccess>;
  fields?: Maybe<TransactionsFields>;
  read?: Maybe<TransactionsReadAccess>;
  update?: Maybe<TransactionsUpdateAccess>;
};

export type transactionsDocAccess = {
  __typename?: 'transactionsDocAccess';
  create?: Maybe<TransactionsCreateDocAccess>;
  delete?: Maybe<TransactionsDeleteDocAccess>;
  fields?: Maybe<TransactionsDocAccessFields>;
  read?: Maybe<TransactionsReadDocAccess>;
  update?: Maybe<TransactionsUpdateDocAccess>;
};

export type user_settingsAccess = {
  __typename?: 'user_settingsAccess';
  create?: Maybe<UserSettingsCreateAccess>;
  delete?: Maybe<UserSettingsDeleteAccess>;
  fields?: Maybe<UserSettingsFields>;
  read?: Maybe<UserSettingsReadAccess>;
  update?: Maybe<UserSettingsUpdateAccess>;
};

export type user_settingsDocAccess = {
  __typename?: 'user_settingsDocAccess';
  create?: Maybe<UserSettingsCreateDocAccess>;
  delete?: Maybe<UserSettingsDeleteDocAccess>;
  fields?: Maybe<UserSettingsDocAccessFields>;
  read?: Maybe<UserSettingsReadDocAccess>;
  update?: Maybe<UserSettingsUpdateDocAccess>;
};

export type usersAccess = {
  __typename?: 'usersAccess';
  create?: Maybe<UsersCreateAccess>;
  delete?: Maybe<UsersDeleteAccess>;
  fields?: Maybe<UsersFields>;
  read?: Maybe<UsersReadAccess>;
  unlock?: Maybe<UsersUnlockAccess>;
  update?: Maybe<UsersUpdateAccess>;
};

export type usersDocAccess = {
  __typename?: 'usersDocAccess';
  create?: Maybe<UsersCreateDocAccess>;
  delete?: Maybe<UsersDeleteDocAccess>;
  fields?: Maybe<UsersDocAccessFields>;
  read?: Maybe<UsersReadDocAccess>;
  unlock?: Maybe<UsersUnlockDocAccess>;
  update?: Maybe<UsersUpdateDocAccess>;
};

export type usersJWT = {
  __typename?: 'usersJWT';
  collection: Scalars['String']['output'];
  email: Scalars['EmailAddress']['output'];
  role?: Maybe<usersJWT_role>;
};

export enum usersJWT_role {
  admin = 'admin',
  system = 'system',
  user = 'user'
}

export type usersLoginResult = {
  __typename?: 'usersLoginResult';
  exp?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type usersMe = {
  __typename?: 'usersMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type usersRefreshedUser = {
  __typename?: 'usersRefreshedUser';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<usersJWT>;
};

export type usersResetPassword = {
  __typename?: 'usersResetPassword';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AccountFieldsFragment = { __typename?: 'Account', id: string, name: string, icon: string, bgColor?: string | null, color?: string | null, description?: string | null, isActive?: boolean | null, balance?: number | null, totalTransactions?: number | null, lastTransactionAt?: any | null, createdAt?: any | null, updatedAt?: any | null, avatar?: { __typename?: 'Media', id: string, url?: string | null, thumbnailURL?: string | null } | null } & { ' $fragmentName'?: 'AccountFieldsFragment' };

export type GetAccountsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountsQuery = { __typename?: 'Query', Accounts?: { __typename?: 'Accounts', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Account' }
      & { ' $fragmentRefs'?: { 'AccountFieldsFragment': AccountFieldsFragment } }
    )> } | null };

export type GetAccountQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAccountQuery = { __typename?: 'Query', Account?: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'AccountFieldsFragment': AccountFieldsFragment } }
  ) | null };

export type CreateAccountMutationVariables = Exact<{
  data: mutationAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'AccountFieldsFragment': AccountFieldsFragment } }
  ) | null };

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationAccountUpdateInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount?: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'AccountFieldsFragment': AccountFieldsFragment } }
  ) | null };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: { __typename?: 'Account', id: string } | null };

export type TextToTransactionMutationVariables = Exact<{
  text: Scalars['String']['input'];
  model?: InputMaybe<Scalars['String']['input']>;
}>;


export type TextToTransactionMutation = { __typename?: 'Mutation', textToTransaction?: { __typename?: 'AITransactionResult', data?: any | null, model: string, latencyMs: number, usage: { __typename?: 'AIUsageMeta', promptTokenCount: number, candidatesTokenCount: number, totalTokenCount: number } } | null };

export type ImageToTransactionMutationVariables = Exact<{
  image: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
}>;


export type ImageToTransactionMutation = { __typename?: 'Mutation', imageToTransaction?: { __typename?: 'AITransactionResult', data?: any | null, model: string, latencyMs: number, usage: { __typename?: 'AIUsageMeta', promptTokenCount: number, candidatesTokenCount: number, totalTokenCount: number } } | null };

export type GetDashboardSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardSummaryQuery = { __typename?: 'Query', dashboardSummary?: { __typename?: 'DashboardResult', totalBalance: number, balanceChangePercent?: number | null, monthlyPulse: { __typename?: 'MonthlyPulse', income: number, expenses: number, surplus: number, month: number, year: number, monthName: string } } | null };

export type GetMonthlyCategoriesQueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMonthlyCategoriesQuery = { __typename?: 'Query', monthlyCategories?: { __typename?: 'MonthlyCategoriesResult', data?: Array<{ __typename?: 'CategoryActivity', id: string, name: string, amount: number, transactionCount: number, icon?: string | null, color?: string | null, bgColor?: string | null, isParent: boolean, parentId?: string | null } | null> | null, meta: { __typename?: 'MonthlyCategoriesMeta', month: number, year: number, monthName: string, totalExpenses: number } } | null };

export type GetMonthlyTagsQueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMonthlyTagsQuery = { __typename?: 'Query', monthlyTags?: { __typename?: 'MonthlyTagsResult', data?: Array<{ __typename?: 'TagActivity', id: string, name: string, totalAmount: number, totalTransactionCount: number, expenseAmount: number, incomeAmount: number, icon?: string | null, color?: string | null, bgColor?: string | null } | null> | null, meta: { __typename?: 'MonthlyTagsMeta', month: number, year: number, monthName: string, totalExpenses: number, totalIncome: number, totalTransfers: number } } | null };

export type GetMonthlyPeopleQueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMonthlyPeopleQuery = { __typename?: 'Query', monthlyPeople?: { __typename?: 'MonthlyPeopleResult', data?: Array<{ __typename?: 'PersonActivity', id: string, name: string, balance: number, totalAmount: number, totalTransactionCount: number, expenseAmount: number, incomeAmount: number } | null> | null, meta: { __typename?: 'MonthlyPeopleMeta', month: number, year: number, monthName: string, totalExpenses: number, totalIncome: number } } | null };

export type GetWeeklyExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeeklyExpensesQuery = { __typename?: 'Query', weeklyExpenses?: { __typename?: 'WeeklyExpensesResult', timezone: string, days: { __typename?: 'WeeklyExpenses', sun: number, mon: number, tue: number, wed: number, thu: number, fri: number, sat: number }, dailyData?: Array<{ __typename?: 'WeeklyExpensesDay', date: string, day: string, total: number } | null> | null } | null };

export type GetMonthlyCalendarQueryVariables = Exact<{
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMonthlyCalendarQuery = { __typename?: 'Query', monthlyCalendar?: { __typename?: 'MonthlyCalendarResult', data?: Array<{ __typename?: 'CalendarDay', date: string, income: number, expenses: number, transfers: number, balance: number, transactionCount: number } | null> | null, meta: { __typename?: 'MonthlyCalendarMeta', month: number, year: number, monthName: string, timezone: string, totalIncome: number, totalExpenses: number, totalTransfers: number, balance: number } } | null };

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, type: Category_type, icon: string, color?: string | null, bgColor?: string | null, description?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'User', id: string }, parent?: { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null } | null } & { ' $fragmentName'?: 'CategoryFieldsFragment' };

export type GetCategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Category_where>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', Categories?: { __typename?: 'Categories', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Category' }
      & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
    )> } | null };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', Category?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) | null };

export type CreateCategoryMutationVariables = Exact<{
  data: mutationCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationCategoryUpdateInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: { __typename?: 'Category', id: string } | null };

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrenciesQuery = { __typename?: 'Query', currencies?: { __typename?: 'CurrenciesResult', totalDocs?: number | null, docs?: Array<{ __typename?: 'Currency', code: string, name: string, symbol: string, symbol_native: string, decimal_digits: number } | null> | null } | null };

export type PersonFieldsFragment = { __typename?: 'Person', id: string, name: string, email?: any | null, phone?: string | null, description?: string | null, isActive?: boolean | null, balance?: number | null, totalTransactions?: number | null, lastTransactionAt?: any | null, createdAt?: any | null, updatedAt?: any | null } & { ' $fragmentName'?: 'PersonFieldsFragment' };

export type GetPeopleQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPeopleQuery = { __typename?: 'Query', People?: { __typename?: 'People', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Person' }
      & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
    )> } | null };

export type GetPersonQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPersonQuery = { __typename?: 'Query', Person?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
  ) | null };

export type CreatePersonMutationVariables = Exact<{
  data: mutationPersonInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
  ) | null };

export type UpdatePersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationPersonUpdateInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
  ) | null };

export type DeletePersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson?: { __typename?: 'Person', id: string } | null };

export type ReminderFieldsFragment = { __typename?: 'Reminder', id: string, title: string, amount?: string | null, type?: Reminder_type | null, date?: any | null, isRecurring?: boolean | null, recurrencePeriod?: number | null, recurrenceType?: Reminder_recurrenceType | null, lastTriggeredAt?: any | null, nextDueDate?: any | null, archived?: boolean | null, createdAt?: any | null, updatedAt?: any | null, category?: { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null } | null, account?: { __typename?: 'Account', id: string, name: string, icon: string } | null, member?: { __typename?: 'Person', id: string, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null }> | null, completedDates?: Array<{ __typename?: 'Reminder_CompletedDates', date?: any | null }> | null } & { ' $fragmentName'?: 'ReminderFieldsFragment' };

export type GetRemindersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Reminder_where>;
}>;


export type GetRemindersQuery = { __typename?: 'Query', Reminders?: { __typename?: 'Reminders', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Reminder' }
      & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
    )> } | null };

export type GetReminderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetReminderQuery = { __typename?: 'Query', Reminder?: (
    { __typename?: 'Reminder' }
    & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
  ) | null };

export type CreateReminderMutationVariables = Exact<{
  data: mutationReminderInput;
}>;


export type CreateReminderMutation = { __typename?: 'Mutation', createReminder?: (
    { __typename?: 'Reminder' }
    & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
  ) | null };

export type UpdateReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationReminderUpdateInput;
}>;


export type UpdateReminderMutation = { __typename?: 'Mutation', updateReminder?: (
    { __typename?: 'Reminder' }
    & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
  ) | null };

export type DeleteReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteReminderMutation = { __typename?: 'Mutation', deleteReminder?: { __typename?: 'Reminder', id: string } | null };

export type TagFieldsFragment = { __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null, description?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'User', id: string } } & { ' $fragmentName'?: 'TagFieldsFragment' };

export type GetTagsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTagsQuery = { __typename?: 'Query', Tags?: { __typename?: 'Tags', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Tag' }
      & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
    )> } | null };

export type GetTagQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', Tag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
  ) | null };

export type CreateTagMutationVariables = Exact<{
  data: mutationTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
  ) | null };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationTagUpdateInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
  ) | null };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag?: { __typename?: 'Tag', id: string } | null };

export type TransactionCategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null, type: Category_type } & { ' $fragmentName'?: 'TransactionCategoryFieldsFragment' };

export type TransactionAccountFieldsFragment = { __typename?: 'Account', id: string, name: string, icon: string, bgColor?: string | null, color?: string | null } & { ' $fragmentName'?: 'TransactionAccountFieldsFragment' };

export type TransactionPersonFieldsFragment = { __typename?: 'Person', id: string, name: string } & { ' $fragmentName'?: 'TransactionPersonFieldsFragment' };

export type TransactionTagFieldsFragment = { __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null } & { ' $fragmentName'?: 'TransactionTagFieldsFragment' };

export type TransactionFieldsFragment = { __typename?: 'Transaction', id: string, title: string, amount: string, date: any, type: Transaction_type, note?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, category?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'TransactionCategoryFieldsFragment': TransactionCategoryFieldsFragment } }
  ) | null, account: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'TransactionAccountFieldsFragment': TransactionAccountFieldsFragment } }
  ), toAccount?: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'TransactionAccountFieldsFragment': TransactionAccountFieldsFragment } }
  ) | null, person?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'TransactionPersonFieldsFragment': TransactionPersonFieldsFragment } }
  ) | null, tags?: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TransactionTagFieldsFragment': TransactionTagFieldsFragment } }
  )> | null } & { ' $fragmentName'?: 'TransactionFieldsFragment' };

export type GetTransactionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Transaction_where>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', Transactions?: { __typename?: 'Transactions', totalDocs: number, page: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<(
      { __typename?: 'Transaction' }
      & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
    )> } | null };

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', Transaction?: (
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  ) | null };

export type CreateTransactionMutationVariables = Exact<{
  data: mutationTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction?: (
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  ) | null };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationTransactionUpdateInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction?: (
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  ) | null };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction?: { __typename?: 'Transaction', id: string } | null };

export type UserSettingsFieldsFragment = { __typename?: 'UserSetting', id: string, currency?: string | null, timezone?: string | null, locale?: string | null, theme?: UserSetting_theme | null, geminiApiKey?: string | null, createdAt?: any | null, updatedAt?: any | null, defaultAccount?: { __typename?: 'Account', id: string, name: string, icon: string } | null } & { ' $fragmentName'?: 'UserSettingsFieldsFragment' };

export type GetUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSettingsQuery = { __typename?: 'Query', UserSettings?: { __typename?: 'UserSettings', docs: Array<(
      { __typename?: 'UserSetting' }
      & { ' $fragmentRefs'?: { 'UserSettingsFieldsFragment': UserSettingsFieldsFragment } }
    )> } | null };

export type UpdateUserSettingsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: mutationUserSettingUpdateInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSetting?: (
    { __typename?: 'UserSetting' }
    & { ' $fragmentRefs'?: { 'UserSettingsFieldsFragment': UserSettingsFieldsFragment } }
  ) | null };

export const AccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}}]}}]}}]} as unknown as DocumentNode<AccountFieldsFragment, unknown>;
export const CategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CategoryFieldsFragment, unknown>;
export const PersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PersonFieldsFragment, unknown>;
export const ReminderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<ReminderFieldsFragment, unknown>;
export const TagFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TagFieldsFragment, unknown>;
export const TransactionCategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<TransactionCategoryFieldsFragment, unknown>;
export const TransactionAccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<TransactionAccountFieldsFragment, unknown>;
export const TransactionPersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TransactionPersonFieldsFragment, unknown>;
export const TransactionTagFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]} as unknown as DocumentNode<TransactionTagFieldsFragment, unknown>;
export const TransactionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]} as unknown as DocumentNode<TransactionFieldsFragment, unknown>;
export const UserSettingsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<UserSettingsFieldsFragment, unknown>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}}]}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}}]}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationAccountUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}}]}}]}}]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const TextToTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TextToTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"textToTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"latencyMs"}},{"kind":"Field","name":{"kind":"Name","value":"usage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promptTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTokenCount"}}]}}]}}]}}]} as unknown as DocumentNode<TextToTransactionMutation, TextToTransactionMutationVariables>;
export const ImageToTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImageToTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageToTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"mimeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"latencyMs"}},{"kind":"Field","name":{"kind":"Name","value":"usage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promptTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTokenCount"}}]}}]}}]}}]} as unknown as DocumentNode<ImageToTransactionMutation, ImageToTransactionMutationVariables>;
export const GetDashboardSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceChangePercent"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPulse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"expenses"}},{"kind":"Field","name":{"kind":"Name","value":"surplus"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>;
export const GetMonthlyCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"isParent"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyCategoriesQuery, GetMonthlyCategoriesQueryVariables>;
export const GetMonthlyTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransfers"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyTagsQuery, GetMonthlyTagsQueryVariables>;
export const GetMonthlyPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyPeople"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyPeopleQuery, GetMonthlyPeopleQueryVariables>;
export const GetWeeklyExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWeeklyExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sun"}},{"kind":"Field","name":{"kind":"Name","value":"mon"}},{"kind":"Field","name":{"kind":"Name","value":"tue"}},{"kind":"Field","name":{"kind":"Name","value":"wed"}},{"kind":"Field","name":{"kind":"Name","value":"thu"}},{"kind":"Field","name":{"kind":"Name","value":"fri"}},{"kind":"Field","name":{"kind":"Name","value":"sat"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<GetWeeklyExpensesQuery, GetWeeklyExpensesQueryVariables>;
export const GetMonthlyCalendarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyCalendar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyCalendar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"expenses"}},{"kind":"Field","name":{"kind":"Name","value":"transfers"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransfers"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyCalendarQuery, GetMonthlyCalendarQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Category_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationCategoryUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetCurrenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"symbol_native"}},{"kind":"Field","name":{"kind":"Name","value":"decimal_digits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}}]}}]}}]} as unknown as DocumentNode<GetCurrenciesQuery, GetCurrenciesQueryVariables>;
export const GetPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"People"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPeopleQuery, GetPeopleQueryVariables>;
export const GetPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Person"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPersonQuery, GetPersonQueryVariables>;
export const CreatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationPersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreatePersonMutation, CreatePersonMutationVariables>;
export const UpdatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationPersonUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const DeletePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePersonMutation, DeletePersonMutationVariables>;
export const GetRemindersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReminders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Reminders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReminderFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetRemindersQuery, GetRemindersQueryVariables>;
export const GetReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Reminder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReminderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetReminderQuery, GetReminderQueryVariables>;
export const CreateReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationReminderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReminder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReminderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<CreateReminderMutation, CreateReminderMutationVariables>;
export const UpdateReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationReminderUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReminder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReminderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<UpdateReminderMutation, UpdateReminderMutationVariables>;
export const DeleteReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReminder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteReminderMutation, DeleteReminderMutationVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTagQuery, GetTagQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTagUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<GetTransactionQuery, GetTransactionQueryVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTransactionUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const DeleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const GetUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<GetUserSettingsQuery, GetUserSettingsQueryVariables>;
export const UpdateUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationUserSettingUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;