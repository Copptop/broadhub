import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onThisMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, onPreviousMonth, onThisMonth, onNextMonth }) => {
  return (
    <div className="flex items-center text-s text-gray-800 font-semibold">
      <h2 className="flex-auto">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <button
        type="button"
        onClick={onPreviousMonth}
        className="-my-1.5 flex flex-none items-center justify-center p-1.5 'text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onThisMonth}
        className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:text-gray-500 focus:relative md:block"
      >
        Now
      </button>
      <button
        type="button"
        onClick={onNextMonth}
        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-900 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default CalendarHeader;
