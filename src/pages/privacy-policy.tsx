import { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';

export default function PrivacyPolicy() {
  useEffect(() => {
    updatePageMeta({
      title: "Privacy Policy - The Father's Alliance",
      description:
        'Privacy practices for how The Father’s Alliance collects, uses, and protects information across services and communications.',
      path: '/privacy-policy',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Policy</p>
        <h1 className="text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="max-w-3xl text-lg text-muted">
          This policy explains how The Father’s Alliance handles information to operate services responsibly and protect household dignity.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Information We Collect</h2>
          <p className="text-muted">
            We collect only the information needed to provide services, communicate with you, and improve operations. This may include contact details, basic household context, and service interaction records you provide.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">How Information Is Used</h2>
          <p className="text-muted">
            Information is used to deliver requested support, coordinate services, communicate updates, and improve program quality. We do not sell personal information.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Data Sharing</h2>
          <p className="text-muted">
            We share information only when necessary to fulfill a requested service, comply with law, protect safety, or operate with trusted providers under confidentiality expectations.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Data Security</h2>
          <p className="text-muted">
            We use reasonable administrative, technical, and physical safeguards to protect information. No method is perfectly secure, and we continuously work to improve protections.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Third-Party Services</h2>
          <p className="text-muted">
            When third-party tools support our operations, we select providers that align with privacy and security expectations. Their use is limited to service delivery and operational needs.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Updates</h2>
          <p className="text-muted">
            We may update this policy to reflect operational, legal, or service changes. We will note the effective date when updates occur.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-ink">Contact Information</h2>
          <p className="text-muted">
            Questions about this policy: <a className="text-ocean hover:underline" href="mailto:support@thefathersalliance.org">support@thefathersalliance.org</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
