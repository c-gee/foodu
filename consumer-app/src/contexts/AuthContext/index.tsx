import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

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
};

const AuthContext = createContext<Auth>({
  user: null,
  loading: false,
  onGoogleSignIn: () => {},
  onFacebookLogin: () => {},
  onSignOut: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  rememberMe: false,
  setRememberMe: () => {}
});

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

  useEffect(() => {
    if (refreshToken === null || refreshToken.length === 0) return;

    if (rememberMe) {
      console.log("Saving Refresh Token", refreshToken);
      // Save refresh token to device storage...
    }
  }, [refreshToken, rememberMe]);

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

  const onSignOut = () => {
    if (identity?.provider === "google") {
      signOutGoogle();
    } else if (identity?.provider === "facebook") {
      signOutFacebook();
    }

    setUser(null);
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
        setRememberMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
