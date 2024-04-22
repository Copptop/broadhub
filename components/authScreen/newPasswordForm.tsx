'use client'

import { useSearchParams } from 'next/navigation';
import React, { useRef, useState, useTransition } from 'react';

import { AtSymbolIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

import { SubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { NewPassword } from '@/lib/handlers/token';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function NewPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? `Email Already in Use - please login with via the means previously used` : ""

  const _email = useRef("")
  const _password = useRef("")
  const _passwordConf = useRef("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevents the page from reloading
    // Checks if the password and password confirmation match
    if (_password.current !== _passwordConf.current) { setError("Passwords do not match"); return }
    // Checks if the email and password fields are empty
    if (!_email.current || !_passwordConf.current) { setError("Please fill in all fields"); return }
    // Checks if the token is provided
    if (searchParams.get('token') === null) { setError("No Token Provided"); return }

    // Disables the fields while the form is being submitted
    startTransition(() => {
      // Calls the NewPassword function & handles the response
      NewPassword(searchParams.get('token') as string, _email.current, _passwordConf.current)
        .then((data) => {
          setError(data?.error),
            setSuccess(data?.success)
          if (!data.error && data.success) {
            setTimeout(() => {  // Redirects the user to the sign in page after 3.5 seconds
              setError(undefined);
              setSuccess(undefined);
              router.push('/auth/Signin');
            }, 3500);
          }
        })
    })
  }

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_email.current = e.target.value)} disabled={isPending} />
        <InputField name='password' placeholder='New Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_password.current = e.target.value)} disabled={isPending} />
        <InputField name='password' placeholder='New Password' type='password' icon={<FingerPrintIcon />} onChange={(e) => (_passwordConf.current = e.target.value)} disabled={isPending} />
        <SubmitButton type='submit'> Sign In </SubmitButton>
      </form>
      <Link className='text-right text-zinc-500 dark:text-zinc-400 mr-2.5' href={'/auth/reset-password'}>
        Forgotten you password ?
      </Link>

      {(error || urlError) && <p className='text-red-500 dark:text-red-400 py-4'>{error || urlError}</p>}
      {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}
    </>
  );
}