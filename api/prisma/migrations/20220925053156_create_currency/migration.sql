-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('MYR');

-- CreateEnum
CREATE TYPE "CurrencySymbol" AS ENUM ('RM');

-- CreateTable
CREATE TABLE "currencies" (
    "code" "CurrencyCode" NOT NULL,
    "magnifier" INTEGER NOT NULL,
    "symbol" "CurrencySymbol" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");
