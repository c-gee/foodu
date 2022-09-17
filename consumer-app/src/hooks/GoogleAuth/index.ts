import { useEffect, useState } from "react";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID
} from "@env";

import { useAuth } from "../../contexts/AuthContext/index";

const environment = process.env;

const config = {
  expoClientId: GOOGLE_EXPO_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  webClientId: GOOGLE_WEB_CLIENT_ID,
  redirectUri: makeRedirectUri({
    useProxy: environment.NODE_ENV !== "production"
  })
};

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = () => {
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
    null
  );
  const { withProviderSignIn, withProviderSignOut, setIdentity, setAuthError } =
    useAuth();
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;

      setGoogleAccessToken(accessToken);
    } else if (response?.type === "cancel" || response?.type === "dismiss") {
      console.log("Google Authentication cancelled");
    } else if (response?.type == "error") {
      console.log("Google Authentication error", response?.error?.message);

      if (response?.error?.message) {
        setAuthError(response?.error?.message);
      }
    }
  }, [response]);

  useEffect(() => {
    if (googleAccessToken === null) return;

    async function getAndSetProfile() {
      const userInfoResponse = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`
          }
        }
      );
      userInfoResponse
        .json()
        .then((data) => {
          setIdentity({
            sub: data.sub,
            provider: "google",
            identityData: {
              name: data?.name,
              email: data?.email,
              picture: data?.picture
            }
          });
        })
        .catch((error: unknown) => {
          setIdentity(null);
          setAuthError("Google authentication unsuccesful.");
        });
    }

    getAndSetProfile();
  }, [googleAccessToken]);

  const signInWithGoogle = async () => {
    await withProviderSignIn(promptAsync);
  };

  const signOutGoogle = () => {
    withProviderSignOut(() => {
      setGoogleAccessToken(null);
      setIdentity(null);
    });
  };

  return {
    signInWithGoogle,
    signOutGoogle
  };
};

export default useGoogleAuth;
