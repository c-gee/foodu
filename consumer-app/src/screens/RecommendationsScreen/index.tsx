import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import NavigationTopBar from "../../components/NavigationTopBar";
import { HorizontalMerchantCard } from "../../components/MerchantCard";
import { RootStackScreenProps } from "../../navigation/types";

// To be fetched from API
import { merchants } from "../../../data/db.json";

// To be fetched from API
const filters = [
  {
    label: "All",
    icon: "✅"
  },
  {
    label: "Noodles",
    icon: "🍜"
  },
  {
    label: "Fast Food",
    icon: "🍟"
  },
  {
    label: "Asian",
    icon: "🍱"
  },
  {
    label: "Western",
    icon: "🍝"
  },
  {
    label: "Rice Dish",
    icon: "🍛"
  },
  {
    label: "Vegan",
    icon: "🥗"
  },
  {
    label: "Beverages",
    icon: "🍹"
  }
];

const RecommendationsScreen = ({
  navigation
}: RootStackScreenProps<"CuisineCategories">) => {
  const [filter, setFilter] = useState<string>(filters[0].label);
  const [filteredResults, setFilteredResults] = useState(merchants);

  const onFilter = (label: string) => {
    setFilter(label);
    /* filter results */
    if (label === "All") {
      setFilteredResults(merchants);
    } else {
      // Better to fetch new list to avoid jarring UI when filtered results is empty
      const filtered = merchants.filter((merchant) =>
        merchant.merchantBrief.cuisine.includes(label)
      );

      setFilteredResults(filtered);
    }
  };

  const FilterControls = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        marginTop: 8,
        marginBottom: 12
      }}
      className="bg-white space-x-2"
    >
      {filters.map(({ label, icon }) => (
        <TouchableOpacity
          key={label}
          className={`flex-row px-3 py-2 rounded-full ${
            filter === label ? "bg-primary" : "border border-primary"
          }`}
          onPress={() => {
            onFilter(label);
          }}
        >
          <Text
            className={`align-middle ${
              filter === label ? "text-white" : "text-primary"
            }`}
          >
            {icon} {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationTopBar
        title="Recommended For You 😍"
        icon="go_back"
        onPress={navigation.goBack}
      />
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={FilterControls}
        ItemSeparatorComponent={() => <View className="py-2" />}
        renderItem={({ item }) => (
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
              onPress={() => navigation.navigate("Merchant", { id: item.id })}
              variant="base"
            />
          </View>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24
        }}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default RecommendationsScreen;
