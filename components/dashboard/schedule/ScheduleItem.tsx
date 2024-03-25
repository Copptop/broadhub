'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { AcademicCapIcon, ArrowRightEndOnRectangleIcon, CalendarIcon, EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { Dropdown } from '@/components/Dropdowns';
import Link from 'next/link';

interface ScheduleItemProps {
  id: number;
  resource: string;
  resourceType: string;
  resourceLocation: string;
  href: string;
  startDateTime: string;
  endDateTime: string;
}


export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  resource,
  resourceType,
  resourceLocation,
  startDateTime,
  endDateTime,
  href
}) => {

  const userNavigation = [
    { name: 'Edit', href: href },
    { name: 'Cancel', href: href },
  ];
  const currentPath = usePathname();

  startDateTime = format(new Date(startDateTime), 'd/m/y h:mm a');
  endDateTime = format(new Date(endDateTime), 'h:mm a');
  const iconComponent = resourceType === 'desk' ? <AcademicCapIcon className="h-5 w-5 align-middle rounded-lg text-zinc-700 dark:text-zinc-300 " aria-hidden="true" /> : <ArrowRightEndOnRectangleIcon className="h-5 w-5 align-middle rounded-lg text-zinc-700 dark:text-zinc-300 " aria-hidden="true" />

  return (
    <>
      <li key={id} className="relative flex space-x-6 py-6 xl:static">
        <div className="flex-auto flex items-center">
          <div className="mr-4">{iconComponent}</div>
          <div>
            <Link href={href} className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500">{resource}</Link>
            <dl className="mt-2 flex flex-col text-zinc-500 dark:text-zinc-500 xl:flex-row">
              <div className="flex items-start space-x-3">
                <dt className="mt-0.5">
                  <span className="sr-only">Date</span>
                  <CalendarIcon className="h-5 w-5" aria-hidden="true" />
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
                  <MapPinIcon className="h-5 w-5" aria-hidden="true" />
                </dt>
                <dd>{resourceLocation}</dd>
              </div>
            </dl>
          </div>
        </div>
        <Dropdown userNavigation={userNavigation} className='absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center'>
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Dropdown>
      </li>
    </>
  );
}

export default ScheduleItem;