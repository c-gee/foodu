import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useAppDispatch, useAppSelector } from "../Redux";
import { setUserLoaded } from "../../features/auth/authSlice";
import { useMeQuery } from "../../features/modules/user.generated";
import { useAuth } from "../../contexts/AuthContext";

const useUserData = () => {
  const { setUser, setAuthenticated } = useAuth();
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
      setUserLoadingComplete();
      Alert.alert(
        "We have a little problem.",
        "Please try again, or contact our support if the problem persist."
      );
    }
  }, [userData, userError]);

  const setUserLoadingComplete = () => {
    dispatch(setUserLoaded(true));
  };

  const loadUser = () => {
    setSkipUserQuery(false);
  };

  return {
    isLoadingUserData,
    isUserLoaded,
    setUserLoadingComplete,
    loadUser
  };
};

export default useUserData;
