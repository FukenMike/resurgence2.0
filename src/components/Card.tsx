import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function Card({ title, eyebrow, children, actions, className }: CardProps) {
  return (
    <div
      className={clsx(
        'card-surface p-6 md:p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">{eyebrow}</p>}
      {title && <h3 className="mt-2 text-xl font-semibold text-ink">{title}</h3>}
      <div className="mt-3 text-base text-muted">{children}</div>
      {actions && <div className="mt-5 flex items-center gap-3">{actions}</div>}
    </div>
  );
}
