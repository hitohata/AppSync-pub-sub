import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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
  demo?: Maybe<Array<Demo>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAddDemo?: Maybe<Demo>;
};


export type SubscriptionOnAddDemoArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MyMutationMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MyMutationMutation = { __typename?: 'Mutation', addDemo: { __typename?: 'Demo', datetime: any, description: string, id: string } };


export const MyMutationDocument = gql`
    mutation MyMutation($description: String = "", $id: ID = "") {
  addDemo(input: {description: $description, id: $id}) {
    datetime
    description
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    MyMutation(variables?: MyMutationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MyMutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MyMutationMutation>(MyMutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MyMutation', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;