'use client'

import CalendarDay from '@/components/dashboard/calendar/CalendarDay';
import CalendarHeader from '@/components/dashboard/calendar/CalendarHeader';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, parse, startOfToday, startOfWeek } from 'date-fns';
import React, { useState } from 'react';

// CalendarSection component - renders the calendar section
const CalendarSection: React.FC = () => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(today);

  // Get the first day of the current month
  const firstDayCurrentMonth = parse(format(new Date(currentMonth), 'MMM-yyyy'), 'MMM-yyyy', new Date());

  // Get the days of the current month
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  // Functions to navigate the calendar
  // Previous month
  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(firstDayNextMonth);
  };

  // This month
  const thisMonth = () => {
    setCurrentMonth(today);
  };

  // Next month
  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(firstDayNextMonth);
  };

  return (
    <>
      <div className="md:pr-14">
        <div className='px-5 '>
          <CalendarHeader
            currentMonth={currentMonth}
            onPreviousMonth={previousMonth}
            onThisMonth={thisMonth}
            onNextMonth={nextMonth}
          />
        </div>
        <div className="mt-7 grid grid-cols-7 text-center  leading-6 text-s font-semibold text-zinc-700 dark:text-zinc-300">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <CalendarDay key={day.toISOString()} day={day} dayIndex={dayIdx} currentMonth={currentMonth} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CalendarSection;
