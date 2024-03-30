'use client'

import { Dropdown } from '@/components/Dropdowns';
import { AcademicCapIcon, ArrowRightEndOnRectangleIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

interface BookingCardProps {
  id: number;
  resource: string;
  resourceType: string;
  href: string;
  datetime: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({ id, resource, resourceType, href, datetime }) => {

  const userNavigation = [
    { name: 'Edit', href: href },
    { name: 'Cancel', href: href },
  ];

  const displayDate = format(new Date(datetime), 'EEEE, dd MMM yyy')
  const iconComponent = resourceType === 'desk' ? <AcademicCapIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" aria-hidden="true" /> : <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-zinc-300 dark:text-zinc-300" aria-hidden="true" />


  return (
    <>
      <li key={id} className="col-span-1 flex rounded-md shadow-lg  relative">
        <div
          className=
          'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium  bg-gradient-to-r from-compLightBlue to-compDarkBlue dark:bg-gradient-to-r dark:from-compDKMLightBlue dark:to-compDKMDarkBlue'
        >
          {iconComponent}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white dark:border-zinc-800 dark:bg-darkBgSecondary">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <Link href={href} className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500">
              {resource}
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400">{displayDate}</p>
          </div>
          <Dropdown userNavigation={userNavigation} className='px-4'>
            <span className="sr-only">Open booking options</span>
            <EllipsisVerticalIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
          </Dropdown>
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
