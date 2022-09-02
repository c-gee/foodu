import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  navigationText?: string;
  onPress?: () => void;
};

const SectionHeader = ({ title, navigationText, onPress }: Props) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="text-xl font-bold text-gray-900">{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-base font-bold text-primary">
            {navigationText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
