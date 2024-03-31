'use client'

import { PlusIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState, useTransition } from 'react';

import { SubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { SignUpHandler } from '@/lib/handlers/signUp';
import { AtSymbolIcon, FingerPrintIcon, MinusIcon, UserIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';


export default function SignUpForm() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const _name = useRef("")
  const _email = useRef("")
  const _emailConfirm = useRef("")
  const _password = useRef("")
  const _passwordConfirm = useRef("")
  const _companyCode = useRef("")

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      SignUpHandler({ name: _name.current, email: _email.current, emailConfirm: _emailConfirm.current, password: _password.current, passwordConfirm: _passwordConfirm.current, companyCode: _companyCode.current })
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (!data.error && data.success) {
            _name.current = '';
            _email.current = '';
            _emailConfirm.current = '';
            _password.current = '';
            _passwordConfirm.current = '';
            _companyCode.current = '';

            setTimeout(() => {
              setError(undefined);
              setSuccess(undefined);
              router.push('/auth/Signin');
            }, 3500);
          }
        });
    });
  }
  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <InputField className='outline-0' name='fullname' placeholder='Full Name' type='text' icon={<UserIcon />} onChange={(e) => (_name.current = e.target.value)} disabled={isPending} />
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_email.current = e.target.value)} disabled={isPending} />
        <InputField name='emailConfirm' placeholder='Confirm Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_emailConfirm.current = e.target.value)} disabled={isPending} />
        <InputField name='password' placeholder='Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_password.current = e.target.value)} disabled={isPending} />
        <InputField name='passwordConfirm' placeholder='Confirm Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_passwordConfirm.current = e.target.value)} disabled={isPending} />

        <div className="relative">
          <div className="relative flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-full bg-zinc-50 dark:bg-zinc-600 px-3 py-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-600"
              onClick={(event) => {
                event.preventDefault();
                toggleCollapse();
              }}
            >
              {isCollapsed ? (
                <>
                  <PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
                  <span>Company Code</span>
                </>
              ) : (
                <>
                  <MinusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
                  <span>Company Code</span>
                </>
              )}
            </button>
          </div>
          <div className={`transition-all duration-700 ease-in-out ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
            <br />
            <InputField name='companyCode' placeholder='Company Code' type='text' onChange={(e) => (_companyCode.current = e.target.value)} disabled={isPending} />
          </div>
        </div>

        <SubmitButton type='submit'>
          Sign Up
        </SubmitButton>
        {error && <p className='text-red-500 dark:text-red-400 py-4'>{error}</p>}
        {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}
      </form>
    </>
  );
};

