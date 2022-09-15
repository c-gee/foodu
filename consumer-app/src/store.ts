import { configureStore } from "@reduxjs/toolkit";
import { api as UserApi } from "./features/modules/user.generated";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [UserApi.reducerPath]: UserApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
