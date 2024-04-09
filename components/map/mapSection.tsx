'use client'

import { F0, F3, F_1 } from '@/app/(map)/(EMEA)/(marshwall)/floorplans';
import WorldMap from '@/app/(map)/worldmap';

import { ArrowRightIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button, DatePicker, DatePickerValue, Select, SelectItem } from '@tremor/react';
import { addHours, addMinutes, addMonths, isAfter, isBefore, isWithinInterval } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import { SubmitButton } from "@/components/Buttons";

const times = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

interface dataProps {
  id: string,
  startDateTime: Date,
  endDateTime: Date,
  resource: string,
  resourceType: string,
  location: string,
}

interface favsProps {
  id: string,
  resource: string,
  resourceType: string,
  location: string
}

function formattedDateTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const newDateTime = new Date(date!.toISOString());
  newDateTime.setHours(hours, minutes, 0, 0);
  const formattedDateTime = newDateTime.toISOString();
  return formattedDateTime;
}

interface restictedProps {
  name: string
}

export default function MapSection({ data, favs, params, restrictedResources }: { data: Array<dataProps>, favs: Array<favsProps>, params: { floor: string, location: string, region: string }, restrictedResources: Array<restictedProps> }) {
  const currentTime = new Date().toTimeString()
  let [hours, minutes] = currentTime.split(':').map(Number);
  if (minutes < 30) minutes = 30;
  else { hours += 1; minutes = 0; }

  const initStartTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  hours = hours + 1;
  const initEndTime = () => {
    const newTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    if (newTime > "18:00") return newTime;
    return "18:00";
  }
  const [selectedDate, setSelectedDate] = useState<DatePickerValue>(new Date());
  const [selectorValue1, setSelectorValue1] = useState(initStartTime);
  const [selectorValue2, setSelectorValue2] = useState(initEndTime);
  const [isPending, startTransition] = useTransition()
  const [mapToRender, setMapToRender] = useState<JSX.Element | null>(null);

  const [_data, setData] = useState(data.filter((item) => {
    const startDateTime = item.startDateTime;
    const endDateTime = item.endDateTime;
    const selectedStartTime = new Date();
    const selectedEndTime = new Date();
    return (
      // start if before range but end is in range 
      (!isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
      // end if after range but start is in range 
      (isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && !isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
      // start and end both in range
      (isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
      // start and end both out of range but covers the range
      (isBefore(startDateTime, selectedStartTime) && isAfter(endDateTime, addMinutes(selectedEndTime, -1)))!!!)
  }));

  const [_favs, setFavs] = useState(favs);

  useEffect(() => {
    let newMapToRender = null;
    if (params.floor === 'floor-1') {
      newMapToRender = <F_1 data={_data} favs={_favs} params={params} date={selectedDate || new Date()} from={selectorValue1 || ""} to={selectorValue2 || ""} restrictedResources={restrictedResources} />;
    } else if (params.floor === 'floor0') {
      newMapToRender = <F0 data={_data} favs={_favs} params={params} date={selectedDate || new Date()} from={selectorValue1 || ""} to={selectorValue2 || ""} restrictedResources={restrictedResources} />;
    } else if (params.floor === 'floor3') {
      newMapToRender = <F3 data={_data} favs={_favs} params={params} date={selectedDate || new Date()} from={selectorValue1 || ""} to={selectorValue2 || ""} restrictedResources={restrictedResources} />;
    } else {
      newMapToRender = <WorldMap />;
    }
    setMapToRender(newMapToRender);
  }, [params.floor, _data, _favs, params, selectedDate, selectorValue1, selectorValue2, restrictedResources]);


  function onclick() {
    if (!selectedDate) {
      alert("Please ensure a date is selected ");
      return;
    }
    const pos1 = times.indexOf(selectorValue1);
    const pos2 = times.indexOf(selectorValue2);
    if (pos1 >= pos2) {
      alert("Please ensure the start time is before the end time of the selected time");
      return;
    }

    const dateTime1 = formattedDateTime(selectedDate, times[pos1]);
    const dateTime2 = formattedDateTime(selectedDate, times[pos2]);

    if (dateTime1 < new Date().toISOString() || dateTime2 < new Date().toISOString()) {
      alert("Please ensure the selected time is in the future");
      return;
    }


    startTransition(() => {
      setData(data.filter((item) => {
        const startDateTime = item.startDateTime;
        const endDateTime = item.endDateTime;
        const selectedStartTime = new Date(dateTime1);
        const selectedEndTime = new Date(dateTime2);

        return (
          // start if before range but end is in range 
          (!isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
          // end if after range but start is in range 
          (isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && !isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
          // start and end both in range
          (isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) }) && isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) })!!!) ||
          // start and end both out of range but covers the range
          (isBefore(startDateTime, selectedStartTime) && isAfter(endDateTime, addMinutes(selectedEndTime, -1)))!!!)
      }))
    })
  }

  return (
    <>
      <div className="h-[85dvh] overflow-y-auto w-full">
        <div className="border-b border-zinc-200 dark:border-none bg-white dark:bg-zinc-800 shadow-sm dark:shadow-md py-3 ">
          <div className="flex flex-wrap mr-auto w-full mar-w-screen-xl space-r-4 px-4 sm:pr-6 lg:pr-8 font-semibold text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center self-center space-r-4">
              <DatePicker className="w-full z-20 " minDate={new Date()} maxDate={addMonths(new Date(), 3)} defaultValue={new Date()} value={selectedDate} onValueChange={setSelectedDate} />
            </div>

            <div className="flex items-center self-center space-r-4 ml-4">
              <ClockIcon className="size-6 flex-none" />
              <Select id="distance" name="distance" value={selectorValue1} onValueChange={setSelectorValue1} className="pl-3 z-20 " >
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </Select>
              <div className="pl-3"><ArrowRightIcon className="size-5 flex self-center" /></div>
              <Select id="distance" name="distance" value={selectorValue2} onValueChange={setSelectorValue2} className="pl-3 z-20 ">
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="px-3 w-1/6 " >
              <Button loading={isPending} variant="primary" icon={MagnifyingGlassIcon} onClick={() => onclick()}> Search </Button>
            </div>
          </div>
        </div>
        <div className="h-[80vh] py-4">{mapToRender}</div>
      </div>
    </>
  );
}
