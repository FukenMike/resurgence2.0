/** @jsxImportSource react */
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { useRouteMetadata } from '../routes/meta';

export default function ProgramFSIP() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Program</p>
        <h1 className="text-4xl font-semibold text-ink">Family Stability Intervention Program (FSIP)</h1>
        <p className="max-w-3xl text-lg text-muted">
          A coordinated support framework that helps families navigate crisis moments, repair household stability, and
          access verified resources through a trusted provider network.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="accent" tone="verified">
        <section className="grid gap-4 md:grid-cols-2">
          <Card eyebrow="Core Components" title="What FSIP Provides">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Crisis navigation support when families face urgent stability threats</li>
              <li>Verified resource hub with vetted providers and community services</li>
              <li>Family repair coordination for post-crisis household rebuilding</li>
              <li>Provider network access for consistent, quality support delivery</li>
            </ul>
          </Card>

          <Card eyebrow="In Development" title="Current Status">
            <div className="space-y-2">
              <p className="font-semibold text-ink">Framework in active development.</p>
              <p className="text-muted">
                We are building intake protocols, provider partnerships, and resource verification systems. Launch
                timelines depend on completing pilot testing and funding confirmation.
              </p>
            </div>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Crisis Navigation" eyebrow="Component">
          <p className="text-muted">
            Immediate triage and support when families face urgent threats to housing, utilities, transportation, or
            safety. Quick assessment and connection to appropriate resources.
          </p>
        </Card>

        <Card title="Resource Hub" eyebrow="Component">
          <p className="text-muted">
            Curated directory of verified providers, community programs, and support services. Organized by need type
            with current availability and access requirements clearly documented.
          </p>
        </Card>

        <Card title="Family Repair" eyebrow="Component">
          <p className="text-muted">
            Structured support for households recovering from crisis or instability. Coordination of multiple services,
            follow-up check-ins, and pathways to long-term stability.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">How FSIP Works</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 1</div>
              <h3 className="font-semibold text-ink">Initial Contact</h3>
              <p className="text-sm text-muted">
                Family reaches out through intake channels. Basic needs assessment and urgency evaluation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 2</div>
              <h3 className="font-semibold text-ink">Navigation Support</h3>
              <p className="text-sm text-muted">
                Crisis triage if needed. Connection to immediate resources. Clear next steps provided.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 3</div>
              <h3 className="font-semibold text-ink">Resource Access</h3>
              <p className="text-sm text-muted">
                Verified providers contacted. Support coordination begins. Documentation and follow-up maintained.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">Step 4</div>
              <h3 className="font-semibold text-ink">Stability Restoration</h3>
              <p className="text-sm text-muted">
                Family repair services if needed. Path to self-sufficiency established. Ongoing support as appropriate.
              </p>
            </div>
          </div>
        </section>
      </SectionSurface>

      <section className="rounded-2xl border border-border-soft bg-sand p-6 md:p-8">
        <h2 className="text-xl font-semibold text-ink">Learn More About FSIP Components</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/fsip/crisis-navigation"
            className="rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Crisis Navigation →
          </a>
          <a
            href="/fsip/resource-hub"
            className="rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Resource Hub →
          </a>
          <a
            href="/fsip/family-repair"
            className="rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Family Repair →
          </a>
          <a
            href="/fsip/provider-network"
            className="rounded-lg border border-border-soft bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Provider Network →
          </a>
        </div>
      </section>
    </div>
  );
}
