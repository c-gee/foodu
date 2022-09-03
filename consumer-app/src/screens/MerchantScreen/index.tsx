import {
  View,
  Text,
  SectionList,
  SectionListData,
  FlatList
} from "react-native";
import { useEffect, useState } from "react";

import MerchantDetailsSection from "./MerchantDetailsSection";
import HeroImage from "../../components/HeroImage";
import {
  VerticalMenuItemCard,
  HorizontalMenuItemCard
} from "../../components/MenuItemCard";
import { MenuItem } from "../../models";

// To be fetched from APIs
import { merchants } from "../../../data/db.json";
import { RootStackScreenProps } from "../../navigation/types";

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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum aliquid harum fugit odio provident aliquam debitis illum modi, ipsa voluptatibus ut quaerat expedita molestiae, maiores dolorum labore doloremque nulla alias.",
        imageURL:
          "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
        price: 12.9,
        displayTag: "Best Seller"
      },
      {
        id: 234,
        name: "Classic Pizza",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam assumenda sequi fugit odit, eligendi, omnis ratione non, asperiores soluta optio officia illo aliquam totam doloribus. Similique maiores vitae incidunt qui!",
        imageURL:
          "https://img.freepik.com/free-photo/top-view-mixed-pizza-with-tomato-black-olive-melted-cheese_140725-10787.jpg?w=2000",
        price: 23.9,
        displayTag: null
      },
      {
        id: 345,
        name: "Salmond Poke Bowl",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor fugiat saepe necessitatibus numquam at dicta, voluptas, aspernatur, beatae illum enim voluptates vero ut a eum incidunt voluptatum tempore similique quasi!",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate suscipit eius tenetur, quaerat consequatur placeat amet. Nam minus unde labore repudiandae? Architecto deleniti suscipit nam itaque. Reprehenderit ad eos accusantium.",
        imageURL:
          "https://www.afarmgirlsdabbles.com/wp-content/uploads/2022/04/Teriyaki-Chicken-Poke-Bowls_afarmgirlsdabbles_01s-2-735x735.jpg",
        price: 16.9,
        displayTag: "Best Seller"
      },
      {
        id: 456,
        name: "Vegan Brown Rice Bowl",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, dolorem beatae? Et explicabo eaque corporis. Dolor quos ea nostrum itaque eveniet adipisci sunt laboriosam dolore a dolores? Animi, eos enim.",
        imageURL:
          "https://simplyceecee.co/wp-content/uploads/2020/02/simpleveganricebowls.jpg",
        price: 15.9,
        displayTag: null
      },
      {
        id: 789,
        name: "Chicken Poke Bowl",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus deleniti impedit cumque temporibus provident minima laboriosam beatae, natus sunt eum soluta nisi itaque magni dolor culpa. Ad commodi cumque laborum!",
        imageURL:
          "https://recipe-images.azureedge.net/Medium/3317a30c-f1d2-4bc0-a739-be9213800be9.jpg/",
        price: 16.9,
        displayTag: "NEW"
      },
      {
        id: 890,
        name: "Salmond Poke Bowl",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repudiandae modi, commodi labore cupiditate, ab rem quae esse earum praesentium vitae assumenda quisquam velit dicta sunt, pariatur ipsam quia? Sed!",
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
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque est rerum eius fugiat aliquid quisquam? Laudantium voluptas assumenda sapiente aliquid eum magnam fuga maxime dolore impedit magni, doloremque odit eligendi!",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/814b4344-7244-4460-ac81-5c5be6fa3785.jpg?imwidth=270",
        price: 15.9,
        displayTag: "NEW"
      },
      {
        id: 7892,
        name: "Cosmopolitan",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, dolorum asperiores illo impedit doloremque ipsam maxime eos obcaecati esse tempora, quaerat quod itaque ad, modi enim veniam at explicabo fugit.",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/d30ce01f-005f-42db-b2d6-1f98e405afb0.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8903,
        name: "Mojito",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quia harum quaerat fuga ex natus similique amet iusto reprehenderit perferendis laudantium repudiandae sed neque dicta pariatur excepturi, repellendus aperiam expedita?",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/29812a4b-492d-466d-b84c-86dbcb316e98.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8904,
        name: "Mint Julep",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora obcaecati enim exercitationem, rerum earum doloremque ex consectetur sequi. Aperiam fuga ab at amet eligendi incidunt, asperiores id quos rerum deleniti!",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/dd2ed744-d1a2-4c95-9db5-9467de1b9a96.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      },
      {
        id: 8905,
        name: "Americano",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed quia esse dolorum quisquam, quae, harum itaque explicabo ab enim corrupti perferendis error voluptate quasi illo reiciendis a ducimus tenetur. Magnam!",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/61bd100f-3363-4a9c-80dd-17598f668595.jpg?imwidth=270",
        price: 12.9,
        displayTag: null
      },
      {
        id: 8906,
        name: "Black Russian",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium adipisci consectetur placeat ducimus, repudiandae et incidunt necessitatibus voluptatem, nihil distinctio fugit cupiditate vitae obcaecati minus id ex provident. Qui, suscipit?",
        imageURL:
          "https://images.absolutdrinks.com/drink-images/Raw/Absolut/b6c5bf5d-31d9-4a6d-8246-6450e99e5f42.jpg?imwidth=270",
        price: 13.9,
        displayTag: null
      }
    ]
  }
];

const MerchantScreen = ({
  route,
  navigation
}: RootStackScreenProps<"Merchant">) => {
  const [merchant, setMerchant] = useState(merchants[2]);

  const { showMenuItem, menuItem } = route.params;

  useEffect(() => {
    if (showMenuItem && menuItem) {
      navigation.navigate("MenuItem", { menuItem });
    }
  }, [showMenuItem, menuItem]);

  const ListHeader = () => (
    <View className="top-0">
      <View className="-z-10">
        <HeroImage
          imageURL={merchant.merchantBrief.smallPhotoHref}
          variant="restaurant"
        />
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
              onPress={() => {
                navigation.navigate("MenuItem", { menuItem: item });
              }}
              variant="regular"
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 16,
            backgroundColor: "white"
          }}
          ItemSeparatorComponent={() => <View className="px-2" />}
          // stickyHeaderIndices={[0]}
        />
      </>
    ) : (
      <View className="px-6 py-3 pt-8 bg-white">
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
          onPress={() => {
            navigation.navigate("MenuItem", { menuItem: item });
          }}
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

export default MerchantScreen;
