import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import FilterControls from "./FilterControls";
import EmptyResult from "./EmptyResult";
import SearchCard from "../../components/SearchCard";
import NavigationTopBar from "../../components/NavigationTopBar";
import SearchBar from "../../components/SearchBar/index";
import { RootStackScreenProps } from "../../navigation/types";
import { Merchant } from "../../models/types";

import { merchants, menu_items } from "../../../data/db.json";
import { useSearchContext } from "../../contexts/SearchContext";

// To be fetched from API
const merchantsWithMenuItems = merchants.slice(0, 4).map((merchant) => ({
  ...merchant,
  menu_items: menu_items.slice(0, 2)
}));

const cuisines = [
  {
    title: "Popular Cuisines",
    data: [
      "Burgers",
      "Rice",
      "Mamak",
      "Chicken",
      "Fast Food",
      "Local",
      "Noodles",
      "Beverages",
      "Pizza",
      "Halal",
      "Japanese"
    ]
  },
  {
    title: "All Cuisines",
    data: [
      "Alchoholic Drinks",
      "Asian",
      "Bakery",
      "BBQ",
      "Beverages",
      "Breakfast",
      "Burgers",
      "Chicken",
      "Coffee & Tea",
      "Dessert",
      "Dinner",
      "Fast Food",
      "Halal",
      "Japanese",
      "Korean",
      "Local",
      "Lunch",
      "Mamak",
      "Noodles",
      "Pizza",
      "Rice",
      "Seafood",
      "Thai",
      "Vietnames",
      "Western"
    ]
  }
];

const SearchScreen = ({ navigation }: RootStackScreenProps<"Search">) => {
  const {
    searchParams,
    setKeyword,
    setRestaurantFilter,
    setModeFilter,
    resetSearch,
    isSearch
  } = useSearchContext();
  const [searchResults, setSearchResults] = useState<Merchant[]>([]);

  useEffect(() => {
    // Should make API query with search params and set returned results
    setSearchResults(merchantsWithMenuItems);
  }, [searchParams]);

  const onSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (e.nativeEvent.text.length > 0) {
      setKeyword(e.nativeEvent.text);
    }

    // Fetch new search results
    setSearchResults(merchantsWithMenuItems);
  };

  const onFilterPress = () => {
    if (!searchParams) return;

    navigation.navigate("SearchFilter", {
      showSortByOnly: false
    });
  };

  const onSortByPress = () => {
    if (!searchParams) return;

    navigation.navigate("SearchFilter", {
      showSortByOnly: true
    });
  };

  const onPromoPress = () => {
    if (!searchParams) return;

    setRestaurantFilter(searchParams?.restaurant === "Promo" ? "Any" : "Promo");
  };

  const onSelfPickupPress = () => {
    if (!searchParams) return;

    setModeFilter(
      searchParams?.mode === "Self-Pickup" ? "Delivery" : "Self-Pickup"
    );
  };

  const onExitScreen = () => {
    resetSearch();
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: Merchant }) => {
    return (
      <SearchCard
        merchant={{
          title: item.address.name,
          imageURL: item.merchantBrief.smallPhotoHref,
          rating: item.merchantBrief.rating,
          totalReviews: item.merchantBrief.vote_count,
          deliveryFee: item.estimatedDeliveryFee.priceDisplay,
          distance: item.merchantBrief.distanceInKm,
          badge: item.merchantBrief.promo?.hasPromo ? "PROMO" : "",
          onPress: () => {
            navigation.navigate("Merchant", { id: item.id });
          },
          variant: "base"
        }}
        menu_items={item.menu_items?.map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          imageURL: item.imageURL,
          badge: item.displayTag,
          onPress: () => {
            navigation.navigate("Merchant", {
              id: item.id,
              showMenuItem: true,
              menuItem: item
            });
          },
          variant: "xs"
        }))}
      />
    );
  };

  const HeaderComponent = () => (
    <View className="flex justify-start items-start mb-3">
      <ScrollView className="bg-white">
        {isSearch ? (
          <View className="flex-row justify-center items-center p-6 py-3">
            <TouchableOpacity className="p-2 mr-3 -ml-1" onPress={onExitScreen}>
              <AntDesign name="arrowleft" size={24} color="#212121" />
            </TouchableOpacity>
            <View className="flex-1">
              <SearchBar
                searched={searchParams?.keyword}
                onSubmitEditing={onSubmitEditing}
              />
            </View>
          </View>
        ) : (
          <NavigationTopBar
            title={searchParams?.keyword || ""}
            icon="go_back"
            onPress={onExitScreen}
          />
        )}
        <FilterControls
          searchParams={searchParams}
          onFilterPress={onFilterPress}
          onSortByPress={onSortByPress}
          onPromoPress={onPromoPress}
          onSelfPickupPress={onSelfPickupPress}
        />
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View className="flex flex-1 justify-center items-center space-y-2 px-10 bg-white">
            <EmptyResult isSearch={isSearch ?? false} />
          </View>
        )}
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => <View className="py-2" />}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24
        }}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
