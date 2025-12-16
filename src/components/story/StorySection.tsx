import React from 'react';

type Variant = 'default' | 'dark' | 'panel' | 'spotlight';

interface StorySectionProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-steam-bg text-steam-text',
  dark: 'bg-neutral-900 text-steam-text',
  panel: 'bg-steam-metal text-steam-text border border-steam-copper rounded-xl',
  spotlight: 'bg-steam-bg text-steam-text',
};

export default function StorySection({ variant = 'default', className = '', children }: StorySectionProps) {
  return (
    <section className={`px-6 md:px-0 py-12 max-w-4xl mx-auto ${variantClasses[variant]} ${className}`}>
      {children}
    </section>
  );
}
