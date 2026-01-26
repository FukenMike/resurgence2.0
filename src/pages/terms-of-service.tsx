import { useRouteMetadata } from '../routes/meta';

export default function TermsOfService() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Terms</p>
        <h1 className="text-4xl font-semibold text-ink">Terms of Service</h1>
        <p className="max-w-3xl text-lg text-muted">
          These terms govern use of The Father’s Alliance site and services. Please review them carefully.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Purpose</h2>
          <p className="text-muted">
            Our services aim to support stability for families. Use of the site and services must align with this purpose and comply with these terms.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Donations</h2>
          <p className="text-muted">
            Donations are generally non-refundable unless required by law. If you believe an error occurred, contact us for review.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">No Professional Advice</h2>
          <p className="text-muted">
            Information we provide is for general guidance. It is not legal, financial, medical, or professional advice. Always consult a qualified professional for advice specific to your situation.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Acceptable Use</h2>
          <p className="text-muted">
            You agree not to misuse the site or services, interfere with operations, attempt unauthorized access, or use the services in ways that violate law or these terms.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Intellectual Property</h2>
          <p className="text-muted">
            Site content, branding, and materials are owned by The Father’s Alliance or its licensors. You may not copy, distribute, or create derivative works without permission.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Limitation of Liability</h2>
          <p className="text-muted">
            Services are provided as-is and as-available. To the extent permitted by law, we are not liable for indirect or consequential damages arising from use of the site or services.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Changes</h2>
          <p className="text-muted">
            We may update these terms to reflect operational or legal changes. Continued use after updates indicates acceptance of the revised terms.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Contact Information</h2>
          <p className="text-muted">
            Questions about these terms: <a className="text-ocean hover:underline" href="mailto:support@thefathersalliance.org">support@thefathersalliance.org</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
