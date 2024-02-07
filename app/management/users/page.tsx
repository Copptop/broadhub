// TODO: COMPETE THIS PAGE USING BOOKING FORMAT
'use client';

import { SubmitButton } from '@/components/Buttons';
import { Table } from '@/components/Tables';
import { UsersSearchPalette } from '@/components/searchboxes/UsersCommandPalettes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const rawData = [
  { id: 1, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 2, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 3, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 4, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 5, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 6, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 7, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 8, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 9, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 10, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 11, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 12, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 13, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 14, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 15, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 16, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 17, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 18, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 19, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 20, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 21, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 22, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 23, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 24, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 25, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 26, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 27, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 28, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
  { id: 29, href: 'users/1', name: 'test user name', email: 'test@email.com', role: 'test role', officeLocation: 'Marsh Wall, Canary Wharf', profilePicture: <MagnifyingGlassIcon className='h-3 w-3' /> },
]

const userActions = [
  { name: 'Amend Info', navigateTo: true },
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
      href: user.href,
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