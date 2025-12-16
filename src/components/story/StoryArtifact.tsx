import React, { useState } from 'react';

interface StoryArtifactProps {
  title?: string;
  description?: string;
  source?: string;
  className?: string;
  children: React.ReactNode;
}

export default function StoryArtifact({
  title,
  description,
  source,
  className = '',
  children,
}: StoryArtifactProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`my-8 ${className}`}>
      {/* Mobile Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full p-4 bg-steam-metal border border-steam-brass rounded-t-lg text-left hover:bg-steam-panel transition-opacity"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {title && <h4 className="text-lg font-heading font-semibold text-steam-copper">{title}</h4>}
            {description && <p className="text-sm text-steam-muted mt-1">{description}</p>}
          </div>
          <span className="text-steam-copper text-xl ml-4">{isExpanded ? '−' : '+'}</span>
        </div>
      </button>

      {/* Desktop Header (always visible) */}
      <div className="hidden lg:block p-4 bg-steam-metal border-t border-x border-steam-brass rounded-t-lg">
        {title && <h4 className="text-lg font-heading font-semibold text-steam-copper">{title}</h4>}
        {description && <p className="text-sm text-steam-muted mt-1">{description}</p>}
      </div>

      {/* Artifact Content Container */}
      <div
        className={`
          border border-steam-copper bg-steam-bg rounded-b-lg overflow-hidden
          transition-opacity hover:shadow-lg hover:shadow-steam-copper/20
          ${isExpanded ? 'block' : 'hidden'} lg:block
        `}
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
        {source && (
          <div className="px-4 pb-4">
            <p className="text-xs text-steam-muted italic border-t border-steam-brass/30 pt-2">
              Source: {source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
