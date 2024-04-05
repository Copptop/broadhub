'use client'
import { ResetPasswordHandler } from "@/lib/handlers/resetPassword";
import { useCurrentRole } from "@/lib/hooks/use-current-user";
import { ExclamationCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { ReactNode, useRef } from "react";
import { ConfirmModal } from "./popups/Modals";
import { HappyNotification } from "./popups/Notfication";
import Image from "next/image";
import { format } from "date-fns";
interface table {
  headers: Array<any>;
  data: Array<any>;
  Actions?: Array<any>;
}

export function Table(dataFeed: table) {
  const [isUserModalOpen, setIsUserModalOpen] = React.useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  const id = useRef('');

  const role = useCurrentRole();
  if (dataFeed.Actions && !dataFeed.headers.some(header => header.name === "Actions")) {
    dataFeed.headers.push({ name: "Actions", sortable: false });
  }

  const handlePasswordReset = (email: string) => {
    ResetPasswordHandler(email)
    setShowNotification(true)
  }
  return (
    <>
      <div className="flex my-8 h-[80dvh] overflow-auto">
        <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead className="sticky top-0 z-10 bg-white dark:bg-zinc-900">
                <tr>
                  {dataFeed.headers.map((header) => (
                    <th key={header.name} scope="col" className="sticky top-0 py-3.5 px-4 text-center text-sm sm:px-1 content-center ">
                      {header.sortable !== false ? (
                        <div className="group inline-flex">
                          {header.name}
                        </div>
                      ) : (
                        <span>{header.name}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-500 text-center text-zinc-500 dark:text-zinc-500 font-normal">
                {dataFeed.data.map((dp) => (
                  <tr key={dp.id} className="">
                    {Object.entries(dp)
                      .filter(([key]) => key !== "href")
                      .filter(([key]) => key !== "rebookHref")
                      .filter(([key]) => key !== "id")
                      .filter(([key]) => key !== "resourceType")
                      .filter(([key]) => key !== "isOauth")
                      .map(([key, value], index) => (
                        <td key={index} className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {key === "profilePicture" ? (
                            <>
                              {dp.image == '' ? (
                                <>
                                  <UserCircleIcon className='size-8 rounded-full' />
                                </>
                              ) : (
                                <>
                                  <Image blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mPcWvSjnoEIwDiqkL4KAdiTGjfujfEoAAAAAElFTkSuQmCC" placeholder="blur" src={(value as ReactNode)?.toString() || 'https://images.freeimages.com/image/previews/374/instabutton-png-design-5690390.png'} width={100} height={100} alt="" className="size-14 rounded-full" />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {key === "startDateTime" || key === "endDateTime" ? (
                                <>
                                  {format(value as Date, 'dd-MM-yyyy @ hh:mm') as ReactNode}
                                </>
                              ) : (
                                <>
                                  {value as ReactNode}
                                </>
                              )}
                            </>
                          )}
                        </td>
                      ))}
                    <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                      <div className="flex justify-center">
                        {dataFeed.Actions!.map((action) => (
                          <div key={action.name}>
                            {action.name === 'View' && (
                              <React.Fragment>
                                {action.navigateTo && dp.href ? (
                                  <Link href={dp.href}>
                                    <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                      {action.name}
                                    </div>
                                  </Link>
                                ) : (
                                  <span className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                    {action.name}
                                  </span>
                                )}
                              </React.Fragment>
                            )}
                            {action.name === 'Rebook' && (
                              <React.Fragment >
                                {action.navigateTo && dp.href ? (
                                  <Link href={dp.rebookHref}>
                                    <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                      {action.name}
                                    </div>
                                  </Link>
                                ) : (
                                  <span className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                    {action.name}
                                  </span>
                                )}
                              </React.Fragment>
                            )}
                            {(action.name === 'Amend' && (role == 'ADMIN' || role == 'HR' || role == 'MANAGER')) && (
                              <>
                                {role == 'MANAGER' ? (
                                  <>
                                    <React.Fragment >
                                      {action.navigateTo && dp.href ? (
                                        <Link href={dp.href}>
                                          <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                            View
                                          </div>
                                        </Link>
                                      ) : (
                                        <span className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                          {action.name}
                                        </span>
                                      )}
                                    </React.Fragment>
                                  </>
                                ) : (
                                  <>
                                    <React.Fragment >
                                      {action.navigateTo && dp.href ? (
                                        <Link href={dp.href}>
                                          <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                            {action.name}
                                          </div>
                                        </Link>
                                      ) : (
                                        <span className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                          {action.name}
                                        </span>
                                      )}
                                    </React.Fragment>
                                  </>
                                )}
                              </>
                            )}
                            {(action.name === 'Reset Password' && (role == 'ADMIN' || role == 'HR' || role == 'MANAGER') && dp.isOauth) && (
                              <React.Fragment >
                                <button onClick={() => handlePasswordReset(dp.email)}>
                                  <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                    {action.name}
                                  </div>
                                </button>
                              </React.Fragment>
                            )}
                            {(action.name === 'Delete' && role == 'ADMIN') && (
                              <React.Fragment >
                                <button onClick={() => { id.current = dp.id; setIsUserModalOpen(true) }}>
                                  <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                    {action.name}
                                  </div>
                                </button>
                              </React.Fragment>
                            )}
                            {(action.name === 'Cancel' && role == 'ADMIN') && (
                              <React.Fragment >
                                <button onClick={() => { id.current = dp.id; setIsBookingModalOpen(true) }}>
                                  <div className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap">
                                    {action.name}
                                  </div>
                                </button>
                              </React.Fragment>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div >
      {isUserModalOpen && (
        <ConfirmModal open={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} type='user management' id={id.current}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-darkBgTertiary">
            <ExclamationCircleIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
              Delete User
            </h3>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
          </div>
        </ConfirmModal>
      )}
      {isBookingModalOpen && (
        <ConfirmModal open={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} type='booking management' id={id.current}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-darkBgTertiary">
            <ExclamationCircleIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
              Delete Booking
            </h3>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>
            </div>
          </div>
        </ConfirmModal>
      )}
      {showNotification && (
        <>
          <HappyNotification show={showNotification} onClose={() => setShowNotification(false)} >
            Action was performed successfully
          </HappyNotification>
        </>
      )}
    </>
  );
};

interface list_table {
  headers: Array<String>;
  data: Array<{ name: String, href: String }>;
}

export function List_Table(dataFeed: list_table) {
  return (
    <>
      <div className="flex my-8 h-[80dvh] overflow-auto">
        <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead className="sticky text-left top-0 z-10 bg-white dark:bg-zinc-900">
                <tr>
                  {dataFeed.headers.map((header) => (
                    <th key={header.toString()} scope="col" className="sticky top-0 py-3.5 px-4 text-sm sm:px-1 ">
                      <div>{header}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 font-normal">
                {dataFeed.data.map((dp, index) => (
                  <tr key={index}>
                    <Link href={`${dp.href}`}>
                      <div className="flex items-center justify-end">
                        <td className="flex-none whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {dp.name}
                        </td>
                        <div className="flex-auto" />
                        <ArrowRightIcon className="flex-none size-6 " />
                      </div>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

interface bookingListTable {
  headers: Array<String>;
  data: Array<{ name: String, type: String, status: String, isFavourite?: Boolean }>;
  toggleSlideOver: (id: String) => void;
}

export function BookingListTable(dataFeed: bookingListTable) {

  if (!dataFeed.headers.some(header => header === "Actions")) {
    dataFeed.headers.push("Actions");
  }
  return (
    <>
      <div className="flex my-8 h-[80dvh] overflow-auto">
        <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead className="sticky text-left top-0 z-10 bg-white dark:bg-zinc-900">
                <tr>
                  {dataFeed.headers.map((header) => (
                    header !== "Actions" ? (
                      <th key={header.toString()} scope="col" className="sticky top-0 py-3.5 px-4 text-sm sm:px-1 ">
                        <span>{header}</span>
                      </th>
                    ) : (
                      <th key={header.toString()} scope="col" className="sticky top-0 py-3.5 px-4 text-sm sm:px-1 text-center">
                        <span >{header}</span>
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 font-normal">
                {dataFeed.data.map((dp) => (
                  <tr key={dp.name.toString()} id={dp.name.toString()} className={dp.isFavourite ? "text-orange-500" : ""} >
                    {Object.entries(dp)
                      .filter(([key]) => key !== "href" && key !== "isFavourite")
                      .map(([key, value], index) => (
                        <td key={index} className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {value as ReactNode}
                        </td>
                      ))}
                    <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                      <div className="flex justify-center">
                        {dp.status.toLocaleLowerCase() === 'available' ? (
                          <button
                            onClick={() => dataFeed.toggleSlideOver(dp.name.toString())}
                            className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap"
                          >
                            Book
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}