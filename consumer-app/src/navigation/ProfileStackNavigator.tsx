import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import ProfileUpdateScreen from "../screens/ProfileUpdateScreen";
import { ProfileStackParamList } from "./types";

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ProfileUpdate"
        component={ProfileUpdateScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
