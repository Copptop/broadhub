import Link from 'next/link'
import { SubmitButton } from '@/components/Buttons'
import { currentRole } from '@/lib/hooks/server/use-current-user'
import { redirect } from 'next/navigation'

export default async function Page() {
  // Ensure correct user role for access
  const role = await currentRole()
  if (role !== 'HR' && role !== 'ADMIN' && role !== 'MANAGER') {

    redirect('/')
  }
  return (
    <>
      <div className="flex justify-center p-10 space-x-8">
        {(role == 'ADMIN' || role == 'HR') && (
          <Link href={`/management/bookings`}>
            <SubmitButton className='w-auto p-5' >
              Bookings
            </SubmitButton>
          </Link>
        )}
        {(role == 'ADMIN' || role == 'HR' || role == 'MANAGER') && (
          <Link href={`/management/users`}>
            <SubmitButton className='w-auto p-5' >
              Bookings
            </SubmitButton>
          </Link>
        )}
      </div>
    </>
  )
}
