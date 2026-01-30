import React from 'react';
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
        <span>Back to Directory</span>
      </Link>

      {/* Main Resource Details */}
      <SectionSurface>
        <div className="space-y-6">
          {/* Header with Title and Verification Badge */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-ink mb-2">
                {resource.title || 'Untitled Resource'}
              </h1>
              <p className="text-lg text-muted font-medium">{resource.org_name}</p>
            </div>
            <VerificationBadge
              status={getVerificationStatus(resource.verification)}
              lastVerified={resource.last_verified_at || undefined}
            />
          </div>

          {/* Category Badge */}
          <div>
            <span
              className={`inline-block px-3 py-1.5 rounded text-sm font-medium ${getCategoryColor(
                resource.category || 'Unknown'
              )}`}
            >
              {resource.category || 'Unknown'}
            </span>
          </div>

          {/* Coverage */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ocean mb-2">
              Coverage Area
            </h2>
            <p className="text-ink">{resource.coverage}</p>
          </div>

          {/* Summary */}
          {resource.summary && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ocean mb-2">
                Description
              </h2>
              <p className="text-muted leading-relaxed">{resource.summary}</p>
            </div>
          )}

          {/* Website Link */}
          {resource.url && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ocean mb-2">
                Website
              </h2>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
              >
                <span>Visit Resource</span>
                <span>→</span>
              </a>
            </div>
          )}
        </div>
      </SectionSurface>

      {/* Outcome Feedback */}
      <SectionSurface>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Share Your Experience</h2>
          <p className="text-sm text-muted">
            Help others by sharing your experience with this resource. Your feedback is anonymous and
            helps improve the directory.
          </p>
          <OutcomeButtons resourceId={resource.slug} />
        </div>
      </SectionSurface>

      {/* Admin Note Form */}
      <SectionSurface>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Report an Issue</h2>
          <p className="text-sm text-muted">
            Notice incorrect information or have feedback for our team? Submit a private note for admin
            review.
          </p>
          <AdminNoteForm resourceId={resource.slug} />
        </div>
      </SectionSurface>
    </div>
  );
}
