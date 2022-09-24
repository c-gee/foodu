import { PrismaClient } from "@prisma/client";
import { Currency } from "@prisma/client";

export const createCurrencyMagnifiers = async (prisma: PrismaClient) => {
  await prisma.currencyMagnifier.deleteMany({});

  await prisma.currencyMagnifier.create({
    data: {
      currency: Currency.MYR,
      magnifier: 100
    }
  });
};
