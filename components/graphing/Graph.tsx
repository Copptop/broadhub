'use client'

import { AreaChart } from '@tremor/react';
import { DonutChart, Legend } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'Jul 22',
    SemiAnalysis: 3490,
    'The Pragmatic Engineer': 1982,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2903,
    'The Pragmatic Engineer': 2012,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2643,
    'The Pragmatic Engineer': 2342,
  },
  {
    date: 'Oct 22',
    SemiAnalysis: 2837,
    'The Pragmatic Engineer': 2473,
  },
  {
    date: 'Nov 22',
    SemiAnalysis: 2954,
    'The Pragmatic Engineer': 3848,
  },
  {
    date: 'Dec 22',
    SemiAnalysis: 3239,
    'The Pragmatic Engineer': 3736,
  },
];

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

const valueFormatter = function (number: any) {
  return '$ ' + new Intl.NumberFormat('uk').format(number).toString();
};

interface ChartProps {
  title: String
}

export function AreaChartComp(props: ChartProps) {
  return (
    <>
      <div className="text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">{props.title}</div>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={['SemiAnalysis', 'The Pragmatic Engineer']}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
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
            data={sales}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
            className="w-40"
          />
        </div>
      </div>
      <div className='pt-6 mx-auto'>
        <Legend
          categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="justify-center"
        />
      </div>
    </>
  );
}