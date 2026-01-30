import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useRouteMetadata } from '../routes/meta';

export default function FamilyPortal() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Family Portal</p>
        <h1 className="text-4xl font-semibold text-ink">Family Support Portal</h1>
        <p className="max-w-3xl text-lg text-muted">
          This portal is being developed in phases as part of FSIP infrastructure rollout. Features will become available incrementally as systems are tested and deployed.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="My Resources">
          <p className="text-sm text-muted mb-3">Access personalized resource recommendations and saved services.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Appointments">
          <p className="text-sm text-muted mb-3">Schedule and manage appointments with coordinators and service providers.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Documents">
          <p className="text-sm text-muted mb-3">Securely upload and view case-related documents and forms.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Messages">
          <p className="text-sm text-muted mb-3">Secure messaging with your FSIP coordinator and support team.</p>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-muted text-muted rounded">
            Coming Soon
          </span>
        </Card>

        <Card title="Progress Tracking">
          <p className="text-sm text-muted mb-3">View milestones, goals, and progress through your support plan.</p>
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
            Portal features are being built incrementally. Families enrolled in FSIP will receive access credentials as modules become available.
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
