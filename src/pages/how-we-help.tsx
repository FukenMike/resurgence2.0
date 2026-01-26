import Card from '../components/Card';
import { howWeHelpCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function HowWeHelp() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Approach</p>
        <h1 className="text-4xl font-semibold text-ink">{howWeHelpCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{howWeHelpCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {howWeHelpCopy.process.map((step, index) => (
          <Card key={step.title} eyebrow={`Step ${index + 1}`} title={step.title}>
            <p className="text-muted">{step.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
