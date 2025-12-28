import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">404</p>
      <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="max-w-2xl text-lg text-slate-600">The page you are looking for moved or no longer exists. Let’s get you back to the mission.</p>
      <Link
        to="/"
        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-slate-800"
      >
        Return home
      </Link>
    </div>
  );
}
