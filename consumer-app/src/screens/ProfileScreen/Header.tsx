import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  picture: string | null | undefined;
  name: string | null | undefined;
  phone: string | null | undefined;
  onEditPress: () => void;
};
const Header = ({ picture, name, phone, onEditPress }: Props) => {
  return (
    <View className="h-[128px] flex-1 flex-row justify-start items-center space-x-5">
      <Image
        source={
          picture ? { uri: picture } : require("../../../assets/avatar.png")
        }
        style={{
          width: 80,
          height: 80
        }}
        resizeMode="cover"
        className="rounded-full"
      />
      <View className="flex-1 justify-around space-y-2">
        <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-base text-gray-600">{phone}</Text>
      </View>
      <TouchableOpacity
        onPress={onEditPress}
        className="flex justify-center items-center"
      >
        <Feather name="edit-3" size={24} color="#1BAC4B" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
