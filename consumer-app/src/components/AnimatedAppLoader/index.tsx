import { View, Animated, StyleSheet } from "react-native";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold
} from "@expo-google-fonts/urbanist";

import FullScreenLoader from "../FullScreenLoader";
import useAppData from "../../hooks/AppData";
import useAuth from "../../hooks/Auth";
import { useAppVarsQuery } from "../../features/modules/app.generated";

const SPLASH_URI = "../../../assets/splash.png";

type SplashScreenProps = {
  children: ReactNode;
  image: {
    uri: string;
  };
};

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const AnimatedSplashScreen = ({ children, image }: SplashScreenProps) => {
  const [newAccessTokenLoaded, setNewAccessTokenLoaded] =
    useState<boolean>(false);
  const opacityAnimation = useMemo(() => new Animated.Value(1), []);
  const scaleAnimation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState<boolean>(false);
  const [isSplashAnimationComplete, setSplashAnimationComplete] =
    useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });
  const { loadAppData } = useAppData();
  const {
    setAuthenticated,
    isTokensLoaded,
    reloadTokens,
    refreshAuthTokens,
    refreshToken,
    accessToken,
    isUserLoadingComplete,
    setUserLoadingCompleted,
    loadUser
  } = useAuth();
  const {} = useAppVarsQuery({}, { refetchOnMountOrArgChange: true }); // Inital fetch and cache

  useEffect(() => {
    loadAppData();
    reloadTokens();
  }, []);

  useEffect(() => {
    if (!isTokensLoaded) return;

    if (!refreshToken || !accessToken) {
      setUserLoadingCompleted();
      setAuthenticated(false);
      return;
    }

    if (isUserLoadingComplete) return;

    async function refreshTokens() {
      try {
        const response = await refreshAuthTokens();

        if (response) {
          setNewAccessTokenLoaded(true);
        }
      } catch (error: unknown) {
        // Ignore error, will show sign in screen
        console.log(error);
      } finally {
        setUserLoadingCompleted();
      }
    }

    refreshTokens();
  }, [isTokensLoaded, isUserLoadingComplete]);

  useEffect(() => {
    if (!newAccessTokenLoaded) return;

    loadUser();
  }, [newAccessTokenLoaded]);

  useEffect(() => {
    if (isAppReady && isUserLoadingComplete) {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => setSplashAnimationComplete(true));
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true
      }).start(() => setSplashAnimationComplete(true));
    }
  }, [isAppReady, isUserLoadingComplete]);

  const onResourcesLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();

      if (!fontsLoaded) return;

      await Promise.all([]);
    } catch (error: unknown) {
      console.log("onResourcesLoaded error", error);
    }

    setAppReady(true);
  }, [fontsLoaded]);

  return (
    <View className="flex-1">
      {isAppReady && isUserLoadingComplete && children}
      {(!isSplashAnimationComplete || !isUserLoadingComplete) && (
        <>
          <FullScreenLoader position="bottom" transparent={true} />
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor:
                  Constants?.manifest?.splash?.backgroundColor || "#FFFFFF",
                opacity: opacityAnimation
              }
            ]}
          >
            <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode:
                  Constants?.manifest?.splash?.resizeMode || "contain",
                transform: [
                  {
                    scale: scaleAnimation
                  }
                ]
              }}
              source={image}
              onLoadEnd={onResourcesLoaded}
              fadeDuration={0}
            />
          </Animated.View>
        </>
      )}
    </View>
  );
};

const AnimatedAppLoader = ({ children }: { children: ReactNode }) => {
  const [isSplashScreenReady, setIsSplashScreenReady] = useState(false);
  const [splashImage, setSplashImage] = useState<Asset | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        const image = await Asset.loadAsync(require(SPLASH_URI));
        setSplashImage(image[0]);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsSplashScreenReady(true);
      }
    }

    prepare();
  }, []);

  if (!isSplashScreenReady || !splashImage) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={{ uri: splashImage.uri }}>
      {children}
    </AnimatedSplashScreen>
  );
};

export default AnimatedAppLoader;
