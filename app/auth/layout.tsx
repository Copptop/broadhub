import '../globals.css'
import { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <section className='
      bg-white dark:bg-zinc-800
      relative
      min-h-screen
      flex 
      justify-center 
      items-center 
      p-5
      '>
        <div className='
        absolute 
        rounded-2xl
        w-5/6
        h-5/6
        bg-white dark:bg-zinc-800 
        shadow-2xl 
        overflow-hidden 
        '>
          <div className='
          absolute 
          top-0 
          left-0 
          w-full 
          h-full 
          flex
          '>
            <div className='
            relative 
            flex 
            w-1/2 
            h-full 
            bg-white dark:bg-zinc-800 
            duration-1000
            
            max-lg:w-1/4
            max-sm:hidden
            '>
              <Image className='
              absolute 
              top-0
              left-0 
              w-full 
              h-full 
              object-cover

              '
                src='/(authScreen)/signInPage.png' priority alt='SignIn' width={1000} height={1000} />
            </div>
            <div className='
            relative 
            w-1/2 
            h-full
            bg-white dark:bg-zinc-800
            flex
            justify-center
            items-center
            duration-1000
            text-center

            max-lg:w-3/4
            max-sm:w-full
            '>
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}