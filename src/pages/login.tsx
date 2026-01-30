import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSession, type UserRole } from '../auth/auth';
import SectionSurface from '../components/SectionSurface';
import { useRouteMetadata } from '../routes/meta';

export default function Login() {
  useRouteMetadata();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole>('family');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the session with selected role
    setSession(selectedRole);
    
    // Navigate to next URL if present, otherwise portals
    const nextUrl = searchParams.get('next') || '/portals';
    navigate(nextUrl);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SectionSurface>
        <div className="py-8">
          <h1 className="text-3xl font-semibold text-ink mb-4">Demo Login</h1>
          <p className="text-muted mb-8">
            Select a role to access protected areas. This is a demonstration of role-based access
            control.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ink mb-3">Select Role</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border-soft rounded-lg hover:bg-surface-muted cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="family"
                    checked={selectedRole === 'family'}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-4 h-4 text-ocean"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-ink">Family</div>
                    <div className="text-sm text-muted">Access to Family Portal and case information</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border-soft rounded-lg hover:bg-surface-muted cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={selectedRole === 'provider'}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-4 h-4 text-ocean"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-ink">Provider</div>
                    <div className="text-sm text-muted">
                      Access to Provider Portal and case management tools
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border-soft rounded-lg hover:bg-surface-muted cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={selectedRole === 'admin'}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-4 h-4 text-ocean"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-ink">Admin</div>
                    <div className="text-sm text-muted">Full access to all areas and settings</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-ocean text-white rounded-lg font-semibold hover:bg-ocean/90 transition-colors"
            >
              Enter Demo
            </button>
          </form>

          <div className="mt-8 p-4 bg-sand rounded-lg">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">Note:</span> This is a demonstration login
              system. In production, authentication would use secure OAuth providers or JWT tokens
              with proper credential management.
            </p>
          </div>
        </div>
      </SectionSurface>
    </div>
  );
}
