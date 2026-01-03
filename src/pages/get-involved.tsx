import { useEffect } from 'react';
import Card from '../components/Card';
import { getInvolvedCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function GetInvolved() {
  useEffect(() => {
    updatePageMeta({
      title: "Get Involved - Partner With The Father's Alliance",
      description:
        'Join our network focused on stability. Explore professional partnerships, volunteer opportunities, and corporate giving options.',
      path: '/get-involved',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Partnership</p>
        <h1 className="text-4xl font-semibold text-slate-900">{getInvolvedCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">Join a network focused on stability, not rhetoric.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {getInvolvedCopy.items.map((item) => (
          <Card key={item} title={item}>
            <p className="text-slate-600">Let’s align on the right contribution and keep families moving forward.</p>
          </Card>
        ))}
      </section>
      <section id="support-our-work" className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">Support Our Work</h2>
          <p className="max-w-3xl text-slate-600">
            Donations support infrastructure, verification processes, and program development that help us provide timely, practical stability support. Your contribution helps keep families housed, mobile, and moving forward.
          </p>
        </div>

        <div className="card-surface max-w-2xl space-y-4 p-6 md:p-8">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Make a Donation</h3>
            <p className="text-sm text-slate-600">
              Your support helps us respond quickly when traditional assistance is delayed, unavailable, or exhausted.
            </p>
          </div>

          {/* TODO: Replace this placeholder button with Stripe Payment Link or embedded checkout */}
          {/* Stripe integration placeholder - button will be replaced with actual payment mechanism */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // TODO: This placeholder will be replaced with Stripe payment link/checkout
                console.warn('Stripe integration pending');
              }}
              className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-700"
              aria-label="Donate to support our work"
            >
              Donate
            </button>
            <span className="text-xs text-slate-500">Secure donation processing</span>
          </div>

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
