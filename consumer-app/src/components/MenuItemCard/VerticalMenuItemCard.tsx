import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/outline";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";

type Props = {
  title: string;
  price: number;
  imageURL: string;
  rating?: number;
  totalReviews?: number;
  deliveryFee?: number;
  distance?: number;
  showReviews?: boolean;
  showDistance?: boolean;
  showFavorited?: boolean;
  badge?: string | null;
  onPress: () => void;
  variant: "xs" | "sm" | "base" | "lg" | "xl";
};

export const VerticalMenuItemCard = ({
  title,
  imageURL,
  price,
  rating,
  totalReviews,
  deliveryFee,
  distance,
  showReviews = false,
  showDistance = false,
  showFavorited = false,
  badge,
  onPress,
  variant = "base"
}: Props) => {
  return (
    <TouchableOpacity
      className="flex bg-white p-[14] pb-4 shadow-md shadow-slate-200"
      style={[
        styles.container(variant, "vertical"),
        {
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
        }
      ]}
      onPress={onPress}
    >
      <View className="flex-0">
        <Image
          source={{
            uri: imageURL
          }}
          style={styles.image(variant)}
          resizeMode="cover"
        />
        {badge && (
          <View className="absolute top-3 left-3 bg-primary p-[6] px-[8] rounded-md">
            <Text className="text-xxs text-semibold text-white">{badge}</Text>
          </View>
        )}
      </View>
      <View className="mt-2 flex-1 justify-between space-y-3">
        <Text
          className="text-xl text-gray-900 font-bold items-start"
          style={styles.title(variant)}
          numberOfLines={variant == "regular" ? 2 : 1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View className="mt-2 flex-row justify-start items-center space-x-2">
          {showDistance && distance && (
            <Text className="text-xs text-gray-700 font-medium">
              {(distance / 1000).toFixed(1)} km
            </Text>
          )}
          {showReviews && (
            <View className="flex flex-row justify-start items-center space-x-2">
              <Text className="text-xs text-gray-700 font-medium">|</Text>
              {rating !== undefined && (
                <View className="flex flex-row justify-start items-center space-x-1">
                  <StarIcon color="#FFAB38" size={16} />
                  <Text className="text-xs text-gray-700 font-medium">
                    {rating > 0 ? rating : "N/A"}
                  </Text>
                </View>
              )}
              {totalReviews !== undefined && (
                <Text className="text-xs text-gray-700 font-medium">
                  {totalReviews > 0 ? `(${totalReviews / 1000}k)` : null}
                </Text>
              )}
            </View>
          )}
        </View>
        <View className="mt-2 flex-row justify-between">
          <View className="flex-row justify-center items-center space-x-3">
            <Text className=" text-primary font-medium" style={styles.price}>
              RM{price.toFixed(2)}
            </Text>
            {deliveryFee && (
              <View className="flex flex-row justify-start items-center space-x-1">
                <Text className="text-xs text-gray-700 font-medium mr-1">
                  |
                </Text>
                <MaterialIcons
                  name="delivery-dining"
                  size={20}
                  color="#1BAC4B"
                />
                <Text className="text-xs text-gray-700 font-medium ml-1">
                  {deliveryFee.toFixed(2)}
                </Text>
              </View>
            )}
          </View>
          {showFavorited && <HeartIcon color="#FF8A9B" size={24} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};
