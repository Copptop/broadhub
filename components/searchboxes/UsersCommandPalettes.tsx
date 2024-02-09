"use server"

import { Combobox, Dialog, Transition } from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  officeLocation: string;
  profilePicture: JSX.Element;
}
interface UsersSearchPaletteProps<T> {
  data: Array<any>;
  onClose: () => void;
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function UsersSearchPalette<T>({
  data,
  onClose,
}: UsersSearchPaletteProps<T>): JSX.Element {
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>!$]/, '');

  const users = data.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.officeLocation,
      href: `/users/${user.id}`,
      profilePicture: user.profilePicture,
    };
  }
  );

  const filteredUsers =
    query === ''
      ? []
      : users.filter((user) => {
        return user.name.toLowerCase().includes(query.toLowerCase());
      });

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

                {(filteredUsers.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredUsers.length > 0 && (
                      <ul>
                        <li>
                          <li className="-mx-4 mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {filteredUsers.map((user) => (
                              <Combobox.Option
                                key={user.id}
                                value={user}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2 ',
                                    active && 'bg-blue-700 text-zinc-50'
                                  )
                                }
                              >
                                <>
                                  {user.profilePicture}
                                  <span className="ml-3 flex-auto truncate">{user.name}</span>
                                  <span className="ml-1 flex-auto truncate">{user.role}</span>
                                  <span className="ml-1 flex-auto truncate">{user.location}</span>
                                </>
                              </Combobox.Option>
                            ))}
                          </li>
                        </li>
                      </ul>
                    )}
                    {rawQuery === '?' && (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <LifebuoyIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                        <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">Help with searching</p>
                        <p className="mt-2 text-zinc-500">
                          Use this tool to quickly search for users on the platform.
                        </p>
                      </div>
                    )}

                    {query !== '' && rawQuery !== '?' && filteredUsers.length === 0 && (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-zinc-400" aria-hidden="true" />
                        <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">No results found</p>
                        <p className="mt-2 text-zinc-500">We couldn’t find anything with that term. Please try again.</p>
                      </div>
                    )}
                  </Combobox.Options>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
