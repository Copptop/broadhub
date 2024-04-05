import BookingsSection from './bookingsSection';
import { getUsersBookingHistory } from '@/lib/database/bookings';

const rawData = [
  { id: 1, user: 'Test User', resource: 'Desk 1', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, user: 'Test User', resource: 'Desk 1', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 5, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 6, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 7, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 8, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 9, user: 'Test User', resource: 'Office 1', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 10, user: 'Test User', resource: 'Office 1', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 11, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 12, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 13, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 14, user: 'Test User', resource: 'Room 3', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 15, user: 'Test User', resource: 'Room 2', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 16, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 17, user: 'Test User', resource: 'Parking 14', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 18, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 19, user: 'Test User', resource: 'Parking 5', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 20, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
];

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

  const rawBookings = await getUsersBookingHistory();

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