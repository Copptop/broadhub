'use client'

import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import {
  Cog6ToothIcon,
  XMarkIcon,
  HomeIcon,
  MapIcon,
  QueueListIcon,
  TicketIcon,
} from '@heroicons/react/24/outline'

import { StandardLogo } from '@/components/logo';
import { SidebarItem, AdminSidebarItem } from '@/components/navigation/sidebar/SidebarItems'
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Map View', href: '/map', icon: MapIcon },
  { name: 'List View', href: '/list', icon: QueueListIcon },
  { name: 'Previous Bookings', href: '/bookings', icon: TicketIcon },
]
const tools = [
  { name: 'Analytics', href: '/analytics', initial: 'A' },
  { name: 'Manage Users', href: '/management/users', initial: 'U' },
  { name: 'Manage Bookings', href: '/management/bookings', initial: 'B' },
]
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {


  return (
    <>
      {/* SIDEBAR CODE START */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setSidebarOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-zinc-200" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-compLightBlue dark:bg-zinc-800 b-1 border-Primary px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <StandardLogo className='w-full h-auto' />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <SidebarItem key={item.name} name={item.name} href={item.href} icon={<item.icon />} />
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-zinc-200">Tools</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {tools.map((tool) => (
                            <AdminSidebarItem key={tool.name} {...tool} />
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <Link
                          href="/settings"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-200 hover:bg-Primary hover:text-zinc-100"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-zinc-200 group-hover:text-zinc-100"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar ifyou like */}
        <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-compLightBlue dark:bg-zinc-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center pb-0">
            <StandardLogo className='w-full h-auto' />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <SidebarItem key={item.name} name={item.name} href={item.href} icon={<item.icon />} />
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-md font-semibold leading-6 text-zinc-200">Your tools</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {tools.map((tool) => (
                    <AdminSidebarItem key={tool.name} {...tool} />
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-200 hover:bg-Primary hover:text-zinc-100"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-zinc-300 group-hover:text-zinc-200"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
