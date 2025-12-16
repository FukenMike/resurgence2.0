import React from 'react';

interface WitnessFragmentProps {
  quote: string;
  context?: string;
  tone?: 'neutral' | 'pain' | 'anger' | 'resolve';
}

export default function WitnessFragment({ quote, context, tone = 'neutral' }: WitnessFragmentProps) {
  const toneStyles = {
    neutral: 'border-steam-muted',
    pain: 'border-steam-muted',
    anger: 'border-steam-muted',
    resolve: 'border-steam-copper',
  };

  return (
    <div className={`border-l-2 ${toneStyles[tone]} pl-4 py-2`}>
      <p className="text-steam-muted italic text-sm leading-relaxed">
        "{quote}"
      </p>
      {context && (
        <p className="text-xs text-steam-copper mt-2">
          — {context}
        </p>
      )}
    </div>
  );
}
