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
import { useAuth } from "../../contexts/AuthContext";
import useUserData from "../../hooks/UserData";

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
  const { isTokensLoaded, reloadTokens, refreshAuthTokens } = useAuth();
  const [newAccessTokenLoaded, setNewAccessTokenLoaded] =
    useState<boolean>(false);
  const opacityAnimation = useMemo(() => new Animated.Value(1), []);
  const scaleAnimation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState<boolean>(false);
  const [isTokensRefreshed, setTokensRefreshed] = useState<boolean>(false);
  const [isSplashAnimationComplete, setSplashAnimationComplete] =
    useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });

  const { isUserLoaded, setUserLoadingComplete, loadUser } = useUserData();

  useEffect(() => {
    reloadTokens();
  }, []);

  useEffect(() => {
    if (!isTokensLoaded) return;
    if (isTokensRefreshed) return;

    async function refreshTokens() {
      try {
        await refreshAuthTokens();
        setNewAccessTokenLoaded(true);
      } catch (error: unknown) {
        setUserLoadingComplete();
      } finally {
        setTokensRefreshed(true);
      }
    }

    refreshTokens();
  }, [isTokensLoaded, isTokensRefreshed]);

  useEffect(() => {
    if (!isTokensRefreshed) return;
    if (!newAccessTokenLoaded) return;

    loadUser();
  }, [isTokensRefreshed, newAccessTokenLoaded]);

  useEffect(() => {
    if (isAppReady && isUserLoaded) {
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
  }, [isAppReady, isUserLoaded]);

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
      {isAppReady && isUserLoaded && children}
      {(!isSplashAnimationComplete || !isUserLoaded) && (
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
