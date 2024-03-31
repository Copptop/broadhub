

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  name: string;
  href: string;
  icon?: React.ReactNode;// Update the type for 'icon' prop to accept JSX elements
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  href,
  icon,
}) => {
  const currentPath = usePathname();
  const current = currentPath === href;
  return (
    <>
      <li key={name}>
        <Link
          href={href}
          className={twMerge(
            current
              ? 'bg-blue-700 text-zinc-200'
              : 'text-zinc-200 hover:text-zinc-100 hover:bg-zinc-700',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}
        >
          {icon && (
            <span className={twMerge(
              current ? 'text-zinc-200' : 'text-zinc-200 group-hover:text-zinc-100',
              'h-6 w-6 shrink-0'
            )} aria-hidden="true">
              {icon}
            </span>
          )}
          {name}
        </Link>
      </li>
    </>
  );
}

interface AdminSidebarItem {
  name: string;
  href: string;
  initial: string;
}

export const AdminSidebarItem: React.FC<AdminSidebarItem> = ({
  name,
  href,
  initial
}) => {
  const currentPath = usePathname();
  const current = currentPath === href;
  return (
    <>
      <li key={name}>
        <Link
          href={href}
          className={twMerge(
            current
              ? 'bg-blue-700 text-zinc-200'
              : 'text-zinc-200 hover:text-zinc-100 hover:bg-zinc-700',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}
        >
          <span className={twMerge(
            current ? 'text-zinc-200' : 'text-zinc-200 group-hover:text-zinc-100',
            'flex h-6 w-6 shrink-0 items-center justify-center justify-middle rounded-lg  bg-blue-800 text-md font-semibold')}>
            {initial}
          </span>
          <span className="truncate">{name}</span>
        </Link>
      </li>
    </>
  );
}
