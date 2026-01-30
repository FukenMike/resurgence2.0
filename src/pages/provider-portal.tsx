import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useRouteMetadata } from '../routes/meta';

export default function ProviderPortal() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Provider Portal</p>
        <h1 className="text-4xl font-semibold text-ink">Provider Support Portal</h1>
        <p className="max-w-3xl text-lg text-muted">
          This portal is being developed in phases for FSIP Provider Network members and community partners. Features will become available incrementally as infrastructure is deployed.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Referral Management">
          <p className="text-sm text-muted mb-3">Receive, review, and manage referrals from FSIP coordinators.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Case Coordination">
          <p className="text-sm text-muted mb-3">Coordinate with other providers and FSIP team on active cases.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Resource Directory">
          <p className="text-sm text-muted mb-3">Update your service listings and availability in the provider network.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Outcome Reporting">
          <p className="text-sm text-muted mb-3">Submit service outcomes and impact reports for program evaluation.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Secure Messaging">
          <p className="text-sm text-muted mb-3">Communicate securely with FSIP coordinators and network partners.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Portal Home">
          <p className="text-sm text-muted mb-3">Return to the portals overview page.</p>
          <Link
            to="/portals"
            className="inline-block px-4 py-2 text-sm font-medium bg-ocean text-white rounded hover:bg-ocean/90 transition-colors"
          >
            Go to Portals
          </Link>
        </Card>
      </section>

      <section className="rounded-lg border border-border-soft bg-sand p-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-ink">Development Roadmap</h2>
          <p className="text-sm text-muted">
            Portal features are being built incrementally. Verified network providers will receive access credentials as modules become available.
          </p>
          <a
            href="https://github.com/users/YOUR_USERNAME/projects/YOUR_PROJECT_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-ocean hover:text-ocean/80 transition-colors"
          >
            View Public Roadmap →
          </a>
        </div>
      </section>
    </div>
  );
}
