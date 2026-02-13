import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import SectionSurface from '../components/SectionSurface';
import { useRouteMetadata } from '../routes/meta';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  useRouteMetadata();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, state } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const nextUrl = searchParams.get('next') || '/portals';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      if (mode === 'login') {
        await login(email.trim().toLowerCase(), password);
      } else {
        await register(email.trim().toLowerCase(), password);
      }
      navigate(nextUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SectionSurface>
        <div className="py-8">
          <h1 className="text-3xl font-semibold text-ink mb-2">
            {mode === 'login' ? 'Login' : 'Create account'}
          </h1>
          <p className="text-muted mb-8">
            {mode === 'login'
              ? 'Sign in to access protected portal areas.'
              : 'Create your account to access protected portal areas.'}
          </p>

          {state.status === 'authed' && (
            <div className="mb-6 p-4 bg-sand rounded-lg">
              <p className="text-sm text-ink">
                You’re already signed in as <span className="font-semibold">{state.user.email}</span>.{' '}
                <Link className="underline" to={nextUrl}>
                  Continue
                </Link>
                .
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 border border-border-soft rounded-lg bg-surface-muted">
              <p className="text-sm text-ink">
                <span className="font-semibold">Error:</span> {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border-soft rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-ocean/40"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Password</label>
              <input
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border-soft rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-ocean/40"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full px-6 py-3 bg-ocean text-white rounded-lg font-semibold hover:bg-ocean/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? 'Working…' : mode === 'login' ? 'Login' : 'Create account'}
            </button>

            <div className="text-sm text-muted text-center">
              {mode === 'login' ? (
                <>
                  Don’t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-ocean font-semibold hover:underline"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-ocean font-semibold hover:underline"
                  >
                    Login instead
                  </button>
                </>
              )}
            </div>
          </form>

          <div className="mt-8 p-4 bg-sand rounded-lg">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">Note:</span> Roles are assigned by the server. If you need a
              provider/admin account, it must be granted (we’ll add an admin tool for that next).
            </p>
          </div>
        </div>
      </SectionSurface>
    </div>
  );
}
