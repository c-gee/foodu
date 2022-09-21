import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

const initialState: AppState = {
  theme: "light",
  language: "English (US)"
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
  }
});

export const { setTheme, setLanguage } = appSlice.actions;

export default appSlice.reducer;
