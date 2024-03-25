import React from 'react';
import { AreaChartComp, DonutChartComp } from '@/components/graphing/Graph';
import { SelectInput, DateRangePickerComp } from '@/components/InputFields';

const stats = [
  { name: 'Total Bookings', stat: '135' },
  { name: 'Booking Compared to Last Month', stat: '78.4%' },
  { name: 'Total Avalibility', stat: '44.57%' },
]

export default function Page() {
  return (
    <>
      <div className="px-6 py-4 overflow-auto">
        <div className="">
          <h3 className="text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">Last 30 days</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.name} className="overflow-hidden rounded-md shadow-lg bg-white dark:border-zinc-800 dark:bg-darkBgSecondary px-4 py-5 sm:p-6">
                <dt className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-600 dark:text-zinc-400">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
        <>
          <div className="my-5 text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">Booking History</div>
          <div className='shadow-lg bg-white dark:border-zinc-800 dark:bg-darkBgSecondary '>
            <div className='flex flex-wrap gap-5 sm:grid-cols-3 align-middle justify-center items-center p-4'>
              <div className='flex-none'><SelectInput /></div>
              <div className='flex-1'><DateRangePickerComp /></div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 ">
              <div className="overflow-hidden rounded-md col-span-2  px-4 py-5 sm:p-6">
                <div className='col-span-2 '><AreaChartComp title={'Bookings'} /></div>
              </div>
              <div className="overflow-hidden px-4 py-5 sm:p-6 ">
                <div>
                  <DonutChartComp title={'Make-up'} />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
