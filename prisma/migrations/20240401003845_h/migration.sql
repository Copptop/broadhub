-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('parking', 'desk', 'meeting_room', 'office');

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "locationID" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_locationID_name_key" ON "Resource"("locationID", "name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
