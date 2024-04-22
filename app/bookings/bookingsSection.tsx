'use client'

import { SubmitButton } from '@/components/Buttons'
import { BookingsSearchPalette } from '@/components/searchboxes/BookingsCommandPalettes'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Table } from '@/components/Tables'
import React, { useState } from 'react'

// Define the actions that can be performed on a booking
const bookingActions = [
  { name: 'View', navigateTo: true },
  { name: 'Rebook', navigateTo: true },
]

// Define the headers for the bookings table
const bookingsHeaders = [
  { name: 'Resource' },
  { name: 'Location' },
  { name: 'Start' },
  { name: 'End' },
]

// Define the props for a booking
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


export default function BookingsSection({ bookings }: { bookings: Array<BookingProps> }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search button click
  const handleSearchClick = () => {
    setShowCommandPalette(true);
  };

  // Handle the closing of the command palette
  const handleCloseCommandPalette = () => {
    setShowCommandPalette(false);
    setSearchQuery('');
  };

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
        <BookingsSearchPalette onClose={handleCloseCommandPalette} data={bookings} />
      )}
    </>
  )
}
