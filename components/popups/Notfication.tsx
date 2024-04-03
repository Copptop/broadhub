import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

export interface NotificationProps {
  show: boolean;
  onClose: () => void;
  resources?: String;
  date: Date;
  from: String;
  to: String;
}

export default function BookingNotification({ show, onClose, resources, date, from, to }: NotificationProps) {
  const [localshow, setLocalShow] = useState(show);

  useEffect(() => {
    setLocalShow(show);
  }, [show]);


  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 pt-[75px] pb-6 sm:items-start"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-darkBgSecondary dark:border-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Successfully Booked!</p>
                    <p className="mt-1 text-sm text-zinc-500">You have Successfully Booked {resources}</p>
                    <p className="mt-1 text-sm text-zinc-500">For {format(date, 'dd/MM/yyyy')}</p>
                    <p className="mt-1 text-sm text-zinc-500">Between {from} and {to}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white dark:bg-darkBgSecondary text-zinc-500 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => { setLocalShow(false); onClose(); }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}