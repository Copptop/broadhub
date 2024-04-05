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



const times = ["07:00", "7:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function ListBox({ onChange, selectedTime1, selectedTime }: { onChange: (value: string) => void, selectedTime1?: string, selectedTime: string }) {
  const [selected, setSelected] = useState(selectedTime);

  useEffect(() => {
    setSelected(selectedTime);
  }, [selectedTime]); // Update selected state when selectedTime changes

  let filteredTimes = times;

  if (selectedTime1) {
    const [hour, minute] = selectedTime1.split(':');
    const normalizedHour = parseInt(hour, 10) % 24;
    const normalizedTime = `${normalizedHour.toString().padStart(2, '0')}:${minute}`;

    filteredTimes = times.filter(time => time > normalizedTime);
    filteredTimes = filteredTimes.slice(1, filteredTimes.length - 1);
  }

  return (
    <Listbox value={selected} onChange={(value: string) => onChange(value)}>
      {({ open }) => (
        <>
          <div className="relative pl-2 pr-2 py-1.5 z-30">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-800 py-1.5 pl-3 pr-10 text-left text-zinc-700 dark:text-zinc-300 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredTimes.map((time) => (
                  <Listbox.Option
                    key={time}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blue-600 text-white' : 'text-zinc-700 dark:text-zinc-300',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={time}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {time}
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

InputField.displayName = 'Input';
