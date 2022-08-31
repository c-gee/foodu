import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import MenuCategoriesSection from "./MenuCategoriesSection";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import SpecialOffer from "../../components/SpecialOffer";
import PromosSection from "./PromosSection";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white font-regular">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20
        }}
      >
        <Header />
        <View className="mx-6 my-3">
          <SearchBar />
        </View>
        <View className="mx-6 my-3">
          <SectionHeader
            title="Special Offers"
            navigationTarget="SpecialOffers"
            navigationText="See All"
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
          <MenuCategoriesSection />
        </View>
        <View className="my-3">
          <View className="mx-6">
            <SectionHeader
              title="Discount Guaranteed! 👌"
              navigationTarget="Promos"
              navigationText="See All"
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 24,
              paddingEnd: 0
            }}
          >
            <PromosSection />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
