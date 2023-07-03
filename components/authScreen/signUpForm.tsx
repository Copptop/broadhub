'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { PlusIcon } from '@heroicons/react/20/solid';

import { SubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { AtSymbolIcon, FingerPrintIcon, UserIcon } from '@heroicons/react/24/outline';

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

        <InputField className='outline-0' name='fullname' placeholder='Full Name' type='text' icon={<UserIcon />} />
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} />
        <InputField name='emailConfirm' placeholder='Confirm Email' type='email' icon={<AtSymbolIcon />} />
        <InputField name='password' placeholder='Password' type='password' icon={<FingerPrintIcon />} />
        <InputField name='passwordConfirm' placeholder='Confirm Password' type='password' icon={<FingerPrintIcon />} />

        {/* collapsible field */}
        <div className="relative">
          <div className="relative flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-full bg-zinc-50 dark:bg-zinc-600 px-3 py-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-600"
              onClick={(event) => { event.preventDefault(); toggleCollapse(); }}
            >
              <PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
              Company Code
            </button>
          </div>
          <div className={`transition-all duration-1000 ease-in-out ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
            <br />
            <InputField name='companyCode' placeholder='Company Code' type='text' />
          </div>
        </div>

        <SubmitButton type='submit'>
          Sign Up
        </SubmitButton>
      </form>
    </>
  );
};

export default SignUpForm;
