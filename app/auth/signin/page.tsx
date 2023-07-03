import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import SignInForm from '@/components/authScreen/signInForm';

const SignInPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className='w-3/4 mx-auto flex flex-col gap-5'>
        <Image className='mb-5 self-center' src='/(branding)/(lightmode)/logo3Alt.svg' alt='BroadridgeHub' width={450} height={450} />
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
