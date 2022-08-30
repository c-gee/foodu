import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  SpecialOffers: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type SpecialOfferScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SpecialOffers"
>;
