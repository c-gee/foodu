-- DropForeignKey
ALTER TABLE "SocialProfile" DROP CONSTRAINT "SocialProfile_userId_fkey";

-- AlterTable
ALTER TABLE "SocialProfile" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialProfile" ADD CONSTRAINT "SocialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
