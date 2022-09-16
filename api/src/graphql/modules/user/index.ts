import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { Prisma } from ".prisma/client/index";

export type IdentityData =
  | {
      name?: string;
      email?: string;
      picture?: string;
    }
  | Prisma.JsonValue;

const userModule = createModule({
  id: "user-module",
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, "./*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts"))
});

export default userModule;
