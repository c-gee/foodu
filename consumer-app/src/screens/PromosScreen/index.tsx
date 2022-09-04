import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";

// To be fetched from API
import { promos } from "../../../data/db.json";
import { HorizontalMenuItemCard } from "../../components/MenuItemCard";

const PromosScreen = ({ navigation }: RootStackScreenProps<"Promos">) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationTopBar
        title="Discount Guaranteed! 👌"
        icon="go_back"
        onPress={navigation.goBack}
      />
      <FlatList
        data={promos}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="py-2" />}
        renderItem={({ item }) => (
          <View className="mx-6">
            <HorizontalMenuItemCard
              title={item.name}
              imageURL={item.imageURL}
              distance={item.merchantDetails.distance}
              price={item.price}
              rating={item.merchantDetails.rating}
              totalReviews={item.merchantDetails.totalReviews}
              badge={"PROMO"}
              deliveryFee={item.merchantDetails.deliveryFee}
              onPress={() =>
                navigation.navigate("Merchant", {
                  id: item.id,
                  showMenuItem: true,
                  menuItem: item
                })
              }
              showMerchantDetails={true}
              variant="base"
            />
          </View>
        )}
        contentContainerStyle={{
          paddingBottom: 24
        }}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default PromosScreen;
