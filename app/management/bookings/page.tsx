import { currentRole } from '@/lib/hooks/server/use-current-user';
import { redirect } from 'next/navigation';
import BookingsSection from './bookingsSection';
import { getAllUsersBookingsGoingForward } from '@/lib/database/bookings';

export default async function BookingsPage() {
  // Ensure correct user role for access
  const role = await currentRole()
  if (role !== 'HR' && role !== 'ADMIN' && role !== 'MANAGER') {
    redirect('/')
  }

  // Fetch all the bookings going forward
  const _bookings = await getAllUsersBookingsGoingForward()

  if (!_bookings) return <>ERROR</>

  // Map the raw booking data to the booking props to be used in the component
  const bookings = _bookings.map((booking: any) => {
    return {
      id: booking.id,
      user: booking.user,
      resource: booking.resource,
      resourceType: booking.resourceType,
      resourceLocation: `Floor ${booking.floor} ${booking.location}`,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
      href: `/management/bookings/${booking.id}`,
    };
  });

  return (
    <>
      <BookingsSection data={bookings} />
    </>
  );
}