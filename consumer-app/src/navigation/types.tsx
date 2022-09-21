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
  Profile: undefined;
};

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
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

export type ProfileStackParamList = {
  Profile: undefined;
  FavouriteRestaurants: undefined;
  OffersAndPromos: undefined;
  PaymentMethods: undefined;
  ProfileUpdate: { screenTitle?: string };
  Address: undefined;
  Notification: undefined;
  Security: undefined;
  Language: undefined;
  HelpCenter: undefined;
  InviteFriends: undefined;
};

export type ProfileUpdateParamList = {
  ProfileUpdate: { screenTitle?: string };
  FillYourProfile: { screenTitle?: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
