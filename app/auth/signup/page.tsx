import Link from 'next/link';

import SignUpForm from '@/components/authScreen/signUpForm';

const SignUpPage = () => {

  return (
    <>
      <div className='overflow-y-auto h-[80dvh] w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5'>
          <h2 className='text-5xl font-semibold text-center text-zinc-700 dark:text-zinc-300 pb-5'>Sign Up</h2>
          <SignUpForm />
          <p className='text-center text-zinc-500 dark:text-zinc-300'>
            Already have an account? <Link href={'/auth/signin'} className='text-Primary dark:text-Secondary'>Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
