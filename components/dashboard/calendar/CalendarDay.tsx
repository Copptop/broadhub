

import React from 'react';
import { twMerge } from "tailwind-merge";
import { isToday, isSameMonth, format, isEqual, startOfToday } from 'date-fns';

interface CalendarDayProps {
  day: Date;
  currentMonth: Date;
  dayIndex: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, dayIndex, currentMonth }) => {
  return (
    <div key={day.toISOString()} className={twMerge(dayIndex > 6 && 'border-t border-zinc-200 dark:border-zinc-500', 'py-2')}>
      <button
        type="button"
        className={twMerge(
          'mx-auto flex h-8 w-8 items-center justify-center rounded-lg font-normal hover:bg-zinc-200 hover:text-zinc-900',
          isSameMonth(day, currentMonth) ? 'text-zinc-800 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-600 font-light',
          (isEqual(day.getDate(), startOfToday().getDate()) && isSameMonth(day, currentMonth)) ? 'text-blue-700 hover:text-blue-800' : '',
        )}
      >
        <time dateTime={day.toISOString()}>{format(day, 'd')}</time>
      </button>
    </div>
  );
}

export default CalendarDay;
