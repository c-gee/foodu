import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FoodEmojiButton from "../../components/FoodEmojiButton";

// To be fetched from API
const cuisineCategories = [
  { emoji: "🍔", name: "Hamburger", id: 1 },
  { emoji: "🍕", name: "Pizza", id: 2 },
  { emoji: "🍜", name: "Noodles", id: 3 },
  { emoji: "🍖", name: "Meat", id: 4 },
  { emoji: "🥬", name: "Vegetable", id: 5 },
  { emoji: "🍰", name: "Dessert", id: 6 },
  { emoji: "🍹", name: "Beverages", id: 7 }
];

const CuisineCategoriesSection = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row flex-wrap justify-center items-center">
      {cuisineCategories.map(({ emoji, name, id }) => (
        <View className="basis-1/4 md:basis-1/8 my-3" key={id}>
          <FoodEmojiButton
            emoji={emoji}
            name={name}
            onPress={() => {
              navigation.navigate("Search", {
                keyword: name,
                showSearchBar: false
              });
            }}
          />
        </View>
      ))}
      <View className="basis-1/4 md:basis-1/8 my-3">
        <FoodEmojiButton
          emoji="🥡"
          name="More"
          onPress={() => navigation.navigate("CuisineCategories")}
        />
      </View>
    </View>
  );
};

export default CuisineCategoriesSection;
