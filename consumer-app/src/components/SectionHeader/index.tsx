import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SpecialOfferScreenNavigationProp } from "../../navigations/types";

type Props = {
  title: string;
  navigationTarget?: string;
  navigationText?: string;
};

const SectionHeader = ({
  title = "",
  navigationTarget,
  navigationText
}: Props) => {
  const navigation = useNavigation<SpecialOfferScreenNavigationProp>();

  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="text-xl font-bold text-gray-900">{title}</Text>
      {navigationTarget && (
        <TouchableOpacity onPress={() => navigation.navigate("SpecialOffers")}>
          <Text className="text-base font-bold text-primary">
            {navigationText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
