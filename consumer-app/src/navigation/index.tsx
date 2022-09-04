import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import MerchantScreen from "../screens/MerchantScreen";
import SpecialOffersScreen from "../screens/SpecialOffersScreen";
import PromosScreen from "../screens/PromosScreen";
import CuisineCategoriesScreen from "../screens/CuisineCategoriesScreen";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchFilterScreen from "../screens/SearchFilterScreen";
import MenuItemScreen from "../screens/MenuItemScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <RootStack.Group>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen
          name="Merchant"
          component={MerchantScreen}
          initialParams={{
            showMenuItem: false
          }}
        />
        <RootStack.Screen
          name="SpecialOffers"
          component={SpecialOffersScreen}
        />
        <RootStack.Screen name="Promos" component={PromosScreen} />
        <RootStack.Screen
          name="CuisineCategories"
          component={CuisineCategoriesScreen}
        />
        <RootStack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
        />
        <RootStack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
          initialParams={{
            isSearch: true
          }}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name="MenuItem"
          component={MenuItemScreen}
          options={{ presentation: "modal" }}
        />
        <RootStack.Screen
          name="SearchFilter"
          component={SearchFilterScreen}
          options={{ presentation: "fullScreenModal" }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
