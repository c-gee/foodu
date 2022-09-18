import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    loadRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    }
  }
});

export const { loadAccessToken, loadRefreshToken } = authSlice.actions;

export default authSlice.reducer;
