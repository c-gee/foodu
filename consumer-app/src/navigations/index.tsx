import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import SpecialOffersScreen from "../screens/SpecialOffersScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SpecialOffers"
        component={SpecialOffersScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
