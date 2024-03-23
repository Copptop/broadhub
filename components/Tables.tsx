import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { ReactNode } from "react";
interface table {
  headers: Array<any>;
  data: Array<any>;
  Actions?: Array<any>;
}

export function Table(dataFeed: table) {
  if (dataFeed.Actions && !dataFeed.headers.some(header => header.name === "Actions")) {
    dataFeed.headers.push({ name: "Actions", sortable: false });
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
                          <span className="invisible ml-2 flex-none rounded group-hover:visible group-focus:visible">
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                      ) : (
                        <span>{header.name}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 text-center font-normal">
                {dataFeed.data.map((dp) => (
                  <tr key={dp.id} className="">
                    {Object.entries(dp)
                      .filter(([key]) => key !== "href")
                      .map(([key, value], index) => (
                        <td key={index} className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {value as ReactNode}
                        </td>
                      ))}
                    <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                      <div className="flex justify-center">
                        {dataFeed.Actions!.map((action) => (
                          <React.Fragment key={action.name}>
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
                        ))}
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
                      <span>{header}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 font-normal">
                {dataFeed.data.map((dp, index) => (
                  <tr key={index}>
                    <Link href={`${dp.href}`}>
                      <span className="flex items-center justify-end">
                        <td className="flex-none whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {dp.name}
                        </td>
                        <div className="flex-auto" />
                        <ArrowRightIcon className="flex-none size-6 " />
                      </span>
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