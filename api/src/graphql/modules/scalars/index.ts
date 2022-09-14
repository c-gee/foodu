import { createModule, gql } from "graphql-modules";
import { typeDefs } from "graphql-scalars";

export type EmptyResponse = { _?: boolean };

const gqlDocumentNodes = gql([...typeDefs]);

export const scalarsModule = createModule({
  id: "scalars-module",
  dirname: __dirname,
  typeDefs: gqlDocumentNodes
});
