'use client';

import { SubmitButton } from '@/components/Buttons';
import { Table } from '@/components/Tables';
import { BookingsSearchPalette } from '@/components/searchboxes/BookingsCommandPalettes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const rawData = [
  { id: 1, user: 'Test User', resource: 'Desk 1', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, user: 'Test User', resource: 'Desk 1', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 5, user: 'Test User', resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 6, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 7, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 8, user: 'Test User', resource: 'Office 2', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 9, user: 'Test User', resource: 'Office 1', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 10, user: 'Test User', resource: 'Office 1', resourceType: "office", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 11, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 12, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 13, user: 'Test User', resource: 'Room 1', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 14, user: 'Test User', resource: 'Room 3', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 15, user: 'Test User', resource: 'Room 2', resourceType: "meeting room", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 16, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 17, user: 'Test User', resource: 'Parking 14', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 18, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 19, user: 'Test User', resource: 'Parking 5', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 20, user: 'Test User', resource: 'Parking 1', resourceType: "parking", resourceLocation: 'Marsh Wall, Canary Wharf', href: '#', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
];

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

  const bookings = rawData.map((booking) => {
    return {
      resource: booking.resource,
      resourceLocation: booking.resourceLocation,
      startDateTime: booking.startDateTime,
      endDateTime: booking.endDateTime,
    };
  });

  return (
    <>
      <div className="px-6 py-4 ">
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
        <BookingsSearchPalette onClose={handleCloseCommandPalette} data={rawData} />
      )}
    </>
  );
}