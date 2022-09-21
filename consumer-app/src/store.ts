import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer
} from "@reduxjs/toolkit";

import { api as UserApi } from "./features/modules/user.generated";
import authReducer from "./features/auth/authSlice";
import appSlice from "./features/app/appSlice";

const combinedReducer = combineReducers({
  [UserApi.reducerPath]: UserApi.reducer,
  auth: authReducer,
  app: appSlice
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logOut") {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware)
});

export default store;
