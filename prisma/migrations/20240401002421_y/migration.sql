/*
  Warnings:

  - You are about to drop the column `companyCode` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyCode_fkey";

-- DropIndex
DROP INDEX "Company_name_code_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyCode",
ADD COLUMN     "companyID" TEXT;

-- DropEnum
DROP TYPE "Region";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
