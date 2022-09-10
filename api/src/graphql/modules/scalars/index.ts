import { createModule, gql } from "graphql-modules";
import { typeDefs } from "graphql-scalars";

const gqlDocumentNodes = gql([...typeDefs]);

export const scalarsModule = createModule({
  id: "scalars-module",
  dirname: __dirname,
  typeDefs: gqlDocumentNodes
});
