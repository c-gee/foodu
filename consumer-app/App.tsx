import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold
} from "@expo-google-fonts/urbanist";

import { RootStackNavigation } from "./src/navigation";
import AuthContextProvider from "./src/contexts/AuthContext";
import SearchContextProvider from "./src/contexts/SearchContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;
      // add other resource loading code

      // await new Promise((resolve) => setTimeout(resolve, 2000));

      setAppIsReady(true);
    }

    prepare();
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AuthContextProvider>
          <SearchContextProvider>
            <RootStackNavigation />
            <StatusBar style="auto" />
          </SearchContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
