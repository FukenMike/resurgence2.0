import { useEffect } from 'react';
import Card from '../components/Card';
import { getInvolvedCopy } from '../content/siteCopy';

export default function GetInvolved() {
  useEffect(() => {
    document.title = 'Get Involved | The Father’s Alliance';
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Partnership</p>
        <h1 className="text-4xl font-semibold text-slate-900">{getInvolvedCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">Join a network focused on stability, not rhetoric.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {getInvolvedCopy.items.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Let’s align on the right contribution and keep families moving forward.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
