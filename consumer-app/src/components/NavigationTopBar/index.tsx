import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  icon?: "go_back" | "close";
  onPress?: () => void;
};

const NavigationTopBar = ({ title, icon, onPress }: Props) => {
  return (
    <View className="h-20 flex-row justify-start items-center px-5">
      {icon && onPress && (
        <TouchableOpacity className="p-2" onPress={onPress}>
          <AntDesign
            name={`${icon === "go_back" ? "arrowleft" : "close"}`}
            size={24}
            color="#212121"
          />
        </TouchableOpacity>
      )}
      <Text className="text-2xl text-gray-900 font-bold ml-2">{title}</Text>
    </View>
  );
};

export default NavigationTopBar;
