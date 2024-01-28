'use client'

import React, { Fragment } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

interface ScheduleItemProps {
  id: number;
  icon?: React.ReactNode;// Update the type for 'icon' prop to accept JSX elements
  name: string;
  startDatetime: string;
  endDatetime: string;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  icon,
  name,
  startDatetime,
  endDatetime
}) => {
  const currentPath = usePathname();
  return (
    <>
      <li key={name}>
        <div className="flex-auto">
          <p className="text-gray-900">{name}</p>
          <p className="mt-0.5">
            <time dateTime={startDatetime}>{startDatetime}</time> -{' '}
            <time dateTime={endDatetime}>{endDatetime}</time>
          </p>
        </div>
        <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={twMerge(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={twMerge(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Cancel
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    </>
  );
}

export default ScheduleItem;