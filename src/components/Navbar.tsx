import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Complete link list for all pages (header hamburger)
  const allLinks = useMemo(
    () => [
      { label: 'Home', path: '/' },
      { label: 'Who We Serve', path: '/who-we-serve' },
      { label: 'Our Programs', path: '/programs' },
      { label: 'FSIP', path: '/programs/fsip' },
      { label: 'How We Help', path: '/how-we-help' },
      { label: 'About', path: '/about' },
      { label: 'Resources', path: '/resources' },
      { label: 'Directory', path: '/resources/directory' },
      { label: 'Get Involved', path: '/get-involved', highlight: true },
      { label: 'Transparency', path: '/transparency' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
      // Include other active top-level routes
      { label: 'FSIP (Direct)', path: '/fsip' },
      { label: 'Providers', path: '/providers' },
      { label: 'Family Portal', path: '/portal' },
      { label: 'Provider Portal', path: '/support-portal' },
    ],
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
          <nav className="container mt-2 border border-border-soft rounded-xl bg-surface shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
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
            <div className="grid grid-cols-1 gap-1 p-3 md:grid-cols-2">
              {allLinks.map(({ label, path, highlight }) => (
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
          </nav>
        </div>
      )}
    </header>
  );
}
