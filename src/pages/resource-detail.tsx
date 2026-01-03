import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { VerificationBadge } from '../components/resources/VerificationBadge';
import { OutcomeButtons } from '../components/resources/OutcomeButtons';
import { AdminNoteForm } from '../components/resources/AdminNoteForm';
import { ResourceCard } from '../components/resources/ResourceCard';
import { getResourceBySlug, getResourcesByCategory } from '../data/resources.seed';
import { updatePageMeta } from '../utils/seo';

/**
 * Resource detail page
 * Displays complete information about a specific resource
 * 
 * TODO: Replace getResourceBySlug with API call to /api/resources/:slug
 */
export function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResourceBySlug(slug) : undefined;

  useEffect(() => {
    if (resource) {
      updatePageMeta({
        title: `${resource.name} | Resource Directory`,
        description: resource.description,
        path: `/resources/${resource.slug}`,
      });
    }
  }, [resource]);

  // Handle not found
  if (!slug || !resource) {
    return <Navigate to="/not-found" replace />;
  }

  // Get related resources (same category, excluding current)
  const relatedResources = getResourcesByCategory(resource.category)
    .filter((r) => r.id !== resource.id)
    .slice(0, 3);

  const getCostBadge = (cost: string) => {
    const badges = {
      free: 'bg-green-50 text-green-700 border-green-200',
      paid: 'bg-blue-50 text-blue-700 border-blue-200',
      'sliding-scale': 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return badges[cost as keyof typeof badges] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/resources" className="text-blue-600 hover:text-blue-700">
            ← Back to Resource Directory
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{resource.name}</h1>
            <VerificationBadge status={resource.verificationStatus} lastVerified={resource.lastVerified} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
              {resource.category}
            </span>
            <span className={`inline-block px-4 py-2 rounded-full font-medium border ${getCostBadge(resource.cost)}`}>
              {resource.cost === 'free' ? 'Free' : resource.cost === 'sliding-scale' ? 'Sliding Scale' : 'Paid'}
            </span>
            {resource.accessType.map((type) => (
              <span key={type} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">{resource.description}</p>
        </section>

        {/* What They Provide */}
        <section className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What They Provide</h2>
          <ul className="space-y-2">
            {resource.whatTheyProvide.map((service, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">{service}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Eligibility */}
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
            <ul className="space-y-2">
              {resource.eligibility.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Documents */}
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <ul className="space-y-2">
              {resource.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gray-400">📄</span>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* How to Apply */}
        <section className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
          <ol className="space-y-3">
            {resource.howToApply.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact Information */}
        <section className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resource.contactInfo.phone && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Phone</div>
                <a href={`tel:${resource.contactInfo.phone}`} className="text-blue-600 hover:text-blue-700">
                  {resource.contactInfo.phone}
                </a>
              </div>
            )}
            {resource.contactInfo.email && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
                <a href={`mailto:${resource.contactInfo.email}`} className="text-blue-600 hover:text-blue-700">
                  {resource.contactInfo.email}
                </a>
              </div>
            )}
            {resource.contactInfo.website && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Website</div>
                <a
                  href={resource.contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Visit Website →
                </a>
              </div>
            )}
            {resource.contactInfo.address && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Address</div>
                <address className="text-gray-700 not-italic">{resource.contactInfo.address}</address>
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Hours</div>
              <div className="text-gray-700">{resource.hours}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Service Area</div>
              <div className="text-gray-700">
                {resource.serviceArea.city && `${resource.serviceArea.city}, `}
                {resource.serviceArea.county && `${resource.serviceArea.county}, `}
                {resource.serviceArea.state}
                {resource.serviceArea.notes && (
                  <div className="text-sm text-gray-600 mt-1">{resource.serviceArea.notes}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        {resource.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
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
    </Layout>
  );
}
