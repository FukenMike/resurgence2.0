import { useEffect } from 'react';
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
        {resourcesCopy.items.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Simple, practical guidance you can use right now—without extra friction.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
