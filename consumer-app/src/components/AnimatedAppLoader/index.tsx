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
  const opacityAnimation = useMemo(() => new Animated.Value(1), []);
  const scaleAnimation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  let [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold
  });

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onResourcesLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();

      if (!fontsLoaded) return;

      await Promise.all([]);
    } catch (error) {
    } finally {
      setIsAppReady(true);
    }
  }, [fontsLoaded]);

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <>
          <FullScreenLoader position="bottom" />
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
