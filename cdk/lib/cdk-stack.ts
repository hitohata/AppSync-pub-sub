import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {UserPool} from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync"
import * as path from "path";
import { RustFunction } from 'cargo-lambda-cdk'
import {IFunction} from "aws-cdk-lib/aws-lambda";
import {GraphqlApi} from "aws-cdk-lib/aws-appsync";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = this.userPool();
    const pubFunction = this.pubFunction();
    const gqlMutationFunction = this.gqlMutationFunction();
    const api = this.appSync(userPool);
    this.attachResolver(gqlMutationFunction, api);
  }

  userPool() {
    return new UserPool(this, 'userPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      }
    })
  }

  gqlMutationFunction() {
    return new RustFunction(this, 'gqlMutationFunction', {
      manifestPath: path.join(__dirname, '../../lambdas/gql-mutation-function/Cargo.toml'),
      runtime: 'provided.al2023'
    })
  }

  pubFunction() {
    return new RustFunction(this, 'pubFunction', {
      manifestPath: path.join(__dirname, '../../lambdas/pub-function/Cargo.toml'),
      runtime: 'provided.al2023'
    })
  }

  appSync(userPool: UserPool) {
    return new appsync.GraphqlApi(this, 'api', {
      name: "pub-sub",
      definition: appsync.Definition.fromFile(path.join(__dirname, '../../graphql/schema.graphql')),
      // authorizationConfig: {
      //   defaultAuthorization: {
      //
      //   }
      // }
    })
  }

  attachResolver(lambdaResolverFunction: IFunction, appSync: GraphqlApi) {

    const lambdaDataSource = appSync.addLambdaDataSource('lambda-resolver', lambdaResolverFunction);

    const fields: {typeName: string, fieldName: string}[] = [
        {
          typeName: 'Mutation',
          fieldName: 'addDemo',
        }
    ]

    for (const {typeName, fieldName}  of fields) {
      lambdaDataSource.createResolver(`${typeName}-${fieldName}`, {
        typeName,
        fieldName,
      })
    }
  }
}
