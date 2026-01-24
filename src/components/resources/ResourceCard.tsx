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
      'Legal Services': 'bg-blue-100 text-blue-700',
      'Housing Assistance': 'bg-green-100 text-green-700',
      'Mental Health': 'bg-purple-100 text-purple-700',
      'Employment Services': 'bg-orange-100 text-orange-700',
      'Food & Basic Needs': 'bg-red-100 text-red-700',
      'Healthcare': 'bg-pink-100 text-pink-700',
      'Transportation': 'bg-yellow-100 text-yellow-700',
      'Child Support': 'bg-cyan-100 text-cyan-700',
      'Education & Training': 'bg-indigo-100 text-indigo-700',
      'Emergency Services': 'bg-gray-100 text-gray-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Map resource verification to VerificationStatus type
  const getVerificationStatus = (verification: string | null): VerificationStatus => {
    if (verification === 'verified') return 'verified';
    if (verification === 'stale') return 'stale';
    return 'unverified';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {resource.title || 'Untitled Resource'}
        </h3>
        <VerificationBadge
          status={getVerificationStatus(resource.verification)}
          lastVerified={resource.last_verified_at || undefined}
          compact
        />
      </div>

      {/* Organization Name */}
      <p className="text-sm text-gray-600 mb-2 font-medium">
        {resource.org_name}
      </p>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(resource.category || 'Unknown')}`}>
          {resource.category || 'Unknown'}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">
        {resource.summary || 'No description available'}
      </p>

      {/* Coverage and Website Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500 font-medium">
          {resource.coverage}
        </span>
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Visit
          </a>
        ) : (
          <span className="text-xs text-gray-400 font-medium">No website</span>
        )}
      </div>
    </div>
  );
}
