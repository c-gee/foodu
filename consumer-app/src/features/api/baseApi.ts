import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { ClientError, GraphQLClient } from "graphql-request";

import { RootState } from "../../store";

export const client = new GraphQLClient("http://localhost:4000/api");

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery<Partial<ClientError>>({
    client,
    customErrors: ({ name, stack, response }) => {
      const errorMessage = response?.errors?.length
        ? response.errors[0]?.message
        : "Unknown error";

      return {
        name,
        message: errorMessage,
        stack
      };
    },
    prepareHeaders: (headers, { getState }) => {
      console.log("prepareHeaders called", headers);
      console.log("Root state", getState());
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    }
  }),
  endpoints: () => ({})
});
