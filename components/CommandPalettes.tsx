import React, { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  LifebuoyIcon,
  BuildingOfficeIcon
} from '@heroicons/react/20/solid';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';

interface Resource {
  id: number;
  name: string;
  category: string;
  url: string;
}

interface Location {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const resources: Resource[] = [
  { id: 1, name: 'bash test', category: 'desk', url: '#' },
  { id: 2, name: 'Desk TP', category: 'desk', url: '#' },
  { id: 3, name: 'Desk TaP', category: 'desk', url: '#' },
  { id: 4, name: 'Desk TbP', category: 'desk', url: '#' },
  { id: 5, name: 'Desk TP', category: 'desk', url: '#' },
  { id: 6, name: 'Desk TPv', category: 'desk', url: '#' },
  { id: 7, name: 'Desk TPc', category: 'desk', url: '#' },
  // More resources...
];

const locations: Location[] = [
  {
    id: 1,
    name: 'bash Wall, Canary Wharf',
    url: '#',
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Marsh Wall, Canary Wharf 1',
    url: '#',
    imageUrl: '',
  },
  {
    id: 3,
    name: 'Marsh Wall, Canary Wharf 2',
    url: '#',
    imageUrl: '',
  },
  {
    id: 4,
    name: 'Marsh Wall, Canary Wharf 3',
    url: '#',
    imageUrl: '',
  },
  {
    id: 5,
    name: 'Marsh Wall, Canary Wharf 4',
    url: '#',
    imageUrl: '',
  }
];

export default function BookingSearchPalette({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element {
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

  const filteredResources =
    rawQuery === '#'
      ? resources
      : query === '' || rawQuery.startsWith('>')
        ? []
        : resources.filter((resource) => resource.name.toLowerCase().includes(query));

  const filteredLocations =
    rawQuery === '>'
      ? locations
      : query === '' || rawQuery.startsWith('#')
        ? []
        : locations.filter((location) => location.name.toLowerCase().includes(query));

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => { setRawQuery(''); onClose(); }} appear>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
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

                {(filteredResources.length > 0 || filteredLocations.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredResources.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Resources</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredResources.map((resource) => (
                              <Combobox.Option
                                key={resource.id}
                                value={resource}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2 ',
                                    active && 'bg-blue-700 text-zinc-200'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <ComputerDesktopIcon
                                      className={classNames('h-6 w-6 flex-none', active ? 'text-zinc-600 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-200')}
                                      aria-hidden="true"
                                    />
                                    <span className="ml-3 flex-auto truncate">{resource.name}</span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                    {filteredLocations.length > 0 && (
                      <ul>
                        <li>
                          <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Locations</h2>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredLocations.map((location) => (
                              <Combobox.Option
                                key={location.id}
                                value={location}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    active && 'bg-blue-700 text-zinc-200'
                                  )
                                }
                              >
                                <BuildingOfficeIcon className={classNames('h-6 w-6 flex-none')} aria-hidden="true" />
                                <span className="ml-3 flex-auto truncate">{location.name}</span>
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
                      Use this tool to quickly search for locations and resources across our entire platform. You can also
                      use the search modifiers found in the footer below to limit the results to just locations or resources.
                    </p>
                  </div>
                )}

                {query !== '' && rawQuery !== '?' && filteredResources.length === 0 && filteredLocations.length === 0 && (
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
                  <span className="sm:hidden">for resources,</span>
                  <span className="hidden sm:inline">to access resources,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:border-zinc-600 dark:bg-darkBgSecondary font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-blue-700 text-blue-700' : 'border-zinc-400 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for locations, and{' '}
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
