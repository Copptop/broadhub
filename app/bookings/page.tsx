'use client';

import { useState } from 'react'
import { SubmitButton } from '@/components/Buttons'
import { Table } from '@/components/Tables'
import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import BookingSearchPalette from '@/components/CommandPalettes'

const rawBookings = [
  { id: 1, resource: 'Desk TP', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, resource: 'Room 1', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, resource: 'Room 2', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, resource: 'Room 1', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, resource: 'Room 2', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, resource: 'Room 1', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, resource: 'Room BTM', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
]

const bookingActions = [
  { name: 'View' },
  { name: 'Cancel' },
  { name: 'Rebook' },
]

const bookingsHeaders = [
  { name: 'Resource' },
  { name: 'Location' },
  { name: 'Start' },
  { name: 'End' },
]


const filters = [
  { name: 'Resource', icon: <MagnifyingGlassIcon /> },
  { name: 'Location', icon: <BookOpenIcon /> },
  // Add more filters as needed
];

export default function BookingsPage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowCommandPalette(true);
  };

  const handleCloseCommandPalette = () => {
    setShowCommandPalette(false);
    setSearchQuery('');
  };

  const bookings = rawBookings.map((booking) => {
    return {
      resource: booking.resource,
      resourceLocation: booking.resourceLocation,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
    };
  });

  return (
    <>
      <div className="px-6 py-4">
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Previous Bookings</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-500">
                Here&apos;s a list of all your bookings
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <SubmitButton
                className='block rounded-md px-3 py-2 shadow-lg text-center text-sm font-semibold marker:focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                onClick={handleSearchClick}
              >
                <MagnifyingGlassIcon className="h-5 w-5 inline-block mr-2 align-middle" aria-hidden="true" />
                <>Search Bookings</>
              </SubmitButton>
            </div>
          </div>
          <Table headers={bookingsHeaders} data={bookings} Actions={bookingActions} />
        </div>
      </div>

      {showCommandPalette && (
        <BookingSearchPalette onClose={handleCloseCommandPalette} />
      )}
    </>
  );
}