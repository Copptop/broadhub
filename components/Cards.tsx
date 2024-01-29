import { Menu, Transition } from '@headlessui/react';
import { AcademicCapIcon, ArrowRightEndOnRectangleIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import React, { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

interface BookingCardProps {
  id: number;
  resource: string;
  resourceType: string;
  href: string;
  datetime: string;
}

const userNavigation = [
  { name: 'Edit', href: '/bookings' },
  { name: 'Cancel', href: '/bookings' },
];

export const BookingCard: React.FC<BookingCardProps> = ({ id, resource, resourceType, href, datetime }) => {
  const displayDate = format(datetime, 'EEEE, dd MMM yyy')
  const iconComponent = resourceType === 'desk' ? <AcademicCapIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" /> : <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />


  return (
    <>
      <li key={id} className="col-span-1 flex rounded-md shadow-sm relative">
        <div
          className=
          'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium bg-blue-300 dark:bg-blue-700'
        >
          {iconComponent}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md shadow-lg bg-white dark:border-grey-800 dark:bg-darkBgSecondary">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <a href={href} className="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500">
              {resource}
            </a>
            <p className="text-zinc-500 dark:text-zinc-400">{displayDate}</p>
          </div>
          <Menu as="div">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open booking options</span>
              <EllipsisVerticalIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
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
      </li>
    </>
  );
};

interface BookingCardsProps {
  data: BookingCardProps[];
}

export const BookingCards: React.FC<BookingCardsProps> = ({ data }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 pt-4 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {data.map((card, index) => (
        <BookingCard key={index} {...card} />
      ))}
    </ul>
  );
};
