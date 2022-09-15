import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight,
  TextInputProps
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { EnvelopeIcon, UserIcon } from "react-native-heroicons/solid";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpInputsSchema } from "./validator";
import NavigationTopBar from "../../components/NavigationTopBar";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackScreenProps } from "../../navigation/types";
import FooduLogo from "../../../assets/foodu-logo.svg";
import FacebookIcon from "../../../assets/fb-icon.svg";
import GoogleIcon from "../../../assets/google-icon.svg";
import { useSignUpMutation } from "../../features/modules/user.generated";

const AREA_CODE = "+60";

type SignInInputs = {
  email: string;
  name: string;
  areaCode: string;
  phone: string;
};

const SignUpScreen = ({ navigation }: RootStackScreenProps<"SignUp">) => {
  const [rememberMe, setRememberMe] = useState(false);
  const { onGoogleSignIn, onFacebookLogin, setAccessToken, setRefreshToken } =
    useAuth();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      name: "",
      areaCode: AREA_CODE,
      phone: ""
    },
    resolver: yupResolver(signUpInputsSchema)
  });

  const onSignUp = async (data: SignInInputs) => {
    try {
      const response = await signUp(data);

      if ("data" in response && response.data?.signUp) {
        const { accessToken, refreshToken } = response.data?.signUp;

        setAccessToken(accessToken);

        if (rememberMe) {
          setRefreshToken(refreshToken);
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
        <NavigationTopBar title="" icon="go_back" onPress={navigation.goBack} />
        {isLoading && (
          <View className="absolute flex-1 justify-center items-center">
            <Text className="text-4xl text-gray-900 font-bold">Loading...</Text>
          </View>
        )}
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
          <View className="py-4">
            <Text className="self-center text-3xl text-gray-900 font-bold">
              Create New Account
            </Text>
          </View>

          <View className="py-6 flex space-y-5">
            <View className="flex flex-1 flex-row justify-start items-center h-[60px] bg-gray-200 rounded-2xl px-5">
              <TextInput
                value={AREA_CODE}
                className="text-base text-gray-800 font-semibold leading-5"
                textAlignVertical="center"
              />
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="text-base text-gray-800 font-semibold leading-5 pl-3"
                    onChangeText={onChange}
                    value={value}
                    placeholder="00000000"
                  />
                )}
              />
              {errors?.phone?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.phone?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <EnvelopeIcon color="#BDBDBD" size={20} />
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="text-base text-gray-800 font-semibold leading-5 pl-5"
                    onChangeText={(text) => onChange(text.toLowerCase())}
                    value={value}
                    placeholder="Email"
                  />
                )}
              />
              {errors?.email?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.email?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <UserIcon color="#BDBDBD" size={20} />
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="text-base text-gray-800 font-semibold leading-5 pl-5"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Full Name"
                  />
                )}
              />
              {errors?.name?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.name?.message}
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
              />
            </View>
          </View>
          <View className="py-1">
            <TouchableHighlight
              onPress={handleSubmit(onSignUp)}
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
              <Text className="text-base text-white font-bold">Sign up</Text>
            </TouchableHighlight>
          </View>
          <View className="py-4 flex-1 flex-row justify-between items-center space-x-6">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="text-lg text-gray-700 font-semibold">
              or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>
          <View className="py-2 flex-row justify-center items-center space-x-5">
            <TouchableOpacity
              onPress={onFacebookLogin}
              className="h-[60px] basis-1/3 justify-center items-center rounded-2xl border-[1px] border-gray-200"
            >
              <FacebookIcon width={24} height={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onGoogleSignIn}
              className="h-[60px] basis-1/3 justify-center items-center rounded-2xl border-[1px] border-gray-200"
            >
              <GoogleIcon width={24} height={25} />
            </TouchableOpacity>
          </View>
          <View className="py-3 flex-row items-center justify-center space-x-2">
            <Text className="text-sm text-gray-500 font-regular">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PhoneLogin");
              }}
            >
              <Text className="text-sm text-primary font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
