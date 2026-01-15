import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionSurfaceProps {
  variant?: 'default' | 'muted' | 'accent' | 'inverse';
  edge?: 'none' | 'left' | 'top';
  edgeTone?: 'accent' | 'neutral';
  className?: string;
  children: ReactNode;
}

export default function SectionSurface({
  variant = 'default',
  edge = 'none',
  edgeTone = 'accent',
  className,
  children,
}: SectionSurfaceProps) {
  const baseClasses = 'rounded-2xl';
  
  const variantClasses = {
    default: 'surface-default',
    muted: 'surface-muted',
    accent: 'surface-accent',
    inverse: 'surface-inverse',
  };

  const edgeClasses = {
    none: '',
    left: `surface-edge surface-edge-${edge} surface-edge-${edgeTone}`,
    top: `surface-edge surface-edge-${edge} surface-edge-${edgeTone}`,
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], edgeClasses[edge], className)}>
      {children}
    </div>
  );
}
