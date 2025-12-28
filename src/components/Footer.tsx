import { Link } from 'react-router-dom';
import { navLinks } from '../content/siteCopy';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">The Father’s Alliance</div>
          <p className="mt-1 text-sm text-slate-500">Administrative navigation for fathers and families.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          {navLinks.map(({ label, path }) => (
            <Link key={path} to={path} className="hover:text-slate-900">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
