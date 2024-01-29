'use client'

import React, { Fragment } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { AcademicCapIcon, ArrowRightEndOnRectangleIcon, CalendarIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';

interface ScheduleItemProps {
  id: number;
  resource: string;
  resourceType: string;
  resourceLocation: string;
  href: string;
  startDateTime: string;
  endDateTime: string;
}

const userNavigation = [
  { name: 'Edit', href: '/bookings' },
  { name: 'Cancel', href: '/bookings' },
];
        
export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  resource,
  resourceType,
  resourceLocation,
  startDateTime,
  endDateTime
}) => {
  const currentPath = usePathname();

  startDateTime = format(startDateTime, 'd/m/y h:mm a');
  endDateTime = format(endDateTime, 'h:mm a');
  const iconComponent = resourceType === 'desk' ? <AcademicCapIcon className="h-5 w-5 align-middle rounded-lg text-zinc-700 dark:text-zinc-300 " aria-hidden="true" /> : <ArrowRightEndOnRectangleIcon className="h-5 w-5 align-middle rounded-lg text-zinc-700 dark:text-zinc-300 " aria-hidden="true" />

  return (
    <>
      <li key={id} className="relative flex space-x-6 py-6 xl:static">
        <div className="flex-auto flex items-center">
          <div className="mr-4">{iconComponent}</div>
          <div>
            <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">{resource}</h3>
            <dl className="mt-2 flex flex-col text-zinc-500 dark:text-zinc-500 xl:flex-row">
              <div className="flex items-start space-x-3">
                <dt className="mt-0.5">
                  <span className="sr-only">Date</span>
                  <CalendarIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </dt>
                <dd>
                  <time dateTime={startDateTime}>
                    {startDateTime} --&gt; {endDateTime}
                  </time>
                </dd>
              </div>
              <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-zinc-400 xl:border-opacity-50 xl:pl-3.5">
                <dt className="mt-0.5">
                  <span className="sr-only">Location</span>
                  <MapPinIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </dt>
                <dd>{resourceLocation}</dd>
              </div>
            </dl>
          </div>
        </div>
        <Menu as="div" className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-lg p-2 text-zinc-500 hover:text-zinc-600">
              <span className="sr-only">Open options</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
      </li>
    </>
  );
}

export default ScheduleItem;