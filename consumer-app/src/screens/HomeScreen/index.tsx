import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import CuisineCategoriesSection from "./CuisineCategoriesSection";
import PromosSection from "./PromosSection";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import SpecialOffer from "../../components/SpecialOffer";
import MerchantCard from "../../components/MerchantCard";
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
    label: "Rice Dish",
    icon: "🍛"
  },
  {
    label: "Fast Food",
    icon: "🍟"
  },
  {
    label: "Noodles",
    icon: "🍜"
  },
  {
    label: "Asian",
    icon: "🍱"
  },
  {
    label: "Vegan",
    icon: "🥗"
  },
  {
    label: "Western",
    icon: "🍝"
  },
  {
    label: "Beverages",
    icon: "🍹"
  }
];

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
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
        marginTop: 24
      }}
    >
      {filters.map(({ label, icon }) => (
        <TouchableOpacity
          key={label}
          className={`flex-row px-3 py-2 mr-3 rounded-full ${
            filter === label ? "bg-primary" : "bg-white border border-primary"
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
      <TouchableOpacity
        className="flex-row px-3 py-2 rounded-full bg-white border border-primary"
        onPress={() => {
          // navigate to search page
        }}
      >
        <Text className={"align-middle text-primary"}>🥡 More</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const HeaderComponent = () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <Header />
      <View className="mx-6 my-3">
        <SearchBar />
      </View>
      <View className="mx-6 my-3">
        <SectionHeader
          title="Special Offers"
          navigationText="See All"
          onPress={() => navigation.navigate("SpecialOffers")}
        />
        <View className="mt-6">
          {/* To be fetched from API */}
          <SpecialOffer
            imageURL="image-url"
            navigationTarget="MenuItemDetails"
            navigationTargetId={123}
          />
        </View>
      </View>
      <View className="mx-6 my-1">
        <CuisineCategoriesSection />
      </View>
      <View className="my-3">
        <View className="mx-6">
          <SectionHeader
            title="Discount Guaranteed! 👌"
            navigationText="See All"
            onPress={() => navigation.navigate("Promos")}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 24,
            paddingEnd: 12
          }}
        >
          <PromosSection />
        </ScrollView>
      </View>
      <View className="my-3 mt-0">
        <View className="mx-6">
          <SectionHeader title="Recommended For You 😍" />
        </View>
        <FilterControls />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Main flat list loads the recommendation section list */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={HeaderComponent}
        renderItem={({ item }) => (
          <View className="mx-6">
            <MerchantCard
              id={item.id}
              name={item.address.name}
              imageURL={item.merchantBrief.smallPhotoHref}
              distance={item.merchantBrief.distanceInKm}
              rating={item.merchantBrief.rating}
              totalReviews={item.merchantBrief.vote_count}
              deliveryFee={item.estimatedDeliveryFee.priceDisplay}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
