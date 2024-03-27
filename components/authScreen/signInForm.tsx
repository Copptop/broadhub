'use client'

import React, { useRef, useTransition, useState } from 'react';
import Image from 'next/image';

import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

import { SubmitButton, InvertedSubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { SignInHandler } from '@/lib/actions/signInHandler';
import { set } from 'date-fns';


export default function SignInForm() {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const _email = useRef("")
  const _password = useRef("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(() => {
      SignInHandler({ email: _email.current, password: _password.current })
        .then((data) => {
          setError(data?.error)
        })
    })
  }

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_email.current = e.target.value)} disabled={isPending} />
        <InputField name='password' placeholder='Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_password.current = e.target.value)} disabled={isPending} />
        <SubmitButton type='submit'> Sign In </SubmitButton>
        {error && <p className='text-red-500 dark:text-red-400'>{error}</p>}
      </form>
    </>
  );
}