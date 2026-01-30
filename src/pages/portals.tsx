import { Link } from 'react-router-dom';
import SectionSurface from '../components/SectionSurface';
import Card from '../components/Card';
import { useRouteMetadata } from '../routes/meta';

export default function Portals() {
  useRouteMetadata();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold text-ink">Portals</h1>
        <p className="max-w-3xl text-lg text-muted">
          Secure access points for families and service providers. Each portal is tailored to
          specific user roles and provides relevant tools and resources.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Family Portal">
          <div className="space-y-4">
            <p className="text-muted">
              Access family case information, resources, and coordination tools. Available for
              families enrolled in services.
            </p>
            <Link
              to="/family-portal"
              className="inline-block px-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
            >
              Enter Family Portal
            </Link>
          </div>
        </Card>

        <Card title="Provider Portal">
          <div className="space-y-4">
            <p className="text-muted">
              Dashboard for case management, coordination, and provider network tools. Available for
              verified service providers.
            </p>
            <Link
              to="/provider-portal"
              className="inline-block px-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean/90 transition-colors"
            >
              Enter Provider Portal
            </Link>
          </div>
        </Card>
      </div>

      <SectionSurface>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ocean">
            Access and Availability
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Portal access is role-gated and requires authentication. Each portal enforces specific
            user role requirements (family or provider). These systems are currently in phased
            development, with features being deployed incrementally as infrastructure and security
            protocols are finalized.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            If you do not have portal credentials, please contact your case coordinator or reach
            out through our support channels for enrollment information.
          </p>
        </div>
      </SectionSurface>
    </div>
  );
}
