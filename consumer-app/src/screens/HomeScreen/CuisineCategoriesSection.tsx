import { View } from "react-native";

import FoodEmojiButton from "../../components/FoodEmojiButton";
import { RootStackParamList } from "../../navigation/types";

import { useNavigation } from "@react-navigation/native";

// To be fetched from API
const cuisineCategories = [
  { emoji: "🍔", label: "Hamburger", id: 1 },
  { emoji: "🍕", label: "Pizza", id: 2 },
  { emoji: "🍜", label: "Noodles", id: 3 },
  { emoji: "🍖", label: "Meat", id: 4 },
  { emoji: "🥬", label: "Vegetable", id: 5 },
  { emoji: "🍰", label: "Dessert", id: 6 },
  { emoji: "🍹", label: "Beverages", id: 7 }
];

const CuisineCategoriesSection = () => {
  const navigation = useNavigation();

  const navigateTo = (
    target: keyof RootStackParamList,
    options?: { id?: number }
  ): void => {
    navigation.navigate(target);
  };

  return (
    <View className="flex flex-row flex-wrap justify-center items-center">
      {cuisineCategories.map(({ emoji, label, id }) => (
        <View className="basis-1/4 md:basis-1/8 my-3" key={id}>
          <FoodEmojiButton
            emoji={emoji}
            label={label}
            onPress={() => navigateTo("CuisineCategories")}
          />
        </View>
      ))}
      <View className="basis-1/4 md:basis-1/8 my-3">
        <FoodEmojiButton
          emoji="🥡"
          label="More"
          onPress={() => navigateTo("CuisineCategories")}
        />
      </View>
    </View>
  );
};

export default CuisineCategoriesSection;
