import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getSession, clearSession, type UserRole } from './auth';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

/**
 * Auth wrapper component that enforces authentication and role requirements
 * Redirects to /login if not authenticated
 * Shows access denied message if role doesn't match
 */
export function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getSession();

  // Not authenticated at all -> redirect to login
  if (!session) {
    const nextUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${nextUrl}`} replace />;
  }

  // Authenticated but wrong role -> show access denied
  if (requiredRole && session.role !== requiredRole) {
    const handleLogout = () => {
      clearSession();
      navigate('/login');
    };

    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-surface border border-border-soft rounded-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-ink mb-4">Access Restricted</h1>
          <p className="text-muted mb-6">
            You don't have permission to access this page. This area is restricted to{' '}
            <span className="font-semibold">{requiredRole}</span> accounts.
          </p>
          <p className="text-sm text-muted mb-6">
            Your current role: <span className="font-semibold">{session.role}</span>
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Authenticated with correct role -> render children
  return <>{children}</>;
}
