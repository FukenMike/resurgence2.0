import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { resourcesCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function Resources() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Resources</p>
        <h1 className="text-4xl font-semibold text-ink">{resourcesCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">Practical tools that support stability, planning, and progress.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {/* Resource Directory card now links to the dedicated directory experience */}
        <Card title="Resource Directory">
          <p className="text-muted">
            Browse verified resources with search, filters, and community feedback.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              to="/resources/directory"
              className="inline-flex items-center rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-ocean/90"
            >
              Open Directory
            </Link>
            <span className="text-xs uppercase tracking-[0.12em] text-ocean">New</span>
          </div>
        </Card>

        {resourcesCopy.items
          .filter((item) => !item.toLowerCase().includes('resource directory'))
          .map((item) => (
          <Card key={item} title={item}>
            <p className="text-muted">Simple, practical guidance you can use right now—without extra friction.</p>
          </Card>
          ))}
      </section>
    </div>
  );
}
