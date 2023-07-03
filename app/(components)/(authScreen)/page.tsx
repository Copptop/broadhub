'use client'

import './style.css'
import React, { useState } from 'react';
import Image from 'next/image';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils';
import Link from 'next/link';

interface SigninProps {
  csrfToken: string;
  providers: Record<string, { id: string; name: string; }>;
}


// Github Login 
async function handleGithubSignin() {
  signIn('github')
}

const toggleForm = () => {
  const container = document.querySelector('.container');
  container?.classList.toggle('active');

  const signInForm = document.querySelector('.signinBx form');
  const signUpForm = document.querySelector('.signupBx form');
  const signInEmail = signInForm?.querySelector(`input[type='email']`) as HTMLInputElement;
  const signInPassword = signInForm?.querySelector(`input[type='password']`) as HTMLInputElement;
  const signUpUsername = signUpForm?.querySelector(`input[type='text']`) as HTMLInputElement;
  const signUpEmail = signUpForm?.querySelector(`input[type='email']`) as HTMLInputElement;
  const signUpPassword = signUpForm?.querySelectorAll(`input[type='password']`)[0] as HTMLInputElement;
  const signUpConfirmPassword = signUpForm?.querySelectorAll(`input[type='password']`)[1] as HTMLInputElement;

  if (signInEmail && signInPassword) {
    signInEmail.value = '';
    signInPassword.value = '';
  }
  if (signUpUsername && signUpEmail && signUpPassword && signUpConfirmPassword) {
    signUpUsername.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpConfirmPassword.value = '';
  }
};

export default function SignIn({ csrfToken, providers }: SigninProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSignUpClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    toggleForm();
  };

  const handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  return (
    <div>
      <section>
        <div className='container'>
          <div className='user signinBx'>
            <div className='imgBx'>
              <Image src='/(authScreen)/signInPage.png' priority alt='SignIn' width={1000} height={1000} />
            </div>
            <div className='formBx'>
              <form action='' onSubmit={() => false}>
                <Image className='mb-5' src='/(branding)/(lightmode)/logo3Alt.svg' alt='BroadridgeHub' width={450} height={250} />
                <input type='email' name='' placeholder='Email Address' />
                <input type='password' name='' placeholder='Password' />
                <input className=' self-center' type='submit' name='' value='Sign In' />
                <p className='signup'>
                  Don&apos;t have an account?
                  <a href='#' onClick={handleSignUpClick}>Sign up.</a>
                </p>
                <p />
                <div className="relative mt-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                  </div>
                </div>
                <div className="input-button mt-5">
                  <button type='button' onClick={handleGithubSignin} className='w-full border py-3 flex justify-center gap-2 hover:bg-gray-200'>
                    Sign In with Github <Image src={'/(authScreen)/github.svg'} width={25} height={25} alt={''}></Image>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='user signupBx'>
            <div className='formBx'>
              <form action='' onSubmit={() => false}>
                <h2>Create an account</h2>
                <input type='text' name='' placeholder='Full Name' />
                <input type='email' name='' placeholder='Email Address' />
                <input type='password' name='' placeholder='Password' />
                <input type='password' name='' placeholder='Confirm Password' />
                <input type='submit' name='' value='Sign Up' />
                <p className='signup'>
                  Already have an account?
                  <a href='#' onClick={handleSignUpClick}>Sign in.</a>
                </p>
              </form>
            </div>
            <div className='imgBx'>
              <Image src='/(authScreen)/signUpPage.png' alt='SignUp' width={1000} height={1000} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}
