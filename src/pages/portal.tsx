import { useRouteMetadata } from '../routes/meta';

export default function Portal() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Family Portal</p>
        <h1 className="text-4xl font-semibold text-ink">Family Support Portal</h1>
        <p className="max-w-3xl text-lg text-muted">
          Access your support account, view resources, and track progress. Portal launching with FSIP rollout.
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-ink">Portal In Development</h2>
          <p className="text-muted">
            The Family Portal is being built as part of FSIP rollout. Families enrolled in FSIP programs will receive
            access credentials when portal launches.
          </p>
          <p className="text-muted">
            Portal features will include: resource access, appointment scheduling, document upload, progress tracking,
            and secure messaging with support coordinators.
          </p>
          <div className="mt-8 rounded-lg border border-border-soft bg-surface p-6">
            <h3 className="font-semibold text-ink">When Will Portal Launch?</h3>
            <p className="mt-3 text-sm text-muted">
              Portal launch is tied to FSIP component activation. Families working with Crisis Navigation or Family
              Repair will be first to receive access. Timeline depends on completing pilot testing and infrastructure
              setup.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
