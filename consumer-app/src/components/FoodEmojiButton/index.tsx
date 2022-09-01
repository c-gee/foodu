import { Text, TouchableOpacity } from "react-native";

type Props = {
  emoji: string;
  label?: string;
  onPress: () => void;
};

const FoodEmojiButton = ({ emoji, label, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-5xl text-center py-2">{emoji}</Text>
      {label && (
        <Text className="text-base font-bold text-center" numberOfLines={1}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FoodEmojiButton;
