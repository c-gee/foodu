import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { StarIcon, MapPinIcon } from "react-native-heroicons/solid";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  name: string;
  rating: number;
  totalReviews: number;
  distance: number;
  deliveryFee: number;
};

const MerchantDetailsSection = ({
  name,
  rating,
  totalReviews,
  distance,
  deliveryFee
}: Props) => {
  return (
    <View className="flex px-5 py-3 pb-6 bg-white rounded-t-[32px]">
      <View className="flex-row justify-between items-center space-x-3 truncate py-3 border-b-[1px] border-b-gray-300">
        <Text
          className="flex-1 text-3xl text-gray-900 font-bold"
          numberOfLines={2}
        >
          {name}
        </Text>
        <TouchableOpacity
          className="p-1 flex-0"
          onPress={() => {
            /* navigate to merchant details screen */
          }}
        >
          <ChevronRightIcon size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center space-x-3 py-3 border-b-[1px] border-b-gray-300">
        <StarIcon color="#FFAB38" size={24} className="flex-0" />
        <View className="flex-1 flex-row items-center">
          <Text className="text-xl text-gray-900 font-bold">
            {rating > 0 ? rating : "N/A"}{" "}
          </Text>
          <Text className="text-base text-gray-700 font-medium">
            {totalReviews > 0 ? `(${totalReviews} reviews)` : null}
          </Text>
        </View>
        <TouchableOpacity
          className="p-1 flex-0"
          onPress={() => {
            /* navigate to merchant details screen */
          }}
        >
          <ChevronRightIcon size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center space-x-3 py-3 border-b-[1px] border-b-gray-300">
        <MapPinIcon color="#1BAC4B" size={24} className="flex-0" />
        <View className="flex-1">
          <Text className="text-xl text-gray-900 font-bold">
            {distance.toFixed(1)} km
          </Text>
          <View className="flex flex-row justify-start items-center space-x-2">
            <Text className="text-base text-gray-700 font-medium">
              Delivery Now &nbsp;|
            </Text>
            <MaterialIcons name="delivery-dining" size={24} color="#1BAC4B" />
            <Text className="text-base text-gray-700 font-medium">
              RM{(deliveryFee / 100).toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="p-1 flex-0"
          onPress={() => {
            /* navigate to merchant details screen */
          }}
        >
          <ChevronRightIcon size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center space-x-3 py-3 border-b-[1px] border-b-gray-300">
        <MaterialCommunityIcons
          name="ticket-percent"
          size={24}
          color="#1BAC4B"
        />
        <View className="flex-1 flex-row items-center">
          <Text className="text-lg text-gray-900 font-medium">
            Offers are available
          </Text>
        </View>
        <TouchableOpacity
          className="p-1 flex-0"
          onPress={() => {
            /* navigate to merchant details screen */
          }}
        >
          <ChevronRightIcon size={24} color="#212121" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MerchantDetailsSection;
