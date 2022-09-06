import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";
import { useSearchContext } from "../../contexts/SearchContext";
import {
  sortByFilters,
  restaurantFilters,
  deliveryFeeFilters,
  modeFilters,
  SortByFilter,
  RestaurantFilter,
  DeliveryFeeFilter,
  ModeFilter,
  FilterOptions
} from "../../contexts/SearchContext/types";

type SectionTitle = "Sort by" | "Restaurant" | "Delivery Fee" | "Mode";

type Section = {
  title: SectionTitle;
  data:
    | SortByFilter[]
    | RestaurantFilter[]
    | DeliveryFeeFilter[]
    | ModeFilter[];
};

const filterSections: Section[] = [
  {
    title: "Sort by",
    data: sortByFilters
  },
  {
    title: "Restaurant",
    data: restaurantFilters
  },
  {
    title: "Delivery Fee",
    data: deliveryFeeFilters
  },
  {
    title: "Mode",
    data: modeFilters
  }
];

const SearchFilterScreen = ({
  route,
  navigation
}: RootStackScreenProps<"SearchFilter">) => {
  const { showSortByOnly } = route.params;
  const {
    searchParams,
    setSortByFilter,
    setRestaurantFilter,
    setDeliveryFeeFilter,
    setModeFilter,
    resetFilter,
    applySearch
  } = useSearchContext();

  const onRadioPress = (section: SectionTitle, item: FilterOptions) => {
    switch (section) {
      case "Sort by":
        setSortByFilter(item);
        break;
      case "Restaurant":
        setRestaurantFilter(item);
        break;
      case "Delivery Fee":
        setDeliveryFeeFilter(item);
        break;
      case "Mode":
        setModeFilter(item);
        break;
    }
  };

  const isRadioSelected = (
    section: SectionTitle,
    item: FilterOptions
  ): boolean | undefined => {
    switch (section) {
      case "Sort by":
        return searchParams.sortBy === item;
      case "Restaurant":
        return searchParams.restaurant === item;
      case "Delivery Fee":
        return searchParams.deliveryFee === item;
      case "Mode":
        return searchParams.mode === item;
      default:
        return undefined;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-0 justify-start">
        <NavigationTopBar
          title="SearchParams"
          icon="close"
          onPress={navigation.goBack}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingTop: 12,
          paddingHorizontal: 24
        }}
      >
        {filterSections.map((section) => (
          <View
            key={section.title}
            className={`px-6 py-4 pt-2 mb-5 bg-white shadow-lg shadow-slate-200 rounded-3xl ${
              showSortByOnly && section.title !== "Sort by" && "hidden"
            }`}
            style={{
              ...Platform.select({
                android: {
                  shadowOffset: {
                    width: 0,
                    height: 10
                  },
                  shadowColor: "#A9A9A9",
                  shadowRadius: 20,
                  shadowOpacity: 0,
                  elevation: 15,
                  borderRadius: 24,
                  backgroundColor: "white"
                }
              })
            }}
          >
            <View className="py-3 mb-2 border-b border-b-[1px]] border-gray-200">
              <Text className="text-xl text-gray-900 font-bold">
                {section.title}
              </Text>
            </View>
            <RadioForm>
              {section.data.map((item, i) => (
                <RadioButton key={i}>
                  <RadioButtonInput
                    obj={{ label: item, value: item }}
                    index={i}
                    isSelected={isRadioSelected(section.title, item)}
                    onPress={() => onRadioPress(section.title, item)}
                    buttonSize={11}
                    buttonInnerColor={"#1BAC4B"}
                    buttonOuterColor={"#1BAC4B"}
                    buttonOuterSize={20}
                    buttonWrapStyle={{
                      paddingVertical: 9
                    }}
                  />
                  <RadioButtonLabel
                    obj={{ label: item, value: item }}
                    index={i}
                    onPress={() => onRadioPress(section.title, item)}
                    labelStyle={{ fontSize: 16, color: "#212121" }}
                    labelWrapStyle={{ marginLeft: 12 }}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
        ))}
      </ScrollView>
      <View className="flex flex-row justify-center items-center space-x-3 bg-white p-6">
        {showSortByOnly ? (
          <TouchableOpacity
            className="h-[58px] justify-center items-center basis-1/2 rounded-full bg-primary/10"
            onPress={navigation.goBack}
          >
            <Text className="text-base text-primary font-bold">Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="h-[58px] justify-center items-center basis-1/2 rounded-full bg-primary/10"
            onPress={resetFilter}
          >
            <Text className="text-base text-primary font-bold">Reset</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="h-[58px] justify-center items-center basis-1/2 rounded-full bg-primary"
          onPress={applySearch}
        >
          <Text className="text-base text-white font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchFilterScreen;
