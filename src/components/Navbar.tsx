import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { routeRegistry } from '../routes/routeRegistry';
import ThemeToggle from './ThemeToggle';
import MiniYouTubePlayer from './MiniYouTubePlayer';


export default function Navbar() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // Session state should be managed via AuthProvider/useAuth
  // Remove demo session logic
  const handleLogout = () => {
    setMenuOpen(false);
    navigate('/');
  };

  // Build nav links from route registry (mobile menu)
  const mobileLinks = useMemo(
    () =>
      routeRegistry
        .filter((route) => route.nav.mobile && !route.redirectTo)
        .sort((a, b) => a.nav.order - b.nav.order)
        .map((route) => ({
          label: route.nav.label,
          path: route.path,
          highlight: route.nav.highlight,
        })),
    []
  );

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Prevent background scroll while menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original || '';
    }
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-surface/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-ocean to-forest shadow-md" aria-hidden />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">The</div>
            <div className="-mt-1 text-xl font-bold text-ink">Father's Alliance</div>
          </div>
        </Link>
        {/* Desktop inline links removed; single hamburger used across all sizes */}
        <div className="flex items-center gap-2">
          <MiniYouTubePlayer
            videoId="oUBmsKlCi1s"
            title="Scars Don't Mean You Lost"
            label="Intro Track"
          />
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            {session ? (
              <div className="flex items-center gap-2">
                <span className="rounded bg-surface-muted px-2 py-1 text-xs font-medium text-muted">
                  Role: {session.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 text-xs font-medium text-ocean transition-colors hover:text-ocean/80"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-2 py-1 text-xs font-medium text-ocean transition-colors hover:text-ocean/80"
              >
                Login
              </Link>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-muted hover:bg-sand transition"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link
            to="/get-involved"
            className="rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-ocean/90"
          >
            Get Involved
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-surface/95 backdrop-blur"
          onClick={(e) => {
            // Close when clicking outside the menu panel
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          <nav className="flex flex-col min-h-0 h-[100dvh] container mt-2 rounded-xl bg-surface shadow-lg">
            {/* Header (fixed height) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft flex-shrink-0">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Navigation</div>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 text-muted hover:bg-sand transition"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 border-b border-border-soft px-4 py-4 lg:hidden">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Quick Controls</div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface px-4 py-3">
                  <span className="text-sm font-medium text-muted">Theme</span>
                  <ThemeToggle />
                </div>
                {session ? (
                  <div className="rounded-lg border border-border-soft bg-surface px-4 py-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Role</div>
                    <div className="mt-2 flex items-center justify-between text-sm font-medium text-ink">
                      <span>{session.role}</span>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded px-3 py-1 text-sm font-semibold text-ocean transition hover:text-ocean/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm font-semibold text-ocean transition hover:bg-sand"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
            {/* Link list (scrollable) */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                {mobileLinks.map(({ label, path, highlight }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        highlight
                          ? 'bg-ocean text-white hover:bg-ocean/90'
                          : isActive || pathname === path
                          ? 'bg-ink text-surface'
                          : 'text-muted hover:bg-sand'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
