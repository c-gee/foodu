import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { makeRedirectUri } from "expo-auth-session";
import { FACEBOOK_EXPO_CLIENT_ID } from "@env";

import { useAuth } from "../../contexts/AuthContext/index";

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
  scopes: ["public_profile", "email"],
  redirectUri: makeRedirectUri({
    useProxy: environment.NODE_ENV !== "production"
  })
};

WebBrowser.maybeCompleteAuthSession();

const useFacebookAuth = () => {
  const [facebookAccessToken, setFacebookAccessToken] = useState<string | null>(
    null
  );
  const { withProviderSignIn, withProviderSignOut, setIdentity, setAuthError } =
    useAuth();
  const [_, response, promptAsync] = Facebook.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const { accessToken } = response.authentication;

      setFacebookAccessToken(accessToken);
    } else if (response?.type === "cancel" || response?.type === "dismiss") {
      console.log("Facebook Authentication cancelled");
    } else if (response?.type == "error") {
      if (response?.error?.message) {
        setAuthError(response?.error?.message);
      }
    }
  }, [response]);

  useEffect(() => {
    if (facebookAccessToken === null) return;

    async function getAndSetProfile() {
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me/?fields=id,name,email,picture`,
        {
          headers: {
            Authorization: `Bearer ${facebookAccessToken}`
          }
        }
      );

      userInfoResponse
        .json()
        .then((data) => {
          setIdentity({
            sub: data.id,
            provider: "facebook",
            identityData: {
              name: data?.name,
              email: data?.email, // might not be returned
              picture: data?.picture?.data?.url
            }
          });
        })
        .catch((error: unknown) => {
          setIdentity(null);
          setAuthError("Facebook authentication unsuccesful.");
        });
    }

    getAndSetProfile();
  }, [facebookAccessToken]);

  const loginWithFacebook = async () => {
    await withProviderSignIn(promptAsync);
  };

  const signOutFacebook = () => {
    withProviderSignOut(() => {
      setFacebookAccessToken(null);
      setIdentity(null);
    });
  };

  return {
    loginWithFacebook,
    signOutFacebook
  };
};

export default useFacebookAuth;
