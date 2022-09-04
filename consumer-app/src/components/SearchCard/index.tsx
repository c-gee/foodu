import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";

import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { HeartIcon } from "react-native-heroicons/outline";

type MerchantProps = {
  title: string;
  imageURL: string;
  rating: number;
  totalReviews: number;
  deliveryFee: string;
  distance: number;
  badge?: string;
  onPress: () => void;
  variant: "xs" | "sm" | "base" | "lg" | "xl";
};

type MenuItemProps = {
  id: number | string;
  title: string;
  price: number;
  imageURL: string;
  badge?: string | null;
  onPress: () => void;
  variant: "xs" | "sm" | "base" | "lg" | "xl";
};

type Props = {
  merchant: MerchantProps;
  menu_items?: MenuItemProps[];
};

const SearchCard = ({ merchant, menu_items = [] }: Props) => {
  return (
    <View
      className="bg-white p-[14px] shadow-md shadow-slate-200 mx-6"
      style={{
        ...Platform.select({
          android: {
            shadowOffset: {
              width: 0,
              height: 10
            },
            shadowColor: "#A9A9A9",
            shadowRadius: 10,
            shadowOpacity: 0.1,
            elevation: 10,
            borderRadius: 28,
            backgroundColor: "white"
          },
          ios: {
            borderRadius: 28
          }
        })
      }}
    >
      <TouchableOpacity className="flex-row" onPress={merchant.onPress}>
        <View className="relative">
          <Image
            source={{
              uri: merchant.imageURL
            }}
            style={styles.image(merchant.variant)}
            resizeMode="cover"
          />
          {merchant.badge && (
            <View className="absolute top-3 left-3 self-start bg-primary p-[6] px-[8] rounded-md">
              <Text className="text-xxs text-semibold text-white">
                {merchant.badge}
              </Text>
            </View>
          )}
        </View>
        <View className="ml-3 flex flex-1 justify-around">
          <Text
            className="text-gray-900 font-bold"
            style={styles.title(merchant.variant)}
            numberOfLines={1}
          >
            {merchant.title}
          </Text>
          <View className="mt-2 flex-row justify-start items-center space-x-2">
            <Text className="text-xs text-gray-700 font-medium">
              {merchant.distance.toFixed(1)} km
            </Text>
            <Text className="text-xs text-gray-700 font-medium">|</Text>
            <View className="flex flex-row justify-start items-center space-x-1">
              <StarIcon color="#FFAB38" size={16} />
              <Text className="text-xs text-gray-700 font-medium">
                {merchant.rating > 0 ? merchant.rating : "N/A"}
              </Text>
              <Text className="text-xs text-gray-700 font-medium">
                {merchant.totalReviews > 0
                  ? `(${merchant.totalReviews})`
                  : null}
              </Text>
            </View>
          </View>
          <View className="mt-2 flex-row justify-between items-center">
            <View className="flex-row justify-start items-center space-x-1">
              <MaterialIcons name="delivery-dining" size={20} color="#1BAC4B" />
              <Text className="text-xs text-gray-700 font-medium">
                {merchant.deliveryFee}
              </Text>
            </View>
            <HeartIcon color="#FF8A9B" size={24} />
          </View>
        </View>
      </TouchableOpacity>
      {menu_items.length > 0 && (
        <View className="h-3  border-b-[1px] border-b-gray-200" />
      )}
      {menu_items.map((item) => (
        <View className="pt-3" key={item.id}>
          <TouchableOpacity
            className="flex flex-row items-center bg-white"
            onPress={item.onPress}
          >
            <View className="flex-0">
              <Image
                source={{
                  uri: item.imageURL
                }}
                style={styles.image(item.variant)}
                resizeMode="cover"
              />
            </View>
            <View className="flex flex-1 justify-center ml-4 space-y-3">
              {item.badge && item.variant !== "xs" && (
                <View className="self-start bg-primary p-[6] px-[8] rounded-md">
                  <Text className="text-xxs text-semibold text-white">
                    {item.badge}
                  </Text>
                </View>
              )}
              <Text
                className="text-gray-900 font-bold"
                style={styles.title(item.variant)}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text className="text-lg text-primary font-medium">
                RM{item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SearchCard;
