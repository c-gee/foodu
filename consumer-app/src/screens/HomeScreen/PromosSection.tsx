import { VerticalMenuItemCard } from "../../components/MenuItemCard";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { merchants } from "../../../data/db.json";
import { VerticalMerchantCard } from "../../components/MerchantCard";

// To be fetched from API
import { promos } from "../../../data/db.json";

const PromosSection = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row space-x-4">
      {promos.map((menuItem) => (
        <View key={menuItem.id}>
          <VerticalMenuItemCard
            title={menuItem.name}
            imageURL={menuItem.imageURL}
            rating={menuItem.merchantDetails.rating}
            price={menuItem.price}
            totalReviews={menuItem.merchantDetails.totalReviews}
            deliveryFee={menuItem.merchantDetails.deliveryFee}
            distance={menuItem.merchantDetails.distance}
            showMerchantDetails={true}
            badge={menuItem.displayTag}
            onPress={() => {
              navigation.navigate("Merchant", {
                id: menuItem.merchantDetails.id,
                showMenuItem: true,
                menuItem: {
                  id: menuItem.id,
                  name: menuItem.name,
                  description: menuItem.description,
                  price: menuItem.price,
                  imageURL: menuItem.imageURL,
                  displayTag: menuItem.displayTag
                }
              });
            }}
            variant="xl"
          />
        </View>
      ))}
      {merchants.slice(0, 2).map((merchant) => (
        <View key={merchant.id}>
          <VerticalMerchantCard
            title={merchant.address.name}
            imageURL={merchant.merchantBrief.smallPhotoHref}
            distance={merchant.merchantBrief.distanceInKm}
            rating={merchant.merchantBrief.rating}
            totalReviews={merchant.merchantBrief.vote_count}
            badge={merchant.merchantBrief.promo?.hasPromo ? "PROMO" : ""}
            deliveryFee={merchant.estimatedDeliveryFee.priceDisplay}
            onPress={() => navigation.navigate("Merchant", { id: merchant.id })}
            variant="xl"
          />
        </View>
      ))}
      <View className="py-2" />
    </View>
  );
};

export default PromosSection;
