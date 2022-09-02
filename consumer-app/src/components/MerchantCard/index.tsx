import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MaterialIcons } from "@expo/vector-icons";
import { HeartIcon } from "react-native-heroicons/outline";

type Props = {
  id: string;
  name: string;
  imageURL: string;
  rating: number;
  totalReviews: number;
  deliveryFee: string;
  distance: number;
  onPress: () => void;
};

const MerchantCard = ({
  name,
  imageURL,
  distance,
  rating,
  totalReviews,
  deliveryFee,
  onPress
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row bg-white p-[14] shadow-md shadow-slate-200 my-2"
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
      onPress={onPress}
    >
      <Image
        source={{
          uri: imageURL
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 20
        }}
        resizeMode="cover"
      />
      <View className="ml-3 flex flex-1 justify-around">
        <Text className="text-lg text-gray-900 font-bold" numberOfLines={2}>
          {name}
        </Text>
        <View className="mt-2 flex-row justify-start items-center">
          <Text className="text-xs text-gray-700 font-medium">
            {distance.toFixed(1)} km |{" "}
          </Text>
          <StarIcon color="#FFAB38" size={16} />
          <Text className="text-xs text-gray-700 font-medium ml-1">
            {rating > 0 ? rating : "N/A"}{" "}
            {totalReviews > 0 ? `(${totalReviews})` : null}
          </Text>
          <Text></Text>
        </View>
        <View className="mt-2 flex-row justify-between items-center">
          <View className="flex-row justify-center items-center">
            <MaterialIcons name="delivery-dining" size={20} color="#1BAC4B" />
            <Text className="text-xs text-gray-700 font-medium ml-1">
              {deliveryFee}
            </Text>
          </View>
          <HeartIcon color="#FF8A9B" size={24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MerchantCard;
