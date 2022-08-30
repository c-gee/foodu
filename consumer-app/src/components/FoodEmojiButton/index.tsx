import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  emoji: string;
  label?: string;
  navigationTarget: string;
  navigationTargetId?: number;
};

const FoodEmojiButton = ({
  emoji,
  label,
  navigationTarget,
  navigationTargetId
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        /* navigation code here */
      }}
    >
      <Text className="text-5xl text-center py-2">{emoji}</Text>
      {label && (
        <Text className="text-base font-bold  text-center" numberOfLines={1}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FoodEmojiButton;
