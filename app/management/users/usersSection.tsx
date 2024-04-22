'use client'

import { SubmitButton } from '@/components/Buttons';
import { Table } from '@/components/Tables';
import { UsersSearchPalette } from '@/components/searchboxes/UsersCommandPalettes';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

// Define the actions for the users
const userActions = [
  { name: 'Amend', navigateTo: true },
  { name: 'Reset Password' },
  { name: 'Delete' },
]

// Define the headers for the users table
const usersHeaders = [
  { name: '', sortable: false },
  { name: 'Name' },
  { name: 'Email' },
  { name: 'Role' },
  { name: 'Based Out of' },
]

interface userProps {
  id: string,
  profilePicture: string,
  name: string,
  email: string,
  role: string,
  officeLocation: string,
  href: string,
  isOauth: boolean,
}

export default function UsersSection({ data }: { data: Array<userProps> }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search click
  const handleSearchClick = () => {
    setShowCommandPalette(true);
  };

  // Handle the close command palette
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
                <>Search Users</>
              </SubmitButton>
            </div>
          </div>
          <Table headers={usersHeaders} data={data} Actions={userActions} />
        </div>
      </div>
      {showCommandPalette && (
        <UsersSearchPalette onClose={handleCloseCommandPalette} data={data} />
      )}
    </>
  )
}
