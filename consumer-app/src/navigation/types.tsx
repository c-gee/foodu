import type {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  SpecialOffers: undefined;
  Promos: undefined;
  MenuCategories: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
