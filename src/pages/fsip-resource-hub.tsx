import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { updatePageMeta } from '../utils/seo';

export default function FSIPResourceHub() {
  useEffect(() => {
    updatePageMeta({
      title: "FSIP Resource Hub - The Father's Alliance",
      description:
        'Verified directory of community providers, support services, and resources organized by need type with current availability and clear access requirements.',
      path: '/fsip/resource-hub',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">FSIP Component</p>
        <h1 className="text-4xl font-semibold text-ink">Resource Hub</h1>
        <p className="max-w-3xl text-lg text-muted">
          A curated directory of verified providers, community programs, and support services. Resources are organized
          by need type with current availability, access requirements, and contact information clearly documented.
        </p>
      </section>

      <SectionSurface variant="muted" edge="left" edgeTone="neutral">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="What Makes Resources Verified">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Contact information confirmed and current</li>
              <li>Service scope and eligibility requirements documented</li>
              <li>Provider responsiveness and availability verified</li>
              <li>Community feedback and outcomes tracked when possible</li>
            </ul>
          </Card>

          <Card title="Resource Categories" eyebrow="Organization">
            <ul className="list-disc space-y-2 pl-5 text-muted">
              <li>Emergency services and crisis support</li>
              <li>Housing assistance and tenant resources</li>
              <li>Legal aid and advocacy programs</li>
              <li>Healthcare access and mental health support</li>
              <li>Employment services and training programs</li>
              <li>Food assistance and basic needs</li>
            </ul>
          </Card>
        </section>
      </SectionSurface>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Verification Process" eyebrow="Quality Assurance">
          <p className="text-muted">
            Resources undergo initial verification and periodic re-verification. Contact details, service availability,
            and eligibility criteria are checked regularly to maintain accuracy.
          </p>
        </Card>

        <Card title="Search and Filter" eyebrow="Access">
          <p className="text-muted">
            Hub will support search by need type, location, and eligibility. Filters help families quickly find
            appropriate resources without navigating irrelevant options.
          </p>
        </Card>

        <Card title="Provider Feedback" eyebrow="Improvement">
          <p className="text-muted">
            Community feedback and outcome data inform resource quality ratings. Providers with consistent positive
            results receive priority placement when multiple options exist.
          </p>
        </Card>
      </section>

      <SectionSurface variant="default" edge="none">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Hub Development Status</h2>
          <p className="text-muted">
            The Resource Hub is in active development. We are building provider partnerships, verification workflows,
            and search/filter functionality. Initial launch will focus on core need categories with expansion based on
            community demand and provider availability.
          </p>
          <div className="mt-6 rounded-lg border border-border-soft bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Current Focus Areas:</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>• Provider outreach and partnership development</li>
              <li>• Verification protocol testing and refinement</li>
              <li>• Hub interface design and user testing</li>
              <li>• Integration with Crisis Navigation and Family Repair components</li>
            </ul>
          </div>
        </div>
      </SectionSurface>
    </div>
  );
}
