import { useEffect } from 'react';
import Card from '../components/Card';
import { whoWeServeCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function WhoWeServe() {
  useEffect(() => {
    updatePageMeta({
      title: "Who We Serve - The Father's Alliance",
      description:
        "The Father's Alliance serves fathers, caregivers, and families facing stability threats including rent, utilities, transportation, or sudden financial strain.",
      path: '/who-we-serve',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Who we serve</p>
        <h1 className="text-4xl font-semibold text-slate-900">{whoWeServeCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{whoWeServeCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {whoWeServeCopy.focusAreas.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">We meet families where they are and tailor support around their context.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
