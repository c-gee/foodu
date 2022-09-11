import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { EnvelopeIcon, UserIcon } from "react-native-heroicons/solid";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import NavigationTopBar from "../../components/NavigationTopBar";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackScreenProps } from "../../navigation/types";
import FooduLogo from "../../../assets/foodu-logo.svg";
import FacebookIcon from "../../../assets/fb-icon.svg";
import GoogleIcon from "../../../assets/google-icon.svg";

const SignUpScreen = ({ navigation }: RootStackScreenProps<"SignUp">) => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const { onGoogleSignIn, onFacebookLogin } = useAuth();

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
                value="+60"
                className="text-base leading-5"
                textAlignVertical="center"
              />
              <TextInput
                value={phone}
                placeholder="100000000"
                className="text-base leading-5 pl-3"
                textAlignVertical="center"
                onChangeText={setPhone}
              />
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <EnvelopeIcon color="#BDBDBD" size={20} />
              <TextInput
                value={email}
                placeholder="Email"
                className="text-base leading-5 pl-4"
                textAlignVertical="center"
                onChangeText={(text) => setEmail(text.toLowerCase())}
              />
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 pl-6">
              <UserIcon color="#BDBDBD" size={20} />
              <TextInput
                value={name}
                placeholder="Full Name"
                className="text-base leading-5 pl-4"
                textAlignVertical="center"
                onChangeText={setName}
              />
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
            >
              <Text className="text-base text-white font-bold">Sign up</Text>
            </TouchableOpacity>
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
