import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceLinkBySlug } from '../lib/resourceLinks';
import { VerificationBadge } from '../components/resources/VerificationBadge';
import { OutcomeButtons } from '../components/resources/OutcomeButtons';
import { AdminNoteForm } from '../components/resources/AdminNoteForm';
import SectionSurface from '../components/SectionSurface';
import { useRouteMetadata } from '../routes/meta';
import type { VerificationStatus } from '../lib/types';

export default function ResourceDetail() {
  useRouteMetadata();
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResourceLinkBySlug(slug) : undefined;
  const [showAdminForm, setShowAdminForm] = useState(false);

  // Map resource verification to VerificationStatus type
  const getVerificationStatus = (verification: string | null): VerificationStatus => {
    if (verification === 'verified') return 'verified';
    if (verification === 'stale') return 'stale';
    return 'unverified';
  };

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

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto">
        <SectionSurface>
          <div className="text-center py-12">
            <h1 className="text-3xl font-semibold text-ink mb-4">Resource Not Found</h1>
            <p className="text-muted mb-6">
              The resource you're looking for could not be found or has been removed.
            </p>
            <Link
              to="/resources/directory"
              className="inline-block px-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
            >
              Back to Resource Directory
            </Link>
          </div>
        </SectionSurface>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <Link
        to="/resources/directory"
        className="inline-flex items-center gap-2 text-sm text-ocean hover:text-ocean/80 transition-colors"
      >
        <span>←</span>
        <span>Back to Resource Directory</span>
      </Link>

      {/* Main Resource Card */}
      <SectionSurface>
        <div className="space-y-6">
          {/* Title Section with Verification Badge */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-ink mb-1">
                {resource.title || 'Untitled Resource'}
              </h1>
              <p className="text-muted">{resource.org_name}</p>
            </div>
            <div className="flex-shrink-0">
              <VerificationBadge
                status={getVerificationStatus(resource.verification)}
                lastVerified={resource.last_verified_at || undefined}
              />
            </div>
          </div>

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-3">
            {resource.category && (
              <span
                className={`inline-block px-3 py-1.5 rounded text-sm font-medium ${getCategoryColor(
                  resource.category
                )}`}
              >
                {resource.category}
              </span>
            )}
            {resource.coverage && (
              <span className="inline-block px-3 py-1.5 rounded text-sm font-medium bg-surface-muted text-ink">
                {resource.coverage}
              </span>
            )}
          </div>

          {/* Summary Paragraph */}
          {resource.summary && (
            <p className="text-muted leading-relaxed">
              {resource.summary}
            </p>
          )}

          {/* Primary Action Button */}
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
            >
              <span>Visit Official Website</span>
              <span>→</span>
            </a>
          )}

          {/* Divider */}
          <div className="border-t border-surface-muted" />

          {/* Outcome Feedback Section */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-ink">Did this resource help you?</p>
            <OutcomeButtons resourceId={resource.slug} />
          </div>

          {/* Admin Note Form Toggle */}
          <div className="space-y-3">
            <button
              onClick={() => setShowAdminForm(!showAdminForm)}
              className="inline-flex items-center gap-2 text-sm text-ocean hover:text-ocean/80 transition-colors font-medium"
            >
              <span>{showAdminForm ? '▼' : '▶'}</span>
              <span>Report an issue with this resource</span>
            </button>
            {showAdminForm && (
              <div className="mt-4 pt-4 border-t border-surface-muted">
                <AdminNoteForm resourceId={resource.slug} />
              </div>
            )}
          </div>
        </div>
      </SectionSurface>
    </div>
  );
}
