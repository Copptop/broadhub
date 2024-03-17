'use client'
import { F_1 } from '@/app/(map)/(EMEA)/(marshwall)/floorplans'
import { useState } from 'react'


export default function Page() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <F_1 />
    </>
  )
}