import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Resource } from '../../lib/types';
import { validateResourceListItem } from '../../lib/resourceGuards';
import { VerificationBadge } from './VerificationBadge';

interface ResourceCardProps {
  resource: Resource;
}

/**
 * Compact resource card for directory listings
 * Shows key information and links to detail page
 */
export function ResourceCard({ resource }: ResourceCardProps) {
  const [outcomeSummary, setOutcomeSummary] = useState<{ total: number; positive: number } | null>(null);

  useEffect(() => {
    // Load outcome summary from localStorage
    const stored = localStorage.getItem(`resource-outcomes-${resource.id}`);
    if (stored) {
      try {
        const outcomes = JSON.parse(stored);
        const total = Object.values(outcomes).reduce((sum: number, count) => sum + (count as number), 0);
        const positive = (outcomes.helped || 0) + (outcomes.partial || 0);
        setOutcomeSummary({ total, positive });
      } catch (e) {
        console.error('Failed to parse outcomes', e);
      }
    }
  }, [resource.id]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Legal Services': 'bg-blue-100 text-blue-800',
      'Housing Assistance': 'bg-purple-100 text-purple-800',
      'Mental Health': 'bg-green-100 text-green-800',
      'Employment Services': 'bg-orange-100 text-orange-800',
      'Food & Basic Needs': 'bg-yellow-100 text-yellow-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Transportation': 'bg-indigo-100 text-indigo-800',
      'Child Support': 'bg-pink-100 text-pink-800',
      'Education & Training': 'bg-teal-100 text-teal-800',
      'Emergency Services': 'bg-rose-100 text-rose-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Get service area display
  const getServiceAreaDisplay = (): string => {
    if (!resource.service_areas || resource.service_areas.length === 0) {
      return 'Coverage area not specified';
    }

    const sa = resource.service_areas[0];
    if (sa.coverage === 'national') {
      return 'National Coverage';
    }
    if (sa.city_name) {
      return `${sa.city_name}${sa.state_code ? ', ' + sa.state_code : ''}`;
    }
    if (sa.state_code) {
      return sa.state_code;
    }
    if (sa.zip) {
      return `ZIP: ${sa.zip}`;
    }
    return 'Coverage area';
  };

  const validation = import.meta.env.DEV ? validateResourceListItem(resource) : { ok: true, issues: [] };
  if (import.meta.env.DEV && !validation.ok) {
    console.warn('[ResourceCard] invalid resource list item', { issues: validation.issues, resource });
  }

  const linkTarget = resource.slug || resource.id;
  console.debug('[ResourceCard] link target', { id: resource.id, slug: resource.slug, target: linkTarget });

  // If no valid link target, warn and fallback to directory
  if (!linkTarget) {
    console.warn('[ResourceCard] Resource has no slug or id', resource);
    return (
      <div className="block bg-white border border-red-300 rounded-lg p-5 opacity-75">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            {resource.title || 'Untitled Resource'}
          </h3>
          <VerificationBadge
            status={resource.verification}
            lastVerified={resource.last_verified_at}
            compact
          />
        </div>
        <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
          <p className="text-xs text-red-600">⚠️ Invalid resource data (missing ID)</p>
          {import.meta.env.DEV && (
            <span className="inline-block mt-1 text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded">
              Missing link target
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(resource.category || 'Unknown')}`}>
            {resource.category || 'Unknown'}
          </span>
          {resource.cost === 'free' && (
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              Free
            </span>
          )}
        </div>
        <p className="text-gray-700 mb-3 line-clamp-2">{resource.summary || 'Details available on open'}</p>
      </div>
    );
  }

  return (
    <Link
      to={`/resources/directory/${linkTarget}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-gray-300 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {resource.title || 'Untitled Resource'}
        </h3>
        <VerificationBadge
          status={resource.verification}
          lastVerified={resource.last_verified_at}
          compact
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(resource.category || 'Unknown')}`}>
          {resource.category || 'Unknown'}
        </span>
        {resource.cost === 'free' && (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            Free
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-3 line-clamp-2">{resource.summary || 'Details available on open'}</p>

      {/* Organization name if available */}
      {resource.organization?.name ? (
        <div className="mb-2 text-sm text-gray-600">
          <span className="font-medium">By: {resource.organization.name}</span>
        </div>
      ) : (
        <div className="mb-2 text-sm text-gray-500 italic">
          <span>Organization not listed</span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
        <div>
          <span className="font-medium">{getServiceAreaDisplay()}</span>
        </div>
        {outcomeSummary && outcomeSummary.total > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-green-600">✓ {outcomeSummary.positive}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{outcomeSummary.total} reports</span>
          </div>
        )}
      </div>
    </Link>
  );
}
