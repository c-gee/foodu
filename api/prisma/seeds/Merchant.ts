import { PrismaClient } from "@prisma/client";
import casual from "casual";

const NUMBER_MERCHANTS_TO_GENERATE = 100;

export async function seedMerchants(prisma: PrismaClient) {
  await prisma.merchant.deleteMany({});

  const cuisineCategoryIds = await prisma.cuisineCategory.findMany();

  for (let i = 0; i < NUMBER_MERCHANTS_TO_GENERATE; i++) {
    const randomIndex = parseInt(
      (Math.random() * cuisineCategoryIds.length).toFixed(0)
    );
    const categoriesToConnect = cuisineCategoryIds.splice(randomIndex, 3); // pick 3

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
        cuisineCategories: {
          create: categoriesToConnect.map((category) => ({
            cuisineCategory: {
              connect: {
                id: category.id
              }
            }
          }))
        }
      }
    });
  }
}
