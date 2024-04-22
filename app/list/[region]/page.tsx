import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getLocations_Region } from "@/lib/database/locations";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// Define the headers for the list table
const headers = ['Locations']

export default async function Page({ params }: { params: { region: string } }) {
  // Fetch the locations for the region
  const locations = await getLocations_Region(params.region as 'NA' | 'NENA' | 'APAC' | 'UK')

  // Map the raw location data to the location props to be used in the component
  const locationsList = locations.map((location: any) => {
    return { name: location.name, href: `/list/${params.region}/${location.name}` }
  })

  return (
    <>
      <div>
        <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: true }]} />
        <div className="flex my-8 h-[80dvh] overflow-auto">
          <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
                <div className="sticky text-left top-0 z-10 bg-white dark:bg-zinc-900">
                  {headers.map((header) => (
                    <div key={header.toString()} className="sticky top-0 py-3.5 px-4 text-lg sm:px-1 ">
                      <div>{header}</div>
                    </div>
                  ))}
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 ">
                  <div className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
                    {locationsList.map((location: any) => (
                      <Link key={location.name} href={location.href} className=" hover:bg-slate-000">
                        <div className="flex items-center justify-end">
                          <div className="flex-none whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                            {location.name}
                          </div>
                          <div className="flex-auto" />
                          <ArrowRightIcon className="flex-none size-6 " />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div >
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
