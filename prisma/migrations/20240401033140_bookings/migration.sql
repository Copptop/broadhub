-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "resourceID" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "bookingMadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifed" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_resourceID_fkey" FOREIGN KEY ("resourceID") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
