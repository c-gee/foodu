import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState, useEffect } from "react";
import {
  UserIcon,
  HeartIcon,
  ReceiptPercentIcon,
  MapPinIcon,
  BellIcon,
  ShieldExclamationIcon,
  LanguageIcon,
  EyeIcon,
  InformationCircleIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon
} from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";

import TopBar from "./TopBar";
import Header from "./Header";
import ListItemRow, { ListItemRowType } from "./ListItemRow";
import { ProfileStackScreenProps } from "../../navigation/types";
import { useAuthContext } from "../../contexts/AuthContext";
import useAppData from "../../hooks/AppData";
import useAuth from "../../hooks/Auth";

const ProfileScreen = ({ navigation }: ProfileStackScreenProps<"Profile">) => {
  const { user } = useAuth();
  const { signOutApp } = useAuthContext();
  const { theme, language, setAppTheme } = useAppData();
  const [darkMode, setDarkMode] = useState<boolean>(theme === "dark");

  useEffect(() => {
    setAppTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  const topSection = useMemo(
    () => [
      {
        icon: <HeartIcon size={28} color="#111827" />,
        title: "My Favorite Restaurants",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("FavouriteRestaurants");
        }
      },
      {
        icon: <ReceiptPercentIcon size={28} color="#111827" />,
        title: "Special Offers & Promo",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("OffersAndPromos");
        }
      },
      {
        icon: <Ionicons name="wallet-outline" size={24} color="#111827" />,
        title: "Paymen Method",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("PaymentMethods");
        }
      }
    ],
    []
  );

  const midSection = useMemo(
    () => [
      {
        icon: <UserIcon size={28} color="#111827" />,
        title: "Profile",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("ProfileUpdate", {
            screenTitle: "Profile"
          });
        }
      },
      {
        icon: <MapPinIcon size={28} color="#111827" />,
        title: "Address",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("Address");
        }
      },
      {
        icon: <BellIcon size={28} color="#111827" />,
        title: "Notification",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("Notification");
        }
      },
      {
        icon: <ShieldExclamationIcon size={28} color="#111827" />,
        title: "Security",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("Security");
        }
      },
      {
        icon: <LanguageIcon size={28} color="#111827" />,
        title: "Language",
        value: language, // get from redux state
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("Language");
        }
      },
      {
        icon: <EyeIcon size={28} color="#111827" />,
        title: "Dark Mode",
        value: darkMode,
        type: "Switch" as ListItemRowType,
        onPress: () => {
          setDarkMode(!darkMode);
        }
      },
      {
        icon: <InformationCircleIcon size={28} color="#111827" />,
        title: "Help Center",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("HelpCenter");
        }
      },
      {
        icon: <UserGroupIcon size={28} color="#111827" />,
        title: "Invite Friends",
        type: "Link" as ListItemRowType,
        onPress: () => {
          navigation.navigate("InviteFriends");
        }
      }
    ],
    [darkMode]
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 24
        }}
      >
        <View className="flex justify-start">
          <TopBar />
          <Header
            picture={user?.picture}
            name={user?.name}
            phone={user?.phone}
            onEditPress={() =>
              navigation.navigate("ProfileUpdate", {
                screenTitle: "Profile"
              })
            }
          />
          <View className="h-[1px] bg-gray-200" />
          <View className="py-3 flex justify-start">
            {topSection.map((item) => (
              <ListItemRow key={item.title} item={item} />
            ))}
          </View>
          <View className="h-[1px] bg-gray-200" />
          <View className="py-3 flex justify-start">
            {midSection.map((item) => (
              <ListItemRow key={item.title} item={item} />
            ))}
          </View>
          <View className="flex flex-row justify-start items-center ">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={signOutApp}
            >
              <ArrowRightOnRectangleIcon size={28} color="#F87171" />
              <Text className="ml-4 text-lg text-red-400 font-semibold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
