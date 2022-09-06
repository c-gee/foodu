import {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ActionType,
  DeliveryFeeFilter,
  deliveryFeeFilters,
  FilterAction,
  ModeFilter,
  modeFilters,
  RestaurantFilter,
  restaurantFilters,
  SearchParams,
  SortByFilter,
  sortByFilters
} from "./types";

const reducer = (state: SearchParams, action: FilterAction): SearchParams => {
  switch (action.type) {
    case ActionType.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload
      };
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

type Search = {
  searchParams: SearchParams;
  setKeyword: (payload: string) => void;
  setSortByFilter: (payload: SortByFilter) => void;
  setRestaurantFilter: (payload: RestaurantFilter) => void;
  setDeliveryFeeFilter: (payload: DeliveryFeeFilter) => void;
  setModeFilter: (payload: ModeFilter) => void;
  resetFilter: () => void;
  resetSearch: () => void;
  applySearch: () => void;
  isSearch?: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
};

const initialState: SearchParams = {
  keyword: "",
  sortBy: sortByFilters[0],
  restaurant: restaurantFilters[0],
  deliveryFee: deliveryFeeFilters[0],
  mode: modeFilters[0]
};

const SearchContext = createContext<Search>({
  searchParams: initialState,
  setKeyword: () => {},
  setSortByFilter: () => {},
  setRestaurantFilter: () => {},
  setDeliveryFeeFilter: () => {},
  setModeFilter: () => {},
  resetFilter: () => {},
  resetSearch: () => {},
  applySearch: () => {},
  isSearch: false,
  setIsSearch: () => {}
});

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSearch, setIsSearch] = useState(false);
  const navigation = useNavigation();

  const setKeyword = (payload: string) => {
    dispatch({
      type: ActionType.SET_KEYWORD,
      payload: payload
    });
  };

  const setSortByFilter = (payload: SortByFilter) => {
    dispatch({
      type: ActionType.SET_SORT_BY_FILTER,
      payload: payload
    });
  };

  const setRestaurantFilter = (payload: RestaurantFilter) => {
    dispatch({
      type: ActionType.SET_RESTAURANT_FILTER,
      payload: payload
    });
  };

  const setDeliveryFeeFilter = (payload: DeliveryFeeFilter) => {
    dispatch({
      type: ActionType.SET_DELIVERY_FEE_FILTER,
      payload: payload
    });
  };

  const setModeFilter = (payload: ModeFilter) => {
    dispatch({
      type: ActionType.SET_MODE_FILTER,
      payload: payload
    });
  };

  const resetFilter = () => {
    dispatch({
      type: ActionType.RESET_FILTER,
      payload: { ...initialState, keyword: state.keyword }
    });
  };

  const resetSearch = () => {
    dispatch({
      type: ActionType.RESET_SEARCH,
      payload: initialState
    });
  };

  const applySearch = () => {
    navigation.navigate("Search");
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams: state,
        setKeyword,
        setSortByFilter,
        setRestaurantFilter,
        setDeliveryFeeFilter,
        setModeFilter,
        resetFilter,
        resetSearch,
        applySearch,
        isSearch,
        setIsSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

export const useSearchContext = () => useContext(SearchContext);
