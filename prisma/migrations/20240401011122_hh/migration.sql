/*
  Warnings:

  - Added the required column `floor` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "restrictedRoles" "UserRole"[] DEFAULT ARRAY[]::"UserRole"[];
