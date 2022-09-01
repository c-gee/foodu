import PromoMenuItemCard from "../../components/PromoMenuItemCard";

// To be fetched from API
const promoMenuItems = [
  {
    id: 123,
    name: "Vegan Rice Bowl",
    imageURL:
      "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
    rating: 4.5,
    totalReviews: 1100,
    price: 12.9,
    deliveryFee: 2.0,
    distance: 2100
  },
  {
    id: 234,
    name: "Classic Pizza",
    imageURL:
      "https://img.freepik.com/free-photo/top-view-mixed-pizza-with-tomato-black-olive-melted-cheese_140725-10787.jpg?w=2000",
    rating: 4.7,
    totalReviews: 900,
    price: 23.9,
    deliveryFee: 2.0,
    distance: 1700
  },
  {
    id: 345,
    name: "Salmond Poke Bowl",
    imageURL:
      "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/09/20180123_Delicious_SalmonPoke_156-768x960.jpg",
    rating: 0,
    totalReviews: 0,
    price: 15.9,
    deliveryFee: 3.5,
    distance: 3500
  }
];

const PromosSection = () => {
  return (
    <>
      {promoMenuItems.map(
        ({
          id,
          name,
          imageURL,
          rating,
          totalReviews,
          price,
          deliveryFee,
          distance
        }) => (
          <PromoMenuItemCard
            key={id}
            id={id}
            name={name}
            imageURL={imageURL}
            rating={rating}
            totalReviews={totalReviews}
            price={price}
            deliveryFee={deliveryFee}
            distance={distance}
          />
        )
      )}
    </>
  );
};

export default PromosSection;
