import Link from 'next/link';

import NewPasswordForm from '@/components/authScreen/newPasswordForm';
import { VerticalLogo } from '@/components/logo';

export default async function SignInPage() {

  return (
    <>
      <div className='overflow-y-auto w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5'>
          <VerticalLogo className='self-center w-2/3 h-auto' />
          <div className='flex flex-col gap-5'>
            <NewPasswordForm />
          </div>
          <p className='text-center text-zinc-500 dark:text-zinc-300'>
            Don&apos;t have an account yet? <Link href={'/auth/signup'} className='text-Primary dark:text-Secondary'>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};