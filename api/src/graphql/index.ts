import { createApplication } from "graphql-modules";
import { scalarsModule } from "./modules/scalars";
import { userModule } from "./modules/user";
import { PrismaClient } from "@prisma/client";

export type GraphQLContext = {
  prisma: PrismaClient;
};

export const graphQLApp = createApplication({
  modules: [scalarsModule, userModule]
});

export const schema = graphQLApp.schema;
