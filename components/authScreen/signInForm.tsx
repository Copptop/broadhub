'use client'

import React, { useRef, useTransition, useState } from 'react';
import Image from 'next/image';

import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

import { SubmitButton, InvertedSubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { SignInHandler, SignInWithProviderHandler } from '@/lib/actions/signInHandler';

import { signIn } from "next-auth/react";
import { DefaultRedirectRoute } from '@/routes';

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

  const onClick = (provider: 'github' | 'okta') => {
    startTransition(() => {
      signIn(provider, { callbackUrl: DefaultRedirectRoute })
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
      <div className="relative mt-2 mb-2">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-zinc-300 dark:border-zinc-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-zinc-50 dark:bg-zinc-800 px-2 text-lg text-zinc-500 dark:text-zinc-300">OR</span>
        </div>
      </div>
      <InvertedSubmitButton onClick={() => onClick('github')} >
        Sign In with Microsoft <Image src={'/(authScreen)/microsoft.svg'} width={25} height={25} alt={''}></Image>
      </InvertedSubmitButton>
    </>
  );
}