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
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PhoneLoginScreen from "../screens/PhoneLoginScreen";
import OTPCodeVerificationScreen from "../screens/OTPCodeVerificationScreen";
import { useAuth } from "../contexts/AuthContext";
import ProfileScreen from "../screens/ProfileScreen/index";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {!isAuthenticated ? (
        <RootStack.Group>
          <RootStack.Screen name="SignIn" component={SignInScreen} />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
          <RootStack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
          <RootStack.Screen
            name="OTPCodeVerification"
            component={OTPCodeVerificationScreen}
          />
        </RootStack.Group>
      ) : isAuthenticated && user && (!user.phone || !user.email) ? (
        <RootStack.Group>
          <RootStack.Screen
            name="FillYourProfile"
            component={ProfileScreen}
            initialParams={{
              screenTitle: "Fill Your profile"
            }}
          />
        </RootStack.Group>
      ) : (
        <>
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
              initialParams={{
                showSortByOnly: false
              }}
            />
          </RootStack.Group>
          <RootStack.Group>
            <RootStack.Screen
              name="Profile"
              component={ProfileScreen}
              initialParams={{
                screenTitle: "Profile"
              }}
            />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
};
