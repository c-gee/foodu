import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold
} from "@expo-google-fonts/urbanist";

import { RootStackNavigation } from "./src/navigation";
import SearchContextProvider from "./src/contexts/SearchContext";

export default function App() {
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SearchContextProvider>
          <RootStackNavigation />
          <StatusBar style="auto" />
        </SearchContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
