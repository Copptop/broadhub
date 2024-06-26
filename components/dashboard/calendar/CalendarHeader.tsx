import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';
import React from 'react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onThisMonth: () => void;
  onNextMonth: () => void;
}

// CalendarHeader component - renders the header of the calendar
const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, onPreviousMonth, onThisMonth, onNextMonth }) => {
  return (
    <div className="flex items-center text-s font-semibold text-zinc-700 dark:text-zinc-300">
      <h2 className="flex-auto">
        {format(new Date(currentMonth), 'MMMM yyyy')}
      </h2>
      <button
        type="button"
        onClick={onPreviousMonth}
        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onThisMonth}
        className="hidden px-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 focus:relative md:block"
      >
        Now
      </button>
      <button
        type="button"
        onClick={onNextMonth}
        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default CalendarHeader;
