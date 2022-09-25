import { PrismaClient } from "@prisma/client";

import { formatMerchantResult } from "./helpers";
import {
  MerchantsQueryInput,
  MerchantQueryInput
} from "../../graphql/generated/graphql";

const findMerchants = async (
  prisma: PrismaClient,
  input: MerchantsQueryInput
) => {
  const [currencies, merchants] = await prisma.$transaction([
    prisma.currency.findMany(),
    prisma.merchant.findMany({
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
    })
  ]);

  return merchants.length > 0
    ? merchants.map((merchant) => formatMerchantResult(merchant, currencies))
    : [];
};

const findMerchantById = async (
  prisma: PrismaClient,
  input: MerchantQueryInput
) => {
  const [currencies, merchant] = await prisma.$transaction([
    prisma.currency.findMany(),
    prisma.merchant.findUnique({
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
    })
  ]);

  if (!merchant) return null;

  return formatMerchantResult(merchant, currencies);
};

const useMerchant = () => ({
  findMerchants,
  findMerchantById
});

export default useMerchant;
