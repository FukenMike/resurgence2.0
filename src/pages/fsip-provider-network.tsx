import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { updatePageMeta } from '../utils/seo';

export default function FSIPProviderNetwork() {
  useEffect(() => {
    updatePageMeta({
      title: "FSIP Provider Network - The Father's Alliance",
      description:
        'Trusted network of verified providers delivering consistent, quality support. Partnership criteria, provider benefits, and network membership information.',
      path: '/fsip/provider-network',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">FSIP Component</p>
        <h1 className="text-4xl font-semibold text-ink">Provider Network</h1>
        <p className="max-w-3xl text-lg text-muted">
          A trusted network of verified providers delivering consistent, quality support to families. Partnership
          ensures reliable service delivery, clear communication, and outcome tracking.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="accent">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="Network Purpose">
            <p className="text-muted mb-3">
              The Provider Network ensures families receive quality support from vetted, responsive providers. Network
              membership signifies:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Verified contact information and service availability</li>
              <li>Documented service scope and eligibility requirements</li>
              <li>Commitment to responsive communication</li>
              <li>Participation in outcome tracking and feedback</li>
            </ul>
          </Card>

          <Card title="Provider Benefits" eyebrow="Membership Value">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Referrals from FSIP Crisis Navigation and Family Repair</li>
              <li>Visibility in Resource Hub directory</li>
              <li>Coordination support for complex cases</li>
              <li>Data on service gaps and community needs</li>
              <li>Recognition for consistent quality delivery</li>
            </ul>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Partnership Criteria" eyebrow="Membership">
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Established service delivery history</li>
            <li>Clear eligibility and access requirements</li>
            <li>Responsive communication standards</li>
            <li>Willingness to participate in outcome tracking</li>
            <li>Commitment to dignity-centered service</li>
          </ul>
        </Card>

        <Card title="Network Categories" eyebrow="Organization">
          <p className="text-muted">
            Providers are organized by service type: emergency assistance, housing support, legal aid, healthcare,
            employment services, food assistance, mental health, and specialized family support.
          </p>
        </Card>

        <Card title="Quality Standards" eyebrow="Expectations">
          <p className="text-muted">
            Network providers maintain current contact information, communicate service changes promptly, and respond to
            referrals within documented timeframes. Performance is tracked and reviewed regularly.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">How Providers Join the Network</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 1</div>
              <h3 className="mt-2 font-semibold text-ink">Initial Contact</h3>
              <p className="mt-2 text-sm text-muted">
                Provider submits partnership inquiry with organization details, service scope, and geographic coverage.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 2</div>
              <h3 className="mt-2 font-semibold text-ink">Verification</h3>
              <p className="mt-2 text-sm text-muted">
                Contact information confirmed. Service availability and eligibility requirements documented. References
                checked if new to area.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 3</div>
              <h3 className="mt-2 font-semibold text-ink">Partnership Agreement</h3>
              <p className="mt-2 text-sm text-muted">
                Communication standards established. Outcome tracking protocols agreed. Network expectations reviewed
                and confirmed.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 4</div>
              <h3 className="mt-2 font-semibold text-ink">Network Activation</h3>
              <p className="mt-2 text-sm text-muted">
                Provider added to Resource Hub. Referral channels activated. Ongoing coordination and feedback begin.
              </p>
            </div>
          </div>
        </div>
      </SectionSurface>

      <section className="rounded-2xl border border-border-soft bg-sand p-6 md:p-8">
        <h3 className="text-lg font-semibold text-ink">For Providers Interested in Partnership</h3>
        <p className="mt-3 text-muted">
          The Provider Network is being established as FSIP components are developed. Organizations interested in
          partnership should monitor this page for application details. Priority will be given to providers serving
          geographic areas and need categories with current service gaps.
        </p>
        <p className="mt-3 text-muted">
          Early partnerships will help shape network standards, referral protocols, and outcome tracking systems.
          Feedback from pilot providers will inform network expansion.
        </p>
      </section>
    </div>
  );
}
