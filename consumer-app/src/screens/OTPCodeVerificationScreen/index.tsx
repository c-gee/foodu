import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";

import { RootStackScreenProps } from "../../navigation/types";
import FullScreenLoader from "../../components/FullScreenLoader";
import NavigationTopBar from "../../components/NavigationTopBar";
import { maskText } from "../../utils";
import {
  useVerifyPhoneOtpMutation,
  useSignInByPhoneMutation
} from "../../features/modules/user.generated";
import useAuth from "../../hooks/Auth";
import { useAppDispatch } from "../../hooks/Redux";
import { useAuthContext } from "../../contexts/AuthContext";

const CODE_LENGTH = 4;
const CODE_EXPIRES_IN = 60;
const initialCode = new Array(CODE_LENGTH).fill(0);

const OTPCodeVerificationScreen = ({
  route,
  navigation
}: RootStackScreenProps<"OTPCodeVerification">) => {
  const { phone } = route.params;
  const [code, setCode] = useState<string>("");
  const [countDown, setCountDown] = useState<number>(CODE_EXPIRES_IN);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const countDownRef = useRef<NodeJS.Timer>();
  const { rememberMe } = useAuthContext();
  const { isLoadingUserData, loadUser, saveTokens, accessToken } = useAuth();
  const [verify, { isLoading }] = useVerifyPhoneOtpMutation();
  const [resendCode, { isLoading: isResendCodeLoading }] =
    useSignInByPhoneMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    resetCountDown();

    return () => clearInterval(countDownRef.current);
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(countDownRef.current);
    }
  }, [countDown]);

  useEffect(() => {
    if (!accessToken) return;

    loadUser();
  }, [accessToken]);

  const resetCountDown = () => {
    if (countDown === 0) {
      setCountDown(CODE_EXPIRES_IN);
    }

    countDownRef.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
  };

  const onVerify = async () => {
    try {
      const response = await verify({ phone: phone, code: code });

      if ("data" in response && response.data?.verifyPhoneOtp) {
        const { accessToken, refreshToken } = response.data?.verifyPhoneOtp;

        if (accessToken && refreshToken) {
          if (rememberMe) {
            saveTokens({
              accessToken,
              refreshToken
            });
          }
        } else {
          Alert.alert(
            "We have a little problem.",
            "Please try again, or contact our support if the problem persist."
          );
        }
      } else if ("error" in response) {
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
      console.log("Caught error", error);
      Alert.alert(
        "We have a little problem.",
        "Unknown error. Please try again later."
      );
    }
  };

  const onResendCode = async () => {
    try {
      const response = await resendCode({ phone });

      if ("data" in response && response.data?.signInByPhone) {
        const { userId, phone } = response.data?.signInByPhone;

        if (userId && phone) {
          setCode("");
          resetCountDown();
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

  const onInputPress = () => {
    setInputFocused(true);
    inputRef?.current?.focus();
  };

  const onInputBlur = () => {
    setInputFocused(false);
  };

  const renderCodeInput = (_value: number, idx: number) => {
    const isCurrent = idx === code.length;
    const isLast = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;
    const isFocused = isCurrent || (isLast && isCodeFull);

    return (
      <View
        key={idx}
        className="basis-1/5 h-[60] flex justify-center items-center rounded-2xl  border-[1px]"
        style={{
          backgroundColor:
            inputFocused && isFocused
              ? "rgba(27, 172, 75, 0.2)"
              : "rgba(241, 245, 249, 1)",
          borderColor:
            inputFocused && isFocused
              ? "rgba(27, 172, 75, 0.5)"
              : "rgba(226, 232, 240, 1)"
        }}
      >
        <Text className="text-2xl text-gray-900 font-bold text-center">
          {code[idx] || " "}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {(isLoading || isResendCodeLoading || isLoadingUserData) && (
        <FullScreenLoader />
      )}
      <NavigationTopBar
        title="OTP Code Verification"
        icon="go_back"
        onPress={navigation.goBack}
      />
      <KeyboardAvoidingView
        className="px-6 flex-1 justify-center space-y-8"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="py-2 flex items-center">
          <Text className="text-lg text-gray-900 font-regular">
            Code has been send to {maskText(phone, 5, 9)}
          </Text>
        </View>
        <View className="py-2 flex items-center">
          <Pressable
            className="flex flex-row justify-around space-x-3"
            onPress={onInputPress}
          >
            {initialCode.map(renderCodeInput)}
          </Pressable>
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={setCode}
            onSubmitEditing={onInputBlur}
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode"
            maxLength={CODE_LENGTH}
            style={{
              width: 1,
              height: 1,
              opacity: 0
            }}
          />
        </View>
        <View className="py-2 flex-row justify-center items-center space-x-2">
          <Text className="text-lg text-gray-900 font-regular">
            Resend code in
          </Text>
          <Text className="text-lg text-primary font-regular">{countDown}</Text>
          <Text className="text-lg text-gray-900 font-regular">s</Text>
        </View>
        <View className="py-2 flex ">
          {countDown == 0 ? (
            <TouchableOpacity
              onPress={onResendCode}
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
              <Text className="text-base text-white font-bold">
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onVerify}
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
              <Text className="text-base text-white font-bold">Verify</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPCodeVerificationScreen;
