import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean'
  const variants = {
    primary: 'bg-ocean text-white hover:bg-ocean/90 shadow-sm',
    secondary: 'bg-surface-muted text-ink hover:bg-surface-muted/80 border border-border-soft',
    ghost: 'text-ocean hover:bg-surface-muted',
  }

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
