import { View } from "react-native";

import FoodEmojiButton from "../../components/FoodEmojiButton";

// To be fetched from database
const menuCategories = [
  { emoji: "🍔", label: "Hamburger", menuCategoryId: 1 },
  { emoji: "🍕", label: "Pizza", menuCategoryId: 2 },
  { emoji: "🍜", label: "Noodles", menuCategoryId: 3 },
  { emoji: "🍖", label: "Meat", menuCategoryId: 4 },
  { emoji: "🥬", label: "Vegetable", menuCategoryId: 5 },
  { emoji: "🍰", label: "Dessert", menuCategoryId: 6 },
  { emoji: "🍹", label: "Drinks", menuCategoryId: 7 }
];

const MenuCategoriesSection = () => {
  return (
    <View className=" flex flex-row flex-wrap justify-center items-center">
      {menuCategories.map(({ emoji, label, menuCategoryId }) => (
        <View className="basis-1/4 md:basis-1/8 my-3" key={menuCategoryId}>
          <FoodEmojiButton
            emoji={emoji}
            label={label}
            navigationTarget="MenuCategory"
            navigationTargetId={menuCategoryId}
          />
        </View>
      ))}
      <View className="basis-1/4 md:basis-1/8 my-3">
        <FoodEmojiButton
          emoji="🥡"
          label="More"
          navigationTarget="MenuCategories"
        />
      </View>
    </View>
  );
};

export default MenuCategoriesSection;
