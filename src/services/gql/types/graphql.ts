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

export type AiTransactionResult = {
  __typename?: 'AITransactionResult';
  /** Predicted transaction fields */
  data?: Maybe<Scalars['AITransactionData']['output']>;
  latencyMs: Scalars['Float']['output'];
  model: Scalars['String']['output'];
  usage: AiUsageMeta;
};

export type AiUsageMeta = {
  __typename?: 'AIUsageMeta';
  candidatesTokenCount: Scalars['Int']['output'];
  promptTokenCount: Scalars['Int']['output'];
  totalTokenCount: Scalars['Int']['output'];
};

export type Access = {
  __typename?: 'Access';
  accounts?: Maybe<AccountsAccess>;
  ai_usages?: Maybe<Ai_UsagesAccess>;
  app_settings?: Maybe<App_SettingsAccess>;
  canAccessAdmin: Scalars['Boolean']['output'];
  categories?: Maybe<CategoriesAccess>;
  media?: Maybe<MediaAccess>;
  oauth_accounts?: Maybe<Oauth_AccountsAccess>;
  payload_kv?: Maybe<Payload_KvAccess>;
  payload_locked_documents?: Maybe<Payload_Locked_DocumentsAccess>;
  payload_mcp_api_keys?: Maybe<Payload_Mcp_Api_KeysAccess>;
  payload_preferences?: Maybe<Payload_PreferencesAccess>;
  people?: Maybe<PeopleAccess>;
  reminders?: Maybe<RemindersAccess>;
  tags?: Maybe<TagsAccess>;
  transactions?: Maybe<TransactionsAccess>;
  user_settings?: Maybe<User_SettingsAccess>;
  users?: Maybe<UsersAccess>;
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

export type Account_Avatar_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Account_Balance_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Account_BgColor_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_Color_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_Description_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Account_Icon_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_IsActive_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Account_LastTransactionAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Account_TotalTransactions_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Account_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Account_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Account_Where = {
  AND?: InputMaybe<Array<InputMaybe<Account_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_Where_Or>>>;
  avatar?: InputMaybe<Account_Avatar_Operator>;
  balance?: InputMaybe<Account_Balance_Operator>;
  bgColor?: InputMaybe<Account_BgColor_Operator>;
  color?: InputMaybe<Account_Color_Operator>;
  createdAt?: InputMaybe<Account_CreatedAt_Operator>;
  description?: InputMaybe<Account_Description_Operator>;
  icon?: InputMaybe<Account_Icon_Operator>;
  id?: InputMaybe<Account_Id_Operator>;
  isActive?: InputMaybe<Account_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Account_LastTransactionAt_Operator>;
  name?: InputMaybe<Account_Name_Operator>;
  totalTransactions?: InputMaybe<Account_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Account_UpdatedAt_Operator>;
  user?: InputMaybe<Account_User_Operator>;
};

export type Account_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Account_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_Where_Or>>>;
  avatar?: InputMaybe<Account_Avatar_Operator>;
  balance?: InputMaybe<Account_Balance_Operator>;
  bgColor?: InputMaybe<Account_BgColor_Operator>;
  color?: InputMaybe<Account_Color_Operator>;
  createdAt?: InputMaybe<Account_CreatedAt_Operator>;
  description?: InputMaybe<Account_Description_Operator>;
  icon?: InputMaybe<Account_Icon_Operator>;
  id?: InputMaybe<Account_Id_Operator>;
  isActive?: InputMaybe<Account_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Account_LastTransactionAt_Operator>;
  name?: InputMaybe<Account_Name_Operator>;
  totalTransactions?: InputMaybe<Account_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Account_UpdatedAt_Operator>;
  user?: InputMaybe<Account_User_Operator>;
};

export type Account_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Account_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Account_Where_Or>>>;
  avatar?: InputMaybe<Account_Avatar_Operator>;
  balance?: InputMaybe<Account_Balance_Operator>;
  bgColor?: InputMaybe<Account_BgColor_Operator>;
  color?: InputMaybe<Account_Color_Operator>;
  createdAt?: InputMaybe<Account_CreatedAt_Operator>;
  description?: InputMaybe<Account_Description_Operator>;
  icon?: InputMaybe<Account_Icon_Operator>;
  id?: InputMaybe<Account_Id_Operator>;
  isActive?: InputMaybe<Account_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Account_LastTransactionAt_Operator>;
  name?: InputMaybe<Account_Name_Operator>;
  totalTransactions?: InputMaybe<Account_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Account_UpdatedAt_Operator>;
  user?: InputMaybe<Account_User_Operator>;
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
  avatar?: Maybe<AccountsDocAccessFields_Avatar>;
  balance?: Maybe<AccountsDocAccessFields_Balance>;
  bgColor?: Maybe<AccountsDocAccessFields_BgColor>;
  color?: Maybe<AccountsDocAccessFields_Color>;
  createdAt?: Maybe<AccountsDocAccessFields_CreatedAt>;
  description?: Maybe<AccountsDocAccessFields_Description>;
  icon?: Maybe<AccountsDocAccessFields_Icon>;
  isActive?: Maybe<AccountsDocAccessFields_IsActive>;
  lastTransactionAt?: Maybe<AccountsDocAccessFields_LastTransactionAt>;
  name?: Maybe<AccountsDocAccessFields_Name>;
  totalTransactions?: Maybe<AccountsDocAccessFields_TotalTransactions>;
  updatedAt?: Maybe<AccountsDocAccessFields_UpdatedAt>;
  user?: Maybe<AccountsDocAccessFields_User>;
};

export type AccountsDocAccessFields_Avatar = {
  __typename?: 'AccountsDocAccessFields_avatar';
  create?: Maybe<AccountsDocAccessFields_Avatar_Create>;
  delete?: Maybe<AccountsDocAccessFields_Avatar_Delete>;
  read?: Maybe<AccountsDocAccessFields_Avatar_Read>;
  update?: Maybe<AccountsDocAccessFields_Avatar_Update>;
};

export type AccountsDocAccessFields_Avatar_Create = {
  __typename?: 'AccountsDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Avatar_Delete = {
  __typename?: 'AccountsDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Avatar_Read = {
  __typename?: 'AccountsDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Avatar_Update = {
  __typename?: 'AccountsDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Balance = {
  __typename?: 'AccountsDocAccessFields_balance';
  create?: Maybe<AccountsDocAccessFields_Balance_Create>;
  delete?: Maybe<AccountsDocAccessFields_Balance_Delete>;
  read?: Maybe<AccountsDocAccessFields_Balance_Read>;
  update?: Maybe<AccountsDocAccessFields_Balance_Update>;
};

export type AccountsDocAccessFields_Balance_Create = {
  __typename?: 'AccountsDocAccessFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Balance_Delete = {
  __typename?: 'AccountsDocAccessFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Balance_Read = {
  __typename?: 'AccountsDocAccessFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Balance_Update = {
  __typename?: 'AccountsDocAccessFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_BgColor = {
  __typename?: 'AccountsDocAccessFields_bgColor';
  create?: Maybe<AccountsDocAccessFields_BgColor_Create>;
  delete?: Maybe<AccountsDocAccessFields_BgColor_Delete>;
  read?: Maybe<AccountsDocAccessFields_BgColor_Read>;
  update?: Maybe<AccountsDocAccessFields_BgColor_Update>;
};

export type AccountsDocAccessFields_BgColor_Create = {
  __typename?: 'AccountsDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_BgColor_Delete = {
  __typename?: 'AccountsDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_BgColor_Read = {
  __typename?: 'AccountsDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_BgColor_Update = {
  __typename?: 'AccountsDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Color = {
  __typename?: 'AccountsDocAccessFields_color';
  create?: Maybe<AccountsDocAccessFields_Color_Create>;
  delete?: Maybe<AccountsDocAccessFields_Color_Delete>;
  read?: Maybe<AccountsDocAccessFields_Color_Read>;
  update?: Maybe<AccountsDocAccessFields_Color_Update>;
};

export type AccountsDocAccessFields_Color_Create = {
  __typename?: 'AccountsDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Color_Delete = {
  __typename?: 'AccountsDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Color_Read = {
  __typename?: 'AccountsDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Color_Update = {
  __typename?: 'AccountsDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_CreatedAt = {
  __typename?: 'AccountsDocAccessFields_createdAt';
  create?: Maybe<AccountsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<AccountsDocAccessFields_CreatedAt_Update>;
};

export type AccountsDocAccessFields_CreatedAt_Create = {
  __typename?: 'AccountsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'AccountsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_CreatedAt_Read = {
  __typename?: 'AccountsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_CreatedAt_Update = {
  __typename?: 'AccountsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Description = {
  __typename?: 'AccountsDocAccessFields_description';
  create?: Maybe<AccountsDocAccessFields_Description_Create>;
  delete?: Maybe<AccountsDocAccessFields_Description_Delete>;
  read?: Maybe<AccountsDocAccessFields_Description_Read>;
  update?: Maybe<AccountsDocAccessFields_Description_Update>;
};

export type AccountsDocAccessFields_Description_Create = {
  __typename?: 'AccountsDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Description_Delete = {
  __typename?: 'AccountsDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Description_Read = {
  __typename?: 'AccountsDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Description_Update = {
  __typename?: 'AccountsDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Icon = {
  __typename?: 'AccountsDocAccessFields_icon';
  create?: Maybe<AccountsDocAccessFields_Icon_Create>;
  delete?: Maybe<AccountsDocAccessFields_Icon_Delete>;
  read?: Maybe<AccountsDocAccessFields_Icon_Read>;
  update?: Maybe<AccountsDocAccessFields_Icon_Update>;
};

export type AccountsDocAccessFields_Icon_Create = {
  __typename?: 'AccountsDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Icon_Delete = {
  __typename?: 'AccountsDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Icon_Read = {
  __typename?: 'AccountsDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Icon_Update = {
  __typename?: 'AccountsDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_IsActive = {
  __typename?: 'AccountsDocAccessFields_isActive';
  create?: Maybe<AccountsDocAccessFields_IsActive_Create>;
  delete?: Maybe<AccountsDocAccessFields_IsActive_Delete>;
  read?: Maybe<AccountsDocAccessFields_IsActive_Read>;
  update?: Maybe<AccountsDocAccessFields_IsActive_Update>;
};

export type AccountsDocAccessFields_IsActive_Create = {
  __typename?: 'AccountsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_IsActive_Delete = {
  __typename?: 'AccountsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_IsActive_Read = {
  __typename?: 'AccountsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_IsActive_Update = {
  __typename?: 'AccountsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_LastTransactionAt = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt';
  create?: Maybe<AccountsDocAccessFields_LastTransactionAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_LastTransactionAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_LastTransactionAt_Read>;
  update?: Maybe<AccountsDocAccessFields_LastTransactionAt_Update>;
};

export type AccountsDocAccessFields_LastTransactionAt_Create = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_LastTransactionAt_Delete = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_LastTransactionAt_Read = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_LastTransactionAt_Update = {
  __typename?: 'AccountsDocAccessFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Name = {
  __typename?: 'AccountsDocAccessFields_name';
  create?: Maybe<AccountsDocAccessFields_Name_Create>;
  delete?: Maybe<AccountsDocAccessFields_Name_Delete>;
  read?: Maybe<AccountsDocAccessFields_Name_Read>;
  update?: Maybe<AccountsDocAccessFields_Name_Update>;
};

export type AccountsDocAccessFields_Name_Create = {
  __typename?: 'AccountsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Name_Delete = {
  __typename?: 'AccountsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Name_Read = {
  __typename?: 'AccountsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_Name_Update = {
  __typename?: 'AccountsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_TotalTransactions = {
  __typename?: 'AccountsDocAccessFields_totalTransactions';
  create?: Maybe<AccountsDocAccessFields_TotalTransactions_Create>;
  delete?: Maybe<AccountsDocAccessFields_TotalTransactions_Delete>;
  read?: Maybe<AccountsDocAccessFields_TotalTransactions_Read>;
  update?: Maybe<AccountsDocAccessFields_TotalTransactions_Update>;
};

export type AccountsDocAccessFields_TotalTransactions_Create = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_TotalTransactions_Delete = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_TotalTransactions_Read = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_TotalTransactions_Update = {
  __typename?: 'AccountsDocAccessFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_UpdatedAt = {
  __typename?: 'AccountsDocAccessFields_updatedAt';
  create?: Maybe<AccountsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<AccountsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<AccountsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<AccountsDocAccessFields_UpdatedAt_Update>;
};

export type AccountsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'AccountsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_User = {
  __typename?: 'AccountsDocAccessFields_user';
  create?: Maybe<AccountsDocAccessFields_User_Create>;
  delete?: Maybe<AccountsDocAccessFields_User_Delete>;
  read?: Maybe<AccountsDocAccessFields_User_Read>;
  update?: Maybe<AccountsDocAccessFields_User_Update>;
};

export type AccountsDocAccessFields_User_Create = {
  __typename?: 'AccountsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_User_Delete = {
  __typename?: 'AccountsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_User_Read = {
  __typename?: 'AccountsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsDocAccessFields_User_Update = {
  __typename?: 'AccountsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields = {
  __typename?: 'AccountsFields';
  avatar?: Maybe<AccountsFields_Avatar>;
  balance?: Maybe<AccountsFields_Balance>;
  bgColor?: Maybe<AccountsFields_BgColor>;
  color?: Maybe<AccountsFields_Color>;
  createdAt?: Maybe<AccountsFields_CreatedAt>;
  description?: Maybe<AccountsFields_Description>;
  icon?: Maybe<AccountsFields_Icon>;
  isActive?: Maybe<AccountsFields_IsActive>;
  lastTransactionAt?: Maybe<AccountsFields_LastTransactionAt>;
  name?: Maybe<AccountsFields_Name>;
  totalTransactions?: Maybe<AccountsFields_TotalTransactions>;
  updatedAt?: Maybe<AccountsFields_UpdatedAt>;
  user?: Maybe<AccountsFields_User>;
};

export type AccountsFields_Avatar = {
  __typename?: 'AccountsFields_avatar';
  create?: Maybe<AccountsFields_Avatar_Create>;
  delete?: Maybe<AccountsFields_Avatar_Delete>;
  read?: Maybe<AccountsFields_Avatar_Read>;
  update?: Maybe<AccountsFields_Avatar_Update>;
};

export type AccountsFields_Avatar_Create = {
  __typename?: 'AccountsFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Avatar_Delete = {
  __typename?: 'AccountsFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Avatar_Read = {
  __typename?: 'AccountsFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Avatar_Update = {
  __typename?: 'AccountsFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Balance = {
  __typename?: 'AccountsFields_balance';
  create?: Maybe<AccountsFields_Balance_Create>;
  delete?: Maybe<AccountsFields_Balance_Delete>;
  read?: Maybe<AccountsFields_Balance_Read>;
  update?: Maybe<AccountsFields_Balance_Update>;
};

export type AccountsFields_Balance_Create = {
  __typename?: 'AccountsFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Balance_Delete = {
  __typename?: 'AccountsFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Balance_Read = {
  __typename?: 'AccountsFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Balance_Update = {
  __typename?: 'AccountsFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_BgColor = {
  __typename?: 'AccountsFields_bgColor';
  create?: Maybe<AccountsFields_BgColor_Create>;
  delete?: Maybe<AccountsFields_BgColor_Delete>;
  read?: Maybe<AccountsFields_BgColor_Read>;
  update?: Maybe<AccountsFields_BgColor_Update>;
};

export type AccountsFields_BgColor_Create = {
  __typename?: 'AccountsFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_BgColor_Delete = {
  __typename?: 'AccountsFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_BgColor_Read = {
  __typename?: 'AccountsFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_BgColor_Update = {
  __typename?: 'AccountsFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Color = {
  __typename?: 'AccountsFields_color';
  create?: Maybe<AccountsFields_Color_Create>;
  delete?: Maybe<AccountsFields_Color_Delete>;
  read?: Maybe<AccountsFields_Color_Read>;
  update?: Maybe<AccountsFields_Color_Update>;
};

export type AccountsFields_Color_Create = {
  __typename?: 'AccountsFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Color_Delete = {
  __typename?: 'AccountsFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Color_Read = {
  __typename?: 'AccountsFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Color_Update = {
  __typename?: 'AccountsFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_CreatedAt = {
  __typename?: 'AccountsFields_createdAt';
  create?: Maybe<AccountsFields_CreatedAt_Create>;
  delete?: Maybe<AccountsFields_CreatedAt_Delete>;
  read?: Maybe<AccountsFields_CreatedAt_Read>;
  update?: Maybe<AccountsFields_CreatedAt_Update>;
};

export type AccountsFields_CreatedAt_Create = {
  __typename?: 'AccountsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_CreatedAt_Delete = {
  __typename?: 'AccountsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_CreatedAt_Read = {
  __typename?: 'AccountsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_CreatedAt_Update = {
  __typename?: 'AccountsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Description = {
  __typename?: 'AccountsFields_description';
  create?: Maybe<AccountsFields_Description_Create>;
  delete?: Maybe<AccountsFields_Description_Delete>;
  read?: Maybe<AccountsFields_Description_Read>;
  update?: Maybe<AccountsFields_Description_Update>;
};

export type AccountsFields_Description_Create = {
  __typename?: 'AccountsFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Description_Delete = {
  __typename?: 'AccountsFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Description_Read = {
  __typename?: 'AccountsFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Description_Update = {
  __typename?: 'AccountsFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Icon = {
  __typename?: 'AccountsFields_icon';
  create?: Maybe<AccountsFields_Icon_Create>;
  delete?: Maybe<AccountsFields_Icon_Delete>;
  read?: Maybe<AccountsFields_Icon_Read>;
  update?: Maybe<AccountsFields_Icon_Update>;
};

export type AccountsFields_Icon_Create = {
  __typename?: 'AccountsFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Icon_Delete = {
  __typename?: 'AccountsFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Icon_Read = {
  __typename?: 'AccountsFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Icon_Update = {
  __typename?: 'AccountsFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_IsActive = {
  __typename?: 'AccountsFields_isActive';
  create?: Maybe<AccountsFields_IsActive_Create>;
  delete?: Maybe<AccountsFields_IsActive_Delete>;
  read?: Maybe<AccountsFields_IsActive_Read>;
  update?: Maybe<AccountsFields_IsActive_Update>;
};

export type AccountsFields_IsActive_Create = {
  __typename?: 'AccountsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_IsActive_Delete = {
  __typename?: 'AccountsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_IsActive_Read = {
  __typename?: 'AccountsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_IsActive_Update = {
  __typename?: 'AccountsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_LastTransactionAt = {
  __typename?: 'AccountsFields_lastTransactionAt';
  create?: Maybe<AccountsFields_LastTransactionAt_Create>;
  delete?: Maybe<AccountsFields_LastTransactionAt_Delete>;
  read?: Maybe<AccountsFields_LastTransactionAt_Read>;
  update?: Maybe<AccountsFields_LastTransactionAt_Update>;
};

export type AccountsFields_LastTransactionAt_Create = {
  __typename?: 'AccountsFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_LastTransactionAt_Delete = {
  __typename?: 'AccountsFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_LastTransactionAt_Read = {
  __typename?: 'AccountsFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_LastTransactionAt_Update = {
  __typename?: 'AccountsFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Name = {
  __typename?: 'AccountsFields_name';
  create?: Maybe<AccountsFields_Name_Create>;
  delete?: Maybe<AccountsFields_Name_Delete>;
  read?: Maybe<AccountsFields_Name_Read>;
  update?: Maybe<AccountsFields_Name_Update>;
};

export type AccountsFields_Name_Create = {
  __typename?: 'AccountsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Name_Delete = {
  __typename?: 'AccountsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Name_Read = {
  __typename?: 'AccountsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_Name_Update = {
  __typename?: 'AccountsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_TotalTransactions = {
  __typename?: 'AccountsFields_totalTransactions';
  create?: Maybe<AccountsFields_TotalTransactions_Create>;
  delete?: Maybe<AccountsFields_TotalTransactions_Delete>;
  read?: Maybe<AccountsFields_TotalTransactions_Read>;
  update?: Maybe<AccountsFields_TotalTransactions_Update>;
};

export type AccountsFields_TotalTransactions_Create = {
  __typename?: 'AccountsFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_TotalTransactions_Delete = {
  __typename?: 'AccountsFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_TotalTransactions_Read = {
  __typename?: 'AccountsFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_TotalTransactions_Update = {
  __typename?: 'AccountsFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_UpdatedAt = {
  __typename?: 'AccountsFields_updatedAt';
  create?: Maybe<AccountsFields_UpdatedAt_Create>;
  delete?: Maybe<AccountsFields_UpdatedAt_Delete>;
  read?: Maybe<AccountsFields_UpdatedAt_Read>;
  update?: Maybe<AccountsFields_UpdatedAt_Update>;
};

export type AccountsFields_UpdatedAt_Create = {
  __typename?: 'AccountsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_UpdatedAt_Delete = {
  __typename?: 'AccountsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_UpdatedAt_Read = {
  __typename?: 'AccountsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_UpdatedAt_Update = {
  __typename?: 'AccountsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_User = {
  __typename?: 'AccountsFields_user';
  create?: Maybe<AccountsFields_User_Create>;
  delete?: Maybe<AccountsFields_User_Delete>;
  read?: Maybe<AccountsFields_User_Read>;
  update?: Maybe<AccountsFields_User_Update>;
};

export type AccountsFields_User_Create = {
  __typename?: 'AccountsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_User_Delete = {
  __typename?: 'AccountsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_User_Read = {
  __typename?: 'AccountsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AccountsFields_User_Update = {
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
  apiKeyType?: Maybe<AiUsage_ApiKeyType>;
  candidateTokens?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latencyMs?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  promptTokens?: Maybe<Scalars['Float']['output']>;
  promptType: AiUsage_PromptType;
  status: AiUsage_Status;
  totalTokens?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum AiUsageUpdate_ApiKeyType_MutationInput {
  App = 'app',
  User = 'user'
}

export enum AiUsageUpdate_PromptType_MutationInput {
  Image = 'image',
  Text = 'text'
}

export enum AiUsageUpdate_Status_MutationInput {
  Error = 'error',
  Success = 'success'
}

export enum AiUsage_ApiKeyType {
  App = 'app',
  User = 'user'
}

export enum AiUsage_ApiKeyType_Input {
  App = 'app',
  User = 'user'
}

export enum AiUsage_ApiKeyType_MutationInput {
  App = 'app',
  User = 'user'
}

export type AiUsage_ApiKeyType_Operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_ApiKeyType_Input>>>;
  equals?: InputMaybe<AiUsage_ApiKeyType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_ApiKeyType_Input>>>;
  not_equals?: InputMaybe<AiUsage_ApiKeyType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_ApiKeyType_Input>>>;
};

export type AiUsage_CandidateTokens_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AiUsage_Error_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_LatencyMs_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_Model_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AiUsage_PromptTokens_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export enum AiUsage_PromptType {
  Image = 'image',
  Text = 'text'
}

export enum AiUsage_PromptType_Input {
  Image = 'image',
  Text = 'text'
}

export enum AiUsage_PromptType_MutationInput {
  Image = 'image',
  Text = 'text'
}

export type AiUsage_PromptType_Operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_PromptType_Input>>>;
  equals?: InputMaybe<AiUsage_PromptType_Input>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_PromptType_Input>>>;
  not_equals?: InputMaybe<AiUsage_PromptType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_PromptType_Input>>>;
};

export enum AiUsage_Status {
  Error = 'error',
  Success = 'success'
}

export enum AiUsage_Status_Input {
  Error = 'error',
  Success = 'success'
}

export enum AiUsage_Status_MutationInput {
  Error = 'error',
  Success = 'success'
}

export type AiUsage_Status_Operator = {
  all?: InputMaybe<Array<InputMaybe<AiUsage_Status_Input>>>;
  equals?: InputMaybe<AiUsage_Status_Input>;
  in?: InputMaybe<Array<InputMaybe<AiUsage_Status_Input>>>;
  not_equals?: InputMaybe<AiUsage_Status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AiUsage_Status_Input>>>;
};

export type AiUsage_TotalTokens_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type AiUsage_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AiUsage_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type AiUsage_Where = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_Where_Or>>>;
  apiKeyType?: InputMaybe<AiUsage_ApiKeyType_Operator>;
  candidateTokens?: InputMaybe<AiUsage_CandidateTokens_Operator>;
  createdAt?: InputMaybe<AiUsage_CreatedAt_Operator>;
  error?: InputMaybe<AiUsage_Error_Operator>;
  id?: InputMaybe<AiUsage_Id_Operator>;
  latencyMs?: InputMaybe<AiUsage_LatencyMs_Operator>;
  model?: InputMaybe<AiUsage_Model_Operator>;
  promptTokens?: InputMaybe<AiUsage_PromptTokens_Operator>;
  promptType?: InputMaybe<AiUsage_PromptType_Operator>;
  status?: InputMaybe<AiUsage_Status_Operator>;
  totalTokens?: InputMaybe<AiUsage_TotalTokens_Operator>;
  updatedAt?: InputMaybe<AiUsage_UpdatedAt_Operator>;
  user?: InputMaybe<AiUsage_User_Operator>;
};

export type AiUsage_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_Where_Or>>>;
  apiKeyType?: InputMaybe<AiUsage_ApiKeyType_Operator>;
  candidateTokens?: InputMaybe<AiUsage_CandidateTokens_Operator>;
  createdAt?: InputMaybe<AiUsage_CreatedAt_Operator>;
  error?: InputMaybe<AiUsage_Error_Operator>;
  id?: InputMaybe<AiUsage_Id_Operator>;
  latencyMs?: InputMaybe<AiUsage_LatencyMs_Operator>;
  model?: InputMaybe<AiUsage_Model_Operator>;
  promptTokens?: InputMaybe<AiUsage_PromptTokens_Operator>;
  promptType?: InputMaybe<AiUsage_PromptType_Operator>;
  status?: InputMaybe<AiUsage_Status_Operator>;
  totalTokens?: InputMaybe<AiUsage_TotalTokens_Operator>;
  updatedAt?: InputMaybe<AiUsage_UpdatedAt_Operator>;
  user?: InputMaybe<AiUsage_User_Operator>;
};

export type AiUsage_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<AiUsage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AiUsage_Where_Or>>>;
  apiKeyType?: InputMaybe<AiUsage_ApiKeyType_Operator>;
  candidateTokens?: InputMaybe<AiUsage_CandidateTokens_Operator>;
  createdAt?: InputMaybe<AiUsage_CreatedAt_Operator>;
  error?: InputMaybe<AiUsage_Error_Operator>;
  id?: InputMaybe<AiUsage_Id_Operator>;
  latencyMs?: InputMaybe<AiUsage_LatencyMs_Operator>;
  model?: InputMaybe<AiUsage_Model_Operator>;
  promptTokens?: InputMaybe<AiUsage_PromptTokens_Operator>;
  promptType?: InputMaybe<AiUsage_PromptType_Operator>;
  status?: InputMaybe<AiUsage_Status_Operator>;
  totalTokens?: InputMaybe<AiUsage_TotalTokens_Operator>;
  updatedAt?: InputMaybe<AiUsage_UpdatedAt_Operator>;
  user?: InputMaybe<AiUsage_User_Operator>;
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
  apiKeyType?: Maybe<AiUsagesDocAccessFields_ApiKeyType>;
  candidateTokens?: Maybe<AiUsagesDocAccessFields_CandidateTokens>;
  createdAt?: Maybe<AiUsagesDocAccessFields_CreatedAt>;
  error?: Maybe<AiUsagesDocAccessFields_Error>;
  latencyMs?: Maybe<AiUsagesDocAccessFields_LatencyMs>;
  model?: Maybe<AiUsagesDocAccessFields_Model>;
  promptTokens?: Maybe<AiUsagesDocAccessFields_PromptTokens>;
  promptType?: Maybe<AiUsagesDocAccessFields_PromptType>;
  status?: Maybe<AiUsagesDocAccessFields_Status>;
  totalTokens?: Maybe<AiUsagesDocAccessFields_TotalTokens>;
  updatedAt?: Maybe<AiUsagesDocAccessFields_UpdatedAt>;
  user?: Maybe<AiUsagesDocAccessFields_User>;
};

export type AiUsagesDocAccessFields_ApiKeyType = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType';
  create?: Maybe<AiUsagesDocAccessFields_ApiKeyType_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_ApiKeyType_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_ApiKeyType_Read>;
  update?: Maybe<AiUsagesDocAccessFields_ApiKeyType_Update>;
};

export type AiUsagesDocAccessFields_ApiKeyType_Create = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_ApiKeyType_Delete = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_ApiKeyType_Read = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_ApiKeyType_Update = {
  __typename?: 'AiUsagesDocAccessFields_apiKeyType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CandidateTokens = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens';
  create?: Maybe<AiUsagesDocAccessFields_CandidateTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_CandidateTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_CandidateTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_CandidateTokens_Update>;
};

export type AiUsagesDocAccessFields_CandidateTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CandidateTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CandidateTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CandidateTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_candidateTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CreatedAt = {
  __typename?: 'AiUsagesDocAccessFields_createdAt';
  create?: Maybe<AiUsagesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<AiUsagesDocAccessFields_CreatedAt_Update>;
};

export type AiUsagesDocAccessFields_CreatedAt_Create = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CreatedAt_Read = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_CreatedAt_Update = {
  __typename?: 'AiUsagesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Error = {
  __typename?: 'AiUsagesDocAccessFields_error';
  create?: Maybe<AiUsagesDocAccessFields_Error_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_Error_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_Error_Read>;
  update?: Maybe<AiUsagesDocAccessFields_Error_Update>;
};

export type AiUsagesDocAccessFields_Error_Create = {
  __typename?: 'AiUsagesDocAccessFields_error_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Error_Delete = {
  __typename?: 'AiUsagesDocAccessFields_error_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Error_Read = {
  __typename?: 'AiUsagesDocAccessFields_error_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Error_Update = {
  __typename?: 'AiUsagesDocAccessFields_error_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_LatencyMs = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs';
  create?: Maybe<AiUsagesDocAccessFields_LatencyMs_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_LatencyMs_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_LatencyMs_Read>;
  update?: Maybe<AiUsagesDocAccessFields_LatencyMs_Update>;
};

export type AiUsagesDocAccessFields_LatencyMs_Create = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_LatencyMs_Delete = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_LatencyMs_Read = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_LatencyMs_Update = {
  __typename?: 'AiUsagesDocAccessFields_latencyMs_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Model = {
  __typename?: 'AiUsagesDocAccessFields_model';
  create?: Maybe<AiUsagesDocAccessFields_Model_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_Model_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_Model_Read>;
  update?: Maybe<AiUsagesDocAccessFields_Model_Update>;
};

export type AiUsagesDocAccessFields_Model_Create = {
  __typename?: 'AiUsagesDocAccessFields_model_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Model_Delete = {
  __typename?: 'AiUsagesDocAccessFields_model_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Model_Read = {
  __typename?: 'AiUsagesDocAccessFields_model_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Model_Update = {
  __typename?: 'AiUsagesDocAccessFields_model_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptTokens = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens';
  create?: Maybe<AiUsagesDocAccessFields_PromptTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_PromptTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_PromptTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_PromptTokens_Update>;
};

export type AiUsagesDocAccessFields_PromptTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_promptTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptType = {
  __typename?: 'AiUsagesDocAccessFields_promptType';
  create?: Maybe<AiUsagesDocAccessFields_PromptType_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_PromptType_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_PromptType_Read>;
  update?: Maybe<AiUsagesDocAccessFields_PromptType_Update>;
};

export type AiUsagesDocAccessFields_PromptType_Create = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptType_Delete = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptType_Read = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_PromptType_Update = {
  __typename?: 'AiUsagesDocAccessFields_promptType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Status = {
  __typename?: 'AiUsagesDocAccessFields_status';
  create?: Maybe<AiUsagesDocAccessFields_Status_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_Status_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_Status_Read>;
  update?: Maybe<AiUsagesDocAccessFields_Status_Update>;
};

export type AiUsagesDocAccessFields_Status_Create = {
  __typename?: 'AiUsagesDocAccessFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Status_Delete = {
  __typename?: 'AiUsagesDocAccessFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Status_Read = {
  __typename?: 'AiUsagesDocAccessFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_Status_Update = {
  __typename?: 'AiUsagesDocAccessFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_TotalTokens = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens';
  create?: Maybe<AiUsagesDocAccessFields_TotalTokens_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_TotalTokens_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_TotalTokens_Read>;
  update?: Maybe<AiUsagesDocAccessFields_TotalTokens_Update>;
};

export type AiUsagesDocAccessFields_TotalTokens_Create = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_TotalTokens_Delete = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_TotalTokens_Read = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_TotalTokens_Update = {
  __typename?: 'AiUsagesDocAccessFields_totalTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_UpdatedAt = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt';
  create?: Maybe<AiUsagesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<AiUsagesDocAccessFields_UpdatedAt_Update>;
};

export type AiUsagesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'AiUsagesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_User = {
  __typename?: 'AiUsagesDocAccessFields_user';
  create?: Maybe<AiUsagesDocAccessFields_User_Create>;
  delete?: Maybe<AiUsagesDocAccessFields_User_Delete>;
  read?: Maybe<AiUsagesDocAccessFields_User_Read>;
  update?: Maybe<AiUsagesDocAccessFields_User_Update>;
};

export type AiUsagesDocAccessFields_User_Create = {
  __typename?: 'AiUsagesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_User_Delete = {
  __typename?: 'AiUsagesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_User_Read = {
  __typename?: 'AiUsagesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesDocAccessFields_User_Update = {
  __typename?: 'AiUsagesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields = {
  __typename?: 'AiUsagesFields';
  apiKeyType?: Maybe<AiUsagesFields_ApiKeyType>;
  candidateTokens?: Maybe<AiUsagesFields_CandidateTokens>;
  createdAt?: Maybe<AiUsagesFields_CreatedAt>;
  error?: Maybe<AiUsagesFields_Error>;
  latencyMs?: Maybe<AiUsagesFields_LatencyMs>;
  model?: Maybe<AiUsagesFields_Model>;
  promptTokens?: Maybe<AiUsagesFields_PromptTokens>;
  promptType?: Maybe<AiUsagesFields_PromptType>;
  status?: Maybe<AiUsagesFields_Status>;
  totalTokens?: Maybe<AiUsagesFields_TotalTokens>;
  updatedAt?: Maybe<AiUsagesFields_UpdatedAt>;
  user?: Maybe<AiUsagesFields_User>;
};

export type AiUsagesFields_ApiKeyType = {
  __typename?: 'AiUsagesFields_apiKeyType';
  create?: Maybe<AiUsagesFields_ApiKeyType_Create>;
  delete?: Maybe<AiUsagesFields_ApiKeyType_Delete>;
  read?: Maybe<AiUsagesFields_ApiKeyType_Read>;
  update?: Maybe<AiUsagesFields_ApiKeyType_Update>;
};

export type AiUsagesFields_ApiKeyType_Create = {
  __typename?: 'AiUsagesFields_apiKeyType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_ApiKeyType_Delete = {
  __typename?: 'AiUsagesFields_apiKeyType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_ApiKeyType_Read = {
  __typename?: 'AiUsagesFields_apiKeyType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_ApiKeyType_Update = {
  __typename?: 'AiUsagesFields_apiKeyType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CandidateTokens = {
  __typename?: 'AiUsagesFields_candidateTokens';
  create?: Maybe<AiUsagesFields_CandidateTokens_Create>;
  delete?: Maybe<AiUsagesFields_CandidateTokens_Delete>;
  read?: Maybe<AiUsagesFields_CandidateTokens_Read>;
  update?: Maybe<AiUsagesFields_CandidateTokens_Update>;
};

export type AiUsagesFields_CandidateTokens_Create = {
  __typename?: 'AiUsagesFields_candidateTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CandidateTokens_Delete = {
  __typename?: 'AiUsagesFields_candidateTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CandidateTokens_Read = {
  __typename?: 'AiUsagesFields_candidateTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CandidateTokens_Update = {
  __typename?: 'AiUsagesFields_candidateTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CreatedAt = {
  __typename?: 'AiUsagesFields_createdAt';
  create?: Maybe<AiUsagesFields_CreatedAt_Create>;
  delete?: Maybe<AiUsagesFields_CreatedAt_Delete>;
  read?: Maybe<AiUsagesFields_CreatedAt_Read>;
  update?: Maybe<AiUsagesFields_CreatedAt_Update>;
};

export type AiUsagesFields_CreatedAt_Create = {
  __typename?: 'AiUsagesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CreatedAt_Delete = {
  __typename?: 'AiUsagesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CreatedAt_Read = {
  __typename?: 'AiUsagesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_CreatedAt_Update = {
  __typename?: 'AiUsagesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Error = {
  __typename?: 'AiUsagesFields_error';
  create?: Maybe<AiUsagesFields_Error_Create>;
  delete?: Maybe<AiUsagesFields_Error_Delete>;
  read?: Maybe<AiUsagesFields_Error_Read>;
  update?: Maybe<AiUsagesFields_Error_Update>;
};

export type AiUsagesFields_Error_Create = {
  __typename?: 'AiUsagesFields_error_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Error_Delete = {
  __typename?: 'AiUsagesFields_error_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Error_Read = {
  __typename?: 'AiUsagesFields_error_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Error_Update = {
  __typename?: 'AiUsagesFields_error_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_LatencyMs = {
  __typename?: 'AiUsagesFields_latencyMs';
  create?: Maybe<AiUsagesFields_LatencyMs_Create>;
  delete?: Maybe<AiUsagesFields_LatencyMs_Delete>;
  read?: Maybe<AiUsagesFields_LatencyMs_Read>;
  update?: Maybe<AiUsagesFields_LatencyMs_Update>;
};

export type AiUsagesFields_LatencyMs_Create = {
  __typename?: 'AiUsagesFields_latencyMs_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_LatencyMs_Delete = {
  __typename?: 'AiUsagesFields_latencyMs_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_LatencyMs_Read = {
  __typename?: 'AiUsagesFields_latencyMs_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_LatencyMs_Update = {
  __typename?: 'AiUsagesFields_latencyMs_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Model = {
  __typename?: 'AiUsagesFields_model';
  create?: Maybe<AiUsagesFields_Model_Create>;
  delete?: Maybe<AiUsagesFields_Model_Delete>;
  read?: Maybe<AiUsagesFields_Model_Read>;
  update?: Maybe<AiUsagesFields_Model_Update>;
};

export type AiUsagesFields_Model_Create = {
  __typename?: 'AiUsagesFields_model_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Model_Delete = {
  __typename?: 'AiUsagesFields_model_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Model_Read = {
  __typename?: 'AiUsagesFields_model_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Model_Update = {
  __typename?: 'AiUsagesFields_model_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptTokens = {
  __typename?: 'AiUsagesFields_promptTokens';
  create?: Maybe<AiUsagesFields_PromptTokens_Create>;
  delete?: Maybe<AiUsagesFields_PromptTokens_Delete>;
  read?: Maybe<AiUsagesFields_PromptTokens_Read>;
  update?: Maybe<AiUsagesFields_PromptTokens_Update>;
};

export type AiUsagesFields_PromptTokens_Create = {
  __typename?: 'AiUsagesFields_promptTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptTokens_Delete = {
  __typename?: 'AiUsagesFields_promptTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptTokens_Read = {
  __typename?: 'AiUsagesFields_promptTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptTokens_Update = {
  __typename?: 'AiUsagesFields_promptTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptType = {
  __typename?: 'AiUsagesFields_promptType';
  create?: Maybe<AiUsagesFields_PromptType_Create>;
  delete?: Maybe<AiUsagesFields_PromptType_Delete>;
  read?: Maybe<AiUsagesFields_PromptType_Read>;
  update?: Maybe<AiUsagesFields_PromptType_Update>;
};

export type AiUsagesFields_PromptType_Create = {
  __typename?: 'AiUsagesFields_promptType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptType_Delete = {
  __typename?: 'AiUsagesFields_promptType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptType_Read = {
  __typename?: 'AiUsagesFields_promptType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_PromptType_Update = {
  __typename?: 'AiUsagesFields_promptType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Status = {
  __typename?: 'AiUsagesFields_status';
  create?: Maybe<AiUsagesFields_Status_Create>;
  delete?: Maybe<AiUsagesFields_Status_Delete>;
  read?: Maybe<AiUsagesFields_Status_Read>;
  update?: Maybe<AiUsagesFields_Status_Update>;
};

export type AiUsagesFields_Status_Create = {
  __typename?: 'AiUsagesFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Status_Delete = {
  __typename?: 'AiUsagesFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Status_Read = {
  __typename?: 'AiUsagesFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_Status_Update = {
  __typename?: 'AiUsagesFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_TotalTokens = {
  __typename?: 'AiUsagesFields_totalTokens';
  create?: Maybe<AiUsagesFields_TotalTokens_Create>;
  delete?: Maybe<AiUsagesFields_TotalTokens_Delete>;
  read?: Maybe<AiUsagesFields_TotalTokens_Read>;
  update?: Maybe<AiUsagesFields_TotalTokens_Update>;
};

export type AiUsagesFields_TotalTokens_Create = {
  __typename?: 'AiUsagesFields_totalTokens_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_TotalTokens_Delete = {
  __typename?: 'AiUsagesFields_totalTokens_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_TotalTokens_Read = {
  __typename?: 'AiUsagesFields_totalTokens_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_TotalTokens_Update = {
  __typename?: 'AiUsagesFields_totalTokens_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_UpdatedAt = {
  __typename?: 'AiUsagesFields_updatedAt';
  create?: Maybe<AiUsagesFields_UpdatedAt_Create>;
  delete?: Maybe<AiUsagesFields_UpdatedAt_Delete>;
  read?: Maybe<AiUsagesFields_UpdatedAt_Read>;
  update?: Maybe<AiUsagesFields_UpdatedAt_Update>;
};

export type AiUsagesFields_UpdatedAt_Create = {
  __typename?: 'AiUsagesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_UpdatedAt_Delete = {
  __typename?: 'AiUsagesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_UpdatedAt_Read = {
  __typename?: 'AiUsagesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_UpdatedAt_Update = {
  __typename?: 'AiUsagesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_User = {
  __typename?: 'AiUsagesFields_user';
  create?: Maybe<AiUsagesFields_User_Create>;
  delete?: Maybe<AiUsagesFields_User_Delete>;
  read?: Maybe<AiUsagesFields_User_Read>;
  update?: Maybe<AiUsagesFields_User_Update>;
};

export type AiUsagesFields_User_Create = {
  __typename?: 'AiUsagesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_User_Delete = {
  __typename?: 'AiUsagesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_User_Read = {
  __typename?: 'AiUsagesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type AiUsagesFields_User_Update = {
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
  ai?: Maybe<AppSettingsDocAccessFields_Ai>;
  createdAt?: Maybe<AppSettingsDocAccessFields_CreatedAt>;
  updatedAt?: Maybe<AppSettingsDocAccessFields_UpdatedAt>;
};

export type AppSettingsDocAccessFields_Ai = {
  __typename?: 'AppSettingsDocAccessFields_ai';
  create?: Maybe<AppSettingsDocAccessFields_Ai_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_Delete>;
  fields?: Maybe<AppSettingsDocAccessFields_Ai_Fields>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_Update>;
};

export type AppSettingsDocAccessFields_Ai_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Fields = {
  __typename?: 'AppSettingsDocAccessFields_ai_Fields';
  allowUserApiKey?: Maybe<AppSettingsDocAccessFields_Ai_AllowUserApiKey>;
  defaultModel?: Maybe<AppSettingsDocAccessFields_Ai_DefaultModel>;
  enabled?: Maybe<AppSettingsDocAccessFields_Ai_Enabled>;
  geminiApiKey?: Maybe<AppSettingsDocAccessFields_Ai_GeminiApiKey>;
  models?: Maybe<AppSettingsDocAccessFields_Ai_Models>;
  perUserDailyLimit?: Maybe<AppSettingsDocAccessFields_Ai_PerUserDailyLimit>;
  perUserMonthlyLimit?: Maybe<AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit>;
};

export type AppSettingsDocAccessFields_Ai_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_AllowUserApiKey = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey';
  create?: Maybe<AppSettingsDocAccessFields_Ai_AllowUserApiKey_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_AllowUserApiKey_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_AllowUserApiKey_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_AllowUserApiKey_Update>;
};

export type AppSettingsDocAccessFields_Ai_AllowUserApiKey_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_AllowUserApiKey_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_AllowUserApiKey_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_AllowUserApiKey_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_allowUserApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_DefaultModel = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel';
  create?: Maybe<AppSettingsDocAccessFields_Ai_DefaultModel_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_DefaultModel_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_DefaultModel_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_DefaultModel_Update>;
};

export type AppSettingsDocAccessFields_Ai_DefaultModel_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_DefaultModel_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_DefaultModel_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_DefaultModel_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_defaultModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Enabled = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled';
  create?: Maybe<AppSettingsDocAccessFields_Ai_Enabled_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_Enabled_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_Enabled_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_Enabled_Update>;
};

export type AppSettingsDocAccessFields_Ai_Enabled_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Enabled_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Enabled_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Enabled_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_enabled_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_GeminiApiKey = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey';
  create?: Maybe<AppSettingsDocAccessFields_Ai_GeminiApiKey_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_GeminiApiKey_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_GeminiApiKey_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_GeminiApiKey_Update>;
};

export type AppSettingsDocAccessFields_Ai_GeminiApiKey_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_GeminiApiKey_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_GeminiApiKey_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_GeminiApiKey_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models = {
  __typename?: 'AppSettingsDocAccessFields_ai_models';
  create?: Maybe<AppSettingsDocAccessFields_Ai_Models_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_Models_Delete>;
  fields?: Maybe<AppSettingsDocAccessFields_Ai_Models_Fields>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_Models_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_Models_Update>;
};

export type AppSettingsDocAccessFields_Ai_Models_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Fields = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Fields';
  id?: Maybe<AppSettingsDocAccessFields_Ai_Models_Id>;
  name?: Maybe<AppSettingsDocAccessFields_Ai_Models_Name>;
};

export type AppSettingsDocAccessFields_Ai_Models_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Id = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id';
  create?: Maybe<AppSettingsDocAccessFields_Ai_Models_Id_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_Models_Id_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_Models_Id_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_Models_Id_Update>;
};

export type AppSettingsDocAccessFields_Ai_Models_Id_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Id_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Id_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Id_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Name = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name';
  create?: Maybe<AppSettingsDocAccessFields_Ai_Models_Name_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_Models_Name_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_Models_Name_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_Models_Name_Update>;
};

export type AppSettingsDocAccessFields_Ai_Models_Name_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Name_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Name_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_Models_Name_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_models_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserDailyLimit = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit';
  create?: Maybe<AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Update>;
};

export type AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserDailyLimit_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserDailyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit';
  create?: Maybe<AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Read>;
  update?: Maybe<AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Update>;
};

export type AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Create = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Delete = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Read = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_Ai_PerUserMonthlyLimit_Update = {
  __typename?: 'AppSettingsDocAccessFields_ai_perUserMonthlyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_CreatedAt = {
  __typename?: 'AppSettingsDocAccessFields_createdAt';
  create?: Maybe<AppSettingsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<AppSettingsDocAccessFields_CreatedAt_Update>;
};

export type AppSettingsDocAccessFields_CreatedAt_Create = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_CreatedAt_Read = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_CreatedAt_Update = {
  __typename?: 'AppSettingsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_UpdatedAt = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt';
  create?: Maybe<AppSettingsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<AppSettingsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<AppSettingsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<AppSettingsDocAccessFields_UpdatedAt_Update>;
};

export type AppSettingsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'AppSettingsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields = {
  __typename?: 'AppSettingsFields';
  ai?: Maybe<AppSettingsFields_Ai>;
  createdAt?: Maybe<AppSettingsFields_CreatedAt>;
  updatedAt?: Maybe<AppSettingsFields_UpdatedAt>;
};

export type AppSettingsFields_Ai = {
  __typename?: 'AppSettingsFields_ai';
  create?: Maybe<AppSettingsFields_Ai_Create>;
  delete?: Maybe<AppSettingsFields_Ai_Delete>;
  fields?: Maybe<AppSettingsFields_Ai_Fields>;
  read?: Maybe<AppSettingsFields_Ai_Read>;
  update?: Maybe<AppSettingsFields_Ai_Update>;
};

export type AppSettingsFields_Ai_Create = {
  __typename?: 'AppSettingsFields_ai_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Delete = {
  __typename?: 'AppSettingsFields_ai_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Fields = {
  __typename?: 'AppSettingsFields_ai_Fields';
  allowUserApiKey?: Maybe<AppSettingsFields_Ai_AllowUserApiKey>;
  defaultModel?: Maybe<AppSettingsFields_Ai_DefaultModel>;
  enabled?: Maybe<AppSettingsFields_Ai_Enabled>;
  geminiApiKey?: Maybe<AppSettingsFields_Ai_GeminiApiKey>;
  models?: Maybe<AppSettingsFields_Ai_Models>;
  perUserDailyLimit?: Maybe<AppSettingsFields_Ai_PerUserDailyLimit>;
  perUserMonthlyLimit?: Maybe<AppSettingsFields_Ai_PerUserMonthlyLimit>;
};

export type AppSettingsFields_Ai_Read = {
  __typename?: 'AppSettingsFields_ai_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Update = {
  __typename?: 'AppSettingsFields_ai_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_AllowUserApiKey = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey';
  create?: Maybe<AppSettingsFields_Ai_AllowUserApiKey_Create>;
  delete?: Maybe<AppSettingsFields_Ai_AllowUserApiKey_Delete>;
  read?: Maybe<AppSettingsFields_Ai_AllowUserApiKey_Read>;
  update?: Maybe<AppSettingsFields_Ai_AllowUserApiKey_Update>;
};

export type AppSettingsFields_Ai_AllowUserApiKey_Create = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_AllowUserApiKey_Delete = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_AllowUserApiKey_Read = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_AllowUserApiKey_Update = {
  __typename?: 'AppSettingsFields_ai_allowUserApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_DefaultModel = {
  __typename?: 'AppSettingsFields_ai_defaultModel';
  create?: Maybe<AppSettingsFields_Ai_DefaultModel_Create>;
  delete?: Maybe<AppSettingsFields_Ai_DefaultModel_Delete>;
  read?: Maybe<AppSettingsFields_Ai_DefaultModel_Read>;
  update?: Maybe<AppSettingsFields_Ai_DefaultModel_Update>;
};

export type AppSettingsFields_Ai_DefaultModel_Create = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_DefaultModel_Delete = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_DefaultModel_Read = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_DefaultModel_Update = {
  __typename?: 'AppSettingsFields_ai_defaultModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Enabled = {
  __typename?: 'AppSettingsFields_ai_enabled';
  create?: Maybe<AppSettingsFields_Ai_Enabled_Create>;
  delete?: Maybe<AppSettingsFields_Ai_Enabled_Delete>;
  read?: Maybe<AppSettingsFields_Ai_Enabled_Read>;
  update?: Maybe<AppSettingsFields_Ai_Enabled_Update>;
};

export type AppSettingsFields_Ai_Enabled_Create = {
  __typename?: 'AppSettingsFields_ai_enabled_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Enabled_Delete = {
  __typename?: 'AppSettingsFields_ai_enabled_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Enabled_Read = {
  __typename?: 'AppSettingsFields_ai_enabled_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Enabled_Update = {
  __typename?: 'AppSettingsFields_ai_enabled_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_GeminiApiKey = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey';
  create?: Maybe<AppSettingsFields_Ai_GeminiApiKey_Create>;
  delete?: Maybe<AppSettingsFields_Ai_GeminiApiKey_Delete>;
  read?: Maybe<AppSettingsFields_Ai_GeminiApiKey_Read>;
  update?: Maybe<AppSettingsFields_Ai_GeminiApiKey_Update>;
};

export type AppSettingsFields_Ai_GeminiApiKey_Create = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_GeminiApiKey_Delete = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_GeminiApiKey_Read = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_GeminiApiKey_Update = {
  __typename?: 'AppSettingsFields_ai_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models = {
  __typename?: 'AppSettingsFields_ai_models';
  create?: Maybe<AppSettingsFields_Ai_Models_Create>;
  delete?: Maybe<AppSettingsFields_Ai_Models_Delete>;
  fields?: Maybe<AppSettingsFields_Ai_Models_Fields>;
  read?: Maybe<AppSettingsFields_Ai_Models_Read>;
  update?: Maybe<AppSettingsFields_Ai_Models_Update>;
};

export type AppSettingsFields_Ai_Models_Create = {
  __typename?: 'AppSettingsFields_ai_models_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Delete = {
  __typename?: 'AppSettingsFields_ai_models_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Fields = {
  __typename?: 'AppSettingsFields_ai_models_Fields';
  id?: Maybe<AppSettingsFields_Ai_Models_Id>;
  name?: Maybe<AppSettingsFields_Ai_Models_Name>;
};

export type AppSettingsFields_Ai_Models_Read = {
  __typename?: 'AppSettingsFields_ai_models_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Update = {
  __typename?: 'AppSettingsFields_ai_models_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Id = {
  __typename?: 'AppSettingsFields_ai_models_id';
  create?: Maybe<AppSettingsFields_Ai_Models_Id_Create>;
  delete?: Maybe<AppSettingsFields_Ai_Models_Id_Delete>;
  read?: Maybe<AppSettingsFields_Ai_Models_Id_Read>;
  update?: Maybe<AppSettingsFields_Ai_Models_Id_Update>;
};

export type AppSettingsFields_Ai_Models_Id_Create = {
  __typename?: 'AppSettingsFields_ai_models_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Id_Delete = {
  __typename?: 'AppSettingsFields_ai_models_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Id_Read = {
  __typename?: 'AppSettingsFields_ai_models_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Id_Update = {
  __typename?: 'AppSettingsFields_ai_models_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Name = {
  __typename?: 'AppSettingsFields_ai_models_name';
  create?: Maybe<AppSettingsFields_Ai_Models_Name_Create>;
  delete?: Maybe<AppSettingsFields_Ai_Models_Name_Delete>;
  read?: Maybe<AppSettingsFields_Ai_Models_Name_Read>;
  update?: Maybe<AppSettingsFields_Ai_Models_Name_Update>;
};

export type AppSettingsFields_Ai_Models_Name_Create = {
  __typename?: 'AppSettingsFields_ai_models_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Name_Delete = {
  __typename?: 'AppSettingsFields_ai_models_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Name_Read = {
  __typename?: 'AppSettingsFields_ai_models_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_Models_Name_Update = {
  __typename?: 'AppSettingsFields_ai_models_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserDailyLimit = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit';
  create?: Maybe<AppSettingsFields_Ai_PerUserDailyLimit_Create>;
  delete?: Maybe<AppSettingsFields_Ai_PerUserDailyLimit_Delete>;
  read?: Maybe<AppSettingsFields_Ai_PerUserDailyLimit_Read>;
  update?: Maybe<AppSettingsFields_Ai_PerUserDailyLimit_Update>;
};

export type AppSettingsFields_Ai_PerUserDailyLimit_Create = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserDailyLimit_Delete = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserDailyLimit_Read = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserDailyLimit_Update = {
  __typename?: 'AppSettingsFields_ai_perUserDailyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserMonthlyLimit = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit';
  create?: Maybe<AppSettingsFields_Ai_PerUserMonthlyLimit_Create>;
  delete?: Maybe<AppSettingsFields_Ai_PerUserMonthlyLimit_Delete>;
  read?: Maybe<AppSettingsFields_Ai_PerUserMonthlyLimit_Read>;
  update?: Maybe<AppSettingsFields_Ai_PerUserMonthlyLimit_Update>;
};

export type AppSettingsFields_Ai_PerUserMonthlyLimit_Create = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserMonthlyLimit_Delete = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserMonthlyLimit_Read = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_Ai_PerUserMonthlyLimit_Update = {
  __typename?: 'AppSettingsFields_ai_perUserMonthlyLimit_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_CreatedAt = {
  __typename?: 'AppSettingsFields_createdAt';
  create?: Maybe<AppSettingsFields_CreatedAt_Create>;
  delete?: Maybe<AppSettingsFields_CreatedAt_Delete>;
  read?: Maybe<AppSettingsFields_CreatedAt_Read>;
  update?: Maybe<AppSettingsFields_CreatedAt_Update>;
};

export type AppSettingsFields_CreatedAt_Create = {
  __typename?: 'AppSettingsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_CreatedAt_Delete = {
  __typename?: 'AppSettingsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_CreatedAt_Read = {
  __typename?: 'AppSettingsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_CreatedAt_Update = {
  __typename?: 'AppSettingsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_UpdatedAt = {
  __typename?: 'AppSettingsFields_updatedAt';
  create?: Maybe<AppSettingsFields_UpdatedAt_Create>;
  delete?: Maybe<AppSettingsFields_UpdatedAt_Delete>;
  read?: Maybe<AppSettingsFields_UpdatedAt_Read>;
  update?: Maybe<AppSettingsFields_UpdatedAt_Update>;
};

export type AppSettingsFields_UpdatedAt_Create = {
  __typename?: 'AppSettingsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_UpdatedAt_Delete = {
  __typename?: 'AppSettingsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_UpdatedAt_Read = {
  __typename?: 'AppSettingsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AppSettingsFields_UpdatedAt_Update = {
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
  bgColor?: Maybe<CategoriesDocAccessFields_BgColor>;
  color?: Maybe<CategoriesDocAccessFields_Color>;
  createdAt?: Maybe<CategoriesDocAccessFields_CreatedAt>;
  description?: Maybe<CategoriesDocAccessFields_Description>;
  icon?: Maybe<CategoriesDocAccessFields_Icon>;
  isActive?: Maybe<CategoriesDocAccessFields_IsActive>;
  name?: Maybe<CategoriesDocAccessFields_Name>;
  parent?: Maybe<CategoriesDocAccessFields_Parent>;
  type?: Maybe<CategoriesDocAccessFields_Type>;
  updatedAt?: Maybe<CategoriesDocAccessFields_UpdatedAt>;
  user?: Maybe<CategoriesDocAccessFields_User>;
};

export type CategoriesDocAccessFields_BgColor = {
  __typename?: 'CategoriesDocAccessFields_bgColor';
  create?: Maybe<CategoriesDocAccessFields_BgColor_Create>;
  delete?: Maybe<CategoriesDocAccessFields_BgColor_Delete>;
  read?: Maybe<CategoriesDocAccessFields_BgColor_Read>;
  update?: Maybe<CategoriesDocAccessFields_BgColor_Update>;
};

export type CategoriesDocAccessFields_BgColor_Create = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_BgColor_Delete = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_BgColor_Read = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_BgColor_Update = {
  __typename?: 'CategoriesDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Color = {
  __typename?: 'CategoriesDocAccessFields_color';
  create?: Maybe<CategoriesDocAccessFields_Color_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Color_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Color_Read>;
  update?: Maybe<CategoriesDocAccessFields_Color_Update>;
};

export type CategoriesDocAccessFields_Color_Create = {
  __typename?: 'CategoriesDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Color_Delete = {
  __typename?: 'CategoriesDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Color_Read = {
  __typename?: 'CategoriesDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Color_Update = {
  __typename?: 'CategoriesDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_CreatedAt = {
  __typename?: 'CategoriesDocAccessFields_createdAt';
  create?: Maybe<CategoriesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<CategoriesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<CategoriesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<CategoriesDocAccessFields_CreatedAt_Update>;
};

export type CategoriesDocAccessFields_CreatedAt_Create = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_CreatedAt_Read = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_CreatedAt_Update = {
  __typename?: 'CategoriesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Description = {
  __typename?: 'CategoriesDocAccessFields_description';
  create?: Maybe<CategoriesDocAccessFields_Description_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Description_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Description_Read>;
  update?: Maybe<CategoriesDocAccessFields_Description_Update>;
};

export type CategoriesDocAccessFields_Description_Create = {
  __typename?: 'CategoriesDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Description_Delete = {
  __typename?: 'CategoriesDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Description_Read = {
  __typename?: 'CategoriesDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Description_Update = {
  __typename?: 'CategoriesDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Icon = {
  __typename?: 'CategoriesDocAccessFields_icon';
  create?: Maybe<CategoriesDocAccessFields_Icon_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Icon_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Icon_Read>;
  update?: Maybe<CategoriesDocAccessFields_Icon_Update>;
};

export type CategoriesDocAccessFields_Icon_Create = {
  __typename?: 'CategoriesDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Icon_Delete = {
  __typename?: 'CategoriesDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Icon_Read = {
  __typename?: 'CategoriesDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Icon_Update = {
  __typename?: 'CategoriesDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_IsActive = {
  __typename?: 'CategoriesDocAccessFields_isActive';
  create?: Maybe<CategoriesDocAccessFields_IsActive_Create>;
  delete?: Maybe<CategoriesDocAccessFields_IsActive_Delete>;
  read?: Maybe<CategoriesDocAccessFields_IsActive_Read>;
  update?: Maybe<CategoriesDocAccessFields_IsActive_Update>;
};

export type CategoriesDocAccessFields_IsActive_Create = {
  __typename?: 'CategoriesDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_IsActive_Delete = {
  __typename?: 'CategoriesDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_IsActive_Read = {
  __typename?: 'CategoriesDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_IsActive_Update = {
  __typename?: 'CategoriesDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Name = {
  __typename?: 'CategoriesDocAccessFields_name';
  create?: Maybe<CategoriesDocAccessFields_Name_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Name_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Name_Read>;
  update?: Maybe<CategoriesDocAccessFields_Name_Update>;
};

export type CategoriesDocAccessFields_Name_Create = {
  __typename?: 'CategoriesDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Name_Delete = {
  __typename?: 'CategoriesDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Name_Read = {
  __typename?: 'CategoriesDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Name_Update = {
  __typename?: 'CategoriesDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Parent = {
  __typename?: 'CategoriesDocAccessFields_parent';
  create?: Maybe<CategoriesDocAccessFields_Parent_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Parent_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Parent_Read>;
  update?: Maybe<CategoriesDocAccessFields_Parent_Update>;
};

export type CategoriesDocAccessFields_Parent_Create = {
  __typename?: 'CategoriesDocAccessFields_parent_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Parent_Delete = {
  __typename?: 'CategoriesDocAccessFields_parent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Parent_Read = {
  __typename?: 'CategoriesDocAccessFields_parent_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Parent_Update = {
  __typename?: 'CategoriesDocAccessFields_parent_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Type = {
  __typename?: 'CategoriesDocAccessFields_type';
  create?: Maybe<CategoriesDocAccessFields_Type_Create>;
  delete?: Maybe<CategoriesDocAccessFields_Type_Delete>;
  read?: Maybe<CategoriesDocAccessFields_Type_Read>;
  update?: Maybe<CategoriesDocAccessFields_Type_Update>;
};

export type CategoriesDocAccessFields_Type_Create = {
  __typename?: 'CategoriesDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Type_Delete = {
  __typename?: 'CategoriesDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Type_Read = {
  __typename?: 'CategoriesDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_Type_Update = {
  __typename?: 'CategoriesDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_UpdatedAt = {
  __typename?: 'CategoriesDocAccessFields_updatedAt';
  create?: Maybe<CategoriesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<CategoriesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<CategoriesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<CategoriesDocAccessFields_UpdatedAt_Update>;
};

export type CategoriesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'CategoriesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_User = {
  __typename?: 'CategoriesDocAccessFields_user';
  create?: Maybe<CategoriesDocAccessFields_User_Create>;
  delete?: Maybe<CategoriesDocAccessFields_User_Delete>;
  read?: Maybe<CategoriesDocAccessFields_User_Read>;
  update?: Maybe<CategoriesDocAccessFields_User_Update>;
};

export type CategoriesDocAccessFields_User_Create = {
  __typename?: 'CategoriesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_User_Delete = {
  __typename?: 'CategoriesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_User_Read = {
  __typename?: 'CategoriesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesDocAccessFields_User_Update = {
  __typename?: 'CategoriesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields = {
  __typename?: 'CategoriesFields';
  bgColor?: Maybe<CategoriesFields_BgColor>;
  color?: Maybe<CategoriesFields_Color>;
  createdAt?: Maybe<CategoriesFields_CreatedAt>;
  description?: Maybe<CategoriesFields_Description>;
  icon?: Maybe<CategoriesFields_Icon>;
  isActive?: Maybe<CategoriesFields_IsActive>;
  name?: Maybe<CategoriesFields_Name>;
  parent?: Maybe<CategoriesFields_Parent>;
  type?: Maybe<CategoriesFields_Type>;
  updatedAt?: Maybe<CategoriesFields_UpdatedAt>;
  user?: Maybe<CategoriesFields_User>;
};

export type CategoriesFields_BgColor = {
  __typename?: 'CategoriesFields_bgColor';
  create?: Maybe<CategoriesFields_BgColor_Create>;
  delete?: Maybe<CategoriesFields_BgColor_Delete>;
  read?: Maybe<CategoriesFields_BgColor_Read>;
  update?: Maybe<CategoriesFields_BgColor_Update>;
};

export type CategoriesFields_BgColor_Create = {
  __typename?: 'CategoriesFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_BgColor_Delete = {
  __typename?: 'CategoriesFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_BgColor_Read = {
  __typename?: 'CategoriesFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_BgColor_Update = {
  __typename?: 'CategoriesFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Color = {
  __typename?: 'CategoriesFields_color';
  create?: Maybe<CategoriesFields_Color_Create>;
  delete?: Maybe<CategoriesFields_Color_Delete>;
  read?: Maybe<CategoriesFields_Color_Read>;
  update?: Maybe<CategoriesFields_Color_Update>;
};

export type CategoriesFields_Color_Create = {
  __typename?: 'CategoriesFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Color_Delete = {
  __typename?: 'CategoriesFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Color_Read = {
  __typename?: 'CategoriesFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Color_Update = {
  __typename?: 'CategoriesFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_CreatedAt = {
  __typename?: 'CategoriesFields_createdAt';
  create?: Maybe<CategoriesFields_CreatedAt_Create>;
  delete?: Maybe<CategoriesFields_CreatedAt_Delete>;
  read?: Maybe<CategoriesFields_CreatedAt_Read>;
  update?: Maybe<CategoriesFields_CreatedAt_Update>;
};

export type CategoriesFields_CreatedAt_Create = {
  __typename?: 'CategoriesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_CreatedAt_Delete = {
  __typename?: 'CategoriesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_CreatedAt_Read = {
  __typename?: 'CategoriesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_CreatedAt_Update = {
  __typename?: 'CategoriesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Description = {
  __typename?: 'CategoriesFields_description';
  create?: Maybe<CategoriesFields_Description_Create>;
  delete?: Maybe<CategoriesFields_Description_Delete>;
  read?: Maybe<CategoriesFields_Description_Read>;
  update?: Maybe<CategoriesFields_Description_Update>;
};

export type CategoriesFields_Description_Create = {
  __typename?: 'CategoriesFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Description_Delete = {
  __typename?: 'CategoriesFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Description_Read = {
  __typename?: 'CategoriesFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Description_Update = {
  __typename?: 'CategoriesFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Icon = {
  __typename?: 'CategoriesFields_icon';
  create?: Maybe<CategoriesFields_Icon_Create>;
  delete?: Maybe<CategoriesFields_Icon_Delete>;
  read?: Maybe<CategoriesFields_Icon_Read>;
  update?: Maybe<CategoriesFields_Icon_Update>;
};

export type CategoriesFields_Icon_Create = {
  __typename?: 'CategoriesFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Icon_Delete = {
  __typename?: 'CategoriesFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Icon_Read = {
  __typename?: 'CategoriesFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Icon_Update = {
  __typename?: 'CategoriesFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_IsActive = {
  __typename?: 'CategoriesFields_isActive';
  create?: Maybe<CategoriesFields_IsActive_Create>;
  delete?: Maybe<CategoriesFields_IsActive_Delete>;
  read?: Maybe<CategoriesFields_IsActive_Read>;
  update?: Maybe<CategoriesFields_IsActive_Update>;
};

export type CategoriesFields_IsActive_Create = {
  __typename?: 'CategoriesFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_IsActive_Delete = {
  __typename?: 'CategoriesFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_IsActive_Read = {
  __typename?: 'CategoriesFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_IsActive_Update = {
  __typename?: 'CategoriesFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Name = {
  __typename?: 'CategoriesFields_name';
  create?: Maybe<CategoriesFields_Name_Create>;
  delete?: Maybe<CategoriesFields_Name_Delete>;
  read?: Maybe<CategoriesFields_Name_Read>;
  update?: Maybe<CategoriesFields_Name_Update>;
};

export type CategoriesFields_Name_Create = {
  __typename?: 'CategoriesFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Name_Delete = {
  __typename?: 'CategoriesFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Name_Read = {
  __typename?: 'CategoriesFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Name_Update = {
  __typename?: 'CategoriesFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Parent = {
  __typename?: 'CategoriesFields_parent';
  create?: Maybe<CategoriesFields_Parent_Create>;
  delete?: Maybe<CategoriesFields_Parent_Delete>;
  read?: Maybe<CategoriesFields_Parent_Read>;
  update?: Maybe<CategoriesFields_Parent_Update>;
};

export type CategoriesFields_Parent_Create = {
  __typename?: 'CategoriesFields_parent_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Parent_Delete = {
  __typename?: 'CategoriesFields_parent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Parent_Read = {
  __typename?: 'CategoriesFields_parent_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Parent_Update = {
  __typename?: 'CategoriesFields_parent_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Type = {
  __typename?: 'CategoriesFields_type';
  create?: Maybe<CategoriesFields_Type_Create>;
  delete?: Maybe<CategoriesFields_Type_Delete>;
  read?: Maybe<CategoriesFields_Type_Read>;
  update?: Maybe<CategoriesFields_Type_Update>;
};

export type CategoriesFields_Type_Create = {
  __typename?: 'CategoriesFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Type_Delete = {
  __typename?: 'CategoriesFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Type_Read = {
  __typename?: 'CategoriesFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_Type_Update = {
  __typename?: 'CategoriesFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_UpdatedAt = {
  __typename?: 'CategoriesFields_updatedAt';
  create?: Maybe<CategoriesFields_UpdatedAt_Create>;
  delete?: Maybe<CategoriesFields_UpdatedAt_Delete>;
  read?: Maybe<CategoriesFields_UpdatedAt_Read>;
  update?: Maybe<CategoriesFields_UpdatedAt_Update>;
};

export type CategoriesFields_UpdatedAt_Create = {
  __typename?: 'CategoriesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_UpdatedAt_Delete = {
  __typename?: 'CategoriesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_UpdatedAt_Read = {
  __typename?: 'CategoriesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_UpdatedAt_Update = {
  __typename?: 'CategoriesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_User = {
  __typename?: 'CategoriesFields_user';
  create?: Maybe<CategoriesFields_User_Create>;
  delete?: Maybe<CategoriesFields_User_Delete>;
  read?: Maybe<CategoriesFields_User_Read>;
  update?: Maybe<CategoriesFields_User_Update>;
};

export type CategoriesFields_User_Create = {
  __typename?: 'CategoriesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_User_Delete = {
  __typename?: 'CategoriesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_User_Read = {
  __typename?: 'CategoriesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type CategoriesFields_User_Update = {
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
  type: Category_Type;
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

export enum CategoryUpdate_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Category_BgColor_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_Color_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Category_Description_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Category_Icon_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_IsActive_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Category_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Category_Parent_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export enum Category_Type {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Category_Type_Input {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Category_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Category_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Category_Type_Input>>>;
  equals?: InputMaybe<Category_Type_Input>;
  in?: InputMaybe<Array<InputMaybe<Category_Type_Input>>>;
  not_equals?: InputMaybe<Category_Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Category_Type_Input>>>;
};

export type Category_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Category_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Category_Where = {
  AND?: InputMaybe<Array<InputMaybe<Category_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_Where_Or>>>;
  bgColor?: InputMaybe<Category_BgColor_Operator>;
  color?: InputMaybe<Category_Color_Operator>;
  createdAt?: InputMaybe<Category_CreatedAt_Operator>;
  description?: InputMaybe<Category_Description_Operator>;
  icon?: InputMaybe<Category_Icon_Operator>;
  id?: InputMaybe<Category_Id_Operator>;
  isActive?: InputMaybe<Category_IsActive_Operator>;
  name?: InputMaybe<Category_Name_Operator>;
  parent?: InputMaybe<Category_Parent_Operator>;
  type?: InputMaybe<Category_Type_Operator>;
  updatedAt?: InputMaybe<Category_UpdatedAt_Operator>;
  user?: InputMaybe<Category_User_Operator>;
};

export type Category_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Category_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_Where_Or>>>;
  bgColor?: InputMaybe<Category_BgColor_Operator>;
  color?: InputMaybe<Category_Color_Operator>;
  createdAt?: InputMaybe<Category_CreatedAt_Operator>;
  description?: InputMaybe<Category_Description_Operator>;
  icon?: InputMaybe<Category_Icon_Operator>;
  id?: InputMaybe<Category_Id_Operator>;
  isActive?: InputMaybe<Category_IsActive_Operator>;
  name?: InputMaybe<Category_Name_Operator>;
  parent?: InputMaybe<Category_Parent_Operator>;
  type?: InputMaybe<Category_Type_Operator>;
  updatedAt?: InputMaybe<Category_UpdatedAt_Operator>;
  user?: InputMaybe<Category_User_Operator>;
};

export type Category_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Category_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Category_Where_Or>>>;
  bgColor?: InputMaybe<Category_BgColor_Operator>;
  color?: InputMaybe<Category_Color_Operator>;
  createdAt?: InputMaybe<Category_CreatedAt_Operator>;
  description?: InputMaybe<Category_Description_Operator>;
  icon?: InputMaybe<Category_Icon_Operator>;
  id?: InputMaybe<Category_Id_Operator>;
  isActive?: InputMaybe<Category_IsActive_Operator>;
  name?: InputMaybe<Category_Name_Operator>;
  parent?: InputMaybe<Category_Parent_Operator>;
  type?: InputMaybe<Category_Type_Operator>;
  updatedAt?: InputMaybe<Category_UpdatedAt_Operator>;
  user?: InputMaybe<Category_User_Operator>;
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
  entityType?: Maybe<Media_EntityType>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['Float']['output']>;
  focalX?: Maybe<Scalars['Float']['output']>;
  focalY?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Media_Type>;
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
  alt?: Maybe<MediaDocAccessFields_Alt>;
  createdAt?: Maybe<MediaDocAccessFields_CreatedAt>;
  entityType?: Maybe<MediaDocAccessFields_EntityType>;
  filename?: Maybe<MediaDocAccessFields_Filename>;
  filesize?: Maybe<MediaDocAccessFields_Filesize>;
  focalX?: Maybe<MediaDocAccessFields_FocalX>;
  focalY?: Maybe<MediaDocAccessFields_FocalY>;
  height?: Maybe<MediaDocAccessFields_Height>;
  mimeType?: Maybe<MediaDocAccessFields_MimeType>;
  thumbnailURL?: Maybe<MediaDocAccessFields_ThumbnailUrl>;
  type?: Maybe<MediaDocAccessFields_Type>;
  updatedAt?: Maybe<MediaDocAccessFields_UpdatedAt>;
  url?: Maybe<MediaDocAccessFields_Url>;
  user?: Maybe<MediaDocAccessFields_User>;
  width?: Maybe<MediaDocAccessFields_Width>;
};

export type MediaDocAccessFields_Alt = {
  __typename?: 'MediaDocAccessFields_alt';
  create?: Maybe<MediaDocAccessFields_Alt_Create>;
  delete?: Maybe<MediaDocAccessFields_Alt_Delete>;
  read?: Maybe<MediaDocAccessFields_Alt_Read>;
  update?: Maybe<MediaDocAccessFields_Alt_Update>;
};

export type MediaDocAccessFields_Alt_Create = {
  __typename?: 'MediaDocAccessFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Delete = {
  __typename?: 'MediaDocAccessFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Read = {
  __typename?: 'MediaDocAccessFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Update = {
  __typename?: 'MediaDocAccessFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt = {
  __typename?: 'MediaDocAccessFields_createdAt';
  create?: Maybe<MediaDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_CreatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_CreatedAt_Update>;
};

export type MediaDocAccessFields_CreatedAt_Create = {
  __typename?: 'MediaDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Read = {
  __typename?: 'MediaDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Update = {
  __typename?: 'MediaDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_EntityType = {
  __typename?: 'MediaDocAccessFields_entityType';
  create?: Maybe<MediaDocAccessFields_EntityType_Create>;
  delete?: Maybe<MediaDocAccessFields_EntityType_Delete>;
  read?: Maybe<MediaDocAccessFields_EntityType_Read>;
  update?: Maybe<MediaDocAccessFields_EntityType_Update>;
};

export type MediaDocAccessFields_EntityType_Create = {
  __typename?: 'MediaDocAccessFields_entityType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_EntityType_Delete = {
  __typename?: 'MediaDocAccessFields_entityType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_EntityType_Read = {
  __typename?: 'MediaDocAccessFields_entityType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_EntityType_Update = {
  __typename?: 'MediaDocAccessFields_entityType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename = {
  __typename?: 'MediaDocAccessFields_filename';
  create?: Maybe<MediaDocAccessFields_Filename_Create>;
  delete?: Maybe<MediaDocAccessFields_Filename_Delete>;
  read?: Maybe<MediaDocAccessFields_Filename_Read>;
  update?: Maybe<MediaDocAccessFields_Filename_Update>;
};

export type MediaDocAccessFields_Filename_Create = {
  __typename?: 'MediaDocAccessFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Delete = {
  __typename?: 'MediaDocAccessFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Read = {
  __typename?: 'MediaDocAccessFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Update = {
  __typename?: 'MediaDocAccessFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize = {
  __typename?: 'MediaDocAccessFields_filesize';
  create?: Maybe<MediaDocAccessFields_Filesize_Create>;
  delete?: Maybe<MediaDocAccessFields_Filesize_Delete>;
  read?: Maybe<MediaDocAccessFields_Filesize_Read>;
  update?: Maybe<MediaDocAccessFields_Filesize_Update>;
};

export type MediaDocAccessFields_Filesize_Create = {
  __typename?: 'MediaDocAccessFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Delete = {
  __typename?: 'MediaDocAccessFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Read = {
  __typename?: 'MediaDocAccessFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Update = {
  __typename?: 'MediaDocAccessFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX = {
  __typename?: 'MediaDocAccessFields_focalX';
  create?: Maybe<MediaDocAccessFields_FocalX_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalX_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalX_Read>;
  update?: Maybe<MediaDocAccessFields_FocalX_Update>;
};

export type MediaDocAccessFields_FocalX_Create = {
  __typename?: 'MediaDocAccessFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Delete = {
  __typename?: 'MediaDocAccessFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Read = {
  __typename?: 'MediaDocAccessFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Update = {
  __typename?: 'MediaDocAccessFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY = {
  __typename?: 'MediaDocAccessFields_focalY';
  create?: Maybe<MediaDocAccessFields_FocalY_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalY_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalY_Read>;
  update?: Maybe<MediaDocAccessFields_FocalY_Update>;
};

export type MediaDocAccessFields_FocalY_Create = {
  __typename?: 'MediaDocAccessFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Delete = {
  __typename?: 'MediaDocAccessFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Read = {
  __typename?: 'MediaDocAccessFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Update = {
  __typename?: 'MediaDocAccessFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height = {
  __typename?: 'MediaDocAccessFields_height';
  create?: Maybe<MediaDocAccessFields_Height_Create>;
  delete?: Maybe<MediaDocAccessFields_Height_Delete>;
  read?: Maybe<MediaDocAccessFields_Height_Read>;
  update?: Maybe<MediaDocAccessFields_Height_Update>;
};

export type MediaDocAccessFields_Height_Create = {
  __typename?: 'MediaDocAccessFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Delete = {
  __typename?: 'MediaDocAccessFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Read = {
  __typename?: 'MediaDocAccessFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Update = {
  __typename?: 'MediaDocAccessFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType = {
  __typename?: 'MediaDocAccessFields_mimeType';
  create?: Maybe<MediaDocAccessFields_MimeType_Create>;
  delete?: Maybe<MediaDocAccessFields_MimeType_Delete>;
  read?: Maybe<MediaDocAccessFields_MimeType_Read>;
  update?: Maybe<MediaDocAccessFields_MimeType_Update>;
};

export type MediaDocAccessFields_MimeType_Create = {
  __typename?: 'MediaDocAccessFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Delete = {
  __typename?: 'MediaDocAccessFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Read = {
  __typename?: 'MediaDocAccessFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Update = {
  __typename?: 'MediaDocAccessFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl = {
  __typename?: 'MediaDocAccessFields_thumbnailURL';
  create?: Maybe<MediaDocAccessFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaDocAccessFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaDocAccessFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaDocAccessFields_ThumbnailUrl_Update>;
};

export type MediaDocAccessFields_ThumbnailUrl_Create = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Read = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Update = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Type = {
  __typename?: 'MediaDocAccessFields_type';
  create?: Maybe<MediaDocAccessFields_Type_Create>;
  delete?: Maybe<MediaDocAccessFields_Type_Delete>;
  read?: Maybe<MediaDocAccessFields_Type_Read>;
  update?: Maybe<MediaDocAccessFields_Type_Update>;
};

export type MediaDocAccessFields_Type_Create = {
  __typename?: 'MediaDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Type_Delete = {
  __typename?: 'MediaDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Type_Read = {
  __typename?: 'MediaDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Type_Update = {
  __typename?: 'MediaDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt = {
  __typename?: 'MediaDocAccessFields_updatedAt';
  create?: Maybe<MediaDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_UpdatedAt_Update>;
};

export type MediaDocAccessFields_UpdatedAt_Create = {
  __typename?: 'MediaDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Read = {
  __typename?: 'MediaDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Update = {
  __typename?: 'MediaDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url = {
  __typename?: 'MediaDocAccessFields_url';
  create?: Maybe<MediaDocAccessFields_Url_Create>;
  delete?: Maybe<MediaDocAccessFields_Url_Delete>;
  read?: Maybe<MediaDocAccessFields_Url_Read>;
  update?: Maybe<MediaDocAccessFields_Url_Update>;
};

export type MediaDocAccessFields_Url_Create = {
  __typename?: 'MediaDocAccessFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Delete = {
  __typename?: 'MediaDocAccessFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Read = {
  __typename?: 'MediaDocAccessFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Update = {
  __typename?: 'MediaDocAccessFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_User = {
  __typename?: 'MediaDocAccessFields_user';
  create?: Maybe<MediaDocAccessFields_User_Create>;
  delete?: Maybe<MediaDocAccessFields_User_Delete>;
  read?: Maybe<MediaDocAccessFields_User_Read>;
  update?: Maybe<MediaDocAccessFields_User_Update>;
};

export type MediaDocAccessFields_User_Create = {
  __typename?: 'MediaDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_User_Delete = {
  __typename?: 'MediaDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_User_Read = {
  __typename?: 'MediaDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_User_Update = {
  __typename?: 'MediaDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width = {
  __typename?: 'MediaDocAccessFields_width';
  create?: Maybe<MediaDocAccessFields_Width_Create>;
  delete?: Maybe<MediaDocAccessFields_Width_Delete>;
  read?: Maybe<MediaDocAccessFields_Width_Read>;
  update?: Maybe<MediaDocAccessFields_Width_Update>;
};

export type MediaDocAccessFields_Width_Create = {
  __typename?: 'MediaDocAccessFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Delete = {
  __typename?: 'MediaDocAccessFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Read = {
  __typename?: 'MediaDocAccessFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Update = {
  __typename?: 'MediaDocAccessFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields = {
  __typename?: 'MediaFields';
  alt?: Maybe<MediaFields_Alt>;
  createdAt?: Maybe<MediaFields_CreatedAt>;
  entityType?: Maybe<MediaFields_EntityType>;
  filename?: Maybe<MediaFields_Filename>;
  filesize?: Maybe<MediaFields_Filesize>;
  focalX?: Maybe<MediaFields_FocalX>;
  focalY?: Maybe<MediaFields_FocalY>;
  height?: Maybe<MediaFields_Height>;
  mimeType?: Maybe<MediaFields_MimeType>;
  thumbnailURL?: Maybe<MediaFields_ThumbnailUrl>;
  type?: Maybe<MediaFields_Type>;
  updatedAt?: Maybe<MediaFields_UpdatedAt>;
  url?: Maybe<MediaFields_Url>;
  user?: Maybe<MediaFields_User>;
  width?: Maybe<MediaFields_Width>;
};

export type MediaFields_Alt = {
  __typename?: 'MediaFields_alt';
  create?: Maybe<MediaFields_Alt_Create>;
  delete?: Maybe<MediaFields_Alt_Delete>;
  read?: Maybe<MediaFields_Alt_Read>;
  update?: Maybe<MediaFields_Alt_Update>;
};

export type MediaFields_Alt_Create = {
  __typename?: 'MediaFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Delete = {
  __typename?: 'MediaFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Read = {
  __typename?: 'MediaFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Update = {
  __typename?: 'MediaFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt = {
  __typename?: 'MediaFields_createdAt';
  create?: Maybe<MediaFields_CreatedAt_Create>;
  delete?: Maybe<MediaFields_CreatedAt_Delete>;
  read?: Maybe<MediaFields_CreatedAt_Read>;
  update?: Maybe<MediaFields_CreatedAt_Update>;
};

export type MediaFields_CreatedAt_Create = {
  __typename?: 'MediaFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Delete = {
  __typename?: 'MediaFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Read = {
  __typename?: 'MediaFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Update = {
  __typename?: 'MediaFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_EntityType = {
  __typename?: 'MediaFields_entityType';
  create?: Maybe<MediaFields_EntityType_Create>;
  delete?: Maybe<MediaFields_EntityType_Delete>;
  read?: Maybe<MediaFields_EntityType_Read>;
  update?: Maybe<MediaFields_EntityType_Update>;
};

export type MediaFields_EntityType_Create = {
  __typename?: 'MediaFields_entityType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_EntityType_Delete = {
  __typename?: 'MediaFields_entityType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_EntityType_Read = {
  __typename?: 'MediaFields_entityType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_EntityType_Update = {
  __typename?: 'MediaFields_entityType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename = {
  __typename?: 'MediaFields_filename';
  create?: Maybe<MediaFields_Filename_Create>;
  delete?: Maybe<MediaFields_Filename_Delete>;
  read?: Maybe<MediaFields_Filename_Read>;
  update?: Maybe<MediaFields_Filename_Update>;
};

export type MediaFields_Filename_Create = {
  __typename?: 'MediaFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Delete = {
  __typename?: 'MediaFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Read = {
  __typename?: 'MediaFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Update = {
  __typename?: 'MediaFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize = {
  __typename?: 'MediaFields_filesize';
  create?: Maybe<MediaFields_Filesize_Create>;
  delete?: Maybe<MediaFields_Filesize_Delete>;
  read?: Maybe<MediaFields_Filesize_Read>;
  update?: Maybe<MediaFields_Filesize_Update>;
};

export type MediaFields_Filesize_Create = {
  __typename?: 'MediaFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Delete = {
  __typename?: 'MediaFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Read = {
  __typename?: 'MediaFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Update = {
  __typename?: 'MediaFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX = {
  __typename?: 'MediaFields_focalX';
  create?: Maybe<MediaFields_FocalX_Create>;
  delete?: Maybe<MediaFields_FocalX_Delete>;
  read?: Maybe<MediaFields_FocalX_Read>;
  update?: Maybe<MediaFields_FocalX_Update>;
};

export type MediaFields_FocalX_Create = {
  __typename?: 'MediaFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Delete = {
  __typename?: 'MediaFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Read = {
  __typename?: 'MediaFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Update = {
  __typename?: 'MediaFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY = {
  __typename?: 'MediaFields_focalY';
  create?: Maybe<MediaFields_FocalY_Create>;
  delete?: Maybe<MediaFields_FocalY_Delete>;
  read?: Maybe<MediaFields_FocalY_Read>;
  update?: Maybe<MediaFields_FocalY_Update>;
};

export type MediaFields_FocalY_Create = {
  __typename?: 'MediaFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Delete = {
  __typename?: 'MediaFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Read = {
  __typename?: 'MediaFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Update = {
  __typename?: 'MediaFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height = {
  __typename?: 'MediaFields_height';
  create?: Maybe<MediaFields_Height_Create>;
  delete?: Maybe<MediaFields_Height_Delete>;
  read?: Maybe<MediaFields_Height_Read>;
  update?: Maybe<MediaFields_Height_Update>;
};

export type MediaFields_Height_Create = {
  __typename?: 'MediaFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Delete = {
  __typename?: 'MediaFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Read = {
  __typename?: 'MediaFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Update = {
  __typename?: 'MediaFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType = {
  __typename?: 'MediaFields_mimeType';
  create?: Maybe<MediaFields_MimeType_Create>;
  delete?: Maybe<MediaFields_MimeType_Delete>;
  read?: Maybe<MediaFields_MimeType_Read>;
  update?: Maybe<MediaFields_MimeType_Update>;
};

export type MediaFields_MimeType_Create = {
  __typename?: 'MediaFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Delete = {
  __typename?: 'MediaFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Read = {
  __typename?: 'MediaFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Update = {
  __typename?: 'MediaFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl = {
  __typename?: 'MediaFields_thumbnailURL';
  create?: Maybe<MediaFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaFields_ThumbnailUrl_Update>;
};

export type MediaFields_ThumbnailUrl_Create = {
  __typename?: 'MediaFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Read = {
  __typename?: 'MediaFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Update = {
  __typename?: 'MediaFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Type = {
  __typename?: 'MediaFields_type';
  create?: Maybe<MediaFields_Type_Create>;
  delete?: Maybe<MediaFields_Type_Delete>;
  read?: Maybe<MediaFields_Type_Read>;
  update?: Maybe<MediaFields_Type_Update>;
};

export type MediaFields_Type_Create = {
  __typename?: 'MediaFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Type_Delete = {
  __typename?: 'MediaFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Type_Read = {
  __typename?: 'MediaFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Type_Update = {
  __typename?: 'MediaFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt = {
  __typename?: 'MediaFields_updatedAt';
  create?: Maybe<MediaFields_UpdatedAt_Create>;
  delete?: Maybe<MediaFields_UpdatedAt_Delete>;
  read?: Maybe<MediaFields_UpdatedAt_Read>;
  update?: Maybe<MediaFields_UpdatedAt_Update>;
};

export type MediaFields_UpdatedAt_Create = {
  __typename?: 'MediaFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Delete = {
  __typename?: 'MediaFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Read = {
  __typename?: 'MediaFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Update = {
  __typename?: 'MediaFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url = {
  __typename?: 'MediaFields_url';
  create?: Maybe<MediaFields_Url_Create>;
  delete?: Maybe<MediaFields_Url_Delete>;
  read?: Maybe<MediaFields_Url_Read>;
  update?: Maybe<MediaFields_Url_Update>;
};

export type MediaFields_Url_Create = {
  __typename?: 'MediaFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Delete = {
  __typename?: 'MediaFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Read = {
  __typename?: 'MediaFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Update = {
  __typename?: 'MediaFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_User = {
  __typename?: 'MediaFields_user';
  create?: Maybe<MediaFields_User_Create>;
  delete?: Maybe<MediaFields_User_Delete>;
  read?: Maybe<MediaFields_User_Read>;
  update?: Maybe<MediaFields_User_Update>;
};

export type MediaFields_User_Create = {
  __typename?: 'MediaFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_User_Delete = {
  __typename?: 'MediaFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_User_Read = {
  __typename?: 'MediaFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_User_Update = {
  __typename?: 'MediaFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width = {
  __typename?: 'MediaFields_width';
  create?: Maybe<MediaFields_Width_Create>;
  delete?: Maybe<MediaFields_Width_Delete>;
  read?: Maybe<MediaFields_Width_Read>;
  update?: Maybe<MediaFields_Width_Update>;
};

export type MediaFields_Width_Create = {
  __typename?: 'MediaFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Delete = {
  __typename?: 'MediaFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Read = {
  __typename?: 'MediaFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Update = {
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

export enum MediaUpdate_EntityType_MutationInput {
  Account = 'account',
  Other = 'other',
  Person = 'person',
  Transaction = 'transaction'
}

export enum MediaUpdate_Type_MutationInput {
  Attachment = 'attachment',
  Avatar = 'avatar',
  Other = 'other'
}

export type Media_Alt_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Media_EntityType {
  Account = 'account',
  Other = 'other',
  Person = 'person',
  Transaction = 'transaction'
}

export enum Media_EntityType_Input {
  Account = 'account',
  Other = 'other',
  Person = 'person',
  Transaction = 'transaction'
}

export enum Media_EntityType_MutationInput {
  Account = 'account',
  Other = 'other',
  Person = 'person',
  Transaction = 'transaction'
}

export type Media_EntityType_Operator = {
  all?: InputMaybe<Array<InputMaybe<Media_EntityType_Input>>>;
  equals?: InputMaybe<Media_EntityType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Media_EntityType_Input>>>;
  not_equals?: InputMaybe<Media_EntityType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Media_EntityType_Input>>>;
};

export type Media_Filename_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_Filesize_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalX_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalY_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Height_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_MimeType_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_ThumbnailUrl_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Media_Type {
  Attachment = 'attachment',
  Avatar = 'avatar',
  Other = 'other'
}

export enum Media_Type_Input {
  Attachment = 'attachment',
  Avatar = 'avatar',
  Other = 'other'
}

export enum Media_Type_MutationInput {
  Attachment = 'attachment',
  Avatar = 'avatar',
  Other = 'other'
}

export type Media_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Media_Type_Input>>>;
  equals?: InputMaybe<Media_Type_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Media_Type_Input>>>;
  not_equals?: InputMaybe<Media_Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Media_Type_Input>>>;
};

export type Media_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_Url_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Media_Where = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  entityType?: InputMaybe<Media_EntityType_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  type?: InputMaybe<Media_Type_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  user?: InputMaybe<Media_User_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  entityType?: InputMaybe<Media_EntityType_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  type?: InputMaybe<Media_Type_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  user?: InputMaybe<Media_User_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  entityType?: InputMaybe<Media_EntityType_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  type?: InputMaybe<Media_Type_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  user?: InputMaybe<Media_User_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Width_Operator = {
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
  imageToTransaction?: Maybe<AiTransactionResult>;
  loginUser?: Maybe<UsersLoginResult>;
  logoutPayloadMcpApiKey?: Maybe<Scalars['String']['output']>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  refreshTokenPayloadMcpApiKey?: Maybe<Payload_Mcp_Api_KeysRefreshedPayloadMcpApiKey>;
  refreshTokenUser?: Maybe<UsersRefreshedUser>;
  resetPasswordUser?: Maybe<UsersResetPassword>;
  textToTransaction?: Maybe<AiTransactionResult>;
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


export type MutationCreateAccountArgs = {
  data: MutationAccountInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateAiUsageArgs = {
  data: MutationAiUsageInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateCategoryArgs = {
  data: MutationCategoryInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateMediaArgs = {
  data: MutationMediaInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateOauthAccountArgs = {
  data: MutationOauthAccountInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadMcpApiKeyArgs = {
  data: MutationPayloadMcpApiKeyInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePersonArgs = {
  data: MutationPersonInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateReminderArgs = {
  data: MutationReminderInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateTagArgs = {
  data: MutationTagInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateTransactionArgs = {
  data: MutationTransactionInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateUserArgs = {
  data: MutationUserInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateUserSettingArgs = {
  data: MutationUserSettingInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAiUsageArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteMediaArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteOauthAccountArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadKvArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadLockedDocumentArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadMcpApiKeyArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadPreferenceArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePersonArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteReminderArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteUserSettingArgs = {
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDuplicateAccountArgs = {
  data: MutationAccountInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateAiUsageArgs = {
  data: MutationAiUsageInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateCategoryArgs = {
  data: MutationCategoryInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateMediaArgs = {
  data: MutationMediaInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateOauthAccountArgs = {
  data: MutationOauthAccountInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicatePersonArgs = {
  data: MutationPersonInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateReminderArgs = {
  data: MutationReminderInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateTagArgs = {
  data: MutationTagInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateTransactionArgs = {
  data: MutationTransactionInput;
  id: Scalars['String']['input'];
};


export type MutationDuplicateUserSettingArgs = {
  data: MutationUserSettingInput;
  id: Scalars['String']['input'];
};


export type MutationForgotPasswordUserArgs = {
  disableEmail?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  expiration?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationImageToTransactionArgs = {
  image: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutPayloadMcpApiKeyArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationLogoutUserArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationResetPasswordUserArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTextToTransactionArgs = {
  model?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};


export type MutationUnlockUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAccountArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationAccountUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateAiUsageArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationAiUsageUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateAppSettingArgs = {
  data: MutationAppSettingInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateCategoryArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationCategoryUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateMediaArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationMediaUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateOauthAccountArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationOauthAccountUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadKvArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadKvUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadLockedDocumentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadLockedDocumentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadMcpApiKeyArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadMcpApiKeyUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadPreferenceArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadPreferenceUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePersonArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPersonUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateReminderArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationReminderUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateTagArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationTagUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateTransactionArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationTransactionUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateUserArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationUserUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateUserSettingArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationUserSettingUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationVerifyEmailUserArgs = {
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

export type OauthAccount_Access_Token_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OauthAccount_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_IssuerName_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_Picture_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_Scope_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_Sub_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OauthAccount_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OauthAccount_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type OauthAccount_Where = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_Where_Or>>>;
  access_token?: InputMaybe<OauthAccount_Access_Token_Operator>;
  createdAt?: InputMaybe<OauthAccount_CreatedAt_Operator>;
  id?: InputMaybe<OauthAccount_Id_Operator>;
  issuerName?: InputMaybe<OauthAccount_IssuerName_Operator>;
  name?: InputMaybe<OauthAccount_Name_Operator>;
  picture?: InputMaybe<OauthAccount_Picture_Operator>;
  scope?: InputMaybe<OauthAccount_Scope_Operator>;
  sub?: InputMaybe<OauthAccount_Sub_Operator>;
  updatedAt?: InputMaybe<OauthAccount_UpdatedAt_Operator>;
  user?: InputMaybe<OauthAccount_User_Operator>;
};

export type OauthAccount_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_Where_Or>>>;
  access_token?: InputMaybe<OauthAccount_Access_Token_Operator>;
  createdAt?: InputMaybe<OauthAccount_CreatedAt_Operator>;
  id?: InputMaybe<OauthAccount_Id_Operator>;
  issuerName?: InputMaybe<OauthAccount_IssuerName_Operator>;
  name?: InputMaybe<OauthAccount_Name_Operator>;
  picture?: InputMaybe<OauthAccount_Picture_Operator>;
  scope?: InputMaybe<OauthAccount_Scope_Operator>;
  sub?: InputMaybe<OauthAccount_Sub_Operator>;
  updatedAt?: InputMaybe<OauthAccount_UpdatedAt_Operator>;
  user?: InputMaybe<OauthAccount_User_Operator>;
};

export type OauthAccount_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<OauthAccount_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<OauthAccount_Where_Or>>>;
  access_token?: InputMaybe<OauthAccount_Access_Token_Operator>;
  createdAt?: InputMaybe<OauthAccount_CreatedAt_Operator>;
  id?: InputMaybe<OauthAccount_Id_Operator>;
  issuerName?: InputMaybe<OauthAccount_IssuerName_Operator>;
  name?: InputMaybe<OauthAccount_Name_Operator>;
  picture?: InputMaybe<OauthAccount_Picture_Operator>;
  scope?: InputMaybe<OauthAccount_Scope_Operator>;
  sub?: InputMaybe<OauthAccount_Sub_Operator>;
  updatedAt?: InputMaybe<OauthAccount_UpdatedAt_Operator>;
  user?: InputMaybe<OauthAccount_User_Operator>;
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
  access_token?: Maybe<OauthAccountsDocAccessFields_Access_Token>;
  createdAt?: Maybe<OauthAccountsDocAccessFields_CreatedAt>;
  issuerName?: Maybe<OauthAccountsDocAccessFields_IssuerName>;
  name?: Maybe<OauthAccountsDocAccessFields_Name>;
  picture?: Maybe<OauthAccountsDocAccessFields_Picture>;
  scope?: Maybe<OauthAccountsDocAccessFields_Scope>;
  sub?: Maybe<OauthAccountsDocAccessFields_Sub>;
  updatedAt?: Maybe<OauthAccountsDocAccessFields_UpdatedAt>;
  user?: Maybe<OauthAccountsDocAccessFields_User>;
};

export type OauthAccountsDocAccessFields_Access_Token = {
  __typename?: 'OauthAccountsDocAccessFields_access_token';
  create?: Maybe<OauthAccountsDocAccessFields_Access_Token_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_Access_Token_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_Access_Token_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_Access_Token_Update>;
};

export type OauthAccountsDocAccessFields_Access_Token_Create = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Access_Token_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Access_Token_Read = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Access_Token_Update = {
  __typename?: 'OauthAccountsDocAccessFields_access_token_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_CreatedAt = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt';
  create?: Maybe<OauthAccountsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_CreatedAt_Update>;
};

export type OauthAccountsDocAccessFields_CreatedAt_Create = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_CreatedAt_Read = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_CreatedAt_Update = {
  __typename?: 'OauthAccountsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_IssuerName = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName';
  create?: Maybe<OauthAccountsDocAccessFields_IssuerName_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_IssuerName_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_IssuerName_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_IssuerName_Update>;
};

export type OauthAccountsDocAccessFields_IssuerName_Create = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_IssuerName_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_IssuerName_Read = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_IssuerName_Update = {
  __typename?: 'OauthAccountsDocAccessFields_issuerName_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Name = {
  __typename?: 'OauthAccountsDocAccessFields_name';
  create?: Maybe<OauthAccountsDocAccessFields_Name_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_Name_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_Name_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_Name_Update>;
};

export type OauthAccountsDocAccessFields_Name_Create = {
  __typename?: 'OauthAccountsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Name_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Name_Read = {
  __typename?: 'OauthAccountsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Name_Update = {
  __typename?: 'OauthAccountsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Picture = {
  __typename?: 'OauthAccountsDocAccessFields_picture';
  create?: Maybe<OauthAccountsDocAccessFields_Picture_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_Picture_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_Picture_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_Picture_Update>;
};

export type OauthAccountsDocAccessFields_Picture_Create = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Picture_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Picture_Read = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Picture_Update = {
  __typename?: 'OauthAccountsDocAccessFields_picture_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Scope = {
  __typename?: 'OauthAccountsDocAccessFields_scope';
  create?: Maybe<OauthAccountsDocAccessFields_Scope_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_Scope_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_Scope_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_Scope_Update>;
};

export type OauthAccountsDocAccessFields_Scope_Create = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Scope_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Scope_Read = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Scope_Update = {
  __typename?: 'OauthAccountsDocAccessFields_scope_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Sub = {
  __typename?: 'OauthAccountsDocAccessFields_sub';
  create?: Maybe<OauthAccountsDocAccessFields_Sub_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_Sub_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_Sub_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_Sub_Update>;
};

export type OauthAccountsDocAccessFields_Sub_Create = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Sub_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Sub_Read = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_Sub_Update = {
  __typename?: 'OauthAccountsDocAccessFields_sub_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_UpdatedAt = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt';
  create?: Maybe<OauthAccountsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_UpdatedAt_Update>;
};

export type OauthAccountsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'OauthAccountsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_User = {
  __typename?: 'OauthAccountsDocAccessFields_user';
  create?: Maybe<OauthAccountsDocAccessFields_User_Create>;
  delete?: Maybe<OauthAccountsDocAccessFields_User_Delete>;
  read?: Maybe<OauthAccountsDocAccessFields_User_Read>;
  update?: Maybe<OauthAccountsDocAccessFields_User_Update>;
};

export type OauthAccountsDocAccessFields_User_Create = {
  __typename?: 'OauthAccountsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_User_Delete = {
  __typename?: 'OauthAccountsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_User_Read = {
  __typename?: 'OauthAccountsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsDocAccessFields_User_Update = {
  __typename?: 'OauthAccountsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields = {
  __typename?: 'OauthAccountsFields';
  access_token?: Maybe<OauthAccountsFields_Access_Token>;
  createdAt?: Maybe<OauthAccountsFields_CreatedAt>;
  issuerName?: Maybe<OauthAccountsFields_IssuerName>;
  name?: Maybe<OauthAccountsFields_Name>;
  picture?: Maybe<OauthAccountsFields_Picture>;
  scope?: Maybe<OauthAccountsFields_Scope>;
  sub?: Maybe<OauthAccountsFields_Sub>;
  updatedAt?: Maybe<OauthAccountsFields_UpdatedAt>;
  user?: Maybe<OauthAccountsFields_User>;
};

export type OauthAccountsFields_Access_Token = {
  __typename?: 'OauthAccountsFields_access_token';
  create?: Maybe<OauthAccountsFields_Access_Token_Create>;
  delete?: Maybe<OauthAccountsFields_Access_Token_Delete>;
  read?: Maybe<OauthAccountsFields_Access_Token_Read>;
  update?: Maybe<OauthAccountsFields_Access_Token_Update>;
};

export type OauthAccountsFields_Access_Token_Create = {
  __typename?: 'OauthAccountsFields_access_token_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Access_Token_Delete = {
  __typename?: 'OauthAccountsFields_access_token_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Access_Token_Read = {
  __typename?: 'OauthAccountsFields_access_token_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Access_Token_Update = {
  __typename?: 'OauthAccountsFields_access_token_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_CreatedAt = {
  __typename?: 'OauthAccountsFields_createdAt';
  create?: Maybe<OauthAccountsFields_CreatedAt_Create>;
  delete?: Maybe<OauthAccountsFields_CreatedAt_Delete>;
  read?: Maybe<OauthAccountsFields_CreatedAt_Read>;
  update?: Maybe<OauthAccountsFields_CreatedAt_Update>;
};

export type OauthAccountsFields_CreatedAt_Create = {
  __typename?: 'OauthAccountsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_CreatedAt_Delete = {
  __typename?: 'OauthAccountsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_CreatedAt_Read = {
  __typename?: 'OauthAccountsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_CreatedAt_Update = {
  __typename?: 'OauthAccountsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_IssuerName = {
  __typename?: 'OauthAccountsFields_issuerName';
  create?: Maybe<OauthAccountsFields_IssuerName_Create>;
  delete?: Maybe<OauthAccountsFields_IssuerName_Delete>;
  read?: Maybe<OauthAccountsFields_IssuerName_Read>;
  update?: Maybe<OauthAccountsFields_IssuerName_Update>;
};

export type OauthAccountsFields_IssuerName_Create = {
  __typename?: 'OauthAccountsFields_issuerName_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_IssuerName_Delete = {
  __typename?: 'OauthAccountsFields_issuerName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_IssuerName_Read = {
  __typename?: 'OauthAccountsFields_issuerName_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_IssuerName_Update = {
  __typename?: 'OauthAccountsFields_issuerName_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Name = {
  __typename?: 'OauthAccountsFields_name';
  create?: Maybe<OauthAccountsFields_Name_Create>;
  delete?: Maybe<OauthAccountsFields_Name_Delete>;
  read?: Maybe<OauthAccountsFields_Name_Read>;
  update?: Maybe<OauthAccountsFields_Name_Update>;
};

export type OauthAccountsFields_Name_Create = {
  __typename?: 'OauthAccountsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Name_Delete = {
  __typename?: 'OauthAccountsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Name_Read = {
  __typename?: 'OauthAccountsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Name_Update = {
  __typename?: 'OauthAccountsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Picture = {
  __typename?: 'OauthAccountsFields_picture';
  create?: Maybe<OauthAccountsFields_Picture_Create>;
  delete?: Maybe<OauthAccountsFields_Picture_Delete>;
  read?: Maybe<OauthAccountsFields_Picture_Read>;
  update?: Maybe<OauthAccountsFields_Picture_Update>;
};

export type OauthAccountsFields_Picture_Create = {
  __typename?: 'OauthAccountsFields_picture_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Picture_Delete = {
  __typename?: 'OauthAccountsFields_picture_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Picture_Read = {
  __typename?: 'OauthAccountsFields_picture_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Picture_Update = {
  __typename?: 'OauthAccountsFields_picture_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Scope = {
  __typename?: 'OauthAccountsFields_scope';
  create?: Maybe<OauthAccountsFields_Scope_Create>;
  delete?: Maybe<OauthAccountsFields_Scope_Delete>;
  read?: Maybe<OauthAccountsFields_Scope_Read>;
  update?: Maybe<OauthAccountsFields_Scope_Update>;
};

export type OauthAccountsFields_Scope_Create = {
  __typename?: 'OauthAccountsFields_scope_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Scope_Delete = {
  __typename?: 'OauthAccountsFields_scope_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Scope_Read = {
  __typename?: 'OauthAccountsFields_scope_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Scope_Update = {
  __typename?: 'OauthAccountsFields_scope_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Sub = {
  __typename?: 'OauthAccountsFields_sub';
  create?: Maybe<OauthAccountsFields_Sub_Create>;
  delete?: Maybe<OauthAccountsFields_Sub_Delete>;
  read?: Maybe<OauthAccountsFields_Sub_Read>;
  update?: Maybe<OauthAccountsFields_Sub_Update>;
};

export type OauthAccountsFields_Sub_Create = {
  __typename?: 'OauthAccountsFields_sub_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Sub_Delete = {
  __typename?: 'OauthAccountsFields_sub_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Sub_Read = {
  __typename?: 'OauthAccountsFields_sub_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_Sub_Update = {
  __typename?: 'OauthAccountsFields_sub_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_UpdatedAt = {
  __typename?: 'OauthAccountsFields_updatedAt';
  create?: Maybe<OauthAccountsFields_UpdatedAt_Create>;
  delete?: Maybe<OauthAccountsFields_UpdatedAt_Delete>;
  read?: Maybe<OauthAccountsFields_UpdatedAt_Read>;
  update?: Maybe<OauthAccountsFields_UpdatedAt_Update>;
};

export type OauthAccountsFields_UpdatedAt_Create = {
  __typename?: 'OauthAccountsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_UpdatedAt_Delete = {
  __typename?: 'OauthAccountsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_UpdatedAt_Read = {
  __typename?: 'OauthAccountsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_UpdatedAt_Update = {
  __typename?: 'OauthAccountsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_User = {
  __typename?: 'OauthAccountsFields_user';
  create?: Maybe<OauthAccountsFields_User_Create>;
  delete?: Maybe<OauthAccountsFields_User_Delete>;
  read?: Maybe<OauthAccountsFields_User_Read>;
  update?: Maybe<OauthAccountsFields_User_Update>;
};

export type OauthAccountsFields_User_Create = {
  __typename?: 'OauthAccountsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_User_Delete = {
  __typename?: 'OauthAccountsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_User_Read = {
  __typename?: 'OauthAccountsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type OauthAccountsFields_User_Update = {
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
  data?: Maybe<PayloadKvDocAccessFields_Data>;
  key?: Maybe<PayloadKvDocAccessFields_Key>;
};

export type PayloadKvDocAccessFields_Data = {
  __typename?: 'PayloadKvDocAccessFields_data';
  create?: Maybe<PayloadKvDocAccessFields_Data_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Data_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Data_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Data_Update>;
};

export type PayloadKvDocAccessFields_Data_Create = {
  __typename?: 'PayloadKvDocAccessFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Delete = {
  __typename?: 'PayloadKvDocAccessFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Read = {
  __typename?: 'PayloadKvDocAccessFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Update = {
  __typename?: 'PayloadKvDocAccessFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key = {
  __typename?: 'PayloadKvDocAccessFields_key';
  create?: Maybe<PayloadKvDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Key_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Key_Update>;
};

export type PayloadKvDocAccessFields_Key_Create = {
  __typename?: 'PayloadKvDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Delete = {
  __typename?: 'PayloadKvDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Read = {
  __typename?: 'PayloadKvDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Update = {
  __typename?: 'PayloadKvDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields = {
  __typename?: 'PayloadKvFields';
  data?: Maybe<PayloadKvFields_Data>;
  key?: Maybe<PayloadKvFields_Key>;
};

export type PayloadKvFields_Data = {
  __typename?: 'PayloadKvFields_data';
  create?: Maybe<PayloadKvFields_Data_Create>;
  delete?: Maybe<PayloadKvFields_Data_Delete>;
  read?: Maybe<PayloadKvFields_Data_Read>;
  update?: Maybe<PayloadKvFields_Data_Update>;
};

export type PayloadKvFields_Data_Create = {
  __typename?: 'PayloadKvFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Delete = {
  __typename?: 'PayloadKvFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Read = {
  __typename?: 'PayloadKvFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Update = {
  __typename?: 'PayloadKvFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key = {
  __typename?: 'PayloadKvFields_key';
  create?: Maybe<PayloadKvFields_Key_Create>;
  delete?: Maybe<PayloadKvFields_Key_Delete>;
  read?: Maybe<PayloadKvFields_Key_Read>;
  update?: Maybe<PayloadKvFields_Key_Update>;
};

export type PayloadKvFields_Key_Create = {
  __typename?: 'PayloadKvFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Delete = {
  __typename?: 'PayloadKvFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Read = {
  __typename?: 'PayloadKvFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Update = {
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

export type PayloadKv_Data_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadKv_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
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
  Accounts = 'accounts',
  AiUsages = 'ai_usages',
  Categories = 'categories',
  Media = 'media',
  OauthAccounts = 'oauth_accounts',
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  People = 'people',
  Reminders = 'reminders',
  Tags = 'tags',
  Transactions = 'transactions',
  UserSettings = 'user_settings',
  Users = 'users'
}

export type PayloadLockedDocumentUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadLockedDocument_Document = Account | AiUsage | Category | Media | OauthAccount | PayloadMcpApiKey | Person | Reminder | Tag | Transaction | User | UserSetting;

export type PayloadLockedDocument_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_DocumentRelationshipInputRelationTo {
  Accounts = 'accounts',
  AiUsages = 'ai_usages',
  Categories = 'categories',
  Media = 'media',
  OauthAccounts = 'oauth_accounts',
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  People = 'people',
  Reminders = 'reminders',
  Tags = 'tags',
  Transactions = 'transactions',
  UserSettings = 'user_settings',
  Users = 'users'
}

export enum PayloadLockedDocument_Document_RelationTo {
  Accounts = 'accounts',
  AiUsages = 'ai_usages',
  Categories = 'categories',
  Media = 'media',
  OauthAccounts = 'oauth_accounts',
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  People = 'people',
  Reminders = 'reminders',
  Tags = 'tags',
  Transactions = 'transactions',
  UserSettings = 'user_settings',
  Users = 'users'
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
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export enum PayloadLockedDocument_User_RelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadLockedDocument_User_Relationship = {
  __typename?: 'PayloadLockedDocument_User_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_User_RelationTo>;
  value?: Maybe<PayloadLockedDocument_User>;
};

export type PayloadLockedDocument_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_Document_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_Document_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_Document_Relation_RelationTo {
  Accounts = 'accounts',
  AiUsages = 'ai_usages',
  Categories = 'categories',
  Media = 'media',
  OauthAccounts = 'oauth_accounts',
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  People = 'people',
  Reminders = 'reminders',
  Tags = 'tags',
  Transactions = 'transactions',
  UserSettings = 'user_settings',
  Users = 'users'
}

export type PayloadLockedDocument_GlobalSlug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_User_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_User_Relation_RelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadLockedDocument_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
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
  createdAt?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsDocAccessFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsDocAccessFields_User>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields = {
  __typename?: 'PayloadLockedDocumentsFields';
  createdAt?: Maybe<PayloadLockedDocumentsFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsFields_User>;
};

export type PayloadLockedDocumentsFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document = {
  __typename?: 'PayloadLockedDocumentsFields_document';
  create?: Maybe<PayloadLockedDocumentsFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_Document_Update>;
};

export type PayloadLockedDocumentsFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User = {
  __typename?: 'PayloadLockedDocumentsFields_user';
  create?: Maybe<PayloadLockedDocumentsFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_User_Update>;
};

export type PayloadLockedDocumentsFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Update = {
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

export type PayloadMcpApiKey_Accounts__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Accounts__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Accounts__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Accounts__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_ApiKey_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_Categories__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Categories__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Categories__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Categories__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadMcpApiKey_Description_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_EnableApiKey_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_Label_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadMcpApiKey_Media__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Resource__Currencies_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Resource__Currency_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Resource__Timezone_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Resource__Timezones_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Tool__GetDashboardSummary_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyCategories_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyPeople_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyTags_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_People__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_People__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_People__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_People__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Reminders__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Reminders__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Reminders__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Reminders__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Tags__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Tags__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Tags__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Tags__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Transactions__Create_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Transactions__Delete_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Transactions__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Transactions__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadMcpApiKey_UserSettings__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_UserSettings__Update_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type PayloadMcpApiKey_Users__Find_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadMcpApiKey_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_Or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_Accounts__Create_Operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_Accounts__Delete_Operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_Accounts__Find_Operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_Accounts__Update_Operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_ApiKey_Operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_Categories__Create_Operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_Categories__Delete_Operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_Categories__Find_Operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_Categories__Update_Operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_CreatedAt_Operator>;
  description?: InputMaybe<PayloadMcpApiKey_Description_Operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_EnableApiKey_Operator>;
  id?: InputMaybe<PayloadMcpApiKey_Id_Operator>;
  label?: InputMaybe<PayloadMcpApiKey_Label_Operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_Media__Find_Operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currencies_Operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currency_Operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezone_Operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezones_Operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetDashboardSummary_Operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyCategories_Operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyPeople_Operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyTags_Operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_People__Create_Operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_People__Delete_Operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_People__Find_Operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_People__Update_Operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_Reminders__Create_Operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_Reminders__Delete_Operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_Reminders__Find_Operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_Reminders__Update_Operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_Tags__Create_Operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_Tags__Delete_Operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_Tags__Find_Operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_Tags__Update_Operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_Transactions__Create_Operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_Transactions__Delete_Operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_Transactions__Find_Operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_Transactions__Update_Operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadMcpApiKey_User_Operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_UserSettings__Find_Operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_UserSettings__Update_Operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_Users__Find_Operator>;
};

export type PayloadMcpApiKey_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_Or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_Accounts__Create_Operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_Accounts__Delete_Operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_Accounts__Find_Operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_Accounts__Update_Operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_ApiKey_Operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_Categories__Create_Operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_Categories__Delete_Operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_Categories__Find_Operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_Categories__Update_Operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_CreatedAt_Operator>;
  description?: InputMaybe<PayloadMcpApiKey_Description_Operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_EnableApiKey_Operator>;
  id?: InputMaybe<PayloadMcpApiKey_Id_Operator>;
  label?: InputMaybe<PayloadMcpApiKey_Label_Operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_Media__Find_Operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currencies_Operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currency_Operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezone_Operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezones_Operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetDashboardSummary_Operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyCategories_Operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyPeople_Operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyTags_Operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_People__Create_Operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_People__Delete_Operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_People__Find_Operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_People__Update_Operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_Reminders__Create_Operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_Reminders__Delete_Operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_Reminders__Find_Operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_Reminders__Update_Operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_Tags__Create_Operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_Tags__Delete_Operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_Tags__Find_Operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_Tags__Update_Operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_Transactions__Create_Operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_Transactions__Delete_Operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_Transactions__Find_Operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_Transactions__Update_Operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadMcpApiKey_User_Operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_UserSettings__Find_Operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_UserSettings__Update_Operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_Users__Find_Operator>;
};

export type PayloadMcpApiKey_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadMcpApiKey_Where_Or>>>;
  accounts__create?: InputMaybe<PayloadMcpApiKey_Accounts__Create_Operator>;
  accounts__delete?: InputMaybe<PayloadMcpApiKey_Accounts__Delete_Operator>;
  accounts__find?: InputMaybe<PayloadMcpApiKey_Accounts__Find_Operator>;
  accounts__update?: InputMaybe<PayloadMcpApiKey_Accounts__Update_Operator>;
  apiKey?: InputMaybe<PayloadMcpApiKey_ApiKey_Operator>;
  categories__create?: InputMaybe<PayloadMcpApiKey_Categories__Create_Operator>;
  categories__delete?: InputMaybe<PayloadMcpApiKey_Categories__Delete_Operator>;
  categories__find?: InputMaybe<PayloadMcpApiKey_Categories__Find_Operator>;
  categories__update?: InputMaybe<PayloadMcpApiKey_Categories__Update_Operator>;
  createdAt?: InputMaybe<PayloadMcpApiKey_CreatedAt_Operator>;
  description?: InputMaybe<PayloadMcpApiKey_Description_Operator>;
  enableAPIKey?: InputMaybe<PayloadMcpApiKey_EnableApiKey_Operator>;
  id?: InputMaybe<PayloadMcpApiKey_Id_Operator>;
  label?: InputMaybe<PayloadMcpApiKey_Label_Operator>;
  media__find?: InputMaybe<PayloadMcpApiKey_Media__Find_Operator>;
  payload_mcp_resource__currencies?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currencies_Operator>;
  payload_mcp_resource__currency?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Currency_Operator>;
  payload_mcp_resource__timezone?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezone_Operator>;
  payload_mcp_resource__timezones?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Resource__Timezones_Operator>;
  payload_mcp_tool__getDashboardSummary?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetDashboardSummary_Operator>;
  payload_mcp_tool__getMonthlyCategories?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyCategories_Operator>;
  payload_mcp_tool__getMonthlyPeople?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyPeople_Operator>;
  payload_mcp_tool__getMonthlyTags?: InputMaybe<PayloadMcpApiKey_Payload_Mcp_Tool__GetMonthlyTags_Operator>;
  people__create?: InputMaybe<PayloadMcpApiKey_People__Create_Operator>;
  people__delete?: InputMaybe<PayloadMcpApiKey_People__Delete_Operator>;
  people__find?: InputMaybe<PayloadMcpApiKey_People__Find_Operator>;
  people__update?: InputMaybe<PayloadMcpApiKey_People__Update_Operator>;
  reminders__create?: InputMaybe<PayloadMcpApiKey_Reminders__Create_Operator>;
  reminders__delete?: InputMaybe<PayloadMcpApiKey_Reminders__Delete_Operator>;
  reminders__find?: InputMaybe<PayloadMcpApiKey_Reminders__Find_Operator>;
  reminders__update?: InputMaybe<PayloadMcpApiKey_Reminders__Update_Operator>;
  tags__create?: InputMaybe<PayloadMcpApiKey_Tags__Create_Operator>;
  tags__delete?: InputMaybe<PayloadMcpApiKey_Tags__Delete_Operator>;
  tags__find?: InputMaybe<PayloadMcpApiKey_Tags__Find_Operator>;
  tags__update?: InputMaybe<PayloadMcpApiKey_Tags__Update_Operator>;
  transactions__create?: InputMaybe<PayloadMcpApiKey_Transactions__Create_Operator>;
  transactions__delete?: InputMaybe<PayloadMcpApiKey_Transactions__Delete_Operator>;
  transactions__find?: InputMaybe<PayloadMcpApiKey_Transactions__Find_Operator>;
  transactions__update?: InputMaybe<PayloadMcpApiKey_Transactions__Update_Operator>;
  updatedAt?: InputMaybe<PayloadMcpApiKey_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadMcpApiKey_User_Operator>;
  userSettings__find?: InputMaybe<PayloadMcpApiKey_UserSettings__Find_Operator>;
  userSettings__update?: InputMaybe<PayloadMcpApiKey_UserSettings__Update_Operator>;
  users__find?: InputMaybe<PayloadMcpApiKey_Users__Find_Operator>;
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
  accounts?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts>;
  apiKey?: Maybe<PayloadMcpApiKeysDocAccessFields_ApiKey>;
  categories?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories>;
  createdAt?: Maybe<PayloadMcpApiKeysDocAccessFields_CreatedAt>;
  description?: Maybe<PayloadMcpApiKeysDocAccessFields_Description>;
  enableAPIKey?: Maybe<PayloadMcpApiKeysDocAccessFields_EnableApiKey>;
  label?: Maybe<PayloadMcpApiKeysDocAccessFields_Label>;
  media?: Maybe<PayloadMcpApiKeysDocAccessFields_Media>;
  payload_mcp_resource?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource>;
  payload_mcp_tool?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool>;
  people?: Maybe<PayloadMcpApiKeysDocAccessFields_People>;
  reminders?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders>;
  tags?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags>;
  transactions?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions>;
  updatedAt?: Maybe<PayloadMcpApiKeysDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadMcpApiKeysDocAccessFields_User>;
  userSettings?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings>;
  users?: Maybe<PayloadMcpApiKeysDocAccessFields_Users>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Accounts_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Accounts_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_accounts_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_ApiKey = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_ApiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_ApiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_ApiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_ApiKey_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_ApiKey_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_ApiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_ApiKey_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_ApiKey_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Categories_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Categories_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_categories_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_CreatedAt = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_CreatedAt_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Description = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Description_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Description_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Description_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Description_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Description_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Description_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Description_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Description_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_EnableApiKey = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_EnableApiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_EnableApiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_EnableApiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_EnableApiKey_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_EnableApiKey_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_EnableApiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_EnableApiKey_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_EnableApiKey_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_enableAPIKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Label = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Label_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Label_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Label_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Label_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Label_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Label_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Label_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Label_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Media_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Find>;
};

export type PayloadMcpApiKeysDocAccessFields_Media_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Media_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Media_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Media_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_media_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Fields';
  currencies?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies>;
  currency?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency>;
  timezone?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone>;
  timezones?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currencies_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currencies_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Currency_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezone_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Resource_Timezones_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_resource_timezones_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Fields';
  getDashboardSummary?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary>;
  getMonthlyCategories?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories>;
  getMonthlyPeople?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople>;
  getMonthlyTags?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetDashboardSummary_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getDashboardSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyCategories_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyCategories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyPeople_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyPeople_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Payload_Mcp_Tool_GetMonthlyTags_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_payload_mcp_tool_getMonthlyTags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_People_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_People_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_People_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_people_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Reminders_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Reminders_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_reminders_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Tags_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Tags_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_tags_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Fields';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete>;
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Create_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Create_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Transactions_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Transactions_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_transactions_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_UpdatedAt_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_User = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_User_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_User_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_User_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_User_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Find>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_UserSettings_Update_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_userSettings_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_User_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_User_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_User_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_User_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Delete>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Fields>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Users_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Fields = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Fields';
  find?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Find>;
};

export type PayloadMcpApiKeysDocAccessFields_Users_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Find = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find';
  create?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysDocAccessFields_Users_Find_Update>;
};

export type PayloadMcpApiKeysDocAccessFields_Users_Find_Create = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Find_Read = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysDocAccessFields_Users_Find_Update = {
  __typename?: 'PayloadMcpApiKeysDocAccessFields_users_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields = {
  __typename?: 'PayloadMcpApiKeysFields';
  accounts?: Maybe<PayloadMcpApiKeysFields_Accounts>;
  apiKey?: Maybe<PayloadMcpApiKeysFields_ApiKey>;
  categories?: Maybe<PayloadMcpApiKeysFields_Categories>;
  createdAt?: Maybe<PayloadMcpApiKeysFields_CreatedAt>;
  description?: Maybe<PayloadMcpApiKeysFields_Description>;
  enableAPIKey?: Maybe<PayloadMcpApiKeysFields_EnableApiKey>;
  label?: Maybe<PayloadMcpApiKeysFields_Label>;
  media?: Maybe<PayloadMcpApiKeysFields_Media>;
  payload_mcp_resource?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource>;
  payload_mcp_tool?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool>;
  people?: Maybe<PayloadMcpApiKeysFields_People>;
  reminders?: Maybe<PayloadMcpApiKeysFields_Reminders>;
  tags?: Maybe<PayloadMcpApiKeysFields_Tags>;
  transactions?: Maybe<PayloadMcpApiKeysFields_Transactions>;
  updatedAt?: Maybe<PayloadMcpApiKeysFields_UpdatedAt>;
  user?: Maybe<PayloadMcpApiKeysFields_User>;
  userSettings?: Maybe<PayloadMcpApiKeysFields_UserSettings>;
  users?: Maybe<PayloadMcpApiKeysFields_Users>;
};

export type PayloadMcpApiKeysFields_Accounts = {
  __typename?: 'PayloadMcpApiKeysFields_accounts';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Accounts_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Accounts_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_Accounts_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Accounts_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Create_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Delete_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Find = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Accounts_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Find_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update';
  create?: Maybe<PayloadMcpApiKeysFields_Accounts_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Accounts_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Accounts_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Accounts_Update_Update>;
};

export type PayloadMcpApiKeysFields_Accounts_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Accounts_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_accounts_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_ApiKey = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey';
  create?: Maybe<PayloadMcpApiKeysFields_ApiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_ApiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_ApiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_ApiKey_Update>;
};

export type PayloadMcpApiKeysFields_ApiKey_Create = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_ApiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_ApiKey_Read = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_ApiKey_Update = {
  __typename?: 'PayloadMcpApiKeysFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories = {
  __typename?: 'PayloadMcpApiKeysFields_categories';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Categories_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Categories_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_Categories_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Categories_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Create_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Categories_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Delete_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Find = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Categories_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Find_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update';
  create?: Maybe<PayloadMcpApiKeysFields_Categories_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Categories_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Categories_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Categories_Update_Update>;
};

export type PayloadMcpApiKeysFields_Categories_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Categories_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_categories_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_CreatedAt = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt';
  create?: Maybe<PayloadMcpApiKeysFields_CreatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_CreatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_CreatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_CreatedAt_Update>;
};

export type PayloadMcpApiKeysFields_CreatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_CreatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_CreatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_CreatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Description = {
  __typename?: 'PayloadMcpApiKeysFields_description';
  create?: Maybe<PayloadMcpApiKeysFields_Description_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Description_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Description_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Description_Update>;
};

export type PayloadMcpApiKeysFields_Description_Create = {
  __typename?: 'PayloadMcpApiKeysFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Description_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Description_Read = {
  __typename?: 'PayloadMcpApiKeysFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Description_Update = {
  __typename?: 'PayloadMcpApiKeysFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_EnableApiKey = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey';
  create?: Maybe<PayloadMcpApiKeysFields_EnableApiKey_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_EnableApiKey_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_EnableApiKey_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_EnableApiKey_Update>;
};

export type PayloadMcpApiKeysFields_EnableApiKey_Create = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_EnableApiKey_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_EnableApiKey_Read = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_EnableApiKey_Update = {
  __typename?: 'PayloadMcpApiKeysFields_enableAPIKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Label = {
  __typename?: 'PayloadMcpApiKeysFields_label';
  create?: Maybe<PayloadMcpApiKeysFields_Label_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Label_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Label_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Label_Update>;
};

export type PayloadMcpApiKeysFields_Label_Create = {
  __typename?: 'PayloadMcpApiKeysFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Label_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Label_Read = {
  __typename?: 'PayloadMcpApiKeysFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Label_Update = {
  __typename?: 'PayloadMcpApiKeysFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media = {
  __typename?: 'PayloadMcpApiKeysFields_media';
  create?: Maybe<PayloadMcpApiKeysFields_Media_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Media_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Media_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Media_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Media_Update>;
};

export type PayloadMcpApiKeysFields_Media_Create = {
  __typename?: 'PayloadMcpApiKeysFields_media_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_media_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_media_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_Media_Find>;
};

export type PayloadMcpApiKeysFields_Media_Read = {
  __typename?: 'PayloadMcpApiKeysFields_media_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Update = {
  __typename?: 'PayloadMcpApiKeysFields_media_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Find = {
  __typename?: 'PayloadMcpApiKeysFields_media_find';
  create?: Maybe<PayloadMcpApiKeysFields_Media_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Media_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Media_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Media_Find_Update>;
};

export type PayloadMcpApiKeysFields_Media_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Media_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_media_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Fields';
  currencies?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies>;
  currency?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency>;
  timezone?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone>;
  timezones?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currencies_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currencies_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Currency_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezone_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Resource_Timezones_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_resource_timezones_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Fields';
  getDashboardSummary?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary>;
  getMonthlyCategories?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories>;
  getMonthlyPeople?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople>;
  getMonthlyTags?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetDashboardSummary_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getDashboardSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyCategories_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyCategories_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyPeople_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyPeople_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags';
  create?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Update>;
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Create = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Read = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Payload_Mcp_Tool_GetMonthlyTags_Update = {
  __typename?: 'PayloadMcpApiKeysFields_payload_mcp_tool_getMonthlyTags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People = {
  __typename?: 'PayloadMcpApiKeysFields_people';
  create?: Maybe<PayloadMcpApiKeysFields_People_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_People_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_People_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Update>;
};

export type PayloadMcpApiKeysFields_People_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_people_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_People_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_People_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Update>;
};

export type PayloadMcpApiKeysFields_People_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_create';
  create?: Maybe<PayloadMcpApiKeysFields_People_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_People_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Create_Update>;
};

export type PayloadMcpApiKeysFields_People_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete';
  create?: Maybe<PayloadMcpApiKeysFields_People_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_People_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Delete_Update>;
};

export type PayloadMcpApiKeysFields_People_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Find = {
  __typename?: 'PayloadMcpApiKeysFields_people_find';
  create?: Maybe<PayloadMcpApiKeysFields_People_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_People_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Find_Update>;
};

export type PayloadMcpApiKeysFields_People_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_update';
  create?: Maybe<PayloadMcpApiKeysFields_People_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_People_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_People_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_People_Update_Update>;
};

export type PayloadMcpApiKeysFields_People_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_People_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_people_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders = {
  __typename?: 'PayloadMcpApiKeysFields_reminders';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Reminders_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Reminders_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_Reminders_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Reminders_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Create_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Delete_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Find = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Reminders_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Find_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update';
  create?: Maybe<PayloadMcpApiKeysFields_Reminders_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Reminders_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Reminders_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Reminders_Update_Update>;
};

export type PayloadMcpApiKeysFields_Reminders_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Reminders_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_reminders_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags = {
  __typename?: 'PayloadMcpApiKeysFields_tags';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Tags_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Tags_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_Tags_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Tags_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Create_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Tags_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Delete_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Find = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Tags_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Find_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update';
  create?: Maybe<PayloadMcpApiKeysFields_Tags_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Tags_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Tags_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Tags_Update_Update>;
};

export type PayloadMcpApiKeysFields_Tags_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Tags_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_tags_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions = {
  __typename?: 'PayloadMcpApiKeysFields_transactions';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Transactions_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Transactions_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Fields';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete>;
  find?: Maybe<PayloadMcpApiKeysFields_Transactions_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Create_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Create_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Transactions_Create_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Create_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Create_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Create_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Create_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Create_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_create_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Delete_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Delete_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Delete_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Delete_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Delete_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_delete_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Find = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Transactions_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Find_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update';
  create?: Maybe<PayloadMcpApiKeysFields_Transactions_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Transactions_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Transactions_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Transactions_Update_Update>;
};

export type PayloadMcpApiKeysFields_Transactions_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Transactions_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_transactions_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UpdatedAt = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt';
  create?: Maybe<PayloadMcpApiKeysFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_UpdatedAt_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_UpdatedAt_Update>;
};

export type PayloadMcpApiKeysFields_UpdatedAt_Create = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UpdatedAt_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UpdatedAt_Read = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UpdatedAt_Update = {
  __typename?: 'PayloadMcpApiKeysFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_User = {
  __typename?: 'PayloadMcpApiKeysFields_user';
  create?: Maybe<PayloadMcpApiKeysFields_User_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_User_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_User_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_User_Update>;
};

export type PayloadMcpApiKeysFields_UserSettings = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings';
  create?: Maybe<PayloadMcpApiKeysFields_UserSettings_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_UserSettings_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_UserSettings_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_UserSettings_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update>;
};

export type PayloadMcpApiKeysFields_UserSettings_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_UserSettings_Find>;
  update?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update>;
};

export type PayloadMcpApiKeysFields_UserSettings_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Find = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find';
  create?: Maybe<PayloadMcpApiKeysFields_UserSettings_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_UserSettings_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_UserSettings_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_UserSettings_Find_Update>;
};

export type PayloadMcpApiKeysFields_UserSettings_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Find_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_find_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update';
  create?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_UserSettings_Update_Update>;
};

export type PayloadMcpApiKeysFields_UserSettings_Update_Create = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Update_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Update_Read = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_UserSettings_Update_Update = {
  __typename?: 'PayloadMcpApiKeysFields_userSettings_update_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_User_Create = {
  __typename?: 'PayloadMcpApiKeysFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_User_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_User_Read = {
  __typename?: 'PayloadMcpApiKeysFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_User_Update = {
  __typename?: 'PayloadMcpApiKeysFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users = {
  __typename?: 'PayloadMcpApiKeysFields_users';
  create?: Maybe<PayloadMcpApiKeysFields_Users_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Users_Delete>;
  fields?: Maybe<PayloadMcpApiKeysFields_Users_Fields>;
  read?: Maybe<PayloadMcpApiKeysFields_Users_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Users_Update>;
};

export type PayloadMcpApiKeysFields_Users_Create = {
  __typename?: 'PayloadMcpApiKeysFields_users_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_users_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Fields = {
  __typename?: 'PayloadMcpApiKeysFields_users_Fields';
  find?: Maybe<PayloadMcpApiKeysFields_Users_Find>;
};

export type PayloadMcpApiKeysFields_Users_Read = {
  __typename?: 'PayloadMcpApiKeysFields_users_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Update = {
  __typename?: 'PayloadMcpApiKeysFields_users_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Find = {
  __typename?: 'PayloadMcpApiKeysFields_users_find';
  create?: Maybe<PayloadMcpApiKeysFields_Users_Find_Create>;
  delete?: Maybe<PayloadMcpApiKeysFields_Users_Find_Delete>;
  read?: Maybe<PayloadMcpApiKeysFields_Users_Find_Read>;
  update?: Maybe<PayloadMcpApiKeysFields_Users_Find_Update>;
};

export type PayloadMcpApiKeysFields_Users_Find_Create = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Find_Delete = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Find_Read = {
  __typename?: 'PayloadMcpApiKeysFields_users_find_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadMcpApiKeysFields_Users_Find_Update = {
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
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadPreference_User = PayloadMcpApiKey | User;

export type PayloadPreference_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreference_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_UserRelationshipInputRelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export enum PayloadPreference_User_RelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadPreference_User_Relationship = {
  __typename?: 'PayloadPreference_User_Relationship';
  relationTo?: Maybe<PayloadPreference_User_RelationTo>;
  value?: Maybe<PayloadPreference_User>;
};

export type PayloadPreference_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_User_Relation = {
  relationTo?: InputMaybe<PayloadPreference_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_User_Relation_RelationTo {
  PayloadMcpApiKeys = 'payload_mcp_api_keys',
  Users = 'users'
}

export type PayloadPreference_Value_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadPreference_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
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
  createdAt?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesDocAccessFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesDocAccessFields_User>;
  value?: Maybe<PayloadPreferencesDocAccessFields_Value>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key = {
  __typename?: 'PayloadPreferencesDocAccessFields_key';
  create?: Maybe<PayloadPreferencesDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Key_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Key_Update>;
};

export type PayloadPreferencesDocAccessFields_Key_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User = {
  __typename?: 'PayloadPreferencesDocAccessFields_user';
  create?: Maybe<PayloadPreferencesDocAccessFields_User_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_User_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_User_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_User_Update>;
};

export type PayloadPreferencesDocAccessFields_User_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value = {
  __typename?: 'PayloadPreferencesDocAccessFields_value';
  create?: Maybe<PayloadPreferencesDocAccessFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Value_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Value_Update>;
};

export type PayloadPreferencesDocAccessFields_Value_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields = {
  __typename?: 'PayloadPreferencesFields';
  createdAt?: Maybe<PayloadPreferencesFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesFields_User>;
  value?: Maybe<PayloadPreferencesFields_Value>;
};

export type PayloadPreferencesFields_CreatedAt = {
  __typename?: 'PayloadPreferencesFields_createdAt';
  create?: Maybe<PayloadPreferencesFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_CreatedAt_Update>;
};

export type PayloadPreferencesFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key = {
  __typename?: 'PayloadPreferencesFields_key';
  create?: Maybe<PayloadPreferencesFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesFields_Key_Read>;
  update?: Maybe<PayloadPreferencesFields_Key_Update>;
};

export type PayloadPreferencesFields_Key_Create = {
  __typename?: 'PayloadPreferencesFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Delete = {
  __typename?: 'PayloadPreferencesFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Read = {
  __typename?: 'PayloadPreferencesFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Update = {
  __typename?: 'PayloadPreferencesFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesFields_updatedAt';
  create?: Maybe<PayloadPreferencesFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_UpdatedAt_Update>;
};

export type PayloadPreferencesFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User = {
  __typename?: 'PayloadPreferencesFields_user';
  create?: Maybe<PayloadPreferencesFields_User_Create>;
  delete?: Maybe<PayloadPreferencesFields_User_Delete>;
  read?: Maybe<PayloadPreferencesFields_User_Read>;
  update?: Maybe<PayloadPreferencesFields_User_Update>;
};

export type PayloadPreferencesFields_User_Create = {
  __typename?: 'PayloadPreferencesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Delete = {
  __typename?: 'PayloadPreferencesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Read = {
  __typename?: 'PayloadPreferencesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Update = {
  __typename?: 'PayloadPreferencesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value = {
  __typename?: 'PayloadPreferencesFields_value';
  create?: Maybe<PayloadPreferencesFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesFields_Value_Read>;
  update?: Maybe<PayloadPreferencesFields_Value_Update>;
};

export type PayloadPreferencesFields_Value_Create = {
  __typename?: 'PayloadPreferencesFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Delete = {
  __typename?: 'PayloadPreferencesFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Read = {
  __typename?: 'PayloadPreferencesFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Update = {
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
  avatar?: Maybe<PeopleDocAccessFields_Avatar>;
  balance?: Maybe<PeopleDocAccessFields_Balance>;
  createdAt?: Maybe<PeopleDocAccessFields_CreatedAt>;
  description?: Maybe<PeopleDocAccessFields_Description>;
  email?: Maybe<PeopleDocAccessFields_Email>;
  isActive?: Maybe<PeopleDocAccessFields_IsActive>;
  lastTransactionAt?: Maybe<PeopleDocAccessFields_LastTransactionAt>;
  name?: Maybe<PeopleDocAccessFields_Name>;
  phone?: Maybe<PeopleDocAccessFields_Phone>;
  totalSummary?: Maybe<PeopleDocAccessFields_TotalSummary>;
  totalTransactions?: Maybe<PeopleDocAccessFields_TotalTransactions>;
  updatedAt?: Maybe<PeopleDocAccessFields_UpdatedAt>;
  user?: Maybe<PeopleDocAccessFields_User>;
};

export type PeopleDocAccessFields_Avatar = {
  __typename?: 'PeopleDocAccessFields_avatar';
  create?: Maybe<PeopleDocAccessFields_Avatar_Create>;
  delete?: Maybe<PeopleDocAccessFields_Avatar_Delete>;
  read?: Maybe<PeopleDocAccessFields_Avatar_Read>;
  update?: Maybe<PeopleDocAccessFields_Avatar_Update>;
};

export type PeopleDocAccessFields_Avatar_Create = {
  __typename?: 'PeopleDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Avatar_Delete = {
  __typename?: 'PeopleDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Avatar_Read = {
  __typename?: 'PeopleDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Avatar_Update = {
  __typename?: 'PeopleDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Balance = {
  __typename?: 'PeopleDocAccessFields_balance';
  create?: Maybe<PeopleDocAccessFields_Balance_Create>;
  delete?: Maybe<PeopleDocAccessFields_Balance_Delete>;
  read?: Maybe<PeopleDocAccessFields_Balance_Read>;
  update?: Maybe<PeopleDocAccessFields_Balance_Update>;
};

export type PeopleDocAccessFields_Balance_Create = {
  __typename?: 'PeopleDocAccessFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Balance_Delete = {
  __typename?: 'PeopleDocAccessFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Balance_Read = {
  __typename?: 'PeopleDocAccessFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Balance_Update = {
  __typename?: 'PeopleDocAccessFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_CreatedAt = {
  __typename?: 'PeopleDocAccessFields_createdAt';
  create?: Maybe<PeopleDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PeopleDocAccessFields_CreatedAt_Update>;
};

export type PeopleDocAccessFields_CreatedAt_Create = {
  __typename?: 'PeopleDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PeopleDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_CreatedAt_Read = {
  __typename?: 'PeopleDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_CreatedAt_Update = {
  __typename?: 'PeopleDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Description = {
  __typename?: 'PeopleDocAccessFields_description';
  create?: Maybe<PeopleDocAccessFields_Description_Create>;
  delete?: Maybe<PeopleDocAccessFields_Description_Delete>;
  read?: Maybe<PeopleDocAccessFields_Description_Read>;
  update?: Maybe<PeopleDocAccessFields_Description_Update>;
};

export type PeopleDocAccessFields_Description_Create = {
  __typename?: 'PeopleDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Description_Delete = {
  __typename?: 'PeopleDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Description_Read = {
  __typename?: 'PeopleDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Description_Update = {
  __typename?: 'PeopleDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Email = {
  __typename?: 'PeopleDocAccessFields_email';
  create?: Maybe<PeopleDocAccessFields_Email_Create>;
  delete?: Maybe<PeopleDocAccessFields_Email_Delete>;
  read?: Maybe<PeopleDocAccessFields_Email_Read>;
  update?: Maybe<PeopleDocAccessFields_Email_Update>;
};

export type PeopleDocAccessFields_Email_Create = {
  __typename?: 'PeopleDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Email_Delete = {
  __typename?: 'PeopleDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Email_Read = {
  __typename?: 'PeopleDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Email_Update = {
  __typename?: 'PeopleDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_IsActive = {
  __typename?: 'PeopleDocAccessFields_isActive';
  create?: Maybe<PeopleDocAccessFields_IsActive_Create>;
  delete?: Maybe<PeopleDocAccessFields_IsActive_Delete>;
  read?: Maybe<PeopleDocAccessFields_IsActive_Read>;
  update?: Maybe<PeopleDocAccessFields_IsActive_Update>;
};

export type PeopleDocAccessFields_IsActive_Create = {
  __typename?: 'PeopleDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_IsActive_Delete = {
  __typename?: 'PeopleDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_IsActive_Read = {
  __typename?: 'PeopleDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_IsActive_Update = {
  __typename?: 'PeopleDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_LastTransactionAt = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt';
  create?: Maybe<PeopleDocAccessFields_LastTransactionAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_LastTransactionAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_LastTransactionAt_Read>;
  update?: Maybe<PeopleDocAccessFields_LastTransactionAt_Update>;
};

export type PeopleDocAccessFields_LastTransactionAt_Create = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_LastTransactionAt_Delete = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_LastTransactionAt_Read = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_LastTransactionAt_Update = {
  __typename?: 'PeopleDocAccessFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Name = {
  __typename?: 'PeopleDocAccessFields_name';
  create?: Maybe<PeopleDocAccessFields_Name_Create>;
  delete?: Maybe<PeopleDocAccessFields_Name_Delete>;
  read?: Maybe<PeopleDocAccessFields_Name_Read>;
  update?: Maybe<PeopleDocAccessFields_Name_Update>;
};

export type PeopleDocAccessFields_Name_Create = {
  __typename?: 'PeopleDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Name_Delete = {
  __typename?: 'PeopleDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Name_Read = {
  __typename?: 'PeopleDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Name_Update = {
  __typename?: 'PeopleDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Phone = {
  __typename?: 'PeopleDocAccessFields_phone';
  create?: Maybe<PeopleDocAccessFields_Phone_Create>;
  delete?: Maybe<PeopleDocAccessFields_Phone_Delete>;
  read?: Maybe<PeopleDocAccessFields_Phone_Read>;
  update?: Maybe<PeopleDocAccessFields_Phone_Update>;
};

export type PeopleDocAccessFields_Phone_Create = {
  __typename?: 'PeopleDocAccessFields_phone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Phone_Delete = {
  __typename?: 'PeopleDocAccessFields_phone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Phone_Read = {
  __typename?: 'PeopleDocAccessFields_phone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_Phone_Update = {
  __typename?: 'PeopleDocAccessFields_phone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalSummary = {
  __typename?: 'PeopleDocAccessFields_totalSummary';
  create?: Maybe<PeopleDocAccessFields_TotalSummary_Create>;
  delete?: Maybe<PeopleDocAccessFields_TotalSummary_Delete>;
  read?: Maybe<PeopleDocAccessFields_TotalSummary_Read>;
  update?: Maybe<PeopleDocAccessFields_TotalSummary_Update>;
};

export type PeopleDocAccessFields_TotalSummary_Create = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalSummary_Delete = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalSummary_Read = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalSummary_Update = {
  __typename?: 'PeopleDocAccessFields_totalSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalTransactions = {
  __typename?: 'PeopleDocAccessFields_totalTransactions';
  create?: Maybe<PeopleDocAccessFields_TotalTransactions_Create>;
  delete?: Maybe<PeopleDocAccessFields_TotalTransactions_Delete>;
  read?: Maybe<PeopleDocAccessFields_TotalTransactions_Read>;
  update?: Maybe<PeopleDocAccessFields_TotalTransactions_Update>;
};

export type PeopleDocAccessFields_TotalTransactions_Create = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalTransactions_Delete = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalTransactions_Read = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_TotalTransactions_Update = {
  __typename?: 'PeopleDocAccessFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_UpdatedAt = {
  __typename?: 'PeopleDocAccessFields_updatedAt';
  create?: Maybe<PeopleDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PeopleDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PeopleDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PeopleDocAccessFields_UpdatedAt_Update>;
};

export type PeopleDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PeopleDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_User = {
  __typename?: 'PeopleDocAccessFields_user';
  create?: Maybe<PeopleDocAccessFields_User_Create>;
  delete?: Maybe<PeopleDocAccessFields_User_Delete>;
  read?: Maybe<PeopleDocAccessFields_User_Read>;
  update?: Maybe<PeopleDocAccessFields_User_Update>;
};

export type PeopleDocAccessFields_User_Create = {
  __typename?: 'PeopleDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_User_Delete = {
  __typename?: 'PeopleDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_User_Read = {
  __typename?: 'PeopleDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleDocAccessFields_User_Update = {
  __typename?: 'PeopleDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields = {
  __typename?: 'PeopleFields';
  avatar?: Maybe<PeopleFields_Avatar>;
  balance?: Maybe<PeopleFields_Balance>;
  createdAt?: Maybe<PeopleFields_CreatedAt>;
  description?: Maybe<PeopleFields_Description>;
  email?: Maybe<PeopleFields_Email>;
  isActive?: Maybe<PeopleFields_IsActive>;
  lastTransactionAt?: Maybe<PeopleFields_LastTransactionAt>;
  name?: Maybe<PeopleFields_Name>;
  phone?: Maybe<PeopleFields_Phone>;
  totalSummary?: Maybe<PeopleFields_TotalSummary>;
  totalTransactions?: Maybe<PeopleFields_TotalTransactions>;
  updatedAt?: Maybe<PeopleFields_UpdatedAt>;
  user?: Maybe<PeopleFields_User>;
};

export type PeopleFields_Avatar = {
  __typename?: 'PeopleFields_avatar';
  create?: Maybe<PeopleFields_Avatar_Create>;
  delete?: Maybe<PeopleFields_Avatar_Delete>;
  read?: Maybe<PeopleFields_Avatar_Read>;
  update?: Maybe<PeopleFields_Avatar_Update>;
};

export type PeopleFields_Avatar_Create = {
  __typename?: 'PeopleFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Avatar_Delete = {
  __typename?: 'PeopleFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Avatar_Read = {
  __typename?: 'PeopleFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Avatar_Update = {
  __typename?: 'PeopleFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Balance = {
  __typename?: 'PeopleFields_balance';
  create?: Maybe<PeopleFields_Balance_Create>;
  delete?: Maybe<PeopleFields_Balance_Delete>;
  read?: Maybe<PeopleFields_Balance_Read>;
  update?: Maybe<PeopleFields_Balance_Update>;
};

export type PeopleFields_Balance_Create = {
  __typename?: 'PeopleFields_balance_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Balance_Delete = {
  __typename?: 'PeopleFields_balance_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Balance_Read = {
  __typename?: 'PeopleFields_balance_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Balance_Update = {
  __typename?: 'PeopleFields_balance_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_CreatedAt = {
  __typename?: 'PeopleFields_createdAt';
  create?: Maybe<PeopleFields_CreatedAt_Create>;
  delete?: Maybe<PeopleFields_CreatedAt_Delete>;
  read?: Maybe<PeopleFields_CreatedAt_Read>;
  update?: Maybe<PeopleFields_CreatedAt_Update>;
};

export type PeopleFields_CreatedAt_Create = {
  __typename?: 'PeopleFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_CreatedAt_Delete = {
  __typename?: 'PeopleFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_CreatedAt_Read = {
  __typename?: 'PeopleFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_CreatedAt_Update = {
  __typename?: 'PeopleFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Description = {
  __typename?: 'PeopleFields_description';
  create?: Maybe<PeopleFields_Description_Create>;
  delete?: Maybe<PeopleFields_Description_Delete>;
  read?: Maybe<PeopleFields_Description_Read>;
  update?: Maybe<PeopleFields_Description_Update>;
};

export type PeopleFields_Description_Create = {
  __typename?: 'PeopleFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Description_Delete = {
  __typename?: 'PeopleFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Description_Read = {
  __typename?: 'PeopleFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Description_Update = {
  __typename?: 'PeopleFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Email = {
  __typename?: 'PeopleFields_email';
  create?: Maybe<PeopleFields_Email_Create>;
  delete?: Maybe<PeopleFields_Email_Delete>;
  read?: Maybe<PeopleFields_Email_Read>;
  update?: Maybe<PeopleFields_Email_Update>;
};

export type PeopleFields_Email_Create = {
  __typename?: 'PeopleFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Email_Delete = {
  __typename?: 'PeopleFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Email_Read = {
  __typename?: 'PeopleFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Email_Update = {
  __typename?: 'PeopleFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_IsActive = {
  __typename?: 'PeopleFields_isActive';
  create?: Maybe<PeopleFields_IsActive_Create>;
  delete?: Maybe<PeopleFields_IsActive_Delete>;
  read?: Maybe<PeopleFields_IsActive_Read>;
  update?: Maybe<PeopleFields_IsActive_Update>;
};

export type PeopleFields_IsActive_Create = {
  __typename?: 'PeopleFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_IsActive_Delete = {
  __typename?: 'PeopleFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_IsActive_Read = {
  __typename?: 'PeopleFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_IsActive_Update = {
  __typename?: 'PeopleFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_LastTransactionAt = {
  __typename?: 'PeopleFields_lastTransactionAt';
  create?: Maybe<PeopleFields_LastTransactionAt_Create>;
  delete?: Maybe<PeopleFields_LastTransactionAt_Delete>;
  read?: Maybe<PeopleFields_LastTransactionAt_Read>;
  update?: Maybe<PeopleFields_LastTransactionAt_Update>;
};

export type PeopleFields_LastTransactionAt_Create = {
  __typename?: 'PeopleFields_lastTransactionAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_LastTransactionAt_Delete = {
  __typename?: 'PeopleFields_lastTransactionAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_LastTransactionAt_Read = {
  __typename?: 'PeopleFields_lastTransactionAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_LastTransactionAt_Update = {
  __typename?: 'PeopleFields_lastTransactionAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Name = {
  __typename?: 'PeopleFields_name';
  create?: Maybe<PeopleFields_Name_Create>;
  delete?: Maybe<PeopleFields_Name_Delete>;
  read?: Maybe<PeopleFields_Name_Read>;
  update?: Maybe<PeopleFields_Name_Update>;
};

export type PeopleFields_Name_Create = {
  __typename?: 'PeopleFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Name_Delete = {
  __typename?: 'PeopleFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Name_Read = {
  __typename?: 'PeopleFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Name_Update = {
  __typename?: 'PeopleFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Phone = {
  __typename?: 'PeopleFields_phone';
  create?: Maybe<PeopleFields_Phone_Create>;
  delete?: Maybe<PeopleFields_Phone_Delete>;
  read?: Maybe<PeopleFields_Phone_Read>;
  update?: Maybe<PeopleFields_Phone_Update>;
};

export type PeopleFields_Phone_Create = {
  __typename?: 'PeopleFields_phone_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Phone_Delete = {
  __typename?: 'PeopleFields_phone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Phone_Read = {
  __typename?: 'PeopleFields_phone_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_Phone_Update = {
  __typename?: 'PeopleFields_phone_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalSummary = {
  __typename?: 'PeopleFields_totalSummary';
  create?: Maybe<PeopleFields_TotalSummary_Create>;
  delete?: Maybe<PeopleFields_TotalSummary_Delete>;
  read?: Maybe<PeopleFields_TotalSummary_Read>;
  update?: Maybe<PeopleFields_TotalSummary_Update>;
};

export type PeopleFields_TotalSummary_Create = {
  __typename?: 'PeopleFields_totalSummary_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalSummary_Delete = {
  __typename?: 'PeopleFields_totalSummary_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalSummary_Read = {
  __typename?: 'PeopleFields_totalSummary_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalSummary_Update = {
  __typename?: 'PeopleFields_totalSummary_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalTransactions = {
  __typename?: 'PeopleFields_totalTransactions';
  create?: Maybe<PeopleFields_TotalTransactions_Create>;
  delete?: Maybe<PeopleFields_TotalTransactions_Delete>;
  read?: Maybe<PeopleFields_TotalTransactions_Read>;
  update?: Maybe<PeopleFields_TotalTransactions_Update>;
};

export type PeopleFields_TotalTransactions_Create = {
  __typename?: 'PeopleFields_totalTransactions_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalTransactions_Delete = {
  __typename?: 'PeopleFields_totalTransactions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalTransactions_Read = {
  __typename?: 'PeopleFields_totalTransactions_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_TotalTransactions_Update = {
  __typename?: 'PeopleFields_totalTransactions_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_UpdatedAt = {
  __typename?: 'PeopleFields_updatedAt';
  create?: Maybe<PeopleFields_UpdatedAt_Create>;
  delete?: Maybe<PeopleFields_UpdatedAt_Delete>;
  read?: Maybe<PeopleFields_UpdatedAt_Read>;
  update?: Maybe<PeopleFields_UpdatedAt_Update>;
};

export type PeopleFields_UpdatedAt_Create = {
  __typename?: 'PeopleFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_UpdatedAt_Delete = {
  __typename?: 'PeopleFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_UpdatedAt_Read = {
  __typename?: 'PeopleFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_UpdatedAt_Update = {
  __typename?: 'PeopleFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_User = {
  __typename?: 'PeopleFields_user';
  create?: Maybe<PeopleFields_User_Create>;
  delete?: Maybe<PeopleFields_User_Delete>;
  read?: Maybe<PeopleFields_User_Read>;
  update?: Maybe<PeopleFields_User_Update>;
};

export type PeopleFields_User_Create = {
  __typename?: 'PeopleFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_User_Delete = {
  __typename?: 'PeopleFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_User_Read = {
  __typename?: 'PeopleFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PeopleFields_User_Update = {
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

export type Person_Avatar_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Person_Balance_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Person_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_Description_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Person_Email_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type Person_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_IsActive_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Person_LastTransactionAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_Phone_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Person_TotalSummary_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type Person_TotalTransactions_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Person_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Person_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Person_Where = {
  AND?: InputMaybe<Array<InputMaybe<Person_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_Where_Or>>>;
  avatar?: InputMaybe<Person_Avatar_Operator>;
  balance?: InputMaybe<Person_Balance_Operator>;
  createdAt?: InputMaybe<Person_CreatedAt_Operator>;
  description?: InputMaybe<Person_Description_Operator>;
  email?: InputMaybe<Person_Email_Operator>;
  id?: InputMaybe<Person_Id_Operator>;
  isActive?: InputMaybe<Person_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Person_LastTransactionAt_Operator>;
  name?: InputMaybe<Person_Name_Operator>;
  phone?: InputMaybe<Person_Phone_Operator>;
  totalSummary?: InputMaybe<Person_TotalSummary_Operator>;
  totalTransactions?: InputMaybe<Person_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Person_UpdatedAt_Operator>;
  user?: InputMaybe<Person_User_Operator>;
};

export type Person_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Person_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_Where_Or>>>;
  avatar?: InputMaybe<Person_Avatar_Operator>;
  balance?: InputMaybe<Person_Balance_Operator>;
  createdAt?: InputMaybe<Person_CreatedAt_Operator>;
  description?: InputMaybe<Person_Description_Operator>;
  email?: InputMaybe<Person_Email_Operator>;
  id?: InputMaybe<Person_Id_Operator>;
  isActive?: InputMaybe<Person_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Person_LastTransactionAt_Operator>;
  name?: InputMaybe<Person_Name_Operator>;
  phone?: InputMaybe<Person_Phone_Operator>;
  totalSummary?: InputMaybe<Person_TotalSummary_Operator>;
  totalTransactions?: InputMaybe<Person_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Person_UpdatedAt_Operator>;
  user?: InputMaybe<Person_User_Operator>;
};

export type Person_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Person_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Person_Where_Or>>>;
  avatar?: InputMaybe<Person_Avatar_Operator>;
  balance?: InputMaybe<Person_Balance_Operator>;
  createdAt?: InputMaybe<Person_CreatedAt_Operator>;
  description?: InputMaybe<Person_Description_Operator>;
  email?: InputMaybe<Person_Email_Operator>;
  id?: InputMaybe<Person_Id_Operator>;
  isActive?: InputMaybe<Person_IsActive_Operator>;
  lastTransactionAt?: InputMaybe<Person_LastTransactionAt_Operator>;
  name?: InputMaybe<Person_Name_Operator>;
  phone?: InputMaybe<Person_Phone_Operator>;
  totalSummary?: InputMaybe<Person_TotalSummary_Operator>;
  totalTransactions?: InputMaybe<Person_TotalTransactions_Operator>;
  updatedAt?: InputMaybe<Person_UpdatedAt_Operator>;
  user?: InputMaybe<Person_User_Operator>;
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
  allMedia?: Maybe<AllMedia>;
  countAccounts?: Maybe<CountAccounts>;
  countAiUsages?: Maybe<CountAiUsages>;
  countCategories?: Maybe<CountCategories>;
  countOauthAccounts?: Maybe<CountOauthAccounts>;
  countPayloadKvs?: Maybe<CountPayloadKvs>;
  countPayloadLockedDocuments?: Maybe<CountPayloadLockedDocuments>;
  countPayloadMcpApiKeys?: Maybe<CountPayloadMcpApiKeys>;
  countPayloadPreferences?: Maybe<CountPayloadPreferences>;
  countPeople?: Maybe<CountPeople>;
  countReminders?: Maybe<CountReminders>;
  countTags?: Maybe<CountTags>;
  countTransactions?: Maybe<CountTransactions>;
  countUserSettings?: Maybe<CountUserSettings>;
  countUsers?: Maybe<CountUsers>;
  countallMedia?: Maybe<CountallMedia>;
  currencies?: Maybe<CurrenciesResult>;
  currency?: Maybe<Currency>;
  dashboardSummary?: Maybe<DashboardResult>;
  docAccessAccount?: Maybe<AccountsDocAccess>;
  docAccessAiUsage?: Maybe<Ai_UsagesDocAccess>;
  docAccessAppSetting?: Maybe<App_SettingsDocAccess>;
  docAccessCategory?: Maybe<CategoriesDocAccess>;
  docAccessMedia?: Maybe<MediaDocAccess>;
  docAccessOauthAccount?: Maybe<Oauth_AccountsDocAccess>;
  docAccessPayloadKv?: Maybe<Payload_KvDocAccess>;
  docAccessPayloadLockedDocument?: Maybe<Payload_Locked_DocumentsDocAccess>;
  docAccessPayloadMcpApiKey?: Maybe<Payload_Mcp_Api_KeysDocAccess>;
  docAccessPayloadPreference?: Maybe<Payload_PreferencesDocAccess>;
  docAccessPerson?: Maybe<PeopleDocAccess>;
  docAccessReminder?: Maybe<RemindersDocAccess>;
  docAccessTag?: Maybe<TagsDocAccess>;
  docAccessTransaction?: Maybe<TransactionsDocAccess>;
  docAccessUser?: Maybe<UsersDocAccess>;
  docAccessUserSetting?: Maybe<User_SettingsDocAccess>;
  initializedPayloadMcpApiKey?: Maybe<Scalars['Boolean']['output']>;
  initializedUser?: Maybe<Scalars['Boolean']['output']>;
  mePayloadMcpApiKey?: Maybe<Payload_Mcp_Api_KeysMe>;
  meUser?: Maybe<UsersMe>;
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
  where?: InputMaybe<Account_Where>;
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
  where?: InputMaybe<AiUsage_Where>;
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
  where?: InputMaybe<Category_Where>;
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
  where?: InputMaybe<OauthAccount_Where>;
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
  where?: InputMaybe<PayloadKv_Where>;
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
  where?: InputMaybe<PayloadLockedDocument_Where>;
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
  where?: InputMaybe<PayloadMcpApiKey_Where>;
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
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QueryPeopleArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Person_Where>;
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
  where?: InputMaybe<Reminder_Where>;
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
  where?: InputMaybe<Tag_Where>;
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
  where?: InputMaybe<Transaction_Where>;
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
  where?: InputMaybe<UserSetting_Where>;
};


export type QueryUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryAllMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryCountAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Account_Where>;
};


export type QueryCountAiUsagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AiUsage_Where>;
};


export type QueryCountCategoriesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Category_Where>;
};


export type QueryCountOauthAccountsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OauthAccount_Where>;
};


export type QueryCountPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_Where>;
};


export type QueryCountPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_Where>;
};


export type QueryCountPayloadMcpApiKeysArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadMcpApiKey_Where>;
};


export type QueryCountPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QueryCountPeopleArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Person_Where>;
};


export type QueryCountRemindersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Reminder_Where>;
};


export type QueryCountTagsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Tag_Where>;
};


export type QueryCountTransactionsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Transaction_Where>;
};


export type QueryCountUserSettingsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserSetting_Where>;
};


export type QueryCountUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryCountallMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryCurrencyArgs = {
  code: Scalars['String']['input'];
};


export type QueryDocAccessAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessAiUsageArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessMediaArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessOauthAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessPayloadKvArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessPayloadLockedDocumentArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessPayloadMcpApiKeyArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessPayloadPreferenceArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessPersonArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessReminderArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessTransactionArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocAccessUserSettingArgs = {
  id: Scalars['String']['input'];
};


export type QueryMonthlyCalendarArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMonthlyCategoriesArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMonthlyPeopleArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMonthlyTagsArgs = {
  month?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTimezoneArgs = {
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
  recurrenceType?: Maybe<Reminder_RecurrenceType>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  type?: Maybe<Reminder_Type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum ReminderUpdate_RecurrenceType_MutationInput {
  Daily = 'daily',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export enum ReminderUpdate_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Reminder_CompletedDates = {
  __typename?: 'Reminder_CompletedDates';
  date?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type Reminder_Account_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_Amount_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_Archived_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Reminder_Category_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_CompletedDates__Date_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_CompletedDates__Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_Date_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Reminder_IsRecurring_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Reminder_LastTriggeredAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_Member_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_NextDueDate_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_RecurrencePeriod_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export enum Reminder_RecurrenceType {
  Daily = 'daily',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export enum Reminder_RecurrenceType_Input {
  Daily = 'daily',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export enum Reminder_RecurrenceType_MutationInput {
  Daily = 'daily',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export type Reminder_RecurrenceType_Operator = {
  all?: InputMaybe<Array<InputMaybe<Reminder_RecurrenceType_Input>>>;
  equals?: InputMaybe<Reminder_RecurrenceType_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Reminder_RecurrenceType_Input>>>;
  not_equals?: InputMaybe<Reminder_RecurrenceType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Reminder_RecurrenceType_Input>>>;
};

export type Reminder_Tags_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Reminder_Type {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Reminder_Type_Input {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Reminder_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Reminder_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Reminder_Type_Input>>>;
  equals?: InputMaybe<Reminder_Type_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Reminder_Type_Input>>>;
  not_equals?: InputMaybe<Reminder_Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Reminder_Type_Input>>>;
};

export type Reminder_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Reminder_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Reminder_Where = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_Where_Or>>>;
  account?: InputMaybe<Reminder_Account_Operator>;
  amount?: InputMaybe<Reminder_Amount_Operator>;
  archived?: InputMaybe<Reminder_Archived_Operator>;
  category?: InputMaybe<Reminder_Category_Operator>;
  completedDates__date?: InputMaybe<Reminder_CompletedDates__Date_Operator>;
  completedDates__id?: InputMaybe<Reminder_CompletedDates__Id_Operator>;
  createdAt?: InputMaybe<Reminder_CreatedAt_Operator>;
  date?: InputMaybe<Reminder_Date_Operator>;
  id?: InputMaybe<Reminder_Id_Operator>;
  isRecurring?: InputMaybe<Reminder_IsRecurring_Operator>;
  lastTriggeredAt?: InputMaybe<Reminder_LastTriggeredAt_Operator>;
  member?: InputMaybe<Reminder_Member_Operator>;
  nextDueDate?: InputMaybe<Reminder_NextDueDate_Operator>;
  recurrencePeriod?: InputMaybe<Reminder_RecurrencePeriod_Operator>;
  recurrenceType?: InputMaybe<Reminder_RecurrenceType_Operator>;
  tags?: InputMaybe<Reminder_Tags_Operator>;
  title?: InputMaybe<Reminder_Title_Operator>;
  type?: InputMaybe<Reminder_Type_Operator>;
  updatedAt?: InputMaybe<Reminder_UpdatedAt_Operator>;
  user?: InputMaybe<Reminder_User_Operator>;
};

export type Reminder_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_Where_Or>>>;
  account?: InputMaybe<Reminder_Account_Operator>;
  amount?: InputMaybe<Reminder_Amount_Operator>;
  archived?: InputMaybe<Reminder_Archived_Operator>;
  category?: InputMaybe<Reminder_Category_Operator>;
  completedDates__date?: InputMaybe<Reminder_CompletedDates__Date_Operator>;
  completedDates__id?: InputMaybe<Reminder_CompletedDates__Id_Operator>;
  createdAt?: InputMaybe<Reminder_CreatedAt_Operator>;
  date?: InputMaybe<Reminder_Date_Operator>;
  id?: InputMaybe<Reminder_Id_Operator>;
  isRecurring?: InputMaybe<Reminder_IsRecurring_Operator>;
  lastTriggeredAt?: InputMaybe<Reminder_LastTriggeredAt_Operator>;
  member?: InputMaybe<Reminder_Member_Operator>;
  nextDueDate?: InputMaybe<Reminder_NextDueDate_Operator>;
  recurrencePeriod?: InputMaybe<Reminder_RecurrencePeriod_Operator>;
  recurrenceType?: InputMaybe<Reminder_RecurrenceType_Operator>;
  tags?: InputMaybe<Reminder_Tags_Operator>;
  title?: InputMaybe<Reminder_Title_Operator>;
  type?: InputMaybe<Reminder_Type_Operator>;
  updatedAt?: InputMaybe<Reminder_UpdatedAt_Operator>;
  user?: InputMaybe<Reminder_User_Operator>;
};

export type Reminder_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Reminder_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Reminder_Where_Or>>>;
  account?: InputMaybe<Reminder_Account_Operator>;
  amount?: InputMaybe<Reminder_Amount_Operator>;
  archived?: InputMaybe<Reminder_Archived_Operator>;
  category?: InputMaybe<Reminder_Category_Operator>;
  completedDates__date?: InputMaybe<Reminder_CompletedDates__Date_Operator>;
  completedDates__id?: InputMaybe<Reminder_CompletedDates__Id_Operator>;
  createdAt?: InputMaybe<Reminder_CreatedAt_Operator>;
  date?: InputMaybe<Reminder_Date_Operator>;
  id?: InputMaybe<Reminder_Id_Operator>;
  isRecurring?: InputMaybe<Reminder_IsRecurring_Operator>;
  lastTriggeredAt?: InputMaybe<Reminder_LastTriggeredAt_Operator>;
  member?: InputMaybe<Reminder_Member_Operator>;
  nextDueDate?: InputMaybe<Reminder_NextDueDate_Operator>;
  recurrencePeriod?: InputMaybe<Reminder_RecurrencePeriod_Operator>;
  recurrenceType?: InputMaybe<Reminder_RecurrenceType_Operator>;
  tags?: InputMaybe<Reminder_Tags_Operator>;
  title?: InputMaybe<Reminder_Title_Operator>;
  type?: InputMaybe<Reminder_Type_Operator>;
  updatedAt?: InputMaybe<Reminder_UpdatedAt_Operator>;
  user?: InputMaybe<Reminder_User_Operator>;
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
  account?: Maybe<RemindersDocAccessFields_Account>;
  amount?: Maybe<RemindersDocAccessFields_Amount>;
  archived?: Maybe<RemindersDocAccessFields_Archived>;
  category?: Maybe<RemindersDocAccessFields_Category>;
  completedDates?: Maybe<RemindersDocAccessFields_CompletedDates>;
  createdAt?: Maybe<RemindersDocAccessFields_CreatedAt>;
  date?: Maybe<RemindersDocAccessFields_Date>;
  isRecurring?: Maybe<RemindersDocAccessFields_IsRecurring>;
  lastTriggeredAt?: Maybe<RemindersDocAccessFields_LastTriggeredAt>;
  member?: Maybe<RemindersDocAccessFields_Member>;
  nextDueDate?: Maybe<RemindersDocAccessFields_NextDueDate>;
  recurrencePeriod?: Maybe<RemindersDocAccessFields_RecurrencePeriod>;
  recurrenceType?: Maybe<RemindersDocAccessFields_RecurrenceType>;
  tags?: Maybe<RemindersDocAccessFields_Tags>;
  title?: Maybe<RemindersDocAccessFields_Title>;
  type?: Maybe<RemindersDocAccessFields_Type>;
  updatedAt?: Maybe<RemindersDocAccessFields_UpdatedAt>;
  user?: Maybe<RemindersDocAccessFields_User>;
};

export type RemindersDocAccessFields_Account = {
  __typename?: 'RemindersDocAccessFields_account';
  create?: Maybe<RemindersDocAccessFields_Account_Create>;
  delete?: Maybe<RemindersDocAccessFields_Account_Delete>;
  read?: Maybe<RemindersDocAccessFields_Account_Read>;
  update?: Maybe<RemindersDocAccessFields_Account_Update>;
};

export type RemindersDocAccessFields_Account_Create = {
  __typename?: 'RemindersDocAccessFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Account_Delete = {
  __typename?: 'RemindersDocAccessFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Account_Read = {
  __typename?: 'RemindersDocAccessFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Account_Update = {
  __typename?: 'RemindersDocAccessFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Amount = {
  __typename?: 'RemindersDocAccessFields_amount';
  create?: Maybe<RemindersDocAccessFields_Amount_Create>;
  delete?: Maybe<RemindersDocAccessFields_Amount_Delete>;
  read?: Maybe<RemindersDocAccessFields_Amount_Read>;
  update?: Maybe<RemindersDocAccessFields_Amount_Update>;
};

export type RemindersDocAccessFields_Amount_Create = {
  __typename?: 'RemindersDocAccessFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Amount_Delete = {
  __typename?: 'RemindersDocAccessFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Amount_Read = {
  __typename?: 'RemindersDocAccessFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Amount_Update = {
  __typename?: 'RemindersDocAccessFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Archived = {
  __typename?: 'RemindersDocAccessFields_archived';
  create?: Maybe<RemindersDocAccessFields_Archived_Create>;
  delete?: Maybe<RemindersDocAccessFields_Archived_Delete>;
  read?: Maybe<RemindersDocAccessFields_Archived_Read>;
  update?: Maybe<RemindersDocAccessFields_Archived_Update>;
};

export type RemindersDocAccessFields_Archived_Create = {
  __typename?: 'RemindersDocAccessFields_archived_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Archived_Delete = {
  __typename?: 'RemindersDocAccessFields_archived_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Archived_Read = {
  __typename?: 'RemindersDocAccessFields_archived_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Archived_Update = {
  __typename?: 'RemindersDocAccessFields_archived_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Category = {
  __typename?: 'RemindersDocAccessFields_category';
  create?: Maybe<RemindersDocAccessFields_Category_Create>;
  delete?: Maybe<RemindersDocAccessFields_Category_Delete>;
  read?: Maybe<RemindersDocAccessFields_Category_Read>;
  update?: Maybe<RemindersDocAccessFields_Category_Update>;
};

export type RemindersDocAccessFields_Category_Create = {
  __typename?: 'RemindersDocAccessFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Category_Delete = {
  __typename?: 'RemindersDocAccessFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Category_Read = {
  __typename?: 'RemindersDocAccessFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Category_Update = {
  __typename?: 'RemindersDocAccessFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates = {
  __typename?: 'RemindersDocAccessFields_completedDates';
  create?: Maybe<RemindersDocAccessFields_CompletedDates_Create>;
  delete?: Maybe<RemindersDocAccessFields_CompletedDates_Delete>;
  fields?: Maybe<RemindersDocAccessFields_CompletedDates_Fields>;
  read?: Maybe<RemindersDocAccessFields_CompletedDates_Read>;
  update?: Maybe<RemindersDocAccessFields_CompletedDates_Update>;
};

export type RemindersDocAccessFields_CompletedDates_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Fields = {
  __typename?: 'RemindersDocAccessFields_completedDates_Fields';
  date?: Maybe<RemindersDocAccessFields_CompletedDates_Date>;
  id?: Maybe<RemindersDocAccessFields_CompletedDates_Id>;
};

export type RemindersDocAccessFields_CompletedDates_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Date = {
  __typename?: 'RemindersDocAccessFields_completedDates_date';
  create?: Maybe<RemindersDocAccessFields_CompletedDates_Date_Create>;
  delete?: Maybe<RemindersDocAccessFields_CompletedDates_Date_Delete>;
  read?: Maybe<RemindersDocAccessFields_CompletedDates_Date_Read>;
  update?: Maybe<RemindersDocAccessFields_CompletedDates_Date_Update>;
};

export type RemindersDocAccessFields_CompletedDates_Date_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Date_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Date_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Date_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Id = {
  __typename?: 'RemindersDocAccessFields_completedDates_id';
  create?: Maybe<RemindersDocAccessFields_CompletedDates_Id_Create>;
  delete?: Maybe<RemindersDocAccessFields_CompletedDates_Id_Delete>;
  read?: Maybe<RemindersDocAccessFields_CompletedDates_Id_Read>;
  update?: Maybe<RemindersDocAccessFields_CompletedDates_Id_Update>;
};

export type RemindersDocAccessFields_CompletedDates_Id_Create = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Id_Delete = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Id_Read = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CompletedDates_Id_Update = {
  __typename?: 'RemindersDocAccessFields_completedDates_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CreatedAt = {
  __typename?: 'RemindersDocAccessFields_createdAt';
  create?: Maybe<RemindersDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_CreatedAt_Read>;
  update?: Maybe<RemindersDocAccessFields_CreatedAt_Update>;
};

export type RemindersDocAccessFields_CreatedAt_Create = {
  __typename?: 'RemindersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CreatedAt_Delete = {
  __typename?: 'RemindersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CreatedAt_Read = {
  __typename?: 'RemindersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_CreatedAt_Update = {
  __typename?: 'RemindersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Date = {
  __typename?: 'RemindersDocAccessFields_date';
  create?: Maybe<RemindersDocAccessFields_Date_Create>;
  delete?: Maybe<RemindersDocAccessFields_Date_Delete>;
  read?: Maybe<RemindersDocAccessFields_Date_Read>;
  update?: Maybe<RemindersDocAccessFields_Date_Update>;
};

export type RemindersDocAccessFields_Date_Create = {
  __typename?: 'RemindersDocAccessFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Date_Delete = {
  __typename?: 'RemindersDocAccessFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Date_Read = {
  __typename?: 'RemindersDocAccessFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Date_Update = {
  __typename?: 'RemindersDocAccessFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_IsRecurring = {
  __typename?: 'RemindersDocAccessFields_isRecurring';
  create?: Maybe<RemindersDocAccessFields_IsRecurring_Create>;
  delete?: Maybe<RemindersDocAccessFields_IsRecurring_Delete>;
  read?: Maybe<RemindersDocAccessFields_IsRecurring_Read>;
  update?: Maybe<RemindersDocAccessFields_IsRecurring_Update>;
};

export type RemindersDocAccessFields_IsRecurring_Create = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_IsRecurring_Delete = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_IsRecurring_Read = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_IsRecurring_Update = {
  __typename?: 'RemindersDocAccessFields_isRecurring_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_LastTriggeredAt = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt';
  create?: Maybe<RemindersDocAccessFields_LastTriggeredAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_LastTriggeredAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_LastTriggeredAt_Read>;
  update?: Maybe<RemindersDocAccessFields_LastTriggeredAt_Update>;
};

export type RemindersDocAccessFields_LastTriggeredAt_Create = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_LastTriggeredAt_Delete = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_LastTriggeredAt_Read = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_LastTriggeredAt_Update = {
  __typename?: 'RemindersDocAccessFields_lastTriggeredAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Member = {
  __typename?: 'RemindersDocAccessFields_member';
  create?: Maybe<RemindersDocAccessFields_Member_Create>;
  delete?: Maybe<RemindersDocAccessFields_Member_Delete>;
  read?: Maybe<RemindersDocAccessFields_Member_Read>;
  update?: Maybe<RemindersDocAccessFields_Member_Update>;
};

export type RemindersDocAccessFields_Member_Create = {
  __typename?: 'RemindersDocAccessFields_member_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Member_Delete = {
  __typename?: 'RemindersDocAccessFields_member_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Member_Read = {
  __typename?: 'RemindersDocAccessFields_member_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Member_Update = {
  __typename?: 'RemindersDocAccessFields_member_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_NextDueDate = {
  __typename?: 'RemindersDocAccessFields_nextDueDate';
  create?: Maybe<RemindersDocAccessFields_NextDueDate_Create>;
  delete?: Maybe<RemindersDocAccessFields_NextDueDate_Delete>;
  read?: Maybe<RemindersDocAccessFields_NextDueDate_Read>;
  update?: Maybe<RemindersDocAccessFields_NextDueDate_Update>;
};

export type RemindersDocAccessFields_NextDueDate_Create = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_NextDueDate_Delete = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_NextDueDate_Read = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_NextDueDate_Update = {
  __typename?: 'RemindersDocAccessFields_nextDueDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrencePeriod = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod';
  create?: Maybe<RemindersDocAccessFields_RecurrencePeriod_Create>;
  delete?: Maybe<RemindersDocAccessFields_RecurrencePeriod_Delete>;
  read?: Maybe<RemindersDocAccessFields_RecurrencePeriod_Read>;
  update?: Maybe<RemindersDocAccessFields_RecurrencePeriod_Update>;
};

export type RemindersDocAccessFields_RecurrencePeriod_Create = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrencePeriod_Delete = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrencePeriod_Read = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrencePeriod_Update = {
  __typename?: 'RemindersDocAccessFields_recurrencePeriod_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrenceType = {
  __typename?: 'RemindersDocAccessFields_recurrenceType';
  create?: Maybe<RemindersDocAccessFields_RecurrenceType_Create>;
  delete?: Maybe<RemindersDocAccessFields_RecurrenceType_Delete>;
  read?: Maybe<RemindersDocAccessFields_RecurrenceType_Read>;
  update?: Maybe<RemindersDocAccessFields_RecurrenceType_Update>;
};

export type RemindersDocAccessFields_RecurrenceType_Create = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrenceType_Delete = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrenceType_Read = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_RecurrenceType_Update = {
  __typename?: 'RemindersDocAccessFields_recurrenceType_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Tags = {
  __typename?: 'RemindersDocAccessFields_tags';
  create?: Maybe<RemindersDocAccessFields_Tags_Create>;
  delete?: Maybe<RemindersDocAccessFields_Tags_Delete>;
  read?: Maybe<RemindersDocAccessFields_Tags_Read>;
  update?: Maybe<RemindersDocAccessFields_Tags_Update>;
};

export type RemindersDocAccessFields_Tags_Create = {
  __typename?: 'RemindersDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Tags_Delete = {
  __typename?: 'RemindersDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Tags_Read = {
  __typename?: 'RemindersDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Tags_Update = {
  __typename?: 'RemindersDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Title = {
  __typename?: 'RemindersDocAccessFields_title';
  create?: Maybe<RemindersDocAccessFields_Title_Create>;
  delete?: Maybe<RemindersDocAccessFields_Title_Delete>;
  read?: Maybe<RemindersDocAccessFields_Title_Read>;
  update?: Maybe<RemindersDocAccessFields_Title_Update>;
};

export type RemindersDocAccessFields_Title_Create = {
  __typename?: 'RemindersDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Title_Delete = {
  __typename?: 'RemindersDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Title_Read = {
  __typename?: 'RemindersDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Title_Update = {
  __typename?: 'RemindersDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Type = {
  __typename?: 'RemindersDocAccessFields_type';
  create?: Maybe<RemindersDocAccessFields_Type_Create>;
  delete?: Maybe<RemindersDocAccessFields_Type_Delete>;
  read?: Maybe<RemindersDocAccessFields_Type_Read>;
  update?: Maybe<RemindersDocAccessFields_Type_Update>;
};

export type RemindersDocAccessFields_Type_Create = {
  __typename?: 'RemindersDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Type_Delete = {
  __typename?: 'RemindersDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Type_Read = {
  __typename?: 'RemindersDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_Type_Update = {
  __typename?: 'RemindersDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_UpdatedAt = {
  __typename?: 'RemindersDocAccessFields_updatedAt';
  create?: Maybe<RemindersDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<RemindersDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<RemindersDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<RemindersDocAccessFields_UpdatedAt_Update>;
};

export type RemindersDocAccessFields_UpdatedAt_Create = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_UpdatedAt_Read = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_UpdatedAt_Update = {
  __typename?: 'RemindersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_User = {
  __typename?: 'RemindersDocAccessFields_user';
  create?: Maybe<RemindersDocAccessFields_User_Create>;
  delete?: Maybe<RemindersDocAccessFields_User_Delete>;
  read?: Maybe<RemindersDocAccessFields_User_Read>;
  update?: Maybe<RemindersDocAccessFields_User_Update>;
};

export type RemindersDocAccessFields_User_Create = {
  __typename?: 'RemindersDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_User_Delete = {
  __typename?: 'RemindersDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_User_Read = {
  __typename?: 'RemindersDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersDocAccessFields_User_Update = {
  __typename?: 'RemindersDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields = {
  __typename?: 'RemindersFields';
  account?: Maybe<RemindersFields_Account>;
  amount?: Maybe<RemindersFields_Amount>;
  archived?: Maybe<RemindersFields_Archived>;
  category?: Maybe<RemindersFields_Category>;
  completedDates?: Maybe<RemindersFields_CompletedDates>;
  createdAt?: Maybe<RemindersFields_CreatedAt>;
  date?: Maybe<RemindersFields_Date>;
  isRecurring?: Maybe<RemindersFields_IsRecurring>;
  lastTriggeredAt?: Maybe<RemindersFields_LastTriggeredAt>;
  member?: Maybe<RemindersFields_Member>;
  nextDueDate?: Maybe<RemindersFields_NextDueDate>;
  recurrencePeriod?: Maybe<RemindersFields_RecurrencePeriod>;
  recurrenceType?: Maybe<RemindersFields_RecurrenceType>;
  tags?: Maybe<RemindersFields_Tags>;
  title?: Maybe<RemindersFields_Title>;
  type?: Maybe<RemindersFields_Type>;
  updatedAt?: Maybe<RemindersFields_UpdatedAt>;
  user?: Maybe<RemindersFields_User>;
};

export type RemindersFields_Account = {
  __typename?: 'RemindersFields_account';
  create?: Maybe<RemindersFields_Account_Create>;
  delete?: Maybe<RemindersFields_Account_Delete>;
  read?: Maybe<RemindersFields_Account_Read>;
  update?: Maybe<RemindersFields_Account_Update>;
};

export type RemindersFields_Account_Create = {
  __typename?: 'RemindersFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Account_Delete = {
  __typename?: 'RemindersFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Account_Read = {
  __typename?: 'RemindersFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Account_Update = {
  __typename?: 'RemindersFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Amount = {
  __typename?: 'RemindersFields_amount';
  create?: Maybe<RemindersFields_Amount_Create>;
  delete?: Maybe<RemindersFields_Amount_Delete>;
  read?: Maybe<RemindersFields_Amount_Read>;
  update?: Maybe<RemindersFields_Amount_Update>;
};

export type RemindersFields_Amount_Create = {
  __typename?: 'RemindersFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Amount_Delete = {
  __typename?: 'RemindersFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Amount_Read = {
  __typename?: 'RemindersFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Amount_Update = {
  __typename?: 'RemindersFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Archived = {
  __typename?: 'RemindersFields_archived';
  create?: Maybe<RemindersFields_Archived_Create>;
  delete?: Maybe<RemindersFields_Archived_Delete>;
  read?: Maybe<RemindersFields_Archived_Read>;
  update?: Maybe<RemindersFields_Archived_Update>;
};

export type RemindersFields_Archived_Create = {
  __typename?: 'RemindersFields_archived_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Archived_Delete = {
  __typename?: 'RemindersFields_archived_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Archived_Read = {
  __typename?: 'RemindersFields_archived_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Archived_Update = {
  __typename?: 'RemindersFields_archived_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Category = {
  __typename?: 'RemindersFields_category';
  create?: Maybe<RemindersFields_Category_Create>;
  delete?: Maybe<RemindersFields_Category_Delete>;
  read?: Maybe<RemindersFields_Category_Read>;
  update?: Maybe<RemindersFields_Category_Update>;
};

export type RemindersFields_Category_Create = {
  __typename?: 'RemindersFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Category_Delete = {
  __typename?: 'RemindersFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Category_Read = {
  __typename?: 'RemindersFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Category_Update = {
  __typename?: 'RemindersFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates = {
  __typename?: 'RemindersFields_completedDates';
  create?: Maybe<RemindersFields_CompletedDates_Create>;
  delete?: Maybe<RemindersFields_CompletedDates_Delete>;
  fields?: Maybe<RemindersFields_CompletedDates_Fields>;
  read?: Maybe<RemindersFields_CompletedDates_Read>;
  update?: Maybe<RemindersFields_CompletedDates_Update>;
};

export type RemindersFields_CompletedDates_Create = {
  __typename?: 'RemindersFields_completedDates_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Delete = {
  __typename?: 'RemindersFields_completedDates_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Fields = {
  __typename?: 'RemindersFields_completedDates_Fields';
  date?: Maybe<RemindersFields_CompletedDates_Date>;
  id?: Maybe<RemindersFields_CompletedDates_Id>;
};

export type RemindersFields_CompletedDates_Read = {
  __typename?: 'RemindersFields_completedDates_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Update = {
  __typename?: 'RemindersFields_completedDates_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Date = {
  __typename?: 'RemindersFields_completedDates_date';
  create?: Maybe<RemindersFields_CompletedDates_Date_Create>;
  delete?: Maybe<RemindersFields_CompletedDates_Date_Delete>;
  read?: Maybe<RemindersFields_CompletedDates_Date_Read>;
  update?: Maybe<RemindersFields_CompletedDates_Date_Update>;
};

export type RemindersFields_CompletedDates_Date_Create = {
  __typename?: 'RemindersFields_completedDates_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Date_Delete = {
  __typename?: 'RemindersFields_completedDates_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Date_Read = {
  __typename?: 'RemindersFields_completedDates_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Date_Update = {
  __typename?: 'RemindersFields_completedDates_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Id = {
  __typename?: 'RemindersFields_completedDates_id';
  create?: Maybe<RemindersFields_CompletedDates_Id_Create>;
  delete?: Maybe<RemindersFields_CompletedDates_Id_Delete>;
  read?: Maybe<RemindersFields_CompletedDates_Id_Read>;
  update?: Maybe<RemindersFields_CompletedDates_Id_Update>;
};

export type RemindersFields_CompletedDates_Id_Create = {
  __typename?: 'RemindersFields_completedDates_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Id_Delete = {
  __typename?: 'RemindersFields_completedDates_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Id_Read = {
  __typename?: 'RemindersFields_completedDates_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CompletedDates_Id_Update = {
  __typename?: 'RemindersFields_completedDates_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CreatedAt = {
  __typename?: 'RemindersFields_createdAt';
  create?: Maybe<RemindersFields_CreatedAt_Create>;
  delete?: Maybe<RemindersFields_CreatedAt_Delete>;
  read?: Maybe<RemindersFields_CreatedAt_Read>;
  update?: Maybe<RemindersFields_CreatedAt_Update>;
};

export type RemindersFields_CreatedAt_Create = {
  __typename?: 'RemindersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CreatedAt_Delete = {
  __typename?: 'RemindersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CreatedAt_Read = {
  __typename?: 'RemindersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_CreatedAt_Update = {
  __typename?: 'RemindersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Date = {
  __typename?: 'RemindersFields_date';
  create?: Maybe<RemindersFields_Date_Create>;
  delete?: Maybe<RemindersFields_Date_Delete>;
  read?: Maybe<RemindersFields_Date_Read>;
  update?: Maybe<RemindersFields_Date_Update>;
};

export type RemindersFields_Date_Create = {
  __typename?: 'RemindersFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Date_Delete = {
  __typename?: 'RemindersFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Date_Read = {
  __typename?: 'RemindersFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Date_Update = {
  __typename?: 'RemindersFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_IsRecurring = {
  __typename?: 'RemindersFields_isRecurring';
  create?: Maybe<RemindersFields_IsRecurring_Create>;
  delete?: Maybe<RemindersFields_IsRecurring_Delete>;
  read?: Maybe<RemindersFields_IsRecurring_Read>;
  update?: Maybe<RemindersFields_IsRecurring_Update>;
};

export type RemindersFields_IsRecurring_Create = {
  __typename?: 'RemindersFields_isRecurring_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_IsRecurring_Delete = {
  __typename?: 'RemindersFields_isRecurring_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_IsRecurring_Read = {
  __typename?: 'RemindersFields_isRecurring_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_IsRecurring_Update = {
  __typename?: 'RemindersFields_isRecurring_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_LastTriggeredAt = {
  __typename?: 'RemindersFields_lastTriggeredAt';
  create?: Maybe<RemindersFields_LastTriggeredAt_Create>;
  delete?: Maybe<RemindersFields_LastTriggeredAt_Delete>;
  read?: Maybe<RemindersFields_LastTriggeredAt_Read>;
  update?: Maybe<RemindersFields_LastTriggeredAt_Update>;
};

export type RemindersFields_LastTriggeredAt_Create = {
  __typename?: 'RemindersFields_lastTriggeredAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_LastTriggeredAt_Delete = {
  __typename?: 'RemindersFields_lastTriggeredAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_LastTriggeredAt_Read = {
  __typename?: 'RemindersFields_lastTriggeredAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_LastTriggeredAt_Update = {
  __typename?: 'RemindersFields_lastTriggeredAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Member = {
  __typename?: 'RemindersFields_member';
  create?: Maybe<RemindersFields_Member_Create>;
  delete?: Maybe<RemindersFields_Member_Delete>;
  read?: Maybe<RemindersFields_Member_Read>;
  update?: Maybe<RemindersFields_Member_Update>;
};

export type RemindersFields_Member_Create = {
  __typename?: 'RemindersFields_member_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Member_Delete = {
  __typename?: 'RemindersFields_member_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Member_Read = {
  __typename?: 'RemindersFields_member_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Member_Update = {
  __typename?: 'RemindersFields_member_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_NextDueDate = {
  __typename?: 'RemindersFields_nextDueDate';
  create?: Maybe<RemindersFields_NextDueDate_Create>;
  delete?: Maybe<RemindersFields_NextDueDate_Delete>;
  read?: Maybe<RemindersFields_NextDueDate_Read>;
  update?: Maybe<RemindersFields_NextDueDate_Update>;
};

export type RemindersFields_NextDueDate_Create = {
  __typename?: 'RemindersFields_nextDueDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_NextDueDate_Delete = {
  __typename?: 'RemindersFields_nextDueDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_NextDueDate_Read = {
  __typename?: 'RemindersFields_nextDueDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_NextDueDate_Update = {
  __typename?: 'RemindersFields_nextDueDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrencePeriod = {
  __typename?: 'RemindersFields_recurrencePeriod';
  create?: Maybe<RemindersFields_RecurrencePeriod_Create>;
  delete?: Maybe<RemindersFields_RecurrencePeriod_Delete>;
  read?: Maybe<RemindersFields_RecurrencePeriod_Read>;
  update?: Maybe<RemindersFields_RecurrencePeriod_Update>;
};

export type RemindersFields_RecurrencePeriod_Create = {
  __typename?: 'RemindersFields_recurrencePeriod_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrencePeriod_Delete = {
  __typename?: 'RemindersFields_recurrencePeriod_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrencePeriod_Read = {
  __typename?: 'RemindersFields_recurrencePeriod_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrencePeriod_Update = {
  __typename?: 'RemindersFields_recurrencePeriod_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrenceType = {
  __typename?: 'RemindersFields_recurrenceType';
  create?: Maybe<RemindersFields_RecurrenceType_Create>;
  delete?: Maybe<RemindersFields_RecurrenceType_Delete>;
  read?: Maybe<RemindersFields_RecurrenceType_Read>;
  update?: Maybe<RemindersFields_RecurrenceType_Update>;
};

export type RemindersFields_RecurrenceType_Create = {
  __typename?: 'RemindersFields_recurrenceType_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrenceType_Delete = {
  __typename?: 'RemindersFields_recurrenceType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrenceType_Read = {
  __typename?: 'RemindersFields_recurrenceType_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_RecurrenceType_Update = {
  __typename?: 'RemindersFields_recurrenceType_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Tags = {
  __typename?: 'RemindersFields_tags';
  create?: Maybe<RemindersFields_Tags_Create>;
  delete?: Maybe<RemindersFields_Tags_Delete>;
  read?: Maybe<RemindersFields_Tags_Read>;
  update?: Maybe<RemindersFields_Tags_Update>;
};

export type RemindersFields_Tags_Create = {
  __typename?: 'RemindersFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Tags_Delete = {
  __typename?: 'RemindersFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Tags_Read = {
  __typename?: 'RemindersFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Tags_Update = {
  __typename?: 'RemindersFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Title = {
  __typename?: 'RemindersFields_title';
  create?: Maybe<RemindersFields_Title_Create>;
  delete?: Maybe<RemindersFields_Title_Delete>;
  read?: Maybe<RemindersFields_Title_Read>;
  update?: Maybe<RemindersFields_Title_Update>;
};

export type RemindersFields_Title_Create = {
  __typename?: 'RemindersFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Title_Delete = {
  __typename?: 'RemindersFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Title_Read = {
  __typename?: 'RemindersFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Title_Update = {
  __typename?: 'RemindersFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Type = {
  __typename?: 'RemindersFields_type';
  create?: Maybe<RemindersFields_Type_Create>;
  delete?: Maybe<RemindersFields_Type_Delete>;
  read?: Maybe<RemindersFields_Type_Read>;
  update?: Maybe<RemindersFields_Type_Update>;
};

export type RemindersFields_Type_Create = {
  __typename?: 'RemindersFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Type_Delete = {
  __typename?: 'RemindersFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Type_Read = {
  __typename?: 'RemindersFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_Type_Update = {
  __typename?: 'RemindersFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_UpdatedAt = {
  __typename?: 'RemindersFields_updatedAt';
  create?: Maybe<RemindersFields_UpdatedAt_Create>;
  delete?: Maybe<RemindersFields_UpdatedAt_Delete>;
  read?: Maybe<RemindersFields_UpdatedAt_Read>;
  update?: Maybe<RemindersFields_UpdatedAt_Update>;
};

export type RemindersFields_UpdatedAt_Create = {
  __typename?: 'RemindersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_UpdatedAt_Delete = {
  __typename?: 'RemindersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_UpdatedAt_Read = {
  __typename?: 'RemindersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_UpdatedAt_Update = {
  __typename?: 'RemindersFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_User = {
  __typename?: 'RemindersFields_user';
  create?: Maybe<RemindersFields_User_Create>;
  delete?: Maybe<RemindersFields_User_Delete>;
  read?: Maybe<RemindersFields_User_Read>;
  update?: Maybe<RemindersFields_User_Update>;
};

export type RemindersFields_User_Create = {
  __typename?: 'RemindersFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_User_Delete = {
  __typename?: 'RemindersFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_User_Read = {
  __typename?: 'RemindersFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type RemindersFields_User_Update = {
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

export type Tag_BgColor_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_Color_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Tag_Description_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Tag_Icon_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_IsActive_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Tag_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Tag_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Tag_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Tag_Where = {
  AND?: InputMaybe<Array<InputMaybe<Tag_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_Where_Or>>>;
  bgColor?: InputMaybe<Tag_BgColor_Operator>;
  color?: InputMaybe<Tag_Color_Operator>;
  createdAt?: InputMaybe<Tag_CreatedAt_Operator>;
  description?: InputMaybe<Tag_Description_Operator>;
  icon?: InputMaybe<Tag_Icon_Operator>;
  id?: InputMaybe<Tag_Id_Operator>;
  isActive?: InputMaybe<Tag_IsActive_Operator>;
  name?: InputMaybe<Tag_Name_Operator>;
  updatedAt?: InputMaybe<Tag_UpdatedAt_Operator>;
  user?: InputMaybe<Tag_User_Operator>;
};

export type Tag_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Tag_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_Where_Or>>>;
  bgColor?: InputMaybe<Tag_BgColor_Operator>;
  color?: InputMaybe<Tag_Color_Operator>;
  createdAt?: InputMaybe<Tag_CreatedAt_Operator>;
  description?: InputMaybe<Tag_Description_Operator>;
  icon?: InputMaybe<Tag_Icon_Operator>;
  id?: InputMaybe<Tag_Id_Operator>;
  isActive?: InputMaybe<Tag_IsActive_Operator>;
  name?: InputMaybe<Tag_Name_Operator>;
  updatedAt?: InputMaybe<Tag_UpdatedAt_Operator>;
  user?: InputMaybe<Tag_User_Operator>;
};

export type Tag_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Tag_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Tag_Where_Or>>>;
  bgColor?: InputMaybe<Tag_BgColor_Operator>;
  color?: InputMaybe<Tag_Color_Operator>;
  createdAt?: InputMaybe<Tag_CreatedAt_Operator>;
  description?: InputMaybe<Tag_Description_Operator>;
  icon?: InputMaybe<Tag_Icon_Operator>;
  id?: InputMaybe<Tag_Id_Operator>;
  isActive?: InputMaybe<Tag_IsActive_Operator>;
  name?: InputMaybe<Tag_Name_Operator>;
  updatedAt?: InputMaybe<Tag_UpdatedAt_Operator>;
  user?: InputMaybe<Tag_User_Operator>;
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
  bgColor?: Maybe<TagsDocAccessFields_BgColor>;
  color?: Maybe<TagsDocAccessFields_Color>;
  createdAt?: Maybe<TagsDocAccessFields_CreatedAt>;
  description?: Maybe<TagsDocAccessFields_Description>;
  icon?: Maybe<TagsDocAccessFields_Icon>;
  isActive?: Maybe<TagsDocAccessFields_IsActive>;
  name?: Maybe<TagsDocAccessFields_Name>;
  updatedAt?: Maybe<TagsDocAccessFields_UpdatedAt>;
  user?: Maybe<TagsDocAccessFields_User>;
};

export type TagsDocAccessFields_BgColor = {
  __typename?: 'TagsDocAccessFields_bgColor';
  create?: Maybe<TagsDocAccessFields_BgColor_Create>;
  delete?: Maybe<TagsDocAccessFields_BgColor_Delete>;
  read?: Maybe<TagsDocAccessFields_BgColor_Read>;
  update?: Maybe<TagsDocAccessFields_BgColor_Update>;
};

export type TagsDocAccessFields_BgColor_Create = {
  __typename?: 'TagsDocAccessFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_BgColor_Delete = {
  __typename?: 'TagsDocAccessFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_BgColor_Read = {
  __typename?: 'TagsDocAccessFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_BgColor_Update = {
  __typename?: 'TagsDocAccessFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Color = {
  __typename?: 'TagsDocAccessFields_color';
  create?: Maybe<TagsDocAccessFields_Color_Create>;
  delete?: Maybe<TagsDocAccessFields_Color_Delete>;
  read?: Maybe<TagsDocAccessFields_Color_Read>;
  update?: Maybe<TagsDocAccessFields_Color_Update>;
};

export type TagsDocAccessFields_Color_Create = {
  __typename?: 'TagsDocAccessFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Color_Delete = {
  __typename?: 'TagsDocAccessFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Color_Read = {
  __typename?: 'TagsDocAccessFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Color_Update = {
  __typename?: 'TagsDocAccessFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_CreatedAt = {
  __typename?: 'TagsDocAccessFields_createdAt';
  create?: Maybe<TagsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<TagsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<TagsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<TagsDocAccessFields_CreatedAt_Update>;
};

export type TagsDocAccessFields_CreatedAt_Create = {
  __typename?: 'TagsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'TagsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_CreatedAt_Read = {
  __typename?: 'TagsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_CreatedAt_Update = {
  __typename?: 'TagsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Description = {
  __typename?: 'TagsDocAccessFields_description';
  create?: Maybe<TagsDocAccessFields_Description_Create>;
  delete?: Maybe<TagsDocAccessFields_Description_Delete>;
  read?: Maybe<TagsDocAccessFields_Description_Read>;
  update?: Maybe<TagsDocAccessFields_Description_Update>;
};

export type TagsDocAccessFields_Description_Create = {
  __typename?: 'TagsDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Description_Delete = {
  __typename?: 'TagsDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Description_Read = {
  __typename?: 'TagsDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Description_Update = {
  __typename?: 'TagsDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Icon = {
  __typename?: 'TagsDocAccessFields_icon';
  create?: Maybe<TagsDocAccessFields_Icon_Create>;
  delete?: Maybe<TagsDocAccessFields_Icon_Delete>;
  read?: Maybe<TagsDocAccessFields_Icon_Read>;
  update?: Maybe<TagsDocAccessFields_Icon_Update>;
};

export type TagsDocAccessFields_Icon_Create = {
  __typename?: 'TagsDocAccessFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Icon_Delete = {
  __typename?: 'TagsDocAccessFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Icon_Read = {
  __typename?: 'TagsDocAccessFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Icon_Update = {
  __typename?: 'TagsDocAccessFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_IsActive = {
  __typename?: 'TagsDocAccessFields_isActive';
  create?: Maybe<TagsDocAccessFields_IsActive_Create>;
  delete?: Maybe<TagsDocAccessFields_IsActive_Delete>;
  read?: Maybe<TagsDocAccessFields_IsActive_Read>;
  update?: Maybe<TagsDocAccessFields_IsActive_Update>;
};

export type TagsDocAccessFields_IsActive_Create = {
  __typename?: 'TagsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_IsActive_Delete = {
  __typename?: 'TagsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_IsActive_Read = {
  __typename?: 'TagsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_IsActive_Update = {
  __typename?: 'TagsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Name = {
  __typename?: 'TagsDocAccessFields_name';
  create?: Maybe<TagsDocAccessFields_Name_Create>;
  delete?: Maybe<TagsDocAccessFields_Name_Delete>;
  read?: Maybe<TagsDocAccessFields_Name_Read>;
  update?: Maybe<TagsDocAccessFields_Name_Update>;
};

export type TagsDocAccessFields_Name_Create = {
  __typename?: 'TagsDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Name_Delete = {
  __typename?: 'TagsDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Name_Read = {
  __typename?: 'TagsDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_Name_Update = {
  __typename?: 'TagsDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_UpdatedAt = {
  __typename?: 'TagsDocAccessFields_updatedAt';
  create?: Maybe<TagsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<TagsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<TagsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<TagsDocAccessFields_UpdatedAt_Update>;
};

export type TagsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'TagsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'TagsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'TagsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'TagsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_User = {
  __typename?: 'TagsDocAccessFields_user';
  create?: Maybe<TagsDocAccessFields_User_Create>;
  delete?: Maybe<TagsDocAccessFields_User_Delete>;
  read?: Maybe<TagsDocAccessFields_User_Read>;
  update?: Maybe<TagsDocAccessFields_User_Update>;
};

export type TagsDocAccessFields_User_Create = {
  __typename?: 'TagsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_User_Delete = {
  __typename?: 'TagsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_User_Read = {
  __typename?: 'TagsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsDocAccessFields_User_Update = {
  __typename?: 'TagsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields = {
  __typename?: 'TagsFields';
  bgColor?: Maybe<TagsFields_BgColor>;
  color?: Maybe<TagsFields_Color>;
  createdAt?: Maybe<TagsFields_CreatedAt>;
  description?: Maybe<TagsFields_Description>;
  icon?: Maybe<TagsFields_Icon>;
  isActive?: Maybe<TagsFields_IsActive>;
  name?: Maybe<TagsFields_Name>;
  updatedAt?: Maybe<TagsFields_UpdatedAt>;
  user?: Maybe<TagsFields_User>;
};

export type TagsFields_BgColor = {
  __typename?: 'TagsFields_bgColor';
  create?: Maybe<TagsFields_BgColor_Create>;
  delete?: Maybe<TagsFields_BgColor_Delete>;
  read?: Maybe<TagsFields_BgColor_Read>;
  update?: Maybe<TagsFields_BgColor_Update>;
};

export type TagsFields_BgColor_Create = {
  __typename?: 'TagsFields_bgColor_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_BgColor_Delete = {
  __typename?: 'TagsFields_bgColor_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_BgColor_Read = {
  __typename?: 'TagsFields_bgColor_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_BgColor_Update = {
  __typename?: 'TagsFields_bgColor_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Color = {
  __typename?: 'TagsFields_color';
  create?: Maybe<TagsFields_Color_Create>;
  delete?: Maybe<TagsFields_Color_Delete>;
  read?: Maybe<TagsFields_Color_Read>;
  update?: Maybe<TagsFields_Color_Update>;
};

export type TagsFields_Color_Create = {
  __typename?: 'TagsFields_color_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Color_Delete = {
  __typename?: 'TagsFields_color_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Color_Read = {
  __typename?: 'TagsFields_color_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Color_Update = {
  __typename?: 'TagsFields_color_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_CreatedAt = {
  __typename?: 'TagsFields_createdAt';
  create?: Maybe<TagsFields_CreatedAt_Create>;
  delete?: Maybe<TagsFields_CreatedAt_Delete>;
  read?: Maybe<TagsFields_CreatedAt_Read>;
  update?: Maybe<TagsFields_CreatedAt_Update>;
};

export type TagsFields_CreatedAt_Create = {
  __typename?: 'TagsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_CreatedAt_Delete = {
  __typename?: 'TagsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_CreatedAt_Read = {
  __typename?: 'TagsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_CreatedAt_Update = {
  __typename?: 'TagsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Description = {
  __typename?: 'TagsFields_description';
  create?: Maybe<TagsFields_Description_Create>;
  delete?: Maybe<TagsFields_Description_Delete>;
  read?: Maybe<TagsFields_Description_Read>;
  update?: Maybe<TagsFields_Description_Update>;
};

export type TagsFields_Description_Create = {
  __typename?: 'TagsFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Description_Delete = {
  __typename?: 'TagsFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Description_Read = {
  __typename?: 'TagsFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Description_Update = {
  __typename?: 'TagsFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Icon = {
  __typename?: 'TagsFields_icon';
  create?: Maybe<TagsFields_Icon_Create>;
  delete?: Maybe<TagsFields_Icon_Delete>;
  read?: Maybe<TagsFields_Icon_Read>;
  update?: Maybe<TagsFields_Icon_Update>;
};

export type TagsFields_Icon_Create = {
  __typename?: 'TagsFields_icon_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Icon_Delete = {
  __typename?: 'TagsFields_icon_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Icon_Read = {
  __typename?: 'TagsFields_icon_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Icon_Update = {
  __typename?: 'TagsFields_icon_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_IsActive = {
  __typename?: 'TagsFields_isActive';
  create?: Maybe<TagsFields_IsActive_Create>;
  delete?: Maybe<TagsFields_IsActive_Delete>;
  read?: Maybe<TagsFields_IsActive_Read>;
  update?: Maybe<TagsFields_IsActive_Update>;
};

export type TagsFields_IsActive_Create = {
  __typename?: 'TagsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_IsActive_Delete = {
  __typename?: 'TagsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_IsActive_Read = {
  __typename?: 'TagsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_IsActive_Update = {
  __typename?: 'TagsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Name = {
  __typename?: 'TagsFields_name';
  create?: Maybe<TagsFields_Name_Create>;
  delete?: Maybe<TagsFields_Name_Delete>;
  read?: Maybe<TagsFields_Name_Read>;
  update?: Maybe<TagsFields_Name_Update>;
};

export type TagsFields_Name_Create = {
  __typename?: 'TagsFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Name_Delete = {
  __typename?: 'TagsFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Name_Read = {
  __typename?: 'TagsFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_Name_Update = {
  __typename?: 'TagsFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_UpdatedAt = {
  __typename?: 'TagsFields_updatedAt';
  create?: Maybe<TagsFields_UpdatedAt_Create>;
  delete?: Maybe<TagsFields_UpdatedAt_Delete>;
  read?: Maybe<TagsFields_UpdatedAt_Read>;
  update?: Maybe<TagsFields_UpdatedAt_Update>;
};

export type TagsFields_UpdatedAt_Create = {
  __typename?: 'TagsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_UpdatedAt_Delete = {
  __typename?: 'TagsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_UpdatedAt_Read = {
  __typename?: 'TagsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_UpdatedAt_Update = {
  __typename?: 'TagsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_User = {
  __typename?: 'TagsFields_user';
  create?: Maybe<TagsFields_User_Create>;
  delete?: Maybe<TagsFields_User_Delete>;
  read?: Maybe<TagsFields_User_Read>;
  update?: Maybe<TagsFields_User_Update>;
};

export type TagsFields_User_Create = {
  __typename?: 'TagsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_User_Delete = {
  __typename?: 'TagsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_User_Read = {
  __typename?: 'TagsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TagsFields_User_Update = {
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
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  toAccount?: Maybe<Account>;
  type: Transaction_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum TransactionUpdate_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Transaction_Account_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_Amount_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_Attachments_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_Category_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_Date_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_IsActive_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Transaction_Note_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction_Person_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_Tags_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Transaction_ToAccount_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export enum Transaction_Type {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Transaction_Type_Input {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export enum Transaction_Type_MutationInput {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer'
}

export type Transaction_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Transaction_Type_Input>>>;
  equals?: InputMaybe<Transaction_Type_Input>;
  in?: InputMaybe<Array<InputMaybe<Transaction_Type_Input>>>;
  not_equals?: InputMaybe<Transaction_Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Transaction_Type_Input>>>;
};

export type Transaction_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Transaction_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Transaction_Where = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_Where_Or>>>;
  account?: InputMaybe<Transaction_Account_Operator>;
  amount?: InputMaybe<Transaction_Amount_Operator>;
  attachments?: InputMaybe<Transaction_Attachments_Operator>;
  category?: InputMaybe<Transaction_Category_Operator>;
  createdAt?: InputMaybe<Transaction_CreatedAt_Operator>;
  date?: InputMaybe<Transaction_Date_Operator>;
  id?: InputMaybe<Transaction_Id_Operator>;
  isActive?: InputMaybe<Transaction_IsActive_Operator>;
  note?: InputMaybe<Transaction_Note_Operator>;
  person?: InputMaybe<Transaction_Person_Operator>;
  tags?: InputMaybe<Transaction_Tags_Operator>;
  title?: InputMaybe<Transaction_Title_Operator>;
  toAccount?: InputMaybe<Transaction_ToAccount_Operator>;
  type?: InputMaybe<Transaction_Type_Operator>;
  updatedAt?: InputMaybe<Transaction_UpdatedAt_Operator>;
  user?: InputMaybe<Transaction_User_Operator>;
};

export type Transaction_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_Where_Or>>>;
  account?: InputMaybe<Transaction_Account_Operator>;
  amount?: InputMaybe<Transaction_Amount_Operator>;
  attachments?: InputMaybe<Transaction_Attachments_Operator>;
  category?: InputMaybe<Transaction_Category_Operator>;
  createdAt?: InputMaybe<Transaction_CreatedAt_Operator>;
  date?: InputMaybe<Transaction_Date_Operator>;
  id?: InputMaybe<Transaction_Id_Operator>;
  isActive?: InputMaybe<Transaction_IsActive_Operator>;
  note?: InputMaybe<Transaction_Note_Operator>;
  person?: InputMaybe<Transaction_Person_Operator>;
  tags?: InputMaybe<Transaction_Tags_Operator>;
  title?: InputMaybe<Transaction_Title_Operator>;
  toAccount?: InputMaybe<Transaction_ToAccount_Operator>;
  type?: InputMaybe<Transaction_Type_Operator>;
  updatedAt?: InputMaybe<Transaction_UpdatedAt_Operator>;
  user?: InputMaybe<Transaction_User_Operator>;
};

export type Transaction_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Transaction_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Transaction_Where_Or>>>;
  account?: InputMaybe<Transaction_Account_Operator>;
  amount?: InputMaybe<Transaction_Amount_Operator>;
  attachments?: InputMaybe<Transaction_Attachments_Operator>;
  category?: InputMaybe<Transaction_Category_Operator>;
  createdAt?: InputMaybe<Transaction_CreatedAt_Operator>;
  date?: InputMaybe<Transaction_Date_Operator>;
  id?: InputMaybe<Transaction_Id_Operator>;
  isActive?: InputMaybe<Transaction_IsActive_Operator>;
  note?: InputMaybe<Transaction_Note_Operator>;
  person?: InputMaybe<Transaction_Person_Operator>;
  tags?: InputMaybe<Transaction_Tags_Operator>;
  title?: InputMaybe<Transaction_Title_Operator>;
  toAccount?: InputMaybe<Transaction_ToAccount_Operator>;
  type?: InputMaybe<Transaction_Type_Operator>;
  updatedAt?: InputMaybe<Transaction_UpdatedAt_Operator>;
  user?: InputMaybe<Transaction_User_Operator>;
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
  account?: Maybe<TransactionsDocAccessFields_Account>;
  amount?: Maybe<TransactionsDocAccessFields_Amount>;
  attachments?: Maybe<TransactionsDocAccessFields_Attachments>;
  category?: Maybe<TransactionsDocAccessFields_Category>;
  createdAt?: Maybe<TransactionsDocAccessFields_CreatedAt>;
  date?: Maybe<TransactionsDocAccessFields_Date>;
  isActive?: Maybe<TransactionsDocAccessFields_IsActive>;
  note?: Maybe<TransactionsDocAccessFields_Note>;
  person?: Maybe<TransactionsDocAccessFields_Person>;
  tags?: Maybe<TransactionsDocAccessFields_Tags>;
  title?: Maybe<TransactionsDocAccessFields_Title>;
  toAccount?: Maybe<TransactionsDocAccessFields_ToAccount>;
  type?: Maybe<TransactionsDocAccessFields_Type>;
  updatedAt?: Maybe<TransactionsDocAccessFields_UpdatedAt>;
  user?: Maybe<TransactionsDocAccessFields_User>;
};

export type TransactionsDocAccessFields_Account = {
  __typename?: 'TransactionsDocAccessFields_account';
  create?: Maybe<TransactionsDocAccessFields_Account_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Account_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Account_Read>;
  update?: Maybe<TransactionsDocAccessFields_Account_Update>;
};

export type TransactionsDocAccessFields_Account_Create = {
  __typename?: 'TransactionsDocAccessFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Account_Delete = {
  __typename?: 'TransactionsDocAccessFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Account_Read = {
  __typename?: 'TransactionsDocAccessFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Account_Update = {
  __typename?: 'TransactionsDocAccessFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Amount = {
  __typename?: 'TransactionsDocAccessFields_amount';
  create?: Maybe<TransactionsDocAccessFields_Amount_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Amount_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Amount_Read>;
  update?: Maybe<TransactionsDocAccessFields_Amount_Update>;
};

export type TransactionsDocAccessFields_Amount_Create = {
  __typename?: 'TransactionsDocAccessFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Amount_Delete = {
  __typename?: 'TransactionsDocAccessFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Amount_Read = {
  __typename?: 'TransactionsDocAccessFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Amount_Update = {
  __typename?: 'TransactionsDocAccessFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Attachments = {
  __typename?: 'TransactionsDocAccessFields_attachments';
  create?: Maybe<TransactionsDocAccessFields_Attachments_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Attachments_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Attachments_Read>;
  update?: Maybe<TransactionsDocAccessFields_Attachments_Update>;
};

export type TransactionsDocAccessFields_Attachments_Create = {
  __typename?: 'TransactionsDocAccessFields_attachments_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Attachments_Delete = {
  __typename?: 'TransactionsDocAccessFields_attachments_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Attachments_Read = {
  __typename?: 'TransactionsDocAccessFields_attachments_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Attachments_Update = {
  __typename?: 'TransactionsDocAccessFields_attachments_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Category = {
  __typename?: 'TransactionsDocAccessFields_category';
  create?: Maybe<TransactionsDocAccessFields_Category_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Category_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Category_Read>;
  update?: Maybe<TransactionsDocAccessFields_Category_Update>;
};

export type TransactionsDocAccessFields_Category_Create = {
  __typename?: 'TransactionsDocAccessFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Category_Delete = {
  __typename?: 'TransactionsDocAccessFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Category_Read = {
  __typename?: 'TransactionsDocAccessFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Category_Update = {
  __typename?: 'TransactionsDocAccessFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_CreatedAt = {
  __typename?: 'TransactionsDocAccessFields_createdAt';
  create?: Maybe<TransactionsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<TransactionsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<TransactionsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<TransactionsDocAccessFields_CreatedAt_Update>;
};

export type TransactionsDocAccessFields_CreatedAt_Create = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_CreatedAt_Read = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_CreatedAt_Update = {
  __typename?: 'TransactionsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Date = {
  __typename?: 'TransactionsDocAccessFields_date';
  create?: Maybe<TransactionsDocAccessFields_Date_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Date_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Date_Read>;
  update?: Maybe<TransactionsDocAccessFields_Date_Update>;
};

export type TransactionsDocAccessFields_Date_Create = {
  __typename?: 'TransactionsDocAccessFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Date_Delete = {
  __typename?: 'TransactionsDocAccessFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Date_Read = {
  __typename?: 'TransactionsDocAccessFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Date_Update = {
  __typename?: 'TransactionsDocAccessFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_IsActive = {
  __typename?: 'TransactionsDocAccessFields_isActive';
  create?: Maybe<TransactionsDocAccessFields_IsActive_Create>;
  delete?: Maybe<TransactionsDocAccessFields_IsActive_Delete>;
  read?: Maybe<TransactionsDocAccessFields_IsActive_Read>;
  update?: Maybe<TransactionsDocAccessFields_IsActive_Update>;
};

export type TransactionsDocAccessFields_IsActive_Create = {
  __typename?: 'TransactionsDocAccessFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_IsActive_Delete = {
  __typename?: 'TransactionsDocAccessFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_IsActive_Read = {
  __typename?: 'TransactionsDocAccessFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_IsActive_Update = {
  __typename?: 'TransactionsDocAccessFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Note = {
  __typename?: 'TransactionsDocAccessFields_note';
  create?: Maybe<TransactionsDocAccessFields_Note_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Note_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Note_Read>;
  update?: Maybe<TransactionsDocAccessFields_Note_Update>;
};

export type TransactionsDocAccessFields_Note_Create = {
  __typename?: 'TransactionsDocAccessFields_note_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Note_Delete = {
  __typename?: 'TransactionsDocAccessFields_note_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Note_Read = {
  __typename?: 'TransactionsDocAccessFields_note_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Note_Update = {
  __typename?: 'TransactionsDocAccessFields_note_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Person = {
  __typename?: 'TransactionsDocAccessFields_person';
  create?: Maybe<TransactionsDocAccessFields_Person_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Person_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Person_Read>;
  update?: Maybe<TransactionsDocAccessFields_Person_Update>;
};

export type TransactionsDocAccessFields_Person_Create = {
  __typename?: 'TransactionsDocAccessFields_person_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Person_Delete = {
  __typename?: 'TransactionsDocAccessFields_person_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Person_Read = {
  __typename?: 'TransactionsDocAccessFields_person_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Person_Update = {
  __typename?: 'TransactionsDocAccessFields_person_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Tags = {
  __typename?: 'TransactionsDocAccessFields_tags';
  create?: Maybe<TransactionsDocAccessFields_Tags_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Tags_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Tags_Read>;
  update?: Maybe<TransactionsDocAccessFields_Tags_Update>;
};

export type TransactionsDocAccessFields_Tags_Create = {
  __typename?: 'TransactionsDocAccessFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Tags_Delete = {
  __typename?: 'TransactionsDocAccessFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Tags_Read = {
  __typename?: 'TransactionsDocAccessFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Tags_Update = {
  __typename?: 'TransactionsDocAccessFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Title = {
  __typename?: 'TransactionsDocAccessFields_title';
  create?: Maybe<TransactionsDocAccessFields_Title_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Title_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Title_Read>;
  update?: Maybe<TransactionsDocAccessFields_Title_Update>;
};

export type TransactionsDocAccessFields_Title_Create = {
  __typename?: 'TransactionsDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Title_Delete = {
  __typename?: 'TransactionsDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Title_Read = {
  __typename?: 'TransactionsDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Title_Update = {
  __typename?: 'TransactionsDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_ToAccount = {
  __typename?: 'TransactionsDocAccessFields_toAccount';
  create?: Maybe<TransactionsDocAccessFields_ToAccount_Create>;
  delete?: Maybe<TransactionsDocAccessFields_ToAccount_Delete>;
  read?: Maybe<TransactionsDocAccessFields_ToAccount_Read>;
  update?: Maybe<TransactionsDocAccessFields_ToAccount_Update>;
};

export type TransactionsDocAccessFields_ToAccount_Create = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_ToAccount_Delete = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_ToAccount_Read = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_ToAccount_Update = {
  __typename?: 'TransactionsDocAccessFields_toAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Type = {
  __typename?: 'TransactionsDocAccessFields_type';
  create?: Maybe<TransactionsDocAccessFields_Type_Create>;
  delete?: Maybe<TransactionsDocAccessFields_Type_Delete>;
  read?: Maybe<TransactionsDocAccessFields_Type_Read>;
  update?: Maybe<TransactionsDocAccessFields_Type_Update>;
};

export type TransactionsDocAccessFields_Type_Create = {
  __typename?: 'TransactionsDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Type_Delete = {
  __typename?: 'TransactionsDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Type_Read = {
  __typename?: 'TransactionsDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_Type_Update = {
  __typename?: 'TransactionsDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_UpdatedAt = {
  __typename?: 'TransactionsDocAccessFields_updatedAt';
  create?: Maybe<TransactionsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<TransactionsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<TransactionsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<TransactionsDocAccessFields_UpdatedAt_Update>;
};

export type TransactionsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'TransactionsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_User = {
  __typename?: 'TransactionsDocAccessFields_user';
  create?: Maybe<TransactionsDocAccessFields_User_Create>;
  delete?: Maybe<TransactionsDocAccessFields_User_Delete>;
  read?: Maybe<TransactionsDocAccessFields_User_Read>;
  update?: Maybe<TransactionsDocAccessFields_User_Update>;
};

export type TransactionsDocAccessFields_User_Create = {
  __typename?: 'TransactionsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_User_Delete = {
  __typename?: 'TransactionsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_User_Read = {
  __typename?: 'TransactionsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsDocAccessFields_User_Update = {
  __typename?: 'TransactionsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields = {
  __typename?: 'TransactionsFields';
  account?: Maybe<TransactionsFields_Account>;
  amount?: Maybe<TransactionsFields_Amount>;
  attachments?: Maybe<TransactionsFields_Attachments>;
  category?: Maybe<TransactionsFields_Category>;
  createdAt?: Maybe<TransactionsFields_CreatedAt>;
  date?: Maybe<TransactionsFields_Date>;
  isActive?: Maybe<TransactionsFields_IsActive>;
  note?: Maybe<TransactionsFields_Note>;
  person?: Maybe<TransactionsFields_Person>;
  tags?: Maybe<TransactionsFields_Tags>;
  title?: Maybe<TransactionsFields_Title>;
  toAccount?: Maybe<TransactionsFields_ToAccount>;
  type?: Maybe<TransactionsFields_Type>;
  updatedAt?: Maybe<TransactionsFields_UpdatedAt>;
  user?: Maybe<TransactionsFields_User>;
};

export type TransactionsFields_Account = {
  __typename?: 'TransactionsFields_account';
  create?: Maybe<TransactionsFields_Account_Create>;
  delete?: Maybe<TransactionsFields_Account_Delete>;
  read?: Maybe<TransactionsFields_Account_Read>;
  update?: Maybe<TransactionsFields_Account_Update>;
};

export type TransactionsFields_Account_Create = {
  __typename?: 'TransactionsFields_account_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Account_Delete = {
  __typename?: 'TransactionsFields_account_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Account_Read = {
  __typename?: 'TransactionsFields_account_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Account_Update = {
  __typename?: 'TransactionsFields_account_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Amount = {
  __typename?: 'TransactionsFields_amount';
  create?: Maybe<TransactionsFields_Amount_Create>;
  delete?: Maybe<TransactionsFields_Amount_Delete>;
  read?: Maybe<TransactionsFields_Amount_Read>;
  update?: Maybe<TransactionsFields_Amount_Update>;
};

export type TransactionsFields_Amount_Create = {
  __typename?: 'TransactionsFields_amount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Amount_Delete = {
  __typename?: 'TransactionsFields_amount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Amount_Read = {
  __typename?: 'TransactionsFields_amount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Amount_Update = {
  __typename?: 'TransactionsFields_amount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Attachments = {
  __typename?: 'TransactionsFields_attachments';
  create?: Maybe<TransactionsFields_Attachments_Create>;
  delete?: Maybe<TransactionsFields_Attachments_Delete>;
  read?: Maybe<TransactionsFields_Attachments_Read>;
  update?: Maybe<TransactionsFields_Attachments_Update>;
};

export type TransactionsFields_Attachments_Create = {
  __typename?: 'TransactionsFields_attachments_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Attachments_Delete = {
  __typename?: 'TransactionsFields_attachments_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Attachments_Read = {
  __typename?: 'TransactionsFields_attachments_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Attachments_Update = {
  __typename?: 'TransactionsFields_attachments_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Category = {
  __typename?: 'TransactionsFields_category';
  create?: Maybe<TransactionsFields_Category_Create>;
  delete?: Maybe<TransactionsFields_Category_Delete>;
  read?: Maybe<TransactionsFields_Category_Read>;
  update?: Maybe<TransactionsFields_Category_Update>;
};

export type TransactionsFields_Category_Create = {
  __typename?: 'TransactionsFields_category_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Category_Delete = {
  __typename?: 'TransactionsFields_category_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Category_Read = {
  __typename?: 'TransactionsFields_category_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Category_Update = {
  __typename?: 'TransactionsFields_category_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_CreatedAt = {
  __typename?: 'TransactionsFields_createdAt';
  create?: Maybe<TransactionsFields_CreatedAt_Create>;
  delete?: Maybe<TransactionsFields_CreatedAt_Delete>;
  read?: Maybe<TransactionsFields_CreatedAt_Read>;
  update?: Maybe<TransactionsFields_CreatedAt_Update>;
};

export type TransactionsFields_CreatedAt_Create = {
  __typename?: 'TransactionsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_CreatedAt_Delete = {
  __typename?: 'TransactionsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_CreatedAt_Read = {
  __typename?: 'TransactionsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_CreatedAt_Update = {
  __typename?: 'TransactionsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Date = {
  __typename?: 'TransactionsFields_date';
  create?: Maybe<TransactionsFields_Date_Create>;
  delete?: Maybe<TransactionsFields_Date_Delete>;
  read?: Maybe<TransactionsFields_Date_Read>;
  update?: Maybe<TransactionsFields_Date_Update>;
};

export type TransactionsFields_Date_Create = {
  __typename?: 'TransactionsFields_date_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Date_Delete = {
  __typename?: 'TransactionsFields_date_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Date_Read = {
  __typename?: 'TransactionsFields_date_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Date_Update = {
  __typename?: 'TransactionsFields_date_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_IsActive = {
  __typename?: 'TransactionsFields_isActive';
  create?: Maybe<TransactionsFields_IsActive_Create>;
  delete?: Maybe<TransactionsFields_IsActive_Delete>;
  read?: Maybe<TransactionsFields_IsActive_Read>;
  update?: Maybe<TransactionsFields_IsActive_Update>;
};

export type TransactionsFields_IsActive_Create = {
  __typename?: 'TransactionsFields_isActive_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_IsActive_Delete = {
  __typename?: 'TransactionsFields_isActive_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_IsActive_Read = {
  __typename?: 'TransactionsFields_isActive_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_IsActive_Update = {
  __typename?: 'TransactionsFields_isActive_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Note = {
  __typename?: 'TransactionsFields_note';
  create?: Maybe<TransactionsFields_Note_Create>;
  delete?: Maybe<TransactionsFields_Note_Delete>;
  read?: Maybe<TransactionsFields_Note_Read>;
  update?: Maybe<TransactionsFields_Note_Update>;
};

export type TransactionsFields_Note_Create = {
  __typename?: 'TransactionsFields_note_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Note_Delete = {
  __typename?: 'TransactionsFields_note_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Note_Read = {
  __typename?: 'TransactionsFields_note_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Note_Update = {
  __typename?: 'TransactionsFields_note_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Person = {
  __typename?: 'TransactionsFields_person';
  create?: Maybe<TransactionsFields_Person_Create>;
  delete?: Maybe<TransactionsFields_Person_Delete>;
  read?: Maybe<TransactionsFields_Person_Read>;
  update?: Maybe<TransactionsFields_Person_Update>;
};

export type TransactionsFields_Person_Create = {
  __typename?: 'TransactionsFields_person_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Person_Delete = {
  __typename?: 'TransactionsFields_person_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Person_Read = {
  __typename?: 'TransactionsFields_person_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Person_Update = {
  __typename?: 'TransactionsFields_person_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Tags = {
  __typename?: 'TransactionsFields_tags';
  create?: Maybe<TransactionsFields_Tags_Create>;
  delete?: Maybe<TransactionsFields_Tags_Delete>;
  read?: Maybe<TransactionsFields_Tags_Read>;
  update?: Maybe<TransactionsFields_Tags_Update>;
};

export type TransactionsFields_Tags_Create = {
  __typename?: 'TransactionsFields_tags_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Tags_Delete = {
  __typename?: 'TransactionsFields_tags_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Tags_Read = {
  __typename?: 'TransactionsFields_tags_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Tags_Update = {
  __typename?: 'TransactionsFields_tags_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Title = {
  __typename?: 'TransactionsFields_title';
  create?: Maybe<TransactionsFields_Title_Create>;
  delete?: Maybe<TransactionsFields_Title_Delete>;
  read?: Maybe<TransactionsFields_Title_Read>;
  update?: Maybe<TransactionsFields_Title_Update>;
};

export type TransactionsFields_Title_Create = {
  __typename?: 'TransactionsFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Title_Delete = {
  __typename?: 'TransactionsFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Title_Read = {
  __typename?: 'TransactionsFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Title_Update = {
  __typename?: 'TransactionsFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_ToAccount = {
  __typename?: 'TransactionsFields_toAccount';
  create?: Maybe<TransactionsFields_ToAccount_Create>;
  delete?: Maybe<TransactionsFields_ToAccount_Delete>;
  read?: Maybe<TransactionsFields_ToAccount_Read>;
  update?: Maybe<TransactionsFields_ToAccount_Update>;
};

export type TransactionsFields_ToAccount_Create = {
  __typename?: 'TransactionsFields_toAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_ToAccount_Delete = {
  __typename?: 'TransactionsFields_toAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_ToAccount_Read = {
  __typename?: 'TransactionsFields_toAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_ToAccount_Update = {
  __typename?: 'TransactionsFields_toAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Type = {
  __typename?: 'TransactionsFields_type';
  create?: Maybe<TransactionsFields_Type_Create>;
  delete?: Maybe<TransactionsFields_Type_Delete>;
  read?: Maybe<TransactionsFields_Type_Read>;
  update?: Maybe<TransactionsFields_Type_Update>;
};

export type TransactionsFields_Type_Create = {
  __typename?: 'TransactionsFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Type_Delete = {
  __typename?: 'TransactionsFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Type_Read = {
  __typename?: 'TransactionsFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_Type_Update = {
  __typename?: 'TransactionsFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_UpdatedAt = {
  __typename?: 'TransactionsFields_updatedAt';
  create?: Maybe<TransactionsFields_UpdatedAt_Create>;
  delete?: Maybe<TransactionsFields_UpdatedAt_Delete>;
  read?: Maybe<TransactionsFields_UpdatedAt_Read>;
  update?: Maybe<TransactionsFields_UpdatedAt_Update>;
};

export type TransactionsFields_UpdatedAt_Create = {
  __typename?: 'TransactionsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_UpdatedAt_Delete = {
  __typename?: 'TransactionsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_UpdatedAt_Read = {
  __typename?: 'TransactionsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_UpdatedAt_Update = {
  __typename?: 'TransactionsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_User = {
  __typename?: 'TransactionsFields_user';
  create?: Maybe<TransactionsFields_User_Create>;
  delete?: Maybe<TransactionsFields_User_Delete>;
  read?: Maybe<TransactionsFields_User_Read>;
  update?: Maybe<TransactionsFields_User_Update>;
};

export type TransactionsFields_User_Create = {
  __typename?: 'TransactionsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_User_Delete = {
  __typename?: 'TransactionsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_User_Read = {
  __typename?: 'TransactionsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type TransactionsFields_User_Update = {
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
  role?: Maybe<User_Role>;
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
  theme?: Maybe<UserSetting_Theme>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export enum UserSettingUpdate_Theme_MutationInput {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export type UserSetting_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserSetting_Currency_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_DefaultAccount_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserSetting_GeminiApiKey_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_Locale_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_Settings_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export enum UserSetting_Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export enum UserSetting_Theme_Input {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export enum UserSetting_Theme_MutationInput {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export type UserSetting_Theme_Operator = {
  all?: InputMaybe<Array<InputMaybe<UserSetting_Theme_Input>>>;
  equals?: InputMaybe<UserSetting_Theme_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<UserSetting_Theme_Input>>>;
  not_equals?: InputMaybe<UserSetting_Theme_Input>;
  not_in?: InputMaybe<Array<InputMaybe<UserSetting_Theme_Input>>>;
};

export type UserSetting_Timezone_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserSetting_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserSetting_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserSetting_Where = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_Where_Or>>>;
  createdAt?: InputMaybe<UserSetting_CreatedAt_Operator>;
  currency?: InputMaybe<UserSetting_Currency_Operator>;
  defaultAccount?: InputMaybe<UserSetting_DefaultAccount_Operator>;
  geminiApiKey?: InputMaybe<UserSetting_GeminiApiKey_Operator>;
  id?: InputMaybe<UserSetting_Id_Operator>;
  locale?: InputMaybe<UserSetting_Locale_Operator>;
  settings?: InputMaybe<UserSetting_Settings_Operator>;
  theme?: InputMaybe<UserSetting_Theme_Operator>;
  timezone?: InputMaybe<UserSetting_Timezone_Operator>;
  updatedAt?: InputMaybe<UserSetting_UpdatedAt_Operator>;
  user?: InputMaybe<UserSetting_User_Operator>;
};

export type UserSetting_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_Where_Or>>>;
  createdAt?: InputMaybe<UserSetting_CreatedAt_Operator>;
  currency?: InputMaybe<UserSetting_Currency_Operator>;
  defaultAccount?: InputMaybe<UserSetting_DefaultAccount_Operator>;
  geminiApiKey?: InputMaybe<UserSetting_GeminiApiKey_Operator>;
  id?: InputMaybe<UserSetting_Id_Operator>;
  locale?: InputMaybe<UserSetting_Locale_Operator>;
  settings?: InputMaybe<UserSetting_Settings_Operator>;
  theme?: InputMaybe<UserSetting_Theme_Operator>;
  timezone?: InputMaybe<UserSetting_Timezone_Operator>;
  updatedAt?: InputMaybe<UserSetting_UpdatedAt_Operator>;
  user?: InputMaybe<UserSetting_User_Operator>;
};

export type UserSetting_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<UserSetting_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserSetting_Where_Or>>>;
  createdAt?: InputMaybe<UserSetting_CreatedAt_Operator>;
  currency?: InputMaybe<UserSetting_Currency_Operator>;
  defaultAccount?: InputMaybe<UserSetting_DefaultAccount_Operator>;
  geminiApiKey?: InputMaybe<UserSetting_GeminiApiKey_Operator>;
  id?: InputMaybe<UserSetting_Id_Operator>;
  locale?: InputMaybe<UserSetting_Locale_Operator>;
  settings?: InputMaybe<UserSetting_Settings_Operator>;
  theme?: InputMaybe<UserSetting_Theme_Operator>;
  timezone?: InputMaybe<UserSetting_Timezone_Operator>;
  updatedAt?: InputMaybe<UserSetting_UpdatedAt_Operator>;
  user?: InputMaybe<UserSetting_User_Operator>;
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
  createdAt?: Maybe<UserSettingsDocAccessFields_CreatedAt>;
  currency?: Maybe<UserSettingsDocAccessFields_Currency>;
  defaultAccount?: Maybe<UserSettingsDocAccessFields_DefaultAccount>;
  geminiApiKey?: Maybe<UserSettingsDocAccessFields_GeminiApiKey>;
  locale?: Maybe<UserSettingsDocAccessFields_Locale>;
  settings?: Maybe<UserSettingsDocAccessFields_Settings>;
  theme?: Maybe<UserSettingsDocAccessFields_Theme>;
  timezone?: Maybe<UserSettingsDocAccessFields_Timezone>;
  updatedAt?: Maybe<UserSettingsDocAccessFields_UpdatedAt>;
  user?: Maybe<UserSettingsDocAccessFields_User>;
};

export type UserSettingsDocAccessFields_CreatedAt = {
  __typename?: 'UserSettingsDocAccessFields_createdAt';
  create?: Maybe<UserSettingsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<UserSettingsDocAccessFields_CreatedAt_Update>;
};

export type UserSettingsDocAccessFields_CreatedAt_Create = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_CreatedAt_Read = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_CreatedAt_Update = {
  __typename?: 'UserSettingsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Currency = {
  __typename?: 'UserSettingsDocAccessFields_currency';
  create?: Maybe<UserSettingsDocAccessFields_Currency_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_Currency_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_Currency_Read>;
  update?: Maybe<UserSettingsDocAccessFields_Currency_Update>;
};

export type UserSettingsDocAccessFields_Currency_Create = {
  __typename?: 'UserSettingsDocAccessFields_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Currency_Delete = {
  __typename?: 'UserSettingsDocAccessFields_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Currency_Read = {
  __typename?: 'UserSettingsDocAccessFields_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Currency_Update = {
  __typename?: 'UserSettingsDocAccessFields_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_DefaultAccount = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount';
  create?: Maybe<UserSettingsDocAccessFields_DefaultAccount_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_DefaultAccount_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_DefaultAccount_Read>;
  update?: Maybe<UserSettingsDocAccessFields_DefaultAccount_Update>;
};

export type UserSettingsDocAccessFields_DefaultAccount_Create = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_DefaultAccount_Delete = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_DefaultAccount_Read = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_DefaultAccount_Update = {
  __typename?: 'UserSettingsDocAccessFields_defaultAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_GeminiApiKey = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey';
  create?: Maybe<UserSettingsDocAccessFields_GeminiApiKey_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_GeminiApiKey_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_GeminiApiKey_Read>;
  update?: Maybe<UserSettingsDocAccessFields_GeminiApiKey_Update>;
};

export type UserSettingsDocAccessFields_GeminiApiKey_Create = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_GeminiApiKey_Delete = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_GeminiApiKey_Read = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_GeminiApiKey_Update = {
  __typename?: 'UserSettingsDocAccessFields_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Locale = {
  __typename?: 'UserSettingsDocAccessFields_locale';
  create?: Maybe<UserSettingsDocAccessFields_Locale_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_Locale_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_Locale_Read>;
  update?: Maybe<UserSettingsDocAccessFields_Locale_Update>;
};

export type UserSettingsDocAccessFields_Locale_Create = {
  __typename?: 'UserSettingsDocAccessFields_locale_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Locale_Delete = {
  __typename?: 'UserSettingsDocAccessFields_locale_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Locale_Read = {
  __typename?: 'UserSettingsDocAccessFields_locale_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Locale_Update = {
  __typename?: 'UserSettingsDocAccessFields_locale_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Settings = {
  __typename?: 'UserSettingsDocAccessFields_settings';
  create?: Maybe<UserSettingsDocAccessFields_Settings_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_Settings_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_Settings_Read>;
  update?: Maybe<UserSettingsDocAccessFields_Settings_Update>;
};

export type UserSettingsDocAccessFields_Settings_Create = {
  __typename?: 'UserSettingsDocAccessFields_settings_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Settings_Delete = {
  __typename?: 'UserSettingsDocAccessFields_settings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Settings_Read = {
  __typename?: 'UserSettingsDocAccessFields_settings_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Settings_Update = {
  __typename?: 'UserSettingsDocAccessFields_settings_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Theme = {
  __typename?: 'UserSettingsDocAccessFields_theme';
  create?: Maybe<UserSettingsDocAccessFields_Theme_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_Theme_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_Theme_Read>;
  update?: Maybe<UserSettingsDocAccessFields_Theme_Update>;
};

export type UserSettingsDocAccessFields_Theme_Create = {
  __typename?: 'UserSettingsDocAccessFields_theme_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Theme_Delete = {
  __typename?: 'UserSettingsDocAccessFields_theme_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Theme_Read = {
  __typename?: 'UserSettingsDocAccessFields_theme_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Theme_Update = {
  __typename?: 'UserSettingsDocAccessFields_theme_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Timezone = {
  __typename?: 'UserSettingsDocAccessFields_timezone';
  create?: Maybe<UserSettingsDocAccessFields_Timezone_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_Timezone_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_Timezone_Read>;
  update?: Maybe<UserSettingsDocAccessFields_Timezone_Update>;
};

export type UserSettingsDocAccessFields_Timezone_Create = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Timezone_Delete = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Timezone_Read = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_Timezone_Update = {
  __typename?: 'UserSettingsDocAccessFields_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_UpdatedAt = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt';
  create?: Maybe<UserSettingsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<UserSettingsDocAccessFields_UpdatedAt_Update>;
};

export type UserSettingsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'UserSettingsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_User = {
  __typename?: 'UserSettingsDocAccessFields_user';
  create?: Maybe<UserSettingsDocAccessFields_User_Create>;
  delete?: Maybe<UserSettingsDocAccessFields_User_Delete>;
  read?: Maybe<UserSettingsDocAccessFields_User_Read>;
  update?: Maybe<UserSettingsDocAccessFields_User_Update>;
};

export type UserSettingsDocAccessFields_User_Create = {
  __typename?: 'UserSettingsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_User_Delete = {
  __typename?: 'UserSettingsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_User_Read = {
  __typename?: 'UserSettingsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsDocAccessFields_User_Update = {
  __typename?: 'UserSettingsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields = {
  __typename?: 'UserSettingsFields';
  createdAt?: Maybe<UserSettingsFields_CreatedAt>;
  currency?: Maybe<UserSettingsFields_Currency>;
  defaultAccount?: Maybe<UserSettingsFields_DefaultAccount>;
  geminiApiKey?: Maybe<UserSettingsFields_GeminiApiKey>;
  locale?: Maybe<UserSettingsFields_Locale>;
  settings?: Maybe<UserSettingsFields_Settings>;
  theme?: Maybe<UserSettingsFields_Theme>;
  timezone?: Maybe<UserSettingsFields_Timezone>;
  updatedAt?: Maybe<UserSettingsFields_UpdatedAt>;
  user?: Maybe<UserSettingsFields_User>;
};

export type UserSettingsFields_CreatedAt = {
  __typename?: 'UserSettingsFields_createdAt';
  create?: Maybe<UserSettingsFields_CreatedAt_Create>;
  delete?: Maybe<UserSettingsFields_CreatedAt_Delete>;
  read?: Maybe<UserSettingsFields_CreatedAt_Read>;
  update?: Maybe<UserSettingsFields_CreatedAt_Update>;
};

export type UserSettingsFields_CreatedAt_Create = {
  __typename?: 'UserSettingsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_CreatedAt_Delete = {
  __typename?: 'UserSettingsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_CreatedAt_Read = {
  __typename?: 'UserSettingsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_CreatedAt_Update = {
  __typename?: 'UserSettingsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Currency = {
  __typename?: 'UserSettingsFields_currency';
  create?: Maybe<UserSettingsFields_Currency_Create>;
  delete?: Maybe<UserSettingsFields_Currency_Delete>;
  read?: Maybe<UserSettingsFields_Currency_Read>;
  update?: Maybe<UserSettingsFields_Currency_Update>;
};

export type UserSettingsFields_Currency_Create = {
  __typename?: 'UserSettingsFields_currency_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Currency_Delete = {
  __typename?: 'UserSettingsFields_currency_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Currency_Read = {
  __typename?: 'UserSettingsFields_currency_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Currency_Update = {
  __typename?: 'UserSettingsFields_currency_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_DefaultAccount = {
  __typename?: 'UserSettingsFields_defaultAccount';
  create?: Maybe<UserSettingsFields_DefaultAccount_Create>;
  delete?: Maybe<UserSettingsFields_DefaultAccount_Delete>;
  read?: Maybe<UserSettingsFields_DefaultAccount_Read>;
  update?: Maybe<UserSettingsFields_DefaultAccount_Update>;
};

export type UserSettingsFields_DefaultAccount_Create = {
  __typename?: 'UserSettingsFields_defaultAccount_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_DefaultAccount_Delete = {
  __typename?: 'UserSettingsFields_defaultAccount_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_DefaultAccount_Read = {
  __typename?: 'UserSettingsFields_defaultAccount_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_DefaultAccount_Update = {
  __typename?: 'UserSettingsFields_defaultAccount_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_GeminiApiKey = {
  __typename?: 'UserSettingsFields_geminiApiKey';
  create?: Maybe<UserSettingsFields_GeminiApiKey_Create>;
  delete?: Maybe<UserSettingsFields_GeminiApiKey_Delete>;
  read?: Maybe<UserSettingsFields_GeminiApiKey_Read>;
  update?: Maybe<UserSettingsFields_GeminiApiKey_Update>;
};

export type UserSettingsFields_GeminiApiKey_Create = {
  __typename?: 'UserSettingsFields_geminiApiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_GeminiApiKey_Delete = {
  __typename?: 'UserSettingsFields_geminiApiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_GeminiApiKey_Read = {
  __typename?: 'UserSettingsFields_geminiApiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_GeminiApiKey_Update = {
  __typename?: 'UserSettingsFields_geminiApiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Locale = {
  __typename?: 'UserSettingsFields_locale';
  create?: Maybe<UserSettingsFields_Locale_Create>;
  delete?: Maybe<UserSettingsFields_Locale_Delete>;
  read?: Maybe<UserSettingsFields_Locale_Read>;
  update?: Maybe<UserSettingsFields_Locale_Update>;
};

export type UserSettingsFields_Locale_Create = {
  __typename?: 'UserSettingsFields_locale_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Locale_Delete = {
  __typename?: 'UserSettingsFields_locale_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Locale_Read = {
  __typename?: 'UserSettingsFields_locale_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Locale_Update = {
  __typename?: 'UserSettingsFields_locale_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Settings = {
  __typename?: 'UserSettingsFields_settings';
  create?: Maybe<UserSettingsFields_Settings_Create>;
  delete?: Maybe<UserSettingsFields_Settings_Delete>;
  read?: Maybe<UserSettingsFields_Settings_Read>;
  update?: Maybe<UserSettingsFields_Settings_Update>;
};

export type UserSettingsFields_Settings_Create = {
  __typename?: 'UserSettingsFields_settings_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Settings_Delete = {
  __typename?: 'UserSettingsFields_settings_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Settings_Read = {
  __typename?: 'UserSettingsFields_settings_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Settings_Update = {
  __typename?: 'UserSettingsFields_settings_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Theme = {
  __typename?: 'UserSettingsFields_theme';
  create?: Maybe<UserSettingsFields_Theme_Create>;
  delete?: Maybe<UserSettingsFields_Theme_Delete>;
  read?: Maybe<UserSettingsFields_Theme_Read>;
  update?: Maybe<UserSettingsFields_Theme_Update>;
};

export type UserSettingsFields_Theme_Create = {
  __typename?: 'UserSettingsFields_theme_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Theme_Delete = {
  __typename?: 'UserSettingsFields_theme_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Theme_Read = {
  __typename?: 'UserSettingsFields_theme_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Theme_Update = {
  __typename?: 'UserSettingsFields_theme_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Timezone = {
  __typename?: 'UserSettingsFields_timezone';
  create?: Maybe<UserSettingsFields_Timezone_Create>;
  delete?: Maybe<UserSettingsFields_Timezone_Delete>;
  read?: Maybe<UserSettingsFields_Timezone_Read>;
  update?: Maybe<UserSettingsFields_Timezone_Update>;
};

export type UserSettingsFields_Timezone_Create = {
  __typename?: 'UserSettingsFields_timezone_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Timezone_Delete = {
  __typename?: 'UserSettingsFields_timezone_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Timezone_Read = {
  __typename?: 'UserSettingsFields_timezone_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_Timezone_Update = {
  __typename?: 'UserSettingsFields_timezone_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_UpdatedAt = {
  __typename?: 'UserSettingsFields_updatedAt';
  create?: Maybe<UserSettingsFields_UpdatedAt_Create>;
  delete?: Maybe<UserSettingsFields_UpdatedAt_Delete>;
  read?: Maybe<UserSettingsFields_UpdatedAt_Read>;
  update?: Maybe<UserSettingsFields_UpdatedAt_Update>;
};

export type UserSettingsFields_UpdatedAt_Create = {
  __typename?: 'UserSettingsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_UpdatedAt_Delete = {
  __typename?: 'UserSettingsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_UpdatedAt_Read = {
  __typename?: 'UserSettingsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_UpdatedAt_Update = {
  __typename?: 'UserSettingsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_User = {
  __typename?: 'UserSettingsFields_user';
  create?: Maybe<UserSettingsFields_User_Create>;
  delete?: Maybe<UserSettingsFields_User_Delete>;
  read?: Maybe<UserSettingsFields_User_Read>;
  update?: Maybe<UserSettingsFields_User_Update>;
};

export type UserSettingsFields_User_Create = {
  __typename?: 'UserSettingsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_User_Delete = {
  __typename?: 'UserSettingsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_User_Read = {
  __typename?: 'UserSettingsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserSettingsFields_User_Update = {
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

export enum UserUpdate_Role_MutationInput {
  Admin = 'admin',
  System = 'system',
  User = 'user'
}

export type User_Sessions = {
  __typename?: 'User_Sessions';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type User_Avatar_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type User_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Email_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type User_Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum User_Role {
  Admin = 'admin',
  System = 'system',
  User = 'user'
}

export enum User_Role_Input {
  Admin = 'admin',
  System = 'system',
  User = 'user'
}

export enum User_Role_MutationInput {
  Admin = 'admin',
  System = 'system',
  User = 'user'
}

export type User_Role_Operator = {
  all?: InputMaybe<Array<InputMaybe<User_Role_Input>>>;
  equals?: InputMaybe<User_Role_Input>;
  in?: InputMaybe<Array<InputMaybe<User_Role_Input>>>;
  not_equals?: InputMaybe<User_Role_Input>;
  not_in?: InputMaybe<Array<InputMaybe<User_Role_Input>>>;
};

export type User_Sessions__CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Sessions__ExpiresAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Sessions__Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Where = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  role?: InputMaybe<User_Role_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
};

export type User_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  role?: InputMaybe<User_Role_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
};

export type User_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  role?: InputMaybe<User_Role_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
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
  avatar?: Maybe<UsersDocAccessFields_Avatar>;
  createdAt?: Maybe<UsersDocAccessFields_CreatedAt>;
  email?: Maybe<UsersDocAccessFields_Email>;
  name?: Maybe<UsersDocAccessFields_Name>;
  role?: Maybe<UsersDocAccessFields_Role>;
  sessions?: Maybe<UsersDocAccessFields_Sessions>;
  updatedAt?: Maybe<UsersDocAccessFields_UpdatedAt>;
};

export type UsersDocAccessFields_Avatar = {
  __typename?: 'UsersDocAccessFields_avatar';
  create?: Maybe<UsersDocAccessFields_Avatar_Create>;
  delete?: Maybe<UsersDocAccessFields_Avatar_Delete>;
  read?: Maybe<UsersDocAccessFields_Avatar_Read>;
  update?: Maybe<UsersDocAccessFields_Avatar_Update>;
};

export type UsersDocAccessFields_Avatar_Create = {
  __typename?: 'UsersDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Delete = {
  __typename?: 'UsersDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Read = {
  __typename?: 'UsersDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Update = {
  __typename?: 'UsersDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt = {
  __typename?: 'UsersDocAccessFields_createdAt';
  create?: Maybe<UsersDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_CreatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_CreatedAt_Update>;
};

export type UsersDocAccessFields_CreatedAt_Create = {
  __typename?: 'UsersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Read = {
  __typename?: 'UsersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Update = {
  __typename?: 'UsersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email = {
  __typename?: 'UsersDocAccessFields_email';
  create?: Maybe<UsersDocAccessFields_Email_Create>;
  delete?: Maybe<UsersDocAccessFields_Email_Delete>;
  read?: Maybe<UsersDocAccessFields_Email_Read>;
  update?: Maybe<UsersDocAccessFields_Email_Update>;
};

export type UsersDocAccessFields_Email_Create = {
  __typename?: 'UsersDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Delete = {
  __typename?: 'UsersDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Read = {
  __typename?: 'UsersDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Update = {
  __typename?: 'UsersDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name = {
  __typename?: 'UsersDocAccessFields_name';
  create?: Maybe<UsersDocAccessFields_Name_Create>;
  delete?: Maybe<UsersDocAccessFields_Name_Delete>;
  read?: Maybe<UsersDocAccessFields_Name_Read>;
  update?: Maybe<UsersDocAccessFields_Name_Update>;
};

export type UsersDocAccessFields_Name_Create = {
  __typename?: 'UsersDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Delete = {
  __typename?: 'UsersDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Read = {
  __typename?: 'UsersDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Update = {
  __typename?: 'UsersDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Role = {
  __typename?: 'UsersDocAccessFields_role';
  create?: Maybe<UsersDocAccessFields_Role_Create>;
  delete?: Maybe<UsersDocAccessFields_Role_Delete>;
  read?: Maybe<UsersDocAccessFields_Role_Read>;
  update?: Maybe<UsersDocAccessFields_Role_Update>;
};

export type UsersDocAccessFields_Role_Create = {
  __typename?: 'UsersDocAccessFields_role_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Role_Delete = {
  __typename?: 'UsersDocAccessFields_role_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Role_Read = {
  __typename?: 'UsersDocAccessFields_role_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Role_Update = {
  __typename?: 'UsersDocAccessFields_role_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions = {
  __typename?: 'UsersDocAccessFields_sessions';
  create?: Maybe<UsersDocAccessFields_Sessions_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_Delete>;
  fields?: Maybe<UsersDocAccessFields_Sessions_Fields>;
  read?: Maybe<UsersDocAccessFields_Sessions_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_Update>;
};

export type UsersDocAccessFields_Sessions_Create = {
  __typename?: 'UsersDocAccessFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Fields = {
  __typename?: 'UsersDocAccessFields_sessions_Fields';
  createdAt?: Maybe<UsersDocAccessFields_Sessions_CreatedAt>;
  expiresAt?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt>;
  id?: Maybe<UsersDocAccessFields_Sessions_Id>;
};

export type UsersDocAccessFields_Sessions_Read = {
  __typename?: 'UsersDocAccessFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Update = {
  __typename?: 'UsersDocAccessFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt';
  create?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Update>;
};

export type UsersDocAccessFields_Sessions_CreatedAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt';
  create?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Update>;
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id = {
  __typename?: 'UsersDocAccessFields_sessions_id';
  create?: Maybe<UsersDocAccessFields_Sessions_Id_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_Id_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_Id_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_Id_Update>;
};

export type UsersDocAccessFields_Sessions_Id_Create = {
  __typename?: 'UsersDocAccessFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Read = {
  __typename?: 'UsersDocAccessFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Update = {
  __typename?: 'UsersDocAccessFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt = {
  __typename?: 'UsersDocAccessFields_updatedAt';
  create?: Maybe<UsersDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_UpdatedAt_Update>;
};

export type UsersDocAccessFields_UpdatedAt_Create = {
  __typename?: 'UsersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Read = {
  __typename?: 'UsersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Update = {
  __typename?: 'UsersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields = {
  __typename?: 'UsersFields';
  avatar?: Maybe<UsersFields_Avatar>;
  createdAt?: Maybe<UsersFields_CreatedAt>;
  email?: Maybe<UsersFields_Email>;
  name?: Maybe<UsersFields_Name>;
  role?: Maybe<UsersFields_Role>;
  sessions?: Maybe<UsersFields_Sessions>;
  updatedAt?: Maybe<UsersFields_UpdatedAt>;
};

export type UsersFields_Avatar = {
  __typename?: 'UsersFields_avatar';
  create?: Maybe<UsersFields_Avatar_Create>;
  delete?: Maybe<UsersFields_Avatar_Delete>;
  read?: Maybe<UsersFields_Avatar_Read>;
  update?: Maybe<UsersFields_Avatar_Update>;
};

export type UsersFields_Avatar_Create = {
  __typename?: 'UsersFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Delete = {
  __typename?: 'UsersFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Read = {
  __typename?: 'UsersFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Update = {
  __typename?: 'UsersFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt = {
  __typename?: 'UsersFields_createdAt';
  create?: Maybe<UsersFields_CreatedAt_Create>;
  delete?: Maybe<UsersFields_CreatedAt_Delete>;
  read?: Maybe<UsersFields_CreatedAt_Read>;
  update?: Maybe<UsersFields_CreatedAt_Update>;
};

export type UsersFields_CreatedAt_Create = {
  __typename?: 'UsersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Delete = {
  __typename?: 'UsersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Read = {
  __typename?: 'UsersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Update = {
  __typename?: 'UsersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email = {
  __typename?: 'UsersFields_email';
  create?: Maybe<UsersFields_Email_Create>;
  delete?: Maybe<UsersFields_Email_Delete>;
  read?: Maybe<UsersFields_Email_Read>;
  update?: Maybe<UsersFields_Email_Update>;
};

export type UsersFields_Email_Create = {
  __typename?: 'UsersFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Delete = {
  __typename?: 'UsersFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Read = {
  __typename?: 'UsersFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Update = {
  __typename?: 'UsersFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name = {
  __typename?: 'UsersFields_name';
  create?: Maybe<UsersFields_Name_Create>;
  delete?: Maybe<UsersFields_Name_Delete>;
  read?: Maybe<UsersFields_Name_Read>;
  update?: Maybe<UsersFields_Name_Update>;
};

export type UsersFields_Name_Create = {
  __typename?: 'UsersFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Delete = {
  __typename?: 'UsersFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Read = {
  __typename?: 'UsersFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Update = {
  __typename?: 'UsersFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Role = {
  __typename?: 'UsersFields_role';
  create?: Maybe<UsersFields_Role_Create>;
  delete?: Maybe<UsersFields_Role_Delete>;
  read?: Maybe<UsersFields_Role_Read>;
  update?: Maybe<UsersFields_Role_Update>;
};

export type UsersFields_Role_Create = {
  __typename?: 'UsersFields_role_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Role_Delete = {
  __typename?: 'UsersFields_role_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Role_Read = {
  __typename?: 'UsersFields_role_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Role_Update = {
  __typename?: 'UsersFields_role_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions = {
  __typename?: 'UsersFields_sessions';
  create?: Maybe<UsersFields_Sessions_Create>;
  delete?: Maybe<UsersFields_Sessions_Delete>;
  fields?: Maybe<UsersFields_Sessions_Fields>;
  read?: Maybe<UsersFields_Sessions_Read>;
  update?: Maybe<UsersFields_Sessions_Update>;
};

export type UsersFields_Sessions_Create = {
  __typename?: 'UsersFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Delete = {
  __typename?: 'UsersFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Fields = {
  __typename?: 'UsersFields_sessions_Fields';
  createdAt?: Maybe<UsersFields_Sessions_CreatedAt>;
  expiresAt?: Maybe<UsersFields_Sessions_ExpiresAt>;
  id?: Maybe<UsersFields_Sessions_Id>;
};

export type UsersFields_Sessions_Read = {
  __typename?: 'UsersFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Update = {
  __typename?: 'UsersFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt = {
  __typename?: 'UsersFields_sessions_createdAt';
  create?: Maybe<UsersFields_Sessions_CreatedAt_Create>;
  delete?: Maybe<UsersFields_Sessions_CreatedAt_Delete>;
  read?: Maybe<UsersFields_Sessions_CreatedAt_Read>;
  update?: Maybe<UsersFields_Sessions_CreatedAt_Update>;
};

export type UsersFields_Sessions_CreatedAt_Create = {
  __typename?: 'UsersFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Delete = {
  __typename?: 'UsersFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Read = {
  __typename?: 'UsersFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Update = {
  __typename?: 'UsersFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt = {
  __typename?: 'UsersFields_sessions_expiresAt';
  create?: Maybe<UsersFields_Sessions_ExpiresAt_Create>;
  delete?: Maybe<UsersFields_Sessions_ExpiresAt_Delete>;
  read?: Maybe<UsersFields_Sessions_ExpiresAt_Read>;
  update?: Maybe<UsersFields_Sessions_ExpiresAt_Update>;
};

export type UsersFields_Sessions_ExpiresAt_Create = {
  __typename?: 'UsersFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Delete = {
  __typename?: 'UsersFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Read = {
  __typename?: 'UsersFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Update = {
  __typename?: 'UsersFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id = {
  __typename?: 'UsersFields_sessions_id';
  create?: Maybe<UsersFields_Sessions_Id_Create>;
  delete?: Maybe<UsersFields_Sessions_Id_Delete>;
  read?: Maybe<UsersFields_Sessions_Id_Read>;
  update?: Maybe<UsersFields_Sessions_Id_Update>;
};

export type UsersFields_Sessions_Id_Create = {
  __typename?: 'UsersFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Delete = {
  __typename?: 'UsersFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Read = {
  __typename?: 'UsersFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Update = {
  __typename?: 'UsersFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt = {
  __typename?: 'UsersFields_updatedAt';
  create?: Maybe<UsersFields_UpdatedAt_Create>;
  delete?: Maybe<UsersFields_UpdatedAt_Delete>;
  read?: Maybe<UsersFields_UpdatedAt_Read>;
  update?: Maybe<UsersFields_UpdatedAt_Update>;
};

export type UsersFields_UpdatedAt_Create = {
  __typename?: 'UsersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Delete = {
  __typename?: 'UsersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Read = {
  __typename?: 'UsersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Update = {
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

export type AccountsAccess = {
  __typename?: 'accountsAccess';
  create?: Maybe<AccountsCreateAccess>;
  delete?: Maybe<AccountsDeleteAccess>;
  fields?: Maybe<AccountsFields>;
  read?: Maybe<AccountsReadAccess>;
  update?: Maybe<AccountsUpdateAccess>;
};

export type AccountsDocAccess = {
  __typename?: 'accountsDocAccess';
  create?: Maybe<AccountsCreateDocAccess>;
  delete?: Maybe<AccountsDeleteDocAccess>;
  fields?: Maybe<AccountsDocAccessFields>;
  read?: Maybe<AccountsReadDocAccess>;
  update?: Maybe<AccountsUpdateDocAccess>;
};

export type Ai_UsagesAccess = {
  __typename?: 'ai_usagesAccess';
  create?: Maybe<AiUsagesCreateAccess>;
  delete?: Maybe<AiUsagesDeleteAccess>;
  fields?: Maybe<AiUsagesFields>;
  read?: Maybe<AiUsagesReadAccess>;
  update?: Maybe<AiUsagesUpdateAccess>;
};

export type Ai_UsagesDocAccess = {
  __typename?: 'ai_usagesDocAccess';
  create?: Maybe<AiUsagesCreateDocAccess>;
  delete?: Maybe<AiUsagesDeleteDocAccess>;
  fields?: Maybe<AiUsagesDocAccessFields>;
  read?: Maybe<AiUsagesReadDocAccess>;
  update?: Maybe<AiUsagesUpdateDocAccess>;
};

export type AllMedia = {
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

export type App_SettingsAccess = {
  __typename?: 'app_settingsAccess';
  fields?: Maybe<AppSettingsFields>;
  read?: Maybe<AppSettingsReadAccess>;
  update?: Maybe<AppSettingsUpdateAccess>;
};

export type App_SettingsDocAccess = {
  __typename?: 'app_settingsDocAccess';
  fields?: Maybe<AppSettingsDocAccessFields>;
  read?: Maybe<AppSettingsReadDocAccess>;
  update?: Maybe<AppSettingsUpdateDocAccess>;
};

export type CategoriesAccess = {
  __typename?: 'categoriesAccess';
  create?: Maybe<CategoriesCreateAccess>;
  delete?: Maybe<CategoriesDeleteAccess>;
  fields?: Maybe<CategoriesFields>;
  read?: Maybe<CategoriesReadAccess>;
  update?: Maybe<CategoriesUpdateAccess>;
};

export type CategoriesDocAccess = {
  __typename?: 'categoriesDocAccess';
  create?: Maybe<CategoriesCreateDocAccess>;
  delete?: Maybe<CategoriesDeleteDocAccess>;
  fields?: Maybe<CategoriesDocAccessFields>;
  read?: Maybe<CategoriesReadDocAccess>;
  update?: Maybe<CategoriesUpdateDocAccess>;
};

export type CountAccounts = {
  __typename?: 'countAccounts';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountAiUsages = {
  __typename?: 'countAiUsages';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountCategories = {
  __typename?: 'countCategories';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountOauthAccounts = {
  __typename?: 'countOauthAccounts';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadKvs = {
  __typename?: 'countPayloadKvs';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadLockedDocuments = {
  __typename?: 'countPayloadLockedDocuments';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadMcpApiKeys = {
  __typename?: 'countPayloadMcpApiKeys';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadPreferences = {
  __typename?: 'countPayloadPreferences';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPeople = {
  __typename?: 'countPeople';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountReminders = {
  __typename?: 'countReminders';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountTags = {
  __typename?: 'countTags';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountTransactions = {
  __typename?: 'countTransactions';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountUserSettings = {
  __typename?: 'countUserSettings';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountUsers = {
  __typename?: 'countUsers';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountallMedia = {
  __typename?: 'countallMedia';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type MediaAccess = {
  __typename?: 'mediaAccess';
  create?: Maybe<MediaCreateAccess>;
  delete?: Maybe<MediaDeleteAccess>;
  fields?: Maybe<MediaFields>;
  read?: Maybe<MediaReadAccess>;
  update?: Maybe<MediaUpdateAccess>;
};

export type MediaDocAccess = {
  __typename?: 'mediaDocAccess';
  create?: Maybe<MediaCreateDocAccess>;
  delete?: Maybe<MediaDeleteDocAccess>;
  fields?: Maybe<MediaDocAccessFields>;
  read?: Maybe<MediaReadDocAccess>;
  update?: Maybe<MediaUpdateDocAccess>;
};

export type MutationAccountInput = {
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

export type MutationAccountUpdateInput = {
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

export type MutationAiUsageInput = {
  apiKeyType?: InputMaybe<AiUsage_ApiKeyType_MutationInput>;
  candidateTokens?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  latencyMs?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  promptTokens?: InputMaybe<Scalars['Float']['input']>;
  promptType: AiUsage_PromptType_MutationInput;
  status: AiUsage_Status_MutationInput;
  totalTokens?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAiUsageUpdateInput = {
  apiKeyType?: InputMaybe<AiUsageUpdate_ApiKeyType_MutationInput>;
  candidateTokens?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  latencyMs?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  promptTokens?: InputMaybe<Scalars['Float']['input']>;
  promptType?: InputMaybe<AiUsageUpdate_PromptType_MutationInput>;
  status?: InputMaybe<AiUsageUpdate_Status_MutationInput>;
  totalTokens?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAppSettingInput = {
  ai?: InputMaybe<MutationAppSetting_AiInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAppSetting_AiInput = {
  allowUserApiKey?: InputMaybe<Scalars['Boolean']['input']>;
  defaultModel?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  models?: InputMaybe<Array<InputMaybe<MutationAppSetting_Ai_ModelsInput>>>;
  perUserDailyLimit?: InputMaybe<Scalars['Float']['input']>;
  perUserMonthlyLimit?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationAppSetting_Ai_ModelsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MutationCategoryInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  type: Category_Type_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCategoryUpdateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryUpdate_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMediaInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<Media_EntityType_MutationInput>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Media_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationMediaUpdateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<MediaUpdate_EntityType_MutationInput>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaUpdate_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationOauthAccountInput = {
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

export type MutationOauthAccountUpdateInput = {
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

export type MutationPayloadKvInput = {
  data: Scalars['JSON']['input'];
  key: Scalars['String']['input'];
};

export type MutationPayloadKvUpdateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPayloadLockedDocumentInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocument_UserRelationshipInput>;
};

export type MutationPayloadLockedDocumentUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInput>;
};

export type MutationPayloadMcpApiKeyInput = {
  accounts?: InputMaybe<MutationPayloadMcpApiKey_AccountsInput>;
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiKeyIndex?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<MutationPayloadMcpApiKey_CategoriesInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enableAPIKey?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<MutationPayloadMcpApiKey_MediaInput>;
  payload_mcp_resource?: InputMaybe<MutationPayloadMcpApiKey_PayloadMcpResourceInput>;
  payload_mcp_tool?: InputMaybe<MutationPayloadMcpApiKey_PayloadMcpToolInput>;
  people?: InputMaybe<MutationPayloadMcpApiKey_PeopleInput>;
  reminders?: InputMaybe<MutationPayloadMcpApiKey_RemindersInput>;
  tags?: InputMaybe<MutationPayloadMcpApiKey_TagsInput>;
  transactions?: InputMaybe<MutationPayloadMcpApiKey_TransactionsInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  userSettings?: InputMaybe<MutationPayloadMcpApiKey_UserSettingsInput>;
  users?: InputMaybe<MutationPayloadMcpApiKey_UsersInput>;
};

export type MutationPayloadMcpApiKeyUpdateInput = {
  accounts?: InputMaybe<MutationPayloadMcpApiKeyUpdate_AccountsInput>;
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiKeyIndex?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<MutationPayloadMcpApiKeyUpdate_CategoriesInput>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enableAPIKey?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<MutationPayloadMcpApiKeyUpdate_MediaInput>;
  payload_mcp_resource?: InputMaybe<MutationPayloadMcpApiKeyUpdate_PayloadMcpResourceInput>;
  payload_mcp_tool?: InputMaybe<MutationPayloadMcpApiKeyUpdate_PayloadMcpToolInput>;
  people?: InputMaybe<MutationPayloadMcpApiKeyUpdate_PeopleInput>;
  reminders?: InputMaybe<MutationPayloadMcpApiKeyUpdate_RemindersInput>;
  tags?: InputMaybe<MutationPayloadMcpApiKeyUpdate_TagsInput>;
  transactions?: InputMaybe<MutationPayloadMcpApiKeyUpdate_TransactionsInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  userSettings?: InputMaybe<MutationPayloadMcpApiKeyUpdate_UserSettingsInput>;
  users?: InputMaybe<MutationPayloadMcpApiKeyUpdate_UsersInput>;
};

export type MutationPayloadMcpApiKeyUpdate_AccountsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_CategoriesInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_MediaInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_PayloadMcpResourceInput = {
  currencies?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['Boolean']['input']>;
  timezone?: InputMaybe<Scalars['Boolean']['input']>;
  timezones?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_PayloadMcpToolInput = {
  getDashboardSummary?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyPeople?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyTags?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_PeopleInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_RemindersInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_TagsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_TransactionsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_UserSettingsInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKeyUpdate_UsersInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_AccountsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_CategoriesInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_MediaInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_PayloadMcpResourceInput = {
  currencies?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['Boolean']['input']>;
  timezone?: InputMaybe<Scalars['Boolean']['input']>;
  timezones?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_PayloadMcpToolInput = {
  getDashboardSummary?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyPeople?: InputMaybe<Scalars['Boolean']['input']>;
  getMonthlyTags?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_PeopleInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_RemindersInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_TagsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_TransactionsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_UserSettingsInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadMcpApiKey_UsersInput = {
  find?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationPayloadPreferenceInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreference_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationPayloadPreferenceUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationPersonInput = {
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

export type MutationPersonUpdateInput = {
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

export type MutationReminderInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  completedDates?: InputMaybe<Array<InputMaybe<MutationReminder_CompletedDatesInput>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  lastTriggeredAt?: InputMaybe<Scalars['String']['input']>;
  member?: InputMaybe<Scalars['String']['input']>;
  nextDueDate?: InputMaybe<Scalars['String']['input']>;
  recurrencePeriod?: InputMaybe<Scalars['Float']['input']>;
  recurrenceType?: InputMaybe<Reminder_RecurrenceType_MutationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  type?: InputMaybe<Reminder_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationReminderUpdateInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  completedDates?: InputMaybe<Array<InputMaybe<MutationReminderUpdate_CompletedDatesInput>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  lastTriggeredAt?: InputMaybe<Scalars['String']['input']>;
  member?: InputMaybe<Scalars['String']['input']>;
  nextDueDate?: InputMaybe<Scalars['String']['input']>;
  recurrencePeriod?: InputMaybe<Scalars['Float']['input']>;
  recurrenceType?: InputMaybe<ReminderUpdate_RecurrenceType_MutationInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ReminderUpdate_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationReminderUpdate_CompletedDatesInput = {
  date: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationReminder_CompletedDatesInput = {
  date: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationTagInput = {
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

export type MutationTagUpdateInput = {
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

export type MutationTransactionInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['String']['input'];
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  toAccount?: InputMaybe<Scalars['String']['input']>;
  type: Transaction_Type_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationTransactionUpdateInput = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['String']['input']>;
  attachments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  toAccount?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionUpdate_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserInput = {
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
  role?: InputMaybe<User_Role_MutationInput>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<MutationUser_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserSettingInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultAccount?: InputMaybe<Scalars['String']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  theme?: InputMaybe<UserSetting_Theme_MutationInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserSettingUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultAccount?: InputMaybe<Scalars['String']['input']>;
  geminiApiKey?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  theme?: InputMaybe<UserSettingUpdate_Theme_MutationInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserUpdateInput = {
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
  role?: InputMaybe<UserUpdate_Role_MutationInput>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<MutationUserUpdate_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserUpdate_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type MutationUser_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type Oauth_AccountsAccess = {
  __typename?: 'oauth_accountsAccess';
  create?: Maybe<OauthAccountsCreateAccess>;
  delete?: Maybe<OauthAccountsDeleteAccess>;
  fields?: Maybe<OauthAccountsFields>;
  read?: Maybe<OauthAccountsReadAccess>;
  update?: Maybe<OauthAccountsUpdateAccess>;
};

export type Oauth_AccountsDocAccess = {
  __typename?: 'oauth_accountsDocAccess';
  create?: Maybe<OauthAccountsCreateDocAccess>;
  delete?: Maybe<OauthAccountsDeleteDocAccess>;
  fields?: Maybe<OauthAccountsDocAccessFields>;
  read?: Maybe<OauthAccountsReadDocAccess>;
  update?: Maybe<OauthAccountsUpdateDocAccess>;
};

export type Payload_KvAccess = {
  __typename?: 'payload_kvAccess';
  create?: Maybe<PayloadKvCreateAccess>;
  delete?: Maybe<PayloadKvDeleteAccess>;
  fields?: Maybe<PayloadKvFields>;
  read?: Maybe<PayloadKvReadAccess>;
  update?: Maybe<PayloadKvUpdateAccess>;
};

export type Payload_KvDocAccess = {
  __typename?: 'payload_kvDocAccess';
  create?: Maybe<PayloadKvCreateDocAccess>;
  delete?: Maybe<PayloadKvDeleteDocAccess>;
  fields?: Maybe<PayloadKvDocAccessFields>;
  read?: Maybe<PayloadKvReadDocAccess>;
  update?: Maybe<PayloadKvUpdateDocAccess>;
};

export type Payload_Locked_DocumentsAccess = {
  __typename?: 'payload_locked_documentsAccess';
  create?: Maybe<PayloadLockedDocumentsCreateAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteAccess>;
  fields?: Maybe<PayloadLockedDocumentsFields>;
  read?: Maybe<PayloadLockedDocumentsReadAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateAccess>;
};

export type Payload_Locked_DocumentsDocAccess = {
  __typename?: 'payload_locked_documentsDocAccess';
  create?: Maybe<PayloadLockedDocumentsCreateDocAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteDocAccess>;
  fields?: Maybe<PayloadLockedDocumentsDocAccessFields>;
  read?: Maybe<PayloadLockedDocumentsReadDocAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateDocAccess>;
};

export type Payload_Mcp_Api_KeysAccess = {
  __typename?: 'payload_mcp_api_keysAccess';
  create?: Maybe<PayloadMcpApiKeysCreateAccess>;
  delete?: Maybe<PayloadMcpApiKeysDeleteAccess>;
  fields?: Maybe<PayloadMcpApiKeysFields>;
  read?: Maybe<PayloadMcpApiKeysReadAccess>;
  unlock?: Maybe<PayloadMcpApiKeysUnlockAccess>;
  update?: Maybe<PayloadMcpApiKeysUpdateAccess>;
};

export type Payload_Mcp_Api_KeysDocAccess = {
  __typename?: 'payload_mcp_api_keysDocAccess';
  create?: Maybe<PayloadMcpApiKeysCreateDocAccess>;
  delete?: Maybe<PayloadMcpApiKeysDeleteDocAccess>;
  fields?: Maybe<PayloadMcpApiKeysDocAccessFields>;
  read?: Maybe<PayloadMcpApiKeysReadDocAccess>;
  unlock?: Maybe<PayloadMcpApiKeysUnlockDocAccess>;
  update?: Maybe<PayloadMcpApiKeysUpdateDocAccess>;
};

export type Payload_Mcp_Api_KeysJwt = {
  __typename?: 'payload_mcp_api_keysJWT';
  collection: Scalars['String']['output'];
};

export type Payload_Mcp_Api_KeysMe = {
  __typename?: 'payload_mcp_api_keysMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<PayloadMcpApiKey>;
};

export type Payload_Mcp_Api_KeysRefreshedPayloadMcpApiKey = {
  __typename?: 'payload_mcp_api_keysRefreshedPayloadMcpApiKey';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Payload_Mcp_Api_KeysJwt>;
};

export type Payload_PreferencesAccess = {
  __typename?: 'payload_preferencesAccess';
  create?: Maybe<PayloadPreferencesCreateAccess>;
  delete?: Maybe<PayloadPreferencesDeleteAccess>;
  fields?: Maybe<PayloadPreferencesFields>;
  read?: Maybe<PayloadPreferencesReadAccess>;
  update?: Maybe<PayloadPreferencesUpdateAccess>;
};

export type Payload_PreferencesDocAccess = {
  __typename?: 'payload_preferencesDocAccess';
  create?: Maybe<PayloadPreferencesCreateDocAccess>;
  delete?: Maybe<PayloadPreferencesDeleteDocAccess>;
  fields?: Maybe<PayloadPreferencesDocAccessFields>;
  read?: Maybe<PayloadPreferencesReadDocAccess>;
  update?: Maybe<PayloadPreferencesUpdateDocAccess>;
};

export type PeopleAccess = {
  __typename?: 'peopleAccess';
  create?: Maybe<PeopleCreateAccess>;
  delete?: Maybe<PeopleDeleteAccess>;
  fields?: Maybe<PeopleFields>;
  read?: Maybe<PeopleReadAccess>;
  update?: Maybe<PeopleUpdateAccess>;
};

export type PeopleDocAccess = {
  __typename?: 'peopleDocAccess';
  create?: Maybe<PeopleCreateDocAccess>;
  delete?: Maybe<PeopleDeleteDocAccess>;
  fields?: Maybe<PeopleDocAccessFields>;
  read?: Maybe<PeopleReadDocAccess>;
  update?: Maybe<PeopleUpdateDocAccess>;
};

export type RemindersAccess = {
  __typename?: 'remindersAccess';
  create?: Maybe<RemindersCreateAccess>;
  delete?: Maybe<RemindersDeleteAccess>;
  fields?: Maybe<RemindersFields>;
  read?: Maybe<RemindersReadAccess>;
  update?: Maybe<RemindersUpdateAccess>;
};

export type RemindersDocAccess = {
  __typename?: 'remindersDocAccess';
  create?: Maybe<RemindersCreateDocAccess>;
  delete?: Maybe<RemindersDeleteDocAccess>;
  fields?: Maybe<RemindersDocAccessFields>;
  read?: Maybe<RemindersReadDocAccess>;
  update?: Maybe<RemindersUpdateDocAccess>;
};

export type TagsAccess = {
  __typename?: 'tagsAccess';
  create?: Maybe<TagsCreateAccess>;
  delete?: Maybe<TagsDeleteAccess>;
  fields?: Maybe<TagsFields>;
  read?: Maybe<TagsReadAccess>;
  update?: Maybe<TagsUpdateAccess>;
};

export type TagsDocAccess = {
  __typename?: 'tagsDocAccess';
  create?: Maybe<TagsCreateDocAccess>;
  delete?: Maybe<TagsDeleteDocAccess>;
  fields?: Maybe<TagsDocAccessFields>;
  read?: Maybe<TagsReadDocAccess>;
  update?: Maybe<TagsUpdateDocAccess>;
};

export type TransactionsAccess = {
  __typename?: 'transactionsAccess';
  create?: Maybe<TransactionsCreateAccess>;
  delete?: Maybe<TransactionsDeleteAccess>;
  fields?: Maybe<TransactionsFields>;
  read?: Maybe<TransactionsReadAccess>;
  update?: Maybe<TransactionsUpdateAccess>;
};

export type TransactionsDocAccess = {
  __typename?: 'transactionsDocAccess';
  create?: Maybe<TransactionsCreateDocAccess>;
  delete?: Maybe<TransactionsDeleteDocAccess>;
  fields?: Maybe<TransactionsDocAccessFields>;
  read?: Maybe<TransactionsReadDocAccess>;
  update?: Maybe<TransactionsUpdateDocAccess>;
};

export type User_SettingsAccess = {
  __typename?: 'user_settingsAccess';
  create?: Maybe<UserSettingsCreateAccess>;
  delete?: Maybe<UserSettingsDeleteAccess>;
  fields?: Maybe<UserSettingsFields>;
  read?: Maybe<UserSettingsReadAccess>;
  update?: Maybe<UserSettingsUpdateAccess>;
};

export type User_SettingsDocAccess = {
  __typename?: 'user_settingsDocAccess';
  create?: Maybe<UserSettingsCreateDocAccess>;
  delete?: Maybe<UserSettingsDeleteDocAccess>;
  fields?: Maybe<UserSettingsDocAccessFields>;
  read?: Maybe<UserSettingsReadDocAccess>;
  update?: Maybe<UserSettingsUpdateDocAccess>;
};

export type UsersAccess = {
  __typename?: 'usersAccess';
  create?: Maybe<UsersCreateAccess>;
  delete?: Maybe<UsersDeleteAccess>;
  fields?: Maybe<UsersFields>;
  read?: Maybe<UsersReadAccess>;
  unlock?: Maybe<UsersUnlockAccess>;
  update?: Maybe<UsersUpdateAccess>;
};

export type UsersDocAccess = {
  __typename?: 'usersDocAccess';
  create?: Maybe<UsersCreateDocAccess>;
  delete?: Maybe<UsersDeleteDocAccess>;
  fields?: Maybe<UsersDocAccessFields>;
  read?: Maybe<UsersReadDocAccess>;
  unlock?: Maybe<UsersUnlockDocAccess>;
  update?: Maybe<UsersUpdateDocAccess>;
};

export type UsersJwt = {
  __typename?: 'usersJWT';
  collection: Scalars['String']['output'];
  email: Scalars['EmailAddress']['output'];
  role?: Maybe<UsersJwt_Role>;
};

export enum UsersJwt_Role {
  Admin = 'admin',
  System = 'system',
  User = 'user'
}

export type UsersLoginResult = {
  __typename?: 'usersLoginResult';
  exp?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersMe = {
  __typename?: 'usersMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersRefreshedUser = {
  __typename?: 'usersRefreshedUser';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UsersJwt>;
};

export type UsersResetPassword = {
  __typename?: 'usersResetPassword';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AccountFieldsFragment = { __typename?: 'Account', id: string, name: string, icon: string, bgColor?: string | null, color?: string | null, description?: string | null, isActive?: boolean | null, balance?: number | null, totalTransactions?: number | null, lastTransactionAt?: any | null, createdAt?: any | null, updatedAt?: any | null } & { ' $fragmentName'?: 'AccountFieldsFragment' };

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
  data: MutationAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: (
    { __typename?: 'Account' }
    & { ' $fragmentRefs'?: { 'AccountFieldsFragment': AccountFieldsFragment } }
  ) | null };

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationAccountUpdateInput;
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


export type GetMonthlyCategoriesQuery = { __typename?: 'Query', monthlyCategories?: { __typename?: 'MonthlyCategoriesResult', data?: Array<{ __typename?: 'CategoryActivity', id: string, name: string, amount: number, transactionCount: number, averagePerTransaction: number, icon?: string | null, color?: string | null, bgColor?: string | null } | null> | null, meta: { __typename?: 'MonthlyCategoriesMeta', month: number, year: number, monthName: string, totalExpenses: number } } | null };

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

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, type: Category_Type, icon: string, color?: string | null, bgColor?: string | null, description?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, parent?: { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null } | null } & { ' $fragmentName'?: 'CategoryFieldsFragment' };

export type GetCategoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Category_Where>;
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
  data: MutationCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationCategoryUpdateInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: { __typename?: 'Category', id: string } | null };

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
  data: MutationPersonInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
  ) | null };

export type UpdatePersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationPersonUpdateInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson?: (
    { __typename?: 'Person' }
    & { ' $fragmentRefs'?: { 'PersonFieldsFragment': PersonFieldsFragment } }
  ) | null };

export type DeletePersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson?: { __typename?: 'Person', id: string } | null };

export type ReminderFieldsFragment = { __typename?: 'Reminder', id: string, title: string, amount?: string | null, type?: Reminder_Type | null, date?: any | null, isRecurring?: boolean | null, recurrencePeriod?: number | null, recurrenceType?: Reminder_RecurrenceType | null, lastTriggeredAt?: any | null, nextDueDate?: any | null, archived?: boolean | null, createdAt?: any | null, updatedAt?: any | null, category?: { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null } | null, account?: { __typename?: 'Account', id: string, name: string, icon: string } | null, member?: { __typename?: 'Person', id: string, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null }> | null, completedDates?: Array<{ __typename?: 'Reminder_CompletedDates', date?: any | null }> | null } & { ' $fragmentName'?: 'ReminderFieldsFragment' };

export type GetRemindersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Reminder_Where>;
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
  data: MutationReminderInput;
}>;


export type CreateReminderMutation = { __typename?: 'Mutation', createReminder?: (
    { __typename?: 'Reminder' }
    & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
  ) | null };

export type UpdateReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationReminderUpdateInput;
}>;


export type UpdateReminderMutation = { __typename?: 'Mutation', updateReminder?: (
    { __typename?: 'Reminder' }
    & { ' $fragmentRefs'?: { 'ReminderFieldsFragment': ReminderFieldsFragment } }
  ) | null };

export type DeleteReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteReminderMutation = { __typename?: 'Mutation', deleteReminder?: { __typename?: 'Reminder', id: string } | null };

export type TagFieldsFragment = { __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null, description?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null } & { ' $fragmentName'?: 'TagFieldsFragment' };

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
  data: MutationTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
  ) | null };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationTagUpdateInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFieldsFragment': TagFieldsFragment } }
  ) | null };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag?: { __typename?: 'Tag', id: string } | null };

export type TransactionCategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null, type: Category_Type } & { ' $fragmentName'?: 'TransactionCategoryFieldsFragment' };

export type TransactionAccountFieldsFragment = { __typename?: 'Account', id: string, name: string, icon: string, bgColor?: string | null, color?: string | null } & { ' $fragmentName'?: 'TransactionAccountFieldsFragment' };

export type TransactionPersonFieldsFragment = { __typename?: 'Person', id: string, name: string } & { ' $fragmentName'?: 'TransactionPersonFieldsFragment' };

export type TransactionTagFieldsFragment = { __typename?: 'Tag', id: string, name: string, icon: string, color?: string | null, bgColor?: string | null } & { ' $fragmentName'?: 'TransactionTagFieldsFragment' };

export type TransactionFieldsFragment = { __typename?: 'Transaction', id: string, title: string, amount: string, date: any, type: Transaction_Type, note?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, category?: (
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
  where?: InputMaybe<Transaction_Where>;
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
  data: MutationTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction?: (
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  ) | null };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationTransactionUpdateInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction?: (
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  ) | null };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction?: { __typename?: 'Transaction', id: string } | null };

export type UserSettingsFieldsFragment = { __typename?: 'UserSetting', id: string, currency?: string | null, timezone?: string | null, locale?: string | null, theme?: UserSetting_Theme | null, geminiApiKey?: string | null, createdAt?: any | null, updatedAt?: any | null, defaultAccount?: { __typename?: 'Account', id: string, name: string, icon: string } | null } & { ' $fragmentName'?: 'UserSettingsFieldsFragment' };

export type GetUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSettingsQuery = { __typename?: 'Query', UserSettings?: { __typename?: 'UserSettings', docs: Array<(
      { __typename?: 'UserSetting' }
      & { ' $fragmentRefs'?: { 'UserSettingsFieldsFragment': UserSettingsFieldsFragment } }
    )> } | null };

export type UpdateUserSettingsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: MutationUserSettingUpdateInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSetting?: (
    { __typename?: 'UserSetting' }
    & { ' $fragmentRefs'?: { 'UserSettingsFieldsFragment': UserSettingsFieldsFragment } }
  ) | null };

export const AccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AccountFieldsFragment, unknown>;
export const CategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CategoryFieldsFragment, unknown>;
export const PersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PersonFieldsFragment, unknown>;
export const ReminderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReminderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reminder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isRecurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurrencePeriod"}},{"kind":"Field","name":{"kind":"Name","value":"recurrenceType"}},{"kind":"Field","name":{"kind":"Name","value":"lastTriggeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<ReminderFieldsFragment, unknown>;
export const TagFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<TagFieldsFragment, unknown>;
export const TransactionCategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<TransactionCategoryFieldsFragment, unknown>;
export const TransactionAccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<TransactionAccountFieldsFragment, unknown>;
export const TransactionPersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TransactionPersonFieldsFragment, unknown>;
export const TransactionTagFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]} as unknown as DocumentNode<TransactionTagFieldsFragment, unknown>;
export const TransactionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]} as unknown as DocumentNode<TransactionFieldsFragment, unknown>;
export const UserSettingsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<UserSettingsFieldsFragment, unknown>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationAccountUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactions"}},{"kind":"Field","name":{"kind":"Name","value":"lastTransactionAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const TextToTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TextToTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"textToTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"latencyMs"}},{"kind":"Field","name":{"kind":"Name","value":"usage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promptTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTokenCount"}}]}}]}}]}}]} as unknown as DocumentNode<TextToTransactionMutation, TextToTransactionMutationVariables>;
export const ImageToTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImageToTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageToTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"mimeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"latencyMs"}},{"kind":"Field","name":{"kind":"Name","value":"usage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promptTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesTokenCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTokenCount"}}]}}]}}]}}]} as unknown as DocumentNode<ImageToTransactionMutation, ImageToTransactionMutationVariables>;
export const GetDashboardSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"balanceChangePercent"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPulse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"expenses"}},{"kind":"Field","name":{"kind":"Name","value":"surplus"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardSummaryQuery, GetDashboardSummaryQueryVariables>;
export const GetMonthlyCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"averagePerTransaction"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyCategoriesQuery, GetMonthlyCategoriesQueryVariables>;
export const GetMonthlyTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransfers"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyTagsQuery, GetMonthlyTagsQueryVariables>;
export const GetMonthlyPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyPeople"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransactionCount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyPeopleQuery, GetMonthlyPeopleQueryVariables>;
export const GetWeeklyExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWeeklyExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sun"}},{"kind":"Field","name":{"kind":"Name","value":"mon"}},{"kind":"Field","name":{"kind":"Name","value":"tue"}},{"kind":"Field","name":{"kind":"Name","value":"wed"}},{"kind":"Field","name":{"kind":"Name","value":"thu"}},{"kind":"Field","name":{"kind":"Name","value":"fri"}},{"kind":"Field","name":{"kind":"Name","value":"sat"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<GetWeeklyExpensesQuery, GetWeeklyExpensesQueryVariables>;
export const GetMonthlyCalendarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyCalendar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyCalendar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"expenses"}},{"kind":"Field","name":{"kind":"Name","value":"transfers"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"monthName"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"totalIncome"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"totalTransfers"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyCalendarQuery, GetMonthlyCalendarQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Category_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationCategoryUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
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
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Tag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetTagQuery, GetTagQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTagUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<GetTransactionQuery, GetTransactionQueryVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationTransactionUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionTagFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPersonFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionTagFields"}}]}}]}}]} as unknown as DocumentNode<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const DeleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const GetUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<GetUserSettingsQuery, GetUserSettingsQueryVariables>;
export const UpdateUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"mutationUserSettingUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSetting"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"geminiApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;