import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { runDiagnostics, generateTextReport } from '../lib/supabase/diagnostics';
import type { DiagnosticsReport } from '../lib/supabase/diagnostics';

/**
 * Diagnostics Page
 * Admin tool to verify Supabase connection and data integrity
 * Read-only access - no data modifications
 */
export function Diagnostics() {
  const [report, setReport] = useState<DiagnosticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadDiagnostics = async () => {
      try {
        setLoading(true);
        setError(null);
        const diagnosticsReport = await runDiagnostics();
        setReport(diagnosticsReport);
      } catch (err: any) {
        setError(err.message || 'Failed to run diagnostics');
      } finally {
        setLoading(false);
      }
    };

    loadDiagnostics();
  }, []);

  const copyReportToClipboard = () => {
    if (!report) return;
    const text = generateTextReport(report);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const StatusBadge = ({ status }: { status: 'pass' | 'fail' | 'warning' }) => {
    const styles = {
      pass: 'bg-green-100 text-green-800 border-green-300',
      fail: 'bg-red-100 text-red-800 border-red-300',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    const icons = {
      pass: '✓',
      fail: '✗',
      warning: '⚠',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        <span className="text-lg">{icons[status]}</span>
        {status.toUpperCase()}
      </span>
    );
  };

  const DiagnosticSection = ({
    title,
    status,
    message,
    details,
  }: {
    title: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    details?: any;
  }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-gray-700 mb-4">{message}</p>

        {details && (
          <div className="bg-gray-50 rounded p-4 font-mono text-sm text-gray-800 max-h-64 overflow-auto">
            {typeof details === 'object' ? (
              <>
                {Array.isArray(details) ? (
                  <div>
                    {details.map((item, idx) => (
                      <div key={idx} className="mb-2">
                        {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                      </div>
                    ))}
                  </div>
                ) : (
                  Object.entries(details).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </div>
                  ))
                )}
              </>
            ) : (
              <div>{String(details)}</div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-96">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Running diagnostics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </nav>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-2">Diagnostics Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <nav className="mb-8 text-sm">
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Supabase Diagnostics</h1>
        <p className="text-gray-600">
          Read-only health check for database connectivity and data integrity
        </p>
      </div>

      {/* Admin Warning */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          <strong>ℹ️ Admin Tool:</strong> This page is intended for administrators and developers to verify Supabase
          configuration and data. No data is modified.
        </p>
      </div>

      {/* Copy Report Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={copyReportToClipboard}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy Report'}
        </button>
      </div>

      {/* Overall Summary */}
      {report && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Environment</div>
              <StatusBadge status={report.environment.status} />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Connectivity</div>
              <StatusBadge status={report.connectivity.status} />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Counts</div>
              <StatusBadge status={report.counts.status} />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Integrity</div>
              <StatusBadge status={report.integrity.status} />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Sample Fetch</div>
              <StatusBadge status={report.sampleFetch.status} />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Timestamp</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(report.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Sections */}
      {report && (
        <>
          <DiagnosticSection
            title="Environment"
            status={report.environment.status}
            message={report.environment.message}
            details={report.environment.details}
          />

          <DiagnosticSection
            title="Connectivity"
            status={report.connectivity.status}
            message={report.connectivity.message}
            details={report.connectivity.details}
          />

          <DiagnosticSection
            title="Table Counts"
            status={report.counts.status}
            message={report.counts.message}
            details={report.counts.details}
          />

          <DiagnosticSection
            title="Data Integrity"
            status={report.integrity.status}
            message={report.integrity.message}
            details={report.integrity.details}
          />

          <DiagnosticSection
            title="Sample Fetch"
            status={report.sampleFetch.status}
            message={report.sampleFetch.message}
            details={report.sampleFetch.details}
          />
        </>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>Diagnostics page is read-only and does not modify any data.</p>
        <p className="mt-2">
          Last check: {report ? new Date(report.timestamp).toLocaleString() : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default Diagnostics;
