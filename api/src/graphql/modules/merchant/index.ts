import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const merchantModule = createModule({
  id: "merchant-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts"))
});

export default merchantModule;
