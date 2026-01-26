import { useRouteMetadata } from '../routes/meta';

export default function SupportPortal() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Support Portal</p>
        <h1 className="text-4xl font-semibold text-ink">Provider Support Portal</h1>
        <p className="max-w-3xl text-lg text-muted">
          Provider and partner portal for case coordination, referral management, and network communication. Portal
          launching with FSIP provider network.
        </p>
      </section>

      <section className="rounded-2xl border border-border-soft bg-sand p-8 md:p-12">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-surface flex items-center justify-center">
            <svg
              className="h-12 w-12 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-ink">Portal In Development</h2>
          <p className="text-muted">
            The Support Portal is being built for FSIP Provider Network members and community partners. Access will be
            granted to verified network providers when portal launches.
          </p>
          <p className="text-muted">
            Portal features will include: referral management, case coordination tools, resource directory updates,
            outcome reporting, and secure messaging with FSIP coordinators.
          </p>
          <div className="mt-8 rounded-lg border border-border-soft bg-surface p-6">
            <h3 className="font-semibold text-ink">For Prospective Network Providers</h3>
            <p className="mt-3 text-sm text-muted">
              Organizations interested in Provider Network membership should visit the{' '}
              <a href="/providers" className="text-ocean hover:underline">
                Provider Resources
              </a>{' '}
              page for partnership information. Portal access will be provided as part of network onboarding.
            </p>
            <p className="mt-3 text-sm text-muted">
              Early network partners will help shape portal features, referral workflows, and coordination protocols.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
