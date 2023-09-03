/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
};

export type FolderItem = {
  __typename?: 'FolderItem';
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FolderItemType>;
};

export enum FolderItemType {
  Folder = 'FOLDER',
  Recipe = 'RECIPE'
}

export type Ingredient = {
  __typename?: 'Ingredient';
  amount?: Maybe<IngredientAmount>;
  name?: Maybe<Scalars['String']['output']>;
};

export type IngredientAmount = {
  __typename?: 'IngredientAmount';
  isNumeric?: Maybe<Scalars['Boolean']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type MapValue = {
  __typename?: 'MapValue';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  metadata?: Maybe<Array<Maybe<MapValue>>>;
  name?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<Array<Maybe<Step>>>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  folder?: Maybe<Array<Maybe<FolderItem>>>;
  recipe?: Maybe<Recipe>;
};


export type RootQueryFolderArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryRecipeArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

export type Step = {
  __typename?: 'Step';
  directions?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Maybe<Ingredient>>>;
};

export type ListFolderQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListFolderQuery = { __typename?: 'RootQuery', folder?: Array<{ __typename?: 'FolderItem', name?: string | null, type?: FolderItemType | null } | null> | null };

export type GetRecipeQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'RootQuery', recipe?: { __typename?: 'Recipe', name?: string | null, metadata?: Array<{ __typename?: 'MapValue', key?: string | null, value?: string | null } | null> | null, steps?: Array<{ __typename?: 'Step', directions?: string | null, ingredients?: Array<{ __typename?: 'Ingredient', name?: string | null, amount?: { __typename?: 'IngredientAmount', isNumeric?: boolean | null, quantity?: number | null, unit?: string | null } | null } | null> | null } | null> | null } | null };


export const ListFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<ListFolderQuery, ListFolderQueryVariables>;
export const GetRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeQuery, GetRecipeQueryVariables>;