import BookingsSection from './bookingsSection';
import { getUsersBookingHistory } from '@/lib/database/bookings';
interface BookingProps {
  id: string,
  resource: string,
  resourceType: string,
  resourceLocation: string,
  startDateTime: Date,
  endDateTime: Date,
  href: string,
  rebookHref: string,
}


export default async function BookingsPage() {

  // Fetch the booking data from the database
  const rawBookings = await getUsersBookingHistory();

  // Map the raw booking data to the booking props to be used in the component
  const bookings = rawBookings.map((booking: any) => {
    return {
      id: booking.id,
      resource: booking.resource,
      resourceType: booking.resourceType,
      resourceLocation: `Floor ${booking.floor} ${booking.location}`,
      startDateTime: booking.startDatetime,
      endDateTime: booking.endDatetime,
      href: `bookings/${booking.id}`,
      rebookHref: `/map/${booking.region}/${booking.location}/floor${booking.floor}`,
    };
  }) as BookingProps[];

  return (
    <>
      <BookingsSection bookings={bookings} />
    </>
  );
}