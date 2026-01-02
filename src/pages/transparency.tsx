import { useEffect } from 'react';
import Card from '../components/Card';
import { transparencyCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function Transparency() {
  useEffect(() => {
    updatePageMeta({
      title: "Governance and Accountability - Transparency - The Father's Alliance",
      description:
        "The Father's Alliance holds itself to the highest standards of financial and operational transparency. Learn about our governance and nonprofit registration status.",
      path: '/transparency',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Accountability</p>
        <h1 className="text-4xl font-semibold text-slate-900">{transparencyCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{transparencyCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {transparencyCopy.sections.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Detailed reporting will be published as filings finalize.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
