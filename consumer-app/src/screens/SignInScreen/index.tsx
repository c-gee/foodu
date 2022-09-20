import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FullScreenLoader from "../../components/FullScreenLoader";
import useGoogleAuth from "../../hooks/GoogleAuth";
import useFacebookAuth from "../../hooks/FacebookAuth";
import useProvidersAuth from "../../hooks/ProvidersAuth";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackScreenProps } from "../../navigation/types";
import SignInArt from "../../../assets/sign-in-art.svg";
import FacebookIcon from "../../../assets/fb-icon.svg";
import GoogleIcon from "../../../assets/google-icon.svg";
import { useEffect } from "react";

const SignInScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const { user } = useAuth();
  const { authLoading, isSignInByProviderLoading, isLoadingUserData } =
    useProvidersAuth();
  const { signInWithGoogle } = useGoogleAuth();
  const { loginWithFacebook } = useFacebookAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        {(authLoading || isSignInByProviderLoading || isLoadingUserData) && (
          <FullScreenLoader />
        )}
        <View className="px-6">
          <View className="py-6 self-center">
            <SignInArt
              width={237}
              height={201}
              style={{
                maxWidth: "100%"
              }}
            />
          </View>
          <Text className="self-center text-5xl text-gray-900 font-bold">
            Let's start
          </Text>
          <View className="py-6 flex space-y-4">
            <TouchableOpacity
              onPress={loginWithFacebook}
              className="h-[60px] w-full flex-row justify-center items-center space-x-2 rounded-2xl border-[1px] border-gray-200"
            >
              <FacebookIcon width={24} height={25} />
              <Text className="text-base text-gray-900 font-semibold">
                Continue with Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithGoogle}
              className="h-[60px] w-full flex-row justify-center items-center space-x-2 rounded-2xl border-[1px] border-gray-200"
            >
              <GoogleIcon width={24} height={25} />
              <Text className="flex-0 text-base text-gray-900 font-semibold">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 flex-row justify-between items-center space-x-4 py-2">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="text-lg text-gray-700 font-semibold">or</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>
          <View className="py-5">
            <TouchableOpacity
              className="flex justify-center items-center h-[58] bg-primary rounded-full shadow-md shadow-slate-300"
              style={{
                ...Platform.select({
                  android: {
                    shadowOffset: {
                      width: 0,
                      height: 10
                    },
                    shadowColor: "#424242",
                    shadowRadius: 15,
                    shadowOpacity: 0.1,
                    elevation: 10
                  }
                })
              }}
              onPress={() => {
                navigation.navigate("PhoneLogin");
              }}
            >
              <Text className="text-base text-white font-bold">
                Sign in with Phone Number
              </Text>
            </TouchableOpacity>
          </View>
          <View className="py-3 flex-row items-center justify-center space-x-2">
            <Text className="text-sm text-gray-500 font-regular">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="text-sm text-primary font-semibold">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
