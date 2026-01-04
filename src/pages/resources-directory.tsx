import React, { useEffect, useState } from 'react';
import { ResourceCard } from '../components/resources/ResourceCard';
import { updatePageMeta } from '../utils/seo';
import { fetchAllResources, filterResources, getUniqueCategoriesFromResources } from '../lib/supabaseQueries';
import { hasValidSupabaseConfig } from '../lib/supabaseClient';
import type { Resource } from '../lib/types';

/**
 * Resource Directory listing page
 * Displays searchable, filterable directory of resources for fathers
 * 
 * Fetches resources from Supabase with filtering by:
 * - Text search (title, summary, org name)
 * - Category, cost, access, verification
 * - Optional location filter by ZIP code
 */
export function ResourcesDirectory() {
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedZip, setSelectedZip] = useState<string>('');
  const [selectedCost, setSelectedCost] = useState<'free' | 'paid' | 'sliding-scale' | 'All'>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<'verified' | 'stale' | 'unverified' | 'All'>('All');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zipcodeLocationCache, setZipcodeLocationCache] = useState<Map<string, any>>(new Map());

  // Load resources from Supabase on mount
  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllResources();
        setAllResources(data);
        const uniqueCategories = getUniqueCategoriesFromResources(data);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to load resources:', err);
        setError('Failed to load resources. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
    
    updatePageMeta({
      title: 'Resource Directory | The Father\'s Alliance',
      description: 'Find verified organizations and programs offering support across a range of needs including legal services, housing, mental health, employment, and more.',
      path: '/resources/directory',
    });
  }, []);

  // Filter resources based on all criteria
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await filterResources(
          allResources,
          {
            searchQuery,
            category: selectedCategory,
            cost: selectedCost,
            access: selectedAccess,
            verification: selectedVerification,
            zip: selectedZip,
          },
          zipcodeLocationCache
        );
        setFilteredResources(filtered);
      } catch (err) {
        console.error('Failed to filter resources:', err);
      }
    };

    applyFilters();
  }, [searchQuery, selectedCategory, selectedZip, selectedCost, selectedAccess, selectedVerification, allResources]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedZip('');
    setSelectedCost('All');
    setSelectedAccess('All');
    setSelectedVerification('All');
  };

  const activeFilterCount = [
    searchQuery.trim() ? 1 : 0,
    selectedCategory !== 'All' ? 1 : 0,
    selectedZip.trim() ? 1 : 0,
    selectedCost !== 'All' ? 1 : 0,
    selectedAccess !== 'All' ? 1 : 0,
    selectedVerification !== 'All' ? 1 : 0,
  ].reduce((sum, val) => sum + val, 0);

  const accessTypes = ['Walk-in', 'Appointment', 'Referral', 'Online'];

  // Runtime guard for missing Supabase config
  if (!hasValidSupabaseConfig) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Configuration Error</h2>
          <p className="text-red-700">
            Supabase environment variables are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file and restart the development server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Resource Directory</h1>
          <p className="text-lg text-gray-700">
            Find verified organizations and programs offering support across a range of needs. Listings are reviewed for accuracy and 
            include community-reported outcomes to help people make informed decisions during times of need.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Resources
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, description, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* ZIP Code Filter */}
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                placeholder="Enter ZIP code"
                value={selectedZip}
                onChange={(e) => setSelectedZip(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Cost Filter */}
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                Cost
              </label>
              <select
                id="cost"
                value={selectedCost}
                onChange={(e) => setSelectedCost(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="All">Any Cost</option>
                <option value="free">Free</option>
                <option value="sliding-scale">Sliding Scale</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Access Type Filter */}
            <div>
              <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-2">
                Access
              </label>
              <select
                id="access"
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="All">Any Access Type</option>
                {accessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Filter */}
            <div>
              <label htmlFor="verification" className="block text-sm font-medium text-gray-700 mb-2">
                Verification
              </label>
              <select
                id="verification"
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="All">All Status</option>
                <option value="verified">Verified</option>
                <option value="stale">Stale</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                disabled={loading || activeFilterCount === 0}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Active Filters Info */}
          {activeFilterCount > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading resources...</p>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-700">
              Showing <strong>{filteredResources.length}</strong> of <strong>{allResources.length}</strong> resources
            </p>
          </div>
        )}

        {/* Results List */}
        {!loading && filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : !loading ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
            <p className="text-gray-600 mb-6">
              No resources match your current filters. Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : null}
      </div>
  );
}
