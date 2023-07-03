import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type,
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        `
        w-full
        rounded-lg
        py-3
        text-lg
        font-semibold
        
        border
        border-compDarkBlue
        hover:border-compLightBlue
        dark:border-compDKMDarkBlue
        dark:hover:border-compDKMLightBlue
  
        bg-gradient-to-r
        from-compLightBlue
        to-compDarkBlue
        hover:bg-gradient-to-r
        hover:from-white
        hover:to-white
  
        dark:bg-gradient-to-r
        dark:from-compDKMLightBlue
        dark:to-compDKMDarkBlue
        dark:hover:bg-gradient-to-r
        dark:hover:from-zinc-800
        dark:hover:to-zincfrom-zinc-800
  
        
        text-gray-50
        dark:text-zinc-200
        hover:text-compGreyText
        dark:hover:text-zinc-300
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

SubmitButton.displayName = "Button";

export const InvertedSubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type,
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        `
        w-full
        py-3
        flex
        justify-center
        gap-2
        text-lg
        font-semibold
        rounded-md
        pr-1
        
        border
        border-compLightBlue
        hover:border-compDarkBlue
        dark:border-compDKMLightBlue
        dark:hover:border-compDKMDarkBlue

        hover:bg-gradient-to-r
        hover:from-compLightBlue
        hover:to-compDarkBlue

        dark:hover:bg-gradient-to-r
        dark:hover:from-compDKMLightBlue
        dark:hover:to-compDKMDarkBlue

        text-compGreyText
        hover:text-gray-50
        dark:text-zinc-300
        dark:hover:text-zinc-100
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

InvertedSubmitButton.displayName = "Button";