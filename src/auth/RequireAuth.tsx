import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import type { UserRole } from './apiAuth';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, logout } = useAuth();

  // While we check /api/me
  if (state.status === 'loading') {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-surface border border-border-soft rounded-lg p-8 text-center">
          <h1 className="text-xl font-semibold text-ink mb-2">Loading…</h1>
          <p className="text-muted">Checking your session.</p>
        </div>
      </div>
    );
  }

  // Not authenticated -> login
  if (state.status !== 'authed') {
    const nextUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${nextUrl}`} replace />;
  }

  // Wrong role
  if (requiredRole && state.user.role !== requiredRole) {
    const handleLogout = async () => {
      await logout();
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
            Your current role: <span className="font-semibold">{state.user.role}</span>
          </p>
          <button
            onClick={() => void handleLogout()}
            className="px-6 py-2 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
