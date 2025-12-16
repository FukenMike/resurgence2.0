import React from 'react';

type Variant = 'document' | 'stat' | 'screenshot' | 'quote';

interface StoryEvidenceProps {
  title?: string;
  source?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantIcons: Record<Variant, string> = {
  document: '📄',
  stat: '📊',
  screenshot: '📸',
  quote: '💬',
};

export default function StoryEvidence({
  title,
  source,
  variant = 'document',
  className = '',
  children,
}: StoryEvidenceProps) {
  return (
    <aside className={`p-6 md:p-8 bg-steam-metal border-l-4 border-steam-copper rounded-lg my-8 ${className}`}>
      <div className="flex items-start gap-4">
        <span className="text-3xl">{variantIcons[variant]}</span>
        <div className="flex-1">
          {title && <h4 className="text-lg font-heading font-semibold text-steam-copper mb-2">{title}</h4>}
          <div className="text-steam-text space-y-2">{children}</div>
          {source && <p className="text-sm text-steam-muted italic mt-3">Source: {source}</p>}
        </div>
      </div>
    </aside>
  );
}
