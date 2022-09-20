import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../Redux";
import { setUserLoaded } from "../../features/auth/authSlice";
import { useMeQuery } from "../../features/modules/user.generated";
import { useAuth } from "../../contexts/AuthContext";

const useUserData = () => {
  const { setUser, setAuthenticated, accessToken, refreshToken } = useAuth();
  const [skipUserQuery, setSkipUserQuery] = useState<boolean>(true);
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUserData
  } = useMeQuery({}, { skip: skipUserQuery });
  const isUserLoaded = useAppSelector((state) => state.auth.isUserLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData && userData.me) {
      setUser(userData.me);
      setAuthenticated(true);
      setUserLoadingComplete();
    }

    if (userError) {
      setUser(null);
      setAuthenticated(false);
      setUserLoadingComplete();
    }
  }, [userData, userError]);

  const setUserLoadingComplete = () => {
    dispatch(setUserLoaded(true));
  };

  const loadUser = () => {
    if (!accessToken) return;
    setSkipUserQuery(false);
  };

  return {
    isLoadingUserData,
    isUserLoaded,
    setUserLoadingComplete,
    loadUser,
    setSkipUserQuery
  };
};

export default useUserData;
