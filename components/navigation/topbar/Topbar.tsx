'use client'
import { useState } from 'react'
import {
  Bars3Icon,
  BellIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Dropdown } from '@/components/Dropdowns'

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
]

interface TopBarProps {
  topbarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopBar = ({ topbarOpen, setSidebarOpen }: TopBarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-800 pl-4 shadow-sm sm:gap-x-6 sm:pl-6 lg:pl-8 pr-6">
      {/* Menu button */}
      <button
        type="button"
        className="text-zinc-500 rounded-md hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 lg:hidden"
        onClick={() => setSidebarOpen(!topbarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex-1 flex justify-end pl-4 sm:pl-6 lg:pl-8">

        {/* Notification button */}
        <button
          type="button"
          className="text-zinc-500 rounded-md hover:text-zinc-800 dark:hover:text-zinc-300 focus:outline-none px-4"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Dropdown userNavigation={userNavigation} className='relative'>
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full bg-zinc-50"
            src="/components/branding/logo.svg"
            alt=""
            width={32}
            height={32}

          />
          <span className="hidden lg:flex lg:items-center">
            <span className="ml-4 text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-300" aria-hidden="true">
              Tom Cook
            </span>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300" aria-hidden="true" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
