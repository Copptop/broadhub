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

const floors = [
  {
    title: 'Floor -1',
    href: 'floor-1',
  },
  {
    title: 'Floor 0',
    href: 'floor0',
  },
  {
    title: 'Floor 3',
    href: 'floor3',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Page({ params }: { params: { region: string, location: string } }) {
  return (
    <>
      <div className="flex justify-center p-10 space-x-8">
        {floors!.map((floor) => (
          <Link key={floor.title} href={`/map/${params.region}/${params.location}/${floor.href}`}>
            <SubmitButton className='w-auto p-5' >
              {floor.title}
            </SubmitButton>
          </Link>
        ))}
      </div>
    </>
  )
}
