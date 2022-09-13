import * as dotenv from "dotenv";

dotenv.config();

import "json-bigint-patch";
import express from "express";
import { createServer } from "@graphql-yoga/node";
import { useGraphQLModules } from "@envelop/graphql-modules";

import { graphQLApp } from "./graphql";
import { useContext } from "./envelops/useContext";

const { createContext } = useContext();

const port = Number(process.env.API_PORT || 4000);
const app = express();

const graphQLServer = createServer({
  context: (context) => createContext(context),
  plugins: [useGraphQLModules(graphQLApp)]
});

app.use("/api", graphQLServer);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/api`);
});
