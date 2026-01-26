import React, { useEffect, useMemo, useState } from 'react';
import { resourceLinks } from '../lib/resourceLinks';
import type { ResourceLink } from '../lib/resourceLinks';
import { ResourceCard } from '../components/resources/ResourceCard';
import { useRouteMetadata } from '../routes/meta';

/**
 * Resource Directory listing page
 * Displays searchable, filterable directory of curated external resources
 * backed by a local static JSON dataset (no network requests required).
 */
export function ResourcesDirectory() {
  useRouteMetadata();
  
  const [filteredResources, setFilteredResources] = useState<ResourceLink[]>(resourceLinks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showWithWebsiteOnly, setShowWithWebsiteOnly] = useState(false);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    resourceLinks.forEach((r) => {
      if (r.category) unique.add(r.category);
    });
    return Array.from(unique).sort();
  }, []);

  // Apply filters locally on the static dataset
  useEffect(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = resourceLinks.filter((resource) => {
      const matchesSearch = normalizedQuery
        ? [resource.title, resource.org_name, resource.summary]
            .filter((field): field is string => field !== null && field !== undefined)
            .some((field) => field.toLowerCase().includes(normalizedQuery))
        : true;

      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesVerification = !showVerifiedOnly || resource.verification === 'verified';
      const matchesWebsite = !showWithWebsiteOnly || resource.url !== null;

      return matchesSearch && matchesCategory && matchesVerification && matchesWebsite;
    });

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, showVerifiedOnly, showWithWebsiteOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setShowVerifiedOnly(false);
    setShowWithWebsiteOnly(false);
  };

  const activeFilterCount = [
    searchQuery.trim() ? 1 : 0,
    selectedCategory !== 'All' ? 1 : 0,
    showVerifiedOnly ? 1 : 0,
    showWithWebsiteOnly ? 1 : 0,
  ].reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Resource Directory</h1>
        <p className="text-lg text-gray-600">
          Browse verified organizations and programs across legal, housing, employment, and related needs.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, organization, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Verification Toggle */}
        <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showVerifiedOnly}
            onChange={(e) => setShowVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Verified resources only</span>
        </label>

        {/* Website Filter Toggle */}
        <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showWithWebsiteOnly}
            onChange={(e) => setShowWithWebsiteOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Resources with a website</span>
        </label>
      </div>

      {/* Filter Status and Reset */}
      {activeFilterCount > 0 && (
        <div className="mb-6 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
          </span>
          <button
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-sm font-medium text-gray-700">
        Showing <span className="font-bold text-gray-900">{filteredResources.length}</span> result
        {filteredResources.length !== 1 ? 's' : ''}
      </div>

      {/* Resource Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No resources match the current filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
