import { ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Props for the SectionSurface component.
 *
 * @property {string} [variant='default'] - Visual style variant:
 *   - 'default': Subtle gradient wash (best for informational sections)
 *   - 'muted': Slightly stronger wash (good for secondary groups of content)
 *   - 'accent': Light sky-blue wash (use sparingly; max 1 per page)
 *   - 'inverse': Dark background (only for anchor CTA or closing sections)
 *
 * @property {string} [edge='none'] - Optional accent edge:
 *   - 'none': No edge accent
 *   - 'left': Left border accent (use for primary feature groups)
 *   - 'top': Top border accent (use for header-like sections)
 *   Max 1 edge per page to avoid visual clutter.
 *
 * @property {string} [edgeTone='accent'] - Edge color tone:
 *   - 'accent': Sky-blue (draws attention)
 *   - 'neutral': Slate (subtle hierarchy)
 *
 * @property {string} [className] - Optional additional Tailwind classes
 * @property {ReactNode} children - Section content to wrap
 */
interface SectionSurfaceProps {
  variant?: 'default' | 'muted' | 'accent' | 'inverse';
  edge?: 'none' | 'left' | 'top';
  edgeTone?: 'accent' | 'neutral';
  className?: string;
  children: ReactNode;
}

/**
 * SectionSurface component - adds background panel styling to page sections.
 */
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
