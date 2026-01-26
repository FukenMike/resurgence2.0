import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatePageMeta } from '../utils/seo';

export default function NotFound() {
  useEffect(() => {
    // 404 needs custom noindex handling and dynamic path
    updatePageMeta({
      title: "Page Not Found - The Father's Alliance",
      description: 'The page you are looking for moved or no longer exists.',
      path: '/404',
      noindex: true,
    });
  }, []);
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">404</p>
      <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-2xl text-lg text-muted">The page you are looking for moved or no longer exists. Let's get you back to the mission.</p>
      <Link
        to="/"
        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-ink/90"
      >
        Return home
      </Link>
    </div>
  );
}
