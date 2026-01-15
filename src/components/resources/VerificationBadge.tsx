import React from 'react';
import type { VerificationStatus } from '../../lib/types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  lastVerified?: string;
  compact?: boolean;
}

/**
 * Displays verification status badge with last verified date
 * Shows Verified (green), Stale (yellow), or Unverified (gray)
 */
export function VerificationBadge({ status, lastVerified, compact = false }: VerificationBadgeProps) {
  const verifiedDate = lastVerified ? new Date(lastVerified) : null;
  const now = new Date();
  const daysSinceVerification = verifiedDate
    ? Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          label: 'Verified',
          bgColor: 'bg-sand',
          textColor: 'text-forest',
          icon: '✓',
        };
      case 'stale':
        return {
          label: 'Verification Stale',
          bgColor: 'bg-sand',
          textColor: 'text-muted',
          icon: '⚠',
        };
      case 'unverified':
        return {
          label: 'Unverified',
          bgColor: 'bg-surface-muted',
          textColor: 'text-muted',
          icon: '?',
        };
    }
  };

  const config = getStatusConfig();

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.textColor}`}
        title={verifiedDate ? `Last verified: ${verifiedDate.toLocaleDateString()}` : 'Verification status unknown'}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 px-3 py-2 rounded-lg ${config.bgColor}`}>
      <div className={`flex items-center gap-2 font-semibold ${config.textColor}`}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </div>
      <div className={`text-xs ${config.textColor} opacity-80`}>
        {verifiedDate ? (
          <>
            Last verified: {verifiedDate.toLocaleDateString()}
            {status === 'stale' && ` (${daysSinceVerification} days ago)`}
          </>
        ) : (
          'Verification date unknown'
        )}
      </div>
    </div>
  );
}
