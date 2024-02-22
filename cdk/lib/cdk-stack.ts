import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UserPool } from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync"
import * as path from "path";
import { RustFunction } from 'cargo-lambda-cdk'
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { GraphqlApi } from "aws-cdk-lib/aws-appsync";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = this.userPool();
    const pubFunction = this.pubFunction();
    const apiGatewayApi = this.apiGatewayApi(pubFunction);
    const gqlMutationFunction = this.gqlMutationFunction();
    const gqlApi = this.appSync(userPool);
    pubFunction.addEnvironment('URL', gqlApi.graphqlUrl);
    this.attachResolver(gqlMutationFunction, gqlApi);
    this.grantAccessToGql(gqlApi);
  }

  userPool() {
    return new UserPool(this, 'userPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      }
    })
  }

  apiGatewayApi(pubFunction: IFunction) {
    return new cdk.aws_apigateway.LambdaRestApi(this, 'apiGatewayApi', {
      handler: pubFunction
    })
  }

  gqlMutationFunction() {
    return new RustFunction(this, 'gqlMutationFunction', {
      functionName: "gql-mutation-function",
      manifestPath: path.join(__dirname, '../../lambdas/gql-mutation-function/Cargo.toml'),
      runtime: 'provided.al2023'
    })
  }

  pubFunction() {
    if (!process.env.KEY) throw Error("API KEY")
    return new NodejsFunction(this, 'pubFunction', {
      functionName: "pub-function",
      entry: path.join(__dirname, '../../lambdas/pub-function/src/index.ts'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      depsLockFilePath: path.join(
          __dirname,
          "../../lambdas/pub-function/package-lock.json",
      ),
      environment: {
        KEY: process.env.KEY!,
        REGION: this.region,
      }
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
        }, {
          typeName: 'Query',
          fieldName: 'demo',
        }
    ]

    for (const {typeName, fieldName}  of fields) {
      lambdaDataSource.createResolver(`${typeName}-${fieldName}`, {
        typeName,
        fieldName,
      })
    }
  }
  grantAccessToGql(gqlApi: GraphqlApi) {
    const role = new iam.Role(this, "lambda-role", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    gqlApi.grant(role, appsync.IamResource.custom("types/*"), "appsync:GraphQL");
  }
}
