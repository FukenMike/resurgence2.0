import React from 'react';

interface QuietChoiceProps {
  statement: string;
  subtext?: string;
}

export default function QuietChoice({ statement, subtext }: QuietChoiceProps) {
  return (
    <div className="text-center mt-12">
      <p className="text-steam-muted text-2xl md:text-3xl font-heading">
        {statement}
      </p>
      {subtext && (
        <p className="text-steam-muted text-sm md:text-base mt-3">
          {subtext}
        </p>
      )}
    </div>
  );
}
