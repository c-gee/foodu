import { View } from "react-native";

import FoodEmojiButton from "../../components/FoodEmojiButton";
import { RootStackParamList } from "../../navigation/types";

import { useNavigation } from "@react-navigation/native";

// To be fetched from API
const menuCategories = [
  { emoji: "🍔", label: "Hamburger", menuCategoryId: 1 },
  { emoji: "🍕", label: "Pizza", menuCategoryId: 2 },
  { emoji: "🍜", label: "Noodles", menuCategoryId: 3 },
  { emoji: "🍖", label: "Meat", menuCategoryId: 4 },
  { emoji: "🥬", label: "Vegetable", menuCategoryId: 5 },
  { emoji: "🍰", label: "Dessert", menuCategoryId: 6 },
  { emoji: "🍹", label: "Beverages", menuCategoryId: 7 }
];

const MenuCategoriesSection = () => {
  const navigation = useNavigation();

  const navigateTo = (
    target: keyof RootStackParamList,
    options?: { id?: number }
  ): void => {
    navigation.navigate(target);
  };

  return (
    <View className=" flex flex-row flex-wrap justify-center items-center">
      {menuCategories.map(({ emoji, label, menuCategoryId }) => (
        <View className="basis-1/4 md:basis-1/8 my-3" key={menuCategoryId}>
          <FoodEmojiButton
            emoji={emoji}
            label={label}
            onPress={() => navigateTo("MenuCategories")}
          />
        </View>
      ))}
      <View className="basis-1/4 md:basis-1/8 my-3">
        <FoodEmojiButton
          emoji="🥡"
          label="More"
          onPress={() => navigateTo("MenuCategories")}
        />
      </View>
    </View>
  );
};

export default MenuCategoriesSection;
