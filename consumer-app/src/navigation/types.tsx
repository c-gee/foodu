import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MenuItem } from "../models/types";

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Message: undefined;
  Wallet: undefined;
  Profile: { screenTitle?: string };
};

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<MainTabParamList>;
  SignIn: undefined;
  SignUp: undefined;
  PhoneLogin: undefined;
  OTPCodeVerification: {
    phone: string;
  };
  SpecialOffers: undefined;
  Promos: undefined;
  CuisineCategories: undefined;
  Recommendations: undefined;
  Search: undefined;
  SearchFilter: {
    showSortByOnly?: boolean;
  };
  Merchant: {
    id: number | string;
    showMenuItem?: boolean;
    menuItem?: MenuItem;
  };
  MenuItem: {
    menuItem: MenuItem;
  };
  FillYourProfile: { screenTitle?: string };
};

export type ProfileParamList = {
  Profile: { screenTitle?: string };
  FillYourProfile: { screenTitle?: string };
};

export type ProfileScreenProps<T extends keyof ProfileParamList> =
  CompositeScreenProps<
    RootStackScreenProps<"FillYourProfile">,
    BottomTabScreenProps<ProfileParamList, "Profile">
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
