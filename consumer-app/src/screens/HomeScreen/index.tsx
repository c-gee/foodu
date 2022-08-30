import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white font-regular">
      <Header />
      <View className="mx-5 my-2">
        <SearchBar />
      </View>
      <View className="mx-5 my-2">
        <SectionHeader
          title="Special Offers"
          navigationTarget="SpecialOffers"
          navigationText="See All"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
