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
import NavigationTopBar from "../../components/NavigationTopBar";
import SearchBar from "../../components/SearchBar/index";
import { HorizontalMerchantCard } from "../../components/MerchantCard";
import { HorizontalMenuItemCard } from "../../components/MenuItemCard";
import { RootStackScreenProps } from "../../navigation/types";
import { MenuItem, Merchant } from "../../models/types";

import { merchants, menu_items } from "../../../data/db.json";

type ResultItem = Merchant | MenuItem;

const SearchScreen = ({
  route,
  navigation
}: RootStackScreenProps<"Search">) => {
  const { keyword, showSearchBar } = route.params;
  const [searched, setSearched] = useState<string>();
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    if (keyword && keyword?.length == 0) return;

    // Should make API query and set returned results
    // Test display for merchant search
    setSearchResults(merchants);
  }, [keyword]);

  const onSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setSearched(e.nativeEvent.text);

    // Fetch new search results
    // Test display for menu item search
    setSearchResults(menu_items);
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

  const renderMenuItem = (item: MenuItem) => {
    return (
      <View className="mx-6">
        <HorizontalMenuItemCard
          title={item.name}
          imageURL={item.imageURL}
          price={item.price}
          badge={item.displayTag}
          onPress={() => {
            navigation.navigate("Merchant", {
              id: merchants[2]?.id,
              showMenuItem: true,
              menuItem: item
            });
          }}
          variant="xs"
        />
      </View>
    );
  };

  const renderMerchant = (item: Merchant) => {
    return (
      <View className="mx-6">
        <HorizontalMerchantCard
          id={item.id}
          title={item.address.name}
          imageURL={item.merchantBrief.smallPhotoHref}
          distance={item.merchantBrief.distanceInKm}
          rating={item.merchantBrief.rating}
          totalReviews={item.merchantBrief.vote_count}
          badge={item.merchantBrief.promo?.hasPromo ? "PROMO" : ""}
          deliveryFee={item.estimatedDeliveryFee.priceDisplay}
          onPress={() => {
            navigation.navigate("Merchant", { id: item.id });
          }}
          variant="base"
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: ResultItem }) => {
    if (item?.price) {
      return renderMenuItem(item);
    }
    if (item?.address) {
      return renderMerchant(item);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View className="flex flex-1 justify-center items-center space-y-2 px-10 bg-white">
            <EmptyResult isSearch={showSearchBar ?? false} />
          </View>
        )}
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => <View className="py-2" />}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
          paddingBottom: 24
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
