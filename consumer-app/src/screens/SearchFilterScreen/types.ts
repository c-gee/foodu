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

export type SearchParams = {
  keyword: string;
  sortBy: SortByFilter;
  restaurant: RestaurantFilter;
  deliveryFee: DeliveryFeeFilter;
  mode: ModeFilter;
};
