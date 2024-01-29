import { ScheduleItem } from '@/components/dashboard/schedule/ScheduleItem'
import { Menu, Transition } from '@headlessui/react';
import { CalendarIcon, EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { format, startOfToday } from 'date-fns';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface schedule {
  id: number;
  resource: string;
  resourceType: string;
  resourceLocation: string;
  href: string;
  startDateTime: string;
  endDateTime: string;
}

interface ScheduleSectionProps {
  schedules: schedule[];
}

const ScheduleSection = ({ schedules }: ScheduleSectionProps) => {

  return (
    <>
      <h2 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
        Schedule for {format(startOfToday(), 'dd MMMM, yyy')}
      </h2>
      <ol className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-500 text-sm leading-6 lg:col-span-7 xl:col-span-8">
        {schedules?.map((schedule) => (
          <ScheduleItem
            key={schedule.id} {...schedule}
          />
        ))}
      </ol>
    </>
  );
};

export default ScheduleSection;
