import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInByPhoneSchema } from "./validator";
import NavigationTopBar from "../../components/NavigationTopBar";
import { useAuth } from "../../contexts/AuthContext";
import useFacebookAuth from "../../hooks/FacebookAuth";
import useGoogleAuth from "../../hooks/GoogleAuth";
import useProvidersAuth from "../../hooks/ProvidersAuth";
import { RootStackScreenProps } from "../../navigation/types";
import FullScreenLoader from "../../components/FullScreenLoader";
import FooduLogo from "../../../assets/foodu-logo.svg";
import FacebookIcon from "../../../assets/fb-icon.svg";
import GoogleIcon from "../../../assets/google-icon.svg";
import { SignInByPhoneInput } from "../../features/graphql/types.generated";
import { useSignInByPhoneMutation } from "../../features/modules/user.generated";
import ControlledTextInput from "../../components/ControlledTextInput";

const COUNTRY_CODE = "+60";

const PhoneLoginScreen = ({ navigation }: RootStackScreenProps<"SignUp">) => {
  const { rememberMe, setRememberMe } = useAuth();
  const { signInWithGoogle } = useGoogleAuth();
  const { loginWithFacebook } = useFacebookAuth();
  const { authLoading, isSignInByProviderLoading } = useProvidersAuth();
  const [signInByPhone, { isLoading }] = useSignInByPhoneMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInByPhoneInput>({
    defaultValues: {
      phone: ""
    },
    resolver: yupResolver(signInByPhoneSchema)
  });

  const onSignIn = async (data: SignInByPhoneInput) => {
    try {
      const response = await signInByPhone(data);

      if ("data" in response && response.data?.signInByPhone) {
        const { userId, phone } = response.data?.signInByPhone;

        if (userId && phone) {
          navigation.navigate("OTPCodeVerification", { phone });
        } else {
          Alert.alert(
            "We have a little problem.",
            "Please try again, or contact our support if the problem persist."
          );
        }
      }

      if ("error" in response) {
        if (response.error.message) {
          Alert.alert("We have a little problem.", response.error.message);
        } else {
          Alert.alert(
            "We have a little problem.",
            "Unknown error. Please try again later."
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "We have a little problem.",
        "Unknown error. Please try again later."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: 24
        }}
      >
        {(isLoading || authLoading || isSignInByProviderLoading) && (
          <FullScreenLoader />
        )}
        <NavigationTopBar title="" icon="go_back" onPress={navigation.goBack} />
        <KeyboardAvoidingView
          className="px-6 flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="py-6 self-center">
            <FooduLogo
              width={120}
              height={77}
              style={{
                maxWidth: "100%"
              }}
            />
          </View>
          <View className="py-6">
            <Text className="self-center text-3xl text-gray-900 font-bold">
              Login to Your Account
            </Text>
          </View>
          <View className="py-6 flex space-y-5">
            <View className="flex flex-1 flex-row justify-start items-center h-[60px] bg-gray-200 rounded-2xl px-5">
              <TextInput
                value={COUNTRY_CODE}
                className="text-base leading-5"
                textAlignVertical="center"
              />
              <ControlledTextInput
                name="phone"
                control={control}
                placeholder="100000000"
                className="text-base text-gray-800 font-semibold leading-5 pl-3"
              />
              {errors?.phone?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.phone?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 justify-center items-center py-1">
              <BouncyCheckbox
                size={25}
                fillColor="#1BAC4B"
                unfillColor="#FFFFFF"
                text="Remember me"
                iconStyle={{
                  borderColor: "#1BAC4B",
                  borderRadius: 8,
                  width: 20,
                  height: 20
                }}
                innerIconStyle={{
                  borderWidth: 2,
                  borderRadius: 8,
                  width: 20,
                  height: 20
                }}
                textStyle={{
                  fontSize: 16,
                  color: "#212121",
                  fontFamily: "Urbanist_600SemiBold",
                  textDecorationLine: "none"
                }}
                onPress={setRememberMe}
                isChecked={rememberMe}
              />
            </View>
          </View>
          <View className="py-1">
            <TouchableOpacity
              onPress={handleSubmit(onSignIn)}
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
            >
              <Text className="text-base text-white font-bold">Sign in</Text>
            </TouchableOpacity>
          </View>
          <View className="py-5 flex-1 flex-row justify-between items-center space-x-6">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="text-lg text-gray-700 font-semibold">
              or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>
          <View className="py-2 flex-row justify-center items-center space-x-5">
            <TouchableOpacity
              onPress={loginWithFacebook}
              className="h-[60px] basis-1/3 justify-center items-center rounded-2xl border-[1px] border-gray-200"
            >
              <FacebookIcon width={24} height={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithGoogle}
              className="h-[60px] basis-1/3 justify-center items-center rounded-2xl border-[1px] border-gray-200"
            >
              <GoogleIcon width={24} height={25} />
            </TouchableOpacity>
          </View>
          <View className="py-5 flex-row items-center justify-center space-x-2">
            <Text className="text-sm text-gray-500 font-regular">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="text-sm text-primary font-semibold">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneLoginScreen;
