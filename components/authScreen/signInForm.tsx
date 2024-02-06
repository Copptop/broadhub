'use client'

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

import { SubmitButton, InvertedSubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';

const SignInForm = () => {

  return (
    <>
      <Head>
        <title>Sign In Form</title>
      </Head>

      <form className='flex flex-col gap-5'>
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} />
        <InputField name='password' placeholder='Password' type='password' icon={<FingerPrintIcon />} />

        <SubmitButton type='submit'>
          Sign In
        </SubmitButton>

        <div className="relative mt-2 mb-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-300 dark:border-zinc-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-50 dark:bg-zinc-800 px-2 text-lg text-zinc-500 dark:text-zinc-300">OR</span>
          </div>
        </div>

        <InvertedSubmitButton type='submit'>
          Sign In with Microsoft <Image src={'/(authScreen)/microsoft.svg'} width={25} height={25} alt={''}></Image>
        </InvertedSubmitButton>
      </form>
    </>
  );
}

export default SignInForm;