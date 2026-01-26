import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { programsCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function Programs() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Programs</p>
        <h1 className="text-4xl font-semibold text-ink">{programsCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{programsCopy.body}</p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="neutral">
        <section className="grid gap-4 md:grid-cols-2">
          {programsCopy.programs.map((program) => (
            program.href ? (
              <Link
                key={program.title}
                to={program.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <Card title={program.title} eyebrow={program.status}>
                  <div className="space-y-3">
                    <p className="text-muted">{program.summary}</p>
                    <p className="text-sm font-semibold text-ocean">Learn more →</p>
                  </div>
                </Card>
              </Link>
            ) : (
              <div key={program.title} className="opacity-60 cursor-not-allowed">
                <Card title={program.title} eyebrow={program.status}>
                  <div className="space-y-3">
                    <p className="text-muted">{program.summary}</p>
                    <p className="text-sm font-semibold text-muted">Details coming soon</p>
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
