import {
  Currency,
  CurrencyCode,
  Merchant,
  MenuItem,
  MenuCategory
} from "@prisma/client";

import casual from "casual";

import { formatMoney } from "../../utils";

const DELIVERY_COST_PER_KM = 50;

export type MerchantResult = Merchant & {
  cuisineCategories: {
    cuisineCategory: {
      name: string;
      icon: string | null;
    };
  }[];
  menuCategories: (MenuCategory & {
    menuItems: MenuItem[];
  })[];
};

export const formatMerchantResult = (
  merchant: MerchantResult,
  currencies: Currency[]
) => {
  const currency = currencies.filter(
    (currency) => currency.code === CurrencyCode.MYR // hardcorded
  )[0];
  const distance = parseFloat(casual.double(0.5, 30).toFixed(2));
  const deliveryFee = Math.ceil(distance) * DELIVERY_COST_PER_KM;

  return {
    ...merchant,
    distanceInKm: distance, // hardcoded for now
    deliveryFee: {
      amount: deliveryFee,
      currency: CurrencyCode.MYR,
      displayAmount: formatMoney(deliveryFee, currency)
    },
    cuisineCategories: merchant?.cuisineCategories
      ? merchant.cuisineCategories.map(
          (category) => category.cuisineCategory.name
        )
      : [],
    menuCategories: merchant?.menuCategories
      ? merchant.menuCategories.map((menuCategory) => ({
          ...menuCategory,
          id: menuCategory?.id.toString(),
          menuItems: menuCategory?.menuItems.map(
            (menuItem) => menuItem && formatMenuItemResult(menuItem, currencies)
          )
        }))
      : []
  };
};

export const formatMenuItemResult = (
  menuItem: MenuItem,
  currencies: Currency[]
) => {
  const currency = currencies.filter(
    (currency) => currency.code === menuItem.currency
  )[0]; // It'll always be there

  return {
    ...menuItem,
    id: menuItem.id.toString(),
    displayPrice: formatMoney(menuItem.price, currency)
  };
};
