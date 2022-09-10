import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

// export const typeDefs = loadFilesSync(join(__dirname, "./*.gql"));
// export const resolvers = loadFilesSync(join(__dirname, "./resolvers.ts"));

export const userModule = createModule({
  id: "user-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.gql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts"))
});
