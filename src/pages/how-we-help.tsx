import { useEffect } from 'react';
import Card from '../components/Card';
import { howWeHelpCopy } from '../content/siteCopy';

export default function HowWeHelp() {
  useEffect(() => {
    document.title = 'How We Help | The Father’s Alliance';
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
          <Card key={step} eyebrow={`Step ${index + 1}`} title={step}>
            <p className="text-slate-600">Structured guidance that keeps every requirement organized and on time.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
