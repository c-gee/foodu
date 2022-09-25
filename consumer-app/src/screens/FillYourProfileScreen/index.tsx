import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from "@expo/vector-icons";

import { updateProfileSchema } from "./validator";
import NavigationTopBar from "../../components/NavigationTopBar";
import FullScreenLoader from "../../components/FullScreenLoader";
import ControlledTextInput from "../../components/ControlledTextInput";
import ControlledDatePicker from "../../components/ControlledDatePicker";
import ControlledDropdownPicker from "../../components/ControlledDropdownPicker";
import { RootStackScreenProps } from "../../navigation/types";
import useAuth from "../../hooks/Auth";
import {
  UpdateProfileInput,
  Gender
} from "../../features/graphql/types.generated";
import { useUpdateProfileMutation } from "../../features/modules/user.generated";
import { COUNTRY_CODE, phoneDisplayFormatter } from "../../utils";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const genders = Object.entries(Gender).map(([label, value]) => ({
  label,
  value
}));

const FillYourProfileScreen = ({
  navigation
}: RootStackScreenProps<"FillYourProfile">) => {
  const { user } = useAuth();
  const { signOutApp } = useAuthContext();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (!user?.email || !!user?.phone) return;

    navigation.navigate("MainTab", {
      screen: "Home"
    });
  }, [user?.email, user?.phone]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      nickname: user?.nickname || "",
      dateOfBirth: user?.dateOfBirth?.toLocaleString(),
      phone: phoneDisplayFormatter(user?.phone, true) || "",
      gender: user?.gender || "female"
    },
    resolver: yupResolver(updateProfileSchema)
  });

  const onUpdate = async (data: UpdateProfileInput) => {
    try {
      const response = await updateProfile(data);

      if ("data" in response && response.data?.updateProfile) {
        const user = response.data?.updateProfile;

        if (!user) {
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
      <KeyboardAwareScrollView>
        {isLoading && <FullScreenLoader />}
        <NavigationTopBar
          title="Fill Your Profile"
          icon="go_back"
          onPress={signOutApp}
        />
        <View className="flex-1 justify-start items-center py-4">
          <View className="relative w-[160px] h-[160px] rounded-full">
            <Image
              source={require("../../../assets/avatar.png")}
              style={{
                width: 160,
                height: 160
              }}
              resizeMode="contain"
            />
            <TouchableOpacity className="absolute bottom-1 right-3 flex justify-center items-center w-9 h-9 rounded-xl bg-primary">
              <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-6 flex-1">
          <View className="py-6 flex space-y-5">
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5">
              <ControlledTextInput
                name="name"
                control={control}
                placeholder="Full Name"
                className="text-base text-gray-800 font-semibold leading-5"
              />
              {errors?.name?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.name?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5">
              <ControlledTextInput
                name="nickname"
                control={control}
                placeholder="Nickname"
                className="text-base text-gray-800 font-semibold leading-5"
              />
              {errors?.nickname?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.nickname?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5">
              <ControlledDatePicker
                name="dateOfBirth"
                control={control}
                initialDate={user?.dateOfBirth}
                placeholder="Date of Birth"
                textStyle="text-base text-gray-400 font-semibold leading-5 -z-10"
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              />
              {errors?.dateOfBirth?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.dateOfBirth?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5">
              <ControlledTextInput
                name="email"
                control={control}
                placeholder="Email"
                className="text-base text-gray-800 font-semibold leading-5"
              />
              {errors?.email?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.email?.message}
                </Text>
              )}
            </View>
            <View className="flex flex-1 flex-row justify-start items-center h-[60px] bg-gray-200 rounded-2xl px-5">
              <TextInput
                value={COUNTRY_CODE}
                className="text-base text-gray-800 font-semibold leading-5 pr-3"
                textAlignVertical="center"
                editable={false}
              />
              <ControlledTextInput
                name="phone"
                control={control}
                placeholder="100000000"
                className="text-base text-gray-800 font-semibold leading-5"
              />
              {errors?.phone?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.phone?.message}
                </Text>
              )}
            </View>
            <View className="flex-1 flex-row justify-start items-center h-14 bg-gray-200 rounded-2xl px-5 overflow-hidden">
              <ControlledDropdownPicker
                items={genders}
                name="gender"
                control={control}
                placeholder="Gender"
              />
              {errors?.gender?.message && (
                <Text className="text-base text-red-600 font-regular leading-5 pl-3">
                  {errors?.gender?.message}
                </Text>
              )}
            </View>
          </View>
          <View className="py-6">
            <TouchableOpacity
              onPress={handleSubmit(onUpdate)}
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
              <Text className="text-base text-white font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default FillYourProfileScreen;
