'use client'

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface ThemeButtonProps {
  children?: React.ReactNode;
}

const ThemeButton = ({ }: ThemeButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className='fixed bottom-4 right-4'>
        <button aria-label='Toggle Dark Mode' type='button' className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-700' onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
          {resolvedTheme === 'dark' ? (
            <SunIcon className='h-5 w-5 text-white' />
          ) : (
            <MoonIcon className='h-5 w-5 text-zinc-800' />
          )}
        </button>
      </div>
    </>
  );

}

export default ThemeButton;