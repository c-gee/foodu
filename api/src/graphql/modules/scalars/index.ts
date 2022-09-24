/**
 * It's better to pick and choose to avoid name clashing when defining
 * your own enums like `Currency`.
 *    https://www.the-guild.dev/graphql/scalars/docs/quick-start
 */
import {
  BigIntTypeDefinition,
  DateTypeDefinition,
  DateTimeTypeDefinition
} from "graphql-scalars";
import {
  BigIntResolver,
  DateResolver,
  DateTimeResolver
} from "graphql-scalars";
import { createModule } from "graphql-modules";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const customScalars = loadFilesSync(join(__dirname, "./schema.graphql"));

const typeDefs = mergeTypeDefs([
  BigIntTypeDefinition,
  DateTypeDefinition,
  DateTimeTypeDefinition,
  customScalars
]);

const scalarsModule = createModule({
  id: "scalars-module",
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers: {
    BigInt: BigIntResolver,
    Date: DateResolver,
    DateTime: DateTimeResolver
  }
});

export default scalarsModule;
