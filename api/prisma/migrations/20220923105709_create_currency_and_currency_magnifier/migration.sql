-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('MYR');

-- CreateTable
CREATE TABLE "CurrencyMagnifier" (
    "currency" "Currency" NOT NULL,
    "magnifier" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyMagnifier_currency_key" ON "CurrencyMagnifier"("currency");
