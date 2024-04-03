/*
  Warnings:

  - A unique constraint covering the columns `[locationID,name,floor]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Resource_locationID_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Resource_locationID_name_floor_key" ON "Resource"("locationID", "name", "floor");
