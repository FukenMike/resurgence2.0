import { useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../content/siteCopy';

export default function Navbar() {
  const { pathname } = useLocation();
  const links = useMemo(() => navLinks, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive || pathname === path ? 'bg-ink text-surface' : 'text-muted hover:bg-sand'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-muted hover:bg-sand transition"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
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
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border-soft bg-surface/95 backdrop-blur">
          <div className="container flex flex-col gap-1 py-3">
            {links.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive || pathname === path ? 'bg-ink text-surface' : 'text-muted hover:bg-sand'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
