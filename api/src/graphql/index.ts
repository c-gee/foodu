import { createApplication } from "graphql-modules";

import { PrismaClient, User } from "@prisma/client";

import errorsModule from "./modules/errors";
import scalarsModule from "./modules/scalars";
import baseModule from "./modules/base";
import userModule from "./modules/user";
import merchantModule from "./modules/merchant";

export type GraphQLContext = {
  prisma: PrismaClient;
  currentUser: User | null;
};

export const graphQLApp = createApplication({
  modules: [errorsModule, scalarsModule, baseModule, userModule, merchantModule]
});

export const schema = graphQLApp.schema;
