import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SpecialOffer from "../../components/SpecialOffer";
import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";

// To be fetched from API
const specialOffers = [
  {
    id: 1,
    image: require("../../../assets/special-offer-01.png"),
    merchantId: 123
  },
  {
    id: 2,
    image: require("../../../assets/special-offer-02.png"),
    merchantId: 234
  },
  {
    id: 3,
    image: require("../../../assets/special-offer-03.png"),
    merchantId: 345
  },
  {
    id: 4,
    image: require("../../../assets/special-offer-04.png"),
    merchantId: 456
  }
];

const SpecialOffersScreen = ({
  navigation
}: RootStackScreenProps<"SpecialOffers">) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationTopBar
        title="Special Offers"
        icon="go_back"
        onPress={navigation.goBack}
      />
      <FlatList
        data={specialOffers}
        horizontal={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mx-6 my-2" key={item.id}>
            <SpecialOffer
              image={item.image}
              onPress={() => {
                navigation.navigate("Merchant", {
                  id: item.merchantId
                });
              }}
            />
          </View>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24
        }}
      />
    </SafeAreaView>
  );
};

export default SpecialOffersScreen;
