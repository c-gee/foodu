import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import MenuCategoriesSection from "./MenuCategoriesSection";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import SpecialOffer from "../../components/SpecialOffer";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white font-regular">
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
        <View className="mt-6 shadow-lg shadow-slate-300">
          {/* To be fetched from database */}
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
      <View className="mx-6 my-3">
        <SectionHeader
          title="Discount Guaranteed! 👌"
          navigationTarget="Promos"
          navigationText="See All"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
