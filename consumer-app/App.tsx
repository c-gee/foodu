import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxToolkitProvider } from "react-redux";

import AnimatedAppLoader from "./src/components/AnimatedAppLoader";
import { RootStackNavigator } from "./src/navigation";
import AuthContextProvider from "./src/contexts/AuthContext";
import SearchContextProvider from "./src/contexts/SearchContext";
import store from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ReduxToolkitProvider store={store}>
          <AuthContextProvider>
            <AnimatedAppLoader>
              <SearchContextProvider>
                <RootStackNavigator />
                <StatusBar style="auto" />
              </SearchContextProvider>
            </AnimatedAppLoader>
          </AuthContextProvider>
        </ReduxToolkitProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
