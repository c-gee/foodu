import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Identity, useAuth } from "../../contexts/AuthContext";
import { useSignInByProviderMutation } from "../../features/modules/user.generated";
import { Alert } from "react-native";

const useProvidersAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    authLoading,
    authError,
    setAuthError,
    identity,
    saveTokens
  } = useAuth();
  const [signInByProvider, { isLoading: isSignInByProviderLoading }] =
    useSignInByProviderMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (identity === null) return;

    async function authenticate() {
      try {
        const response = await signInByProvider(identity as Identity);

        if ("data" in response && response.data?.signInByProvider) {
          const { accessToken, refreshToken } = response.data?.signInByProvider;

          if (accessToken && refreshToken) {
            saveTokens({
              accessToken,
              refreshToken
            });

            setIsAuthenticated(true);
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
      } catch (error: unknown) {
        console.log("Caught error", error);
        Alert.alert(
          "We have a little problem.",
          "Unknown error. Please try again later."
        );
      }
    }

    authenticate();
  }, [identity]);

  useEffect(() => {
    if (authError === null) return;

    Alert.alert("We have a little problem.", authError, [
      {
        text: "Cancel",
        onPress: () => setAuthError(null)
      },
      {
        text: "OK",
        onPress: () => setAuthError(null)
      }
    ]);
  }, [authError]);

  useEffect(() => {
    if (isAuthenticated) navigation.navigate("Home");
  }, [isAuthenticated]);

  return {
    authLoading,
    isSignInByProviderLoading
  };
};

export default useProvidersAuth;
