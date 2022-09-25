import { api as appApi } from "../modules/app.generated";

export const api = appApi.enhanceEndpoints({
  addTagTypes: ["App"],
  endpoints: {
    appVars: {}
  }
});

export const { useAppVarsQuery } = api;
