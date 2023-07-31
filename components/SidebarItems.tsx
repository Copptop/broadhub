import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

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
              ? 'bg-Primary text-zinc-200'
              : 'text-zinc-200 hover:text-zinc-100 hover:bg-Primary',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}
        >
          {/* Conditionally render the icon */}
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
              ? 'bg-Primary text-zinc-200'
              : 'text-zinc-200 hover:text-zinc-100 hover:bg-Primary',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}
        >
          <span className={twMerge(
            current ? 'text-zinc-200' : 'text-zinc-200 group-hover:text-zinc-100',
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-zinc-300 bg-Primary text-md font-medium')}>
            {initial}
          </span>
          <span className="truncate">{name}</span>
        </Link>
      </li>
    </>
  );
}