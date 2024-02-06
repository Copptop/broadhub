import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

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
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header.name} scope="col" className="py-3.5 px-4 text-center text-sm sm:px-1 content-center">
                      {header.sortable !== false ? (
                        <a href="#" className="group inline-flex">
                          {header.name}
                          <span className="invisible ml-2 flex-none rounded group-hover:visible group-focus:visible">
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </a>
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
                    {Object.values(dp).map((value, index) => (
                      <td key={index} className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                        {value as ReactNode}
                      </td>
                    ))}
                    <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                      <div className="flex justify-center">
                        {Actions!.map((action) => (
                          <a key={action.name} href="#" className="px-4 py-1 text-sm font-medium text-blue-700 hover:text-compLightBlue whitespace-nowrap">
                            {action.name}
                          </a>
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
