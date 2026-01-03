import React, { useEffect, useState } from 'react';
import { ResourceCard } from '../components/resources/ResourceCard';
import { resources, type ResourceCategory } from '../data/resources.seed';
import type { Resource } from '../data/resources.seed';
import { updatePageMeta } from '../utils/seo';

/**
 * Resource Directory listing page
 * Displays searchable, filterable directory of resources for fathers
 * 
 * TODO: Replace local filtering with API calls when backend is ready
 * TODO: Add pagination for larger datasets
+ * 
+ * Note: Layout wrapper removed - already applied at route level via <Outlet />
 */
export function ResourcesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCost, setSelectedCost] = useState<'free' | 'paid' | 'sliding-scale' | 'All'>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<'verified' | 'stale' | 'unverified' | 'All'>('All');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);

  useEffect(() => {
    updatePageMeta({
      title: 'Resource Directory | The Father\'s Alliance',
      description: 'Find verified resources including legal aid, housing assistance, mental health support, employment services, and more for fathers in California.',
      path: '/resources/directory',
    });
  }, []);

  // Extract unique values for filters
  const categories: ResourceCategory[] = [
    'Legal Services',
    'Housing Assistance',
    'Mental Health',
    'Employment Services',
    'Food & Basic Needs',
    'Healthcare',
    'Transportation',
    'Child Support',
    'Education & Training',
    'Emergency Services',
  ];
  // Fix: Removed <Layout> wrapper - Layout is already applied at route level
  // The double-wrap was causing a blank page because the inner Layout has no <Outlet />

  const states = Array.from(new Set(resources.map((r) => r.serviceArea.state))).sort();

  const accessTypes = ['Walk-in', 'Appointment', 'Referral', 'Online'];

  // Filter resources based on all criteria
  useEffect(() => {
    let filtered = resources;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          r.whatTheyProvide.some((service) => service.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    // State filter
    if (selectedState !== 'All') {
      filtered = filtered.filter((r) => r.serviceArea.state === selectedState);
    }

    // Cost filter
    if (selectedCost !== 'All') {
      filtered = filtered.filter((r) => r.cost === selectedCost);
    }

    // Access type filter
    if (selectedAccess !== 'All') {
      filtered = filtered.filter((r) => r.accessType.includes(selectedAccess as any));
    }

    // Verification filter
    if (selectedVerification !== 'All') {
      filtered = filtered.filter((r) => r.verificationStatus === selectedVerification);
    }

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, selectedState, selectedCost, selectedAccess, selectedVerification]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedState('All');
    setSelectedCost('All');
    setSelectedAccess('All');
    setSelectedVerification('All');
  };

  const activeFilterCount = [
    searchQuery.trim() ? 1 : 0,
    selectedCategory !== 'All' ? 1 : 0,
    selectedState !== 'All' ? 1 : 0,
    selectedCost !== 'All' ? 1 : 0,
    selectedAccess !== 'All' ? 1 : 0,
    selectedVerification !== 'All' ? 1 : 0,
  ].reduce((sum, val) => sum + val, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Resource Directory</h1>
          <p className="text-lg text-gray-700">
            Find verified resources to support your journey as a father. All listings are reviewed for accuracy and 
            include community feedback to help you make informed decisions.
          </p>
        </div>

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
              placeholder="Search by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | 'All')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
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
              >
                <option value="All">All Status</option>
                <option value="verified">Verified</option>
                <option value="stale">Stale</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
          </div>

          {/* Active Filters & Reset */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700">
            Showing <strong>{filteredResources.length}</strong> of <strong>{resources.length}</strong> resources
          </p>
        </div>

        {/* Results List */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
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
        )}
      </div>
  );
}
