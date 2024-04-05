-- AlterTable
ALTER TABLE "User" ADD COLUMN     "basedInID" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_basedInID_fkey" FOREIGN KEY ("basedInID") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
