import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { programsCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function Programs() {
  useEffect(() => {
    updatePageMeta({
      title: "Stability Programs and Pilots - The Father's Alliance",
      description:
        'Our programs focus on real-life pressure points that can knock a household off track. Includes Mobility Stabilization, Household Micro-Assistance, and Forward Pathways Bridge.',
      path: '/programs',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Programs</p>
        <h1 className="text-4xl font-semibold text-slate-900">{programsCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{programsCopy.body}</p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="neutral">
        <section className="grid gap-4 md:grid-cols-2">
          {programsCopy.programs.map((program) => (
            program.href ? (
              <Link
                key={program.title}
                to={program.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                <Card title={program.title} eyebrow={program.status}>
                  <div className="space-y-3">
                    <p className="text-slate-600">{program.summary}</p>
                    <p className="text-sm font-semibold text-sky-700">Learn more →</p>
                  </div>
                </Card>
              </Link>
            ) : (
              <div key={program.title} className="opacity-60 cursor-not-allowed">
                <Card title={program.title} eyebrow={program.status}>
                  <div className="space-y-3">
                    <p className="text-slate-600">{program.summary}</p>
                    <p className="text-sm font-semibold text-slate-500">Details coming soon</p>
                  </div>
                </Card>
              </div>
            )
          ))}
        </section>
      </SectionSurface>
    </div>
  );
}
