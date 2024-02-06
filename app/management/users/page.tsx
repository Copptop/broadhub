// TODO: COMPETE THIS PAGE USING BOOKING FORMAT
'use client';

import { SubmitButton } from '@/components/Buttons';
import { Table } from '@/components/Tables';
import { UsersSearchPalette } from '@/components/searchboxes/UsersCommandPalettes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const rawData = [
  { id: 1, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 2, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 3, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 4, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 5, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 6, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 7, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 8, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 9, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 10, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 11, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 12, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 13, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 14, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 15, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 16, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 17, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 18, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 19, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 20, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 21, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 22, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 23, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 24, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 25, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 26, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 27, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 28, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 29, name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
]

const userActions = [
  { name: 'Amend Info' },
  { name: 'Reset Password' },
  { name: 'Delete' },
]

const usersHeaders = [
  { name: '', sortable: false },
  { name: 'Name' },
  { name: 'Email' },
  { name: 'Role' },
  { name: 'Based Out of' },
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

  const users = rawData.map((user) => {
    return {
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
      role: user.role,
      officeLocation: user.officeLocation,
    };
  }, []);

  return (
    <>
      <div className="px-6 py-4">
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">System&apos;s Users</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-500">
                Here&apos;s a list of all the users
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
          <Table headers={usersHeaders} data={users} Actions={userActions} />
        </div>
      </div>

      {showCommandPalette && (
        <UsersSearchPalette onClose={handleCloseCommandPalette} data={rawData} />
      )}
    </>
  );
}