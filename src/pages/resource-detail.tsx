import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { VerificationBadge } from '../components/resources/VerificationBadge';
import { OutcomeButtons } from '../components/resources/OutcomeButtons';
import { AdminNoteForm } from '../components/resources/AdminNoteForm';
import { ResourceCard } from '../components/resources/ResourceCard';
import { fetchResourceBySlug, fetchAllResources, parseResourceJsonFields } from '../lib/supabaseQueries';
import { hasValidSupabaseConfig } from '../lib/supabaseClient';
import { updatePageMeta } from '../utils/seo';
import type { Resource } from '../lib/types';

/**
 * Resource detail page
 * Displays complete information about a specific resource
 * 
 * Fetches resource by slug from Supabase with:
 * - Organization information
 * - Service areas
 * - Related resources by category
 */
export function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResource = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const resourceData = await fetchResourceBySlug(slug);

        if (!resourceData) {
          setResource(null);
          return;
        }

        // Parse JSON fields
        const parsedResource = parseResourceJsonFields(resourceData);
        setResource(parsedResource);

        // Load related resources by category (same category, excluding current)
        const allResources = await fetchAllResources();
        const related = allResources
          .filter((r) => r.category === parsedResource.category && r.id !== parsedResource.id)
          .slice(0, 3);
        setRelatedResources(related);

        // Update page meta
        updatePageMeta({
          title: `${parsedResource.title} | Resource Directory`,
          description: parsedResource.summary,
          path: `/resources/directory/${parsedResource.slug}`,
        });
      } catch (err) {
        console.error('Failed to load resource:', err);
        setError('Failed to load resource. Please try again.');
        setResource(null);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [slug]);

  // Handle not found
  if (!loading && (!slug || !resource)) {
    return <Navigate to="/not-found" replace />;
  }

  const getCostBadge = (cost: string) => {
    const badges: Record<string, string> = {
      free: 'bg-green-50 text-green-700 border-green-200',
      paid: 'bg-blue-50 text-blue-700 border-blue-200',
      'sliding-scale': 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return badges[cost] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatAccessTypes = (accessData: any): string[] => {
    if (Array.isArray(accessData)) return accessData;
    if (typeof accessData === 'string') {
      try {
        const parsed = JSON.parse(accessData);
        return Array.isArray(parsed) ? parsed : [accessData];
      } catch {
        return [accessData];
      }
    }
    return [];
  };

  const formatArrayField = (field: any): string[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [field];
      } catch {
        return [field];
      }
    }
    return [];
  };

  // Runtime guard for missing Supabase config
  if (!hasValidSupabaseConfig) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="mb-6 text-sm">
          <Link to="/resources/directory" className="text-blue-600 hover:text-blue-700">
            ← Back to Resource Directory
          </Link>
        </nav>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Configuration Error</h2>
          <p className="text-red-700">
            Supabase environment variables are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file and restart the development server.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 flex justify-center items-center min-h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading resource...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="mb-6 text-sm">
          <Link to="/resources/directory" className="text-blue-600 hover:text-blue-700">
            ← Back to Resource Directory
          </Link>
        </nav>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return <Navigate to="/not-found" replace />;
  }

  const accessTypes = formatAccessTypes(resource.access);
  const eligibilityItems = formatArrayField(resource.eligibility);
  const requirementsItems = formatArrayField(resource.requirements);
  const howToApplyItems = formatArrayField(resource.how_to_apply);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link to="/resources/directory" className="text-blue-600 hover:text-blue-700">
          ← Back to Resource Directory
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">{resource.title}</h1>
          <VerificationBadge
            status={resource.verification}
            lastVerified={resource.last_verified_at}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
            {resource.category}
          </span>
          <span className={`inline-block px-4 py-2 rounded-full font-medium border ${getCostBadge(resource.cost)}`}>
            {resource.cost === 'free' ? 'Free' : resource.cost === 'sliding-scale' ? 'Sliding Scale' : 'Paid'}
          </span>
          {accessTypes.map((type) => (
            <span key={type} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Overview */}
      <section className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">{resource.summary}</p>
      </section>

      {/* Details if available */}
      {resource.details && (
        <section className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
          <p className="text-gray-700 leading-relaxed">{resource.details}</p>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Eligibility */}
        {eligibilityItems.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
            <ul className="space-y-2">
              {eligibilityItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Requirements */}
        {requirementsItems.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-2">
              {requirementsItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gray-400">📄</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* How to Apply */}
      {howToApplyItems.length > 0 && (
        <section className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
          <ol className="space-y-3">
            {howToApplyItems.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Contact Information */}
      <section className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resource.organization?.phone && (
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Phone</div>
              <a href={`tel:${resource.organization.phone}`} className="text-blue-600 hover:text-blue-700">
                {resource.organization.phone}
              </a>
            </div>
          )}
          {resource.organization?.email && (
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
              <a href={`mailto:${resource.organization.email}`} className="text-blue-600 hover:text-blue-700">
                {resource.organization.email}
              </a>
            </div>
          )}
          {resource.organization?.website && (
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Website</div>
              <a
                href={resource.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Visit Website →
              </a>
            </div>
          )}
          {resource.hours && (
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Hours</div>
              <div className="text-gray-700">{resource.hours}</div>
            </div>
          )}
          {resource.service_areas && resource.service_areas.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Service Areas</div>
              <div className="text-gray-700">
                {resource.service_areas
                  .map((sa) => {
                    const parts = [];
                    if (sa.coverage === 'national') return 'National Coverage';
                    if (sa.zip) parts.push(`ZIP: ${sa.zip}`);
                    if (sa.city_name) parts.push(sa.city_name);
                    if (sa.state_code) parts.push(sa.state_code);
                    return parts.join(', ');
                  })
                  .filter(Boolean)
                  .slice(0, 3)
                  .join('; ')}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Organization Info */}
      {resource.organization && (
        <section className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Organization</h2>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.organization.name}</h3>
          {resource.organization.description && (
            <p className="text-gray-700 mb-3">{resource.organization.description}</p>
          )}
        </section>
      )}

      {/* Outcome Buttons */}
      <section className="mb-8">
        <OutcomeButtons resourceId={resource.id} />
      </section>

      {/* Admin Note Form */}
      <section className="mb-8">
        <AdminNoteForm resourceId={resource.id} />
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 gap-6">
            {relatedResources.map((related) => (
              <ResourceCard key={related.id} resource={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
