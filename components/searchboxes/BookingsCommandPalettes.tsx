

import { Combobox, Dialog, Transition } from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid';
import { BriefcaseIcon, ChatBubbleLeftRightIcon, TruckIcon } from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import Link from 'next/link';

interface Resource {
  id: number;
  resource: string;
  resourceType: string;
  resourceLocation: string;
  href: string;
  rebookHref: string,
}
interface BookingsSearchPaletteProps<T> {
  data: Array<any>;
  onClose: () => void;
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function BookingsSearchPalette<T>({
  data,
  onClose,
}: BookingsSearchPaletteProps<T>): JSX.Element {
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>!$]/, '');

  const resources = data.map((booking: Resource) => {
    return {
      id: booking.id,
      resource: booking.resource,
      resourceType: booking.resourceType,
      resourceLocation: booking.resourceLocation,
      href: booking.href,
    };
  }
  );

  const deskResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'desk');
  const officeResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'office');
  const meetingRoomResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'meeting room');
  const parkingResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'parking');

  const filteredDeskResources =
    rawQuery === '#'
      ? deskResources
      : query === '' || rawQuery.startsWith('>') || rawQuery.startsWith('!') || rawQuery.startsWith('%')
        ? []
        : deskResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'desk' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query))
        );

  const filteredOfficeResources =
    rawQuery === '>'
      ? officeResources
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('!') || rawQuery.startsWith('%')
        ? []
        : officeResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'office' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query))
        );

  const filteredMeetingRoomResources =
    rawQuery === '!'
      ? meetingRoomResources
      : query === '' || rawQuery.startsWith('%') || rawQuery.startsWith('#') || rawQuery.startsWith('>')
        ? []
        : meetingRoomResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'meeting room' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query))
        );

  const filteredParkingResources =
    rawQuery === '%'
      ? parkingResources
      : query === '' || rawQuery.startsWith('!') || rawQuery.startsWith('#') || rawQuery.startsWith('>')
        ? []
        : parkingResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'parking' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query))
        );

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => { setRawQuery(''); onClose(); }} appear>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="backdrop-blur-none"
          enterTo="backdrop-blur-xl"
          leave="ease-in duration-500"
          leaveFrom="backdrop-blur-xl"
          leaveTo="backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-25 backdrop-filter backdrop-blur transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="scale-95 backdrop-blur-none"
            enterTo="scale-100 backdrop-blur-xl"
            leave="ease-in duration-500"
            leaveFrom="scale-100 backdrop-blur-xl"
            leaveTo="scale-95 backdrop-blur-none"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-zinc-200 dark:divide-zinc-500 overflow-hidden rounded-xl bg-white dark:border-zinc-600 dark:bg-darkBgSecondary shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-zinc-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                {(filteredDeskResources.length > 0 || filteredOfficeResources.length > 0 || filteredMeetingRoomResources.length > 0 || filteredParkingResources.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredDeskResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Desks</h2>
                          <div className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredDeskResources.map((desk) => (
                              <Link key={desk.id} href={desk.href}>
                                <Combobox.Option
                                  value={desk}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-default select-none items-center px-4 py-2 ',
                                      active && 'bg-blue-700 text-zinc-50'
                                    )
                                  }
                                >
                                  <>
                                    <ComputerDesktopIcon
                                      className={classNames('h-6 w-6 flex-none')}
                                      aria-hidden="true"
                                    />
                                    <span className="ml-3 flex-auto truncate">{desk.resource}</span>
                                    <span className="ml-1 flex-auto truncate">{desk.resourceLocation}</span>
                                  </>
                                </Combobox.Option>
                              </Link>
                            ))}
                          </div>
                        </li>
                      </ul>
                    )}
                    {filteredOfficeResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Offices</h2>
                          <div className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredOfficeResources.map((office) => (
                              <Link key={office.id} href={office.href}>
                                <Combobox.Option
                                  value={office}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-default select-none items-center px-4 py-2',
                                      active && 'bg-blue-700 text-zinc-50'
                                    )
                                  }
                                >
                                  <BriefcaseIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                  <span className="ml-3 flex-auto truncate">{office.resource}</span>
                                  <span className="ml-1 flex-auto truncate">{office.resourceLocation}</span>
                                </Combobox.Option>
                              </Link>
                            ))}
                          </div>
                        </li>
                      </ul>
                    )}
                    {filteredMeetingRoomResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meeting Rooms</h2>
                          <div className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredMeetingRoomResources.map((room) => (
                              <Link key={room.id} href={room.href}>
                                <Combobox.Option

                                  value={room}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-default select-none items-center px-4 py-2',
                                      active && 'bg-blue-700 text-zinc-50'
                                    )
                                  }
                                >
                                  <ChatBubbleLeftRightIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                  <span className="ml-3 flex-auto truncate">{room.resource}</span>
                                  <span className="ml-1 flex-auto truncate">{room.resourceLocation}</span>
                                </Combobox.Option>
                              </Link>
                            ))}
                          </div>
                        </li>
                      </ul>
                    )}
                    {filteredParkingResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Parking</h2>
                          <div className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredParkingResources.map((parking) => (
                              <Link key={parking.id} href={parking.href}>
                                <Combobox.Option

                                  value={parking}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-default select-none items-center px-4 py-2',
                                      active && 'bg-blue-700 text-zinc-50'
                                    )
                                  }
                                >
                                  <TruckIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                  <span className="ml-3 flex-auto truncate">{parking.resource}</span>
                                  <span className="ml-1 flex-auto truncate">{parking.resourceLocation}</span>
                                </Combobox.Option>
                              </Link>
                            ))}
                          </div>
                        </li>
                      </ul>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === '?' && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <LifebuoyIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">Help with searching</p>
                    <p className="mt-2 text-zinc-500">
                      Use this tool to quickly search for previous bookings on the platform. You can also
                      use the search modifiers found in the footer below to limit the results to certain types of resources.
                    </p>
                  </div>
                )}

                {query !== '' && rawQuery !== '?' && filteredDeskResources.length === 0 && filteredOfficeResources.length === 0 && filteredMeetingRoomResources.length === 0 && filteredParkingResources.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">No results found</p>
                    <p className="mt-2 text-zinc-500">We couldn’t find anything with that term. Please try again.</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center bg-zinc-50 dark:bg-darkBgSecondary px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('#') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    #
                  </kbd>{' '}
                  <span className="hidden sm:inline">for Desks,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for Offices,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('!') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    !
                  </kbd>{' '}
                  for Meeting Rooms,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('%') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    %
                  </kbd>{' '}
                  for Parking,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery === '?' ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface AdminResource extends Resource {
  user: string;
}

export function AdminBookingSearchPalette<T>({
  data,
  onClose,
}: BookingsSearchPaletteProps<T>): JSX.Element {
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>!$]/, '');

  const resources = data.map((booking: AdminResource) => {
    return {
      id: booking.id,
      user: booking.user,
      resource: booking.resource,
      resourceType: booking.resourceType,
      resourceLocation: booking.resourceLocation,
      href: booking.href,
    };
  }
  );

  const deskResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'desk');
  const officeResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'office');
  const meetingRoomResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'meeting room');
  const parkingResources = resources.filter((resource) => resource.resourceType.toLowerCase() === 'parking');

  const filteredDeskResources =
    rawQuery === '#'
      ? deskResources
      : query === '' || rawQuery.startsWith('>') || rawQuery.startsWith('!') || rawQuery.startsWith('%')
        ? []
        : deskResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'desk' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query) || resource.user.toLowerCase().includes(query))
        );

  const filteredOfficeResources =
    rawQuery === '>'
      ? officeResources
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('!') || rawQuery.startsWith('%')
        ? []
        : officeResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'office' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query) || resource.user.toLowerCase().includes(query))
        );

  const filteredMeetingRoomResources =
    rawQuery === '!'
      ? meetingRoomResources
      : query === '' || rawQuery.startsWith('!') || rawQuery.startsWith('#') || rawQuery.startsWith('>')
        ? []
        : meetingRoomResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'meeting room' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query) || resource.user.toLowerCase().includes(query))
        );

  const filteredParkingResources =
    rawQuery === '%'
      ? parkingResources
      : query === '' || rawQuery.startsWith('%') || rawQuery.startsWith('#') || rawQuery.startsWith('>')
        ? []
        : parkingResources.filter((resource) =>
          resource.resourceType.toLowerCase() === 'parking' &&
          (resource.resource.toLowerCase().includes(query) || resource.resourceLocation.toLowerCase().includes(query) || resource.user.toLowerCase().includes(query))
        );

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => { setRawQuery(''); onClose(); }} appear>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="backdrop-blur-none"
          enterTo="backdrop-blur-xl"
          leave="ease-in duration-500"
          leaveFrom="backdrop-blur-xl"
          leaveTo="backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-25 backdrop-filter backdrop-blur transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="scale-95 backdrop-blur-none"
            enterTo="scale-100 backdrop-blur-xl"
            leave="ease-in duration-500"
            leaveFrom="scale-100 backdrop-blur-xl"
            leaveTo="scale-95 backdrop-blur-none"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-zinc-200 dark:divide-zinc-500 overflow-hidden rounded-xl bg-white dark:border-zinc-600 dark:bg-darkBgSecondary shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item: any) => (window.location.href = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-zinc-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                {(filteredDeskResources.length > 0 || filteredOfficeResources.length > 0 || filteredMeetingRoomResources.length > 0 || filteredParkingResources.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredDeskResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Desks</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredDeskResources.map((desk) => (
                              <Combobox.Option
                                key={desk.id}
                                value={desk}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2 ',
                                    active && 'bg-blue-700 text-zinc-50'
                                  )
                                }
                              >
                                <>
                                  <ComputerDesktopIcon
                                    className={classNames('h-6 w-6 flex-none')}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">{desk.resource}</span>
                                  <span className="ml-1 flex-auto truncate">{desk.resourceLocation}</span>
                                </>
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                    {filteredOfficeResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Offices</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredOfficeResources.map((office) => (
                              <Combobox.Option
                                key={office.id}
                                value={office}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    active && 'bg-blue-700 text-zinc-50'
                                  )
                                }
                              >
                                <BriefcaseIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                <span className="ml-3 flex-auto truncate">{office.resource}</span>
                                <span className="ml-1 flex-auto truncate">{office.resourceLocation}</span>
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                    {filteredMeetingRoomResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meeting Rooms</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredMeetingRoomResources.map((room) => (
                              <Combobox.Option
                                key={room.id}
                                value={room}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    active && 'bg-blue-700 text-zinc-50'
                                  )
                                }
                              >
                                <ChatBubbleLeftRightIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                <span className="ml-3 flex-auto truncate">{room.resource}</span>
                                <span className="ml-1 flex-auto truncate">{room.resourceLocation}</span>
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                    {filteredParkingResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Parking</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredParkingResources.map((parking) => (
                              <Combobox.Option
                                key={parking.id}
                                value={parking}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    active && 'bg-blue-700 text-zinc-50'
                                  )
                                }
                              >
                                <TruckIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                <span className="ml-3 flex-auto truncate">{parking.resource}</span>
                                <span className="ml-1 flex-auto truncate">{parking.resourceLocation}</span>
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === '?' && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <LifebuoyIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">Help with searching</p>
                    <p className="mt-2 text-zinc-500">
                      Use this tool to quickly search for previous bookings on the platform. You can also
                      use the search modifiers found in the footer below to limit the results to certain types of resources.
                    </p>
                  </div>
                )}

                {query !== '' && rawQuery !== '?' && filteredDeskResources.length === 0 && filteredOfficeResources.length === 0 && filteredMeetingRoomResources.length === 0 && filteredParkingResources.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">No results found</p>
                    <p className="mt-2 text-zinc-500">We couldn’t find anything with that term. Please try again.</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center bg-zinc-50 dark:bg-darkBgSecondary px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('#') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    #
                  </kbd>{' '}
                  <span className="hidden sm:inline">for Desks,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for Offices,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('!') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    !
                  </kbd>{' '}
                  for Meeting Rooms,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('%') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    %
                  </kbd>{' '}
                  for Parking,{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery === '?' ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
