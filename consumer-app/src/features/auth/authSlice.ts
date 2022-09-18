import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
};

const initialState: AuthState = {
  accessToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    }
  }
});

export const { loadAccessToken } = authSlice.actions;

export default authSlice.reducer;
