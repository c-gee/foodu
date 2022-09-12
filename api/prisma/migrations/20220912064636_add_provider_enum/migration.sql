/*
  Warnings:

  - The primary key for the `SocialProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `provider` on the `SocialProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'FACEBOOK');

-- AlterTable
ALTER TABLE "SocialProfile" DROP CONSTRAINT "SocialProfile_pkey",
DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL,
ADD CONSTRAINT "SocialProfile_pkey" PRIMARY KEY ("provider", "sub");
