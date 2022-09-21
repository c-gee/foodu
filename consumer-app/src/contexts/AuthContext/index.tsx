import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

import useAuth from "../../hooks/Auth";
import { useSignOutMutation } from "../../features/modules/user.generated";

type AuthProvider = "google" | "facebook";

export type Identity = {
  provider: AuthProvider;
  sub: string;
  identityData: {
    email?: string;
    name?: string;
    picture?: string;
  };
};

type AsyncFn = (...args: any[]) => Promise<any>;

type Auth = {
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  authLoading: boolean;
  withProviderSignIn: <T extends AsyncFn>(
    signInWithProviderFn: T
  ) => Promise<void>;
  withProviderSignOut: (signOutProviderFn: () => void) => Promise<void>;
  identity: Identity | null;
  setIdentity: Dispatch<SetStateAction<Identity | null>>;
  authError: string | null;
  setAuthError: Dispatch<SetStateAction<string | null>>;
  isSignOutLoading: boolean;
  signOutApp: () => void;
};

const AuthContext = createContext<Auth>({
  rememberMe: false,
  setRememberMe: () => {},
  authLoading: false,
  withProviderSignIn: async () => {},
  withProviderSignOut: async () => {},
  identity: null,
  setIdentity: () => {},
  authError: null,
  setAuthError: () => {},
  isSignOutLoading: false,
  signOutApp: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // For general authentication
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // For provider authentications
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // For redux auth state
  const {
    refreshToken,
    resetTokens,
    setUser,
    setAuthenticated,
    resetAuthState,
    resetUserApiState
  } = useAuth();

  const [
    signOut,
    { data: signOutData, error: signOutError, isLoading: isSignOutLoading }
  ] = useSignOutMutation();

  useEffect(() => {
    if (signOutData || signOutError) {
      signOut();
    }
  }, [signOutData, signOutError]);

  const withProviderSignIn = async <T extends AsyncFn>(
    signInWithProviderFn: T
  ) => {
    setAuthLoading(true);

    try {
      await signInWithProviderFn();
    } catch (error: unknown) {
      console.log("Provider authentication error", error);
      setAuthError("Authentication failed with provider.");
    } finally {
      setAuthLoading(false);
    }
  };

  const withProviderSignOut = async (signOutProviderFn: () => void) => {
    signOutProviderFn();
  };

  const signOutApp = async () => {
    await Promise.all([
      await signOut({ refreshToken }),
      setRememberMe(false),
      setIdentity(null),
      setUser(null),
      resetTokens(),
      resetAuthState(),
      resetUserApiState()
    ]).then(() => {
      setAuthenticated(false);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        rememberMe,
        setRememberMe,
        authLoading,
        withProviderSignIn,
        withProviderSignOut,
        identity,
        setIdentity,
        authError,
        setAuthError,
        isSignOutLoading,
        signOutApp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
