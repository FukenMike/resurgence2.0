import Card from '../components/Card';
import { transparencyCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function Transparency() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Accountability</p>
        <h1 className="text-4xl font-semibold text-ink">{transparencyCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{transparencyCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {transparencyCopy.sections.map((item) => (
          <Card key={item} title={item}>
            <p className="text-muted">Detailed reporting will be published as filings finalize.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
