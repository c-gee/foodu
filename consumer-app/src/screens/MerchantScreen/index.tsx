import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SectionListData,
  FlatList
} from "react-native";
import { useState } from "react";

import HeroImage from "./HeroImage";
import MerchantDetailsSection from "./MerchantDetailsSection";
import {
  VerticalMenuItemCard,
  HorizontalMenuItemCard
} from "../../components/MenuItemCard";

// To be fetched from APIs
import { merchants } from "../../../data/db.json";

type MenuItem = {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  displayTag: string | null;
};

type Section = {
  title: string;
  data: MenuItem[];
};

const sections = [
  {
    title: "For You",
    data: [
      {
        id: 123,
        name: "Vegan Brown Rice Bowl",
        imageURL:
          "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
        price: 12.9,
        displayTag: "Best Seller"
      },
      {
        id: 234,
        name: "Classic Pizza",
        imageURL:
          "https://img.freepik.com/free-photo/top-view-mixed-pizza-with-tomato-black-olive-melted-cheese_140725-10787.jpg?w=2000",
        price: 23.9,
        displayTag: null
      },
      {
        id: 345,
        name: "Salmond Poke Bowl",
        imageURL:
          "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/09/20180123_Delicious_SalmonPoke_156-768x960.jpg",
        price: 15.9,
        displayTag: null
      }
    ]
  },
  {
    title: "Poke Bowl",
    data: [
      {
        id: 256,
        name: "Teriyaki Chicken Poke Bowl",
        imageURL:
          "https://www.afarmgirlsdabbles.com/wp-content/uploads/2022/04/Teriyaki-Chicken-Poke-Bowls_afarmgirlsdabbles_01s-2-735x735.jpg",
        price: 16.9,
        displayTag: "Best Seller"
      },
      {
        id: 456,
        name: "Vegan Brown Rice Bowl",
        imageURL:
          "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
        price: 15.9,
        displayTag: null
      },
      {
        id: 789,
        name: "Chicken Poke Bowl",
        imageURL:
          "https://recipe-images.azureedge.net/Medium/3317a30c-f1d2-4bc0-a739-be9213800be9.jpg/",
        price: 16.9,
        displayTag: "NEW"
      },
      {
        id: 890,
        name: "Salmond Poke Bowl",
        imageURL:
          "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/09/20180123_Delicious_SalmonPoke_156-768x960.jpg",
        price: 18.9,
        displayTag: null
      }
    ]
  },
  {
    title: "Drinks",
    data: [
      {
        id: 4561,
        name: "Espresso Martini",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/814b4344-7244-4460-ac81-5c5be6fa3785.jpg?imwidth=270",
        price: 15.9,
        displayTag: "NEW"
      },
      {
        id: 7892,
        name: "Cosmopolitan",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/d30ce01f-005f-42db-b2d6-1f98e405afb0.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8903,
        name: "Mojito",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/29812a4b-492d-466d-b84c-86dbcb316e98.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8904,
        name: "Mint Julep",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/dd2ed744-d1a2-4c95-9db5-9467de1b9a96.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8905,
        name: "Americano",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/61bd100f-3363-4a9c-80dd-17598f668595.jpg?imwidth=270",
        price: 12.9,
        displayTag: null
      },
      {
        id: 8906,
        name: "Black Russian",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/b6c5bf5d-31d9-4a6d-8246-6450e99e5f42.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      }
    ]
  }
];

const MerchantScreen = () => {
  const [merchant, setMerchant] = useState(merchants[2]);

  const ListHeader = () => (
    <View className="top-0">
      <View className="-z-10">
        <HeroImage />
      </View>
      <View className="-mt-12 z-10 rounded-t-[32px] bg-white shadow-2xl">
        <MerchantDetailsSection
          name={merchant?.chainName || merchant.address.name}
          rating={merchant.merchantBrief.rating}
          totalReviews={merchant.merchantBrief.vote_count}
          distance={merchant.merchantBrief.distanceInKm}
          deliveryFee={merchant.estimatedDeliveryFee.price}
        />
      </View>
    </View>
  );

  const renderSectionHeader = (section: SectionListData<MenuItem, Section>) => {
    return section.title === "For You" ? (
      <>
        <View className="px-6 py-2 bg-white">
          <Text className="text-2xl text-gray-900 font-bold">
            {section.title}
          </Text>
        </View>
        <FlatList
          data={section.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <VerticalMenuItemCard
              title={item.name}
              imageURL={item.imageURL}
              price={item.price}
              badge={item.displayTag}
              onPress={() => {}}
              variant="regular"
            />
          )}
          contentContainerStyle={{
            padding: 24,
            paddingTop: 12,
            backgroundColor: "white"
          }}
          ItemSeparatorComponent={() => <View className="px-2" />}
        />
      </>
    ) : (
      <View className="px-6 py-3 pt-9 bg-white">
        <Text className="text-2xl text-gray-900 font-bold">
          {section.title}
        </Text>
      </View>
    );
  };

  const renderItem = (
    item: MenuItem,
    section: SectionListData<MenuItem, Section>
  ) => {
    return section.title === "For You" ? null : (
      <View className="px-6 py-2">
        <HorizontalMenuItemCard
          title={item.name}
          imageURL={item.imageURL}
          price={item.price}
          badge={item.displayTag}
          onPress={() => {}}
          variant="small"
        />
      </View>
    );
  };

  return (
    <View className="min-h-full bg-white">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        renderSectionHeader={({ section }) => renderSectionHeader(section)}
        renderItem={({ item, section }) => renderItem(item, section)}
        contentContainerStyle={{
          backgroundColor: "white",
          paddingBottom: 24
        }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        SectionSeparatorComponent={() => <View className="pb-2" />}
      />
    </View>
  );
};

const sectionListStyles = StyleSheet.create({
  listHeader: {
    position: "absolute",
    top: 0
  }
});

export default MerchantScreen;
