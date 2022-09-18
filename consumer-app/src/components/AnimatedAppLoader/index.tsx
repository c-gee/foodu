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
import { useAppSelector, useAppDispatch } from "../../hooks/Redux/index";
import { useMeQuery } from "../../features/modules/user.generated";
import { loadAccessToken } from "../../features/auth/authSlice";

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
  const { setUser, reloadTokens, isTokensLoaded } = useAuth();
  const opacityAnimation = useMemo(() => new Animated.Value(1), []);
  const scaleAnimation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [skipUserQuery, setSkipUserQuery] = useState(true);
  const [isSplashAnimationComplete, setSplashAnimationComplete] =
    useState(false);
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { data: userData, error: userError } = useMeQuery(
    {},
    { skip: skipUserQuery }
  );

  useEffect(() => {
    reloadTokens();
  }, []);

  useEffect(() => {
    if (!isTokensLoaded) return;

    console.log("accessToken", accessToken);

    if (accessToken) {
      setSkipUserQuery(false);
    } else {
      setUserLoaded(true);
    }
  }, [isTokensLoaded]);

  useEffect(() => {
    if (userData && userData.me) {
      console.log("data", userData);
      setUser(userData.me);
      setUserLoaded(true);
    }

    if (userError) {
      console.log("userError", userError?.message);
      // Access token already expired
      dispatch(loadAccessToken(null));

      // Try to refresh the tokens??
      setUserLoaded(true);
    }
  }, [userData, userError]);

  useEffect(() => {
    if (isAppReady) {
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
  }, [isAppReady]);

  const onResourcesLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();

      console.log("isUserLoaded", isUserLoaded);

      if (!fontsLoaded) return;
      if (!isUserLoaded) return;

      await Promise.all([]);
    } catch (error: unknown) {
      console.log("onResourcesLoaded error", error);
    }

    setIsAppReady(true);
  }, [fontsLoaded, isUserLoaded]);

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
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
