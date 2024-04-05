'use client'

import { AreaChart, DonutChart, Legend } from '@tremor/react';


const sales = [
  {
    name: 'New York',
    sales: 980,
  },
  {
    name: 'London',
    sales: 456,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 240,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
];

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

interface ChartProps {
  title: String
  dataArea?: AreaDataProps[]
  dataDonut?: DonutDataProps[]
}

export function AreaChartComp(props: ChartProps) {
  return (
    <>
      <div className="text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">{props.title}</div>
      <AreaChart
        className="mt-4 h-72"
        data={props.dataArea as AreaDataProps[]}
        index="date"
        yAxisWidth={100}
        categories={['Office', 'Meeting Room', 'Desk', 'Parking']}
        colors={['cyan', 'blue', 'violet', 'fuchsia']}
      />
    </>
  );
}

export function DonutChartComp(props: ChartProps) {
  return (
    <>
      <div className="text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">{props.title}</div>
      <div className='relative align-middle flex justify-center items-center mt-10'>
        <div className="flex items-center justify-center align-middle content-center relative space-x-6">
          <DonutChart
            data={props.dataDonut as DonutDataProps[]}
            category="count"
            variant="pie"
            index="name"
            colors={['cyan', 'blue', 'violet', 'fuchsia']}
            className="w-40"
          />
        </div>
      </div>
      <div className='pt-6 mx-auto items-center'>
        <Legend
          categories={['Office', 'Meeting Room', 'Desk', 'Parking']}
          colors={['cyan', 'blue', 'violet', 'fuchsia']}
          className="justify-center"
        />
      </div>
    </>
  );
}