'use client'

import { AreaChartComp, DonutChartComp } from '@/components/graphing/Graph';
import { getDonutData, getGraphData } from '@/lib/database/stats';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, DateRangePicker, DateRangePickerItem, DateRangePickerValue, Select, SelectItem } from '@tremor/react';
import { addMonths, addWeeks } from 'date-fns';
import React, { useTransition } from 'react';

interface LocationProps {
  id: number,
  name: string,
  region: string,
}

interface DonutDataProps {
  name: string,
  value: number,
}

interface AreaDataProps {
  date: string,
  Office: number,
  MeetingRoom: number,
  Desk: number,
  Parking: number,
}

export default function DynamicStatistics({ locations }: { locations: LocationProps[] }) {
  const currentDate = new Date()
  const [selectorValue, setSelectorValue] = React.useState(locations[0].name);
  const [dateValue, setDateValue] = React.useState<DateRangePickerValue>({ from: addWeeks(currentDate, -1), to: currentDate })
  const [isPending, startTransition] = useTransition()
  const [areaData, setAreaData] = React.useState<AreaDataProps[]>([])
  const [donutData, setDonutData] = React.useState<DonutDataProps[]>([])

  async function handleDataFetch() {
    setAreaData(await getGraphData(selectorValue, dateValue.from || addMonths(currentDate, -1), dateValue.to || currentDate) as AreaDataProps[])
    setDonutData(await getDonutData(selectorValue, dateValue.from || addMonths(currentDate, -1), dateValue.to || currentDate) as DonutDataProps[])
  }

  return (
    <>
      <div className="my-5 text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">Booking History</div>
      <div className='shadow-lg bg-white dark:border-zinc-800 dark:bg-darkBgSecondary '>
        <div className='flex flex-wrap gap-5 sm:grid-cols-3 align-middle justify-center items-center p-4'>
          <div className='flex-none pt-[1px]'>
            <div className="max-w-xs">
              <div className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Select Office Location</div>
              <Select disabled={isPending} defaultValue={locations[0].name} className='mt-2' value={selectorValue} onValueChange={setSelectorValue} >
                {locations.map((location, index) => (
                  <SelectItem key={index} value={location.name}>{location.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className='flex-1'>
            <div className="max-w-md">
              <label className="text-tremor-default text-tremor-content dark:text-dark-tremor-content pb-[1px]">Select Date Range</label>
              <DateRangePicker disabled={isPending} className="mx-auto max-w-md mt-2" value={dateValue} onValueChange={setDateValue} selectPlaceholder="1 Week History" maxDate={currentDate} minDate={addMonths(currentDate, -3)}>
                <DateRangePickerItem key="1 month" value="Today" from={currentDate}>Today </DateRangePickerItem>
                <DateRangePickerItem key="1 month" value="1 Week History" from={addWeeks(currentDate, -1)}>1 Week History </DateRangePickerItem>
                <DateRangePickerItem key="1 month" value="1 Month History" from={addMonths(currentDate, -1)}>1 Month History </DateRangePickerItem>
                <DateRangePickerItem key="2 month" value="2 Month History" from={addMonths(currentDate, -2)}>2 Month History</DateRangePickerItem>
                <DateRangePickerItem key="3 month" value="3 Month History" from={addMonths(currentDate, -3)}>3 Month History</DateRangePickerItem>
              </DateRangePicker>
            </div>
          </div>
          <div className='flex-1'>
            <div className="max-w-xs">
              <Button loading={isPending} variant="primary" icon={MagnifyingGlassIcon} className='mt-[32px]' onClick={() => handleDataFetch()}>Search</Button>
            </div>
          </div>
        </div>
        {(areaData.length !== 0 && donutData.length !== 0) && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 ">
              <div className="overflow-hidden rounded-md col-span-2  px-4 py-5 sm:p-6">
                <div className='col-span-2 '>
                  {areaData.length !== 0 && <AreaChartComp title={'Bookings'} dataArea={areaData} />}
                </div>
              </div>
              <div className="overflow-hidden px-4 py-5 sm:p-6 ">
                <div>
                  {donutData.length !== 0 && <DonutChartComp title={'Make-up'} dataDonut={donutData} />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
