import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ArrowsUpDownIcon } from "react-native-heroicons/outline";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type FilterProps = {
  label: "Promo" | "Self-Pick" | "Filter" | "Sort";
  icon?: JSX.Element;
  onPress: () => void;
};

const FilterControls = () => {
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [filterPromo, setFilterPromo] = useState(false);
  const [filterSelfPick, setFilterSelfPick] = useState(false);
  const navigation = useNavigation();

  const filters: FilterProps[] = useMemo(
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
        onPress: () => {
          navigation.navigate("SearchFilter");
        }
      },
      {
        label: "Sort",
        icon: <ArrowsUpDownIcon size={14} color="#1BAC4B" />,
        onPress: () => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
      },
      {
        label: "Promo",
        onPress: () => setFilterPromo((prevValue) => !prevValue)
      },
      {
        label: "Self-Pick",
        onPress: () => setFilterSelfPick((prevValue) => !prevValue)
      }
    ],
    []
  );

  const filterStyles = useMemo(
    () => ({
      Promo: {
        bgColor: filterPromo ? "bg-primary" : "bg-white",
        textColor: filterPromo ? "text-white" : "text-primary"
      },
      "Self-Pick": {
        bgColor: filterSelfPick ? "bg-primary" : "bg-white",
        textColor: filterSelfPick ? "text-white" : "text-primary"
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
    [filterPromo, filterSelfPick]
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
      {filters.map(({ label, icon, onPress }) => (
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
