export const sortByFilters = [
  "Recommended",
  "Popularity",
  "Rating",
  "Distance"
] as const;

export const restaurantFilters = [
  "Any",
  "Promo",
  "Best Seller",
  "Budget Eats"
] as const;

export const deliveryFeeFilters = [
  "Any",
  "Less Than RM2.00",
  "Less Than RM3.00",
  "Less Than RM5.00"
] as const;

export const modeFilters = ["Delivery", "Self-Pickup"] as const;

export type SortByFilter = typeof sortByFilters[number];
export type RestaurantFilter = typeof restaurantFilters[number];
export type DeliveryFeeFilter = typeof deliveryFeeFilters[number];
export type ModeFilter = typeof modeFilters[number];

export type FilterOptions =
  | SortByFilter
  | RestaurantFilter
  | DeliveryFeeFilter
  | ModeFilter;

export type SearchParams = {
  keyword: string;
  sortBy: SortByFilter;
  restaurant: RestaurantFilter;
  deliveryFee: DeliveryFeeFilter;
  mode: ModeFilter;
};

export enum ActionType {
  SET_KEYWORD = "SET_KEYWORD",
  SET_SORT_BY_FILTER = "SET_SORT_BY_FILTER",
  SET_RESTAURANT_FILTER = "SET_RESTAURANT_FILTER",
  SET_DELIVERY_FEE_FILTER = "SET_DELIVERY_FEE_FILTER",
  SET_MODE_FILTER = "SET_MODE_FILTER",
  RESET_FILTER = "RESET_FILTER",
  RESET_SEARCH = "RESET_SEARCH"
}

export type FilterAction =
  | {
      type: ActionType.SET_KEYWORD;
      payload: string;
    }
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
  | {
      type: ActionType.RESET_FILTER;
      payload: SearchParams;
    }
  | {
      type: ActionType.RESET_SEARCH;
      payload: SearchParams;
    };
