import { Text, TouchableOpacity } from "react-native";

type Props = {
  emoji: string;
  name?: string;
  onPress: () => void;
};

const FoodEmojiButton = ({ emoji, name, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-5xl text-center py-2">{emoji}</Text>
      {name && (
        <Text
          className="text-base font-bold text-center"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FoodEmojiButton;
