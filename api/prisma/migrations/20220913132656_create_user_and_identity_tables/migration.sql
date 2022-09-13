-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'facebook');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "nickname" TEXT,
    "dateOfBirth" DATE,
    "gender" "Gender",
    "areaCode" TEXT,
    "phone" TEXT,
    "picture" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identities" (
    "sub" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "identityData" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "identities_pkey" PRIMARY KEY ("provider","sub")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_areaCode_phone_key" ON "users"("areaCode", "phone");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
