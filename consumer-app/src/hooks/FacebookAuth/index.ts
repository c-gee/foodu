import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType, makeRedirectUri, Prompt } from "expo-auth-session";
import { FACEBOOK_EXPO_CLIENT_ID } from "@env";

type UserInfo = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
};

type FacebookProfile = {
  provider: "facebook";
  userInfo: UserInfo;
};

const environment = process.env;

const config = {
  clientId: FACEBOOK_EXPO_CLIENT_ID,
  responseType: ResponseType.Token,
  scopes: ["public_profile", "email"],
  redirectUri: makeRedirectUri({
    useProxy: environment.NODE_ENV !== "production"
  }),
  prompt: Prompt.Login
};

WebBrowser.maybeCompleteAuthSession();

const useFacebookAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [facebookProfile, setFacebookProfile] =
    useState<FacebookProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [_, response, promptAsync] = Facebook.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;

      setAccessToken(accessToken);
    } else if (response?.type === "cancel" || response?.type === "dismiss") {
      console.log("Facebook Authentication cancelled");
    } else if (response?.type == "error") {
      console.log("Facebook Authentication error", response?.error?.message);

      if (response?.error?.message) {
        setError(response?.error?.message);
      }
    }
  }, [response]);

  useEffect(() => {
    if (accessToken === null) return;

    async function getAndSetProfile() {
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me/?fields=id,name,email,picture`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      userInfoResponse
        .json()
        .then((data) => {
          setFacebookProfile({
            provider: "facebook",
            userInfo: {
              sub: data.id,
              name: data?.name,
              email: data?.email, // might not be returned
              picture: data?.picture?.data?.url
            }
          });
        })
        .catch((error) => {
          console.log("Facebook UserInfo error", error);
          setFacebookProfile(null);
        });
    }

    getAndSetProfile();
  }, [accessToken]);

  const loginWithFacebook = async () => {
    await promptAsync();
  };

  const signOutFacebook = () => {
    setAccessToken(null);
    setFacebookProfile(null);
  };

  return {
    facebookProfile,
    loginWithFacebook,
    signOutFacebook,
    error
  };
};

export default useFacebookAuth;
