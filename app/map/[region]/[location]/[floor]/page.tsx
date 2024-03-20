'use client'

import { F_1, F0, F3 } from '@/app/(map)/(EMEA)/(marshwall)/floorplans'
import WorldMap from '@/app/(map)/worldmap'

import { useState } from 'react'

export default function Page({ params }: { params: { floor: string } }) {
  const [open, setOpen] = useState(false)

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
  return (
    <>
    <div className="h-[85vh] py-4">{map_to_render}</div>
    </>
  )
}