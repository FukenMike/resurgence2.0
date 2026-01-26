import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { updatePageMeta } from '../utils/seo';

export default function Providers() {
  useEffect(() => {
    updatePageMeta({
      title: "For Providers - The Father's Alliance",
      description:
        'Information for service providers, community organizations, and partners. Network membership, referral protocols, and collaboration opportunities.',
      path: '/providers',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">For Providers</p>
        <h1 className="text-4xl font-semibold text-ink">Service Provider Resources</h1>
        <p className="max-w-3xl text-lg text-muted">
          Information for community organizations, service providers, and partners interested in collaboration, network
          membership, or referral coordination with The Father's Alliance.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="neutral">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="Provider Network Membership">
            <p className="text-muted mb-3">
              Join the FSIP Provider Network to receive family referrals, coordinate complex cases, and contribute to a
              trusted support ecosystem.
            </p>
            <a
              href="/fsip/provider-network"
              className="mt-4 inline-block rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              Learn About Network →
            </a>
          </Card>

          <Card title="Referral Coordination">
            <p className="text-muted mb-3">
              Coordinate with FSIP components for families requiring multiple services. Unified support approach reduces
              gaps and prevents duplication.
            </p>
            <p className="text-sm text-muted">Referral protocols in development. Check back for updates.</p>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="For Community Organizations" eyebrow="Partnership">
          <p className="text-muted">
            Community groups providing housing support, food assistance, legal aid, or family services can partner with
            FSIP to expand reach and improve coordination.
          </p>
        </Card>

        <Card title="For Clinicians & Counselors" eyebrow="Collaboration">
          <p className="text-muted">
            Mental health providers, social workers, and family counselors can connect clients to FSIP crisis navigation
            and resource hub when stability barriers emerge.
          </p>
        </Card>

        <Card title="For Workforce Programs" eyebrow="Pathways">
          <p className="text-muted">
            Employment services, vocational training, and education programs can receive referrals from Family Repair
            component when households are ready for advancement.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Why Partner With FSIP</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-ink">Reduce Service Gaps</h3>
              <p className="text-muted">
                Coordinated approach ensures families receive comprehensive support. Multiple providers working together
                prevents gaps and identifies needs that might otherwise go unmet.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-ink">Improve Outcomes</h3>
              <p className="text-muted">
                Families receive right services at right time. Progress tracking and accountability increase completion
                rates and long-term stability outcomes.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-ink">Strengthen Referral Flow</h3>
              <p className="text-muted">
                Network providers receive appropriate referrals matched to their service capacity and eligibility
                requirements. Reduces time spent on unsuitable cases.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-ink">Access Data on Needs</h3>
              <p className="text-muted">
                Network partners receive aggregated data on community needs, service gaps, and emerging trends. Inform
                program development and resource allocation.
              </p>
            </div>
          </div>
        </div>
      </SectionSurface>

      <section className="rounded-2xl border border-border-soft bg-sand p-6 md:p-8">
        <h3 className="text-lg font-semibold text-ink">Get Involved</h3>
        <p className="mt-3 text-muted">
          Provider partnership opportunities are opening as FSIP components launch. Organizations interested in early
          partnership should monitor this page for application details and pilot program announcements.
        </p>
        <p className="mt-3 text-muted">
          For general inquiries about provider collaboration, contact{' '}
          <a href="mailto:providers@thefathersalliance.org" className="text-ocean hover:underline">
            providers@thefathersalliance.org
          </a>
        </p>
      </section>
    </div>
  );
}
