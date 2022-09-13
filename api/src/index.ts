import * as dotenv from "dotenv";

dotenv.config();

import "json-bigint-patch";
import express from "express";
import { createServer } from "@graphql-yoga/node";
import { graphQLApp, GraphQLContext } from "./graphql";
import { prisma } from "./lib/db";
import { useGraphQLModules } from "@envelop/graphql-modules";

const port = Number(process.env.API_PORT || 4000);
const app = express();

const createContext = async (): Promise<GraphQLContext> => {
  return {
    prisma
  };
};

const graphQLServer = createServer({
  context: createContext(),
  plugins: [useGraphQLModules(graphQLApp)]
});

app.use("/api", graphQLServer);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/api`);
});
