'use client'

import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import {
  AtSymbolIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline'


const SignInForm = () => {

  return (
    <>
      <Head>
        <title>Sign In Form</title>
      </Head>

      <form className='flex flex-col gap-5'>
        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type="email"
            name='email'
            placeholder='Email'
            className='w-full py-4 px-6 border rounded-xl bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 px-4 max-sm:hidden'>
            <AtSymbolIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>

        </div>

        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full py-4 px-6 border rounded-xl bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 px-4 max-sm:hidden'>
            <FingerPrintIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>

        </div>

        {/* login buttons */}
        <div className="input-button">
          <button type='submit' className='
            w-full
            rounded-md
            py-3
            text-lg
            font-semibold
            
            border
            border-compDarkBlue
            hover:border-compLightBlue
            dark:border-compDKMDarkBlue
            dark:hover:border-compDKMLightBlue
      
            bg-gradient-to-r
            from-compLightBlue
            to-compDarkBlue
            hover:bg-gradient-to-r
            hover:from-white
            hover:to-white
      
            dark:bg-gradient-to-r
            dark:from-compDKMLightBlue
            dark:to-compDKMDarkBlue
            dark:hover:bg-gradient-to-r
            dark:hover:from-compDKMLightBlue
            dark:hover:to-compDKMDarkBlue
      
            
            text-gray-50
            dark:text-slate-200
            hover:text-compDMKGreyText
            dark:hover:text-slate-300
            '>
            Login
          </button>
        </div>
        <div className="relative mt-2 mb-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300 dark:border-slate-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 dark:bg-slate-800 px-2 text-lg text-gray-500 dark:text-slate-300">OR</span>
          </div>
        </div>
        <div className="input-button">
          <button type='button' className='
            w-full
            py-3
            flex
            justify-center
            gap-2
            text-lg
            font-semibold
            rounded-md
            pr-1
            
            border
            border-compLightBlue
            hover:border-compDarkBlue
            dark:border-compDKMLightBlue
            dark:hover:border-compDKMDarkBlue

            hover:bg-gradient-to-r
            hover:from-compLightBlue
            hover:to-compDarkBlue

            dark:hover:bg-gradient-to-r
            dark:hover:from-compDKMLightBlue
            dark:hover:to-compDKMDarkBlue

            text-compGreyText
            hover:text-gray-50
            dark:text-slate-300
            dark:hover:text-slate-100   

            '>
            Sign In with Microsoft <Image src={'/(authScreen)/microsoft.svg'} width={25} height={25} alt={''}></Image>
          </button>
        </div>
      </form>
    </>
  );
}

export default SignInForm;