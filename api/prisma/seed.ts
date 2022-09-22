import { PrismaClient } from "@prisma/client";

import { seedUsers } from "./seeds/User";
import { seedCuisineCategories } from "./seeds/CuisineCategories";
import { seedMerchants } from "./seeds/merchant";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedCuisineCategories(prisma);
  await seedMerchants(prisma);
}

if (process.env.production || process.env.NODE_ENV === "production") {
  console.log("Running seeding on production is not allowed!!!");
} else {
  main().then(() => {
    console.log("Data seeded...");
  });
}
