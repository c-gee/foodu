import type {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from "@react-navigation/native-stack";

type SearchType = "restaurant" | "cuisine";

export type RootStackParamList = {
  Home: undefined;
  SpecialOffers: undefined;
  Promos: undefined;
  CuisineCategories: undefined;
  Recommendations: undefined;
  Search: { keyword: string; type: SearchType } | undefined;
  Merchant: { id: number };
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
