import { useEffect } from 'react';
import Card from '../components/Card';
import { howWeHelpCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function HowWeHelp() {
  useEffect(() => {
    updatePageMeta({
      title: "How Support Works - The Father's Alliance",
      description:
        'Our support process: intake and assessment, stability identification, rapid deployment of assistance, and connection to longer-term pathways.',
      path: '/how-we-help',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Approach</p>
        <h1 className="text-4xl font-semibold text-slate-900">{howWeHelpCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{howWeHelpCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {howWeHelpCopy.process.map((step, index) => (
          <Card key={step.title} eyebrow={`Step ${index + 1}`} title={step.title}>
            <p className="text-slate-600">{step.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
