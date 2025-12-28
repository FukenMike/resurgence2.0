import { useEffect } from 'react';
import Card from '../components/Card';
import { aboutCopy } from '../content/siteCopy';

export default function About() {
  useEffect(() => {
    document.title = 'About | The Father’s Alliance';
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">About</p>
        <h1 className="text-4xl font-semibold text-slate-900">{aboutCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{aboutCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Our philosophy">
          <p className="text-slate-600">{aboutCopy.philosophy}</p>
        </Card>
        <Card title="Accountability first">
          <p className="text-slate-600">We measure success by reliability: on-time paperwork, clear communication, and steady presence for children.</p>
        </Card>
      </section>
    </div>
  );
}
