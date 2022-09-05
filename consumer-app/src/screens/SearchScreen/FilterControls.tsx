import { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ArrowsUpDownIcon } from "react-native-heroicons/outline";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SearchParams } from "../SearchFilterScreen/types";

type FilterControlProps = {
  label: "Promo" | "Self-Pickup" | "Filter" | "Sort";
  icon?: JSX.Element;
  onPress: () => void;
};

type Props = {
  searchParams?: SearchParams;
  onFilterPress: () => void;
  onSortByPress: () => void;
  onPromoPress: () => void;
  onSelfPickupPress: () => void;
};

const FilterControls = ({
  searchParams,
  onFilterPress,
  onSortByPress,
  onPromoPress,
  onSelfPickupPress
}: Props) => {
  const filterControls: FilterControlProps[] = useMemo(
    () => [
      {
        label: "Filter",
        icon: (
          <MaterialCommunityIcons
            name="tune-variant"
            size={12}
            color="#1BAC4B"
          />
        ),
        onPress: onFilterPress
      },
      {
        label: "Sort",
        icon: <ArrowsUpDownIcon size={14} color="#1BAC4B" />,
        onPress: onSortByPress
      },
      {
        label: "Promo",
        onPress: onPromoPress
      },
      {
        label: "Self-Pickup",
        onPress: onSelfPickupPress
      }
    ],
    []
  );

  const filterStyles = useMemo(
    () => ({
      Promo: {
        bgColor:
          searchParams?.restaurant === "Promo" ? "bg-primary" : "bg-white",
        textColor:
          searchParams?.restaurant === "Promo" ? "text-white" : "text-primary"
      },
      "Self-Pickup": {
        bgColor:
          searchParams?.mode === "Self-Pickup" ? "bg-primary" : "bg-white",
        textColor:
          searchParams?.mode === "Self-Pickup" ? "text-white" : "text-primary"
      },
      Filter: {
        bgColor: "bg-white",
        textColor: "text-primary"
      },
      Sort: {
        bgColor: "bg-white",
        textColor: "text-primary"
      }
    }),
    [searchParams?.restaurant, searchParams?.mode]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 12,
        marginTop: 12
      }}
      className="bg-white"
    >
      {filterControls.map(({ label, icon, onPress }) => (
        <View className="mx-[6px]" key={label}>
          <TouchableOpacity
            className={`flex-row justify-center items-center space-x-1 px-4 py-2 rounded-full border-2 border-primary ${filterStyles[label].bgColor}`}
            onPress={onPress}
          >
            {icon && icon}
            <Text className={`align-middle ${filterStyles[label].textColor}`}>
              {label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default FilterControls;
