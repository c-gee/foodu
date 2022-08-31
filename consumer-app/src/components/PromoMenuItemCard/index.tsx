import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/outline";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  id: number;
  name: string;
  imageURL: string;
  rating: number;
  totalReviews: number;
  price: number;
  deliveryFee: number;
  distance: number;
};

const PromoMenuItemCard = ({
  id,
  name,
  imageURL,
  rating,
  totalReviews,
  price,
  deliveryFee,
  distance
}: Props) => {
  return (
    <TouchableOpacity
      className="bg-white p-[14] pb-4 shadow-md shadow-slate-200 mr-4"
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
      onPress={() => {
        /* navigate to menu item details page */
      }}
    >
      <Image
        source={{
          uri: imageURL
        }}
        style={{
          width: 192,
          height: 192,
          borderRadius: 20
        }}
        resizeMode="cover"
      />
      <Text className="absolute top-6 left-6 bg-primary text-xxs text-semibold text-white p-[6] px-[8] rounded-md">
        PROMO
      </Text>
      <Text className="mt-2 text-xl text-gray-900 font-bold">{name}</Text>
      <View className="mt-2 flex-row justify-start items-center">
        <Text className="text-xs text-gray-700 font-medium">
          {(distance / 1000).toFixed(1)} km |{" "}
        </Text>
        <StarIcon color="#FFAB38" size={16} />
        <Text className="text-xs text-gray-700 font-medium ml-1">
          {rating > 0 ? rating : "N/A"}{" "}
          {totalReviews > 0 ? `(${totalReviews / 1000}k)` : ""}
        </Text>
        <Text></Text>
      </View>
      <View className="mt-2 flex-row justify-between items-center">
        <View className="flex-row justify-center items-center">
          <Text className="text-lg text-primary font-medium mr-1">
            {price.toFixed(2)}
          </Text>
          <Text className="text-xs text-gray-700 font-medium mr-1"> | </Text>
          <MaterialIcons name="delivery-dining" size={20} color="#1BAC4B" />
          <Text className="text-xs text-gray-700 font-medium ml-1">
            {deliveryFee.toFixed(2)}
          </Text>
        </View>
        <HeartIcon color="#FF8A9B" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default PromoMenuItemCard;
