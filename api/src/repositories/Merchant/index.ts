import { PrismaClient } from "@prisma/client";

import { MerchantQueryInput } from "../../graphql/generated/graphql";

const findMerchants = async (
  prisma: PrismaClient,
  input: MerchantQueryInput
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

  return merchants.map((merchant) => ({
    ...merchant,
    cuisineCategories: merchant.cuisineCategories.map(
      (item) => item.cuisineCategory.name
    ),
    menuCategories: merchant.menuCategories.map((menuCategory) => ({
      name: menuCategory.name,
      menuItems: menuCategory.menuItems.map((item) => ({
        ...item,
        id: item.id.toString()
      }))
    }))
  }));
};

const useMerchant = () => ({
  findMerchants
});

export default useMerchant;
