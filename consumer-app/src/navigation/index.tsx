import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import SpecialOffersScreen from "../screens/SpecialOffersScreen";
import PromosScreen from "../screens/PromosScreen";
import CuisineCategoriesScreen from "../screens/CuisineCategoriesScreen";
import SearchScreen from "../screens/SearchScreen";

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
      <RootStack.Screen
        name="Promos"
        component={PromosScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CuisineCategories"
        component={CuisineCategoriesScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
