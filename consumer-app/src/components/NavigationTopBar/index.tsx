import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  icon?: "go_back" | "close";
  onPress?: () => void;
};

const NavigationTopBar = ({ title, icon, onPress }: Props) => {
  return (
    <View className="h-[72] flex-row justify-start items-center px-6 space-x-2 bg-white">
      {icon && onPress && (
        <TouchableOpacity className="p-2 -ml-1" onPress={onPress}>
          <AntDesign
            name={`${icon === "go_back" ? "arrowleft" : "close"}`}
            size={24}
            color="#212121"
          />
        </TouchableOpacity>
      )}
      <View className="flex-1">
        <Text className="text-2xl text-gray-900 font-bold" numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default NavigationTopBar;
