import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FoodEmojiButton from "../../components/FoodEmojiButton";
import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";

// To be fetched from API
const cuisineCategories = [
  { emoji: "🍔", name: "Hamburger", id: 1 },
  { emoji: "🍕", name: "Pizza", id: 2 },
  { emoji: "🍜", name: "Noodles", id: 3 },
  { emoji: "🍖", name: "Meat", id: 4 },
  { emoji: "🥬", name: "Vegetable", id: 5 },
  { emoji: "🍰", name: "Dessert", id: 6 },
  { emoji: "🍹", name: "Beverages", id: 7 },
  { emoji: "🥐", name: "Pastry", id: 8 },
  { emoji: "🍲", name: "Pot of Food", id: 9 },
  { emoji: "🥗", name: "Salad", id: 10 },
  { emoji: "🍱", name: "Bento", id: 11 },
  { emoji: "🥘", name: "Pan of Food", id: 12 },
  { emoji: "🍝", name: "Spaghetti", id: 13 },
  { emoji: "🍣", name: "Sushi", id: 14 },
  { emoji: "🍩", name: "Doughnut", id: 15 },
  { emoji: "🥩", name: "Steak", id: 16 },
  { emoji: "🍳", name: "Breakfast Set", id: 17 },
  { emoji: "☕", name: "Coffee", id: 18 },
  { emoji: "🎂", name: "Cake", id: 19 },
  { emoji: "🍺", name: "Alcholic Drinksasadasd", id: 20 }
];

const CuisineCategoriesScreen = ({
  navigation
}: RootStackScreenProps<"CuisineCategories">) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
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
                name={item.name}
                onPress={() => {
                  navigation.navigate("Search", {
                    keyword: item.name,
                    showSearchBar: false
                  });
                }}
              />
            </View>
          )}
          columnWrapperStyle={{
            flexGrow: 1,
            justifyContent: "space-evenly"
          }}
          contentContainerStyle={{
            paddingBottom: 48
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CuisineCategoriesScreen;
