import { PrismaClient, Prisma } from "@prisma/client";

import { DEFAULT_LOCATION } from "../App";
import { formatMerchantResult } from "./helpers";
import {
  MerchantsQueryInput,
  MerchantQueryInput
} from "../../graphql/generated/graphql";
import { ValidationError } from "yup";

type MerchantsFilteredResult = {
  merchant_ids: number[];
  total_results: number;
  first_row_id: number;
  last_row_id: number;
}[];

const findMerchants = async (
  prisma: PrismaClient,
  input: MerchantsQueryInput
) => {
  const { first, after, last, before } = input;
  const reverseSort = input.query?.reverse || false;
  const latitude = input.query?.latitude || DEFAULT_LOCATION.latitude;
  const longitude = input.query?.longitude || DEFAULT_LOCATION.longitude;

  // Should eventually be finding nearest merchants by user location
  // Will create a SQL function to make the distance calculation later
  // Use simple filters for now.
  const whereClause = Prisma.sql`
    WHERE latitude BETWEEN ${Number(latitude) - 1.5} AND ${
    Number(latitude) + 1.5
  } AND longitude BETWEEN ${Number(longitude) - 1.5} AND ${
    Number(longitude) + 1.5
  }`;
  const sortClause = reverseSort
    ? Prisma.sql`ORDER BY latitude DESC, longitude DESC`
    : Prisma.sql`ORDER BY latitude ASC, longitude ASC`;
  const reversingSortClause = reverseSort
    ? Prisma.sql`ORDER BY latitude ASC, longitude ASC`
    : Prisma.sql`ORDER BY latitude DESC, longitude DESC`;

  // Optimized to return  merchant_ids, total_results, last_row_id in one row,
  // also because Prisma unable to sort Decimal type like how Postgres behaves as
  // it treats Decimal as string wrapped in Decimal.js object
  const filteredMerchants: MerchantsFilteredResult = await prisma.$queryRaw`
    WITH cte1 AS (
      SELECT
        id, latitude, longitude
      FROM
        merchants
      ${whereClause}
      ${sortClause}
    ),
    cte2 AS (
      SELECT ARRAY_AGG(id) AS merchant_ids
      FROM
        cte1
    ),
    cte3 AS (
      SELECT
        COUNT(*) AS total_results
      FROM
        cte1
    ),
    cte4 AS (
      SELECT
        id AS first_row_id
      FROM
        cte1
      LIMIT 1
    ),
    cte5 AS (
      SELECT
        id AS last_row_id
      FROM
        cte1
      ${reversingSortClause}
      LIMIT 1
    )
    SELECT
      *
    FROM
      cte2,
      cte3,
      cte4,
      cte5
  `;

  const { merchant_ids, total_results, first_row_id, last_row_id } =
    filteredMerchants[0];
  const cursorIndex = after
    ? merchant_ids.indexOf(parseInt(after))
    : before
    ? merchant_ids.indexOf(parseInt(before))
    : 0;

  if (cursorIndex === -1) {
    throw new ValidationError("Invalid after/before value");
  }

  const skip =
    (after && parseInt(after) !== merchant_ids[0]) ||
    (before && parseInt(before) !== merchant_ids[merchant_ids.length - 1])
      ? 1
      : 0;
  const start = first
    ? cursorIndex + skip < 0
      ? 0
      : cursorIndex + skip
    : last && cursorIndex - last >= 0
    ? cursorIndex - last
    : 0;
  const end = first ? cursorIndex + first + skip : last ? cursorIndex : 0;
  const toReturned = merchant_ids.slice(start, end);

  const [currencies, merchants] = await prisma.$transaction([
    prisma.currency.findMany(),
    prisma.merchant.findMany({
      where: {
        id: {
          in: toReturned
        }
      },
      // Need to sort again as by where id in query comes back unsorted
      orderBy: [
        {
          latitude: reverseSort ? "desc" : "asc"
        },
        {
          longitude: reverseSort ? "desc" : "asc"
        }
      ],
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

  const hasNextPage =
    merchant_ids.length > 0 &&
    toReturned.length > 0 &&
    toReturned[toReturned.length - 1] !== last_row_id;
  const hasPreviousPage =
    merchant_ids.length > 0 &&
    toReturned.length > 0 &&
    toReturned[0] !== first_row_id;

  // console.log("All ids", merchant_ids);
  // console.log("skip", skip);
  // console.log("cursorIndex", cursorIndex);
  // console.log("start", start, "end", end);
  // console.log("toReturned", toReturned);
  // console.log("first_row_id", first_row_id);
  // console.log("last_row_id", last_row_id);
  // console.log("hasPreviousPage", hasPreviousPage);
  // console.log("hasNextPage", hasNextPage);

  return {
    merchants:
      merchants.length > 0
        ? merchants.map((merchant) =>
            formatMerchantResult(merchant, currencies)
          )
        : [],
    totalResults: Number(total_results) || 0,
    hasPreviousPage,
    hasNextPage
  };
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
