import { Dropdown } from '@/components/Dropdowns'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out' }
]

interface TopBarProps {
  topbarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopBar = ({ topbarOpen, setSidebarOpen }: TopBarProps) => {

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 dark:border-none bg-white dark:bg-zinc-800 pl-4 shadow-sm dark:shadow-md sm:gap-x-6 sm:pl-6 lg:pl-8 pr-6">
      <button
        type="button"
        className="text-zinc-500 rounded-md hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 lg:hidden"
        onClick={() => setSidebarOpen(!topbarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="text-1xl font-bold text-center">
        **** EMAIL FUNCTION CURRENTLY NOT WORKING ON DEPLOYED VERSION - See report for proof of function ***
      </div>

      <div className="flex-1 flex justify-end pl-4 sm:pl-6 lg:pl-8">
        <Dropdown userNavigation={userNavigation} className='relative'>
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full bg-zinc-50"
            src="C:\REPOS\broadhub\components\branding\logo.svg"
            alt=""
            width={32}
            height={32}

          />
          <span className="hidden lg:flex lg:items-center">
            <span className="ml-4 text-sm font-semibold leading-6 text-zinc-800 dark:text-zinc-300" aria-hidden="true">
              Tom Cook
            </span>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300" aria-hidden="true" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
