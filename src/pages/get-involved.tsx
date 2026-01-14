import { useEffect } from 'react';
import Card from '../components/Card';
import { getInvolvedCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function GetInvolved() {
  useEffect(() => {
    updatePageMeta({
      title: "Get Involved - Support The Father's Alliance",
      description:
        "Support the work that fills the gaps—fund active infrastructure, contribute without money, and help strengthen what's being built.",
      path: '/get-involved',
    });
  }, []);

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
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{getInvolvedCopy.hero.eyebrow}</p>
        <h1 className="text-4xl font-semibold text-slate-900">{getInvolvedCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{getInvolvedCopy.hero.subheadline}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {getInvolvedCopy.cards.map((card) => (
          <Card key={card.title} title={card.title}>
            <p className="text-slate-600">{card.body}</p>
          </Card>
        ))}
      </section>
      <section id="support-our-work" className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">{getInvolvedCopy.support.sectionTitle}</h2>
          <p className="max-w-3xl text-slate-600">
            {getInvolvedCopy.support.sectionBody}
          </p>
        </div>

        <div className="card-surface max-w-2xl space-y-4 p-6 md:p-8">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Support Active Work</h3>
            <p className="text-sm text-slate-600">
              Choose the support route that fits. Stripe is the fastest. GoFundMe is available for broader sharing.
            </p>
          </div>

          {/* Dual CTAs: Stripe + GoFundMe */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getInvolvedCopy.support.stripe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-700"
              aria-label="Donate via Stripe"
            >
              {getInvolvedCopy.support.stripe.label}
            </a>
            <a
              href={getInvolvedCopy.support.gofundme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-400 hover:bg-slate-50"
              aria-label="Donate via GoFundMe"
            >
              {getInvolvedCopy.support.gofundme.label}
            </a>
            <span className="text-xs text-slate-500">{getInvolvedCopy.support.stripe.note}</span>
          </div>

          {/* Optional GoFundMe embed (feature-flagged) */}
          {getInvolvedCopy.support.embed.enabled && (
            <div className="gfm-embed" data-url={getInvolvedCopy.support.embed.widgetUrl}></div>
          )}

          <p className="text-xs text-slate-500">
            Donations are generally non-refundable unless required by law. Questions? Contact{' '}
            <a href="mailto:support@thefathersalliance.org" className="text-sky-700 hover:underline">
              support@thefathersalliance.org
            </a>
            .
          </p>
        </div>
      </section>    </div>
  );
}
