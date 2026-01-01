import { useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../content/siteCopy';

export default function Navbar() {
  const { pathname } = useLocation();
  const links = useMemo(() => navLinks, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-600 shadow-md" aria-hidden />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">The</div>
            <div className="-mt-1 text-xl font-bold text-slate-900">Father’s Alliance</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive || pathname === path ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
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
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition"
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
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-700"
          >
            Get Involved
          </Link>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="container flex flex-col gap-1 py-3">
            {links.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive || pathname === path ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
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
