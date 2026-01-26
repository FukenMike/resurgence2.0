import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { getInvolvedCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function GetInvolved() {
  useRouteMetadata();

  // Load GoFundMe embed script if enabled
  useEffect(() => {
    if (getInvolvedCopy.support.embed.enabled) {
      const scriptId = getInvolvedCopy.support.embed.scriptId;
      
      // Only inject if not already present
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = getInvolvedCopy.support.embed.scriptUrl;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">{getInvolvedCopy.hero.eyebrow}</p>
        <h1 className="text-4xl font-semibold text-ink">{getInvolvedCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{getInvolvedCopy.hero.subheadline}</p>
      </section>

      <SectionSurface variant="muted">
        <section className="grid gap-4 md:grid-cols-3">
          {getInvolvedCopy.cards.map((card) => (
            <Card key={card.title} title={card.title}>
              <p className="text-muted">{card.body}</p>
            </Card>
          ))}
        </section>
      </SectionSurface>
      <SectionSurface variant="accent">
        <section id="support-our-work" className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">{getInvolvedCopy.support.sectionTitle}</h2>
            <p className="max-w-3xl text-muted">
              {getInvolvedCopy.support.sectionBody}
            </p>
          </div>

        <div className="card-surface max-w-2xl space-y-4 p-6 md:p-8">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink">Support Active Work</h3>
            <p className="text-sm text-muted">
              Choose the support route that fits. Stripe is the fastest. GoFundMe is available for broader sharing.
            </p>
          </div>

          {/* Dual CTAs: Stripe + GoFundMe */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getInvolvedCopy.support.stripe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-ocean/90"
              aria-label="Donate via Stripe"
            >
              {getInvolvedCopy.support.stripe.label}
            </a>
            <a
              href={getInvolvedCopy.support.gofundme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-soft px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-[1px] hover:border-border-muted hover:bg-surface-muted"
              aria-label="Donate via GoFundMe"
            >
              {getInvolvedCopy.support.gofundme.label}
            </a>
            <span className="text-xs text-muted">{getInvolvedCopy.support.stripe.note}</span>
          </div>

          <div className="space-y-3 text-sm text-muted">
            <p>
              <strong className="font-semibold text-ink">Stripe donations</strong> support mission resources and program development, including infrastructure, research, verification work, and system and tool development.
            </p>
            <p>
              <strong className="font-semibold text-ink">GoFundMe contributions</strong> help cover essential equipment and tools needed to build and maintain the systems behind The Father's Alliance.
            </p>
          </div>

          {/* Optional GoFundMe embed (feature-flagged) */}
          {getInvolvedCopy.support.embed.enabled && (
            <div className="gfm-embed" data-url={getInvolvedCopy.support.embed.widgetUrl}></div>
          )}

          <p className="text-xs text-muted">
            Donations are generally non-refundable unless required by law. Questions? Contact{' '}
            <a href="mailto:support@thefathersalliance.org" className="text-ocean hover:underline">
              support@thefathersalliance.org
            </a>
            .
          </p>
        </div>
        </section>
      </SectionSurface>
    </div>
  );
}
