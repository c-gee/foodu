import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import useGoogleAuth from "../../hooks/GoogleAuth";
import useFacebookAuth from "../../hooks/FacebookAuth";
import { User } from "../../types/User";

type AuthProvider = "google" | "facebook";
type SocialProfile = {
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
};

const AuthContext = createContext<Auth>({
  user: null,
  loading: false,
  onGoogleSignIn: () => {},
  onFacebookLogin: () => {},
  onSignOut: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [socialProfile, setSocialProfile] = useState<SocialProfile | null>(
    null
  );
  const { googleProfile, signInWithGoogle, signOutGoogle } = useGoogleAuth();
  const { facebookProfile, loginWithFacebook, signOutFacebook } =
    useFacebookAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (googleProfile === null || !googleProfile?.userInfo?.sub) return;

    setSocialProfile(googleProfile);
  }, [googleProfile]);

  useEffect(() => {
    if (facebookProfile === null || !facebookProfile?.userInfo?.sub) return;

    setSocialProfile(facebookProfile);
  }, [facebookProfile]);

  const onGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
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
    } catch (error) {
      console.log("Authentication error", error);
    } finally {
      setLoading(false);
    }
  };

  const onSignOut = () => {
    if (socialProfile?.provider === "google") {
      signOutGoogle();
    } else if (socialProfile?.provider === "facebook") {
      signOutFacebook();
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loading, user, onGoogleSignIn, onFacebookLogin, onSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
