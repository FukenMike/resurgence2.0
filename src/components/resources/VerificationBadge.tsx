import React from 'react';
import type { VerificationStatus } from '../../data/resources.seed';

interface VerificationBadgeProps {
  status: VerificationStatus;
  lastVerified: string;
  compact?: boolean;
}

/**
 * Displays verification status badge with last verified date
 * Shows Verified (green), Stale (yellow), or Unverified (gray)
 */
export function VerificationBadge({ status, lastVerified, compact = false }: VerificationBadgeProps) {
  const verifiedDate = new Date(lastVerified);
  const now = new Date();
  const daysSinceVerification = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          label: 'Verified',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '✓',
        };
      case 'stale':
        return {
          label: 'Verification Stale',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: '⚠',
        };
      case 'unverified':
        return {
          label: 'Unverified',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          icon: '?',
        };
    }
  };

  const config = getStatusConfig();

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.textColor}`}
        title={`Last verified: ${verifiedDate.toLocaleDateString()}`}
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
        Last verified: {verifiedDate.toLocaleDateString()}
        {status === 'stale' && ` (${daysSinceVerification} days ago)`}
      </div>
    </div>
  );
}
