import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import SearchBar from "../../components/SearchBar";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white font-regular">
      <Header />
      <View className="mx-5 my-2">
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
