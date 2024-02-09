

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { ReactNode } from "react";
interface table {
  headers: Array<any>;
  data: Array<any>;
  Actions?: Array<any>;
}

export const Table: React.FC<table> = ({ data, Actions, headers }) => {
  if (Actions && !headers.some(header => header.name === "Actions")) {
    headers.push({ name: "Actions", sortable: false });
  }

  return (
    <>
      <div className="flex my-8 h-[80dvh] overflow-auto">
        <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead className="sticky top-0 z-10 bg-white dark:bg-zinc-900">
                <tr>
                  {headers.map((header) => (
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
                {data.map((dp) => (
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
                        {Actions!.map((action) => (
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
