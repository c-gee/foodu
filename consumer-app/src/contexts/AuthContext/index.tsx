import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import useGoogleAuth from "../../hooks/GoogleAuth";
import { User } from "../../types/User";

type AuthProvider = "google" | "facebook" | null;
type Auth = {
  user: User | null;
  loading: boolean;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
};

const AuthContext = createContext<Auth>({
  user: null,
  loading: false,
  onGoogleSignIn: () => {},
  onSignOut: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authProvider, setAuthProvider] = useState<AuthProvider>(null);
  const { userInfo, signInWithGoogle, signOutGoogle } = useGoogleAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo === null) return;

    setAuthProvider("google");
  }, [userInfo]);

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

  const onSignOut = () => {
    if (authProvider === "google") {
      signOutGoogle();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, user, onGoogleSignIn, onSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
