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
      'Legal Services': 'bg-sand text-ocean',
      'Housing Assistance': 'bg-sand text-forest',
      'Mental Health': 'bg-sand text-forest',
      'Employment Services': 'bg-sand text-ocean',
      'Food & Basic Needs': 'bg-sand text-muted',
      'Healthcare': 'bg-sand text-muted',
      'Transportation': 'bg-sand text-ocean',
      'Child Support': 'bg-sand text-forest',
      'Education & Training': 'bg-sand text-forest',
      'Emergency Services': 'bg-sand text-muted',
    };
    return colors[category] || 'bg-surface-muted text-muted';
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
      <div className="block bg-surface border border-border-soft rounded-lg p-5 opacity-75">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-semibold text-ink">
            {resource.title || 'Untitled Resource'}
          </h3>
          <VerificationBadge
            status={resource.verification}
            lastVerified={resource.last_verified_at}
            compact
          />
        </div>
        <div className="bg-danger-bg border border-danger-border rounded p-2 mb-3">
          <p className="text-xs text-danger">⚠️ Invalid resource data (missing ID)</p>
          {import.meta.env.DEV && (
            <span className="inline-block mt-1 text-[11px] text-danger bg-danger-bg px-2 py-0.5 rounded">
              Missing link target
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(resource.category || 'Unknown')}`}>
            {resource.category || 'Unknown'}
          </span>
          {resource.cost === 'free' && (
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-sand text-forest border border-ocean">
              Free
            </span>
          )}
        </div>
        <p className="text-muted mb-3 line-clamp-2">{resource.summary || 'Details available on open'}</p>
      </div>
    );
  }

  return (
    <Link
      to={`/resources/directory/${linkTarget}`}
      className="block bg-surface border border-border-soft rounded-lg p-5 hover:shadow-lg hover:border-ocean transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-ink hover:text-ocean transition-colors">
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
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-sand text-forest border border-ocean">
            Free
          </span>
        )}
      </div>

      <p className="text-muted mb-3 line-clamp-2">{resource.summary || 'Details available on open'}</p>

      {/* Organization name if available */}
      {resource.organization?.name ? (
        <div className="mb-2 text-sm text-muted">
          <span className="font-medium">By: {resource.organization.name}</span>
        </div>
      ) : (
        <div className="mb-2 text-sm text-muted italic">
          <span>Organization not listed</span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted pt-3 border-t border-border-soft">
        <div>
          <span className="font-medium">{getServiceAreaDisplay()}</span>
        </div>
        {outcomeSummary && outcomeSummary.total > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-forest">✓ {outcomeSummary.positive}</span>
            <span className="text-border-soft">/</span>
            <span className="text-muted">{outcomeSummary.total} reports</span>
          </div>
        )}
      </div>
    </Link>
  );
}
