import BookingForm from "@/components/bookingForm";
import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getSpecificBooking } from "@/lib/database/bookings";

interface BookingProps {
  id: string;
  user: string;
  resource: string;
  resourceType: string;
  startDatetime: Date;
  endDatetime: Date;
  location: string;
  region: string;
  floor: string;
}
export default async function Page({ params }: { params: { id: string } }) {

  const booking = await getSpecificBooking(params.id) as BookingProps

  const pages = [
    { name: 'Bookings', href: '/bookings', current: false },
    { name: 'Booking Details', href: `/bookings/${booking.id}`, current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="px-6 py-4 h-[85dvh] overflow-y-auto">
        <BookingForm id={booking.id} user={booking.user} resource={booking.resource} resourceType={booking.resourceType} startDatetime={booking.startDatetime} endDatetime={booking.endDatetime} location={booking.location} region={booking.region} floor={booking.floor} />
      </div>
    </>
  );
}