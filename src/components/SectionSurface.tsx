import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionSurfaceProps {
  variant?: 'default' | 'muted' | 'accent' | 'inverse';
  className?: string;
  children: ReactNode;
}

export default function SectionSurface({
  variant = 'default',
  className,
  children,
}: SectionSurfaceProps) {
  const baseClasses = 'rounded-2xl transition-shadow duration-200';
  
  const variantClasses = {
    default: 'surface-default',
    muted: 'surface-muted',
    accent: 'surface-accent',
    inverse: 'surface-inverse',
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}
