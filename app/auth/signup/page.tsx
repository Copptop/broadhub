import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import SignUpForm from '@/components/authScreen/signUpForm';

const SignUpPage = () => {

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <div className='w-3/4 mx-auto flex flex-col gap-5 overflow-clip'>
        <h2 className='text-5xl font-semibold text-center text-compGreyText pb-5'>Sign Up</h2>
        <SignUpForm />

        {/* bottom */}
        <p className='text-center text-slate-500 dark:text-slate-300'>
          Already have an account? <Link href={'/auth/signin'} className='text-compDMKDarkBlue dark:text-compDKMDarkBlue'>Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default SignUpPage;
