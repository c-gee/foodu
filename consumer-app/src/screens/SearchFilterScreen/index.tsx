import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useReducer } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import NavigationTopBar from "../../components/NavigationTopBar";
import { RootStackScreenProps } from "../../navigation/types";
import {
  sortByFilters,
  restaurantFilters,
  deliveryFeeFilters,
  modeFilters,
  SortByFilter,
  RestaurantFilter,
  DeliveryFeeFilter,
  ModeFilter,
  SearchParams
} from "../SearchFilterScreen/types";

type SectionTitle = "Sort by" | "Restaurant" | "Delivery Fee" | "Mode";
type FilterOptions =
  | SortByFilter
  | RestaurantFilter
  | DeliveryFeeFilter
  | ModeFilter;

enum ActionType {
  SET_SORT_BY_FILTER = "SET_SORT_BY_FILTER",
  SET_RESTAURANT_FILTER = "SET_RESTAURANT_FILTER",
  SET_DELIVERY_FEE_FILTER = "SET_DELIVERY_FEE_FILTER",
  SET_MODE_FILTER = "SET_MODE_FILTER",
  RESET_FILTER = "RESET_FILTER"
}

type FilterAction =
  | {
      type: ActionType.SET_SORT_BY_FILTER;
      payload: SortByFilter;
    }
  | {
      type: ActionType.SET_RESTAURANT_FILTER;
      payload: RestaurantFilter;
    }
  | {
      type: ActionType.SET_DELIVERY_FEE_FILTER;
      payload: DeliveryFeeFilter;
    }
  | {
      type: ActionType.SET_MODE_FILTER;
      payload: ModeFilter;
    }
  | { type: ActionType.RESET_FILTER; payload: SearchParams };

type Section = {
  title: SectionTitle;
  data:
    | SortByFilter[]
    | RestaurantFilter[]
    | DeliveryFeeFilter[]
    | ModeFilter[];
};

const reducer = (state: SearchParams, action: FilterAction): SearchParams => {
  switch (action.type) {
    case ActionType.SET_SORT_BY_FILTER:
      return {
        ...state,
        sortBy: action.payload as SortByFilter
      };
    case ActionType.SET_RESTAURANT_FILTER:
      return {
        ...state,
        restaurant: action.payload as RestaurantFilter
      };
    case ActionType.SET_DELIVERY_FEE_FILTER:
      return {
        ...state,
        deliveryFee: action.payload as DeliveryFeeFilter
      };
    case ActionType.SET_MODE_FILTER:
      return {
        ...state,
        mode: action.payload as ModeFilter
      };
    case ActionType.RESET_FILTER:
      return action.payload;
    default:
      return state;
  }
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
  const { searchParams, isSearch, showSortByOnly } = route.params;
  const initialState: SearchParams = useMemo(
    () => ({
      keyword: searchParams.keyword,
      sortBy: sortByFilters[0],
      restaurant: restaurantFilters[0],
      deliveryFee: deliveryFeeFilters[0],
      mode: modeFilters[0]
    }),
    [searchParams.keyword]
  );
  const [state, dispatch] = useReducer(reducer, searchParams);

  const resetFilter = () => {
    dispatch({ type: ActionType.RESET_FILTER, payload: initialState });
  };

  const applyFilter = () => {
    navigation.navigate("Search", {
      searchParams: state,
      isSearch
    });
  };

  const onRadioPress = (section: SectionTitle, item: FilterOptions) => {
    switch (section) {
      case "Sort by":
        dispatch({
          type: ActionType.SET_SORT_BY_FILTER,
          payload: item
        });
        break;
      case "Restaurant":
        dispatch({
          type: ActionType.SET_RESTAURANT_FILTER,
          payload: item
        });
        break;
      case "Delivery Fee":
        dispatch({
          type: ActionType.SET_DELIVERY_FEE_FILTER,
          payload: item
        });
        break;
      case "Mode":
        dispatch({
          type: ActionType.SET_MODE_FILTER,
          payload: item
        });
        break;
    }
  };

  const isRadioSelected = (
    section: SectionTitle,
    item: FilterOptions
  ): boolean | undefined => {
    switch (section) {
      case "Sort by":
        return state.sortBy === item;
      case "Restaurant":
        return state.restaurant === item;
      case "Delivery Fee":
        return state.deliveryFee === item;
      case "Mode":
        return state.mode === item;
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
      <View className="flex flex-row justify-end space-x-3 bg-white p-6">
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
          onPress={applyFilter}
        >
          <Text className="text-base text-white font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchFilterScreen;
