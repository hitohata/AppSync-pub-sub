
import type { CodegenConfig } from '@graphql-codegen/cli';
import * as path from "path";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
      path.join(__dirname, "../../graphql/schema.graphql"),
    path.join(__dirname, "./src/graphql/mutation.graphql")
  ],
  generates: {
    "src/generated/graphql.ts": {
      documents: [path.join(__dirname, "./src/graphql/mutation.graphql")],
      plugins: ["typescript", "typescript-operations", "typescript-graphql-request"]
    }
  }
};

export default config;
