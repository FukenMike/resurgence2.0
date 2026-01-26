import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { useRouteMetadata } from '../routes/meta';

export default function FSIPCrisisNavigation() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">FSIP Component</p>
        <h1 className="text-4xl font-semibold text-ink">Crisis Navigation</h1>
        <p className="max-w-3xl text-lg text-muted">
          Immediate triage and support when families face urgent threats to housing, utilities, transportation, or
          safety. Quick assessment and connection to appropriate resources with clear next steps.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="accent">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="What Crisis Navigation Addresses">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Imminent eviction or housing loss</li>
              <li>Utility disconnection or service shutoff</li>
              <li>Vehicle breakdown affecting work or caregiving</li>
              <li>Sudden income loss or emergency expenses</li>
              <li>Safety concerns requiring immediate attention</li>
            </ul>
          </Card>

          <Card title="How It Works" eyebrow="Process">
            <div className="space-y-3 text-muted">
              <p>
                <strong className="text-ink">Rapid Assessment:</strong> Evaluate urgency and identify immediate threats
                to household stability.
              </p>
              <p>
                <strong className="text-ink">Resource Connection:</strong> Direct families to appropriate emergency
                services, community programs, or assistance options.
              </p>
              <p>
                <strong className="text-ink">Clear Next Steps:</strong> Provide specific actions, contact information,
                and timelines for follow-up.
              </p>
            </div>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Triage Criteria" eyebrow="Assessment">
          <p className="text-muted">
            Situations are evaluated based on timeline (hours, days, weeks), severity of potential harm, and
            availability of alternative support. This determines response priority and resource allocation.
          </p>
        </Card>

        <Card title="Resource Matching" eyebrow="Connection">
          <p className="text-muted">
            Families are connected to resources best suited to their specific situation. Geographic availability,
            eligibility requirements, and provider capacity are considered in matching.
          </p>
        </Card>

        <Card title="Follow-Up Support" eyebrow="Continuity">
          <p className="text-muted">
            Crisis navigation includes check-ins to confirm resource connection and assess if additional support is
            needed. Families may transition to Family Repair component for ongoing stability work.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Crisis Navigation Flow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Phase 1</div>
              <h3 className="mt-2 font-semibold text-ink">Initial Contact</h3>
              <p className="mt-2 text-sm text-muted">
                Family describes situation. Key details gathered: nature of crisis, timeline, household composition.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Phase 2</div>
              <h3 className="mt-2 font-semibold text-ink">Urgency Triage</h3>
              <p className="mt-2 text-sm text-muted">
                Assess immediate danger and timeline. Determine if crisis-level response required or standard support
                sufficient.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Phase 3</div>
              <h3 className="mt-2 font-semibold text-ink">Resource Deployment</h3>
              <p className="mt-2 text-sm text-muted">
                Connect to appropriate providers. Facilitate introductions. Provide contact information and access
                instructions.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Phase 4</div>
              <h3 className="mt-2 font-semibold text-ink">Confirmation</h3>
              <p className="mt-2 text-sm text-muted">
                Follow up within 24-48 hours. Verify resource connection. Assess if additional support needed.
              </p>
            </div>
          </div>
        </div>
      </SectionSurface>

      <section className="rounded-2xl border border-border-soft bg-sand p-6 md:p-8">
        <h3 className="text-lg font-semibold text-ink">Development Status</h3>
        <p className="mt-3 text-muted">
          Crisis Navigation protocols are being developed and tested. Launch will require confirmed provider
          partnerships, intake channel setup, and staff training on triage procedures.
        </p>
      </section>
    </div>
  );
}
