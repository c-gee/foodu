import {
  View,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import EmptyResult from "./EmptyResult";
import SearchCard from "../../components/SearchCard";
import NavigationTopBar from "../../components/NavigationTopBar";
import SearchBar from "../../components/SearchBar/index";
import { RootStackScreenProps } from "../../navigation/types";
import { Merchant } from "../../models/types";

import { merchants, menu_items } from "../../../data/db.json";
// To be fetched from API
const merchantsWithMenuItems = merchants.slice(0, 4).map((merchant) => ({
  ...merchant,
  menu_items: menu_items.slice(0, 2)
}));

const SearchScreen = ({
  route,
  navigation
}: RootStackScreenProps<"Search">) => {
  const { keyword, showSearchBar } = route.params;
  const [searched, setSearched] = useState<string>();
  const [searchResults, setSearchResults] = useState<Merchant[]>([]);

  useEffect(() => {
    if (keyword && keyword?.length == 0) return;

    // Should make API query and set returned results
    // Test display for merchant search
    setSearchResults(merchantsWithMenuItems);
  }, [keyword]);

  const onSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setSearched(e.nativeEvent.text);
    // Fetch new search results
    setSearchResults(merchantsWithMenuItems);
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
      {showSearchBar ? (
        <View className="w-full flex flex-row justify-center items-center p-6 py-5">
          <TouchableOpacity
            className="p-2 mr-3 -ml-1"
            onPress={navigation.goBack}
          >
            <AntDesign name="arrowleft" size={24} color="#212121" />
          </TouchableOpacity>
          <SearchBar
            searched={searched || keyword}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      ) : (
        <NavigationTopBar
          title={keyword ? keyword : ""}
          icon="go_back"
          onPress={navigation.goBack}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View className="flex flex-1 justify-center items-center space-y-2 px-10 bg-white">
            <EmptyResult isSearch={showSearchBar ?? false} />
          </View>
        )}
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => <View className="py-2" />}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
