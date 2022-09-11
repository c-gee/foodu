import { useEffect, useState } from "react";
import { Prompt } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID
} from "@env";

export type UserInfo = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};

const environment = process.env;

const config = {
  expoClientId: GOOGLE_EXPO_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  webClientId: GOOGLE_WEB_CLIENT_ID,
  prompt: Prompt.Login
};

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;

      setAccessToken(accessToken);
    } else if (response?.type === "cancel" || response?.type === "dismiss") {
      console.log("Google Authentication cancelled");
    } else if (response?.type == "error") {
      console.log("Google Authentication error", response?.error?.message);

      if (response?.error?.message) {
        setError(response?.error?.message);
      }
    }
  }, [response]);

  useEffect(() => {
    if (accessToken === null) return;

    async function getAndSetUserInfo() {
      const userInfoResponse = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      userInfoResponse
        .json()
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.log("Google UserInfo error", error);
          setUserInfo(null);
        });
    }

    getAndSetUserInfo();
  }, [accessToken]);

  const signInWithGoogle = async () => {
    await promptAsync({ useProxy: environment.NODE_ENV !== "production" });
  };

  const signOutGoogle = () => {
    setAccessToken(null);
    setUserInfo(null);
  };

  return {
    userInfo,
    signInWithGoogle,
    signOutGoogle,
    error
  };
};

export default useGoogleAuth;
