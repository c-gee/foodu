import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FoodEmojiButton from "../../components/FoodEmojiButton";
import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";

// To be fetched from API
const cuisineCategories = [
  { emoji: "🍔", label: "Hamburger", id: 1 },
  { emoji: "🍕", label: "Pizza", id: 2 },
  { emoji: "🍜", label: "Noodles", id: 3 },
  { emoji: "🍖", label: "Meat", id: 4 },
  { emoji: "🥬", label: "Vegetable", id: 5 },
  { emoji: "🍰", label: "Dessert", id: 6 },
  { emoji: "🍹", label: "Beverages", id: 7 },
  { emoji: "🥐", label: "Pastry", id: 8 },
  { emoji: "🍲", label: "Pot of Food", id: 9 },
  { emoji: "🥗", label: "Salad", id: 10 },
  { emoji: "🍱", label: "Bento", id: 11 },
  { emoji: "🥘", label: "Pan of Food", id: 12 },
  { emoji: "🍝", label: "Spaghetti", id: 13 },
  { emoji: "🍣", label: "Sushi", id: 14 },
  { emoji: "🍩", label: "Doughnut", id: 15 },
  { emoji: "🥩", label: "Steak", id: 16 },
  { emoji: "🍳", label: "Breakfast Set", id: 17 },
  { emoji: "☕", label: "Coffee", id: 18 },
  { emoji: "🎂", label: "Cake", id: 19 },
  { emoji: "🍺", label: "Alcholic Drinksasadasd", id: 20 }
];

const CuisineCategoriesScreen = ({
  navigation
}: RootStackScreenProps<"CuisineCategories">) => {
  return (
    <SafeAreaView className="flex-1 bg-white pb-12">
      <NavigationTopBar
        title="More Category"
        icon="go_back"
        onPress={navigation.goBack}
      />
      <View className="w-full p-6 pt-2">
        <FlatList
          data={cuisineCategories}
          horizontal={false}
          numColumns={4}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="basis-1/4 my-3" key={item.id}>
              <FoodEmojiButton
                emoji={item.emoji}
                label={item.label}
                onPress={() => {
                  navigation.navigate("Search", {
                    keyword: item.label,
                    type: "cuisine"
                  });
                }}
              />
            </View>
          )}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-evenly"
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CuisineCategoriesScreen;
