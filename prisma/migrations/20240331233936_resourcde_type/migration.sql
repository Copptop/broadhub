/*
  Warnings:

  - Changed the type of `type` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PARKING', 'DESK', 'OFFICE', 'MEETING_ROOM');

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "type",
ADD COLUMN     "type" "ResourceType" NOT NULL;
