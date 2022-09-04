import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MaterialIcons } from "@expo/vector-icons";
import { HeartIcon } from "react-native-heroicons/outline";

import styles from "./styles";

type Props = {
  id: string | number;
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

export const HorizontalMerchantCard = ({
  title,
  imageURL,
  rating,
  totalReviews,
  deliveryFee,
  distance,
  badge,
  onPress,
  variant = "base"
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row bg-white p-[14] shadow-md shadow-slate-200"
      style={[
        styles.container(variant, "horizontal"),
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
      <View className="relative">
        <Image
          source={{
            uri: imageURL
          }}
          style={styles.image(variant)}
          resizeMode="cover"
        />
        {badge && (
          <View className="absolute top-3 left-3 self-start bg-primary p-[6] px-[8] rounded-md">
            <Text className="text-xxs text-semibold text-white">{badge}</Text>
          </View>
        )}
      </View>
      <View className="ml-3 flex flex-1 justify-around">
        <Text
          className="text-gray-900 font-bold"
          style={styles.title(variant)}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View className="mt-2 flex-row justify-start items-center space-x-2">
          <Text className="text-xs text-gray-700 font-medium">
            {distance.toFixed(1)} km
          </Text>
          <Text className="text-xs text-gray-700 font-medium">|</Text>
          <View className="flex flex-row justify-start items-center space-x-1">
            <StarIcon color="#FFAB38" size={16} />
            <Text className="text-xs text-gray-700 font-medium">
              {rating > 0 ? rating : "N/A"}
            </Text>
            <Text className="text-xs text-gray-700 font-medium">
              {totalReviews > 0 ? `(${totalReviews})` : null}
            </Text>
          </View>
        </View>
        <View className="mt-2 flex-row justify-between items-center">
          <View className="flex-row justify-start items-center space-x-1">
            <MaterialIcons name="delivery-dining" size={20} color="#1BAC4B" />
            <Text className="text-xs text-gray-700 font-medium">
              {deliveryFee}
            </Text>
          </View>
          <HeartIcon color="#FF8A9B" size={24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
