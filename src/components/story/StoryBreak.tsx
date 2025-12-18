import React from 'react';

interface StoryBreakProps {
  className?: string;
}

export default function StoryBreak({ className = '' }: StoryBreakProps) {
  return (
    <div className={`my-12 h-px bg-linear-to-r from-steam-copper/0 via-steam-copper to-steam-copper/0 ${className}`} />
  );
}
