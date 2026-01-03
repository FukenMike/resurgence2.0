import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { resourcesCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function Resources() {
  useEffect(() => {
    updatePageMeta({
      title: "Tools for Stability - Resources - The Father's Alliance",
      description:
        'Practical tools and resources for stability planning, communication, and budgeting. Simple, accessible guidance for families navigating household stability.',
      path: '/resources',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Resources</p>
        <h1 className="text-4xl font-semibold text-slate-900">{resourcesCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">Practical tools that support stability, planning, and forward momentum.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {/* Resource Directory card now links to the dedicated directory experience */}
        <Card title="Resource Directory">
          <p className="text-slate-600">
            Browse verified resources with search, filters, and community feedback.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              to="/resources/directory"
              className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-700"
            >
              Open Directory
            </Link>
            <span className="text-xs uppercase tracking-[0.12em] text-sky-600">New</span>
          </div>
        </Card>

        {resourcesCopy.items
          .filter((item) => !item.toLowerCase().includes('resource directory'))
          .map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Simple, practical guidance you can use right now—without extra friction.</p>
          </Card>
          ))}
      </section>
    </div>
  );
}
