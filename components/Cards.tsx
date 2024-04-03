'use client'

import { Dropdown } from '@/components/Dropdowns';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon, ArrowRightEndOnRectangleIcon, BriefcaseIcon, ComputerDesktopIcon, EllipsisVerticalIcon, PresentationChartLineIcon, TruckIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

interface BookingCardProps {
  id: number;
  resource: string;
  resourceType: string;
  startDatetime: string;
  endDatetime: string;
  location: string
}

export const BookingCard: React.FC<BookingCardProps> = ({ id, resource, resourceType, startDatetime }) => {

  const userNavigation = [
    { name: 'Edit', href: `/bookings/${id}` },
    { name: 'Cancel', href: `/bookings/${id}` },
  ];

  const displayDate = format(new Date(startDatetime), 'EEEE, dd MMM yyy')

  let iconComponent
  if (resourceType === 'desk') { iconComponent = <ComputerDesktopIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" /> }
  else if (resourceType === 'meeting_room') { iconComponent = <PresentationChartLineIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" /> }
  else if (resourceType === 'office') { iconComponent = <BriefcaseIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" /> }
  else if (resourceType === 'parking') { iconComponent = <TruckIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" /> }
  else { iconComponent = <QuestionMarkCircleIcon className="h-5 w-5 text-zinc-200 dark:text-zinc-200" /> }

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
            <Link href={`/bookings/${id}`} className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500">
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
