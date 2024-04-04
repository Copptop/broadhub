/*
  Warnings:

  - Changed the type of `region` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Region" AS ENUM ('APAC', 'UK', 'EMEA', 'NA', 'NENA');

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "region",
ADD COLUMN     "region" "Region" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_region_key" ON "Location"("name", "region");
