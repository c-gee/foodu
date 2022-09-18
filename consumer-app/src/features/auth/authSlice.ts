import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isUserLoaded: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isUserLoaded: false
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
    },
    setUserLoaded(state, action: PayloadAction<boolean>) {
      state.isUserLoaded = action.payload;
    }
  }
});

export const { loadAccessToken, loadRefreshToken, setUserLoaded } =
  authSlice.actions;

export default authSlice.reducer;
