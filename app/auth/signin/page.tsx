import Link from 'next/link';
import Image from 'next/image';

import SignInForm from '@/components/authScreen/signInForm';
import { VerticalLogo } from '@/components/logo';
import { InvertedSubmitButton } from '@/components/Buttons';

export default async function SignInPage() {
  return (
    <>
      <div className='overflow-y-auto w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5'>
          <VerticalLogo className='self-center w-2/3 h-auto' />
          <div className='flex flex-col gap-5'>
            <SignInForm />

            <div className="relative mt-2 mb-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-300 dark:border-zinc-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-zinc-50 dark:bg-zinc-800 px-2 text-lg text-zinc-500 dark:text-zinc-300">OR</span>
              </div>
            </div>

            <form
            >
              <InvertedSubmitButton>
                Sign In with Microsoft <Image src={'/(authScreen)/microsoft.svg'} width={25} height={25} alt={''}></Image>
              </InvertedSubmitButton>
            </form>
          </div>

          <p className='text-center text-zinc-500 dark:text-zinc-300'>
            Don&apos;t have an account yet? <Link href={'/auth/signup'} className='text-Primary dark:text-Secondary'>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};