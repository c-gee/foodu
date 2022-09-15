import { createModule, gql } from "graphql-modules";
import { typeDefs, resolvers } from "graphql-scalars";

export type EmptyResponse = { _?: boolean };

export const scalarsModule = createModule({
  id: "scalars-module",
  dirname: __dirname,
  typeDefs: [gql(typeDefs.join("\n"))],
  resolvers: { ...resolvers }
});
