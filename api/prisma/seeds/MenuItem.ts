import { PrismaClient, CurrencyCode } from "@prisma/client";
import casual from "casual";

import { toTitleCase } from "../../src/utils";

export async function seedMenuItems(prisma: PrismaClient) {
  const menuCategories = await prisma.menuCategory.findMany();

  menuCategories.map(async (menuCategory) => {
    const menuItems = [];
    const uniqueMenuItems: {
      name: string;
      merchantId: number;
    }[] = [];

    // Randomize total menu item per menu category min 2, max 6
    for (let i = 0; i < Math.round(Math.random() * 4 + 2); i++) {
      const name = toTitleCase(casual.words(Math.round(Math.random() * 3 + 1)));

      if (
        !uniqueMenuItems.includes({
          name: name,
          merchantId: menuCategory.merchantId
        })
      ) {
        uniqueMenuItems.push({
          name: name,
          merchantId: menuCategory.merchantId
        });
        menuItems.push({
          name: name,
          photo: "https://unsplash.it/400/400",
          price: casual.integer(100, 20000),
          currency: CurrencyCode.MYR,
          menuCategoryId: menuCategory.id,
          merchantId: menuCategory.merchantId
        });
      }
    }

    await prisma.menuItem.createMany({
      data: menuItems
    });
  });
}
