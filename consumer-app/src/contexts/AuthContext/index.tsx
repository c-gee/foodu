import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import * as SecureStore from "expo-secure-store";

import useGoogleAuth from "../../hooks/GoogleAuth";
import useFacebookAuth from "../../hooks/FacebookAuth";
import { User } from "../../features/graphql/types.generated";

type AuthProvider = "google" | "facebook";

type Identity = {
  provider: AuthProvider;
  sub?: string | number;
  email?: string;
  name?: string;
  picture?: string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Auth = {
  user: User | null;
  loading: boolean;
  onGoogleSignIn: () => void;
  onFacebookLogin: () => void;
  onSignOut: () => void;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  saveTokens: ({ accessToken, refreshToken }: Tokens) => void;
};

const AuthContext = createContext<Auth>({
  user: null,
  loading: false,
  onGoogleSignIn: async () => {},
  onFacebookLogin: async () => {},
  onSignOut: async () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  rememberMe: false,
  setRememberMe: () => {},
  saveTokens: async ({ accessToken, refreshToken }: Tokens) => {}
});

const ACCESS_TOKEN_KEY = "foodu-access-token";
const REFRESH_TOKEN_KEY = "foodu-refresh-token";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { googleProfile, signInWithGoogle, signOutGoogle } = useGoogleAuth();
  const { facebookProfile, loginWithFacebook, signOutFacebook } =
    useFacebookAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (googleProfile === null || !googleProfile?.userInfo?.sub) return;

    setIdentity(googleProfile);
  }, [googleProfile]);

  useEffect(() => {
    if (facebookProfile === null || !facebookProfile?.userInfo?.sub) return;

    setIdentity(facebookProfile);
  }, [facebookProfile]);

  const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
    if (!accessToken || accessToken === null || accessToken.length === 0) {
      throw "Access token not given!";
    }

    if (!accessToken || refreshToken === null || accessToken.length === 0) {
      throw "Refresh token not given!";
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  };

  const resetTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const onGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
      setRememberMe(true);
    } catch (error) {
      console.log("Authentication error", error);
    } finally {
      setLoading(false);
    }
  };

  const onFacebookLogin = async () => {
    setLoading(true);

    try {
      await loginWithFacebook();
      setRememberMe(true);
    } catch (error) {
      console.log("Authentication error", error);
    } finally {
      setLoading(false);
    }
  };

  const onSignOut = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

    resetTokens();
    setUser(null);

    if (identity?.provider === "google") {
      signOutGoogle();
    } else if (identity?.provider === "facebook") {
      signOutFacebook();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        onGoogleSignIn,
        onFacebookLogin,
        onSignOut,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        rememberMe,
        setRememberMe,
        saveTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
