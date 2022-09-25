import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../graphql/types.generated";
import { api } from "../modules/user.generated";

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
    // Only use this if you want to manually set the tokens like during
    // signing out or reloading from device storage, else add to the
    // `extraReducers` list for handling signing in.
    setAuthTokens(state, action: PayloadAction<Tokens>) {
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
  },
  extraReducers: (builder) => {
    builder
      // handle when refreshing tokens
      .addMatcher(
        api.endpoints.refreshTokens.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.refreshTokens
            ? payload.refreshTokens?.accessToken
            : null;
          state.refreshToken = payload.refreshTokens
            ? payload.refreshTokens?.refreshToken
            : null;
        }
      )
      .addMatcher(api.endpoints.refreshTokens.matchRejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      })
      // handle when using Provider sign in
      .addMatcher(
        api.endpoints.signInByProvider.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.signInByProvider
            ? payload.signInByProvider?.accessToken
            : null;
          state.refreshToken = payload.signInByProvider
            ? payload.signInByProvider?.refreshToken
            : null;
        }
      )
      .addMatcher(api.endpoints.signInByProvider.matchRejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      })
      // handle when using phone OTP sign in
      .addMatcher(
        api.endpoints.verifyPhoneOtp.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.verifyPhoneOtp
            ? payload.verifyPhoneOtp?.accessToken
            : null;
          state.refreshToken = payload.verifyPhoneOtp
            ? payload.verifyPhoneOtp?.refreshToken
            : null;
        }
      )
      .addMatcher(api.endpoints.verifyPhoneOtp.matchRejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  }
});

export const {
  setAuthTokens,
  setUserLoaded,
  setUserData,
  setUserAuthenticated,
  resetAuth
} = authSlice.actions;

export default authSlice.reducer;
