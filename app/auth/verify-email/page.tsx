'use client'
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Loading from '@/app/loading';
import { VerifyEmail } from '@/lib/handlers/token';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const EmailVerficationPage = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // Verify the email
  const onClick = useCallback(() => {
    if (success || error) return
    if (!token) {
      setError("No Token Provided");
      return
    }

    // Verify the email using the token provided in the URL
    VerifyEmail(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch((e) => {
        setError("An error occurred");
      });

    // Redirect to the sign in page after 3 seconds
    if (success) {
      setTimeout(() => {
        window.location.href = '/auth/signin'
      }, 3000)
    }
  }, [token, success, error])

  // Call the onClick function when the component mounts
  useEffect(() => {
    onClick()
  }, [onClick])

  return (
    <>
      <div className='overflow-y-auto w-full py-3'>
        <div className='w-full mx-auto flex flex-col gap-5 items-center py-3'>
          <EnvelopeIcon className='size-12 text-zinc-700 dark:text-zinc-300' />
          <div className='text-3xl font-semibold text-center text-zinc-700 dark:text-zinc-300 justify-center pb-5'>Verifying Your Email</div>
          {!error && !success && <Loading />}
          {error && <p className='text-red-500 dark:text-red-400 py-4 '>{error}</p>}
          {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default EmailVerficationPage
