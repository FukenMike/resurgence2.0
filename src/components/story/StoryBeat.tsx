import React from 'react';

type Emphasis = 'normal' | 'strong' | 'isolated';

interface StoryBeatProps {
  emphasis?: Emphasis;
  className?: string;
  children: React.ReactNode;
}

const emphasisClasses: Record<Emphasis, string> = {
  normal: 'text-lg leading-relaxed',
  strong: 'text-xl md:text-2xl leading-relaxed font-semibold text-steam-text',
  isolated: 'text-2xl md:text-3xl leading-relaxed font-heading text-amber-400',
};

export default function StoryBeat({ emphasis = 'normal', className = '', children }: StoryBeatProps) {
  return (
    <div className={`space-y-4 ${emphasisClasses[emphasis]} ${className}`}>
      {children}
    </div>
  );
}
