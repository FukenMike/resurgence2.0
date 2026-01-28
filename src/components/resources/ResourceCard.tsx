import React from 'react';
import type { ResourceLink } from '../../lib/resourceLinks';
import { VerificationBadge } from './VerificationBadge';
import type { VerificationStatus } from '../../lib/types';

interface ResourceCardProps {
  resource: ResourceLink;
}

/**
 * Compact resource card for directory listings
 * Shows key information and links to external resource
 */
export function ResourceCard({ resource }: ResourceCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Legal Services': 'bg-sand text-ocean',
      'Housing Assistance': 'bg-sand text-forest',
      'Mental Health': 'bg-surface-muted text-ink',
      'Employment Services': 'bg-sand text-ocean',
      'Food & Basic Needs': 'bg-sand text-danger',
      'Healthcare': 'bg-surface-muted text-forest',
      'Transportation': 'bg-sand text-ink',
      'Child Support': 'bg-surface-muted text-ocean',
      'Education & Training': 'bg-sand text-ink',
      'Emergency Services': 'bg-sand text-danger',
    };
    return colors[category] || 'bg-surface-muted text-muted';
  };

  // Map resource verification to VerificationStatus type
  const getVerificationStatus = (verification: string | null): VerificationStatus => {
    if (verification === 'verified') return 'verified';
    if (verification === 'stale') return 'stale';
    return 'unverified';
  };

  return (
    <div className="bg-surface border border-border-soft rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-ink flex-1">
          {resource.title || 'Untitled Resource'}
        </h3>
        <VerificationBadge
          status={getVerificationStatus(resource.verification)}
          lastVerified={resource.last_verified_at || undefined}
          compact
        />
      </div>

      {/* Organization Name */}
      <p className="text-sm text-muted mb-2 font-medium">
        {resource.org_name}
      </p>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(resource.category || 'Unknown')}`}>
          {resource.category || 'Unknown'}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-muted mb-3 flex-1 line-clamp-3">
        {resource.summary || 'No description available'}
      </p>

      {/* Coverage and Website Button */}
      <div className="flex items-center justify-between pt-3 border-t border-border-soft">
        <span className="text-xs text-muted font-medium">
          {resource.coverage}
        </span>
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1 bg-ocean text-white rounded hover:bg-ocean/90 transition-colors"
          >
            Visit
          </a>
        ) : (
          <span className="text-xs text-muted font-medium opacity-60">No website</span>
        )}
      </div>
    </div>
  );
}
