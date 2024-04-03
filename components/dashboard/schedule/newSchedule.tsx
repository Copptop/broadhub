'use client'

import { Dropdown } from '@/components/Dropdowns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { BriefcaseIcon, CalendarIcon, ComputerDesktopIcon, EllipsisHorizontalIcon, MapPinIcon, PresentationChartLineIcon, TruckIcon } from '@heroicons/react/24/outline'
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isAfter, isBefore, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday, startOfWeek } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

interface Booking {
  id: number;
  resource: string;
  resourceType: string;
  startDatetime: string;
  endDatetime: string;
  location: string
}

interface BookingCardsProps {
  data: Booking[];
}


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Schedule({ data }: BookingCardsProps) {

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM yyyy'));
  const firstdayCurrentMonth = parse(currentMonth, 'MMM yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstdayCurrentMonth),
    end: endOfWeek(endOfMonth(firstdayCurrentMonth))
  });

  function nextMonth() {
    const firstDayNextMonth = addMonths(firstdayCurrentMonth, 1)
    setCurrentMonth(format(firstDayNextMonth, 'MMM yyyy'))
  }
  function previousMonth() {
    const firstDayPreviousMonth = addMonths(firstdayCurrentMonth, -1)
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM yyyy'))
  }
  function makecurrentMonth() {
    setCurrentMonth(format(today, 'MMM yyyy'))
  }
  function customSetSelectedDay(day: Date) {
    if (!isSameMonth(day, firstdayCurrentMonth)) {
      if (day < firstdayCurrentMonth) {
        previousMonth()
      }
      if (day > firstdayCurrentMonth) {
        nextMonth()
      }
    }
    setSelectedDay(day)
  }

  const selectedDayBookings = data.filter(booking => isSameDay(parseISO(booking.startDatetime), selectedDay))

  return (
    <>
      <div className="w-full">
        <div className="md:grid md:grid-cols-4 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-500">
          <div className="md:pr-14 col-span-2">
            <div className="flex items-center text-s font-semibold text-zinc-700 dark:text-zinc-300">
              <h2 className="flex-auto align-middle">{format(firstdayCurrentMonth, 'MMMM yyyy')}</h2>
              {isAfter(firstdayCurrentMonth, today) && (
                <button
                  type="button"
                  onClick={() => previousMonth()}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="size-5" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={() => makecurrentMonth()}
                className="px-3.5 align-middle text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 focus:relative"
              >
                Current
              </button>
              <button
                type="button"
                onClick={() => nextMonth()}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-7 grid grid-cols-7 text-center  leading-6 text-s font-semibold text-zinc-700 dark:text-zinc-300">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => (
                <div key={day.toString()} className={classNames(dayIdx > 6 && 'border-t border-zinc-200 dark:border-zinc-500', dayIdx === 0 && colStartClasses[getDay(day)], 'py-2')}>
                  <button
                    type="button"
                    disabled={isBefore(day, today)}
                    onClick={() => customSetSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white, font-semibold',
                      !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-500 hover:text-blue-800',
                      !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstdayCurrentMonth) && 'text-zinc-800 dark:text-zinc-400',
                      !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstdayCurrentMonth) && 'text-zinc-400 dark:text-zinc-600 font-light',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-blue-600 dark:bg-blue-700',
                      isEqual(day, selectedDay) && !isToday(day) && 'bg-blue-400 dark:bg-blue-500',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      isToday(day) && ' font-extrabold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-lg font-normal hover:bg-zinc-200 hover:text-zinc-900'
                    )}
                  >
                    <time dateTime={format(day, 'dd-MMM-yyyy')}>{format(day, 'd')}</time>
                  </button>
                  <div className='size-1 mx-auto my-1'>
                    {data.some((booking) => isSameDay(parseISO(booking.startDatetime), day)) && (
                      <div className="size-1 rounded-full bg-indigo-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14 col-span-2">
            <h2 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
              Schedule for <time dateTime={format(selectedDay, 'dd-MMM-yyyy')}>{format(selectedDay, 'dd, MMM, yyyy')}</time>
            </h2>
            <ol className="divide-y divide-zinc-200 dark:divide-zinc-500 text-sm leading-6 lg:col-span-7 xl:col-span-8">
              {selectedDayBookings.length > 0 ? (
                selectedDayBookings.map((booking) => (
                  <BookingElement booking={booking} key={booking.id} />
                ))
              )
                : (<li className="relative flex space-x-6 py-4 xl:static text-zinc-500 dark:text-zinc-500">No Bookings on this date</li>)}
            </ol>
          </section>
        </div>
      </div >
    </>
  )
}

function BookingElement({ booking }: any) {
  const userNavigation = [
    { name: 'Edit', href: `bookings/${booking.id}` },
    { name: 'Cancel', href: `bookings/${booking.id}` },
  ];

  return (
    <>
      <li key={booking.id} className="relative flex space-x-6 py-4 xl:static">
        <div className="flex-auto flex items-center">
          <div className='px-3'>
            {booking.resourceType === 'desk' && (<ComputerDesktopIcon className="size-7 text-zinc-500 dark:text-zinc-200" />)}
            {booking.resourceType === 'meeting_room' && (<PresentationChartLineIcon className="size-7 text-zinc-500 dark:text-zinc-200" />)}
            {booking.resourceType === 'office' && (<BriefcaseIcon className="size-7 text-zinc-500 dark:text-zinc-200" />)}
            {booking.resourceType === 'parking' && (<TruckIcon className="size-7 text-zinc-500 dark:text-zinc-200" />)}
          </div>
          <div className='p-1'>
            <Link href={`/booking/${booking.id}`} className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500">{booking.resource}</Link>
            <dl className="mt-2 flex flex-col text-zinc-500 dark:text-zinc-500 xl:flex-row">
              <div className="flex items-start space-x-3">
                <dt className="mt-0.5">
                  <CalendarIcon className="size-5" aria-hidden="true" />
                </dt>
                <dd>
                  <time dateTime={booking.startDatetime}>
                    {format(parseISO(booking.startDatetime), 'hh:mm')} --&gt; {format(parseISO(booking.endDatetime), 'hh:mm')}
                  </time>
                </dd>
              </div>
              <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-zinc-400 xl:border-opacity-50 xl:pl-3.5">
                <dt className="mt-0.5">
                  <span className="sr-only">Location</span>
                  <MapPinIcon className="size-5" aria-hidden="true" />
                </dt>
                <dd>{booking.location}</dd>
              </div>
            </dl>
          </div>
        </div>
        <Dropdown userNavigation={userNavigation} className='absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center'>
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
        </Dropdown>
      </li >
    </>
  )
}
