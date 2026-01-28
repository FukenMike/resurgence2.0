import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { homeCopy } from '../content/siteCopy';
import { Link } from 'react-router-dom';
import { updatePageMeta, getOrganizationSchema, getWebsiteSchema, injectStructuredData } from '../utils/seo';

export default function Home() {
  useEffect(() => {
    updatePageMeta({
      title: "The Father's Alliance — Stability Support That Keeps Families Moving Forward",
      description:
        "We provide practical stability support that keeps households housed, mobile, and moving forward—especially when standard assistance is slow or out of reach.",
      path: '/',
    });
    // Inject organization and website schema
    injectStructuredData(getOrganizationSchema(), 'org-schema');
    injectStructuredData(getWebsiteSchema(), 'website-schema');
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Supplemental stability support</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{homeCopy.headline}</h1>
          <p className="max-w-2xl text-lg text-muted">{homeCopy.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/get-involved"
              className="rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-ocean/90"
            >
              Get Involved
            </Link>
            <Link
              to="/how-we-help"
              className="rounded-full border border-border-soft px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-[1px] hover:border-border-muted hover:bg-surface-muted"
            >
              How We Help
            </Link>
          </div>
        </div>
        <div className="card-surface relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-sand via-surface to-surface-muted" aria-hidden />
          <div className="relative space-y-4">
            <h2 className="text-xl font-semibold text-ink">Mission</h2>
            <p className="text-muted">{homeCopy.mission}</p>
            <h2 className="text-xl font-semibold text-ink">Vision</h2>
            <p className="text-muted">{homeCopy.vision}</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border-soft bg-surface-muted p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean mb-2">About This Initiative</p>
        <p className="text-lg text-ink leading-relaxed">
          The Father's Alliance is a platform being built to operate as a fully functional humanitarian organization once the right people, funding, and partnerships are in place.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="accent" tone="verified">
        <section className="grid gap-6 md:grid-cols-2">
          <Card eyebrow="Core Values" title="How we show up">
            <ul className="mt-2 space-y-3 text-muted">
              {homeCopy.coreValues.map((value) => (
                <li key={value} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-forest" aria-hidden />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card eyebrow="Service Pillars" title="What we deliver">
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {homeCopy.pillars.map((pillar) => (
                <div key={pillar} className="rounded-xl border border-border-soft bg-surface-muted px-4 py-3 text-sm font-semibold text-ink">
                  {pillar}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </SectionSurface>
    </div>
  );
}
