import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnvelopeIcon, UserIcon } from "react-native-heroicons/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpInputsSchema } from "./validator";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackScreenProps } from "../../navigation/types";
import NavigationTopBar from "../../components/NavigationTopBar";
import FullScreenLoader from "../../components/FullScreenLoader";
import ControlledTextInput from "../../components/ControlledTextInput";
import FooduLogo from "../../../assets/foodu-logo.svg";
import FacebookIcon from "../../../assets/fb-icon.svg";
import GoogleIcon from "../../../assets/google-icon.svg";
import { SignUpInput } from "../../features/graphql/types.generated";
import { useSignUpMutation } from "../../features/modules/user.generated";

const COUNTRY_CODE = "+60";

const SignUpScreen = ({ navigation }: RootStackScreenProps<"SignUp">) => {
  const { onGoogleSignIn, onFacebookLogin } = useAuth();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpInput>({
    defaultValues: {
      email: "",
      name: "",
      phone: ""
    },
    resolver: yupResolver(signUpInputsSchema)
  });

  const onSignUp = async (data: SignUpInput) => {
    try {
      const response = await signUp(data);

      if ("data" in response && response.data?.signUp) {
        const { userId } = response.data?.signUp;

        if (userId) {
          navigation.navigate("PhoneLogin");
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
        {isLoading && <FullScreenLoader />}
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
          <View className="py-4">
            <Text className="self-center text-3xl text-gray-900 font-bold">
              Create New Account
            </Text>
          </View>

          <View className="py-6 flex space-y-5">
            <View className="flex flex-1 flex-row justify-start items-center h-[60px] bg-gray-200 rounded-2xl px-5">
              <TextInput
                value={COUNTRY_CODE}
                className="text-base text-gray-800 font-semibold leading-5"
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
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <EnvelopeIcon color="#BDBDBD" size={20} />
              <ControlledTextInput
                name="email"
                control={control}
                placeholder="Email"
                className="text-base text-gray-800 font-semibold leading-5 pl-5"
              />
              {errors?.email?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.email?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <UserIcon color="#BDBDBD" size={20} />
              <ControlledTextInput
                name="name"
                control={control}
                placeholder="Full Name"
                className="text-base text-gray-800 font-semibold leading-5 pl-5"
              />
              {errors?.name?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.name?.message}
                </Text>
              )}
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
