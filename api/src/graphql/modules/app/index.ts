import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const appModule = createModule({
  id: "app-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts"))
});

export default appModule;
