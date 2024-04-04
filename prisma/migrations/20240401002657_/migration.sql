/*
  Warnings:

  - A unique constraint covering the columns `[code,name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Region" AS ENUM ('APAC', 'UK', 'EMEA', 'NA', 'NENA');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" "Region" NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_companyID_name_key" ON "Location"("companyID", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_code_name_key" ON "Company"("code", "name");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
