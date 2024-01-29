'use client'
import { Fragment, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

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
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Menu button */}
      <button
        type="button"
        className="text-zinc-500 rounded-md hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 lg:hidden"
        onClick={() => setSidebarOpen(!topbarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex-1 flex justify-end px-4 sm:px-6 lg:px-8">

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
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
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
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-zinc-700 py-1 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none">

              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={twMerge(
                        active ? 'bg-zinc-100 dark:bg-zinc-700' : '',
                        'block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-md'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
