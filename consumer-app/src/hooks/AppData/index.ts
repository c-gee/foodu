import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch } from "../Redux/index";
import { useAppSelector } from "../../hooks/Redux/index";
import {
  Theme,
  Language,
  setTheme,
  setLanguage
} from "../../features/app/appSlice";

const THEME_KEY = "@foodu-theme";
const LANGUAGE_KEY = "@foodu-language";

const useAppData = () => {
  const theme = useAppSelector((state) => state.app.theme);
  const language = useAppSelector((state) => state.app.language);
  const currencies = useAppSelector((state) => state.app.currencies);
  const dispatch = useAppDispatch();

  const setAppTheme = async (theme: Theme) => {
    dispatch(setTheme(theme));
    await AsyncStorage.setItem(THEME_KEY, theme);
  };

  const setAppLanguage = async (language: Language) => {
    dispatch(setLanguage(language));
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  };

  const loadAppData = async () => {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);

    dispatch(setTheme((theme || "light") as Theme));
    dispatch(setLanguage((language || "English (US)") as Language));
  };

  return {
    theme,
    language,
    currencies,
    setAppTheme,
    setAppLanguage,
    loadAppData
  };
};

export default useAppData;
