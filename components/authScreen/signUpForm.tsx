'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { PlusIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';


const SignUpForm = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Head>
        <title>Sign Up Form</title>
      </Head>

      <form className='flex flex-col gap-5'>
        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type="text"
            name='fullname'
            placeholder='Full Name'
            className='w-full py-4 px-6 border border-slate-500 rounded-xl bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
        </div>

        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type="email"
            name='email'
            placeholder='Email'
            className='w-full py-4 px-6 border rounded-xl placeholder:italic bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 px-4 max-sm:hidden'>
            <AtSymbolIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>
        </div>

        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type="email"
            name='emailConfirm'
            placeholder='Confirm Email'
            className='w-full py-4 px-6 border rounded-xl placeholder:italic bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 px-4 max-sm:hidden'>
            <AtSymbolIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>
        </div>

        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full py-4 px-6 border rounded-xl placeholder:italic bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 px-4 max-sm:hidden'>
            <FingerPrintIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>          </div>

        <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
          <input
            type='password'
            name='passwordConfirm'
            placeholder='Confirm Password'
            className='w-full py-4 px-6 border rounded-xl placeholder:italic bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
          />
          <span className='icon flex items-center rounded-xl bg-slate-50 dark:bg-slate-500 px-4 max-sm:hidden'>
            <FingerPrintIcon className="ml-2 h-5 w-5 text-gray-400 dark:text-slate-800" aria-hidden="true" />
          </span>
        </div>

        {/* collapsible field */}
        <div className="relative">
          <div className="relative flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-full bg-slate-50 dark:bg-slate-500 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-800 hover:bg-gray-50 dark:hover:bg-slate-600"
              onClick={(event) => { event.preventDefault(); toggleCollapse(); }}
            >
              <PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-compGreyText dark:text-compDKMGreyText" aria-hidden="true" />
              Company Code
            </button>
          </div>
          <div className={`transition-all duration-1000 ease-in-out ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
            <br />
            <div className='flex border rounded-xl relative dark:border-slate-800 dark:bg-slate-500'>
              <input
                type="text"
                name='companyCode'
                placeholder='Company Code'
                className='w-full py-4 px-6 border rounded-xl placeholder:italic bg-slate-50 dark:bg-slate-500 dark:text-slate-300 dark:placeholder-slate-300 border-none outline-none '
              />
            </div>
          </div>
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
