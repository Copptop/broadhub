import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ErrorPage = () => {

  return (
    <>
      <div className='overflow-y-auto w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5 items-center py-3'>
          <ShieldExclamationIcon className='size-20 text-yellow-500 items-center' />
          <div className='text-3xl font-semibold text-center text-zinc-700 dark:text-zinc-300 justify-center '>Looks like something went wrong</div>
        </div>
        <p className='text-center text-xl text-zinc-500 dark:text-zinc-300'>
          Return to <Link href={'/auth/signin'} className='text-Primary dark:text-Secondary'>Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default ErrorPage
