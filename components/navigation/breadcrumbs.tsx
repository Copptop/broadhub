

import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface BreadcrumbElement {
  name: string;
  href: string;
  current: boolean;
}

interface BreadcrumbProps {
  pages: BreadcrumbElement[];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Breadcrumb({ pages }: BreadcrumbProps) {

  return (
    <>
      <nav className="flex border-b border-zinc-200 dark:border-none bg-white dark:bg-zinc-800 shadow-sm dark:shadow-md">
        <ol role="list" className="mr-auto flex w-full mar-w-screen-xl space-r-4 px-4 sm:pr-6 lg:pr-8 font-semibold text-zinc-700 dark:text-zinc-300">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/" className="hover:text-zinc-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-zinc-200 dark:text-zinc-600"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Link
                  href={page.href}
                  className="ml-4 text-sm font-medium hover:text-zinc-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}