import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { SubmitButton } from '@/components/Buttons'
import Breadcrumb from '@/components/navigation/breadcrumbs'
import { List_Table } from '@/components/Tables'

const headers = ['Floors']

export default function Page({ params }: { params: { region: string, location: string } }) {
  const floors = [
    { name: 'Floor -1', href: `/list/${params.region}/${params.location}/floor-1` },
    { name: 'Floor 0', href: `/list/${params.region}/${params.location}/floor0` },
    { name: 'Floor 3', href: `/list/${params.region}/${params.location}/floor3` },
  ]
  return (
    <>
      <Breadcrumb pages={[{ name: 'Link', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: false }, { name: params.location, href: `/list/${params.region}/${params.location}`, current: true }]} />
      <List_Table headers={headers} data={floors} />
    </>
  )
}
