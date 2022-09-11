-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" TEXT;

-- CreateTable
CREATE TABLE "SocialProfile" (
    "sub" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "picture" TEXT,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "SocialProfile_pkey" PRIMARY KEY ("provider","sub")
);

-- AddForeignKey
ALTER TABLE "SocialProfile" ADD CONSTRAINT "SocialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
