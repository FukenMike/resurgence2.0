import { Link } from 'react-router-dom';
import { footerLinks } from '../content/siteCopy';

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface py-8">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-ink">The Father's Alliance</div>
          <p className="mt-1 text-sm text-muted">Supporting stability. Strengthening families.</p>
        </div>
        <div className="hidden flex-wrap gap-3 text-sm text-muted md:flex">
          {footerLinks.map(({ label, path }) => (
            <Link key={path} to={path} className="hover:text-ink">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <Link to="/privacy-policy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <span aria-hidden>|</span>
          <Link to="/terms-of-service" className="hover:text-ink">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
