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
  AWSDateTime: { input: any; output: any; }
};

export type Demo = {
  __typename?: 'Demo';
  datetime: Scalars['AWSDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type InputDemo = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDemo: Demo;
};


export type MutationAddDemoArgs = {
  input?: InputMaybe<InputDemo>;
};

export type Query = {
  __typename?: 'Query';
  demo: Demo;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAddDemo?: Maybe<Demo>;
};


export type SubscriptionOnAddDemoArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type GetDemoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDemoQuery = { __typename?: 'Query', demo: { __typename?: 'Demo', description: string, datetime: any, id: string } };

export type DemoSubscriptionSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DemoSubscriptionSubscription = { __typename?: 'Subscription', onAddDemo?: { __typename?: 'Demo', datetime: any, description: string, id: string } | null };


export const GetDemoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDemo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"demo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetDemoQuery, GetDemoQueryVariables>;
export const DemoSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"DemoSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onAddDemo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DemoSubscriptionSubscription, DemoSubscriptionSubscriptionVariables>;