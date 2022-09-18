import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../../features/graphql/types.generated";
import { useAppDispatch } from "../../hooks/Redux/index";
import { loadAccessToken } from "../../features/auth/authSlice";

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

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Auth = {
  isTokensLoaded: boolean;
  setTokensLoaded: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  authLoading: boolean;
  withProviderSignIn: <T extends AsyncFn>(
    signInWithProviderFn: T
  ) => Promise<void>;
  withProviderSignOut: (signOutProviderFn: () => void) => Promise<void>;
  signOut: () => Promise<void>;
  identity: Identity | null;
  setIdentity: Dispatch<SetStateAction<Identity | null>>;
  authError: string | null;
  setAuthError: Dispatch<SetStateAction<string | null>>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  saveTokens: ({ accessToken, refreshToken }: Tokens) => void;
  reloadTokens: () => Promise<void>;
};

const AuthContext = createContext<Auth>({
  isTokensLoaded: false,
  setTokensLoaded: () => {},
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  authLoading: false,
  withProviderSignIn: async () => {},
  withProviderSignOut: async () => {},
  signOut: async () => {},
  identity: null,
  setIdentity: () => {},
  authError: null,
  setAuthError: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  rememberMe: false,
  setRememberMe: () => {},
  saveTokens: async ({ accessToken, refreshToken }: Tokens) => {},
  reloadTokens: async () => {}
});

const ACCESS_TOKEN_KEY = "foodu-access-token";
const REFRESH_TOKEN_KEY = "foodu-refresh-token";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isTokensLoaded, setTokensLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const reloadTokens = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      setRefreshToken(refreshToken);
      setAccessToken(accessToken);

      dispatch(loadAccessToken(accessToken));
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

    if (!accessToken || accessToken.length === 0) {
      throw "Refresh token not given!";
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  };

  const resetTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

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
    signOut();
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    resetTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isTokensLoaded,
        setTokensLoaded,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        authLoading,
        withProviderSignIn,
        withProviderSignOut,
        signOut,
        identity,
        setIdentity,
        authError,
        setAuthError,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        rememberMe,
        setRememberMe,
        saveTokens,
        reloadTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
