import { createModule } from "graphql-modules";
import { typeDefs as scalarTypeDefs, resolvers } from "graphql-scalars";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const customScalars = loadFilesSync(join(__dirname, "./schema.graphql"));
const typeDefs = mergeTypeDefs([scalarTypeDefs.join("\n"), customScalars]);

const scalarsModule = createModule({
  id: "scalars-module",
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers: { ...resolvers }
});

export default scalarsModule;

export type EmptyResponse = { _?: boolean };
