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

type UserInfo = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
};

type GoogleProfile = {
  provider: "google";
  userInfo: UserInfo;
};

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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [googleProfile, setGoogleProfile] = useState<GoogleProfile | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;

      console.log(`response`, response);

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

    async function getAndSetProfile() {
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
          setGoogleProfile({
            provider: "google",
            userInfo: {
              sub: data.sub,
              name: data?.name,
              email: data?.email,
              picture: data?.picture
            }
          });
        })
        .catch((error) => {
          console.log("Google UserInfo error", error);
          setGoogleProfile(null);
        });
    }

    getAndSetProfile();
  }, [accessToken]);

  const signInWithGoogle = async () => {
    await promptAsync();
  };

  const signOutGoogle = () => {
    setAccessToken(null);
    setGoogleProfile(null);
  };

  return {
    googleProfile,
    signInWithGoogle,
    signOutGoogle,
    error
  };
};

export default useGoogleAuth;
