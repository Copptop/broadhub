'use client'

import '@/app/globals.css'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment, Ref, forwardRef, useEffect, useState } from 'react'

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  className = '',
  children,
  disabled,
  type,
  name,
  placeholder,
  icon,
  ...props
}, ref: Ref<HTMLInputElement>) => {

  return (
    <div className={`flex border rounded-xl relative  bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-600 focus-within:ring-0  ${className}`}>
      {icon && (
        <span className='icon flex items-center rounded-xl bg-zinc-50 dark:bg-zinc-600 px-4 max-sm:hidden'>
          {React.cloneElement(icon as React.ReactElement, {
            className: 'ml-2 h-5 w-5 text-zinc-400 dark:text-zinc-800',
            'aria-hidden': 'true',
          })}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}

        className={`       
          w-full
          py-4
          px-6
          border
          rounded-xl
          placeholder-italic
          bg-zinc-50
          placeholder-zinc-400
          text-zinc-700
          dark:bg-zinc-600
          dark:text-zinc-300
          dark:placeholder-zinc-400
          border-none
          outline-none
          focus:ring-0 
          
          `}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    </div>
  );
});

InputField.displayName = 'Input';

