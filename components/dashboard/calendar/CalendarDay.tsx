import React from 'react';
import { twMerge } from "tailwind-merge";
import { isToday, isSameMonth, format, isEqual, startOfToday, startOfYear } from 'date-fns';

interface CalendarDayProps {
  day: Date;
  dayIndex: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, dayIndex }) => {
  return (
    <div key={day.toISOString()} className={twMerge(dayIndex > 6 && 'border-t border-gray-200', 'py-2')}>
      <button
        type="button"
        className={twMerge(
          'mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-purple-50',
          isSameMonth(day, startOfToday()) ? 'font-gray-800 hover:bg-blue-100' : 'font-normal text-gray-400',
          (isEqual(day, startOfToday()) && isToday(day)) && 'font-semibold text-bg-compDarkBlue hover:bg-compLightBlue',
        )}
      >
        <time dateTime={day.toISOString()}>{format(day, 'd')}</time>
      </button>
    </div>
  );
}


export default CalendarDay;
