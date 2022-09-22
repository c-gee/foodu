-- CreateTable
CREATE TABLE "merchants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "logo" TEXT,
    "photo" TEXT,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuisine_categories" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cuisine_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuisine_categories_on_merchants" (
    "merchantId" INTEGER NOT NULL,
    "cuisineCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cuisine_categories_on_merchants_pkey" PRIMARY KEY ("merchantId","cuisineCategoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuisine_categories_name_key" ON "cuisine_categories"("name");

-- AddForeignKey
ALTER TABLE "cuisine_categories_on_merchants" ADD CONSTRAINT "cuisine_categories_on_merchants_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuisine_categories_on_merchants" ADD CONSTRAINT "cuisine_categories_on_merchants_cuisineCategoryId_fkey" FOREIGN KEY ("cuisineCategoryId") REFERENCES "cuisine_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
