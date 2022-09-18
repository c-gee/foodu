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
import { useAppDispatch, useAppSelector } from "../../hooks/Redux/index";
import {
  loadAccessToken,
  loadRefreshToken
} from "../../features/auth/authSlice";

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
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isTokensLoaded: boolean;
  setTokensLoaded: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
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
  accessToken: string | null;
  refreshToken: string | null;
  saveTokens: ({ accessToken, refreshToken }: Tokens) => void;
  reloadTokens: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Auth>({
  user: null,
  setUser: () => {},
  isTokensLoaded: false,
  setTokensLoaded: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  rememberMe: false,
  setRememberMe: () => {},
  authLoading: false,
  withProviderSignIn: async () => {},
  withProviderSignOut: async () => {},
  identity: null,
  setIdentity: () => {},
  authError: null,
  setAuthError: () => {},
  accessToken: null,
  refreshToken: null,
  saveTokens: async ({ accessToken, refreshToken }: Tokens) => {},
  reloadTokens: async () => {},
  signOut: async () => {}
});

const ACCESS_TOKEN_KEY = "foodu-access-token";
const REFRESH_TOKEN_KEY = "foodu-refresh-token";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // For general authentication
  const [user, setUser] = useState<User | null>(null);
  const [isTokensLoaded, setTokensLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // For provider authentications
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // For redux store RTK queries
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const dispatch = useAppDispatch();

  const reloadTokens = async () => {
    try {
      const accessTokenFromStore = await SecureStore.getItemAsync(
        ACCESS_TOKEN_KEY
      );
      const refreshTokenFromStore = await SecureStore.getItemAsync(
        REFRESH_TOKEN_KEY
      );

      dispatch(loadAccessToken(accessTokenFromStore));
      dispatch(loadRefreshToken(refreshTokenFromStore));
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
    dispatch(loadAccessToken(accessToken));
    dispatch(loadRefreshToken(refreshToken));
  };

  const resetTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    dispatch(loadAccessToken(null));
    dispatch(loadRefreshToken(null));
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
    await resetTokens();
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
        rememberMe,
        setRememberMe,
        authLoading,
        withProviderSignIn,
        withProviderSignOut,
        identity,
        setIdentity,
        authError,
        setAuthError,
        accessToken,
        refreshToken,
        saveTokens,
        reloadTokens,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
