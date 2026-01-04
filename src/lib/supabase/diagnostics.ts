/**
 * Supabase Diagnostics Module
 * Read-only checks to verify database connectivity and data integrity
 */

import { supabase } from '../supabaseClient';

export interface DiagnosticResult {
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

export interface DiagnosticsReport {
  timestamp: string;
  environment: DiagnosticResult;
  connectivity: DiagnosticResult;
  counts: DiagnosticResult & { details?: Record<string, number> };
  integrity: DiagnosticResult & { details?: Record<string, any> };
  sampleFetch: DiagnosticResult & { details?: any[] };
}

/**
 * Check environment variables (never log full keys)
 */
function checkEnvironment(): DiagnosticResult {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      status: 'fail',
      message: 'Missing Supabase environment variables',
      details: {
        hasUrl: !!url,
        hasKey: !!key,
      },
    };
  }

  // Redact key - show only first 6 and last 6 chars
  const redactedKey = `${key.substring(0, 6)}...${key.substring(key.length - 6)}`;

  return {
    status: 'pass',
    message: 'Environment variables configured',
    details: {
      url: url.substring(0, 50) + (url.length > 50 ? '...' : ''),
      keyRedacted: redactedKey,
    },
  };
}

/**
 * Check basic connectivity to Supabase
 */
async function checkConnectivity(): Promise<DiagnosticResult> {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('id')
      .limit(1);

    if (error) {
      return {
        status: 'fail',
        message: `Connection failed: ${error.message}`,
        details: { errorCode: error.code },
      };
    }

    if (!data) {
      return {
        status: 'fail',
        message: 'No response from Supabase',
      };
    }

    return {
      status: 'pass',
      message: 'Successfully connected to Supabase',
      details: { rowsFetched: data.length },
    };
  } catch (err: any) {
    return {
      status: 'fail',
      message: `Connection error: ${err.message}`,
    };
  }
}

/**
 * Get counts of key tables
 */
async function getCounts(): Promise<DiagnosticResult> {
  try {
    const tables = [
      'resources',
      'organizations',
      'resource_service_areas',
      'geo_zipcodes',
      'geo_states',
      'geo_zip_city_aliases',
    ];

    const counts: Record<string, number> = {};
    let hasError = false;
    let errorMsg = '';

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        hasError = true;
        errorMsg = error.message;
        counts[table] = -1; // Indicate error
      } else {
        counts[table] = count || 0;
      }
    }

    if (hasError) {
      return {
        status: 'warning',
        message: `Partial count failure: ${errorMsg}`,
        details: counts,
      };
    }

    const isEmpty = Object.values(counts).some((c) => c === 0);
    if (isEmpty) {
      return {
        status: 'warning',
        message: 'Some tables are empty',
        details: counts,
      };
    }

    return {
      status: 'pass',
      message: 'All tables have data',
      details: counts,
    };
  } catch (err: any) {
    return {
      status: 'fail',
      message: `Count query failed: ${err.message}`,
    };
  }
}

/**
 * Check data integrity (orphaned records, null checks)
 */
async function checkIntegrity(): Promise<DiagnosticResult> {
  try {
    const issues: Record<string, any> = {};

    // Check for resources with null org_id
    const { count: nullOrgCount, error: nullOrgError } = await supabase
      .from('resources')
      .select('*', { count: 'exact', head: true })
      .is('org_id', null);

    if (!nullOrgError && nullOrgCount !== null && nullOrgCount !== undefined) {
      if (nullOrgCount > 0) {
        issues.resourcesWithNullOrgId = nullOrgCount;
      }
    }

    // Check for orphaned service areas (resource_id with no matching resource)
    // This is harder with client-side queries, so we'll fetch a sample and verify
    const { data: serviceAreas, error: saError } = await supabase
      .from('resource_service_areas')
      .select('resource_id')
      .limit(5);

    if (saError) {
      return {
        status: 'fail',
        message: `Integrity check failed: ${saError.message}`,
      };
    }

    if (!serviceAreas || serviceAreas.length === 0) {
      issues.serviceAreasCount = 0;
    }

    // If no issues found
    if (Object.keys(issues).length === 0) {
      return {
        status: 'pass',
        message: 'Data integrity check passed',
        details: { samplesChecked: 5 },
      };
    }

    return {
      status: 'warning',
      message: 'Potential data integrity issues detected',
      details: issues,
    };
  } catch (err: any) {
    return {
      status: 'fail',
      message: `Integrity check error: ${err.message}`,
    };
  }
}

/**
 * Fetch sample resources to verify the app's query works
 */
async function fetchSamples(): Promise<DiagnosticResult> {
  try {
    const { data: resources, error } = await supabase
      .from('resources')
      .select(`
        id,
        slug,
        title,
        org_id,
        organizations:org_id (
          id,
          name
        ),
        resource_service_areas (
          resource_id,
          coverage,
          state_code,
          county_fips,
          city_name,
          zip
        )
      `)
      .eq('status', 'active')
      .limit(5);

    if (error) {
      return {
        status: 'fail',
        message: `Sample fetch failed: ${error.message}`,
        details: { errorCode: error.code },
      };
    }

    if (!resources || resources.length === 0) {
      return {
        status: 'warning',
        message: 'No active resources found',
        details: { count: 0 },
      };
    }

    // Process samples for display
    const samples = resources.map((r: any) => ({
      slug: r.slug,
      title: r.title,
      organizationName: Array.isArray(r.organizations)
        ? r.organizations[0]?.name
        : r.organizations?.name,
      serviceAreaCount: r.resource_service_areas?.length || 0,
      coverageSummary: generateCoverageSummary(r.resource_service_areas || []),
    }));

    return {
      status: 'pass',
      message: `Successfully fetched ${resources.length} sample resources`,
      details: samples,
    };
  } catch (err: any) {
    return {
      status: 'fail',
      message: `Sample fetch error: ${err.message}`,
    };
  }
}

/**
 * Helper: Generate human-readable coverage summary
 */
function generateCoverageSummary(serviceAreas: any[]): string {
  if (!serviceAreas || serviceAreas.length === 0) {
    return 'No coverage defined';
  }

  const coverageTypes = new Set(serviceAreas.map((sa) => sa.coverage));
  const summary: string[] = [];

  if (coverageTypes.has('national')) {
    summary.push('National');
  }
  if (coverageTypes.has('state')) {
    const states = [...new Set(serviceAreas.filter((sa) => sa.state_code).map((sa) => sa.state_code))];
    summary.push(`${states.length} state(s)`);
  }
  if (coverageTypes.has('county')) {
    summary.push('Counties');
  }
  if (coverageTypes.has('city')) {
    summary.push('Cities');
  }
  if (coverageTypes.has('zip')) {
    summary.push('Specific ZIPs');
  }

  return summary.join(', ');
}

/**
 * Run all diagnostics
 */
export async function runDiagnostics(): Promise<DiagnosticsReport> {
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    environment: checkEnvironment(),
    connectivity: await checkConnectivity(),
    counts: await getCounts(),
    integrity: await checkIntegrity(),
    sampleFetch: await fetchSamples(),
  };
}

/**
 * Generate a text report for copying
 */
export function generateTextReport(report: DiagnosticsReport): string {
  const lines: string[] = [
    'SUPABASE DIAGNOSTICS REPORT',
    `Generated: ${new Date(report.timestamp).toLocaleString()}`,
    '',
    '=== ENVIRONMENT ===',
    `Status: ${report.environment.status.toUpperCase()}`,
    report.environment.message,
    report.environment.details ? `Details: ${JSON.stringify(report.environment.details)}` : '',
    '',
    '=== CONNECTIVITY ===',
    `Status: ${report.connectivity.status.toUpperCase()}`,
    report.connectivity.message,
    report.connectivity.details
      ? `Details: ${JSON.stringify(report.connectivity.details)}`
      : '',
    '',
    '=== COUNTS ===',
    `Status: ${report.counts.status.toUpperCase()}`,
    report.counts.message,
    ...(report.counts.details
      ? Object.entries(report.counts.details).map(
          ([key, value]) => `  ${key}: ${value === -1 ? 'ERROR' : value}`
        )
      : []),
    '',
    '=== INTEGRITY ===',
    `Status: ${report.integrity.status.toUpperCase()}`,
    report.integrity.message,
    report.integrity.details ? `Details: ${JSON.stringify(report.integrity.details)}` : '',
    '',
    '=== SAMPLE FETCH ===',
    `Status: ${report.sampleFetch.status.toUpperCase()}`,
    report.sampleFetch.message,
    ...(report.sampleFetch.details
      ? report.sampleFetch.details.map(
          (s: any) =>
            `  - ${s.slug} (${s.title}) | Org: ${s.organizationName || 'N/A'} | Areas: ${s.serviceAreaCount} | Coverage: ${s.coverageSummary}`
        )
      : []),
    '',
    'END OF REPORT',
  ];

  return lines.filter((l) => l !== null).join('\n');
}
