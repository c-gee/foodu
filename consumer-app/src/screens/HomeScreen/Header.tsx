import { View, Text, Image, TouchableOpacity } from "react-native";
import { BellIcon, ShoppingBagIcon } from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center space-x-4 px-5 py-3">
      <Image
        source={require("../../../assets/avatar-96x96.png")}
        style={{
          width: 48,
          height: 48
        }}
        resizeMode="cover"
        className="rounded-full flex-none"
      />
      <View className="flex-auto mr-8">
        <Text className="text-base text-gray-600">Deliver to</Text>
        <TouchableOpacity className="w-full flex-row justify-between items-center">
          <Text
            className="text-xl font-bold text-gray-900"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Home
          </Text>
          <Ionicons name="caret-down" size={20} color="#1BAC4B" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between items-center space-x-3">
        <TouchableOpacity
          className="w-12 h-12 flex justify-center items-center rounded-full border border-gray-200"
          onPress={() => {}}
        >
          <BellIcon color="#212121" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-12 h-12 flex justify-center items-center rounded-full border border-gray-200"
          onPress={() => {}}
        >
          <ShoppingBagIcon color="#212121" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
