import { PrismaClient, Merchant, MenuCategory, MenuItem } from "@prisma/client";

import {
  MerchantsQueryInput,
  MerchantQueryInput
} from "../../graphql/generated/graphql";

type MerchantResult =
  | (Merchant & {
      cuisineCategories: {
        cuisineCategory: {
          name: string;
          icon: string | null;
        };
      }[];
      menuCategories: (MenuCategory & {
        menuItems: MenuItem[];
      })[];
    })
  | null;

const formatMerchantResult = (merchant: MerchantResult) => {
  return (
    merchant && {
      ...merchant,
      cuisineCategories: merchant?.cuisineCategories.map(
        (item) => item.cuisineCategory.name
      ),
      menuCategories: merchant?.menuCategories.map((menuCategory) => ({
        name: menuCategory.name,
        menuItems: menuCategory.menuItems.map((item) => ({
          ...item,
          id: item.id.toString()
        }))
      }))
    }
  );
};

const findMerchants = async (
  prisma: PrismaClient,
  input: MerchantsQueryInput
) => {
  const merchants = await prisma.merchant.findMany({
    // Will create a SQL function to make the distance calculation later
    // where: { distance: { lt: 30 }},
    // sortBy: { distance: 'asc' },
    include: {
      cuisineCategories: {
        select: {
          cuisineCategory: {
            select: {
              name: true,
              icon: true
            }
          }
        }
      },
      menuCategories: {
        include: {
          menuItems: true
        }
      }
    },
    take: input.limit,
    skip: input.lastResultId === 0 ? 0 : 1,
    cursor: {
      id: input.lastResultId || 1
    }
  });

  if (merchants.length === 0) return [];

  return merchants.map((merchant) => formatMerchantResult(merchant));
};

const findMerchantById = async (
  prisma: PrismaClient,
  input: MerchantQueryInput
) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: input.id },
    include: {
      cuisineCategories: {
        select: {
          cuisineCategory: {
            select: {
              name: true,
              icon: true
            }
          }
        }
      },
      menuCategories: {
        include: {
          menuItems: true
        }
      }
    }
  });

  return formatMerchantResult(merchant);
};

const useMerchant = () => ({
  findMerchants,
  findMerchantById
});

export default useMerchant;
