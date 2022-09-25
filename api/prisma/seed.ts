import { PrismaClient } from "@prisma/client";

import { createCurrencies } from "./seeds/Currency";
import { seedUsers } from "./seeds/User";
import { seedCuisineCategories } from "./seeds/CuisineCategories";
import { seedMerchants } from "./seeds/merchant";
import { seedMenuItems } from "./seeds/MenuItem";

const prisma = new PrismaClient();

async function main() {
  await createCurrencies(prisma);
  await seedUsers(prisma);
  await seedCuisineCategories(prisma);
  await seedMerchants(prisma);
  await seedMenuItems(prisma);
}

if (process.env.production || process.env.NODE_ENV === "production") {
  console.log("Running seeding on production is not allowed!!!");
} else {
  main().then(() => {
    console.log("Data seeded...");
  });
}
