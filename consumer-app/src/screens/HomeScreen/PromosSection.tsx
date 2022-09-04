import { VerticalMenuItemCard } from "../../components/MenuItemCard";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { merchants } from "../../../data/db.json";
import { VerticalMerchantCard } from "../../components/MerchantCard";

// To be fetched from API
const promoMenuItems = [
  {
    id: 123,
    name: "Vegan Brown Rice Bowl",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eaque saepe culpa voluptas. Dicta, expedita optio recusandae saepe natus repellendus deleniti placeat quia earum nisi harum quo odio, eum doloribus.",
    imageURL:
      "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
    price: 12.9,
    displayTag: "PROMO",
    mechantDetails: {
      id: 1234,
      name: "Big Garden Salad",
      rating: 4.5,
      totalReviews: 1100,
      deliveryFee: 2.0,
      distance: 2100
    }
  },
  {
    id: 234,
    name: "Classic Pizza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, dolore! Est ipsam labore incidunt dolorem voluptatibus rem, velit blanditiis, voluptas eius molestiae fugiat facere modi ut tenetur. Omnis, commodi vel!",
    imageURL:
      "https://img.freepik.com/free-photo/top-view-mixed-pizza-with-tomato-black-olive-melted-cheese_140725-10787.jpg?w=2000",
    price: 23.9,
    displayTag: "PROMO",
    mechantDetails: {
      id: 2345,
      name: "Pizza Gallery",
      rating: 4.7,
      totalReviews: 900,
      deliveryFee: 2.0,
      distance: 1700
    }
  },
  {
    id: 345,
    name: "Salmond Poke Bowl",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id alias corrupti esse veniam dolorem cupiditate aliquam natus quos quaerat temporibus dignissimos officia explicabo repellat molestiae asperiores, sapiente eum. Inventore, fuga!",
    imageURL:
      "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/09/20180123_Delicious_SalmonPoke_156-768x960.jpg",
    price: 15.9,
    displayTag: "PROMO",
    mechantDetails: {
      id: 2345,
      name: "Sukiyaki",
      rating: 0,
      totalReviews: 0,
      deliveryFee: 3.5,
      distance: 3500
    }
  }
];

const PromosSection = () => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row -ml-2">
      {promoMenuItems.map((menuItem) => (
        <View className="mx-2" key={menuItem.id}>
          <VerticalMenuItemCard
            title={menuItem.name}
            imageURL={menuItem.imageURL}
            rating={menuItem.mechantDetails.rating}
            price={menuItem.price}
            totalReviews={menuItem.mechantDetails.totalReviews}
            deliveryFee={menuItem.mechantDetails.deliveryFee}
            distance={menuItem.mechantDetails.distance}
            showReviews={true}
            showDistance={true}
            showFavorited={true}
            badge={menuItem.displayTag}
            onPress={() => {
              navigation.navigate("Merchant", {
                id: menuItem.mechantDetails.id,
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
        <View className="mx-2" key={merchant.id}>
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
