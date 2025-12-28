import { useEffect } from 'react';
import Card from '../components/Card';
import { programsCopy } from '../content/siteCopy';

export default function Programs() {
  useEffect(() => {
    document.title = 'Our Programs | The Father’s Alliance';
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Programs</p>
        <h1 className="text-4xl font-semibold text-slate-900">{programsCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{programsCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {programsCopy.programs.map((program) => (
          <Card key={program} title={program}>
            <p className="text-slate-600">Outcome-driven support with clear milestones and repeatable checklists.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
