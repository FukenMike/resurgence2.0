import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { updatePageMeta } from '../utils/seo';

export default function FSIPFamilyRepair() {
  useEffect(() => {
    updatePageMeta({
      title: "FSIP Family Repair - The Father's Alliance",
      description:
        'Structured support for households recovering from crisis or instability. Coordination of multiple services, follow-up check-ins, and pathways to long-term stability.',
      path: '/fsip/family-repair',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">FSIP Component</p>
        <h1 className="text-4xl font-semibold text-ink">Family Repair</h1>
        <p className="max-w-3xl text-lg text-muted">
          Structured support for households recovering from crisis or instability. Coordination of multiple services,
          follow-up check-ins, and pathways to long-term stability and self-sufficiency.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="neutral">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="When Family Repair Is Appropriate">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Family has stabilized immediate crisis but needs ongoing coordination</li>
              <li>Multiple service providers involved requiring unified approach</li>
              <li>Household faces complex barriers to stability (not single-issue)</li>
              <li>Risk of re-crisis without structured support and accountability</li>
            </ul>
          </Card>

          <Card title="What Family Repair Provides" eyebrow="Support Structure">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Service coordination across multiple providers</li>
              <li>Regular check-ins to monitor progress and identify emerging issues</li>
              <li>Connection to workforce, education, and training pathways</li>
              <li>Documentation support for benefits and assistance programs</li>
              <li>Transition planning toward household self-sufficiency</li>
            </ul>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Coordination Role" eyebrow="Function">
          <p className="text-muted">
            Family Repair acts as a coordination hub when multiple providers are involved. Ensures communication flows,
            gaps are identified, and services complement rather than duplicate.
          </p>
        </Card>

        <Card title="Progress Tracking" eyebrow="Accountability">
          <p className="text-muted">
            Regular check-ins establish accountability and catch emerging issues before they escalate. Families know
            what steps are expected and when follow-up will occur.
          </p>
        </Card>

        <Card title="Path to Independence" eyebrow="Transition">
          <p className="text-muted">
            Support gradually reduces as household stability increases. Families transition to self-management with
            resource connections maintained for future needs.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Family Repair Timeline</h2>
          <p className="text-muted">
            Family Repair engagements typically span 3-6 months, though duration varies based on household needs and
            complexity. Support intensity decreases over time as stability strengthens.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Months 1-2</div>
              <h3 className="mt-2 font-semibold text-ink">Intensive Phase</h3>
              <p className="mt-2 text-sm text-muted">
                Weekly check-ins. Active service coordination. Immediate barrier removal. Resource connection and
                documentation support.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Months 3-4</div>
              <h3 className="mt-2 font-semibold text-ink">Stabilization Phase</h3>
              <p className="mt-2 text-sm text-muted">
                Bi-weekly check-ins. Monitoring for emerging issues. Workforce/education pathway development. Service
                coordination as needed.
              </p>
            </div>

            <div className="rounded-lg border border-border-soft bg-surface p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Months 5-6</div>
              <h3 className="mt-2 font-semibold text-ink">Transition Phase</h3>
              <p className="mt-2 text-sm text-muted">
                Monthly check-ins. Self-management emphasis. Transition planning. Resource connections maintained for
                future use.
              </p>
            </div>
          </div>
        </div>
      </SectionSurface>

      <section className="space-y-4">
        <Card title="Success Metrics" eyebrow="Outcomes">
          <p className="text-muted mb-4">
            Family Repair success is measured by stability maintenance, barrier reduction, and household
            self-sufficiency progress:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Housing stability maintained throughout engagement period</li>
            <li>Income or benefits secured and sustained</li>
            <li>Emergency resources accessed without crisis escalation</li>
            <li>Workforce or education pathway initiated</li>
            <li>Household transitions to independent management</li>
          </ul>
        </Card>
      </section>

      <section className="rounded-2xl border border-border-soft bg-sand p-6 md:p-8">
        <h3 className="text-lg font-semibold text-ink">Development Status</h3>
        <p className="mt-3 text-muted">
          Family Repair protocols are being designed based on case management best practices and community feedback.
          Launch requires provider network establishment, check-in workflow development, and pilot testing with
          volunteer households.
        </p>
      </section>
    </div>
  );
}
