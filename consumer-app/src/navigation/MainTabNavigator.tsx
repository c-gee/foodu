import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeIcon } from "react-native-heroicons/solid";
import { HomeIcon as HomeIconOutline } from "react-native-heroicons/outline";

import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";
import OrdersScreen from "../screens/OrdersScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1BAC4B",
        tabBarStyle: {
          minHeight: 60
        },
        tabBarItemStyle: {
          paddingTop: 4,
          paddingBottom: Platform.OS === "android" ? 8 : 0
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIcon color="#1BAC4B" size={24} />
            ) : (
              <HomeIconOutline color="#9E9E9E" size={24} />
            )
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              size={24}
              color={focused ? "#1BAC4B" : "#9E9E9E"}
            />
          )
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              size={24}
              color={focused ? "#1BAC4B" : "#9E9E9E"}
            />
          )
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={24}
              color={focused ? "#1BAC4B" : "#9E9E9E"}
            />
          )
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#1BAC4B" : "#9E9E9E"}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
