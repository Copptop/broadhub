'use client'

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useRef, useState, useTransition } from 'react';

import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

import { InvertedSubmitButton, SubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { SignInHandler, SignInWithProviderHandler } from '@/lib/handlers/signIn';
import Link from 'next/link';



export default function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? `Email Already in Use - please login with via the means previously used` : ""

  const _email = useRef("")
  const _password = useRef("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()      // Prevents the page from reloading
    startTransition(() => { // disables the fields while the form is being submitted
      // Calls the SignInHandler function
      SignInHandler({ email: _email.current, password: _password.current }, callbackUrl ?? undefined)
        .then((data) => {   //Handles the response from the SignInHandler function
          setError(data?.error)
          setSuccess(data?.success)
        })
    })
  }

  // Handle the provider sign in for Okta and Azure
  const onClick = (provider: 'okta' | 'azure') => {
    startTransition(() => {
      SignInWithProviderHandler(provider, callbackUrl ?? undefined)
    })
  }

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_email.current = e.target.value)} disabled={isPending} />
        <InputField name='password' placeholder='Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_password.current = e.target.value)} disabled={isPending} />
        <SubmitButton type='submit'> Sign In </SubmitButton>
      </form>
      <Link className='text-right text-zinc-500 dark:text-zinc-400 mr-2.5' href={'/auth/reset-password'}>
        Forgotten you password ?
      </Link>

      {(error || urlError) && <p className='text-red-500 dark:text-red-400 py-4'>{error || urlError}</p>}
      {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}

      <div className="relative mt-2 mb-2">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-zinc-300 dark:border-zinc-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-zinc-800 px-2 text-lg text-zinc-500 dark:text-zinc-300">OR</span>
        </div>
      </div>

      <InvertedSubmitButton onClick={() => onClick('okta')} >
        Sign In with Microsoft <Image blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mPcWvSjnoEIwDiqkL4KAdiTGjfujfEoAAAAAElFTkSuQmCC" placeholder="blur" src={'/(authScreen)/microsoft.svg'} width={100} height={100} alt={''} className='size-8'></Image>
      </InvertedSubmitButton>
    </>
  );
}