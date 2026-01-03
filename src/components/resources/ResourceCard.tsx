import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Resource } from '../../data/resources.seed';
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

  return (
    <Link
      to={`/resources/${resource.slug}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-gray-300 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {resource.name}
        </h3>
        <VerificationBadge
          status={resource.verificationStatus}
          lastVerified={resource.lastVerified}
          compact
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(resource.category)}`}>
          {resource.category}
        </span>
        {resource.cost === 'free' && (
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            Free
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-3 line-clamp-2">{resource.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="inline-block px-2 py-1 text-gray-500 text-xs">
            +{resource.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
        <div>
          <span className="font-medium">{resource.serviceArea.city || resource.serviceArea.county}</span>
          {resource.serviceArea.state && <span>, {resource.serviceArea.state}</span>}
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
