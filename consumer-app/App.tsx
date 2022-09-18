import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxToolkitProvider } from "react-redux";

import AnimatedAppLoader from "./src/components/AnimatedAppLoader";
import { RootStackNavigation } from "./src/navigation";
import AuthContextProvider from "./src/contexts/AuthContext";
import SearchContextProvider from "./src/contexts/SearchContext";
import store from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <NavigationContainer>
          <ReduxToolkitProvider store={store}>
            <AnimatedAppLoader>
              <SearchContextProvider>
                <RootStackNavigation />
                <StatusBar style="auto" />
              </SearchContextProvider>
            </AnimatedAppLoader>
          </ReduxToolkitProvider>
        </NavigationContainer>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
