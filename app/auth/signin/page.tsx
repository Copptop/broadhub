import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import SignInForm from '@/components/authScreen/signInForm';
import { VerticalLogo } from '@/components/logo';


const SignInPage = () => {

  return (
    <>
      <div className='overflow-y-auto h-[80vh] w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5'>
          <VerticalLogo className='self-center w-2/3 h-auto' />
          <SignInForm />
          <p className='text-center text-zinc-500 dark:text-zinc-300'>
            Don&apos;t have an account yet? <Link href={'/auth/signup'} className='text-Primary dark:text-Secondary'>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
