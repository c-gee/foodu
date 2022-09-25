import { CurrencyCode, CurrencySymbol, PrismaClient } from "@prisma/client";

export const createCurrencies = async (prisma: PrismaClient) => {
  await prisma.currency.deleteMany({});

  await prisma.currency.create({
    data: {
      code: CurrencyCode.MYR,
      magnifier: 100,
      symbol: CurrencySymbol.RM
    }
  });
};
