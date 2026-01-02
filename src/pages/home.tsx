import { useEffect } from 'react';
import Card from '../components/Card';
import { homeCopy } from '../content/siteCopy';
import { Link } from 'react-router-dom';
import { updatePageMeta, getOrganizationSchema, getWebsiteSchema, injectStructuredData } from '../utils/seo';

export default function Home() {
  useEffect(() => {
    updatePageMeta({
      title: "The Father's Alliance - Stability Support That Keeps Families Moving Forward",
      description:
        'Supplemental, practical stability support for households when traditional assistance is delayed, unavailable, or exhausted. Helping families stay housed, mobile, and moving forward.',
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Supplemental stability support</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">{homeCopy.headline}</h1>
          <p className="max-w-2xl text-lg text-slate-600">{homeCopy.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/get-involved"
              className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-700"
            >
              Get Involved
            </Link>
            <Link
              to="/how-we-help"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-[1px] hover:border-slate-300 hover:bg-white"
            >
              How We Help
            </Link>
          </div>
        </div>
        <div className="card-surface relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50" aria-hidden />
          <div className="relative space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Mission</h2>
            <p className="text-slate-600">{homeCopy.mission}</p>
            <h2 className="text-xl font-semibold text-slate-900">Vision</h2>
            <p className="text-slate-600">{homeCopy.vision}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card eyebrow="Core Values" title="How we show up">
          <ul className="mt-2 space-y-3 text-slate-600">
            {homeCopy.coreValues.map((value) => (
              <li key={value} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card eyebrow="Service Pillars" title="What we deliver">
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {homeCopy.pillars.map((pillar) => (
              <div key={pillar} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                {pillar}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
