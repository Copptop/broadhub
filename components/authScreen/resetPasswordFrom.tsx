'use client'

import React, { useRef, useState, useTransition } from 'react';

import { AtSymbolIcon } from '@heroicons/react/24/outline';

import { SubmitButton } from '@/components/Buttons';
import { InputField } from '@/components/InputFields';
import { ResetPasswordHandler } from '@/lib/handlers/resetPassword';



export default function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const _email = useRef("")

  // Handle the form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(() => {
      if (!_email.current) return setError("Please fill in all fields")
      // Calls the ResetPasswordHandler function & handles the response
      ResetPasswordHandler(_email.current)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    })
  }

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <InputField name='email' placeholder='Email' type='email' icon={<AtSymbolIcon />} onChange={(e) => (_email.current = e.target.value)} disabled={isPending} />
        <SubmitButton type='submit'> Send Reset Email </SubmitButton>
      </form>
      {(error) && <p className='text-red-500 dark:text-red-400 py-4'>{error}</p>}
      {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}
    </>
  );
}