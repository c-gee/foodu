import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Currency } from "../graphql/types.generated";
import { api } from "../modules/app.generated";

export type Language =
  | "English (US)"
  | "English (UK)"
  | "Bahasa Malaysia"
  | "Mandarin"
  | "Hindi";

export type Theme = "light" | "dark";

type AppState = {
  theme: Theme;
  language: Language;
  currencies: Currency[];
};

const initialState: AppState = {
  theme: "light",
  language: "English (US)",
  currencies: []
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.appVars.matchFulfilled,
      (state, { payload }) => {
        // set currencies
        Object.assign(state, { currencies: payload.appVars?.currencies });
      }
    );
  }
});

export const { setTheme, setLanguage } = appSlice.actions;

export default appSlice.reducer;
