/*
  Warnings:

  - You are about to drop the column `userId` on the `Resource` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_userId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "resourceID" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_resourceID_fkey" FOREIGN KEY ("resourceID") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
