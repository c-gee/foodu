import { VerticalMenuItemCard } from "../../components/MenuItemCard";
import { useNavigation } from "@react-navigation/native";

// To be fetched from API
const promoMenuItems = [
  {
    id: 123,
    name: "Vegan Brown Rice Bowl",
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
    <>
      {promoMenuItems.map(
        ({ id, name, imageURL, price, displayTag, mechantDetails }) => (
          <VerticalMenuItemCard
            key={id}
            title={name}
            imageURL={imageURL}
            rating={mechantDetails.rating}
            price={price}
            totalReviews={mechantDetails.totalReviews}
            deliveryFee={mechantDetails.deliveryFee}
            distance={mechantDetails.distance}
            showReviews={true}
            showDistance={true}
            showFavorited={true}
            badge={displayTag}
            onPress={() => {
              navigation.navigate("Merchant", {
                id: mechantDetails.id,
                showMenuItem: true,
                menuItemId: id
              });
            }}
            variant="large"
          />
        )
      )}
    </>
  );
};

export default PromosSection;
