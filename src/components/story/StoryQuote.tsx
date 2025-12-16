import React from 'react';

interface StoryQuoteProps {
  className?: string;
  children: React.ReactNode;
}

export default function StoryQuote({ className = '', children }: StoryQuoteProps) {
  return (
    <blockquote className={`relative p-6 md:p-8 bg-steam-metal border border-steam-brass rounded-xl shadow-lg text-amber-400 drop-shadow-[0_0_8px_#f59e0b] ${className}`}>
      <span className="absolute -top-3 -left-3 text-steam-copper text-4xl">“</span>
      <div className="text-xl md:text-2xl font-heading">{children}</div>
      <span className="absolute -bottom-3 -right-3 text-steam-copper text-4xl">”</span>
    </blockquote>
  );
}
