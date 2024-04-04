/*
  Warnings:

  - You are about to drop the column `companyId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "companyId",
ADD COLUMN     "companyCode" TEXT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyCode_fkey" FOREIGN KEY ("companyCode") REFERENCES "Company"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
