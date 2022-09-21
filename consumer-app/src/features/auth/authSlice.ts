import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../graphql/types.generated";

export type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isUserLoaded: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isUserLoaded: false,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthTokens(state, action: PayloadAction<Tokens>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserData(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setUserLoaded(state, action: PayloadAction<boolean>) {
      state.isUserLoaded = action.payload;
    },
    setUserAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    resetAuth() {
      return initialState;
    }
  }
});

export const {
  loadAuthTokens,
  setUserLoaded,
  setUserData,
  setUserAuthenticated,
  resetAuth
} = authSlice.actions;

export default authSlice.reducer;
