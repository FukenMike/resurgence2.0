import { useEffect } from 'react';
import Card from '../components/Card';
import { resourcesCopy } from '../content/siteCopy';

export default function Resources() {
  useEffect(() => {
    document.title = 'Resources | The Father’s Alliance';
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Resources</p>
        <h1 className="text-4xl font-semibold text-slate-900">{resourcesCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">Tools to keep families organized and prepared.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {resourcesCopy.items.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Practical, neutral guidance that can be used today.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
