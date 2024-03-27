import React, { Fragment, ReactNode, forwardRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { DefaultRedirectRoute } from '@/routes';

interface DropdownOption {
  name: string;
  href?: string;
  onClick?: () => void;
}

export interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { userNavigation: DropdownOption[] }

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(({
  className,
  children,
  userNavigation,
}, ref) => {

  const onClick = (provider: "okta" | "azure") => {
    signIn(provider, {
      callbackUrl: DefaultRedirectRoute
    })
  };
  return (
    <>
      <Menu as="div" className={twMerge(className)}>
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          {children}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-zinc-700 py-1 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none">

            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  !item.href || item.name === 'Sign out' ? (
                    <button
                      onClick={() => (onClick('okta'))}
                      className={twMerge(
                        active ? 'bg-zinc-100 dark:bg-zinc-700' : '',
                        'block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-md'
                      )}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={twMerge(
                        active ? 'bg-zinc-100 dark:bg-zinc-700' : '',
                        'block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-md'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
});


Dropdown.displayName = "Dropdown";