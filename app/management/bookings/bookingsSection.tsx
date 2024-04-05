'use client'

import { SubmitButton } from '@/components/Buttons';
import { Table } from '@/components/Tables';
import { BookingsSearchPalette } from '@/components/searchboxes/BookingsCommandPalettes';
import { UsersSearchPalette } from '@/components/searchboxes/UsersCommandPalettes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const bookingActions = [
  { name: 'Amend', navigateTo: true },
  { name: 'Cancel' },
]

const bookingsHeaders = [
  { name: 'User' },
  { name: 'Resource' },
  { name: 'Location' },
  { name: 'Start' },
  { name: 'End' },
]


interface bookingProps {
  user: string,
  resource: string,
  resourceType: string,
  resourceLocation: string,
  startDateTime: Date,
  endDateTime: Date,
  href: string,
}



export default function BookingsSection({ data }: { data: Array<bookingProps> }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowCommandPalette(true);
  };

  const handleCloseCommandPalette = () => {
    setShowCommandPalette(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="px-6 py-4">
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">System&apos;s Upcoming Bookings</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-500">
                Here&apos;s a list of all the upcoming bookings.
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
          <Table headers={bookingsHeaders} data={data} Actions={bookingActions} />
        </div>
      </div>
      {showCommandPalette && (
        <BookingsSearchPalette onClose={handleCloseCommandPalette} data={data} />
      )}
    </>
  )
}
