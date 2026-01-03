import { Link } from 'react-router-dom';
import { navLinks } from '../content/siteCopy';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">The Father’s Alliance</div>
          <p className="mt-1 text-sm text-slate-500">Supporting stability. Strengthening families.</p>
        </div>
        <div className="hidden flex-wrap gap-3 text-sm text-slate-600 md:flex">
          {navLinks.map(({ label, path }) => (
            <Link key={path} to={path} className="hover:text-slate-900">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Link to="/privacy-policy" className="hover:text-slate-800">
            Privacy Policy
          </Link>
          <span aria-hidden>|</span>
          <Link to="/terms-of-service" className="hover:text-slate-800">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
