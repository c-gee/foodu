import { PrismaClient } from "@prisma/client";

const findMerchants = async (prisma: PrismaClient) => {
  const merchants = await prisma.merchant.findMany({
    // Will create a SQL function to make the distance calculation later
    where: {
      latitude: {
        gt: 3.0738,
        lt: 3.1569
      },
      longitude: {
        gt: 101.5183,
        lt: 101.7123
      }
    },
    include: {
      cuisineCategories: true,
      menuCategories: true
    }
  });

  return merchants;
};

const useMerchant = () => ({
  findMerchants
});

export default useMerchant;
