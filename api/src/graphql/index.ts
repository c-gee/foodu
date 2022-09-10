import { createApplication } from "graphql-modules";
import { scalarsModule } from "./modules/scalars";
import { userModule } from "./modules/user";

export const graphQLApp = createApplication({
  modules: [scalarsModule, userModule]
});

export const schema = graphQLApp.schema;
