import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { useAppDispatch, useAppSelector } from "../Redux";
import {
  Tokens,
  setUserLoaded,
  setUserData,
  setUserAuthenticated,
  resetAuth,
  setAuthTokens
} from "../../features/auth/authSlice";
import {
  api,
  useMeQuery,
  useRefreshTokensMutation
} from "../../features/modules/user.generated";
import { User } from "../../features/graphql/types.generated";

const ACCESS_TOKEN_KEY = "foodu-access-token";
const REFRESH_TOKEN_KEY = "foodu-refresh-token";

const useAuth = () => {
  const [isTokensLoaded, setTokensLoaded] = useState<boolean>(false);
  const [skipUserQuery, setSkipUserQuery] = useState<boolean>(true);
  const {
    data,
    isLoading: isLoadingUserData,
    error
  } = useMeQuery({}, { skip: skipUserQuery });
  const [refreshTokens, { reset: resetRefreshTokensMutation }] =
    useRefreshTokensMutation();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const isUserLoaded = useAppSelector((state) => state.auth.isUserLoaded);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    if (data && data.me) {
      setUser(data.me);
      setAuthenticated(true);
      setUserLoadingComplete();
      setSkipUserQuery(true);
    }

    if (error) {
      setUser(null);
      setAuthenticated(false);
      setUserLoadingComplete();
      setSkipUserQuery(true);
    }
  }, [data, error, accessToken, refreshToken]);

  const setAuthenticated = (isAuthenticated: boolean) => {
    dispatch(setUserAuthenticated(isAuthenticated));
  };

  const setUserLoadingComplete = () => {
    dispatch(setUserLoaded(true));
  };

  const setUser = (user: User | null) => {
    dispatch(setUserData(user));
  };

  const loadUser = () => {
    setSkipUserQuery(false);
  };

  const refreshAuthTokens = async (): Promise<boolean> => {
    if (!refreshToken || !accessToken)
      throw new Error("Both refresh token and access token are required.");

    try {
      const response = await refreshTokens({
        refreshToken,
        accessToken
      });

      if ("data" in response && response.data?.refreshTokens) {
        const { accessToken, refreshToken } = response.data?.refreshTokens;

        if (accessToken && refreshToken) {
          await saveTokens({
            accessToken,
            refreshToken
          });

          return true;
        }

        resetTokens();
        return false;
      } else if ("error" in response) {
        resetTokens();
        return false;
      }

      return false;
    } catch (error: unknown) {
      // Refresh token already expired...
      resetTokens();
      return false;
    }
  };

  const reloadTokens = async () => {
    try {
      const accessTokenFromStore = await SecureStore.getItemAsync(
        ACCESS_TOKEN_KEY
      );
      const refreshTokenFromStore = await SecureStore.getItemAsync(
        REFRESH_TOKEN_KEY
      );

      dispatch(
        setAuthTokens({
          accessToken: accessTokenFromStore,
          refreshToken: refreshTokenFromStore
        })
      );
    } catch (error: unknown) {
      console.log("Loading Tokens error", error);
    } finally {
      setTokensLoaded(true);
    }
  };

  const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
    if (!accessToken || accessToken.length === 0) {
      throw "Access token not given!";
    }

    if (!refreshToken || refreshToken.length === 0) {
      throw "Refresh token not given!";
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  };

  const resetTokens = async () => {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.log("deleteItemAsync", error);
    }

    dispatch(
      setAuthTokens({
        accessToken: null,
        refreshToken: null
      })
    );

    resetRefreshTokensMutation();
  };

  const resetAuthState = () => {
    dispatch(resetAuth());
  };

  const resetUserApiState = () => {
    dispatch(api.util.resetApiState());
  };

  return {
    isAuthenticated,
    setAuthenticated,
    user,
    setUser,
    isLoadingUserData,
    isUserLoaded,
    setUserLoadingComplete,
    loadUser,
    accessToken,
    refreshToken,
    isTokensLoaded,
    refreshAuthTokens,
    reloadTokens,
    saveTokens,
    resetTokens,
    resetAuthState,
    resetUserApiState
  };
};

export default useAuth;
