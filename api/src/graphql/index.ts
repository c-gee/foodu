import { createApplication } from "graphql-modules";

import { PrismaClient, User } from "@prisma/client";

import errorsModule from "./modules/errors";
import scalarsModule from "./modules/scalars";
import userModule from "./modules/user";

export type GraphQLContext = {
  prisma: PrismaClient;
  currentUser: User | null;
};

export const graphQLApp = createApplication({
  modules: [errorsModule, scalarsModule, userModule]
});

export const schema = graphQLApp.schema;
