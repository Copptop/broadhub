'use client'

import { F0, F3, F_1 } from '@/app/(map)/(EMEA)/(marshwall)/floorplans'
import WorldMap from '@/app/(map)/worldmap'
import DateTimeSelection from '@/components/map/dateTimeSelection'
import Breadcrumb from '@/components/navigation/breadcrumbs'

import { useState } from 'react'

export default function Page({ params }: { params: { floor: string, location: string, region: string } }) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [selectedTime1, setSelectedTime1] = useState("07:00");
  const [selectedTime2, setSelectedTime2] = useState("19:00");

  var map_to_render = null

  if (params.floor === 'floor-1') {
    map_to_render = <F_1 />
  } else if (params.floor === 'floor0') {
    map_to_render = <F0 />
  } else if (params.floor === 'floor3') {
    map_to_render = <F3 />
  }
  else {
    map_to_render = <WorldMap />
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    updateDataArray(event.target.value, selectedTime1, selectedTime2);
  };

  const handleTime1Change = (value: string) => {
    setSelectedTime1(value);
    updateDataArray(selectedDate, value, selectedTime2);
  };

  const handleTime2Change = (value: string) => {
    setSelectedTime2(value);
    updateDataArray(selectedDate, selectedTime1, value);
  };

  const updateDataArray = (date: string, time1: string, time2: string) => {
    const newData = [{ date, time1, time2 }];
  };

  return (
    <>
      <Breadcrumb pages={[{ name: 'Map', href: '/map', current: false }, { name: params.region, href: `/map/${params.region}`, current: false }, { name: params.location, href: `/map/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/map/EMEA/marshwall/${params.floor}`, current: true }]} />
      <DateTimeSelection onDateChange={handleDateChange} onTime1Change={handleTime1Change} onTime2Change={handleTime2Change} selectedTime1={selectedTime1} selectedTime2={selectedTime2} />
      <div className="h-[85vh] py-4">{map_to_render}</div >
    </>
  )
}