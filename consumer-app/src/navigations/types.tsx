import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  SpecialOffers: undefined;
  Promos: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
