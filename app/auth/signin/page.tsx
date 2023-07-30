import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import SignInForm from '@/components/authScreen/signInForm';
import { VerticalLogo } from '@/components/logo';


const SignInPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className='w-3/4 mx-auto flex flex-col gap-5'>
        <VerticalLogo className='self-center w-2/3 h-auto' />
        <SignInForm />

        {/* bottom */}
        <p className='text-center text-gray-500 dark:text-zinc-300'>
          Don&apos;t have an account yet? <Link href={'/auth/signup'} className='text-Primary dark:text-Secondary'>Sign Up</Link>
        </p>
      </div>
    </>
  );
};

export default SignInPage;
