import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const enums = loadFilesSync(join(__dirname, "./schema.graphql"));

const enumsModule = createModule({
  id: "enums-module",
  dirname: __dirname,
  typeDefs: enums
});

export default enumsModule;
