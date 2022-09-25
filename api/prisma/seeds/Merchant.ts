import { CurrencyCode, PrismaClient } from "@prisma/client";
import casual from "casual";

import { createMenuCategories } from "./MenuCategory";

const NUMBER_MERCHANTS_TO_GENERATE = 100;

export async function seedMerchants(prisma: PrismaClient) {
  await prisma.merchant.deleteMany({});

  const cuisineCategoryIds = await prisma.cuisineCategory.findMany();

  for (let i = 0; i < NUMBER_MERCHANTS_TO_GENERATE; i++) {
    const randomIndex = Math.round(Math.random() * cuisineCategoryIds.length);
    const cuisineCategoriesToConnect = cuisineCategoryIds.splice(
      randomIndex,
      3
    ); // pick 3

    const menuCategories = createMenuCategories();

    await prisma.merchant.create({
      data: {
        name: casual.company_name,
        address: casual.address,
        latitude: parseFloat(casual.double(1.1558, 6.4333).toFixed(8)),
        longitude: parseFloat(casual.double(98.5548, 104.313).toFixed(8)),
        logo: "https://unsplash.it/400/400",
        photo: "https://unsplash.it/600/600",
        rating: parseFloat(casual.double(1, 5).toFixed(2)),
        totalReviews: casual.integer(10, 2000),
        currency: CurrencyCode.MYR,
        cuisineCategories: {
          create: cuisineCategoriesToConnect.map((category) => ({
            cuisineCategory: {
              connect: {
                id: category.id
              }
            }
          }))
        },
        menuCategories: {
          createMany: {
            data: menuCategories
          }
        }
      }
    });
  }
}
