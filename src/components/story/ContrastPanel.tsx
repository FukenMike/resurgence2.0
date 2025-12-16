import React from 'react';

interface ContrastPanelProps {
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export default function ContrastPanel({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  className = '',
}: ContrastPanelProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="grid md:grid-cols-2 gap-0 md:gap-6 bg-steam-metal rounded-lg overflow-hidden border border-steam-brass">
        {/* Left Side: System Claims (Institutional) */}
        <div className="p-6 md:p-8 bg-steam-bg md:border-r md:border-steam-brass/30">
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-steam-muted">
            {leftTitle}
          </h3>
          <div className="space-y-3 text-steam-muted/80">
            {leftContent}
          </div>
        </div>

        {/* Right Side: Lived Reality (Human) */}
        <div className="p-6 md:p-8 bg-steam-panel border-t md:border-t-0 border-steam-copper/30">
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-steam-copper">
            {rightTitle}
          </h3>
          <div className="space-y-3 text-steam-text">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
}
