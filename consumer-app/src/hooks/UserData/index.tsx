import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../Redux";
import { setUserLoaded } from "../../features/auth/authSlice";
import { useMeQuery } from "../../features/modules/user.generated";
import { useAuth } from "../../contexts/AuthContext";

const useUserData = () => {
  const { setUser, setAuthenticated } = useAuth();
  const [skipUserQuery, setSkipUserQuery] = useState<boolean>(true);
  const {
    data,
    isLoading: isLoadingUserData,
    error
  } = useMeQuery({}, { skip: skipUserQuery });
  const isUserLoaded = useAppSelector((state) => state.auth.isUserLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
  }, [data, error]);

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
